<?php

namespace Tests\Feature;

use App\Models\Document;
use App\Models\DocumentFolder;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class DocumentTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_users_can_view_documents()
    {
        $user = User::factory()->create();
        Document::factory()->count(3)->create(['created_by' => $user->id]);

        $response = $this->actingAs($user)->getJson('/api/documents');

        $response->assertStatus(200)
            ->assertJsonStructure(['data']);
    }

    public function test_authenticated_users_can_create_documents()
    {
        $user = User::factory()->create();
        Storage::fake('public');
        $file = UploadedFile::fake()->create('test.pdf', 100);
        $category = \App\Models\Category::factory()->create();

        $documentData = [
            'file' => $file,
            'title' => 'New Document',
            'version' => '1.0',
            'status' => 'draft',
            'category_id' => $category->id,
        ];

        $response = $this->actingAs($user)->postJson('/api/documents', $documentData);

        $response->assertStatus(201)
            ->assertJsonFragment(['title' => 'New Document']);

        $this->assertDatabaseHas('documents', ['title' => 'New Document']);
    }

    public function test_users_can_update_own_documents()
    {
        $user = User::factory()->create();
        $document = Document::factory()->create(['created_by' => $user->id]);

        $updateData = ['title' => 'Updated Title'];

        $response = $this->actingAs($user)->putJson("/api/documents/{$document->id}", $updateData);

        $response->assertStatus(200)
            ->assertJsonFragment(['title' => 'Updated Title']);
    }

    public function test_users_cannot_update_others_documents()
    {
        $user1 = User::factory()->create(['role' => 'user']);
        $user2 = User::factory()->create(['role' => 'user']);
        $document = Document::factory()->create(['created_by' => $user2->id]);

        $updateData = ['title' => 'Hacked Title'];

        $response = $this->actingAs($user1)->putJson("/api/documents/{$document->id}", $updateData);

        $response->assertStatus(403);
    }

    public function test_users_can_delete_own_documents()
    {
        $user = User::factory()->create();
        $document = Document::factory()->create(['created_by' => $user->id]);

        $response = $this->actingAs($user)->deleteJson("/api/documents/{$document->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('documents', ['id' => $document->id]);
    }

    public function test_document_approval_workflow()
    {
        $creator = User::factory()->create();
        $manager = User::factory()->create(['role' => 'manager']);

        $document = Document::factory()->create([
            'created_by' => $creator->id,
            'status' => 'draft',
            'title' => 'Important Doc'
        ]);

        // Request Approval
        $response = $this->actingAs($creator)->postJson("/api/documents/{$document->id}/request-approval");
        $response->assertStatus(200);
        $this->assertEquals('pending_approval', $document->refresh()->status);

        // Approve (Manager)
        $response = $this->actingAs($manager)->postJson("/api/documents/{$document->id}/approve", [
            'comment' => 'LGTM'
        ]);
        $response->assertStatus(200);
        $this->assertEquals('approved', $document->refresh()->status);
        $this->assertEquals($manager->id, $document->approved_by);

        // Assert Notification sent
        $this->assertDatabaseHas('notifications', [
            'type' => 'document_approved',
            'user_id' => $creator->id
        ]);
    }

    public function test_admin_can_manage_document_folders()
    {
        $admin = User::factory()->create(['role' => 'admin']);

        // Create Folder
        $response = $this->actingAs($admin)->postJson('/api/document-folders', ['name' => 'HR']);
        $response->assertStatus(201);
        $folderId = $response->json('data.id');

        // Update Folder
        $response = $this->actingAs($admin)->putJson("/api/document-folders/{$folderId}", ['name' => 'Human Resources']);
        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'Human Resources']);

        // Delete Folder
        $response = $this->actingAs($admin)->deleteJson("/api/document-folders/{$folderId}");
        $response->assertStatus(200);
        $this->assertDatabaseMissing('document_folders', ['id' => $folderId]);
    }

    public function test_regular_user_cannot_manage_folders()
    {
        $user = User::factory()->create(['role' => 'user']);

        $response = $this->actingAs($user)->postJson('/api/document-folders', ['name' => 'Hacked']);
        $response->assertStatus(403);
    }

    public function test_moving_document_to_folder()
    {
        $user = User::factory()->create();
        $folder = DocumentFolder::factory()->create();
        $document = Document::factory()->create(['created_by' => $user->id, 'document_folder_id' => null]);

        $response = $this->actingAs($user)->putJson("/api/documents/{$document->id}", [
            'document_folder_id' => $folder->id
        ]);

        $response->assertStatus(200);
        $this->assertEquals($folder->id, $document->refresh()->document_folder_id);
    }

    public function test_document_versioning()
    {
        $user = User::factory()->create();
        Storage::fake('public');
        $file = UploadedFile::fake()->create('v2.pdf', 100);

        $document = Document::factory()->create([
            'created_by' => $user->id,
            'version' => '1.0',
            'status' => 'approved'
        ]);

        // Add Version
        $response = $this->actingAs($user)->postJson("/api/documents/{$document->id}/versions", [
            'file' => $file,
            'version_type' => 'major',
            'changelog' => 'Updated content'
        ]);

        $response->assertStatus(201);

        $document->refresh();
        $this->assertEquals('2.0', $document->version);
        $this->assertEquals('draft', $document->status);

        // Check History
        $this->assertDatabaseHas('document_versions', [
            'document_id' => $document->id,
            'version' => '2.0',
            'changelog' => 'Updated content'
        ]);
    }
}
