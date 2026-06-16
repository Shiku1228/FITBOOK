<?php

namespace App\Services;

use OpenAI\Laravel\Facades\OpenAI;
use App\Models\CoachProfile;
use App\Models\AthleteProfile;
use App\Traits\HasVectorSimilarity;

class OpenAICoachMatchService
{
    use HasVectorSimilarity;

    public function generateEmbedding(string $text): array
    {
        $response = OpenAI::embeddings()->create([
            'model' => 'text-embedding-3-small',
            'input' => $text,
        ]);

        return $response->embeddings[0]->embedding;
    }

    public function buildCoachText(CoachProfile $coach): string
    {
        $sports = $coach->sports->pluck('name')->implode(', ');
        return "{$coach->headline}. {$coach->bio}. Sports: {$sports}. 
                Experience: {$coach->years_experience} years. 
                Level: {$coach->skill_level}. Location: {$coach->city}.";
    }

    public function buildAthleteText(AthleteProfile $athlete): string
    {
        $sports = implode(', ', $athlete->preferred_sports ?? []);
        return "Athlete looking for {$sports} coaching. 
                Skill level: {$athlete->skill_level}. Location: {$athlete->city}.
                Goals: {$athlete->bio}";
    }

    public function getTopMatches(AthleteProfile $athlete, int $limit = 10): array
    {
        $athleteVector = $athlete->ai_preference_vector
            ?? $this->generateEmbedding($this->buildAthleteText($athlete));

        return CoachProfile::where('is_verified', true)
            ->whereNotNull('ai_bio_vector')
            ->get()
            ->map(fn($coach) => [
                'coach'      => $coach,
                'similarity' => $this->cosineSimilarity($athleteVector, $coach->ai_bio_vector),
            ])->sortByDesc('similarity')->take($limit)->values()->toArray();
    }
}
