<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('coach_profiles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->string('headline')->nullable();
            $table->text('bio')->nullable();
            $table->decimal('hourly_rate', 10, 2);
            $table->char('currency', 3)->default('PHP');
            $table->integer('years_experience')->default(0);
            $table->json('certifications')->nullable();
            $table->decimal('location_lat', 10, 7)->nullable();
            $table->decimal('location_lng', 10, 7)->nullable();
            $table->string('city', 100)->nullable();
            $table->boolean('is_verified')->default(false);
            $table->string('stripe_account_id')->nullable();
            $table->string('paymongo_account_id')->nullable();
            $table->json('availability_json')->nullable();
            $table->json('ai_bio_vector')->nullable();
            $table->decimal('avg_rating', 3, 2)->default(0.00);
            $table->integer('total_reviews')->default(0);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('coach_profiles');
    }
};