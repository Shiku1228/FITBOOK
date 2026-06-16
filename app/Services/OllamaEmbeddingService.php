<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Traits\HasVectorSimilarity;
use Exception;

class OllamaEmbeddingService
{
    use HasVectorSimilarity;

    protected string $baseUrl;
    protected string $model;

    public function __construct()
    {
        $this->baseUrl = config('services.ollama.base_url');
        $this->model   = config('services.ollama.embedding_model');
    }

    public function embed(string $text): array
    {
        if (empty($this->baseUrl)) {
            throw new Exception('Ollama Base URL is not configured.');
        }

        $response = Http::timeout(60) // Embeddings can sometimes take longer on consumer hardware
            ->retry(2, 100)           // Add a quick retry if the local service is waking up
            ->post("{$this->baseUrl}/api/embeddings", [
                'model'  => $this->model,
                'prompt' => $text,
            ]);

        if ($response->failed()) {
            Log::error('Ollama Embedding API failed', [
                'status' => $response->status(),
                'error'  => $response->json('error') ?? $response->body(),
            ]);

            throw new Exception('Ollama API error: ' . $response->reason());
        }

        $embedding = $response->json('embedding');

        return is_array($embedding) ? $embedding : [];
    }
}