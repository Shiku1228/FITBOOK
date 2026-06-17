<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Enums\BookingStatus;
use App\Enums\PaymentGateway;
use App\Enums\SlotStatus;
use App\Models\Booking;
use App\Models\Payment;
use App\Mail\BookingConfirmedMail;
use App\Services\FCMService;
use App\Services\FirebaseService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class WebhookController extends Controller
{
    public function __construct(
        protected FirebaseService $firebase,
        protected FCMService $fcm
    ) {}

    public function paymongo(Request $request): JsonResponse
    {
        // 1. Verify the webhook signature
        $payload   = $request->getContent();
        $signature = $request->header('Paymongo-Signature');
        $secret    = config('services.paymongo.webhook_secret');

        Log::info('Webhook received', [
            'signature' => $signature,
            'secret_set' => !empty($secret),
            'payload_preview' => substr($payload, 0, 200),
        ]);

        if (!$this->verifySignature($payload, $signature, $secret)) {
            Log::error('Webhook signature verification failed');
            return response()->json(['message' => 'Invalid signature'], 401);
        }

        Log::info('Signature verified successfully');

        // 2. Get the event data
        $event = $request->input('data.attributes');
        $type  = $event['type'] ?? null;

        Log::info('Event type', ['type' => $type]);

        // 3. Handle the event
        match ($type) {
            'checkout_session.payment.paid' => $this->handlePaymentPaid($event),
            'payment.failed'                => $this->handlePaymentFailed($event),
            default                         => Log::warning('Unhandled event type', ['type' => $type]),
        };

        return response()->json(['message' => 'Webhook received']);
    }

    protected function verifySignature(string $payload, ?string $signature, string $secret): bool
    {
        if (!$signature) return false;

        $parts     = explode(',', $signature);
        $timestamp = null;
        $te        = null;

        foreach ($parts as $part) {
            if (str_starts_with($part, 't=')) {
                $timestamp = substr($part, 2);
            }
            if (str_starts_with($part, 'te=')) {
                $te = substr($part, 3);
            }
        }

        Log::info('Signature parts', [
            'timestamp' => $timestamp,
            'te'        => $te,
            'secret'    => substr($secret, 0, 10) . '...',
        ]);

        if (!$timestamp || !$te) return false;

        // PayMongo signs: timestamp + "." + raw_payload
        $signedPayload = $timestamp . '.' . $payload;
        $computed      = hash_hmac('sha256', $signedPayload, $secret);

        Log::info('Signature comparison', [
            'computed'  => $computed,
            'received'  => $te,
            'match'     => hash_equals($computed, $te),
        ]);

        return hash_equals($computed, $te);
    }

    protected function handlePaymentPaid(array $event): void
    {
        $referenceNumber = $event['data']['attributes']['reference_number'] ?? null;

        if (!$referenceNumber) return;

        $booking = Booking::where('booking_ref', $referenceNumber)
            ->with(['athlete', 'facility', 'slot'])
            ->first();

        if (!$booking) return;

        // Check if payment already exists to prevent duplicates
        $existingPayment = Payment::where('gateway', PaymentGateway::PayMongo->value)
            ->where('gateway_payment_id', $event['data']['id'] ?? '')
            ->first();

        if ($existingPayment) {
            Log::info('Duplicate webhook received, skipping: ' . ($event['data']['id'] ?? 'unknown'));
            return;
        }

        DB::transaction(function () use ($booking, $event) {
            // Update booking status to confirmed using Enums
            $booking->update(['status' => BookingStatus::Confirmed]);

            // Update slot status to booked
            $slot = $booking->slot;
            if ($slot) {
                $slot->update(['status' => SlotStatus::Booked]);
                $this->firebase->syncSlot($slot->facility_id, $slot->id, SlotStatus::Booked->value);
            }

            // Create payment record
            Payment::create([
                'booking_id'        => $booking->id,
                'payer_id'          => $booking->athlete_id,
                'gateway'           => PaymentGateway::PayMongo->value,
                'gateway_payment_id'=> $event['data']['id'] ?? '',
                'amount'            => $booking->total_amount,
                'currency'          => $booking->currency,
                'status'            => 'paid',
                'method'            => 'gcash',
                'paid_at'           => now(),
                'webhook_payload'   => $event,
            ]);
        });

        // Send email notification
        try {
            Log::info('Attempting to send email for booking: ' . $booking->booking_ref);
            Mail::to($booking->athlete->email)
                ->send(new BookingConfirmedMail($booking));
            Log::info('Email sent successfully for booking: ' . $booking->booking_ref);
        } catch (\Throwable $e) {
            Log::error('Email notification failed: ' . $e->getMessage());
        }

        // Send FCM push notification
        try {
            if ($booking->athlete->fcm_token) {
                $this->fcm->sendBookingConfirmed(
                    $booking->athlete->fcm_token,
                    $booking->booking_ref
                );
            }
        } catch (\Throwable $e) {
            Log::error('FCM notification failed: ' . $e->getMessage());
        }
    }

    protected function handlePaymentFailed(array $event): void
    {
        $referenceNumber = $event['data']['attributes']['reference_number'] ?? null;

        if (!$referenceNumber) return;

        $booking = Booking::where('booking_ref', $referenceNumber)->first();

        if (!$booking) return;

        DB::transaction(function () use ($booking) {
            $booking->update(['status' => BookingStatus::Cancelled]);

            $slot = $booking->slot;
            if ($slot) {
                $slot->update(['status' => SlotStatus::Available]);
                $this->firebase->syncSlot($slot->facility_id, $slot->id, SlotStatus::Available->value);
            }
        });
    }
}
