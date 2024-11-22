<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      DB::table('settings')->insert([
        'hall1' => 1,
        'hall2' => 1,
        'hall3' => 1,
        'section1_opened' => true,
        'section2_opened' => true,
        'section3_opened' => true,
        'section4_opened' => true,
        'section5_opened' => true,
      ]);
    }
}
