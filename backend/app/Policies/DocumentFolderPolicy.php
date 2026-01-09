<?php

namespace App\Policies;

use App\Models\DocumentFolder;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DocumentFolderPolicy
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

    public function view(User $user, DocumentFolder $documentFolder)
    {
        return true;
    }

    public function create(User $user)
    {
        return in_array($user->role, ['admin', 'manager']);
    }

    public function update(User $user, DocumentFolder $documentFolder)
    {
        return in_array($user->role, ['admin', 'manager']);
    }

    public function delete(User $user, DocumentFolder $documentFolder)
    {
        return $user->role === 'admin';
    }
}
