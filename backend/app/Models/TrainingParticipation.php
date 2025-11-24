<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrainingParticipation extends Model
{
    protected $fillable = [
        'training_session_id',
        'user_id',
        'status',
        'certificate_path',
        'obtained_date',
        'expiration_date'
    ];

    protected $casts = [
        'obtained_date' => 'date',
        'expiration_date' => 'date',
    ];

    public function session()
    {
        return $this->belongsTo(TrainingSession::class, 'training_session_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
