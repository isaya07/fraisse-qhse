<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DocumentFolder;
use Illuminate\Http\Request;

class DocumentFolderController extends Controller
{
    public function index()
    {
        $folders = DocumentFolder::with('childrenRecursive')->whereNull('parent_id')->get();
        return response()->json(['success' => true, 'data' => $folders]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:document_folders,id',
        ]);

        $folder = DocumentFolder::create($validated);
        return response()->json(['success' => true, 'data' => $folder], 201);
    }

    public function show(DocumentFolder $documentFolder)
    {
        return response()->json(['success' => true, 'data' => $documentFolder->load('children', 'documents')]);
    }

    public function update(Request $request, DocumentFolder $documentFolder)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'parent_id' => 'nullable|exists:document_folders,id',
        ]);

        $documentFolder->update($validated);
        return response()->json(['success' => true, 'data' => $documentFolder]);
    }

    public function destroy(DocumentFolder $documentFolder)
    {
        $documentFolder->delete();
        return response()->json(['success' => true, 'message' => 'Folder deleted']);
    }
}
