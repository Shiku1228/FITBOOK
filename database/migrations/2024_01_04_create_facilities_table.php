<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('facilities', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('owner_id');
            $table->string('name');
            $table->text('description')->nullable();
            $table->text('address');
            $table->string('city', 100)->nullable();
            $table->decimal('location_lat', 10, 7);
            $table->decimal('location_lng', 10, 7);
            $table->string('google_place_id')->nullable();
            $table->json('sport_types')->nullable();
            $table->json('amenities')->nullable();
            $table->json('photos')->nullable();
            $table->json('documents')->nullable();
            $table->decimal('hourly_rate', 10, 2)->nullable();
            $table->char('currency', 3)->default('PHP');
            $table->integer('capacity')->default(1);
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_active')->default(true);
            $table->decimal('avg_rating', 3, 2)->default(0.00);
            $table->integer('total_reviews')->default(0);
            $table->string('firebase_ref')->nullable();
            $table->timestamps();

            $table->foreign('owner_id')->references('id')->on('users');
            $table->index(['location_lat', 'location_lng']);
            $table->index('city');
            $table->index(['is_active', 'is_verified']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('facilities');
    }
};