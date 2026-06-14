<?php

namespace App\Enums;

enum PaymentGateway: string
{
    case PayMongo = 'paymongo';
    case Stripe = 'stripe';
}
