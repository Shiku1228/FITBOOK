<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AthleteProfile extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id', 'bio', 'skill_level', 'location_lat', 'location_lng', 
        'city', 'preferred_sports', 'ai_preference_vector'
    ];

    protected function casts(): array
    {
        return [
            'preferred_sports'     => 'array',
            'ai_preference_vector' => 'array',
        ];
    }

    /**
     * Get the user that owns the athlete profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
