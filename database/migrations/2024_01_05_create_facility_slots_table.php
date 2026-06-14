<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('facility_slots', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('facility_id');
            $table->datetime('start_datetime');
            $table->datetime('end_datetime');
            $table->enum('status', ['available', 'reserved', 'booked', 'blocked'])->default('available');
            $table->decimal('price_override', 10, 2)->nullable();
            $table->uuid('booked_by')->nullable();
            $table->timestamp('firebase_synced_at')->nullable();
            $table->timestamps();

            $table->foreign('facility_id')->references('id')->on('facilities')->onDelete('cascade');
            $table->foreign('booked_by')->references('id')->on('users');
            $table->index(['facility_id', 'start_datetime', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('facility_slots');
    }
};