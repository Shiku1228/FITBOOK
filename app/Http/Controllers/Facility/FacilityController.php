<?php

namespace App\Http\Controllers\Facility;

use App\Http\Controllers\Controller;
use App\Models\Facility;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FacilityController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $facilities = Facility::where('owner_id', $request->user()->id)->get();
        return response()->json($facilities);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'         => 'required|string|max:255',
            'description'  => 'nullable|string',
            'address'      => 'required|string',
            'city'         => 'required|string',
            'location_lat' => 'required|numeric',
            'location_lng' => 'required|numeric',
            'sport_types'  => 'required|array',
            'hourly_rate'  => 'required|numeric',
            'capacity'     => 'required|integer|min:1',
        ]);

        $data['owner_id'] = $request->user()->id;

        $facility = Facility::create($data);

        return response()->json($facility, Response::HTTP_CREATED);
    }

    public function show(Facility $facility): JsonResponse
    {
        return response()->json($facility);
    }

    public function update(Request $request, Facility $facility): JsonResponse
    {
        if ($facility->owner_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_FORBIDDEN);
        }

        $data = $request->validate([
            'name'         => 'sometimes|string|max:255',
            'description'  => 'nullable|string',
            'hourly_rate'  => 'sometimes|numeric',
            'is_active'    => 'sometimes|boolean',
        ]);

        $facility->update($data);

        return response()->json($facility);
    }

    public function destroy(Request $request, Facility $facility): JsonResponse
    {
        if ($facility->owner_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], Response::HTTP_FORBIDDEN);
        }

        $facility->delete();

        return response()->json(['message' => 'Facility deleted successfully']);
    }
}
