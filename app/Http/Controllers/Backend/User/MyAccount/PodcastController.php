<?php

namespace App\Http\Controllers\Backend\User\MyAccount;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PodcastController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('backend/User/MyAccount/Podcast');
    }

    public function show(Request $request, string $episode): Response
    {
        return Inertia::render('backend/User/MyAccount/PodcastShow', [
            'episode' => $episode,
        ]);
    }
}
