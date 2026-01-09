<?php

namespace App\Policies;

use App\Models\TrainingSession;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TrainingSessionPolicy
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

    public function view(User $user, TrainingSession $trainingSession)
    {
        if ($trainingSession->hasAccess($user, 'view')) {
            return true;
        }
        return true; // Public by default for now, or restriction logic
    }

    public function create(User $user)
    {
        return true; // Open creation for now
    }

    public function update(User $user, TrainingSession $trainingSession)
    {
        if ($trainingSession->hasAccess($user, 'update')) {
            return true;
        }
        return false;
    }

    public function delete(User $user, TrainingSession $trainingSession)
    {
        if ($trainingSession->hasAccess($user, 'delete')) {
            return true;
        }
        return false;
    }
}
