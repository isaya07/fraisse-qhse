<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrainingCategory extends Model
{
    protected $fillable = ['name', 'color', 'icon'];

    public function trainings()
    {
        return $this->hasMany(Training::class);
    }
}
