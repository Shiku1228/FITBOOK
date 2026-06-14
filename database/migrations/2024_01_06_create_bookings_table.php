<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('booking_ref', 20)->unique();
            $table->uuid('athlete_id');
            $table->enum('type', ['facility', 'coach']);
            $table->uuid('facility_id')->nullable();
            $table->uuid('coach_id')->nullable();
            $table->uuid('slot_id');
            $table->datetime('start_datetime');
            $table->datetime('end_datetime');
            $table->decimal('duration_hours', 4, 2);
            $table->decimal('subtotal', 10, 2);
            $table->decimal('platform_fee', 10, 2);
            $table->decimal('total_amount', 10, 2);
            $table->char('currency', 3)->default('PHP');
            $table->enum('status', ['pending', 'confirmed', 'completed', 'cancelled', 'refunded'])->default('pending');
            $table->text('cancellation_reason')->nullable();
            $table->uuid('cancelled_by')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->foreign('athlete_id')->references('id')->on('users');
            $table->foreign('facility_id')->references('id')->on('facilities');
            $table->foreign('coach_id')->references('id')->on('coach_profiles');
            $table->foreign('cancelled_by')->references('id')->on('users');

            $table->index(['athlete_id', 'status']);
            $table->index(['facility_id', 'start_datetime']);
            $table->index(['coach_id', 'start_datetime']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};