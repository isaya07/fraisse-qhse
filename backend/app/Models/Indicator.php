<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Indicator extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'manager_id',

        'indicator_category_id',
        'unit',
        'target_value',
        'threshold_min',
        'threshold_max',
        'calculation_method',
        'data_source',
        'frequency',
        'trend_direction',
        'created_by',
        'is_active',
    ];

    protected $casts = [
        'target_value' => 'decimal:2',
        'threshold_min' => 'decimal:2',
        'threshold_max' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    // Relations
    public function indicatorCategory()
    {
        return $this->belongsTo(IndicatorCategory::class, 'indicator_category_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id');
    }

    public function actions()
    {
        return $this->belongsToMany(Action::class, 'action_indicators');
    }

    public function values()
    {
        return $this->hasMany(IndicatorValue::class)->orderBy('date', 'desc');
    }
}