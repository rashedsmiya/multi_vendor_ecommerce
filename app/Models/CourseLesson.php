<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourseLesson extends Model
{
    protected $fillable = [
        'section_id',
        'course_id',
        'title',
        'description',
        'lesson_type',
        'content',
        'video_url',
        'audio_url',
        'file_url',
        'video_duration_seconds',
        'sort_order',
    ];

    public function section(): BelongsTo
    {
        return $this->belongsTo(CourseSection::class, 'section_id');
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}
