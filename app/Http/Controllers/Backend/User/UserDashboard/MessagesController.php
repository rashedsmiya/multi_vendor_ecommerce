<?php

namespace App\Http\Controllers\Backend\User\UserDashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MessagesController extends Controller
{
    public function messages(Request $request): Response
    {
        return Inertia::render('backend/User/UserDashboard/Messages');
    }
}
