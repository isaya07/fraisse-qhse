<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SafetyVisit;
use Illuminate\Http\Request;

class SafetyVisitController extends Controller
{
    public function index()
    {
        $visits = SafetyVisit::with('auditor')->orderBy('date', 'desc')->get();
        return response()->json(['success' => true, 'data' => $visits]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'location' => 'required|string',
            'auditor_id' => 'required|exists:users,id',
            'score' => 'nullable|integer|min:0|max:100',
            'status' => 'required|in:planned,completed,cancelled',
            'report_path' => 'nullable|string',
        ]);

        $visit = SafetyVisit::create($validated);

        return response()->json(['success' => true, 'data' => $visit->load('auditor')], 201);
    }

    public function show(SafetyVisit $safetyVisit)
    {
        return response()->json(['success' => true, 'data' => $safetyVisit->load('auditor')]);
    }

    public function update(Request $request, SafetyVisit $safetyVisit)
    {
        $validated = $request->validate([
            'date' => 'sometimes|date',
            'location' => 'sometimes|string',
            'auditor_id' => 'sometimes|exists:users,id',
            'score' => 'nullable|integer|min:0|max:100',
            'status' => 'sometimes|in:planned,completed,cancelled',
            'report_path' => 'nullable|string',
        ]);

        $safetyVisit->update($validated);

        return response()->json(['success' => true, 'data' => $safetyVisit->load('auditor')]);
    }

    public function destroy(SafetyVisit $safetyVisit)
    {
        $safetyVisit->delete();
        return response()->json(['success' => true, 'message' => 'Safety visit deleted']);
    }
}
