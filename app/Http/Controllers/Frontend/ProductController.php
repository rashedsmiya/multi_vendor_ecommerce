<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function details(Request $request, string $product): Response
    {
        return Inertia::render('Frontend/ProductDetails', [
            'product' => $product,
        ]);
    }
}
