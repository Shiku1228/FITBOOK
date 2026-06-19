<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function revenue(Request $request): JsonResponse
    {
        return response()->json([
            'total_payments' => Payment::where('status', 'paid')->sum('amount'),
            'total_platform_fees' => Booking::where('status', 'confirmed')->sum('platform_fee'),
            'total_bookings' => Booking::count(),
            'revenue_by_month' => Payment::where('status', 'paid')
                ->selectRaw("DATE_FORMAT(created_at, '%Y-%m') as month, sum(amount) as total")
                ->groupBy('month')
                ->orderBy('month', 'desc')
                ->get(),
        ]);
    }

    public function bookings(Request $request): JsonResponse
    {
        return response()->json([
            'total_bookings' => Booking::count(),
            'bookings_by_status' => Booking::selectRaw('status, count(*) as count')
                ->groupBy('status')
                ->get(),
            'recent_bookings' => Booking::with(['facility', 'athlete'])
                ->latest()
                ->limit(10)
                ->get(),
        ]);
    }
}
