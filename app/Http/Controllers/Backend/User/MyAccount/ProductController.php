<?php

namespace App\Http\Controllers\Backend\User\MyAccount;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('backend/User/MyAccount/Products');
    }

    public function show(Request $request, string $product): Response
    {
        return Inertia::render('backend/User/MyAccount/ProductShow', [
            'product' => $product,
        ]);
    }
}
