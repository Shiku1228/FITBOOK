<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class PayMongoService
{
    protected string $baseUrl = 'https://api.paymongo.com/v1';
    protected ?string $secretKey;

    public function __construct()
    {
        $this->secretKey = config('services.paymongo.secret_key');
    }

    protected function headers(): array
    {
        return [
            'Authorization' => 'Basic ' . base64_encode($this->secretKey . ':'),
            'Content-Type'  => 'application/json',
            'Accept'        => 'application/json',
        ];
    }

    public function createGCashPayment(float $amount, string $bookingRef, string $returnUrl): array
    {
        $response = Http::withHeaders($this->headers())
            ->post("{$this->baseUrl}/links", [
                'data' => [
                    'attributes' => [
                        'amount'      => (int)($amount * 100), // centavos
                        'description' => "FitBook Booking #{$bookingRef}",
                        'remarks'     => $bookingRef,
                    ],
                ],
            ]);

        if ($response->failed()) {
            throw new \Exception('PayMongo API error: ' . $response->body());
        }

        return $response->json();
    }

    public function createCheckoutSession(float $amount, string $bookingRef, string $returnUrl, string $userEmail): array
    {
        $response = Http::withHeaders($this->headers())
            ->post("{$this->baseUrl}/checkout_sessions", [
                'data' => [
                    'attributes' => [
                        'billing'           => ['email' => $userEmail],
                        'send_email_receipt'=> false,
                        'show_description'  => true,
                        'show_line_items'   => true,
                        'cancel_url'        => $returnUrl . '?status=cancelled',
                        'success_url'       => $returnUrl . '?status=success',
                        'description'       => "FitBook #{$bookingRef}",
                        'line_items'        => [[
                            'currency'  => 'PHP',
                            'amount'    => (int)($amount * 100),
                            'name'      => "Booking #{$bookingRef}",
                            'quantity'  => 1,
                        ]],
                        'payment_method_types' => ['gcash', 'card', 'paymaya'],
                        'reference_number'  => $bookingRef,
                    ],
                ],
            ]);

        if ($response->failed()) {
            throw new \Exception('PayMongo API error: ' . $response->body());
        }

        return $response->json();
    }

    public function retrievePayment(string $paymentId): array
    {
        $response = Http::withHeaders($this->headers())
            ->get("{$this->baseUrl}/payments/{$paymentId}");

        if ($response->failed()) {
            throw new \Exception('PayMongo API error: ' . $response->body());
        }

        return $response->json();
    }
}
