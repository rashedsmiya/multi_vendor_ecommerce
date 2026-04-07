<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description',
        'price',
        'currency',
        'is_free',
        'is_active',
        'average_rating',
        'thumbnail',
        'user_id',
        'category_id',
    ];

    protected $casts = [
        'price' => 'float',
        'is_free' => 'boolean',
        'is_active' => 'boolean',
        'average_rating' => 'float',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
