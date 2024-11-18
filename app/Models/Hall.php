<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hall extends Model
{
    protected $fillable = [
      'name',
      'number_of_rows',
      'chairs_in_row',
    ];
}
