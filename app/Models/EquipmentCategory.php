<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EquipmentCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'maintenance_frequency_months',
        'icon',
        'color',
    ];

    public function equipment()
    {
        return $this->hasMany(Equipment::class, 'category_id');
    }
}
