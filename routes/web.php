<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HallController;
use App\Http\Controllers\FilmController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SeanceController;
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
Route::put('/admin/hall/{id}', [HallController::class, 'update'])->name('admin.update');
Route::post('/admin/film', [FilmController::class, 'store'])->name('admin.storeFilm');
Route::post('/admin/hallconf', [SettingController::class, 'storeHallConf'])->name('admin.storeHallConf');
Route::put('/admin/film/{id}', [FilmController::class, 'update'])->name('admin.updateFilm');
Route::delete('/admin/{id}', [HallController::class, 'destroy'])->name('admin.destroy');
Route::delete('/admin/film/{id}', [FilmController::class, 'destroy'])->name('admin.destroyFilm');
Route::post('/admin/seance', [SeanceController::class, 'store'])->name('admin.storeSeance');
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
