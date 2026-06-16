<?php

namespace App\Http\Controllers\Athlete;

use App\Http\Controllers\Controller;
use App\Models\AthleteProfile;
use App\Models\CoachProfile;
use App\Services\CoachMatchService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CoachMatchController extends Controller
{
    public function __construct(
        protected CoachMatchService $coachMatch
    ) {}

    public function match(Request $request): JsonResponse
    {
        // 1. Get the logged in athlete's profile
        $athleteProfile = AthleteProfile::where('user_id', $request->user()->id)->first();

        // 2. If no profile found, return 404
        if (!$athleteProfile) {
            return response()->json([
                'message' => 'Athlete profile not found. Please complete your profile to enable AI matching.'
            ], Response::HTTP_NOT_FOUND);
        }

        // 3. Call $this->coachMatch->getTopMatches($athleteProfile)
        $matches = $this->coachMatch->getTopMatches($athleteProfile);

        // 4. Return the results as JSON
        return response()->json($matches);
    }

    public function show(Request $request, string $id): JsonResponse
    {
        // 1. Find the coach profile by id
        $coach = CoachProfile::with(['user', 'sports'])->findOrFail($id);

        // 2. Return coach details with sports and user
        return response()->json($coach);
    }
}