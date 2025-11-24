<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TrainingController extends Controller
{
    public function index()
    {
        $trainings = \App\Models\Training::with('category')->get();
        return response()->json([
            'success' => true,
            'data' => $trainings
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'training_category_id' => 'required|exists:training_categories,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration_hours' => 'nullable|integer|min:1',
            'validity_months' => 'nullable|integer|min:1',
            'required_frequency_months' => 'nullable|integer|min:1',
        ]);

        $training = \App\Models\Training::create($validated);
        $training->load('category');

        return response()->json([
            'success' => true,
            'data' => $training
        ], 201);
    }

    public function show($id)
    {
        $training = \App\Models\Training::with('category')->findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $training
        ]);
    }

    public function update(Request $request, $id)
    {
        $training = \App\Models\Training::findOrFail($id);

        $validated = $request->validate([
            'training_category_id' => 'sometimes|required|exists:training_categories,id',
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'duration_hours' => 'nullable|integer|min:1',
            'validity_months' => 'nullable|integer|min:1',
            'required_frequency_months' => 'nullable|integer|min:1',
        ]);

        $training->update($validated);
        $training->load('category');

        return response()->json([
            'success' => true,
            'data' => $training
        ]);
    }

    public function destroy($id)
    {
        $training = \App\Models\Training::findOrFail($id);
        $training->delete();

        return response()->json([
            'success' => true,
            'message' => 'Training deleted successfully'
        ]);
    }
}
