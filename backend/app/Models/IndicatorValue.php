<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IndicatorValue extends Model
{
    use HasFactory;

    protected $fillable = [
        'indicator_id',
        'value',
        'date',
        'comment',
        'created_by',
    ];

    protected $casts = [
        'value' => 'decimal:2',
        'date' => 'date',
    ];

    public function indicator()
    {
        return $this->belongsTo(Indicator::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
