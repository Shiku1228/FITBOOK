# FitBook — Full Architecture & Implementation Guide

## Stack Summary

| Layer | Technology |
|---|---|
| Backend | Laravel 11 (PHP 8.3) |
| Database | MySQL 8 (Local/XAMPP) + Redis (Local) |
| File Storage | Local Public Storage / Cloudinary |
| Queue / Email | Redis (Local) + SMTP (Mailtrap/Gmail) |
| Real-time | Firebase RTDB + FCM |
| Maps | Google Maps API |
| Payments | PayMongo (GCash/cards PH) + Stripe (international) |
| AI Matching | OpenAI API (GPT-4o) |
| Infra | Cloudify / VPS + GitHub Actions CI/CD |

---

## Project Directory Structure

```
fitbook/
├── app/
│   ├── Console/
│   │   └── Commands/
│   │       ├── SyncFirebaseSlots.php
│   │       └── ExpireBookings.php
│   ├── Enums/
│   │   ├── BookingStatus.php
│   │   ├── UserRole.php
│   │   ├── PaymentGateway.php
│   │   └── SlotStatus.php
│   ├── Events/
│   │   ├── BookingConfirmed.php
│   │   ├── BookingCancelled.php
│   │   ├── PaymentReceived.php
│   │   └── SlotUpdated.php
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/
│   │   │   │   └── AuthController.php
│   │   │   ├── Athlete/
│   │   │   │   ├── BookingController.php
│   │   │   │   ├── CoachMatchController.php
│   │   │   │   └── FacilitySearchController.php
│   │   │   ├── Coach/
│   │   │   │   ├── AvailabilityController.php
│   │   │   │   ├── ProfileController.php
│   │   │   │   └── EarningsController.php
│   │   │   ├── Facility/
│   │   │   │   ├── FacilityController.php
│   │   │   │   ├── SlotController.php
│   │   │   │   └── MediaController.php
│   │   │   ├── Payment/
│   │   │   │   ├── PayMongoController.php
│   │   │   │   ├── StripeController.php
│   │   │   │   └── WebhookController.php
│   │   │   └── Admin/
│   │   │       ├── UserController.php
│   │   │       ├── ReportController.php
│   │   │       └── VerificationController.php
│   │   ├── Middleware/
│   │   │   ├── RoleMiddleware.php
│   │   │   ├── VerifiedOwner.php
│   │   │   └── ThrottleBookings.php
│   │   └── Requests/
│   │       ├── BookingRequest.php
│   │       ├── FacilityRequest.php
│   │       └── CoachProfileRequest.php
│   ├── Jobs/
│   │   ├── SendBookingConfirmation.php
│   │   ├── ProcessPayment.php
│   │   ├── SyncSlotToFirebase.php
│   │   ├── GenerateAICoachMatch.php
│   │   ├── SendPushNotification.php
│   │   └── UploadMediaToCloudinary.php
│   ├── Listeners/
│   │   ├── NotifyAthleteOnBooking.php
│   │   ├── NotifyCoachOnBooking.php
│   │   └── UpdateFirebaseOnSlotChange.php
│   ├── Models/
│   │   ├── User.php
│   │   ├── AthleteProfile.php
│   │   ├── CoachProfile.php
│   │   ├── Facility.php
│   │   ├── FacilitySlot.php
│   │   ├── Booking.php
│   │   ├── Payment.php
│   │   ├── Review.php
│   │   ├── Sport.php
│   │   ├── CoachSport.php
│   │   └── Notification.php
│   ├── Services/
│   │   ├── FirebaseService.php
│   │   ├── PayMongoService.php
│   │   ├── StripeService.php
│   │   ├── OpenAICoachMatchService.php
│   │   ├── CloudinaryUploadService.php
│   │   ├── GoogleMapsService.php
│   │   └── FCMService.php
│   └── Policies/
│       ├── BookingPolicy.php
│       ├── FacilityPolicy.php
│       └── CoachProfilePolicy.php
├── database/
│   ├── migrations/
│   │   ├── 2024_01_01_create_users_table.php
│   │   ├── 2024_01_02_create_athlete_profiles_table.php
│   │   ├── 2024_01_03_create_coach_profiles_table.php
│   │   ├── 2024_01_04_create_facilities_table.php
│   │   ├── 2024_01_05_create_facility_slots_table.php
│   │   ├── 2024_01_06_create_bookings_table.php
│   │   ├── 2024_01_07_create_payments_table.php
│   │   ├── 2024_01_08_create_reviews_table.php
│   │   ├── 2024_01_09_create_sports_table.php
│   │   └── 2024_01_10_create_notifications_table.php
│   └── seeders/
│       ├── SportSeeder.php
│       └── AdminSeeder.php
├── routes/
│   ├── api.php
│   ├── athlete.php
│   ├── coach.php
│   ├── facility.php
│   └── admin.php
├── docker/
│   ├── php/Dockerfile
│   ├── nginx/nginx.conf
│   └── supervisor/supervisord.conf
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── docker-compose.yml
└── docker-compose.prod.yml
```

