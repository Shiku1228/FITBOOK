<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('booking_id');
            $table->uuid('payer_id');
            $table->enum('gateway', ['paymongo', 'stripe']);
            $table->string('gateway_payment_id');
            $table->string('gateway_checkout_id')->nullable();
            $table->string('method', 50)->nullable();
            $table->decimal('amount', 10, 2);
            $table->char('currency', 3)->default('PHP');
            $table->enum('status', ['pending', 'paid', 'failed', 'refunded'])->default('pending');
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('refunded_at')->nullable();
            $table->decimal('refund_amount', 10, 2)->nullable();
            $table->json('webhook_payload')->nullable();
            $table->timestamps();

            $table->foreign('booking_id')->references('id')->on('bookings');
            $table->foreign('payer_id')->references('id')->on('users');
            $table->unique(['gateway', 'gateway_payment_id']);
            $table->index('booking_id');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};