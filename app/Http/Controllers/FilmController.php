<?php

namespace App\Http\Controllers;

use App\Models\Film;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FilmController extends Controller
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
    Validator::make($request->all(), [
      'name' => 'required|unique:films',
      'year' => 'required|integer|min:1895',
      'duration' => 'required',
      'poster' => 'image'
    ])->validate();

    $film = new Film();

    $film->name = $request->name;
    $film->description = $request->description;
    $film->year = $request->year;
    $film->duration = $request->duration;
    $film->poster = 'image';
    $film->save();

    to_route('admin.index');
  }

  /**
   * Display the specified resource.
   */
  public function show(Film $film)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Film $film)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Film $film)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Film $film)
  {
    //
  }
}
