<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of employees.
     */
    public function index(Request $request)
    {
        // Filter users that are considered "employees".
        // For now, we return all users, or filter by role if implemented.
        // You might want to filter by: where('role', 'employee') or whereDoesntHave('role', 'admin')

        $query = User::query();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%");
            });
        }

        // Exclude generic 'admin' if needed, or just list everyone for now
        $users = $query->orderBy('last_name')->orderBy('first_name')->paginate(20);

        return response()->json($users);
    }

    /**
     * Display the specified employee.
     */
    public function show(string $id)
    {
        $user = User::with([
            'equipmentAssignments.equipment.category',
            'currentEquipment',
            'documents',
            'notificationSettings'
        ])->findOrFail($id);

        // Load participations with training session info
        // We load generic training info through the session
        // Assuming we have TrainingParticipation model correctly set up

        // Manual load for training participations if relation isn't direct on User model yet
        // Check User model... it didn't have 'participations' relation in my view earlier.
        // Let's check TrainingParticipation model - it has belongsTo User.
        // So User should have hasMany TrainingParticipation.

        $participations = \App\Models\TrainingParticipation::with(['session.training', 'session.organization'])
            ->where('user_id', $user->id)
            ->orderByDesc('obtained_date')
            ->get();

        $user->setRelation('participations', $participations);

        return response()->json([
            'user' => $user,
            // We can structure the response to group things if needed, 
            // but attaching relations to user object is standard.
        ]);
    }
}
