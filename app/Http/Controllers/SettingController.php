<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Models\Place;
use App\Http\Controllers\Controller;
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

    /**
     * Show the form for creating a new resource.
     */
    
}
