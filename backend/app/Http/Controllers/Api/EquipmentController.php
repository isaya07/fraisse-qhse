<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Equipment;
use App\Models\EquipmentAssignment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EquipmentController extends Controller
{
    public function index(Request $request)
    {
        $query = Equipment::with(['category', 'currentAssignment.user']);

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('location')) {
            $query->where('location', $request->location);
        }

        $equipment = $query->get();

        return response()->json([
            'success' => true,
            'data' => $equipment
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:equipment_categories,id',
            'serial_number' => 'required|string|unique:equipment,serial_number',
            'internal_ref' => 'nullable|string',
            'name' => 'required|string|max:255',
            'brand' => 'nullable|string',
            'model' => 'nullable|string',
            'purchase_date' => 'required|date',
            'manufacture_date' => 'nullable|date',
            'expiration_date' => 'nullable|date',
            'status' => 'required|in:available,assigned,maintenance,broken,retired',
            'location' => 'required|in:warehouse,workshop,office,vehicle,site',
            'image_path' => 'nullable|string',
            'maintenance_frequency_months' => 'nullable|integer|min:0',
        ]);

        $equipment = Equipment::create($validated);

        return response()->json([
            'success' => true,
            'data' => $equipment->load('category')
        ], 201);
    }

    public function show(Equipment $equipment)
    {
        return response()->json([
            'success' => true,
            'data' => $equipment->load(['category', 'currentAssignment.user', 'maintenanceLogs', 'assignments.user', 'documents'])
        ]);
    }

    public function update(Request $request, Equipment $equipment)
    {
        $validated = $request->validate([
            'category_id' => 'sometimes|exists:equipment_categories,id',
            'serial_number' => 'sometimes|string|unique:equipment,serial_number,' . $equipment->id,
            'internal_ref' => 'nullable|string',
            'name' => 'sometimes|string|max:255',
            'brand' => 'nullable|string',
            'model' => 'nullable|string',
            'purchase_date' => 'sometimes|date',
            'manufacture_date' => 'nullable|date',
            'expiration_date' => 'nullable|date',
            'status' => 'sometimes|in:available,assigned,maintenance,broken,retired',
            'location' => 'sometimes|in:warehouse,workshop,office,vehicle,site',
            'image_path' => 'nullable|string',
            'maintenance_frequency_months' => 'nullable|integer|min:0',
        ]);

        $equipment->update($validated);

        return response()->json([
            'success' => true,
            'data' => $equipment->load('category')
        ]);
    }

    public function destroy(Equipment $equipment)
    {
        $equipment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Equipment deleted successfully'
        ]);
    }

    public function assign(Request $request, Equipment $equipment)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'assigned_at' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        // Check if already assigned
        if ($equipment->status === 'assigned') {
            return response()->json([
                'success' => false,
                'message' => 'Equipment is already assigned'
            ], 400);
        }

        DB::transaction(function () use ($equipment, $validated) {
            // Create assignment
            EquipmentAssignment::create([
                'equipment_id' => $equipment->id,
                'user_id' => $validated['user_id'],
                'assigned_at' => $validated['assigned_at'],
                'notes' => $validated['notes'] ?? null,
            ]);

            // Update equipment status
            $equipment->update(['status' => 'assigned']);
        });

        return response()->json([
            'success' => true,
            'data' => $equipment->load(['category', 'currentAssignment.user', 'assignments.user', 'maintenanceLogs'])
        ]);
    }

    public function returnEquipment(Request $request, Equipment $equipment)
    {
        $validated = $request->validate([
            'returned_at' => 'required|date',
            'notes' => 'nullable|string',
            'location' => 'required|in:warehouse,workshop,office,vehicle,site',
        ]);

        $assignment = $equipment->currentAssignment;

        if (!$assignment) {
            return response()->json([
                'success' => false,
                'message' => 'Equipment is not currently assigned'
            ], 400);
        }

        DB::transaction(function () use ($equipment, $assignment, $validated) {
            // Close assignment
            $assignment->update([
                'returned_at' => $validated['returned_at'],
                'return_notes' => $validated['notes'] ?? null,
            ]);

            // Update equipment status
            $equipment->update([
                'status' => 'available',
                'location' => $validated['location']
            ]);
        });

        return response()->json([
            'success' => true,
            'data' => $equipment->fresh()->load(['category', 'currentAssignment.user', 'assignments.user', 'maintenanceLogs'])
        ]);
    }
    public function attachDocument(Request $request, $id)
    {
        $equipment = Equipment::findOrFail($id);

        $request->validate([
            'document_id' => 'required|exists:documents,id'
        ]);

        // Check if already attached
        if (!$equipment->documents()->where('document_id', $request->document_id)->exists()) {
            $equipment->documents()->attach($request->document_id);
        }

        return response()->json([
            'success' => true,
            'message' => 'Document linked successfully',
            'data' => $equipment->load(['category', 'currentAssignment.user', 'maintenanceLogs', 'assignments.user', 'documents'])
        ]);
    }

    public function detachDocument($id, $documentId)
    {
        $equipment = Equipment::findOrFail($id);
        $equipment->documents()->detach($documentId);

        return response()->json([
            'success' => true,
            'message' => 'Document detached successfully',
            'data' => $equipment->fresh()->load(['category', 'currentAssignment.user', 'maintenanceLogs', 'assignments.user', 'documents'])
        ]);
    }
}
