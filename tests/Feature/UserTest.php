<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_users()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        User::factory()->count(3)->create();

        $response = $this->actingAs($admin)->getJson('/api/users');

        $response->assertStatus(200)
                 ->assertJsonStructure(['data']);
    }

    public function test_user_cannot_view_users_list()
    {
        $user = User::factory()->create(['role' => 'user']);

        $response = $this->actingAs($user)->getJson('/api/users');

        $response->assertStatus(403);
    }

    public function test_admin_can_update_user()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $user = User::factory()->create();

        $updateData = ['first_name' => 'Updated Name'];

        $response = $this->actingAs($admin)->putJson("/api/users/{$user->id}", $updateData);

        $response->assertStatus(200)
                 ->assertJsonFragment(['first_name' => 'Updated Name']);
    }

    public function test_user_can_update_own_profile()
    {
        $user = User::factory()->create();

        $updateData = ['first_name' => 'My New Name'];

        $response = $this->actingAs($user)->putJson("/api/users/{$user->id}", $updateData);

        $response->assertStatus(200)
                 ->assertJsonFragment(['first_name' => 'My New Name']);
    }

    public function test_user_cannot_update_others_profile()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $updateData = ['first_name' => 'Hacked Name'];

        $response = $this->actingAs($user1)->putJson("/api/users/{$user2->id}", $updateData);

        $response->assertStatus(403);
    }

    public function test_user_cannot_change_own_role()
    {
        $user = User::factory()->create(['role' => 'user']);

        $updateData = ['role' => 'admin'];

        $response = $this->actingAs($user)->putJson("/api/users/{$user->id}", $updateData);

        $response->assertStatus(403);
    }

    public function test_admin_can_delete_user()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $user = User::factory()->create();

        $response = $this->actingAs($admin)->deleteJson("/api/users/{$user->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    public function test_user_cannot_delete_user()
    {
        $user1 = User::factory()->create(['role' => 'user']);
        $user2 = User::factory()->create();

        $response = $this->actingAs($user1)->deleteJson("/api/users/{$user2->id}");

        $response->assertStatus(403);
    }
}
