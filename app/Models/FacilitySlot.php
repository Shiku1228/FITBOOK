<?php

namespace App\Models;

use App\Enums\SlotStatus;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class FacilitySlot extends Model
{
    use HasFactory, HasUuids;
    
    protected $fillable = [
        'facility_id',
        'start_datetime',
        'end_datetime',
        'status',
        'price_override',
        'booked_by',
        'firebase_synced_at',
    ];

    protected function casts(): array
    {
        return [
            'start_datetime' => 'datetime',
            'end_datetime' => 'datetime',
            'price_override' => 'float',
            'firebase_synced_at' => 'datetime',
            'status' => SlotStatus::class,
        ];
    }
    
    public function facility(): BelongsTo
    {
        return $this->belongsTo(Facility::class);
    }

    public function bookedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'booked_by');
    }

    public function booking(): HasOne
    {
        return $this->hasOne(Booking::class, 'slot_id');
    }
}
