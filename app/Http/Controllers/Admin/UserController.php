<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * List all users with optional role filtering and pagination.
     */
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'role' => 'nullable|in:athlete,coach,facility_owner,admin',
        ]);

        $users = User::query()
            ->when($request->role, function ($query, $role) {
                return $query->where('role', $role);
            })
            ->latest()
            ->paginate(20);

        return response()->json($users);
    }

    /**
     * Mark a user as verified.
     */
    public function verify(Request $request, string $id): JsonResponse
    {
        $user = User::findOrFail($id);
        $user->update(['is_verified' => true]);

        return response()->json([
            'message' => 'User verified successfully',
            'user' => $user,
        ]);
    }

    /**
     * Deactivate a user account.
     */
    public function deactivate(Request $request, string $id): JsonResponse
    {
        $user = User::findOrFail($id);
        $user->update(['is_active' => false]);

        return response()->json([
            'message' => 'User deactivated successfully',
            'user' => $user,
        ]);
    }

    /**
     * Activate a user account.
     */
    public function activate(Request $request, string $id): JsonResponse
    {
        $user = User::findOrFail($id);
        $user->update(['is_active' => true]);

        return response()->json([
            'message' => 'User activated successfully',
            'user' => $user,
        ]);
    }
}
