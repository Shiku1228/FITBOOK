<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payouts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('recipient_id');
            $table->json('booking_ids');
            $table->decimal('gross_amount', 10, 2);
            $table->decimal('platform_cut', 10, 2);
            $table->decimal('net_amount', 10, 2);
            $table->enum('gateway', ['paymongo', 'stripe']);
            $table->string('transfer_id')->nullable();
            $table->enum('status', ['pending', 'processing', 'completed', 'failed'])->default('pending');
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();

            $table->foreign('recipient_id')->references('id')->on('users');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payouts');
    }
};