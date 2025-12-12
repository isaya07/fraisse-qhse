<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MaintenanceLog;
use Illuminate\Http\Request;

class MaintenanceLogController extends Controller
{
    public function index(Request $request)
    {
        $query = MaintenanceLog::with('equipment');

        if ($request->has('equipment_id')) {
            $query->where('equipment_id', $request->equipment_id);
        }

        $logs = $query->orderBy('date', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $logs
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'equipment_id' => 'required|exists:equipment,id',
            'type' => 'required|in:periodic_check,repair,calibration',
            'date' => 'required|date',
            'description' => 'required|string',
            'cost' => 'nullable|numeric',
            'performer' => 'required|string',
            'result' => 'required|in:compliant,non_compliant,fixed',
            'next_maintenance_date' => 'nullable|date',
            'document_path' => 'nullable|string',
        ]);

        $log = MaintenanceLog::create($validated);

        return response()->json([
            'success' => true,
            'data' => $log
        ], 201);
    }

    public function show(MaintenanceLog $maintenanceLog)
    {
        return response()->json([
            'success' => true,
            'data' => $maintenanceLog->load('equipment')
        ]);
    }

    public function update(Request $request, MaintenanceLog $maintenanceLog)
    {
        $validated = $request->validate([
            'type' => 'sometimes|in:periodic_check,repair,calibration',
            'date' => 'sometimes|date',
            'description' => 'sometimes|string',
            'cost' => 'nullable|numeric',
            'performer' => 'sometimes|string',
            'result' => 'sometimes|in:compliant,non_compliant,fixed',
            'next_maintenance_date' => 'nullable|date',
            'document_path' => 'nullable|string',
        ]);

        $maintenanceLog->update($validated);

        return response()->json([
            'success' => true,
            'data' => $maintenanceLog
        ]);
    }

    public function destroy(MaintenanceLog $maintenanceLog)
    {
        $maintenanceLog->delete();

        return response()->json([
            'success' => true,
            'message' => 'Maintenance log deleted successfully'
        ]);
    }
}
