<?php

namespace App\Http\Controllers\Backend\Operator;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class CommunityController extends Controller
{
    public function community(): \Inertia\Response
    {
        return Inertia::render('backend/Operator/Community');
    }
}
