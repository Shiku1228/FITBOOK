<?php

namespace App\Services;

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\UploadedFile;

class CloudinaryUploadService
{
    /**
     * Upload an image to Cloudinary.
     *
     * @param UploadedFile $file
     * @param string $folder
     * @return string The secure URL of the uploaded asset
     */
    public function uploadImage(UploadedFile $file, string $folder): string
    {
        $result = Cloudinary::upload($file->getRealPath(), [
            'folder' => "fitbook/{$folder}",
            'resource_type' => 'image',
        ]);

        return $result->getSecurePath();
    }

    /**
     * Upload a document to Cloudinary.
     *
     * @param UploadedFile $file
     * @param string $folder
     * @return string The secure URL of the uploaded asset
     */
    public function uploadDocument(UploadedFile $file, string $folder): string
    {
        $result = Cloudinary::upload($file->getRealPath(), [
            'folder' => "fitbook/{$folder}",
            'resource_type' => 'raw',
        ]);

        return $result->getSecurePath();
    }

    /**
     * Delete a file from Cloudinary.
     *
     * @param string $publicId
     */
    public function deleteFile(string $publicId): void
    {
        Cloudinary::destroy($publicId);
    }
}