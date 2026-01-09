<?php

namespace Tests\Feature;

use App\Models\AccessControl;
use App\Models\Document;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AccessControlTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_grant_permission()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $userToGrant = User::factory()->create();
        $document = Document::factory()->create();

        $response = $this->actingAs($admin)->postJson('/api/permissions', [
            'entity_type' => 'document',
            'entity_id' => $document->id,
            'user_id' => $userToGrant->id,
            'access_level' => 'read',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('access_controls', [
            'user_id' => $userToGrant->id,
            'entity_type' => Document::class,
            'entity_id' => $document->id,
            'access_level' => 'read',
        ]);
    }

    public function test_creator_can_grant_permission()
    {
        $creator = User::factory()->create(['role' => 'user']);
        $userToGrant = User::factory()->create();
        $document = Document::factory()->create(['created_by' => $creator->id]);

        $response = $this->actingAs($creator)->postJson('/api/permissions', [
            'entity_type' => 'document', // Controller expects 'document' and resolves class
            'entity_id' => $document->id,
            'user_id' => $userToGrant->id,
            'access_level' => 'write',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('access_controls', [
            'user_id' => $userToGrant->id,
            'entity_id' => $document->id,
            'access_level' => 'write',
        ]);
    }

    public function test_unauthorized_user_cannot_grant_permission()
    {
        $randomUser = User::factory()->create(['role' => 'user']);
        $creator = User::factory()->create(['role' => 'user']);
        $userToGrant = User::factory()->create();
        $document = Document::factory()->create(['created_by' => $creator->id]);

        $response = $this->actingAs($randomUser)->postJson('/api/permissions', [
            'entity_type' => 'document',
            'entity_id' => $document->id,
            'user_id' => $userToGrant->id,
            'access_level' => 'read',
        ]);

        $response->assertStatus(403);
    }

    public function test_can_list_permissions()
    {
        $creator = User::factory()->create(['role' => 'user']);
        $userGranted = User::factory()->create();
        $document = Document::factory()->create(['created_by' => $creator->id]);

        // Create explicit permission
        AccessControl::create([
            'user_id' => $userGranted->id,
            'entity_type' => Document::class, // Poly relation stores class name usually
            'entity_id' => $document->id,
            'access_level' => 'read',
        ]);

        $response = $this->actingAs($creator)->getJson("/api/permissions?entity_type=document&entity_id={$document->id}");

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data')
            ->assertJsonFragment(['user_id' => $userGranted->id]);
    }

    public function test_can_revoke_permission()
    {
        $creator = User::factory()->create(['role' => 'user']);
        $userGranted = User::factory()->create();
        $document = Document::factory()->create(['created_by' => $creator->id]);

        $permission = AccessControl::create([
            'user_id' => $userGranted->id,
            'entity_type' => Document::class,
            'entity_id' => $document->id,
            'access_level' => 'read',
        ]);

        $response = $this->actingAs($creator)->deleteJson("/api/permissions/{$permission->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('access_controls', ['id' => $permission->id]);
    }

    public function test_cannot_grant_duplicate_permission_updates_instead()
    {
        // If we grant 'write' when 'read' exists, it should update or fail?
        // Let's assume update based on logic (updateOrCreate usually best, or prevent duplicate)
        // My implementation in Controller uses `updateOrCreate`.

        $admin = User::factory()->create(['role' => 'admin']);
        $userToGrant = User::factory()->create();
        $document = Document::factory()->create();

        // First grant read
        $this->actingAs($admin)->postJson('/api/permissions', [
            'entity_type' => 'document',
            'entity_id' => $document->id,
            'user_id' => $userToGrant->id,
            'access_level' => 'read',
        ]);

        // Then grant write
        $response = $this->actingAs($admin)->postJson('/api/permissions', [
            'entity_type' => 'document',
            'entity_id' => $document->id,
            'user_id' => $userToGrant->id,
            'access_level' => 'write',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseCount('access_controls', 1); // Should update, not duplicate
        $this->assertDatabaseHas('access_controls', [
            'user_id' => $userToGrant->id,
            'access_level' => 'write',
        ]);
    }
}
