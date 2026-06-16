<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class CoachProfile extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id', 'headline', 'bio', 'hourly_rate', 'currency', 
        'years_experience', 'certifications', 'location_lat', 'location_lng', 
        'city', 'is_verified', 'availability_json', 'ai_bio_vector'
    ];

    protected $hidden = [
        'ai_bio_vector',
    ];

    protected function casts(): array
    {
        return [
            'certifications'    => 'array',
            'availability_json' => 'array',
            'ai_bio_vector'     => 'array',
            'is_verified'       => 'boolean',
            'hourly_rate'       => 'float',
        ];
    }

    /**
     * Get the user associated with the coach profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The sports that the coach specializes in.
     */
    public function sports(): BelongsToMany
    {
        return $this->belongsToMany(
            Sport::class,
            'coach_sports',
            'coach_id',
            'sport_id'
        );
    }
}
