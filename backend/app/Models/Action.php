<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Action extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'action_type_id',
        'priority',
        'status',
        'assigned_to',
        'created_by',
        'due_date',
        'completed_date',
        'progress',
        'related_to',
        'related_id',
    ];

    protected $casts = [
        'due_date' => 'date',
        'completed_date' => 'date',
        'progress' => 'integer',
    ];

    // Relations
    public function actionType()
    {
        return $this->belongsTo(ActionType::class);
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function documents()
    {
        return $this->belongsToMany(Document::class, 'action_documents');
    }

    public function indicators()
    {
        return $this->belongsToMany(Indicator::class, 'action_indicators');
    }
}