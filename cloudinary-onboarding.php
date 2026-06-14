<?php

declare(strict_types=1);

use Cloudinary\Cloudinary;
use Cloudinary\Transformation\Format;
use Cloudinary\Transformation\Quality;
use Cloudinary\Transformation\Transformation;

require __DIR__ . '/vendor/autoload.php';

$cloudinary = new Cloudinary([
    'cloud' => [
        'cloud_name' => 'djze1lfpu',
        'api_key' => '965774916158733',
        'api_secret' => 'nR2MLZGEbiQiY-17tfFUl79L8Zg',
    ],
]);

$sampleImageUrl = 'https://res.cloudinary.com/demo/image/upload/sample.jpg';

echo "Uploading sample image: {$sampleImageUrl}" . PHP_EOL;

$uploadedImage = $cloudinary->uploadApi()->upload($sampleImageUrl, [
    'resource_type' => 'image',
    'folder' => 'fitbook/onboarding',
]);

$secureUrl = $uploadedImage['secure_url'] ?? '';
$publicId = $uploadedImage['public_id'] ?? '';

echo 'Upload secure URL: ' . $secureUrl . PHP_EOL;
echo 'Upload public ID: ' . $publicId . PHP_EOL;
echo 'Width: ' . ($uploadedImage['width'] ?? 'n/a') . PHP_EOL;
echo 'Height: ' . ($uploadedImage['height'] ?? 'n/a') . PHP_EOL;
echo 'Format: ' . ($uploadedImage['format'] ?? 'n/a') . PHP_EOL;
echo 'File size (bytes): ' . ($uploadedImage['bytes'] ?? 'n/a') . PHP_EOL;

$optimizedTransformation = (new Transformation())
    ->format(Format::auto()) // f_auto: lets Cloudinary choose the best output format for the browser.
    ->quality(Quality::auto()); // q_auto: lets Cloudinary choose an optimized quality level automatically.

$optimizedUrl = $cloudinary->image($publicId)->toUrl($optimizedTransformation);

echo PHP_EOL;
echo 'Done! Click link below to see optimized version of the image. Check the size and the format.' . PHP_EOL;
echo $optimizedUrl . PHP_EOL;
