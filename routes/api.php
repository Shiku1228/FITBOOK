<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Athlete\FacilitySearchController;
use App\Http\Controllers\Athlete\CoachMatchController;
use App\Http\Controllers\Athlete\BookingController;
use App\Http\Controllers\Coach\ProfileController;
use App\Http\Controllers\Payment\PayMongoController;
use App\Http\Controllers\Coach\EarningsController;
use App\Http\Controllers\Facility\FacilityController;
use App\Http\Controllers\Facility\SlotController;
use App\Http\Controllers\Facility\MediaController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Payment\WebhookController;

// Note: These controllers are referenced in the architecture but not yet created
// use App\Http\Controllers\Athlete\SportController;
// use App\Http\Controllers\PaymentController;
// use App\Http\Controllers\ReviewController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login',    [AuthController::class, 'login']);

// Webhooks
Route::post('/webhooks/paymongo', [WebhookController::class, 'paymongo']);

// Route::get('/facilities/nearby', [FacilitySearchController::class, 'nearby']);
// Route::get('/facilities/{id}',   [FacilitySearchController::class, 'show']);
// Route::get('/sports',            [SportController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout',           [AuthController::class, 'logout']);

    //This result in the URL: /api/auth/user
    Route::get('/auth/user', function (Request $request) {
        return $request->user();
    });

    // Media uploads — available to all authenticated users
    Route::post('/media/avatar',          [MediaController::class, 'uploadAvatar']);
    Route::post('/media/facility-photo',  [MediaController::class, 'uploadFacilityPhoto']);
    Route::post('/media/document',        [MediaController::class, 'uploadDocument']);
});

// Athlete routes
Route::middleware(['auth:sanctum', 'role:athlete'])->prefix('athlete')->group(function () {
    // Route::get('/coaches/match',         [CoachMatchController::class, 'match']);
    // Route::get('/coaches/{id}',          [CoachMatchController::class, 'show']);
    Route::post('/bookings',             [BookingController::class, 'store']);
    Route::get('/bookings',              [BookingController::class, 'index']);
    Route::delete('/bookings/{booking}', [BookingController::class, 'cancel']);

    // Payment routes
    Route::post('/payments/checkout',    [PayMongoController::class, 'checkout']);
    Route::get('/payments/success',      [PayMongoController::class, 'success']);
    Route::get('/payments/cancel',       [PayMongoController::class, 'cancel']);
    // Route::post('/reviews',              [ReviewController::class, 'store']);
});

// Coach / Facility Owner routes
Route::middleware(['auth:sanctum', 'role:coach,facility_owner'])->prefix('owner')->group(function () {
    Route::apiResource('facilities',     FacilityController::class);
    Route::apiResource('facilities.slots', SlotController::class);
    // Route::get('/bookings',              [BookingController::class, 'ownerIndex']);
    // Route::get('/earnings',              [EarningsController::class, 'index']);
    // Route::post('/media/upload',         [MediaController::class, 'upload']);
    // Route::patch('/profile',             [ProfileController::class, 'update']);
});

// Admin routes
Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function (): void {
    // Route::get('/users',                 [UserController::class, 'index']);
    // Route::patch('/users/{id}/verify',   [UserController::class, 'verify']);
    // Route::get('/reports/revenue',       [ReportController::class, 'revenue']);
    // Route::get('/reports/bookings',      [ReportController::class, 'bookings']);
});