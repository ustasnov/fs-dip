<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
  protected $fillable = [
    'name',
    'description',
    'year',
    'duration',
    'poster',
  ];
}
