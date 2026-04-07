<?php

namespace App\Http\Controllers\Backend\User\MyAccount;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ConsultationController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('backend/User/UserDashboard/Consultations');
    }

    public function show(Request $request, string $slug): Response
    {
        return Inertia::render('backend/User/UserDashboard/ConsultationShow', [
            'slug' => $slug,
        ]);
    }
}
