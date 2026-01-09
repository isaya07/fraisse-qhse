<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Indicator extends Model
{
    use HasFactory, \App\Traits\HasPermissions;

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
        'goal_type',
        'created_by',
        'is_active',
    ];

    protected $casts = [
        'target_value' => 'decimal:2',
        'threshold_min' => 'decimal:2',
        'threshold_max' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    protected $appends = ['can'];

    public function getCanAttribute()
    {
        $user = auth()->user();

        if (!$user) {
            return [];
        }

        return [
            'view' => $user->can('view', $this),
            'update' => $user->can('update', $this),
            'delete' => $user->can('delete', $this),
        ];
    }

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

    /**
     * Recalculate and update the trend direction based on the last two values and goal type.
     */
    public function updateTrend()
    {
        // Bypass relationship caching to ensure we get the latest values
        $values = \App\Models\IndicatorValue::where('indicator_id', $this->id)
            ->orderBy('date', 'desc')
            ->orderBy('id', 'desc')
            ->take(2)
            ->get();

        if ($values->count() < 2) {
            if ($values->count() === 0) {
                $this->trend_direction = 'neutral';
            }
            $this->save();
            return;
        }

        $current = (float) $values[0]->value;
        $previous = (float) $values[1]->value;

        // fwrite(STDERR, "Indicator {$this->id} current: {$current}, previous: {$previous}\n");

        $direction = 'neutral';

        if ($current > $previous) {
            $direction = 'positive';
        } elseif ($current < $previous) {
            $direction = 'negative';
        }

        $this->trend_direction = $direction;
        $this->save();
    }
}