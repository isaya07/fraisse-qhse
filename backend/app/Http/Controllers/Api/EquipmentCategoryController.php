<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EquipmentCategory;
use Illuminate\Http\Request;

class EquipmentCategoryController extends Controller
{
    public function index()
    {
        $categories = EquipmentCategory::withCount('equipment')->get();
        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:equipment,ppe,vehicle',
            'maintenance_frequency_months' => 'nullable|integer|min:1',
            'icon' => 'nullable|string',
            'color' => 'nullable|string',
        ]);

        $category = EquipmentCategory::create($validated);

        return response()->json([
            'success' => true,
            'data' => $category
        ], 201);
    }

    public function show(EquipmentCategory $equipmentCategory)
    {
        return response()->json([
            'success' => true,
            'data' => $equipmentCategory->loadCount('equipment')
        ]);
    }

    public function update(Request $request, EquipmentCategory $equipmentCategory)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'type' => 'sometimes|in:equipment,ppe,vehicle',
            'maintenance_frequency_months' => 'nullable|integer|min:1',
            'icon' => 'nullable|string',
            'color' => 'nullable|string',
        ]);

        $equipmentCategory->update($validated);

        return response()->json([
            'success' => true,
            'data' => $equipmentCategory
        ]);
    }

    public function destroy(EquipmentCategory $equipmentCategory)
    {
        $equipmentCategory->delete();

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully'
        ]);
    }
}