---

## Database Schema

### users
```sql
CREATE TABLE users (
    id            CHAR(36) PRIMARY KEY,  -- UUID
    name          VARCHAR(255) NOT NULL,
    email         VARCHAR(255) UNIQUE NOT NULL,
    phone         VARCHAR(20),
    password      VARCHAR(255) NOT NULL,
    role          ENUM('athlete','coach','facility_owner','admin') NOT NULL,
    avatar_url    VARCHAR(500),          -- Cloudinary URL
    fcm_token     VARCHAR(500),          -- Firebase Cloud Messaging
    is_verified   BOOLEAN DEFAULT FALSE,
    is_active     BOOLEAN DEFAULT TRUE,
    email_verified_at TIMESTAMP NULL,
    created_at    TIMESTAMP DEFAULT NOW(),
    updated_at    TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);
```

### athlete_profiles
```sql
CREATE TABLE athlete_profiles (
    id            CHAR(36) PRIMARY KEY,
    user_id       CHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    bio           TEXT,
    skill_level   ENUM('beginner','intermediate','advanced','professional'),
    location_lat  DECIMAL(10,7),
    location_lng  DECIMAL(10,7),
    city          VARCHAR(100),
    preferred_sports JSON,               -- ["basketball","swimming"]
    ai_preference_vector JSON,           -- OpenAI embedding for matching
    created_at    TIMESTAMP DEFAULT NOW(),
    updated_at    TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);
```

### coach_profiles
```sql
CREATE TABLE coach_profiles (
    id              CHAR(36) PRIMARY KEY,
    user_id         CHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    headline        VARCHAR(255),
    bio             TEXT,
    hourly_rate     DECIMAL(10,2) NOT NULL,
    currency        CHAR(3) DEFAULT 'PHP',
    years_experience INT DEFAULT 0,
    certifications  JSON,                -- [{"name":"","issuer":"","year":2022}]
    location_lat    DECIMAL(10,7),
    location_lng    DECIMAL(10,7),
    city            VARCHAR(100),
    is_verified     BOOLEAN DEFAULT FALSE,
    stripe_account_id VARCHAR(255),      -- Stripe Connect
    paymongo_account_id VARCHAR(255),
    availability_json JSON,              -- weekly schedule template
    ai_bio_vector   JSON,                -- OpenAI embedding for AI matching
    avg_rating      DECIMAL(3,2) DEFAULT 0.00,
    total_reviews   INT DEFAULT 0,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);
```

### coach_sports
```sql
CREATE TABLE coach_sports (
    id         CHAR(36) PRIMARY KEY,
    coach_id   CHAR(36) NOT NULL REFERENCES coach_profiles(id) ON DELETE CASCADE,
    sport_id   INT NOT NULL REFERENCES sports(id),
    UNIQUE KEY uq_coach_sport (coach_id, sport_id)
);
```

### sports
```sql
CREATE TABLE sports (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    icon_url    VARCHAR(500),
    category    VARCHAR(100)
);
```

### facilities
```sql
CREATE TABLE facilities (
    id              CHAR(36) PRIMARY KEY,
    owner_id        CHAR(36) NOT NULL REFERENCES users(id),
    name            VARCHAR(255) NOT NULL,
    description     TEXT,
    address         TEXT NOT NULL,
    city            VARCHAR(100),
    location_lat    DECIMAL(10,7) NOT NULL,
    location_lng    DECIMAL(10,7) NOT NULL,
    google_place_id VARCHAR(255),
    sport_types     JSON,                -- ["basketball","badminton"]
    amenities       JSON,                -- ["parking","shower","locker"]
    photos          JSON,                -- ["https://res.cloudinary.com/...",...]
    documents       JSON,                -- business permits (Cloudinary URLs)
    hourly_rate     DECIMAL(10,2),
    currency        CHAR(3) DEFAULT 'PHP',
    capacity        INT DEFAULT 1,
    is_verified     BOOLEAN DEFAULT FALSE,
    is_active       BOOLEAN DEFAULT TRUE,
    avg_rating      DECIMAL(3,2) DEFAULT 0.00,
    total_reviews   INT DEFAULT 0,
    firebase_ref    VARCHAR(255),        -- RTDB path: /slots/{facility_id}
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
    INDEX idx_location (location_lat, location_lng),
    INDEX idx_city (city),
    INDEX idx_active_verified (is_active, is_verified)
);
```

