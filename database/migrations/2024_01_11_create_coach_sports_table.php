<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // This migration runs after the `sports` and `coach_profiles` tables are created.
        Schema::create('coach_sports', function (Blueprint $table) {
            $table->uuid('coach_id');
            $table->unsignedBigInteger('sport_id');
            $table->timestamps();

            $table->primary(['coach_id', 'sport_id']);

            $table->foreign('coach_id')
                  ->references('id')
                  ->on('coach_profiles')
                  ->onDelete('cascade');

            $table->foreign('sport_id')
                  ->references('id')
                  ->on('sports')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coach_sports');
    }
};
