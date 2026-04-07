<?php

namespace App\Http\Controllers\Backend\User\UserDashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('backend/User/UserDashboard/Dashboard');
    }

    public function switchRole(Request $request): RedirectResponse
    {
        $user = $request->user();

        if (! $user) {
            return redirect()->route('user.dashboard')->with('error', 'User not found');
        }

        $user->is_operator = ! $user->is_operator;
        $user->save();

        $redirectUrl = $user->is_operator
            ? route('operator.dashboard')
            : route('user.dashboard');

        return redirect($redirectUrl);
    }
}
