<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'filename',
        'filepath',
        'file_size',
        'mime_type',
        'version',
        'category', // String for Type
        'document_folder_id',
        'status',
        'created_by',
        'approved_by',
        'published_date',
        'expires_date',
    ];

    protected $casts = [
        'published_date' => 'date',
        'expires_date' => 'date',
        'file_size' => 'integer',
    ];

    // Relations
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function actions()
    {
        return $this->belongsToMany(Action::class, 'action_documents');
    }
}