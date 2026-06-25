<?php

use App\Http\Controllers\Owner\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:facility_owner'])->prefix('facility_owner')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/bookings', [DashboardController::class, 'index'])->name('bookings');
    Route::get('/slots', [DashboardController::class, 'index'])->name('slots');
    Route::get('/facilities', [DashboardController::class, 'index'])->name('facilities');
    Route::get('/earnings', [DashboardController::class, 'index'])->name('earnings');
    Route::get('/reviews', [DashboardController::class, 'index'])->name('reviews');
    Route::get('/profile', [DashboardController::class, 'index'])->name('profile');
    Route::get('/{any}', [DashboardController::class, 'index'])->where('any', '.*');
});
