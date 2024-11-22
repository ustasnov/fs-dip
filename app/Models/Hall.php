<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Hall extends Model
{
    protected $fillable = [
      'name',
      'number_of_rows',
      'chairs_in_row',
    ];

    public function places(): HasMany {
      return $this->hasMany(Place::class);
  }
}
