<?php

namespace App\Services;

use Kreait\Firebase\Contract\Database;

class FirebaseService
{
    public function __construct(
        protected Database $database
    ) {}

    public function syncSlot(string $facilityId, string $slotId, string $status): void
    {
        $this->database
            ->getReference("slots/{$facilityId}/{$slotId}")
            ->update([
                'status'     => $status,
                'updated_at' => now()->toISOString(),
            ]);
    }

    public function syncAllSlots(string $facilityId, array $slots): void
    {
        $data = [];
        foreach ($slots as $slot) {
            $data[$slot['id']] = [
                'status'         => $slot['status'],
                'start_datetime' => $slot['start_datetime'],
                'end_datetime'   => $slot['end_datetime'],
                'price_override' => $slot['price_override'],
                'updated_at'     => now()->toISOString(),
            ];
        }

        $this->database
            ->getReference("slots/{$facilityId}")
            ->set($data);
    }

    public function removeSlot(string $facilityId, string $slotId): void
    {
        $this->database
            ->getReference("slots/{$facilityId}/{$slotId}")
            ->remove();
    }
}