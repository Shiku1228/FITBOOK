# 🏀 FitBook — Sports Facility & Coach Booking Platform

FitBook is a REST API backend built with Laravel 11 that connects athletes with sports facilities and coaches across the Philippines. Athletes can search nearby courts, book time slots, hire coaches, pay via GCash or card, and get matched with the right coach through AI — all in one platform.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Requirements](#requirements)
- [Local Setup](#local-setup)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [User Roles](#user-roles)
- [Payment Flow](#payment-flow)
- [AI Coach Matching](#ai-coach-matching)
- [Project Status](#project-status)

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Backend | Laravel 11 (PHP 8.2) | API framework |
| Database | MySQL 8 (XAMPP) | Primary data store |
| Real-time | Firebase RTDB | Live slot availability |
| Push Notifications | Firebase FCM | Mobile push alerts |
| File Storage | Cloudinary | Photos, permits, avatars |
| Payments | PayMongo | GCash, Maya, card (PH) |
| AI — Embeddings | Ollama `nomic-embed-text` | Coach vector matching |
| AI — Text | Ollama `llama3.2` | Coach recommendation text |
| Maps | Google Maps API | Nearby facility search |
| Email | Mailtrap SMTP | Transactional emails |
| Auth | Laravel Sanctum | API token authentication |
| Version Control | GitHub | Source code |

---

## Features

### Athlete
- Register and log in with role-based access
- Search sports facilities by location (lat/lng or address) within a radius
- View available time slots in real time via Firebase
- Book a facility slot with automatic fee calculation
- Pay via GCash, Maya, or card through PayMongo checkout
- Get AI-matched with the best coach based on sport and goals
- Receive booking confirmation via email and push notification
- Cancel bookings

### Coach / Facility Owner
- List and manage sports facilities with photos (Cloudinary)
- Create time slots (bulk supported) with optional price override
- Slots sync to Firebase RTDB in real time on every change
- Upload business permits and certifications
- View bookings and earnings

### Admin
- List and filter all users by role
- Verify coaches and facility owners
- Activate or deactivate user accounts
- View revenue reports (total payments, platform fees, monthly breakdown)
- View booking reports (by status, recent activity)

---

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client (Postman / Frontend)           │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP requests
                         ▼
┌─────────────────────────────────────────────────────────┐
│              Laravel 11 API (Sanctum + Roles)           │
│                                                         │
│  Auth  │  Athlete  │  Coach/Owner  │  Admin  │ Webhook  │
└──┬─────────┬──────────────┬─────────────┬──────────┬───┘
   │         │              │             │          │
   ▼         ▼              ▼             ▼          ▼
 MySQL   Firebase        Cloudinary   Mailtrap   PayMongo
 (data)  (real-time      (media)      (email)    (payments)
          slots + FCM)
              │                                    │
              ▼                                    ▼
         Athlete's                          Webhook fires
         device gets                        → DB updated
         live updates                       → Firebase synced
                                            → Email sent
                                            → FCM pushed
```

---

## Requirements

- PHP 8.2+
- Composer 2.x
- MySQL 8.0 (via XAMPP or standalone)
- [Ollama](https://ollama.com) installed locally with these models:
  ```bash
  ollama pull nomic-embed-text
  ollama pull llama3.2
  ```
- Firebase project with Realtime Database enabled
- Cloudinary account (free tier)
- PayMongo account (test mode, no card needed)
- Google Maps API key (Places API + Geocoding API enabled)
- Mailtrap account (free sandbox)

---

## Local Setup

### 1 — Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/fitbook.git
cd fitbook
```

### 2 — Install PHP dependencies

```bash
composer install
```

> If you hit SSL errors on Windows, run:
> ```bash
> composer config -g cafile "C:/xampp/php/extras/ssl/cacert.pem"
> ```

### 3 — Copy and configure environment

```bash
cp .env.example .env
php artisan key:generate
```

Fill in all required values in `.env` (see [Environment Variables](#environment-variables)).

### 4 — Create the database

In phpMyAdmin or MySQL CLI:

```sql
CREATE DATABASE fitbook CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5 — Run migrations and seeders

```bash
php artisan migrate
php artisan db:seed
```

### 6 — Place Firebase credentials

Download your Firebase service account JSON from:
Firebase Console → Project Settings → Service Accounts → Generate new private key

Save it to:
```
storage/app/firebase-credentials.json
```

### 7 — Start Ollama

Make sure Ollama is running (it starts automatically after install on Windows):

```bash
ollama serve
```

Verify models are available:
```bash
ollama list
# Should show: nomic-embed-text and llama3.2
```

### 8 — Start the development server

```bash
php artisan serve
```

API is now available at `http://127.0.0.1:8000`

### 9 — (Optional) Expose for PayMongo webhooks

To receive PayMongo webhooks locally, use ngrok:

```bash
ngrok http 8000
```

Register the forwarding URL in PayMongo Dashboard → Developers → Webhooks:
```
https://your-ngrok-url.ngrok-free.app/api/webhooks/paymongo
```

---

## Environment Variables

```env
# Application
APP_NAME=FitBook
APP_ENV=local
APP_URL=http://localhost:8000

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fitbook
DB_USERNAME=root
DB_PASSWORD=

# File Storage
FILESYSTEM_DISK=public

# Cloudinary
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Email (Mailtrap Sandbox)
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@fitbook.ph"
MAIL_FROM_NAME="FitBook"

# Queue
QUEUE_CONNECTION=sync

# Firebase
FIREBASE_CREDENTIALS=storage/app/firebase-credentials.json
FIREBASE_DATABASE_URL=https://YOUR_PROJECT-default-rtdb.asia-southeast1.firebasedatabase.app

# Google Maps
GOOGLE_MAPS_API_KEY=

# PayMongo
PAYMONGO_SECRET_KEY=sk_test_
PAYMONGO_PUBLIC_KEY=pk_test_
PAYMONGO_WEBHOOK_SECRET=

# Ollama (Local AI)
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_EMBEDDING_MODEL=nomic-embed-text
OLLAMA_TEXT_MODEL=llama3.2

# Platform Fee
PLATFORM_FEE_PERCENTAGE=10
```

---

## API Reference

Base URL: `http://127.0.0.1:8000/api`

All protected routes require:
```
Authorization: Bearer {token}
Accept: application/json
```

---

### Auth (Public)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and get token |
| POST | `/auth/logout` | Logout (requires token) |
| GET | `/auth/user` | Get current user (requires token) |

**Register body:**
```json
{
  "name": "Renz Latangga",
  "email": "renz@fitbook.com",
  "password": "password123",
  "password_confirmation": "password123",
  "role": "athlete"
}
```
> Valid roles: `athlete`, `coach`, `facility_owner`, `admin`

---

### Facilities (Public)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/facilities/nearby` | Search nearby facilities |
| GET | `/facilities/{id}` | Get facility with available slots |

**Nearby search params:**
```
?lat=8.2280&lng=124.2452&radius=20
?address=Iligan City&radius=10
```

---

### Media (Authenticated)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/media/avatar` | Upload user avatar (image, max 2MB) |
| POST | `/media/facility-photo` | Upload facility photo (image, max 5MB) |
| POST | `/media/document` | Upload permit/cert PDF (max 10MB) |

**Body:** `form-data` with key matching endpoint name (`avatar`, `photo`, `document`)

---

### Athlete Routes (role: athlete)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/athlete/coaches/match` | Get AI-matched coaches |
| GET | `/athlete/coaches/{id}` | Get coach profile |
| POST | `/athlete/bookings` | Create a booking |
| GET | `/athlete/bookings` | List my bookings |
| DELETE | `/athlete/bookings/{id}` | Cancel a booking |
| POST | `/athlete/payments/checkout` | Create PayMongo checkout session |
| GET | `/athlete/payments/success` | Payment success callback |
| GET | `/athlete/payments/cancel` | Payment cancel callback |

**Create booking body:**
```json
{
  "slot_id": "uuid-of-available-slot",
  "type": "facility",
  "notes": "Please prepare the court"
}
```

**Checkout body:**
```json
{
  "booking_id": "uuid-of-pending-booking"
}
```

**Checkout response:**
```json
{
  "checkout_url": "https://checkout.paymongo.com/...",
  "session_id": "cs_..."
}
```
> Open `checkout_url` in browser to complete GCash/card payment.

---

### Owner Routes (role: coach or facility_owner)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/owner/facilities` | List my facilities |
| POST | `/owner/facilities` | Create a facility |
| GET | `/owner/facilities/{id}` | Get a facility |
| PATCH | `/owner/facilities/{id}` | Update a facility |
| DELETE | `/owner/facilities/{id}` | Delete a facility |
| GET | `/owner/facilities/{id}/slots` | List slots for facility |
| POST | `/owner/facilities/{id}/slots` | Create slots (bulk) |
| PATCH | `/owner/facilities/{id}/slots/{slot}` | Update slot status |
| DELETE | `/owner/facilities/{id}/slots/{slot}` | Delete a slot |

**Create facility body:**
```json
{
  "name": "Iligan Sports Complex",
  "description": "Multi-sport facility",
  "address": "Quezon Avenue, Iligan City",
  "city": "Iligan",
  "location_lat": 8.2280,
  "location_lng": 124.2452,
  "sport_types": ["basketball", "badminton"],
  "hourly_rate": 500,
  "capacity": 20
}
```

**Create slots body (bulk):**
```json
{
  "slots": [
    {
      "start_datetime": "2026-07-01 08:00:00",
      "end_datetime": "2026-07-01 10:00:00"
    },
    {
      "start_datetime": "2026-07-01 10:00:00",
      "end_datetime": "2026-07-01 12:00:00",
      "price_override": 750
    }
  ]
}
```

---

### Admin Routes (role: admin)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/admin/users` | List all users (filterable by role) |
| PATCH | `/admin/users/{id}/verify` | Verify a user |
| PATCH | `/admin/users/{id}/activate` | Activate a user |
| PATCH | `/admin/users/{id}/deactivate` | Deactivate a user |
| GET | `/admin/verification/pending` | List pending verifications |
| POST | `/admin/verification/coach/{id}/approve` | Approve coach |
| POST | `/admin/verification/facility/{id}/approve` | Approve facility |
| GET | `/admin/reports/revenue` | Revenue report |
| GET | `/admin/reports/bookings` | Bookings report |

**List users with filter:**
```
GET /admin/users?role=coach
GET /admin/users?role=facility_owner
```

**Revenue report response:**
```json
{
  "total_payments": "19250.00",
  "total_platform_fees": "1650.00",
  "total_bookings": 14,
  "revenue_by_month": [
    { "month": "2026-06", "total": "19250.00" }
  ]
}
```

---

### Webhooks (Public, signature-verified)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/webhooks/paymongo` | PayMongo payment events |

> This endpoint is called automatically by PayMongo. Do not call it manually.
> On `checkout_session.payment.paid`: booking → confirmed, slot → booked, Firebase synced, email sent.

---

## Database Schema

### Core Tables

| Table | Description |
|---|---|
| `users` | All users with role column (athlete/coach/facility_owner/admin) |
| `athlete_profiles` | Extended profile for athletes including AI preference vector |
| `coach_profiles` | Coach bio, rate, certifications, AI bio vector for matching |
| `facilities` | Sports venues with location, pricing, Firebase ref |
| `facility_slots` | Time blocks for each facility with status tracking |
| `bookings` | Booking records linking athlete, facility/coach, slot |
| `payments` | Payment records from PayMongo with webhook payload |
| `notifications` | In-app notification log |
| `reviews` | Ratings for coaches and facilities |
| `sports` | Sports catalog |

### Key Design Decisions

- All primary keys are **UUIDs** (`CHAR(36)`) — safe for distributed systems
- `ai_bio_vector` and `ai_preference_vector` stored as **JSON** — 768-dimension Ollama embeddings
- `facility_slots.status` uses **optimistic locking** (`lockForUpdate`) to prevent double booking
- `payments` has a **unique constraint** on `(gateway, gateway_payment_id)` — prevents duplicate webhook processing
- `facilities` has **spatial indexes** on `(location_lat, location_lng)` — Haversine formula for nearby search
- `firebase_synced_at` tracks when each slot was last pushed to Firebase RTDB

---

## User Roles

```
athlete          → can search, book, pay, get coach matches
coach            → can manage profile, availability, view bookings
facility_owner   → can manage facilities, slots, view bookings
admin            → can verify users, view reports, manage all
```

Role is set at registration and enforced via `RoleMiddleware` on every protected route.

---

## Payment Flow

```
1. Athlete creates booking     → status: pending, slot: reserved
2. Athlete hits /checkout      → PayMongo checkout session created
3. Athlete pays via GCash      → PayMongo processes payment
4. PayMongo fires webhook      → POST /api/webhooks/paymongo
5. Laravel verifies signature  → HMAC-SHA256 with webhook secret
6. handlePaymentPaid fires:
   - booking.status → confirmed
   - slot.status    → booked
   - Firebase RTDB  → synced
   - Payment record → created
   - Email          → sent via Mailtrap
   - FCM push       → sent to athlete device
```

Platform fee: **10%** of subtotal (configurable via `PLATFORM_FEE_PERCENTAGE`)

---

## AI Coach Matching

FitBook uses two local Ollama models for coach matching — no external API costs:

**Step 1 — Embedding generation**
- Coach bio + sports + location → `nomic-embed-text` → 768-dimension vector stored in `coach_profiles.ai_bio_vector`
- Athlete goals + sport preferences → `nomic-embed-text` → 768-dimension vector

**Step 2 — Cosine similarity**
- Compare athlete vector against all verified coach vectors
- Ranked by similarity score (0.0 to 1.0)

**Step 3 — Recommendation text**
- Top matches sent to `llama3.2`
- Generates 2-3 sentence personalized explanation of why each coach is a good fit

**Example response:**
```json
{
  "coach": { "name": "Coach Juan dela Cruz", ... },
  "similarity": 0.8253,
  "recommendation": "Coach Juan dela Cruz is an excellent match for your basketball shooting goals. As a former PBA player with 5 years of coaching experience in Iligan City, his specialization in shooting and defense directly addresses what you are looking for."
}
```

---

## Project Status

### Completed
- [x] Phase 1 — Auth, roles, Cloudinary uploads
- [x] Phase 2 — Facility CRUD, slot management, Firebase RTDB sync, booking flow
- [x] Phase 3 — PayMongo GCash/card payments, webhook handler
- [x] Phase 4 — AI coach matching (Ollama), Google Maps nearby search
- [x] Phase 5 — Email notifications, FCM service, Admin panel

### Planned
- [ ] Phase 6 — Docker containerization, GitHub Actions CI/CD, production deployment
- [ ] Frontend — Vue.js or React SPA
- [ ] Stripe — international card payments
- [ ] Redis — background job queues
- [ ] Reviews — rating system for coaches and facilities
- [ ] Stripe Connect — automated payouts to coaches/owners

---      

## Contributing

This project is currently in active development as a learning project. Pull requests and feedback are welcome.

---

## License

MIT License — built by Renz Latangga as a portfolio project.