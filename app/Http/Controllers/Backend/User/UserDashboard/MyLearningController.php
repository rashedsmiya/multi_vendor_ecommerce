<?php

namespace App\Http\Controllers\Backend\User\UserDashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MyLearningController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('backend/User/UserDashboard/MyLearning');
    }

    public function lesson(Request $request, string $course): Response
    {
        return Inertia::render('backend/User/UserDashboard/Lesson', [
            'course' => $course,
        ]);
    }

    public function submitReview(Request $request, string $course)
    {
        // Handle review submission logic
        return back()->with('success', 'Review submitted successfully.');
    }
}
