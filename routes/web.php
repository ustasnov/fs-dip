<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HallController;
use App\Http\Controllers\SettingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/*
Route::get('/admin', function () {
    return Inertia::render('Settings', [ HallController::class, 'index' ]);
});
*/
Route::get('/admin', [SettingController::class, 'index'])->name('admin.index');
Route::post('/admin', [HallController::class, 'store'])->name('admin.store');
Route::post('/admin/hallconf', [SettingController::class, 'storeHallConf'])->name('admin.storeHallConf');
Route::delete('/admin/{id}', [HallController::class, 'destroy'])->name('admin.destroy');
Route::get('/clear', function() {    
  Artisan::call('cache:clear');    
  Artisan::call('config:cache');    
  Artisan::call('view:clear');  
  Artisan::call('route:clear');  
  return "Кэш очищен.";});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
