<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrainingOrganization extends Model
{
    protected $fillable = ['name', 'contact_info', 'address'];

    public function trainingSessions()
    {
        return $this->hasMany(TrainingSession::class);
    }
}
