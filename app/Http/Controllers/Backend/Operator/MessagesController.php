<?php

namespace App\Http\Controllers\Backend\Operator;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class MessagesController extends Controller
{
    public function index()
    {
        return Inertia::render('backend/Operator/Messages');
    }
}
