<?php

use App\Http\Controllers\Backend\User\MyAccount\ConsultationController;
use App\Http\Controllers\Backend\User\MyAccount\CoursesController;
use App\Http\Controllers\Backend\User\MyAccount\MyAccountController;
use App\Http\Controllers\Backend\User\MyAccount\PodcastController;
use App\Http\Controllers\Backend\User\MyAccount\ProductController;
use App\Http\Controllers\Backend\User\UserDashboard\CommunityController;
use App\Http\Controllers\Backend\User\UserDashboard\DashboardController;
use App\Http\Controllers\Backend\User\UserDashboard\MessagesController;
use App\Http\Controllers\Backend\User\UserDashboard\MyLearningController;
use App\Http\Controllers\Backend\User\UserDashboard\ProfileController;
use App\Http\Controllers\Backend\User\UserDashboard\ReferController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('user')->name('user.')->group(function () {
    Route::post('/switch-role', [DashboardController::class, 'switchRole'])->name('switch-role');
});

Route::middleware(['auth', 'verified', 'buyer'])->prefix('user')->name('user.')->group(function () {
    // User Routes
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/my-account/profile', ProfileController::class)->name('my-account.profile');
    Route::get('/my-learning', [MyLearningController::class, 'index'])->name('my-learning');
    Route::get('/my-learning/courses/{course}/lesson', [MyLearningController::class, 'lesson'])->name('my-learning.course.lesson');
    Route::post('/my-learning/courses/{course}/review', [MyLearningController::class, 'submitReview'])->name('my-learning.course.review.submit');
    Route::get('/my-account/about', [MyAccountController::class, 'about'])->name('my-account.about');
    Route::post('/my-account/about', [MyAccountController::class, 'update'])->name('my-account.update');
    Route::get('/my-account/reviews', [MyAccountController::class, 'reviews'])->name('my-account.reviews');
    Route::get('/my-account/consultations', [ConsultationController::class, 'index'])->name('my-account.consultations');
    Route::get('/consultations/{slug}', [ConsultationController::class, 'show'])->name('consultations.show');
    Route::get('/my-account/courses', [CoursesController::class, 'index'])->name('my-account.courses');
    Route::get('/my-account/courses/{course}', [CoursesController::class, 'show'])->name('my-account.courses.show');
    Route::get('/my-account/products', [ProductController::class, 'index'])->name('my-account.products');
    Route::get('/my-account/products/{product}', [ProductController::class, 'show'])->name('my-account.products.show');
    Route::get('/my-account/podcast', [PodcastController::class, 'index'])->name('my-account.podcast');
    Route::get('/my-account/podcast/{episode}', [PodcastController::class, 'show'])->name('my-account.podcast.show');
    Route::get('/refer', [ReferController::class, 'index'])->name('refer');
    Route::get('/community', [CommunityController::class, 'index'])->name('community');
    Route::get('/messages', [MessagesController::class, 'messages'])->name('messages');

});
