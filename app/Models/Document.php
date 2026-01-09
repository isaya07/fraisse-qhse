<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasPermissions;

class Document extends Model
{
    use HasFactory, HasPermissions;

    protected $fillable = [
        'title',
        'description',
        'filename',
        'filepath',
        'file_size',
        'mime_type',
        'version',
        'category_id',
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

    protected $appends = ['can'];

    public function getCanAttribute()
    {
        $user = request()->user();
        return [
            'view' => $user ? $user->can('view', $this) : false,
            'update' => $user ? $user->can('update', $this) : false,
            'delete' => $user ? $user->can('delete', $this) : false,
        ];
    }

    // Relations
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function versions()
    {
        return $this->hasMany(DocumentVersion::class)->orderBy('created_at', 'desc');
    }

    public function actions()
    {
        return $this->belongsToMany(Action::class, 'action_documents');
    }

    public function equipment()
    {
        return $this->belongsToMany(Equipment::class, 'document_equipment');
    }

    public function reviews()
    {
        return $this->hasMany(DocumentReview::class)->orderBy('created_at', 'desc');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}