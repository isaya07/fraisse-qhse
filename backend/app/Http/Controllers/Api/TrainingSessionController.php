<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TrainingSessionController extends Controller
{
    public function index()
    {
        $sessions = \App\Models\TrainingSession::with(['training', 'organization', 'participations', 'documents'])->get();
        return response()->json([
            'success' => true,
            'data' => $sessions
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'training_id' => 'required|exists:trainings,id',
            'training_organization_id' => 'nullable|exists:training_organizations,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'location' => 'required|string|max:255',
            'instructor' => 'nullable|string|max:255',
            'max_participants' => 'nullable|integer|min:1',
            'cost' => 'nullable|numeric|min:0',
            'status' => 'required|in:planned,completed,cancelled',
        ]);

        $session = \App\Models\TrainingSession::create($validated);
        $session->load(['training', 'organization']);

        return response()->json([
            'success' => true,
            'data' => $session
        ], 201);
    }

    public function show($id)
    {
        $session = \App\Models\TrainingSession::with(['training', 'organization', 'participations.user', 'documents'])->findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $session
        ]);
    }

    public function update(Request $request, $id)
    {
        $session = \App\Models\TrainingSession::findOrFail($id);

        $validated = $request->validate([
            'training_id' => 'sometimes|required|exists:trainings,id',
            'training_organization_id' => 'nullable|exists:training_organizations,id',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'sometimes|required|date|after_or_equal:start_date',
            'location' => 'sometimes|required|string|max:255',
            'instructor' => 'nullable|string|max:255',
            'max_participants' => 'nullable|integer|min:1',
            'cost' => 'nullable|numeric|min:0',
            'status' => 'sometimes|required|in:planned,completed,cancelled',
        ]);

        $session->update($validated);
        $session->load(['training', 'organization']);

        return response()->json([
            'success' => true,
            'data' => $session
        ]);
    }

    public function destroy($id)
    {
        $session = \App\Models\TrainingSession::findOrFail($id);
        $session->delete();

        return response()->json([
            'success' => true,
            'message' => 'Session deleted successfully'
        ]);
    }
}
