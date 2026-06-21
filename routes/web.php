<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('fitbook-landing');
});

Route::get('/auth', function () {
    return view('auth');
})->name('login');

Route::post('/auth/login', [AuthController::class, 'webLogin'])->name('auth.login');

Route::post('/auth/logout', [AuthController::class, 'webLogout'])->name('auth.logout');

// Load role-specific routes
require __DIR__.'/athlete.php';
require __DIR__.'/facility_owner.php';
require __DIR__.'/coach.php';
require __DIR__.'/admin.php';
