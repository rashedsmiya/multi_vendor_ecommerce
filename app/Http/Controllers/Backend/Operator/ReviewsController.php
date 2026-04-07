<?php

namespace App\Http\Controllers\Backend\Operator;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ReviewsController extends Controller
{
    public function reviews(): \Inertia\Response
    {
        return Inertia::render('backend/Operator/Reviews');
    }
}
