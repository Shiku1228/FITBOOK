<?php

namespace App\Services;

use App\Models\CoachProfile;
use App\Models\AthleteProfile;
use Illuminate\Support\Collection;
use App\Services\OllamaTextService;
use App\Services\OllamaEmbeddingService;
use App\Traits\HasVectorSimilarity;

class CoachMatchService
{
    use HasVectorSimilarity;

    public function __construct(
        protected OllamaEmbeddingService $embeddingService,
        protected OllamaTextService $textService
    ) {}

    /**
     * Calculate top coach matches for an athlete based on embedding similarity.
     *
     * @return Collection<int, array{coach: CoachProfile, similarity: float, recommendation: string}>
     */
    public function getTopMatches(AthleteProfile $athlete, int $limit = 10): Collection
    {
        $athleteVector = $athlete->ai_preference_vector 
            ?? $this->embeddingService->embed($this->buildAthleteText($athlete));

        $athleteNeeds = $this->buildAthleteText($athlete);

        return CoachProfile::where('is_verified', true)
            ->whereNotNull('ai_bio_vector')
            ->with(['user', 'sports'])
            ->get()
            ->map(fn(CoachProfile $coach) => [
                'coach' => $coach,
                'similarity' => $this->cosineSimilarity($athleteVector, $coach->ai_bio_vector),
            ])
            ->sortByDesc('similarity')
            ->take($limit)
            ->values()
            ->map(function ($match) use ($athleteNeeds) {
                $coach = $match['coach'];

                // Prepare the data structure for OllamaTextService
                $coachData = [
                    'name'             => $coach->user->name ?? 'Coach',
                    'sports'           => $coach->sports->pluck('name')->implode(', '),
                    'years_experience' => $coach->years_experience,
                    'city'             => $coach->city,
                    'hourly_rate'      => $coach->hourly_rate,
                    'bio'              => $coach->bio,
                ];

                // Generate the specific "Why this match?" text
                try {
                    $match['recommendation'] = $this->textService->generateCoachRecommendation($coachData, $athleteNeeds);
                } catch (\Exception $e) {
                    $match['recommendation'] = 'This coach matches your training needs based on their profile and expertise.';
                }

                return $match;
            });
    }

    public function buildCoachText(CoachProfile $coach): string
    {
        $sports = $coach->sports->pluck('name')->implode(', ');
        return "Coach Headline: {$coach->headline}. Bio: {$coach->bio}. Sports: {$sports}. " .
               "Experience: {$coach->years_experience} years. Location: {$coach->city}.";
    }

    public function buildAthleteText(AthleteProfile $athlete): string
    {
        $sports = collect($athlete->preferred_sports)->implode(', ');
        return "Athlete looking for coaching in: {$sports}. Skill level: {$athlete->skill_level}. " .
               "Current Location: {$athlete->city}. Goals: {$athlete->bio}";
    }
}