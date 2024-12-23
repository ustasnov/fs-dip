<?php

namespace App\Http\Controllers;

use App\Models\Seance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class SeanceController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    //
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    Log::channel('info')->info($request);

    Validator::make($request->all(), [
      'hall_id' => 'required',
      'film_id' => 'required',
    ])->validate();

    $seance = new Seance();

    $seance->hall_id = $request->hall_id;
    $seance->film_id = $request->film_id;
    $seance->start = $request->start;
    $seance->end = $request->end;
    $seance->save();

    to_route('admin.index');
  }

  /**
   * Display the specified resource.
   */
  public function show(Seance $seance)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Seance $seance)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Seance $seance)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Seance $seance)
  {
    //
  }
}
