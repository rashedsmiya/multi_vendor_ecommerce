<?php

namespace App\Models;

use App\Enums\ConsultationStatus;
use Illuminate\Database\Eloquent\Model;

class Consultation extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description',
        'price',
        'duration',
        'languages',
        'available_days',
        'start_time',
        'end_time',
        'is_active',
        'status',
        'image',
        'category',
        'operator_id',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'price' => 'float',
        'languages' => 'array',
        'available_days' => 'array',
        'status' => ConsultationStatus::class,
    ];

    public function operator()
    {
        return $this->belongsTo(Admin::class, 'operator_id');
    }

    public function bookings()
    {
        return $this->hasMany(ConsultationBooking::class);
    }
}
