<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function details(Request $request, string $course): Response
    {
        $course = Course::where('slug', $course)
            ->with(['user:id,first_name,last_name', 'category:id,slug,name'])
            ->firstOrFail();

        return Inertia::render('Frontend/CourseDetails', [
            'course' => [
                'id' => $course->id,
                'title' => $course->title,
                'description' => $course->description,
                'price' => $course->price,
                'currency' => $course->currency,
                'is_free' => $course->is_free,
                'average_rating' => $course->average_rating,
                'thumbnail' => $course->thumbnail,
                'instructor' => $course->user?->first_name.' '.$course->user?->last_name,
                'category' => $course->category?->name,
            ],
        ]);
    }
}
