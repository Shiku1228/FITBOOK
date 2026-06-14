<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'booking_id',
        'payer_id',
        'gateway',
        'gateway_payment_id',
        'gateway_checkout_id',
        'method',
        'amount',
        'currency',
        'status',
        'paid_at',
        'refunded_at',
        'refund_amount',
        'webhook_payload',
    ];

    protected function casts(): array
    {
        return [
            'paid_at'         => 'datetime',
            'refunded_at'     => 'datetime',
            'amount'          => 'float',
            'refund_amount'   => 'float',
            'webhook_payload' => 'array',
        ];
    }

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }

    public function payer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'payer_id');
    }
}
