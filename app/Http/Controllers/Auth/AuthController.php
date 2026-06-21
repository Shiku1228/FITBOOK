<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Enum;
use Symfony\Component\HttpFoundation\Response;
class AuthController extends Controller
{
    // Register a new user and return a Sanctum Token.

    public function register(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => ['required', new Enum(UserRole::class)],
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => $data['role'],
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], Response::HTTP_CREATED);
    }

    /**
     * Authenticate a user and return a Sanctum token.
     */
    public function login(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email'    => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user'         => $user,
            'access_token' => $token,
            'token_type'   => 'Bearer',
        ]);
    }

    /**
     * Log the user out (revoke the token).
     */
    public function logout(Request $request): JsonResponse
    {
        // Delete the current token being used
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully'], Response::HTTP_OK);
    }

    /**
     * Web login for session-based authentication.
     */
    public function webLogin(Request $request)
    {
        $data = $request->validate([
            'email'    => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (auth()->attempt($data)) {
            $request->session()->regenerate();

            // Redirect based on user role
            $user = auth()->user();
            $role = $user->role instanceof \BackedEnum ? $user->role->value : $user->role;
            \Log::info('User logged in', ['email' => $user->email, 'role' => $role]);

            $redirectPath = match($role) {
                'athlete' => '/athlete/dashboard',
                'facility_owner' => '/facility_owner/dashboard',
                'coach' => '/coach/dashboard',
                'admin' => '/admin/dashboard',
                default => '/athlete/dashboard',
            };

            \Log::info('Redirecting to', ['path' => $redirectPath]);

            return redirect()->intended($redirectPath);
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    /**
     * Web logout for session-based authentication.
     */
    public function webLogout(Request $request)
    {
        auth()->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/auth');
    }
}
