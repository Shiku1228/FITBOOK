<?php

namespace App\Http\Controllers\Athlete;

use App\Http\Controllers\Controller;
use App\Models\Facility;
use App\Enums\SlotStatus;
use App\Services\GoogleMapsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FacilitySearchController extends Controller
{
    public function __construct(
        protected GoogleMapsService $googleMaps
    ) {}

    /**
     * Find facilities within a specific radius of a location.
     */
    public function nearby(Request $request): JsonResponse
    {
        $request->validate([
            'lat'     => 'nullable|numeric',
            'lng'     => 'nullable|numeric',
            'address' => 'nullable|string',
            'radius'  => 'nullable|numeric|min:1|max:100',
        ]);

        $lat = $request->lat;
        $lng = $request->lng;
        $radius = $request->radius ?? 10; // Default to 10km

        // If an address is provided, use Google Maps to find coordinates
        if ($request->filled('address')) {
            $coords = $this->googleMaps->geocode($request->address);
            if (!$coords) {
                return response()->json(['message' => 'Location not found'], 422);
            }
            $lat = $coords['lat'];
            $lng = $coords['lng'];
        }

        if (!$lat || !$lng) {
            return response()->json(['message' => 'Latitude/Longitude or Address is required'], 400);
        }

        // Haversine formula to filter by distance in KM
        $facilities = Facility::where('is_active', true)
            ->where('is_verified', true)
            ->selectRaw("*, (6371 * acos(cos(radians(?)) * cos(radians(location_lat)) * cos(radians(location_lng) - radians(?)) + sin(radians(?)) * sin(radians(location_lat)))) AS distance", [$lat, $lng, $lat])
            ->having('distance', '<=', $radius)
            ->orderBy('distance')
            ->get();

        return response()->json([
            'search_origin' => ['lat' => (float)$lat, 'lng' => (float)$lng],
            'radius_km'     => (float)$radius,
            'results'       => $facilities
        ]);
    }

    public function show(string $id): JsonResponse
    {
        $facility = Facility::with(['slots' => function ($query) {
            $query->where('status', SlotStatus::Available)
                  ->where('start_datetime', '>', now())
                  ->orderBy('start_datetime');
        }])->findOrFail($id);

        return response()->json($facility);
    }
}