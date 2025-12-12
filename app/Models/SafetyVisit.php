<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SafetyVisit extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'location',
        'auditor_id',
        'score',
        'status',
        'report_path',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function auditor()
    {
        return $this->belongsTo(User::class, 'auditor_id');
    }
}