### facility_slots
```sql
CREATE TABLE facility_slots (
    id              CHAR(36) PRIMARY KEY,
    facility_id     CHAR(36) NOT NULL REFERENCES facilities(id) ON DELETE CASCADE,
    start_datetime  DATETIME NOT NULL,
    end_datetime    DATETIME NOT NULL,
    status          ENUM('available','reserved','booked','blocked') DEFAULT 'available',
    price_override  DECIMAL(10,2) NULL,   -- NULL = use facility hourly_rate
    booked_by       CHAR(36) NULL REFERENCES users(id),
    firebase_synced_at TIMESTAMP NULL,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
    INDEX idx_facility_time (facility_id, start_datetime, status)
);
```

### coach_availability_slots
```sql
CREATE TABLE coach_availability_slots (
    id          CHAR(36) PRIMARY KEY,
    coach_id    CHAR(36) NOT NULL REFERENCES coach_profiles(id) ON DELETE CASCADE,
    start_datetime DATETIME NOT NULL,
    end_datetime   DATETIME NOT NULL,
    status      ENUM('available','booked','blocked') DEFAULT 'available',
    booked_by   CHAR(36) NULL REFERENCES users(id),
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at  TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
    INDEX idx_coach_time (coach_id, start_datetime, status)
);
```

### bookings
```sql
CREATE TABLE bookings (
    id              CHAR(36) PRIMARY KEY,
    booking_ref     VARCHAR(20) UNIQUE NOT NULL,  -- e.g. FB-2024-XXXXX
    athlete_id      CHAR(36) NOT NULL REFERENCES users(id),
    type            ENUM('facility','coach') NOT NULL,
    facility_id     CHAR(36) NULL REFERENCES facilities(id),
    coach_id        CHAR(36) NULL REFERENCES coach_profiles(id),
    slot_id         CHAR(36) NOT NULL,             -- FK to facility or coach slot
    start_datetime  DATETIME NOT NULL,
    end_datetime    DATETIME NOT NULL,
    duration_hours  DECIMAL(4,2) NOT NULL,
    subtotal        DECIMAL(10,2) NOT NULL,
    platform_fee    DECIMAL(10,2) NOT NULL,
    total_amount    DECIMAL(10,2) NOT NULL,
    currency        CHAR(3) DEFAULT 'PHP',
    status          ENUM('pending','confirmed','completed','cancelled','refunded') DEFAULT 'pending',
    cancellation_reason TEXT NULL,
    cancelled_by    CHAR(36) NULL REFERENCES users(id),
    cancelled_at    TIMESTAMP NULL,
    notes           TEXT,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
    INDEX idx_athlete (athlete_id, status),
    INDEX idx_facility (facility_id, start_datetime),
    INDEX idx_coach (coach_id, start_datetime)
);
```

### payments
```sql
CREATE TABLE payments (
    id                  CHAR(36) PRIMARY KEY,
    booking_id          CHAR(36) NOT NULL REFERENCES bookings(id),
    payer_id            CHAR(36) NOT NULL REFERENCES users(id),
    gateway             ENUM('paymongo','stripe') NOT NULL,
    gateway_payment_id  VARCHAR(255) NOT NULL,   -- PayMongo/Stripe payment intent ID
    gateway_checkout_id VARCHAR(255),
    method              VARCHAR(50),             -- 'gcash','card','paymaya'
    amount              DECIMAL(10,2) NOT NULL,
    currency            CHAR(3) DEFAULT 'PHP',
    status              ENUM('pending','paid','failed','refunded') DEFAULT 'pending',
    paid_at             TIMESTAMP NULL,
    refunded_at         TIMESTAMP NULL,
    refund_amount       DECIMAL(10,2) NULL,
    webhook_payload     JSON,
    created_at          TIMESTAMP DEFAULT NOW(),
    updated_at          TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
    UNIQUE KEY uq_gateway_payment (gateway, gateway_payment_id),
    INDEX idx_booking (booking_id),
    INDEX idx_status (status)
);
```

