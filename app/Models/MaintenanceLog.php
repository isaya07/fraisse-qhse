<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaintenanceLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'equipment_id',
        'type',
        'date',
        'description',
        'cost',
        'performer',
        'result',
        'next_maintenance_date',
        'document_path',
    ];

    protected $casts = [
        'date' => 'date',
        'next_maintenance_date' => 'date',
        'cost' => 'decimal:2',
    ];

    public function equipment()
    {
        return $this->belongsTo(Equipment::class);
    }
}
