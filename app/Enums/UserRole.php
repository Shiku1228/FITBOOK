<?php

namespace App\Enums;

enum UserRole: string
{
    case Athlete = 'athlete';
    case Coach = 'coach';
    case FacilityOwner = 'facility_owner';
    case Admin = 'admin';
}
