<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TrainingParticipation;
use App\Models\TrainingSession;
use Carbon\Carbon;

class TrainingParticipationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'training_session_id' => 'required|exists:training_sessions,id',
            'user_id' => 'required|exists:users,id',
            'status' => 'required|in:registered,attended,validated,failed,cancelled',
            'obtained_date' => 'nullable|date',
            'expiration_date' => 'nullable|date',
        ]);

        // Check if user is already registered for this session
        $exists = TrainingParticipation::where('training_session_id', $validated['training_session_id'])
            ->where('user_id', $validated['user_id'])
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'error' => 'User is already registered for this session'
            ], 422);
        }

        $participation = TrainingParticipation::create($validated);
        $participation->load('user');

        return response()->json([
            'success' => true,
            'data' => $participation
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $participation = TrainingParticipation::findOrFail($id);

        $validated = $request->validate([
            'status' => 'sometimes|required|in:registered,attended,validated,failed,cancelled',
            'obtained_date' => 'nullable|date',
            'expiration_date' => 'nullable|date',
            'certificate_path' => 'nullable|string',
        ]);

        // Automatic expiration calculation logic
        if (isset($validated['status']) && $validated['status'] === 'validated') {
            // If obtained_date is not provided, default to today
            $obtainedDate = isset($validated['obtained_date']) 
                ? Carbon::parse($validated['obtained_date']) 
                : ($participation->obtained_date ? Carbon::parse($participation->obtained_date) : Carbon::now());
            
            // Update obtained_date in validated data if it wasn't there
            $validated['obtained_date'] = $obtainedDate->format('Y-m-d');

            // Fetch the training to get validity_months
            $session = TrainingSession::with('training')->find($participation->training_session_id);
            
            if ($session && $session->training && $session->training->validity_months) {
                $expirationDate = $obtainedDate->copy()->addMonths($session->training->validity_months);
                $validated['expiration_date'] = $expirationDate->format('Y-m-d');
            }
        }

        $participation->update($validated);
        $participation->load('user');

        return response()->json([
            'success' => true,
            'data' => $participation
        ]);
    }

    public function destroy($id)
    {
        $participation = TrainingParticipation::findOrFail($id);
        $participation->delete();

        return response()->json([
            'success' => true,
            'message' => 'Participation removed successfully'
        ]);
    }
}
