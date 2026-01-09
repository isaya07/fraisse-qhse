<?php

namespace App\Policies;

use App\Models\MaintenanceLog;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MaintenanceLogPolicy
{
    use HandlesAuthorization;

    public function before(User $user, $ability)
    {
        if ($user->role === 'admin') {
            return true;
        }
    }

    public function viewAny(User $user)
    {
        return true;
    }

    public function view(User $user, MaintenanceLog $maintenanceLog)
    {
        return true;
    }

    public function create(User $user)
    {
        // Allow managers or admins? Or anyone?
        // Let's allow managers and admins for now.
        return in_array($user->role, ['admin', 'manager']);
    }

    public function update(User $user, MaintenanceLog $maintenanceLog)
    {
        return in_array($user->role, ['admin', 'manager']);
    }

    public function delete(User $user, MaintenanceLog $maintenanceLog)
    {
        return $user->role === 'admin';
    }
}
