<?php

namespace Tests\Feature;

use App\Models\Training;
use App\Models\TrainingSession;
use App\Models\TrainingCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TrainingTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_users_can_view_trainings()
    {
        $user = User::factory()->create();
        $category = TrainingCategory::factory()->create();
        Training::factory()->count(3)->create(['training_category_id' => $category->id]);

        $response = $this->actingAs($user)->getJson('/api/trainings');

        $response->assertStatus(200)
            ->assertJsonStructure(['data']);
    }

    public function test_authenticated_users_can_create_training()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $category = TrainingCategory::factory()->create();

        $trainingData = [
            'title' => 'Fire Safety Training',
            'training_category_id' => $category->id,
            'duration_hours' => 4,
        ];

        $response = $this->actingAs($user)->postJson('/api/trainings', $trainingData);

        $response->assertStatus(201)
            ->assertJsonFragment(['title' => 'Fire Safety Training']);

        $this->assertDatabaseHas('trainings', ['title' => 'Fire Safety Training']);
    }

    public function test_users_can_view_training_sessions()
    {
        $user = User::factory()->create();
        $category = TrainingCategory::factory()->create();
        $training = Training::factory()->create(['training_category_id' => $category->id]);
        TrainingSession::factory()->count(2)->create(['training_id' => $training->id]);

        $response = $this->actingAs($user)->getJson('/api/training-sessions');

        $response->assertStatus(200)
            ->assertJsonStructure(['data']);
    }

    public function test_admin_can_create_training_session()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $category = TrainingCategory::factory()->create();
        $training = Training::factory()->create(['training_category_id' => $category->id]);

        $sessionData = [
            'training_id' => $training->id,
            'start_date' => now()->addDays(7)->format('Y-m-d H:i:s'),
            'end_date' => now()->addDays(8)->format('Y-m-d H:i:s'),
            'location' => 'Conference Room A',
            'max_participants' => 20,
            'status' => 'planned',
        ];

        $response = $this->actingAs($user)->postJson('/api/training-sessions', $sessionData);

        $response->assertStatus(201)
            ->assertJsonFragment(['location' => 'Conference Room A']);
    }

    public function test_admin_can_update_training()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $category = TrainingCategory::factory()->create();
        $training = Training::factory()->create(['training_category_id' => $category->id]);

        $updateData = ['title' => 'Updated Training Name'];

        $response = $this->actingAs($user)->putJson("/api/trainings/{$training->id}", $updateData);

        $response->assertStatus(200)
            ->assertJsonPath('data.title', 'Updated Training Name');
    }

    public function test_admin_can_delete_training()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $category = TrainingCategory::factory()->create();
        $training = Training::factory()->create(['training_category_id' => $category->id]);

        $response = $this->actingAs($user)->deleteJson("/api/trainings/{$training->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('trainings', ['id' => $training->id]);
    }

    public function test_creator_can_update_own_training_session()
    {
        $user = User::factory()->create();
        $category = TrainingCategory::factory()->create();
        $training = Training::factory()->create(['training_category_id' => $category->id]);

        // Creating session via API to ensure permissions are granted
        $sessionData = [
            'training_id' => $training->id,
            'start_date' => now()->addDays(20)->format('Y-m-d H:i:s'),
            'end_date' => now()->addDays(21)->format('Y-m-d H:i:s'),
            'location' => 'Original Location',
            'status' => 'planned',
        ];

        $response = $this->actingAs($user)->postJson('/api/training-sessions', $sessionData);
        $sessionId = $response->json('data.id');

        $updateData = ['location' => 'New Location'];
        $response = $this->actingAs($user)->putJson("/api/training-sessions/{$sessionId}", $updateData);

        $response->assertStatus(200)
            ->assertJsonPath('data.location', 'New Location');
    }

    public function test_users_cannot_update_others_training_sessions()
    {
        $creator = User::factory()->create(['role' => 'user']); // Ensure not admin
        $otherUser = User::factory()->create(['role' => 'user']);

        $category = TrainingCategory::factory()->create();
        $training = Training::factory()->create(['training_category_id' => $category->id]);

        // Creator makes session
        $response = $this->actingAs($creator)->postJson('/api/training-sessions', [
            'training_id' => $training->id,
            'start_date' => now()->addDays(10)->format('Y-m-d H:i:s'),
            'end_date' => now()->addDays(11)->format('Y-m-d H:i:s'),
            'location' => 'Creator Room',
            'status' => 'planned',
        ]);
        $sessionId = $response->json('data.id');

        // Other user tries to update
        $response = $this->actingAs($otherUser)->putJson("/api/training-sessions/{$sessionId}", [
            'location' => 'Hacked Room'
        ]);

        $response->assertStatus(403);
    }

    public function test_managing_training_participation()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $participant = User::factory()->create();
        $category = TrainingCategory::factory()->create();
        $training = Training::factory()->create(['training_category_id' => $category->id]);
        $session = TrainingSession::factory()->create(['training_id' => $training->id]);

        // Add participation
        $response = $this->actingAs($admin)->postJson('/api/training-participations', [
            'training_session_id' => $session->id,
            'user_id' => $participant->id,
            'status' => 'registered'
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('data.user_id', $participant->id);

        // Remove participation
        $participationId = $response->json('data.id');
        $response = $this->actingAs($admin)->deleteJson("/api/training-participations/{$participationId}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('training_participations', ['id' => $participationId]);
    }

    public function test_attach_and_detach_documents_to_session()
    {
        $user = User::factory()->create();
        $category = TrainingCategory::factory()->create();
        $training = Training::factory()->create(['training_category_id' => $category->id]);

        // Create session as user (so they have update permission)
        $response = $this->actingAs($user)->postJson('/api/training-sessions', [
            'training_id' => $training->id,
            'start_date' => now()->addDays(5)->format('Y-m-d H:i:s'),
            'end_date' => now()->addDays(6)->format('Y-m-d H:i:s'),
            'location' => 'Doc Room',
            'status' => 'planned',
        ]);
        $sessionId = $response->json('data.id');

        // Create document (as same user)
        $document = \App\Models\Document::factory()->create([
            'created_by' => $user->id,
            'status' => 'draft',
            'version' => '1.0'
        ]);

        // Attach
        $response = $this->actingAs($user)->postJson("/api/training-sessions/{$sessionId}/documents", [
            'document_id' => $document->id
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('training_session_documents', [
            'training_session_id' => $sessionId,
            'document_id' => $document->id
        ]);

        // Detach
        $response = $this->actingAs($user)->deleteJson("/api/training-sessions/{$sessionId}/documents/{$document->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('training_session_documents', [
            'training_session_id' => $sessionId,
            'document_id' => $document->id
        ]);
    }
}
