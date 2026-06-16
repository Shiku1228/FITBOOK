<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class OllamaTextService
{
    protected string $baseUrl;
    protected string $model;

    public function __construct()
    {
        $this->baseUrl = config('services.ollama.base_url', 'http://localhost:11434');
        $this->model   = config('services.ollama.text_model', 'llama3.2');
    }

    public function generateCoachRecommendation(array $coach, string $athleteNeeds): string
    {
        $prompt = "You are a sports coach matching assistant for FitBook Philippines.

Athlete is looking for: {$athleteNeeds}

Coach profile:
- Name: {$coach['name']}
- Sports: {$coach['sports']}
- Experience: {$coach['years_experience']} years
- Location: {$coach['city']}
- Rate: PHP {$coach['hourly_rate']}/hour
- Bio: {$coach['bio']}

Write 2-3 sentences explaining why this coach is a good match. Be specific and friendly.";

        $response = Http::timeout(120)->post("{$this->baseUrl}/api/generate", [
            'model'  => $this->model,
            'prompt' => $prompt,
            'stream' => false,
        ]);

        if ($response->failed()) {
            throw new \Exception('Ollama error: ' . $response->body());
        }

        return $response->json('response') ?? 'No recommendation available.';
    }
}