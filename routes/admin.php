<?php

use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/users', [DashboardController::class, 'index'])->name('users');
    Route::get('/facilities', [DashboardController::class, 'index'])->name('facilities');
    Route::get('/bookings', [DashboardController::class, 'index'])->name('bookings');
    Route::get('/reports', [DashboardController::class, 'index'])->name('reports');
    Route::get('/settings', [DashboardController::class, 'index'])->name('settings');
});
