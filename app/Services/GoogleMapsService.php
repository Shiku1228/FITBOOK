<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GoogleMapsService
{
    protected string $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.google_maps.api_key');
    }

    /**
     * Convert an address string to latitude and longitude coordinates.
     */
    public function geocode(string $address): ?array
    {
        $response = Http::get('https://maps.googleapis.com/maps/api/geocode/json', [
            'address' => $address,
            'key'     => $this->apiKey,
        ]);

        if ($response->successful() && $response->json('status') === 'OK') {
            return $response->json('results.0.geometry.location');
        }

        return null;
    }

    /**
     * Find facilities near a given location.
     */
    public function nearbyFacilities(float $lat, float $lng, int $radiusMeters = 5000): array
    {
        $response = Http::get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', [
            'location' => "{$lat},{$lng}",
            'radius'   => $radiusMeters,
            'type'     => 'gym',
            'key'      => $this->apiKey,
        ]);

        if ($response->failed()) {
            throw new \Exception('Google Maps API error: ' . $response->body());
        }

        return $response->json('results') ?? [];
    }

    /**
     * Calculate distance between two coordinates in kilometers.
     */
    public function distanceInKm(float $lat1, float $lng1, float $lat2, float $lng2): float
    {
        $earthRadius = 6371;
        $dLat = deg2rad($lat2 - $lat1);
        $dLng = deg2rad($lng2 - $lng1);

        $a = sin($dLat / 2) * sin($dLat / 2) +
             cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
             sin($dLng / 2) * sin($dLng / 2);

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        return round($earthRadius * $c, 2);
    }
}