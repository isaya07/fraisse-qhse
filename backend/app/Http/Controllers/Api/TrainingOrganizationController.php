<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TrainingOrganizationController extends Controller
{
    public function index()
    {
        $organizations = \App\Models\TrainingOrganization::all();
        return response()->json([
            'success' => true,
            'data' => $organizations
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'contact_info' => 'nullable|string',
            'address' => 'nullable|string|max:255',
        ]);

        $organization = \App\Models\TrainingOrganization::create($validated);

        return response()->json([
            'success' => true,
            'data' => $organization
        ], 201);
    }

    public function show($id)
    {
        $organization = \App\Models\TrainingOrganization::findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $organization
        ]);
    }

    public function update(Request $request, $id)
    {
        $organization = \App\Models\TrainingOrganization::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'contact_info' => 'nullable|string',
            'address' => 'nullable|string|max:255',
        ]);

        $organization->update($validated);

        return response()->json([
            'success' => true,
            'data' => $organization
        ]);
    }

    public function destroy($id)
    {
        $organization = \App\Models\TrainingOrganization::findOrFail($id);
        $organization->delete();

        return response()->json([
            'success' => true,
            'message' => 'Organization deleted successfully'
        ]);
    }
}
