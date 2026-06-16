<?php

namespace App\Traits;

trait HasVectorSimilarity
{
    public function cosineSimilarity(array $a, array $b): float
    {
        $dot   = array_sum(array_map(fn($x, $y) => $x * $y, $a, $b));
        $normA = sqrt(array_sum(array_map(fn($x) => $x ** 2, $a)));
        $normB = sqrt(array_sum(array_map(fn($x) => $x ** 2, $b)));

        return $normA && $normB ? $dot / ($normA * $normB) : 0.0;
    }
}