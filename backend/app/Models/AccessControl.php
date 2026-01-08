<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User; // Added for the user relationship

class AccessControl extends Model
{
    protected $fillable = [
        'user_id',
        'access_level',
        // 'entity_type' and 'entity_id' are handled by morphTo, but fillable here for explicit creation if needed
        'entity_type',
        'entity_id',
    ];

    public function entity()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
