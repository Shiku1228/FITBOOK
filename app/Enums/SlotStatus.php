<?php

namespace App\Enums;

enum SlotStatus: string
{
    case Available = 'available';
    case Reserved = 'reserved';
    case Booked = 'booked';
    case Blocked = 'blocked';
}