### payouts
```sql
CREATE TABLE payouts (
    id              CHAR(36) PRIMARY KEY,
    recipient_id    CHAR(36) NOT NULL REFERENCES users(id),
    booking_ids     JSON NOT NULL,               -- batch of booking IDs
    gross_amount    DECIMAL(10,2) NOT NULL,
    platform_cut    DECIMAL(10,2) NOT NULL,
    net_amount      DECIMAL(10,2) NOT NULL,
    gateway         ENUM('paymongo','stripe') NOT NULL,
    transfer_id     VARCHAR(255),
    status          ENUM('pending','processing','completed','failed') DEFAULT 'pending',
    processed_at    TIMESTAMP NULL,
    created_at      TIMESTAMP DEFAULT NOW()
);
```

### reviews
```sql
CREATE TABLE reviews (
    id          CHAR(36) PRIMARY KEY,
    booking_id  CHAR(36) NOT NULL REFERENCES bookings(id),
    reviewer_id CHAR(36) NOT NULL REFERENCES users(id),
    reviewee_type ENUM('facility','coach') NOT NULL,
    reviewee_id CHAR(36) NOT NULL,
    rating      TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment     TEXT,
    created_at  TIMESTAMP DEFAULT NOW(),
    UNIQUE KEY uq_booking_review (booking_id, reviewer_id)
);
```

### notifications
```sql
CREATE TABLE notifications (
    id          CHAR(36) PRIMARY KEY,
    user_id     CHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type        VARCHAR(100) NOT NULL,   -- 'booking_confirmed','payment_received', etc.
    title       VARCHAR(255),
    body        TEXT,
    data        JSON,
    read_at     TIMESTAMP NULL,
    sent_via    JSON,                    -- ["fcm","email"]
    created_at  TIMESTAMP DEFAULT NOW(),
    INDEX idx_user_unread (user_id, read_at)
);
```

---

## Key Service Implementations

### FirebaseService.php
```php
<?php
namespace App\Services;

use Kreait\Firebase\Factory;
use Kreait\Firebase\Database;

class FirebaseService
{
    protected Database $db;

    public function __construct()
    {
        $firebase = (new Factory)
            ->withServiceAccount(config('services.firebase.credentials'))
            ->withDatabaseUri(config('services.firebase.database_url'));

        $this->db = $firebase->createDatabase();
    }

    public function updateSlotStatus(string $facilityId, string $slotId, string $status): void
    {
        $this->db->getReference("slots/{$facilityId}/{$slotId}")
            ->update(['status' => $status, 'updated_at' => now()->toISOString()]);
    }

    public function setFacilitySlots(string $facilityId, array $slots): void
    {
        $this->db->getReference("slots/{$facilityId}")->set($slots);
    }

    public function getAvailableSlots(string $facilityId): array
    {
        return $this->db->getReference("slots/{$facilityId}")
            ->orderByChild('status')
            ->equalTo('available')
            ->getValue() ?? [];
    }
}
```

### OpenAICoachMatchService.php
```php
<?php
namespace App\Services;

use OpenAI\Laravel\Facades\OpenAI;
use App\Models\CoachProfile;
use App\Models\AthleteProfile;

class OpenAICoachMatchService
{
    public function generateEmbedding(string $text): array
    {
        $response = OpenAI::embeddings()->create([
            'model' => 'text-embedding-3-small',
            'input' => $text,
        ]);

        return $response->embeddings[0]->embedding;
    }

    public function buildCoachText(CoachProfile $coach): string
    {
        $sports = $coach->sports->pluck('name')->implode(', ');
        return "{$coach->headline}. {$coach->bio}. Sports: {$sports}. 
                Experience: {$coach->years_experience} years. 
                Level: {$coach->skill_level}. Location: {$coach->city}.";
    }

    public function buildAthleteText(AthleteProfile $athlete): string
    {
        $sports = implode(', ', $athlete->preferred_sports ?? []);
        return "Athlete looking for {$sports} coaching. 
                Skill level: {$athlete->skill_level}. Location: {$athlete->city}.
                Goals: {$athlete->bio}";
    }

    public function cosineSimilarity(array $a, array $b): float
    {
        $dot = array_sum(array_map(fn($x, $y) => $x * $y, $a, $b));
        $normA = sqrt(array_sum(array_map(fn($x) => $x ** 2, $a)));
        $normB = sqrt(array_sum(array_map(fn($x) => $x ** 2, $b)));
        return $normA && $normB ? $dot / ($normA * $normB) : 0.0;
    }

    public function getTopMatches(AthleteProfile $athlete, int $limit = 10): array
    {
        $athleteVector = $athlete->ai_preference_vector
            ?? $this->generateEmbedding($this->buildAthleteText($athlete));

        return CoachProfile::where('is_verified', true)
            ->whereNotNull('ai_bio_vector')
            ->get()
            ->map(fn($coach) => [
                'coach'      => $coach,
                'similarity' => $this->cosineSimilarity($athleteVector, $coach->ai_bio_vector),
            ])
            ->sortByDesc('similarity')
            ->take($limit)
            ->values()
            ->toArray();
    }
}
```

