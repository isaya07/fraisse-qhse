<?php

namespace App\Policies;

use App\Models\Action;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ActionPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Action $action): bool
    {
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
    public function update(User $user, Action $action): bool
    {
        // Users can update actions they created or are assigned to
        // Admins can update everything (assuming 'admin' role exists, checking simple logic first)
        return $user->id === $action->created_by || 
               $user->id === $action->assigned_to ||
               $user->role === 'admin';
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Action $action): bool
    {
        // Only creator or admin can delete
        return $user->id === $action->created_by || $user->role === 'admin';
    }
}
