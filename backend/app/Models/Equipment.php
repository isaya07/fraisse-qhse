<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'serial_number',
        'internal_ref',
        'name',
        'brand',
        'model',
        'purchase_date',
        'manufacture_date',
        'expiration_date',
        'maintenance_frequency_months',
        'status',
        'location',
        'image_path',
    ];

    protected $casts = [
        'purchase_date' => 'date',
        'manufacture_date' => 'date',
        'expiration_date' => 'date',
    ];

    public function category()
    {
        return $this->belongsTo(EquipmentCategory::class, 'category_id');
    }

    public function assignments()
    {
        return $this->hasMany(EquipmentAssignment::class);
    }

    public function currentAssignment()
    {
        return $this->hasOne(EquipmentAssignment::class)->whereNull('returned_at')->latestOfMany();
    }

    public function maintenanceLogs()
    {
        return $this->hasMany(MaintenanceLog::class);
    }
}
