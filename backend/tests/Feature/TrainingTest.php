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
}
