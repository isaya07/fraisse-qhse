<?php

namespace Tests\Unit;

use App\Models\Document;
use App\Models\DocumentFolder;
use App\Services\DocumentStorageService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class DocumentStorageServiceTest extends TestCase
{
    use RefreshDatabase;

    protected DocumentStorageService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new DocumentStorageService();
        Storage::fake('public');
    }

    public function test_get_folder_path_returns_documents_for_null_folder()
    {
        $path = $this->service->getFolderPath(null);

        $this->assertEquals('documents', $path);
    }

    public function test_get_folder_path_returns_sanitized_folder_name()
    {
        $folder = DocumentFolder::create([
            'name' => 'Test Folder',
            'parent_id' => null
        ]);

        $path = $this->service->getFolderPath($folder->id);

        $this->assertEquals('documents/test_folder', $path);
    }

    public function test_get_folder_path_builds_nested_path_correctly()
    {
        $parent = DocumentFolder::create([
            'name' => 'Parent Folder',
            'parent_id' => null
        ]);

        $child = DocumentFolder::create([
            'name' => 'Child Folder',
            'parent_id' => $parent->id
        ]);

        $path = $this->service->getFolderPath($child->id);

        $this->assertEquals('documents/parent_folder/child_folder', $path);
    }

    public function test_get_file_path_combines_folder_and_filename()
    {
        $folder = DocumentFolder::create([
            'name' => 'Documents',
            'parent_id' => null
        ]);

        $path = $this->service->getFilePath($folder->id, 'test.pdf');

        $this->assertEquals('documents/documents/test.pdf', $path);
    }

    public function test_sanitize_name_converts_spaces_to_underscores()
    {
        $reflection = new \ReflectionClass($this->service);
        $method = $reflection->getMethod('sanitizeName');
        $method->setAccessible(true);

        $result = $method->invoke($this->service, 'Test Folder Name');

        $this->assertEquals('test_folder_name', $result);
    }

    public function test_sanitize_name_handles_special_characters()
    {
        $reflection = new \ReflectionClass($this->service);
        $method = $reflection->getMethod('sanitizeName');
        $method->setAccessible(true);

        $result = $method->invoke($this->service, 'Dossier Qualité & Sécurité!');

        // Should be URL-safe slug
        $this->assertMatchesRegularExpression('/^[a-z0-9_]+$/', $result);
    }

    public function test_move_document_updates_filepath_and_folder_id()
    {
        $oldFolder = DocumentFolder::create(['name' => 'Old', 'parent_id' => null]);
        $newFolder = DocumentFolder::create(['name' => 'New', 'parent_id' => null]);

        $document = Document::factory()->create([
            'filename' => 'test.pdf',
            'filepath' => 'documents/old/test.pdf',
            'document_folder_id' => $oldFolder->id
        ]);

        // Create fake file
        Storage::disk('public')->put('documents/old/test.pdf', 'content');

        $this->service->moveDocument($document, $newFolder->id);

        $this->assertEquals('documents/new/test.pdf', $document->filepath);
        $this->assertEquals($newFolder->id, $document->document_folder_id);
        $this->assertTrue(Storage::disk('public')->exists('documents/new/test.pdf'));
        $this->assertFalse(Storage::disk('public')->exists('documents/old/test.pdf'));
    }

    public function test_move_document_handles_filename_collision()
    {
        $newFolder = DocumentFolder::create(['name' => 'Target', 'parent_id' => null]);

        $document = Document::factory()->create([
            'filename' => 'test.pdf',
            'filepath' => 'documents/source/test.pdf',
            'document_folder_id' => null
        ]);

        // Create source file
        Storage::disk('public')->put('documents/source/test.pdf', 'content');

        // Create collision file
        Storage::disk('public')->put('documents/target/test.pdf', 'existing');

        $this->service->moveDocument($document, $newFolder->id);

        // Filename should be modified to avoid collision
        $this->assertStringContainsString('test_', $document->filename);
        $this->assertStringEndsWith('.pdf', $document->filename);
    }
}
