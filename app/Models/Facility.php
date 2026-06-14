<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Facility extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'owner_id',
        'name',
        'description',
        'address',
        'city',
        'location_lat',
        'location_lng',
        'google_place_id',
        'sport_types',
        'amenities',
        'photos',
        'documents',
        'hourly_rate',
        'currency',
        'capacity',
        'is_verified',
        'is_active',
        'firebase_ref',
        'avg_rating',
        'total_reviews',
    ];

    protected function casts(): array
    {
        return [
            'sport_types' => 'array',
            'amenities'   => 'array',
            'photos'      => 'array',
            'documents'   => 'array',
            'is_verified' => 'boolean',
            'is_active'   => 'boolean',
            'avg_rating'  => 'float',
            'total_reviews' => 'integer',
        ];
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function slots(): HasMany
    {
        return $this->hasMany(FacilitySlot::class);
    }
}
