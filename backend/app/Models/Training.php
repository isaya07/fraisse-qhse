<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Training extends Model
{
    protected $fillable = [
        'training_category_id',
        'title',
        'description',
        'duration_hours',
        'validity_months',
        'required_frequency_months'
    ];

    public function category()
    {
        return $this->belongsTo(TrainingCategory::class, 'training_category_id');
    }

    public function sessions()
    {
        return $this->hasMany(TrainingSession::class);
    }
}
