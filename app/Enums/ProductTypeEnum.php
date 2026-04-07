<?php

namespace App\Enums;

enum ProductTypeEnum: string
{
    case PHYSICAL = 'physical';
    case DIGITAL = 'digital';

    public function label(): string
    {
        return match ($this) {
            self::PHYSICAL => 'Physical',
            self::DIGITAL => 'Digital',
        };
    }
}
