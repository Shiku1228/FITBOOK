<?php

namespace App\Services;

use Kreait\Firebase\Contract\Messaging;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;

class FCMService
{
    public function __construct(
        protected Messaging $messaging
    ) {}

    public function sendToDevice(string $fcmToken, string $title, string $body, array $data = []): void
    {
        $message = CloudMessage::withTarget('token', $fcmToken)
            ->withNotification(Notification::create($title, $body))
            ->withData($data);

        $this->messaging->send($message);
    }

    public function sendBookingConfirmed(string $fcmToken, string $bookingRef): void
    {
        $this->sendToDevice(
            $fcmToken,
            'Booking Confirmed! 🎉',
            "Your booking #{$bookingRef} has been confirmed.",
            ['type' => 'booking_confirmed', 'booking_ref' => $bookingRef]
        );
    }

    public function sendPaymentReceived(string $fcmToken, string $bookingRef, float $amount): void
    {
        $this->sendToDevice(
            $fcmToken,
            'Payment Received! 💳',
            "Payment of ₱{$amount} for booking #{$bookingRef} received.",
            ['type' => 'payment_received', 'booking_ref' => $bookingRef]
        );
    }

    public function sendSlotBooked(string $fcmToken, string $facilityName, string $startTime): void
    {
        $this->sendToDevice(
            $fcmToken,
            'New Booking! 📅',
            "{$facilityName} has been booked for {$startTime}.",
            ['type' => 'slot_booked', 'facility' => $facilityName]
        );
    }
}
