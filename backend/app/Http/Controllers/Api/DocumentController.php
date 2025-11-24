<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDocumentRequest;
use App\Http\Requests\UpdateDocumentRequest;
use App\Models\Document;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class DocumentController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Document::class);

        $query = Document::with(['creator', 'approver'])
            ->select('id', 'title', 'filename', 'filepath', 'version', 'category', 'status', 'created_by', 'approved_by', 'published_date', 'expires_date', 'created_at', 'updated_at');

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('filename', 'like', "%{$search}%");
            });
        }

        if ($request->has('document_folder_id')) {
            $query->where('document_folder_id', $request->document_folder_id);
        }

        if ($request->has('category') && $request->category) {
            $query->where('category', $request->category);
        }

        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        $documents = $query->orderBy('created_at', 'desc')->paginate($request->input('limit', 15));

        return response()->json($documents);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDocumentRequest $request)
    {
        $this->authorize('create', Document::class);

        $validated = $request->validated();
        $validated['created_by'] = $request->user()->id;

        // Ensure 'category' is handled as a string if it's part of the validated data
        // and 'document_folder_id' is included if present in the request.
        // The StoreDocumentRequest should handle validation for these fields.

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            
            // Get settings
            $basePath = Setting::where('key', 'document_base_path')->value('value') ?? 'documents';
            $namingConvention = Setting::where('key', 'document_naming_convention')->value('value') ?? '{original_name}';

            // Generate filename
            $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = $file->getClientOriginalExtension();
            
            $filename = str_replace(
                ['{original_name}', '{date}', '{timestamp}'],
                [$originalName, date('Y-m-d'), time()],
                $namingConvention
            );
            
            // Ensure extension is present
            if (!str_ends_with($filename, '.' . $extension)) {
                $filename .= '.' . $extension;
            }

            // Store file
            $path = $file->storeAs($basePath, $filename, 'public');

            $validated['filename'] = $filename;
            $validated['filepath'] = $path;
            $validated['file_size'] = $file->getSize();
            $validated['mime_type'] = $file->getMimeType();
        }

        $document = Document::create($validated);

        return response()->json($document->load('creator', 'approver', 'category'), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $document = Document::with(['creator', 'approver'])->findOrFail($id);

        $this->authorize('view', $document);

        return response()->json($document);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDocumentRequest $request, $id)
    {
        $document = Document::findOrFail($id);

        $this->authorize('update', $document);

        $validated = $request->validated();

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            
            // Get settings
            $basePath = Setting::where('key', 'document_base_path')->value('value') ?? 'documents';
            $namingConvention = Setting::where('key', 'document_naming_convention')->value('value') ?? '{original_name}';

            // Generate filename
            $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = $file->getClientOriginalExtension();
            
            $filename = str_replace(
                ['{original_name}', '{date}', '{timestamp}'],
                [$originalName, date('Y-m-d'), time()],
                $namingConvention
            );
            
            // Ensure extension is present
            if (!str_ends_with($filename, '.' . $extension)) {
                $filename .= '.' . $extension;
            }

            // Store file
            $path = $file->storeAs($basePath, $filename, 'public');

            $validated['filename'] = $filename;
            $validated['filepath'] = $path;
            $validated['file_size'] = $file->getSize();
            $validated['mime_type'] = $file->getMimeType();
        }

        $document->update($validated);

        return response()->json($document->load('creator', 'approver', 'category'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $document = Document::findOrFail($id);

        $this->authorize('delete', $document);

        $document->delete();

        return response()->json(['message' => 'Document deleted successfully']);
    }
}
