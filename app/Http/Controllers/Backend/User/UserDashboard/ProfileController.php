<?php

namespace App\Http\Controllers\Backend\User\UserDashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function __invoke(Request $request): Response
    {
        return Inertia::render('backend/User/UserDashboard/Profile');
    }
}
