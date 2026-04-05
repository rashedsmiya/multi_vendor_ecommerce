<?php

use App\Http\Controllers\Frontend\CourseController;
use App\Http\Controllers\Frontend\FrontendController;
use App\Http\Controllers\Frontend\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', [FrontendController::class, 'index'])->name('home');
Route::get('/search', [FrontendController::class, 'search'])->name('search');
Route::middleware('auth')->group(function () {
    Route::get('/courses/{course}', [CourseController::class, 'details'])->name('courses.details');
    Route::controller(ProductController::class)->prefix('products')->name('product.')->group(function () {
        Route::get('/{product}', 'details')->name('details');
    });
});
