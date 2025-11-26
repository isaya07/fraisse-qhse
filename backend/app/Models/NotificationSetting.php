<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificationSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'email_enabled',
        'email_time',
        'alert_thresholds',
    ];

    protected $casts = [
        'email_enabled' => 'boolean',
        'alert_thresholds' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
