<?php

namespace App\Models;

use App\Enums\BookingStatus;
use Illuminate\Database\Eloquent\Model;

class ConsultationBooking extends Model
{
    protected $fillable = [
        'consultation_id',
        'client_id',
        'status',
        'booked_at',
        'scheduled_at',
        'rejection_reason',
    ];

    protected $casts = [
        'status' => BookingStatus::class,
        'booked_at' => 'datetime',
        'scheduled_at' => 'datetime',
    ];

    public function consultation()
    {
        return $this->belongsTo(Consultation::class);
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }
}
