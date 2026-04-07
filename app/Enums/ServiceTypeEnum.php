<?php

namespace App\Enums;

enum ServiceTypeEnum: string
{
    case PRODUCT = 'product';
    case COURSE = 'course';
    case CONSULTATION = 'consultation';
    case PODCAST = 'podcast';
}
