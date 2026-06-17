<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Facility extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'owner_id', 'name', 'description', 'address', 'city',
        'location_lat', 'location_lng', 'google_place_id',
        'sport_types', 'amenities', 'photos', 'documents',
        'hourly_rate', 'currency', 'capacity', 'is_verified',
        'is_active', 'avg_rating', 'total_reviews', 'firebase_ref'
    ];

    protected function casts(): array
    {
        return [
            'sport_types'  => 'array',
            'amenities'    => 'array',
            'photos'       => 'array',
            'documents'    => 'array',
            'is_verified'  => 'boolean',
            'is_active'    => 'boolean',
            'hourly_rate'  => 'float',
            'location_lat' => 'float',
            'location_lng' => 'float',
            'avg_rating'   => 'float',
        ];
    }

    /**
     * Get the slots for the facility.
     */
    public function slots(): HasMany
    {
        return $this->hasMany(FacilitySlot::class);
    }
}