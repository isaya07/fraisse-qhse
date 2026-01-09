<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TrainingSessionController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        $this->authorize('viewAny', \App\Models\TrainingSession::class);

        $sessions = \App\Models\TrainingSession::with([
            'training',
            'organization',
            'participations.user',
            'documents',
            'permissions' => function ($q) use ($request) {
                $q->where('user_id', $request->user()->id);
            }
        ])->get();
        return response()->json([
            'success' => true,
            'data' => $sessions
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', \App\Models\TrainingSession::class);

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

        // Grant admin access to the creator
        $session->grantAccess($request->user(), 'admin');

        $session->load(['training', 'organization']);

        return response()->json([
            'success' => true,
            'data' => $session
        ], 201);
    }

    public function show(Request $request, $id)
    {
        $session = \App\Models\TrainingSession::with([
            'training',
            'organization',
            'participations.user',
            'documents',
            'permissions' => function ($q) use ($request) {
                $q->where('user_id', $request->user()->id);
            }
        ])->findOrFail($id);

        $this->authorize('view', $session);

        return response()->json([
            'success' => true,
            'data' => $session
        ]);
    }

    public function update(Request $request, $id)
    {
        $session = \App\Models\TrainingSession::findOrFail($id);

        $this->authorize('update', $session);

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

        $this->authorize('delete', $session);

        $session->delete();

        return response()->json([
            'success' => true,
            'message' => 'Session deleted successfully'
        ]);
    }

    public function attachDocument(Request $request, $id)
    {
        $session = \App\Models\TrainingSession::findOrFail($id);
        $this->authorize('update', $session);

        $validated = $request->validate([
            'document_id' => 'required|exists:documents,id'
        ]);

        $session->documents()->syncWithoutDetaching([$validated['document_id']]);

        return response()->json([
            'success' => true,
            'message' => 'Document attached successfully',
            'data' => $session->documents
        ]);
    }

    public function detachDocument($id, $documentId)
    {
        $session = \App\Models\TrainingSession::findOrFail($id);
        $this->authorize('update', $session);

        $session->documents()->detach($documentId);

        return response()->json([
            'success' => true,
            'message' => 'Document detached successfully',
            'data' => $session->documents
        ]);
    }
}
