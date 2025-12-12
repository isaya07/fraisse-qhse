<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDocumentRequest;
use App\Http\Requests\UpdateDocumentRequest;
use App\Models\Document;
use App\Models\Setting;
use App\Services\DocumentStorageService;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    use AuthorizesRequests;

    protected $storageService;

    public function __construct(DocumentStorageService $storageService)
    {
        $this->storageService = $storageService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Document::class);

        $query = Document::with(['creator', 'approver', 'category'])
            ->select('id', 'title', 'filename', 'filepath', 'version', 'category_id', 'status', 'created_by', 'approved_by', 'published_date', 'expires_date', 'created_at', 'updated_at', 'document_folder_id');

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

        if ($request->has('category_id') && $request->category_id) {
            $query->where('category_id', $request->category_id);
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

        DB::beginTransaction();

        try {
            $validated = $request->validated();
            $validated['created_by'] = $request->user()->id;

            if ($request->hasFile('file')) {
                $file = $request->file('file');

                // Get settings for naming convention only (path is now handled by service)
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

                // Ensure unique filename in the specific folder
                $folderId = $request->input('document_folder_id');
                $folderPath = $this->storageService->getFolderPath($folderId);

                // Check if file exists and rename if needed
                $i = 1;
                $baseFilename = pathinfo($filename, PATHINFO_FILENAME);
                while (Storage::disk('public')->exists($folderPath . '/' . $filename)) {
                    $filename = $baseFilename . '_' . $i . '.' . $extension;
                    $i++;
                }

                // Store file using service logic
                $path = $file->storeAs($folderPath, $filename, 'public');

                $validated['filename'] = $filename;
                $validated['filepath'] = $path;
                $validated['file_size'] = $file->getSize();
                $validated['mime_type'] = $file->getMimeType();
            }

            $document = Document::create($validated);

            // Create initial version
            $document->versions()->create([
                'version' => $validated['version'],
                'filename' => $validated['filename'],
                'filepath' => $validated['filepath'],
                'file_size' => $validated['file_size'],
                'mime_type' => $validated['mime_type'],
                'created_by' => auth()->id(),
                'changelog' => 'Initial version',
            ]);

            DB::commit();

            return response()->json($document->load('creator', 'approver'), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            if (isset($path) && Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }
            return response()->json(['message' => 'Failed to create document: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $document = Document::with(['creator', 'approver', 'category', 'actions'])->findOrFail($id);

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

        // Handle file upload if present
        if ($request->hasFile('file')) {
            $file = $request->file('file');

            // Generate filename (same logic as store)
            $namingConvention = Setting::where('key', 'document_naming_convention')->value('value') ?? '{original_name}';
            $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = $file->getClientOriginalExtension();

            $filename = str_replace(
                ['{original_name}', '{date}', '{timestamp}'],
                [$originalName, date('Y-m-d'), time()],
                $namingConvention
            );

            if (!str_ends_with($filename, '.' . $extension)) {
                $filename .= '.' . $extension;
            }

            // Folder path
            $folderId = $request->input('document_folder_id', $document->document_folder_id);
            $folderPath = $this->storageService->getFolderPath($folderId);

            // Store file
            $path = $file->storeAs($folderPath, $filename, 'public');

            $validated['filename'] = $filename;
            $validated['filepath'] = $path;
            $validated['file_size'] = $file->getSize();
            $validated['mime_type'] = $file->getMimeType();

            // Delete old file if strictly necessary (optional, often kept for history/versions but here we are replacing the main file ref)
            // But wait, we keep versions history usually. 
            // In this specific update method, if we upload a file, we are replacing the "current" file.
            // The previous file is NOT automatically moved to version history here unless we explicitly did so.
            // The standard flow is -> create version. 
            // Update is mostly for metadata. If file is sent in update, it replaces current.
        }

        // Handle folder change (Move document)
        if (isset($validated['document_folder_id']) && $validated['document_folder_id'] != $document->document_folder_id) {
            // If we just uploaded a new file, it's already in the target folder thanks to logic above.
            // If NO new file, we must move the existing one.
            if (!$request->hasFile('file')) {
                // Move existing file
                $this->storageService->moveDocument($document, $validated['document_folder_id']);
                // moveDocument updates the model 'filepath' and 'filename' (if collision) and 'document_folder_id'
                // So we should remove them from $validated to avoid double update or overwriting with old values
                unset($validated['filepath']);
                unset($validated['filename']);
                // document_folder_id is already set in moveDocument, but update() will set it again, which is fine.
            }
        }

        $document->update($validated);

        return response()->json($document->load('creator', 'approver'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $document = Document::findOrFail($id);

        $this->authorize('delete', $document);

        // Delete physical file
        if (Storage::disk('public')->exists($document->filepath)) {
            Storage::disk('public')->delete($document->filepath);
        }

        $document->delete();

        return response()->json(['message' => 'Document deleted successfully']);
    }
    /**
     * Request approval for the specified document.
     */
    public function requestApproval($id)
    {
        $document = Document::findOrFail($id);
        $this->authorize('update', $document);

        if ($document->status !== 'draft' && $document->status !== 'rejected') {
            return response()->json(['message' => 'Document is not in a state to request approval'], 400);
        }

        $document->update(['status' => 'pending_approval']);

        // Notify admins and managers
        $approvers = \App\Models\User::whereIn('role', ['admin', 'manager'])->get();
        foreach ($approvers as $approver) {
            \App\Models\Notification::create([
                'user_id' => $approver->id,
                'type' => 'document_approval_request',
                'related_id' => $document->id,
                'message' => "Le document '{$document->title}' est en attente d'approbation.",
            ]);
        }

        return response()->json($document->fresh(['creator', 'approver']));
    }

    /**
     * Approve the specified document.
     */
    public function approve(Request $request, $id)
    {
        $document = Document::findOrFail($id);

        // Check if user has permission (admin or manager)
        if (!in_array($request->user()->role, ['admin', 'manager'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $document->update([
            'status' => 'approved',
            'approved_by' => $request->user()->id,
            'published_date' => now(),
        ]);

        // Notify creator
        if ($document->created_by) {
            \App\Models\Notification::create([
                'user_id' => $document->created_by,
                'type' => 'document_approved',
                'related_id' => $document->id,
                'message' => "Votre document '{$document->title}' a été approuvé.",
            ]);
        }

        return response()->json($document->fresh(['creator', 'approver']));
    }

    /**
     * Reject the specified document.
     */
    public function reject(Request $request, $id)
    {
        $document = Document::findOrFail($id);

        // Check if user has permission (admin or manager)
        if (!in_array($request->user()->role, ['admin', 'manager'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $document->update(['status' => 'rejected']);

        // Notify creator
        if ($document->created_by) {
            \App\Models\Notification::create([
                'user_id' => $document->created_by,
                'type' => 'document_rejected',
                'related_id' => $document->id,
                'message' => "Votre document '{$document->title}' a été rejeté.",
            ]);
        }

        return response()->json($document->fresh(['creator', 'approver']));
    }
    /**
     * Download the specified document.
     */
    public function download($id)
    {
        $document = Document::findOrFail($id);
        $this->authorize('view', $document);

        if (!Storage::disk('public')->exists($document->filepath)) {
            return response()->json(['message' => 'File not found'], 404);
        }

        return Storage::disk('public')->download($document->filepath, $document->filename);
    }

    /**
     * Add a new version to the document.
     */
    public function addVersion(Request $request, $id)
    {
        $document = Document::findOrFail($id);
        $this->authorize('update', $document);

        $request->validate([
            'file' => 'required|file|mimes:pdf,doc,docx,xls,xlsx,jpg,jpeg,png|max:20480',
            'version' => 'required|string|max:20',
            'changelog' => 'nullable|string',
        ]);

        // Validate version number (must be different)
        if ($request->version === $document->version) {
            return response()->json(['message' => 'The new version must be different from the current one.'], 422);
        }

        $file = $request->file('file');

        // Use service to determine path (store versions in specific folder or same folder)
        // Decision: Store in same folder as document for now, relying on filename uniqueness or we can append _versions
        // Let's keep it simple: store in same folder as current doc (or maybe a _versions subfolder)
        // Implementation: reuse document folder path
        $folderPath = $this->storageService->getFolderPath($document->document_folder_id);
        // Maybe subfolder?
        $folderPath .= '/_versions'; // Clean separation

        $filename = $file->getClientOriginalName();
        $baseFilename = pathinfo($filename, PATHINFO_FILENAME);
        $extension = $file->getClientOriginalExtension();

        // Ensure unique filename
        $i = 1;
        while (Storage::disk('public')->exists($folderPath . '/' . $filename)) {
            $filename = $baseFilename . '_' . $i . '.' . $extension;
            $i++;
        }

        $path = $file->storeAs($folderPath, $filename, 'public');

        DB::beginTransaction();
        try {
            // Create new version entry
            $document->versions()->create([
                'version' => $request->version,
                'filename' => $filename,
                'filepath' => $path,
                'file_size' => $file->getSize(),
                'mime_type' => $file->getMimeType(),
                'created_by' => auth()->id(),
                'changelog' => $request->changelog,
            ]);

            // Update document with new file and version info
            $document->update([
                'version' => $request->version,
                'filename' => $filename,
                'filepath' => $path,
                'file_size' => $file->getSize(),
                'mime_type' => $file->getMimeType(),
                'status' => 'draft', // Reset status to draft on new version
                'updated_at' => now(),
            ]);

            DB::commit();

            return response()->json($document->fresh(['versions', 'creator']));
        } catch (\Exception $e) {
            DB::rollBack();
            Storage::disk('public')->delete($path);
            return response()->json(['message' => 'Failed to add version'], 500);
        }
    }

    /**
     * Get document versions history.
     */
    public function getVersions($id)
    {
        $document = Document::findOrFail($id);
        $this->authorize('view', $document);

        return response()->json($document->versions()->with('creator')->get());
    }
}
