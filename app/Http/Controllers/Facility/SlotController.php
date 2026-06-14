<?php

namespace App\Http\Controllers\Facility;

use App\Http\Controllers\Controller;
use App\Services\FirebaseService;
use App\Models\Facility;
use App\Models\FacilitySlot;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SlotController extends Controller
{
    public function __construct(
        protected FirebaseService $firebase
    ) {}

    /**
     * List slots for a specific facility.
     */
    public function index(Request $request, Facility $facility): JsonResponse
    {
        if ($facility->owner_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_FORBIDDEN);
        }

        $slots = $facility->slots()->orderBy('start_datetime')->get();

        return response()->json($slots);
    }

    /**
     * Bulk create slots for a facility.
     */
    public function store(Request $request, Facility $facility): JsonResponse
    {
        if ($facility->owner_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_FORBIDDEN);
        }

        $data = $request->validate([
            'slots' => 'required|array|min:1',
            'slots.*.start_datetime' => 'required|date|after_or_equal:now',
            'slots.*.end_datetime'   => 'required|date|after:slots.*.start_datetime',
            'slots.*.price_override' => 'nullable|numeric|min:0',
        ]);

        $createdSlots = [];
        foreach ($data['slots'] as $slotData) {
            $createdSlots[] = $facility->slots()->create([
                'start_datetime' => $slotData['start_datetime'],
                'end_datetime'   => $slotData['end_datetime'],
                'price_override' => $slotData['price_override'] ?? null,
                'status'         => 'available',
            ]);
        }

        // Sync all created slots to Firebase
        $this->firebase->syncAllSlots(
            $facility->id,
            collect($createdSlots)->map(fn($s) => $s->toArray())->toArray()
        );

        // Mark slots as synced in DB
        $facility->slots()->whereIn('id', collect($createdSlots)->pluck('id'))
            ->update(['firebase_synced_at' => now()]);

        return response()->json($createdSlots, Response::HTTP_CREATED);
    }

    /**
     * Update a specific slot (status or price override).
     */
    public function update(Request $request, Facility $facility, FacilitySlot $slot): JsonResponse
    {
        if ($slot->facility->owner_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_FORBIDDEN);
        }

        $data = $request->validate([
            'status'         => 'sometimes|string|in:available,reserved,booked,blocked',
            'price_override' => 'nullable|numeric|min:0',
        ]);

        $slot->update($data);

        $this->firebase->syncSlot($slot->facility_id, $slot->id, $slot->status);
        $slot->update(['firebase_synced_at' => now()]);

        return response()->json($slot);
    }

    /**
     * Delete a slot if it hasn't been booked.
     */
    public function destroy(Request $request, Facility $facility, FacilitySlot $slot): JsonResponse
    {
        if ($slot->facility->owner_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_FORBIDDEN);
        }

        if ($slot->status === 'booked') {
            return response()->json(['message' => 'Cannot delete a booked slot'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $this->firebase->removeSlot($slot->facility_id, $slot->id);

        $slot->delete();

        return response()->json(['message' => 'Slot deleted successfully']);
    }
}
