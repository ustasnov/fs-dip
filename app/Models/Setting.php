<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
  protected $fillable = [
    'hall1',
    'hall2',
    'hall3',
    'section1_opened',
    'section2_opened',
    'section3_opened',
    'section4_opened',
    'section5_opened',
  ];
}
