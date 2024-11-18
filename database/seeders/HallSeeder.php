<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HallSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('halls')->insert([
            'name' => 'Зал 1',
            'number_of_rows' => 5,
            'chairs_in_row' => 10,
        ]);
        DB::table('halls')->insert([
            'name' => 'Зал 2',
            'number_of_rows' => 10,
            'chairs_in_row' => 10,
        ]);
        DB::table('halls')->insert([
            'name' => 'Зал 3',
            'number_of_rows' => 6,
            'chairs_in_row' => 10,
        ]);
    }
}
