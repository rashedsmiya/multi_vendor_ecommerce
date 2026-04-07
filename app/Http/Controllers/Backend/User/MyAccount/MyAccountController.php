<?php

namespace App\Http\Controllers\Backend\User\MyAccount;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MyAccountController extends Controller
{
    public function about(Request $request): Response
    {
        return Inertia::render('backend/User/MyAccount/About');
    }

    public function update(Request $request)
    {
        // Handle account update logic
        return back()->with('success', 'Account updated successfully.');
    }

    public function reviews(Request $request): Response
    {
        return Inertia::render('backend/User/MyAccount/Reviews');
    }
}
