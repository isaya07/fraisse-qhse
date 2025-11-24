<?php

namespace Tests\Feature;

use App\Models\Indicator;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class IndicatorTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_users_can_view_indicators()
    {
        $user = User::factory()->create();
        Indicator::factory()->count(3)->create(['created_by' => $user->id]);

        $response = $this->actingAs($user)->getJson('/api/indicators');

        $response->assertStatus(200)
                 ->assertJsonStructure(['data']);
    }

    public function test_authenticated_users_can_create_indicators()
    {
        $user = User::factory()->create();

        $indicatorData = [
            'name' => 'New Indicator',
            'code' => 'IND-001',
            'frequency' => 'monthly',
            'trend_direction' => 'positive',
            'created_by' => $user->id,
            'is_active' => true,
        ];

        $response = $this->actingAs($user)->postJson('/api/indicators', $indicatorData);

        $response->assertStatus(201)
                 ->assertJsonFragment(['name' => 'New Indicator']);
        
        $this->assertDatabaseHas('indicators', ['code' => 'IND-001']);
    }

    public function test_users_can_update_own_indicators()
    {
        $user = User::factory()->create();
        $indicator = Indicator::factory()->create(['created_by' => $user->id]);

        $updateData = ['name' => 'Updated Name'];

        $response = $this->actingAs($user)->putJson("/api/indicators/{$indicator->id}", $updateData);

        $response->assertStatus(200)
                 ->assertJsonFragment(['name' => 'Updated Name']);
    }

    public function test_users_cannot_update_others_indicators()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $indicator = Indicator::factory()->create(['created_by' => $user2->id]);

        $updateData = ['name' => 'Hacked Name'];

        $response = $this->actingAs($user1)->putJson("/api/indicators/{$indicator->id}", $updateData);

        $response->assertStatus(403);
    }

    public function test_users_can_delete_own_indicators()
    {
        $user = User::factory()->create();
        $indicator = Indicator::factory()->create(['created_by' => $user->id]);

        $response = $this->actingAs($user)->deleteJson("/api/indicators/{$indicator->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('indicators', ['id' => $indicator->id]);
    }
}
