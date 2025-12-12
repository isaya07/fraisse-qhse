<?php

namespace Tests\Feature;

use App\Models\Document;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
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

        $documentData = [
            'title' => 'New Document',
            'filename' => 'test.pdf',
            'filepath' => '/storage/test.pdf',
            'version' => '1.0',
            'status' => 'draft',
            'created_by' => $user->id,
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
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
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
}
