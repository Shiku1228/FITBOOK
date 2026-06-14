<?php

namespace App\Models;

use App\Enums\BookingStatus;
use App\Enums\PaymentGateway;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'athlete_id',
        'facility_id',
        'coach_id',
        'slot_id',
        'booking_ref',
        'type',
        'duration_hours',
        'subtotal',
        'platform_fee',
        'total_amount',
        'currency',
        'status',
        'payment_gateway',
        'start_datetime',
        'end_datetime',
        'notes',
        'cancelled_at',
        'cancelled_by',
        'cancellation_reason',
    ];

    protected function casts(): array
    {
        return [
            'start_datetime' => 'datetime',
            'end_datetime'   => 'datetime',
            'cancelled_at'   => 'datetime',
            'duration_hours' => 'float',
            'subtotal'       => 'float',
            'platform_fee'   => 'float',
            'total_amount'   => 'float',
            'status'         => BookingStatus::class,
            'payment_gateway' => PaymentGateway::class,
        ];
    }

    public function athlete(): BelongsTo
    {
        return $this->belongsTo(User::class, 'athlete_id');
    }

    public function facility(): BelongsTo
    {
        return $this->belongsTo(Facility::class);
    }

    public function coach(): BelongsTo
    {
        return $this->belongsTo(CoachProfile::class);
    }

    public function slot(): BelongsTo
    {
        return $this->belongsTo(FacilitySlot::class, 'slot_id');
    }
}
