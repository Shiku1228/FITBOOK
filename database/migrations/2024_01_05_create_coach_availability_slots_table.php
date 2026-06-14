<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('coach_availability_slots', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('coach_id');
            $table->datetime('start_datetime');
            $table->datetime('end_datetime');
            $table->enum('status', ['available', 'booked', 'blocked'])->default('available');
            $table->uuid('booked_by')->nullable();
            $table->timestamps();

            $table->foreign('coach_id')->references('id')->on('coach_profiles')->onDelete('cascade');
            $table->foreign('booked_by')->references('id')->on('users');
            $table->index(['coach_id', 'start_datetime', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('coach_availability_slots');
    }
};