<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #e74c3c; color: white; padding: 20px; border-radius: 8px; }
        .details { background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .amount { font-size: 24px; font-weight: bold; color: #e74c3c; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏀 FitBook</h1>
        <h2>Booking Confirmed!</h2>
    </div>

    <p>Hi {{ $booking->athlete->name }},</p>
    <p>Your booking has been confirmed. Here are the details:</p>

    <div class="details">
        <p><strong>Booking Reference:</strong> {{ $booking->booking_ref }}</p>
        <p><strong>Facility:</strong> {{ $booking->facility->name }}</p>
        <p><strong>Date:</strong> {{ $booking->start_datetime->format('F j, Y') }}</p>
        <p><strong>Time:</strong> {{ $booking->start_datetime->format('g:i A') }} - {{ $booking->end_datetime->format('g:i A') }}</p>
        <p><strong>Duration:</strong> {{ $booking->duration_hours }} hours</p>
        <p class="amount">Total: ₱{{ number_format($booking->total_amount, 2) }}</p>
    </div>

    <p>Thank you for using FitBook!</p>
</body>
</html>