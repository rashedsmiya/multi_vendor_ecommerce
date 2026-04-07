<?php

namespace App\Http\Controllers\Backend\Operator;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileSettingsController extends Controller
{
    public function index(Request $request): Response|RedirectResponse
    {
        $user = $request->user();

        if ($user->is_admin) {
            return redirect()->route('admin.dashboard');
        }
        
        return Inertia::render('backend/Operator/Profile/ProfileSettings', [
            'user' => $user->only(['name', 'email']),
        ]);
    }

    public function verification(): Response
    {
        return Inertia::render('backend/Operator/Profile/ProfileVerification');
    }

    public function verify(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('backend/Operator/Profile/VerifyProfile', [
            'user' => $user->only(['name', 'first_name', 'last_name', 'email', 'phone_number']),
        ]);
    }
}
