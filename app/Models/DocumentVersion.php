<?php

namespace App\Models;

use App\Models\Document;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class DocumentVersion extends Model
{
    protected $fillable = [
        'document_id',
        'version',
        'filename',
        'filepath',
        'file_size',
        'mime_type',
        'changelog',
        'created_by',
    ];

    public function document()
    {
        return $this->belongsTo(Document::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
