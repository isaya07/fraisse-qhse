<?php

namespace Tests\Feature;

use App\Models\Action;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ActionTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_users_can_view_actions()
    {
        $user = User::factory()->create();
        Action::factory()->count(3)->create(['created_by' => $user->id]);

        $response = $this->actingAs($user)->getJson('/api/actions');

        $response->assertStatus(200)
                 ->assertJsonStructure(['data']);
    }

    public function test_authenticated_users_can_create_actions()
    {
        $user = User::factory()->create();

        $actionData = [
            'title' => 'New Action',
            'type' => 'corrective',
            'priority' => 'high',
            'status' => 'open',
            'created_by' => $user->id,
            'progress' => 0,
        ];

        $response = $this->actingAs($user)->postJson('/api/actions', $actionData);

        $response->assertStatus(201)
                 ->assertJsonFragment(['title' => 'New Action']);
        
        $this->assertDatabaseHas('actions', ['title' => 'New Action']);
    }

    public function test_users_can_update_own_actions()
    {
        $user = User::factory()->create();
        $action = Action::factory()->create(['created_by' => $user->id]);

        $updateData = ['title' => 'Updated Title'];

        $response = $this->actingAs($user)->putJson("/api/actions/{$action->id}", $updateData);

        $response->assertStatus(200)
                 ->assertJsonFragment(['title' => 'Updated Title']);
    }

    public function test_users_cannot_update_others_actions()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $action = Action::factory()->create(['created_by' => $user2->id]);

        $updateData = ['title' => 'Hacked Title'];

        $response = $this->actingAs($user1)->putJson("/api/actions/{$action->id}", $updateData);

        $response->assertStatus(403);
    }

    public function test_users_can_delete_own_actions()
    {
        $user = User::factory()->create();
        $action = Action::factory()->create(['created_by' => $user->id]);

        $response = $this->actingAs($user)->deleteJson("/api/actions/{$action->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('actions', ['id' => $action->id]);
    }
}
