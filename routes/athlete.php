<?php

use App\Http\Controllers\Athlete\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:athlete'])->prefix('athlete')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});
