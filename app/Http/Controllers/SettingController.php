<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Models\Place;
use App\Models\Film;
use App\Models\Seance;
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
        $seances = DB::table('seances')
            ->join('halls', 'seances.hall_id', '=', 'halls.id')
            ->join('films', 'seances.film_id', '=', 'films.id')
            ->select('seances.*', 'halls.name as hall_name', 'films.name as film_name', 'films.duration')
            ->get();

        //Log::channel('info')->info('в контроллере SettingController: {data}', [Place::all()]);
        return Inertia::render('Settings', [
            'halls' => Hall::all(),
            'places' => Place::all(),
            'movies' => Film::all(),
            'seances' => $seances,
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
