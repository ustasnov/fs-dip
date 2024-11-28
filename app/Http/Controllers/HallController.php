<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class HallController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
        /*
        return Inertia::render('Settings', [
            'halls' => Hall::all(),
        ]);
        */
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
            'name' => 'required|unique:halls'
        ])->validate();

        $hall = new Hall();

        $hall->name = $request->name;
        $hall->number_of_rows = 5;
        $hall->chairs_in_row = 10;
        $hall->price = 0;
        $hall->vip_price = 0;
        $hall->save();

        //return redirect()->route('admin.index')->with('halls', Hall::all());
        return redirect()->route('admin.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Hall $hall)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Hall $hall)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Hall $hall)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $res = Hall::destroy($id);
        //return redirect()->route('admin.index')->with('halls', Hall::all());
        return redirect()->route('admin.index');
    }
}
