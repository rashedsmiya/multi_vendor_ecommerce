<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'seller'])->prefix('operator')->name('operator.')->group(function () {
    // Operator Routes
    Route::get('/dashboard', function () {
        return 'Operator Dashboard - Coming Soon';
    })->name('dashboard');
});
