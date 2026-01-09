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
            'goal_type' => 'maximize',
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
        $user1 = User::factory()->create(['role' => 'user']);
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
    public function test_users_can_filter_indicators_by_category()
    {
        $user = User::factory()->create();
        $category1 = \App\Models\IndicatorCategory::factory()->create();
        $category2 = \App\Models\IndicatorCategory::factory()->create();

        Indicator::factory()->create([
            'indicator_category_id' => $category1->id,
            'created_by' => $user->id
        ]);
        Indicator::factory()->create([
            'indicator_category_id' => $category2->id,
            'created_by' => $user->id
        ]);

        $response = $this->actingAs($user)->getJson("/api/indicators?indicator_category_id={$category1->id}");

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    }

    public function test_manager_can_update_indicator()
    {
        $creator = User::factory()->create();
        $manager = User::factory()->create();
        $indicator = Indicator::factory()->create([
            'created_by' => $creator->id,
            'manager_id' => $manager->id
        ]);

        $updateData = ['name' => 'Manager Update'];

        $response = $this->actingAs($manager)->putJson("/api/indicators/{$indicator->id}", $updateData);

        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'Manager Update']);
    }

    public function test_admin_can_update_any_indicator()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $user = User::factory()->create();
        $indicator = Indicator::factory()->create(['created_by' => $user->id]);

        $updateData = ['name' => 'Admin Update'];

        $response = $this->actingAs($admin)->putJson("/api/indicators/{$indicator->id}", $updateData);

        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'Admin Update']);
    }

    public function test_users_can_add_value_to_indicator()
    {
        $user = User::factory()->create();
        $indicator = Indicator::factory()->create(['created_by' => $user->id]);

        $valueData = [
            'value' => 75.5,
            'date' => now()->format('Y-m-d'),
            'comment' => 'Test value'
        ];

        $response = $this->actingAs($user)->postJson("/api/indicators/{$indicator->id}/values", $valueData);

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.value', '75.50');

        $this->assertDatabaseHas('indicator_values', [
            'indicator_id' => $indicator->id,
            'value' => 75.5
        ]);
    }

    public function test_indicator_trend_updates_automatically()
    {
        $user = User::factory()->create();
        $indicator = Indicator::factory()->create([
            'created_by' => $user->id,
            'goal_type' => 'maximize',
            'trend_direction' => 'neutral'
        ]);

        // Add initial value (Yesterday)
        $response1 = $this->actingAs($user)->postJson("/api/indicators/{$indicator->id}/values", [
            'value' => 50,
            'date' => '2024-01-01',
        ]);

        $response1->assertStatus(200);

        // Add higher value (Today)
        $response2 = $this->actingAs($user)->postJson("/api/indicators/{$indicator->id}/values", [
            'value' => 100,
            'date' => '2024-01-02',
        ]);
        $response2->assertStatus(200);

        $indicator->refresh();
        $this->assertEquals('positive', $indicator->trend_direction);
    }
}
