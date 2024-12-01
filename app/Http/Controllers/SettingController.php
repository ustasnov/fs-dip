<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Models\Place;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      return Inertia::render('Settings', [
        'halls' => Hall::all(),
        'places' => Place::all(),
      ]);
    }

    public function storeHallConf(Request $request) {
      Log::channel('info')->info($_REQUEST);
      to_route('admin.index');
    }
    
}
