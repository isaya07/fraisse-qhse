<?php

namespace App\Policies;

use App\Models\Action;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ActionPolicy
{
    public function before(User $user, $ability)
    {
        if ($user->role === 'admin') {
            return true;
        }
    }

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
        // View access via permission or general access
        if ($action->hasAccess($user, 'read')) {
            return true;
        }

        // By default all users can see actions for now, unless restricted?
        // Let's keep it open, but allow specific restrictions if added.
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
        // Permission system override
        if ($action->hasAccess($user, 'write')) {
            return true;
        }

        // Default logic: Creator or Assignee
        return $user->id === $action->created_by ||
            $user->id === $action->assigned_to;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Action $action): bool
    {
        // Permission system override
        if ($action->hasAccess($user, 'admin')) {
            return true;
        }

        // Default logic: Creator only
        return $user->id === $action->created_by;
    }
}
