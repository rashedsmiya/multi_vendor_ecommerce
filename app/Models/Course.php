<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Auth;

class Course extends Model
{
    protected $fillable = [
        'ulid',
        'user_id',
        'category_id',
        'title',
        'slug',
        'subtitle',
        'description',
        'level',
        'price',
        'currency',
        'is_free',
        'is_active',
        'average_rating',
        'thumbnail',
        'has_certificate',
        'total_sections',
        'total_lessons',
        'total_duration_minutes',
        'total_enrollments',
    ];

    protected $casts = [
        'price' => 'float',
        'is_free' => 'boolean',
        'is_active' => 'boolean',
        'has_certificate' => 'boolean',
        'average_rating' => 'float',
    ];

    public function scopeSelf(Builder $query): Builder
    {
        return $query->where('user_id', Auth::id());
    }

    public function sections(): HasMany
    {
        return $this->hasMany(CourseSection::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
