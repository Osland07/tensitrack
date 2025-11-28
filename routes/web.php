<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

use App\Http\Controllers\Client\ClientScreeningController;
use App\Models\ScreeningHistory; // For route model binding

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Client Screening Routes
Route::get('screening', [ClientScreeningController::class, 'index'])->name('screening.index');
Route::post('screening', [ClientScreeningController::class, 'store'])->name('screening.store');
// Using route model binding for showResult, so ScreeningHistory is automatically injected
Route::get('screening/{screeningHistory}', [ClientScreeningController::class, 'showResult'])->name('screening.result');


use App\Http\Controllers\Api\ClientScreeningApiController; // Import the API controller

// API Routes for Screening Modal (accessible to guests)
Route::prefix('api/screening')->name('api.screening.')->group(function () {
    Route::get('questions', [ClientScreeningApiController::class, 'getQuestions'])->name('questions');
    Route::post('submit', [ClientScreeningApiController::class, 'submitScreening'])->name('submit');
    Route::post('bmi', [ClientScreeningApiController::class, 'saveBmiDetails'])->name('bmi');
});


use App\Http\Controllers\Admin\AdminDashboardController; // Import AdminDashboardController
use App\Http\Controllers\Client\ClientProfileController; // Import ClientProfileController

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Client Profile Route
    Route::get('client/profile', [ClientProfileController::class, 'index'])->name('client.profile.index');

    Route::get('profile', [\App\Http\Controllers\Admin\Settings\ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('profile', [\App\Http\Controllers\Admin\Settings\ProfileController::class, 'update'])->name('profile.update');
    Route::get('user-password', [\App\Http\Controllers\Admin\Settings\PasswordController::class, 'edit'])->name('user-password.edit');
    Route::put('user-password', [\App\Http\Controllers\Admin\Settings\PasswordController::class, 'update'])->name('user-password.update');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('risk-levels', \App\Http\Controllers\Admin\AdminRiskLevelController::class)->except(['show']);
        Route::get('risk-levels/print', [\App\Http\Controllers\Admin\AdminRiskLevelController::class, 'print'])->name('risk-levels.print');
        Route::resource('risk-factors', \App\Http\Controllers\Admin\AdminRiskFactorController::class)->except(['show']);
        Route::get('risk-factors/print', [\App\Http\Controllers\Admin\AdminRiskFactorController::class, 'print'])->name('risk-factors.print');

        Route::resource('rules', \App\Http\Controllers\Admin\AdminRuleController::class)->except(['show']);

        Route::resource('screening-history', \App\Http\Controllers\Admin\AdminScreeningHistoryController::class);
        Route::get('screening-history/print', [\App\Http\Controllers\Admin\AdminScreeningHistoryController::class, 'print'])->name('screening-history.print');

        Route::resource('roles', \App\Http\Controllers\Admin\AdminRoleController::class)->except(['show']);
        Route::resource('permissions', \App\Http\Controllers\Admin\AdminPermissionController::class)->except(['show']); // Permissions CRUD
        Route::resource('users', \App\Http\Controllers\Admin\AdminUserController::class); 

        Route::get('appearance', function () {
            return Inertia::render('admin/appearance/edit');
        })->name('appearance.edit');
    });
});
