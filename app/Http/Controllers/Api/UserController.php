<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class UserController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', User::class);

        $query = User::select('id', 'username', 'email', 'first_name', 'last_name', 'role', 'is_active', 'created_at', 'updated_at');

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('username', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%");
            });
        }

        $users = $query->orderBy('created_at', 'desc')->paginate($request->input('limit', 15));

        return response()->json($users);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = User::select('id', 'username', 'email', 'first_name', 'last_name', 'role', 'is_active', 'created_at', 'updated_at')
                    ->findOrFail($id);

        $this->authorize('view', $user);

        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, $id)
    {
        $user = User::findOrFail($id);

        $this->authorize('update', $user);

        $validated = $request->validated();

        // Only admin can change role or active status
        if ((isset($validated['role']) || isset($validated['is_active'])) && Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized to change role or status'], 403);
        }

        $user->update($validated);

        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        $this->authorize('delete', $user);

        if ($user->id === Auth::id()) {
            return response()->json(['message' => 'Cannot delete your own account'], 400);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}
