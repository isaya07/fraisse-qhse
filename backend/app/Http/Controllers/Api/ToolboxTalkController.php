<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ToolboxTalk;
use Illuminate\Http\Request;

class ToolboxTalkController extends Controller
{
    public function index()
    {
        $talks = ToolboxTalk::with(['instructor', 'attendees'])->orderBy('date', 'desc')->get();
        return response()->json(['success' => true, 'data' => $talks]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'topic' => 'required|string',
            'instructor_id' => 'required|exists:users,id',
            'location' => 'required|string',
            'notes_path' => 'nullable|string',
            'attendees' => 'nullable|array',
            'attendees.*' => 'exists:users,id',
        ]);

        $talk = ToolboxTalk::create($validated);

        if (isset($validated['attendees'])) {
            $talk->attendees()->sync($validated['attendees']);
        }

        return response()->json(['success' => true, 'data' => $talk->load(['instructor', 'attendees'])], 201);
    }

    public function show(ToolboxTalk $toolboxTalk)
    {
        return response()->json(['success' => true, 'data' => $toolboxTalk->load(['instructor', 'attendees'])]);
    }

    public function update(Request $request, ToolboxTalk $toolboxTalk)
    {
        $validated = $request->validate([
            'date' => 'sometimes|date',
            'topic' => 'sometimes|string',
            'instructor_id' => 'sometimes|exists:users,id',
            'location' => 'sometimes|string',
            'notes_path' => 'nullable|string',
            'attendees' => 'nullable|array',
            'attendees.*' => 'exists:users,id',
        ]);

        $toolboxTalk->update($validated);

        if (isset($validated['attendees'])) {
            $toolboxTalk->attendees()->sync($validated['attendees']);
        }

        return response()->json(['success' => true, 'data' => $toolboxTalk->load(['instructor', 'attendees'])]);
    }

    public function destroy(ToolboxTalk $toolboxTalk)
    {
        $toolboxTalk->delete();
        return response()->json(['success' => true, 'message' => 'Toolbox talk deleted']);
    }
}
