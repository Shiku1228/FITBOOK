<?php

namespace App\Http\Controllers\Coach;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    public function index()
    {
        Log::info('Coach dashboard accessed', [
            'user' => auth()->user()?->id,
            'role' => auth()->user()?->role?->value,
            'authenticated' => auth()->check(),
        ]);
        return view('coach.dashboard');
    }
}
