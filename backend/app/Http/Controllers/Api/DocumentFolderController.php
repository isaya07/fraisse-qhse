<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DocumentFolder;
use Illuminate\Http\Request;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class DocumentFolderController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $this->authorize('viewAny', DocumentFolder::class);
        $folders = DocumentFolder::with('childrenRecursive')->whereNull('parent_id')->get();
        return response()->json(['success' => true, 'data' => $folders]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', DocumentFolder::class);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:document_folders,id',
        ]);

        $folder = DocumentFolder::create($validated);
        return response()->json(['success' => true, 'data' => $folder], 201);
    }

    public function show(DocumentFolder $documentFolder)
    {
        $this->authorize('view', $documentFolder);
        return response()->json(['success' => true, 'data' => $documentFolder->load('children', 'documents')]);
    }

    public function update(Request $request, DocumentFolder $documentFolder)
    {
        $this->authorize('update', $documentFolder);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'parent_id' => 'nullable|exists:document_folders,id',
        ]);

        $documentFolder->update($validated);
        return response()->json(['success' => true, 'data' => $documentFolder]);
    }

    public function destroy(DocumentFolder $documentFolder)
    {
        $this->authorize('delete', $documentFolder);
        $documentFolder->delete();
        return response()->json(['success' => true, 'message' => 'Folder deleted']);
    }
}
