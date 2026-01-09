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

        $actionType = \App\Models\ActionType::first() ?? \App\Models\ActionType::create([
            'name' => 'Corrective',
            'icon' => 'wrench',
            'color' => '#ff0000'
        ]);

        $actionData = [
            'title' => 'New Action',
            'action_type_id' => $actionType->id,
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

    public function test_assignee_can_update_action()
    {
        $creator = User::factory()->create();
        $assignee = User::factory()->create();
        $action = Action::factory()->create([
            'created_by' => $creator->id,
            'assigned_to' => $assignee->id
        ]);

        $updateData = ['status' => 'in_progress'];

        $response = $this->actingAs($assignee)->putJson("/api/actions/{$action->id}", $updateData);

        $response->assertStatus(200)
            ->assertJsonFragment(['status' => 'in_progress']);
    }

    public function test_action_progress_updates_status_automatically()
    {
        $user = User::factory()->create();
        $action = Action::factory()->create([
            'created_by' => $user->id,
            'status' => 'open',
            'progress' => 0
        ]);

        // Update progress to 50%
        $response = $this->actingAs($user)->postJson("/api/actions/{$action->id}/update-progress", ['progress' => 50]);
        $response->assertStatus(200);
        $this->assertEquals('in_progress', $action->refresh()->status);

        // Update progress to 100%
        $response = $this->actingAs($user)->postJson("/api/actions/{$action->id}/update-progress", ['progress' => 100]);
        $response->assertStatus(200);
        $action->refresh();
        $this->assertEquals('completed', $action->status);
        $this->assertNotNull($action->completed_date);
    }

    public function test_attach_and_detach_documents_to_action()
    {
        $user = User::factory()->create();
        $action = Action::factory()->create(['created_by' => $user->id]);
        $document = \App\Models\Document::factory()->create(['created_by' => $user->id]);

        // Attach
        $response = $this->actingAs($user)->postJson("/api/actions/{$action->id}/documents", [
            'document_id' => $document->id
        ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('action_documents', [
            'action_id' => $action->id,
            'document_id' => $document->id
        ]);

        // Detach
        $response = $this->actingAs($user)->deleteJson("/api/actions/{$action->id}/documents/{$document->id}");
        $response->assertStatus(200);
        $this->assertDatabaseMissing('action_documents', [
            'action_id' => $action->id,
            'document_id' => $document->id
        ]);
    }

    public function test_attach_and_detach_indicators_to_action()
    {
        $user = User::factory()->create();
        $action = Action::factory()->create(['created_by' => $user->id]);
        $indicator = \App\Models\Indicator::factory()->create(['created_by' => $user->id]);

        // Attach
        $response = $this->actingAs($user)->postJson("/api/actions/{$action->id}/indicators", [
            'indicator_id' => $indicator->id
        ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('action_indicators', [
            'action_id' => $action->id,
            'indicator_id' => $indicator->id
        ]);

        // Detach
        $response = $this->actingAs($user)->deleteJson("/api/actions/{$action->id}/indicators/{$indicator->id}");
        $response->assertStatus(200);
        $this->assertDatabaseMissing('action_indicators', [
            'action_id' => $action->id,
            'indicator_id' => $indicator->id
        ]);
    }

    public function test_users_can_add_comments_to_action()
    {
        $user = User::factory()->create();
        $action = Action::factory()->create(['created_by' => $user->id]);

        $commentData = ['content' => 'This is a test comment'];

        $response = $this->actingAs($user)->postJson("/api/actions/{$action->id}/comments", $commentData);

        $response->assertStatus(201)
            ->assertJsonFragment(['content' => 'This is a test comment']);

        $this->assertDatabaseHas('comments', [
            'action_id' => $action->id,
            'content' => 'This is a test comment'
        ]);
    }
}
