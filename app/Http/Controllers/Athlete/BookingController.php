<?php

namespace App\Http\Controllers\Athlete;

use App\Http\Controllers\Controller;
use App\Enums\BookingStatus;
use App\Enums\SlotStatus;
use App\Models\Booking;
use App\Models\FacilitySlot;
use App\Services\FirebaseService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class BookingController extends Controller
{
    public function __construct(
        protected FirebaseService $firebase
    ) {}

    public function store(Request $request): JsonResponse
    {
        // 1. Validate the request
        $data = $request->validate([
            'slot_id' => 'required|uuid|exists:facility_slots,id',
            'type'    => 'required|string|in:facility,coach',
            'notes'   => 'nullable|string|max:500',
        ]);

        return DB::transaction(function () use ($request, $data) {
            // 2. Find the slot and check it's available
            $slot = FacilitySlot::with('facility')->lockForUpdate()->findOrFail($data['slot_id']);

            if ($slot->status !== SlotStatus::Available->value) {
                return response()->json(['message' => 'Slot is no longer available'], Response::HTTP_CONFLICT);
            }

            // 3. Calculate duration, subtotal, platform fee, total
            $durationHours = $slot->start_datetime->diffInMinutes($slot->end_datetime) / 60;
            $subtotal = $slot->price_override ?? ($slot->facility->hourly_rate * $durationHours);
            $platformFee = $subtotal * 0.10; // 10% platform fee
            $totalAmount = $subtotal + $platformFee;

            // 4. Generate booking_ref
            $bookingRef = 'FB-' . strtoupper(Str::random(6));

            // 5. Create the booking with status 'pending'
            $booking = Booking::create([
                'athlete_id'     => $request->user()->id,
                'facility_id'    => $slot->facility_id,
                'slot_id'        => $slot->id,
                'type'           => $data['type'],
                'booking_ref'    => $bookingRef,
                'duration_hours' => $durationHours,
                'subtotal'       => $subtotal,
                'platform_fee'   => $platformFee,
                'total_amount'   => $totalAmount,
                'currency'       => $slot->facility->currency ?? 'PHP',
                'status'         => BookingStatus::Pending,
                'start_datetime' => $slot->start_datetime,
                'end_datetime'   => $slot->end_datetime,
                'notes'          => $data['notes'] ?? null,
            ]);

            // 6. Update slot status to 'reserved' in MySQL
            $slot->update(['status' => SlotStatus::Reserved->value]);

            // 7. Sync slot status to Firebase
            $this->firebase->syncSlot($slot->facility_id, $slot->id, SlotStatus::Reserved->value);

            // 8. Return the booking
            return response()->json($booking, Response::HTTP_CREATED);
        });
    }

    public function index(Request $request): JsonResponse
    {
        $bookings = Booking::where('athlete_id', $request->user()->id)
            ->with(['facility', 'slot', 'coach'])
            ->latest()
            ->get();

        return response()->json($bookings);
    }

    public function cancel(Request $request, Booking $booking): JsonResponse
    {
        // 1. Check the booking belongs to the athlete
        if ($booking->athlete_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_FORBIDDEN);
        }

        // 2. Check it's not already cancelled or completed
        if (in_array($booking->status, [BookingStatus::Cancelled, BookingStatus::Completed])) {
            return response()->json(['message' => 'Booking cannot be cancelled'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return DB::transaction(function () use ($booking) {
            // 3. Update booking status to 'cancelled'
            $booking->update([
                'status'       => BookingStatus::Cancelled,
                'cancelled_at' => now(),
                'cancelled_by' => $booking->athlete_id,
            ]);

            // 4. Release the slot back to 'available'
            $slot = $booking->slot;
            if ($slot) {
                $slot->update(['status' => SlotStatus::Available->value]);

                // 5. Sync Firebase
                $this->firebase->syncSlot($slot->facility_id, $slot->id, SlotStatus::Available->value);
            }

            return response()->json(['message' => 'Booking cancelled successfully']);
        });
    }
}