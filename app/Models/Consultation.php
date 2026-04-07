<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consultation extends Model
{
    protected $fillable = [
        'title',
        'description',
        'price',
        'is_active',
        'image',
        'category',
        'operator_id',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'price' => 'float',
    ];

    public function operator()
    {
        return $this->belongsTo(Admin::class, 'operator_id');
    }
}
