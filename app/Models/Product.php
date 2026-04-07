<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'title',
        'description',
        'price',
        'currency',
        'is_active',
        'average_rating',
        'primary_image_url',
        'slug',
        'operator_profile_id',
        'category_id',
    ];

    protected $casts = [
        'price' => 'float',
        'is_active' => 'boolean',
        'average_rating' => 'float',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function operatorProfile()
    {
        return $this->belongsTo(OperatorProfile::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
