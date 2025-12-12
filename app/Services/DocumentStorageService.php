<?php

namespace App\Services;

use App\Models\Document;
use App\Models\DocumentFolder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DocumentStorageService
{
    /**
     * Get the full recursive storage path for a folder.
     * Example: documents/Category/SubFolder/
     */
    public function getFolderPath(?int $folderId): string
    {
        if (!$folderId) {
            return 'documents';
        }

        $folder = DocumentFolder::find($folderId);

        if (!$folder) {
            return 'documents';
        }

        $path = $this->sanitizeName($folder->name);
        $parent = $folder->parent;

        while ($parent) {
            $path = $this->sanitizeName($parent->name) . '/' . $path;
            $parent = $parent->parent;
        }

        return 'documents/' . $path;
    }

    /**
     * Get the full file path for a document.
     */
    public function getFilePath(?int $folderId, string $filename): string
    {
        $folderPath = $this->getFolderPath($folderId);
        return $folderPath . '/' . $filename;
    }

    /**
     * Sanitize folder name to be safe for filesystem.
     */
    protected function sanitizeName(string $name): string
    {
        return Str::slug($name, '_');
    }

    /**
     * Move a document to a new folder physically.
     */
    public function moveDocument(Document $document, ?int $newFolderId): void
    {
        $oldPath = $document->filepath;
        $newFolderPath = $this->getFolderPath($newFolderId);
        $newPath = $newFolderPath . '/' . $document->filename;

        if ($oldPath === $newPath) {
            return;
        }

        // Check if file exists in source
        if (Storage::disk('public')->exists($oldPath)) {
            // Check if directory exists, create if not
            if (!Storage::disk('public')->exists($newFolderPath)) {
                Storage::disk('public')->makeDirectory($newFolderPath);
            }
            
            // Check collision
            if (Storage::disk('public')->exists($newPath)) {
                // If collision, we might need to renaming (unlikely if unique filenames enforced, but safer to error or append)
                // For now, let's append timestamp if collision
                $info = pathinfo($newPath);
                $newPath = $info['dirname'] . '/' . $info['filename'] . '_' . time() . '.' . $info['extension'];
                $document->filename = basename($newPath); // Update filename in model
            }

            Storage::disk('public')->move($oldPath, $newPath);
            
            // Update model
            $document->filepath = $newPath;
            $document->document_folder_id = $newFolderId;
            $document->save();
        }
    }
}