### PayMongoService.php
```php
<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;

class PayMongoService
{
    protected string $baseUrl = 'https://api.paymongo.com/v1';
    protected string $secretKey;

    public function __construct()
    {
        $this->secretKey = config('services.paymongo.secret_key');
    }

    protected function headers(): array
    {
        return [
            'Authorization' => 'Basic ' . base64_encode($this->secretKey . ':'),
            'Content-Type'  => 'application/json',
        ];
    }

    public function createGCashPayment(float $amount, string $bookingRef, string $returnUrl): array
    {
        $response = Http::withHeaders($this->headers())
            ->post("{$this->baseUrl}/links", [
                'data' => [
                    'attributes' => [
                        'amount'      => (int)($amount * 100), // centavos
                        'description' => "FitBook Booking #{$bookingRef}",
                        'remarks'     => $bookingRef,
                    ],
                ],
            ]);

        return $response->json();
    }

    public function createCheckoutSession(float $amount, string $bookingRef, string $returnUrl): array
    {
        $response = Http::withHeaders($this->headers())
            ->post("{$this->baseUrl}/checkout_sessions", [
                'data' => [
                    'attributes' => [
                        'billing'           => ['email' => auth()->user()->email],
                        'send_email_receipt'=> false,
                        'show_description'  => true,
                        'show_line_items'   => true,
                        'cancel_url'        => $returnUrl . '?status=cancelled',
                        'success_url'       => $returnUrl . '?status=success',
                        'description'       => "FitBook #{$bookingRef}",
                        'line_items'        => [[
                            'currency'  => 'PHP',
                            'amount'    => (int)($amount * 100),
                            'name'      => "Booking #{$bookingRef}",
                            'quantity'  => 1,
                        ]],
                        'payment_method_types' => ['gcash', 'card', 'paymaya'],
                        'reference_number'  => $bookingRef,
                    ],
                ],
            ]);

        return $response->json();
    }
}
```

---

## API Routes

```php
// routes/api.php

// Public
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login',    [AuthController::class, 'login']);
Route::get('/facilities/nearby', [FacilitySearchController::class, 'nearby']);
Route::get('/facilities/{id}',   [FacilitySearchController::class, 'show']);
Route::get('/sports',            [SportController::class, 'index']);

// Webhooks (no auth, signature-verified)
Route::post('/webhooks/paymongo', [WebhookController::class, 'paymongo']);
Route::post('/webhooks/stripe',   [WebhookController::class, 'stripe']);

// Athlete routes
Route::middleware(['auth:sanctum', 'role:athlete'])->prefix('athlete')->group(function () {
    Route::get('/coaches/match',         [CoachMatchController::class, 'match']);
    Route::get('/coaches/{id}',          [CoachMatchController::class, 'show']);
    Route::post('/bookings',             [BookingController::class, 'store']);
    Route::get('/bookings',              [BookingController::class, 'index']);
    Route::delete('/bookings/{id}',      [BookingController::class, 'cancel']);
    Route::post('/payments/checkout',    [PaymentController::class, 'checkout']);
    Route::post('/reviews',              [ReviewController::class, 'store']);
});

// Coach / Facility Owner routes
Route::middleware(['auth:sanctum', 'role:coach,facility_owner'])->prefix('owner')->group(function () {
    Route::apiResource('facilities',     FacilityController::class);
    Route::apiResource('slots',          SlotController::class);
    Route::get('/bookings',              [BookingController::class, 'ownerIndex']);
    Route::get('/earnings',              [EarningsController::class, 'index']);
    Route::post('/media/upload',         [MediaController::class, 'upload']);
    Route::patch('/profile',             [ProfileController::class, 'update']);
});

// Admin routes
Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/users',                 [UserController::class, 'index']);
    Route::patch('/users/{id}/verify',   [UserController::class, 'verify']);
    Route::get('/reports/revenue',       [ReportController::class, 'revenue']);
    Route::get('/reports/bookings',      [ReportController::class, 'bookings']);
});
```

