<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Models\Place;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      //Log::channel('info')->info('в контроллере SettingController: {data}', [Place::all()]);
      return Inertia::render('Settings', [
        'halls' => Hall::all(),
        'places' => Place::all(),
      ]);
    }

    public function storeHallConf(Request $request) {
      //Log::channel('info')->info($_REQUEST);
        DB::table('halls')->upsert($request['hallData'], 
        ['id'], ['number_of_rows', 'chairs_in_row']);
        DB::table('places')->upsert($request['places'], 
        ['hall_id', 'row', 'chair'], ['status', 'status']);
        to_route('admin.index');
    }
    
}
