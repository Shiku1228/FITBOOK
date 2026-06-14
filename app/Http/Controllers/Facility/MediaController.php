<?php

namespace App\Http\Controllers\Facility;

use App\Http\Controllers\Controller;
use App\Services\CloudinaryUploadService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class MediaController extends Controller
{
    public function __construct(
        protected CloudinaryUploadService $cloudinary
    ) {}

    // Upload avatar for any user role
    public function uploadAvatar(Request $request): JsonResponse
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $url = $this->cloudinary->uploadImage(
            $request->file('avatar'),
            'avatars'
        );

        $request->user()->update(['avatar_url' => $url]);

        return response()->json([
            'message'    => 'Avatar uploaded successfully',
            'avatar_url' => $url,
        ]);
    }

    // Upload facility photos
    public function uploadFacilityPhoto(Request $request): JsonResponse
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        $url = $this->cloudinary->uploadImage(
            $request->file('photo'),
            'facilities'
        );

        return response()->json([
            'message'   => 'Photo uploaded successfully',
            'photo_url' => $url,
        ]);
    }

    // Upload business permit or certification document
    public function uploadDocument(Request $request): JsonResponse
    {
        $request->validate([
            'document' => 'required|file|mimes:pdf|max:10240',
        ]);

        $url = $this->cloudinary->uploadDocument(
            $request->file('document'),
            'documents'
        );

        return response()->json([
            'message'      => 'Document uploaded successfully',
            'document_url' => $url,
        ]);
    }
}
