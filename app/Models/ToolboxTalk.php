<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToolboxTalk extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'topic',
        'instructor_id',
        'location',
        'notes_path',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }

    public function attendees()
    {
        return $this->belongsToMany(User::class, 'toolbox_talk_attendees');
    }
}
