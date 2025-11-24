<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreIndicatorRequest;
use App\Http\Requests\UpdateIndicatorRequest;
use App\Models\Indicator;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class IndicatorController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Indicator::class);

        $query = Indicator::with(['creator', 'manager', 'actions', 'indicatorCategory', 'values'])
            ->select('id', 'name', 'code', 'manager_id', 'indicator_category_id', 'unit', 'target_value', 'threshold_min', 'threshold_max', 'calculation_method', 'data_source', 'frequency', 'trend_direction', 'created_by', 'is_active', 'created_at', 'updated_at');

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('code', 'like', "%{$search}%");
            });
        }

        if ($request->has('indicator_category_id') && $request->indicator_category_id) {
            $query->where('indicator_category_id', $request->indicator_category_id);
        }

        if ($request->has('trend_direction') && $request->trend_direction) {
            $query->where('trend_direction', $request->trend_direction);
        }

        if ($request->has('is_active') && $request->is_active !== null) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        $indicators = $query->orderBy('created_at', 'desc')->paginate($request->input('limit', 15));

        return response()->json($indicators);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreIndicatorRequest $request)
    {
        $this->authorize('create', Indicator::class);

        $validated = $request->validated();
        $validated['created_by'] = $request->user()->id;

        $indicator = Indicator::create($validated);

        return response()->json($indicator->load(['creator', 'actions']), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $indicator = Indicator::with(['creator', 'manager', 'actions', 'indicatorCategory', 'values.creator'])->findOrFail($id);

        $this->authorize('view', $indicator);

        return response()->json($indicator);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateIndicatorRequest $request, $id)
    {
        $indicator = Indicator::findOrFail($id);

        $this->authorize('update', $indicator);

        $validated = $request->validated();

        $indicator->update($validated);

        return response()->json($indicator->load(['creator', 'actions']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $indicator = Indicator::findOrFail($id);

        $this->authorize('delete', $indicator);

        $indicator->delete();
        return response()->json(['message' => 'Indicator deleted successfully']);
    }

    /**
     * Display a listing of indicator categories.
     */
    public function categories()
    {
        return response()->json([
            'success' => true,
            'data' => \App\Models\IndicatorCategory::all()
        ]);
    }

    public function addValue(Request $request, $id)
    {
        $indicator = Indicator::findOrFail($id);
        $this->authorize('update', $indicator);

        $validated = $request->validate([
            'value' => 'required|numeric',
            'date' => 'required|date',
            'comment' => 'nullable|string',
        ]);

        $value = $indicator->values()->create([
            'value' => $validated['value'],
            'date' => $validated['date'],
            'comment' => $validated['comment'],
            'created_by' => auth()->id(),
        ]);

        return response()->json([
            'success' => true,
            'data' => $value,
            'message' => 'Valeur ajoutée avec succès'
        ]);
    }
}