<?php

use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.home');
    Route::get('/users', [DashboardController::class, 'index'])->name('users');
    Route::get('/verification', [DashboardController::class, 'index'])->name('verification');
    Route::get('/revenue', [DashboardController::class, 'index'])->name('revenue');
    Route::get('/bookings', [DashboardController::class, 'index'])->name('bookings');
});
