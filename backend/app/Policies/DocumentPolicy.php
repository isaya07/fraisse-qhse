<?php

namespace App\Policies;

use App\Models\Document;
use App\Models\User;

class DocumentPolicy
{
    /**
     * Perform pre-authorization checks.
     */
    public function before(User $user, string $ability): ?bool
    {
        if ($user->role === 'admin') {
            return true;
        }

        return null;
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true; // Or check a global 'documents.view' permission
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Document $document): bool
    {
        // Public/Open by default OR check if user has 'read' access
        // If no rules exist, allow. If rules exist, check AccessControl.
        if ($document->permissions()->exists()) {
            return $document->hasAccess($user, 'read');
        }
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Document $document): bool
    {
        // Owner always has access
        if ($user->id === $document->created_by) {
            return true;
        }

        // Check explicit 'write' permission
        return $document->hasAccess($user, 'write');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Document $document): bool
    {
        return $user->id === $document->created_by || $document->hasAccess($user, 'admin');
    }
}
