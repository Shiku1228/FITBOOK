<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Services\PayMongoService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PayMongoController extends Controller
{
    public function __construct(
        protected PayMongoService $paymongo
    ) {}

    /**
     * Create a checkout session for a specific booking.
     */
    public function checkout(Request $request): JsonResponse
    {
        $request->validate([
            'booking_id' => 'required|uuid|exists:bookings,id',
        ]);

        $booking = Booking::findOrFail($request->booking_id);

        // Ensure the athlete owns this booking
        if ($booking->athlete_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_FORBIDDEN);
        }

        // The base URL for the success/cancel redirects
        $callbackUrl = url('/api/athlete/payments/callback');

        try {
            $session = $this->paymongo->createCheckoutSession(
                $booking->total_amount,
                $booking->booking_ref,
                $callbackUrl,
                $request->user()->email
            );

            return response()->json([
                'checkout_url' => $session['data']['attributes']['checkout_url'],
                'session_id'   => $session['data']['id'],
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Payment session creation failed: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function success(Request $request): JsonResponse
    {
        return response()->json(['message' => 'Payment redirect successful. We are verifying your transaction.']);
    }

    public function cancel(Request $request): JsonResponse
    {
        return response()->json(['message' => 'Payment was cancelled by the user.']);
    }
}
