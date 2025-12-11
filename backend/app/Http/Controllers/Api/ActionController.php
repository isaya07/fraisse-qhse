<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreActionRequest;
use App\Http\Requests\UpdateActionRequest;
use App\Models\Action;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ActionController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Action::class);

        $query = Action::with(['creator', 'assignee', 'documents', 'indicators', 'actionType'])
            ->select('id', 'title', 'action_type_id', 'priority', 'status', 'assigned_to', 'created_by', 'due_date', 'completed_date', 'progress', 'related_to', 'related_id', 'created_at', 'updated_at');

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->has('action_type_id') && $request->action_type_id) {
            $query->where('action_type_id', $request->action_type_id);
        }

        if ($request->has('priority') && $request->priority) {
            $query->where('priority', $request->priority);
        }

        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        $actions = $query->orderBy('created_at', 'desc')->paginate($request->input('limit', 15));

        return response()->json($actions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreActionRequest $request)
    {
        $this->authorize('create', Action::class);

        $validated = $request->validated();
        $validated['created_by'] = $request->user()->id;

        $action = Action::create($validated);

        return response()->json($action->load(['creator', 'assignee', 'documents', 'indicators', 'actionType']), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $action = Action::with(['creator', 'assignee', 'documents', 'indicators', 'actionType', 'comments.user'])->findOrFail($id);

        $this->authorize('view', $action);

        return response()->json($action);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateActionRequest $request, $id)
    {
        $action = Action::findOrFail($id);

        $this->authorize('update', $action);

        $validated = $request->validated();

        $action->update($validated);

        return response()->json($action->load(['creator', 'assignee', 'documents', 'indicators', 'actionType']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $action = Action::findOrFail($id);

        $this->authorize('delete', $action);

        $action->delete();

        return response()->json(['message' => 'Action deleted successfully']);
    }

    public function attachDocument(Request $request, $id)
    {
        $action = Action::findOrFail($id);
        $this->authorize('update', $action);

        $request->validate([
            'document_id' => 'required|exists:documents,id'
        ]);

        $action->documents()->syncWithoutDetaching([$request->document_id]);

        return response()->json($action->load(['creator', 'assignee', 'documents', 'indicators', 'actionType', 'comments.user']));
    }

    public function detachDocument(Request $request, $id, $documentId)
    {
        $action = Action::findOrFail($id);
        $this->authorize('update', $action);

        $action->documents()->detach($documentId);

        return response()->json($action->load(['creator', 'assignee', 'documents', 'indicators', 'actionType', 'comments.user']));
    }

    public function attachIndicator(Request $request, $id)
    {
        $action = Action::findOrFail($id);
        $this->authorize('update', $action);

        $request->validate([
            'indicator_id' => 'required|exists:indicators,id'
        ]);

        $action->indicators()->syncWithoutDetaching([$request->indicator_id]);

        return response()->json($action->load(['creator', 'assignee', 'documents', 'indicators', 'actionType', 'comments.user']));
    }

    public function detachIndicator(Request $request, $id, $indicatorId)
    {
        $action = Action::findOrFail($id);
        $this->authorize('update', $action);

        $action->indicators()->detach($indicatorId);

        return response()->json($action->load(['creator', 'assignee', 'documents', 'indicators', 'actionType', 'comments.user']));
    }

    public function updateProgress(Request $request, $id)
    {
        $action = Action::findOrFail($id);
        $this->authorize('update', $action);

        $request->validate([
            'progress' => 'required|integer|min:0|max:100'
        ]);

        $action->update(['progress' => $request->progress]);

        // Auto-update status based on progress if needed, but for now we trust the user or separate status update.
        // Commonly: 100% -> completed.
        if ($request->progress == 100 && $action->status !== 'completed') {
            $action->update(['status' => 'completed', 'completed_date' => now()]);
        } elseif ($request->progress < 100 && $action->status === 'completed') {
            $action->update(['status' => 'in_progress', 'completed_date' => null]);
        }


        return response()->json($action->load(['creator', 'assignee', 'documents', 'indicators', 'actionType', 'comments.user']));
    }
}