<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
  protected $fillable = [
    'hall_id',
    'row',
    'chair',
    'status',
  ];

}
