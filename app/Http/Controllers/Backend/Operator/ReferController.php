<?php

namespace App\Http\Controllers\Backend\Operator;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ReferController extends Controller
{
    public function refer()
    {
        return Inertia::render('backend/Operator/Refer');
    }
}
