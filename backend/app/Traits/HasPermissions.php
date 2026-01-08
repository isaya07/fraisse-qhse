<?php

namespace App\Traits;

use App\Models\AccessControl;
use App\Models\User;

trait HasPermissions
{
    /**
     * Get all access control rules for this entity.
     */
    public function permissions()
    {
        return $this->morphMany(AccessControl::class, 'entity');
    }

    /**
     * Grant access to a user.
     *
     * @param User $user
     * @param string $level 'read', 'write', 'admin', etc.
     * @return AccessControl
     */
    public function grantAccess(User $user, string $level = 'read')
    {
        return $this->permissions()->updateOrCreate(
            ['user_id' => $user->id],
            ['access_level' => $level]
        );
    }

    /**
     * Revoke access for a user.
     *
     * @param User $user
     * @return bool
     */
    public function revokeAccess(User $user)
    {
        return $this->permissions()->where('user_id', $user->id)->delete();
    }

    /**
     * Check if a user has access at a specific level (or higher).
     * Simple implementation: exact match or 'admin' override.
     *
     * @param User $user
     * @param string $requiredLevel
     * @return bool
     */
    public function hasAccess(User $user, string $requiredLevel = 'read'): bool
    {
        // Use loaded collection if available to avoid N+1
        if ($this->relationLoaded('permissions')) {
            $permission = $this->permissions->first(function ($perm) use ($user) {
                return $perm->user_id === $user->id;
            });
        } else {
            $permission = $this->permissions()->where('user_id', $user->id)->first();
        }

        if (!$permission) {
            return false;
        }

        // Hierarchy basic logic: admin > write > read
        $levels = ['read' => 1, 'write' => 2, 'admin' => 3];

        $userLevelScore = $levels[$permission->access_level] ?? 0;
        $requiredScore = $levels[$requiredLevel] ?? 0;

        return $userLevelScore >= $requiredScore;
    }
}
