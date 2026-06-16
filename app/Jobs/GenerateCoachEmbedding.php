<?php

namespace App\Jobs;

use App\Models\CoachProfile;
use App\Services\CoachMatchService;
use App\Services\OllamaEmbeddingService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class GenerateCoachEmbedding implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public CoachProfile $coach
    ) {}

    public function handle(
        OllamaEmbeddingService $embeddingService,
        CoachMatchService $matchService
    ): void {
        $text = $matchService->buildCoachText($this->coach);
        
        $vector = $embeddingService->embed($text);
        
        $this->coach->update([
            'ai_bio_vector' => $vector,
        ]);
    }
}