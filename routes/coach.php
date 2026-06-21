<?php

use App\Http\Controllers\Coach\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:coach'])->prefix('coach')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/athletes', [DashboardController::class, 'index'])->name('athletes');
    Route::get('/schedule', [DashboardController::class, 'index'])->name('schedule');
    Route::get('/sessions', [DashboardController::class, 'index'])->name('sessions');
    Route::get('/profile', [DashboardController::class, 'index'])->name('profile');
});
