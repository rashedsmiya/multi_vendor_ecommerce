<?php

namespace App\Http\Controllers\Backend\User\MyAccount;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CoursesController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('backend/User/UserDashboard/Courses');
    }

    public function show(Request $request, string $course): Response
    {
        return Inertia::render('backend/User/UserDashboard/CourseShow', [
            'course' => $course,
        ]);
    }
}
