<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seance extends Model
{
    protected $fillable = [
        'hall_id',
        'film_id',
        'start',
        'end',
    ];
}
