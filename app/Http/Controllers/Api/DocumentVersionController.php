<?php

namespace App\Http\Controllers\Api;

use App\Models\Document;
use App\Models\DocumentVersion;
use App\Models\Notification;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DocumentVersionController extends Controller
{
    /**
     * Liste toutes les versions d'un document
     */
    public function index(Request $request, $documentId)
    {
        $document = Document::findOrFail($documentId);

        $query = DocumentVersion::where('document_id', $documentId)
            ->with('creator')
            ->orderBy('created_at', 'desc');

        if (!$request->has('with_archived') || $request->with_archived !== 'true') {
            $query->where('is_archived', false);
        }

        $versions = $query->get();

        return response()->json($versions);
    }

    /**
     * Crée une nouvelle version d'un document
     */
    public function store(Request $request, $documentId)
    {
        $document = Document::findOrFail($documentId);

        $validated = $request->validate([
            'file' => 'required|file|max:10240',
            'changelog' => 'required|string|min:10',
            'version_type' => 'required|in:major,minor',
        ]);

        // Calculer le nouveau numéro de version
        $newVersion = $this->calculateNextVersion($document->version, $validated['version_type']);

        // Sauvegarder l'ancienne version dans document_versions
        $this->saveCurrentVersion($document);

        // Upload du nouveau fichier
        $file = $request->file('file');
        $filename = time() . '_' . $file->getClientOriginalName();
        $filepath = $file->storeAs('documents', $filename, 'public');

        // Créer l'enregistrement de la nouvelle version
        $version = DocumentVersion::create([
            'document_id' => $document->id,
            'version' => $newVersion,
            'filename' => $filename,
            'filepath' => $filepath,
            'file_size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
            'changelog' => $validated['changelog'],
            'created_by' => Auth::id(),
        ]);

        // Mettre à jour le document principal
        $document->update([
            'version' => $newVersion,
            'filename' => $filename,
            'filepath' => $filepath,
            'file_size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
        ]);

        // Notifier le créateur
        $this->notifyDocumentUpdate($document, $newVersion, 'nouvelle version');

        return response()->json([
            'message' => 'Nouvelle version créée avec succès',
            'version' => $version->load('creator'),
            'document' => $document,
        ], 201);
    }

    /**
     * Restaure une version antérieure (crée une nouvelle version majeure)
     */
    public function restore($versionId)
    {
        $versionToRestore = DocumentVersion::findOrFail($versionId);
        $document = Document::findOrFail($versionToRestore->document_id);

        // Sauvegarder la version actuelle
        $this->saveCurrentVersion($document);

        // Calculer nouvelle version majeure
        $newVersion = $this->calculateNextVersion($document->version, 'major');

        // Copier le fichier
        $newFilename = time() . '_RESTORED_' . $versionToRestore->filename;
        $newFilepath = 'documents/' . $newFilename;

        if (Storage::disk('public')->exists($versionToRestore->filepath)) {
            Storage::disk('public')->copy($versionToRestore->filepath, $newFilepath);
        } else {
            return response()->json(['error' => 'Fichier source introuvable'], 404);
        }

        // Créer l'enregistrement de la nouvelle version
        $newVersionRecord = DocumentVersion::create([
            'document_id' => $document->id,
            'version' => $newVersion,
            'filename' => $newFilename,
            'filepath' => $newFilepath,
            'file_size' => $versionToRestore->file_size,
            'mime_type' => $versionToRestore->mime_type,
            'changelog' => "Restauration de la version {$versionToRestore->version} du " . $versionToRestore->created_at->format('d/m/Y'),
            'created_by' => Auth::id(),
        ]);

        // Mettre à jour le document principal
        $document->update([
            'version' => $newVersion,
            'filename' => $newFilename,
            'filepath' => $newFilepath,
            'file_size' => $versionToRestore->file_size,
            'mime_type' => $versionToRestore->mime_type,
        ]);

        // Notifier le créateur
        $this->notifyDocumentUpdate($document, $newVersion, 'restauration');

        return response()->json([
            'message' => 'Version restaurée avec succès',
            'version' => $newVersionRecord->load('creator'),
            'document' => $document,
        ]);
    }

    /**
     * Affiche les détails d'une version
     */
    public function show($versionId)
    {
        $version = DocumentVersion::with(['creator', 'document'])->findOrFail($versionId);

        return response()->json($version);
    }

    /**
     * Télécharge le fichier d'une version
     */
    public function download($versionId)
    {
        $version = DocumentVersion::findOrFail($versionId);

        $filePath = storage_path('app/public/' . $version->filepath);

        if (!file_exists($filePath)) {
            return response()->json(['error' => 'Fichier non trouvé'], 404);
        }

        return response()->download($filePath, $version->filename);
    }

    /**
     * Calcule le prochain numéro de version
     */
    private function calculateNextVersion(string $currentVersion, string $type): string
    {
        $parts = explode('.', $currentVersion);
        $major = (int) ($parts[0] ?? 1);
        $minor = (int) ($parts[1] ?? 0);

        if ($type === 'major') {
            return ($major + 1) . '.0';
        }

        return $major . '.' . ($minor + 1);
    }

    /**
     * Sauvegarde la version actuelle dans l'historique
     */
    private function saveCurrentVersion(Document $document): void
    {
        // Ne sauvegarder que si le document a déjà un fichier
        if ($document->filepath) {
            DocumentVersion::create([
                'document_id' => $document->id,
                'version' => $document->version,
                'filename' => $document->filename,
                'filepath' => $document->filepath,
                'file_size' => $document->file_size,
                'mime_type' => $document->mime_type,
                'changelog' => 'Version archivée automatiquement',
                'created_by' => $document->created_by,
            ]);
        }
    }

    /**
     * Crée une notification pour la mise à jour du document
     */
    private function notifyDocumentUpdate(Document $document, string $version, string $action): void
    {
        // Ne pas notifier si l'utilisateur qui fait l'action est le créateur
        if ($document->created_by && $document->created_by !== Auth::id()) {
            Notification::create([
                'user_id' => $document->created_by,
                'type' => 'document_updated',
                'related_id' => $document->id,
                'message' => "Le document \"{$document->title}\" a été mis à jour ({$action}) vers la version {$version} par " . Auth::user()->first_name . " " . Auth::user()->last_name,
            ]);
        }
    }
}
