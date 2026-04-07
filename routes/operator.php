<?php

use App\Http\Controllers\Backend\Operator\CommunityController;
use App\Http\Controllers\Backend\Operator\ConsultationController;
use App\Http\Controllers\Backend\Operator\CourseController;
use App\Http\Controllers\Backend\Operator\MessagesController;
use App\Http\Controllers\Backend\Operator\OperatorDashboardController;
use App\Http\Controllers\Backend\Operator\PodcastController;
use App\Http\Controllers\Backend\Operator\PodcastsController;
use App\Http\Controllers\Backend\Operator\ProductsController;
use App\Http\Controllers\Backend\Operator\ProfileSettingsController;
use App\Http\Controllers\Backend\Operator\ReferController;
use App\Http\Controllers\Backend\Operator\ReviewsController;
use App\Http\Controllers\Backend\Operator\WalletEarningsController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'operator'])->prefix('operator')->name('operator.')->group(function () {
    Route::get('/dashboard', [OperatorDashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile-settings', [ProfileSettingsController::class, 'index'])->name('profile-settings');
    Route::get('/profile-verification', [ProfileSettingsController::class, 'verification'])->name('profile-verification');
    Route::get('/verify-profile', [ProfileSettingsController::class, 'verify'])->name('verify-profile');
    Route::get('/messages', [MessagesController::class, 'index'])->name('messages');
    Route::get('/community', [CommunityController::class, 'community'])->name('community');
    Route::get('/reviews', [ReviewsController::class, 'reviews'])->name('reviews');
    Route::get('/refer', [ReferController::class, 'refer'])->name('refer');
    Route::get('/manage-podcasts', [PodcastsController::class, 'podcasts'])->name('manage-podcasts');
    Route::get('/create-podcast', [PodcastsController::class, 'createPodcast'])->name('create-podcast');
    Route::get('/pre-recorded', [PodcastsController::class, 'prerecorded'])->name('pre-recorded');
    Route::get('/live-session', [PodcastsController::class, 'liveSession'])->name('live-session');
    // Route::get('/manage-products', [ProductsController::class, 'products'])->name('manage-products');
    // Route::get('/addnew-product', [ProductsController::class, 'createProduct'])->name('addnew-product');
    // Route::get('show/{id}', [ProductsController::class, 'show'])->name('product');

    // Products
    Route::controller(ProductsController::class)->prefix('products')->name('products.')->group(function () {
        Route::get('/', 'products')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/', 'store')->name('store');
        Route::get('/{id}', 'show')->name('show');
        Route::get('/{id}/edit', 'edit')->name('edit');
        Route::post('/{id}', 'update')->name('update');
        Route::delete('/{id}', 'destroy')->name('destroy');
        Route::patch('/{id}/switch-status', 'switchStatus')->name('switch-status');
    });
    // Courses
    Route::prefix('courses')->name('courses.')->group(function () {
        Route::get('/', [CourseController::class, 'index'])->name('index');
        Route::get('/create', [CourseController::class, 'create'])->name('create');
        Route::post('/', [CourseController::class, 'store'])->name('store');
        Route::get('/{course}/curriculum', [CourseController::class, 'curriculum'])->name('curriculum');
        Route::post('/{course}/curriculum', [CourseController::class, 'storeCurriculum'])->name('curriculum.store');
        Route::put('/{course}/curriculum', [CourseController::class, 'updateCurriculum'])->name('curriculum.update');
        Route::get('/{course}', [CourseController::class, 'show'])->name('show');
        Route::get('/{course}/edit', [CourseController::class, 'edit'])->name('edit');
        Route::put('/{course}/details', [CourseController::class, 'updateDetails'])->name('details.update');
        Route::put('/{course}', [CourseController::class, 'update'])->name('update');
        Route::delete('/{course}', [CourseController::class, 'destroy'])->name('destroy');
        Route::patch('/{course}/toggle-active', [CourseController::class, 'toggleActive'])->name('toggle-active');
    });

    // Consultations
    Route::prefix('consultations')->name('consultations.')->group(function () {
        Route::get('/', [ConsultationController::class, 'index'])->name('index');
        Route::get('/create', [ConsultationController::class, 'create'])->name('create');
        Route::post('/', [ConsultationController::class, 'store'])->name('store');
        Route::get('/{consultation}/edit', [ConsultationController::class, 'edit'])->name('edit');
        Route::put('/{consultation}', [ConsultationController::class, 'update'])->name('update');
        Route::delete('/{consultation}', [ConsultationController::class, 'destroy'])->name('destroy');
        Route::patch('/{consultation}/toggle-active', [ConsultationController::class, 'toggleActive'])->name('toggle-active');
        Route::post('/bookings/{booking}/accept', [ConsultationController::class, 'acceptBooking'])->name('bookings.accept');
        Route::post('/bookings/{booking}/reject', [ConsultationController::class, 'rejectBooking'])->name('bookings.reject');
        Route::post('/bookings/{booking}/reschedule', [ConsultationController::class, 'rescheduleBooking'])->name('bookings.reschedule');
    });

    // Podcasts
    Route::prefix('podcasts')->name('podcasts.')->group(function () {
        Route::get('/', [PodcastController::class, 'index'])->name('index');
        Route::get('/create', [PodcastController::class, 'create'])->name('create');
        Route::post('/', [PodcastController::class, 'store'])->name('store');
        Route::get('/{podcast}', [PodcastController::class, 'show'])->name('show');
        Route::get('/{podcast}/edit', [PodcastController::class, 'edit'])->name('edit');
        Route::put('/{podcast}', [PodcastController::class, 'update'])->name('update');
        Route::delete('/{podcast}', [PodcastController::class, 'destroy'])->name('destroy');
        Route::patch('/{podcast}/toggle-published', [PodcastController::class, 'togglePublished'])->name('toggle-published');
    });

    // Withdraws (Wallet & Earnings)
    Route::prefix('withdraws')->name('withdraws.')->group(function () {
        Route::get('/', [WalletEarningsController::class, 'index'])->name('index');
        Route::get('/create', [WalletEarningsController::class, 'create'])->name('create');
        Route::get('/create-method', [WalletEarningsController::class, 'createMethod'])->name('create-method');
        Route::delete('/payment-methods/{paymentMethod}', [WalletEarningsController::class, 'destroyPaymentMethod'])->name('payment-methods.destroy');
        Route::post('/', [WalletEarningsController::class, 'store'])->name('store');
        Route::delete('/{withdraw}', [WalletEarningsController::class, 'destroy'])->name('destroy');
    });
});
