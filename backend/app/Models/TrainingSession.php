<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrainingSession extends Model
{
    protected $fillable = [
        'training_id',
        'training_organization_id',
        'start_date',
        'end_date',
        'location',
        'instructor',
        'max_participants',
        'cost',
        'status'
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    public function training()
    {
        return $this->belongsTo(Training::class);
    }

    public function organization()
    {
        return $this->belongsTo(TrainingOrganization::class, 'training_organization_id');
    }

    public function participations()
    {
        return $this->hasMany(TrainingParticipation::class);
    }

    public function documents()
    {
        return $this->belongsToMany(Document::class, 'training_session_documents');
    }
}
