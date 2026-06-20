<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('fitbook-landing');
});

Route::get('/dashboard', function () {
    return view('dashboard');
});

Route::get('/courts', function () {
    return view('dashboard');
});

Route::get('/ai-match', function () {
    return view('dashboard');
});

Route::get('/bookings', function () {
    return view('dashboard');
});
