<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\IndicatorValue;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class IndicatorValueController extends Controller
{
    use AuthorizesRequests;

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $value = IndicatorValue::findOrFail($id);

        // Check if user has permission (using policy or simple check for now)
        // Ideally should use a policy: $this->authorize('update', $value);
        // For now, mirroring the logic that authorized Indicator update or assuming admin/creator
        // Let's assume standard authorization logic is desired.
        // If no specific policy for IndicatorValue exists, we might need to rely on the parent Indicator's policy
        // or check roles directly if that's the pattern. 
        // User request specified "visible only by administrator", so backend should enforce this too.

        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'value' => 'required|numeric',
            'date' => 'required|date',
            'comment' => 'nullable|string',
        ]);

        $value->update($validated);

        // Recalculate trend
        $value->indicator->updateTrend();

        return response()->json([
            'success' => true,
            'data' => $value,
            'message' => 'Valeur mise à jour avec succès'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        $value = IndicatorValue::findOrFail($id);

        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $indicator = $value->indicator;
        $value->delete();

        // Recalculate trend
        $indicator->updateTrend();

        return response()->json([
            'success' => true,
            'message' => 'Valeur supprimée avec succès'
        ]);
    }
}