---

## Docker Setup

### docker-compose.yml
```yaml
version: '3.9'
services:
  app:
    build: ./docker/php
    volumes:
      - .:/var/www/html
    depends_on:
      - mysql
      - redis
    environment:
      - APP_ENV=local

  nginx:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - .:/var/www/html
      - ./docker/nginx/nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - app

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: fitbook
      MYSQL_ROOT_PASSWORD: secret
    volumes:
      - mysql_data:/var/lib/mysql
    ports:
      - "3306:3306"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  worker:
    build: ./docker/php
    command: php artisan queue:work redis --sleep=3 --tries=3
    depends_on:
      - redis

volumes:
  mysql_data:
```

---

## GitHub Actions CI/CD

### .github/workflows/ci.yml
```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_DATABASE: fitbook_test
          MYSQL_ROOT_PASSWORD: secret
        options: --health-cmd="mysqladmin ping" --health-interval=10s

    steps:
      - uses: actions/checkout@v4

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.3'
          extensions: mbstring, pdo_mysql, redis

      - name: Install dependencies
        run: composer install --no-interaction --prefer-dist

      - name: Copy env
        run: cp .env.testing .env

      - name: Generate key
        run: php artisan key:generate

      - name: Run migrations
        run: php artisan migrate --force
        env:
          DB_CONNECTION: mysql
          DB_DATABASE: fitbook_test
          DB_USERNAME: root
          DB_PASSWORD: secret

      - name: Run tests
        run: php artisan test --parallel
```

---

## Environment Variables (.env keys)

```env
# App
APP_NAME=FitBook
APP_ENV=local
APP_URL=http://localhost:8000

# Database (XAMPP Default)
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fitbook
DB_USERNAME=root
DB_PASSWORD=

# Storage (Local instead of S3)
FILESYSTEM_DISK=public

# Cloudinary
CLOUDINARY_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Mail (Mailtrap instead of SES)
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="hello@fitbook.ph"

# Queue
QUEUE_CONNECTION=redis

# Firebase
FIREBASE_CREDENTIALS=storage/app/firebase-auth.json
FIREBASE_DATABASE_URL=https://fitbook-default-rtdb.asia-southeast1.firebasedatabase.app

# Google Maps
GOOGLE_MAPS_API_KEY=

# Payments
PAYMONGO_SECRET_KEY=
PAYMONGO_PUBLIC_KEY=
PAYMONGO_WEBHOOK_SECRET=
STRIPE_KEY=
STRIPE_SECRET=
STRIPE_WEBHOOK_SECRET=

# OpenAI
OPENAI_API_KEY=
OPENAI_ORGANIZATION=

# Platform Fee (percentage)
PLATFORM_FEE_PERCENTAGE=10
```

---

## Implementation Phases

### Phase 1 — Foundation (Weeks 1–3)
- Auth (Sanctum + roles), user registration flows, Cloudinary upload pipeline, base migrations

### Phase 2 — Core Booking (Weeks 4–6)
- Facility CRUD, slot management, Firebase RTDB real-time sync, booking flow (reserve → pay → confirm)

### Phase 3 — Payments (Weeks 7–8)
- PayMongo GCash/card checkout, Stripe international, webhook handlers, payout logic

### Phase 4 — AI & Maps (Weeks 9–10)
- OpenAI embedding generation, coach matching endpoint, Google Maps nearby search with geospatial filtering

### Phase 5 — Notifications & Admin (Weeks 11–12)
- FCM push via Redis jobs, SMTP email templates, admin dashboard, verification workflows, reporting

### Phase 6 — Hardening (Weeks 13–14)
- Rate limiting, idempotency keys on payments, load testing, CI/CD pipeline, staging → production deploy
