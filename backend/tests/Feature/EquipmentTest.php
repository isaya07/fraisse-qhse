<?php

namespace Tests\Feature;

use App\Models\Equipment;
use App\Models\EquipmentCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EquipmentTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_users_can_view_equipment()
    {
        $user = User::factory()->create();
        $category = EquipmentCategory::factory()->create();
        Equipment::factory()->count(3)->create(['category_id' => $category->id]);

        $response = $this->actingAs($user)->getJson('/api/equipment');

        $response->assertStatus(200)
            ->assertJsonStructure(['data']);
    }

    public function test_authenticated_users_can_create_equipment()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $category = EquipmentCategory::factory()->create();

        $equipmentData = [
            'name' => 'Safety Helmet',
            'serial_number' => 'SH-001',
            'category_id' => $category->id,
            'purchase_date' => now()->format('Y-m-d'),
            'status' => 'available',
            'location' => 'warehouse',
        ];

        $response = $this->actingAs($user)->postJson('/api/equipment', $equipmentData);

        $response->assertStatus(201)
            ->assertJsonFragment(['name' => 'Safety Helmet']);

        $this->assertDatabaseHas('equipment', ['serial_number' => 'SH-001']);
    }

    public function test_users_can_view_single_equipment()
    {
        $user = User::factory()->create();
        $category = EquipmentCategory::factory()->create();
        $equipment = Equipment::factory()->create(['category_id' => $category->id]);

        $response = $this->actingAs($user)->getJson("/api/equipment/{$equipment->id}");

        $response->assertStatus(200)
            ->assertJsonFragment(['id' => $equipment->id]);
    }

    public function test_admin_can_update_equipment()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $category = EquipmentCategory::factory()->create();
        $equipment = Equipment::factory()->create(['category_id' => $category->id]);

        $updateData = ['name' => 'Updated Equipment Name'];

        $response = $this->actingAs($user)->putJson("/api/equipment/{$equipment->id}", $updateData);

        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'Updated Equipment Name']);
    }

    public function test_admin_can_assign_equipment_to_user()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $assignee = User::factory()->create();
        $category = EquipmentCategory::factory()->create();
        $equipment = Equipment::factory()->create([
            'category_id' => $category->id,
            'status' => 'available'
        ]);

        $assignData = [
            'user_id' => $assignee->id,
            'assigned_at' => now()->format('Y-m-d'),
            'notes' => 'For training purposes'
        ];

        $response = $this->actingAs($admin)->postJson("/api/equipment/{$equipment->id}/assign", $assignData);

        $response->assertStatus(200);
        $this->assertDatabaseHas('equipment', [
            'id' => $equipment->id,
            'status' => 'assigned'
        ]);
    }

    public function test_admin_can_delete_equipment()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $category = EquipmentCategory::factory()->create();
        $equipment = Equipment::factory()->create(['category_id' => $category->id]);

        $response = $this->actingAs($user)->deleteJson("/api/equipment/{$equipment->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('equipment', ['id' => $equipment->id]);
    }
}
