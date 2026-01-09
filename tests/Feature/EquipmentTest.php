<?php

namespace Tests\Feature;

use App\Models\Equipment;
use App\Models\EquipmentCategory;
use App\Models\User;
use App\Models\MaintenanceLog;
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

    public function test_regular_users_cannot_create_equipment()
    {
        $user = User::factory()->create(['role' => 'user']);
        $category = EquipmentCategory::factory()->create();

        $equipmentData = [
            'name' => 'Safety Helmet',
            'serial_number' => 'SH-002',
            'category_id' => $category->id,
            'purchase_date' => now()->format('Y-m-d'),
            'status' => 'available',
            'location' => 'warehouse',
        ];

        $response = $this->actingAs($user)->postJson('/api/equipment', $equipmentData);

        $response->assertStatus(403);
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

        $this->assertDatabaseHas('equipment_assignments', [
            'equipment_id' => $equipment->id,
            'user_id' => $assignee->id,
            'returned_at' => null
        ]);
    }

    public function test_admin_can_return_equipment()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $assignee = User::factory()->create();
        $category = EquipmentCategory::factory()->create();
        $equipment = Equipment::factory()->create([
            'category_id' => $category->id,
            'status' => 'assigned'
        ]);

        // Create active assignment
        \App\Models\EquipmentAssignment::create([
            'equipment_id' => $equipment->id,
            'user_id' => $assignee->id,
            'assigned_at' => now()->subDays(5),
            'returned_at' => null
        ]);

        $returnData = [
            'returned_at' => now()->format('Y-m-d'),
            'notes' => 'Returned in good condition',
            'location' => 'warehouse'
        ];

        $response = $this->actingAs($admin)->postJson("/api/equipment/{$equipment->id}/return", $returnData);

        $response->assertStatus(200);
        $this->assertDatabaseHas('equipment', [
            'id' => $equipment->id,
            'status' => 'available',
            'location' => 'warehouse'
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

    public function test_manager_can_create_maintenance_log()
    {
        $manager = User::factory()->create(['role' => 'manager']);
        $category = EquipmentCategory::factory()->create();
        $equipment = Equipment::factory()->create(['category_id' => $category->id]);

        $logData = [
            'equipment_id' => $equipment->id,
            'type' => 'periodic_check',
            'date' => now()->format('Y-m-d'),
            'description' => 'Routine check',
            'result' => 'compliant',
            'performer' => 'Internal Staff'
        ];

        $response = $this->actingAs($manager)->postJson('/api/maintenance-logs', $logData);

        $response->assertStatus(201);
        $this->assertDatabaseHas('maintenance_logs', ['description' => 'Routine check']);
    }

    public function test_regular_user_cannot_create_maintenance_log()
    {
        $user = User::factory()->create(['role' => 'user']);
        $category = EquipmentCategory::factory()->create();
        $equipment = Equipment::factory()->create(['category_id' => $category->id]);

        $logData = [
            'equipment_id' => $equipment->id,
            'type' => 'periodic_check',
            'date' => now()->format('Y-m-d'),
            'description' => 'User check',
            'result' => 'compliant',
            'performer' => 'Me'
        ];

        $response = $this->actingAs($user)->postJson('/api/maintenance-logs', $logData);

        $response->assertStatus(403);
    }

    public function test_attach_and_detach_documents_to_equipment()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $category = EquipmentCategory::factory()->create();
        $equipment = Equipment::factory()->create(['category_id' => $category->id]);
        $document = \App\Models\Document::factory()->create(['created_by' => $admin->id]);

        // Attach
        $response = $this->actingAs($admin)->postJson("/api/equipment/{$equipment->id}/documents", [
            'document_id' => $document->id
        ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('document_equipment', [
            'equipment_id' => $equipment->id,
            'document_id' => $document->id
        ]);

        // Detach
        $response = $this->actingAs($admin)->deleteJson("/api/equipment/{$equipment->id}/documents/{$document->id}");
        $response->assertStatus(200);
        $this->assertDatabaseMissing('document_equipment', [
            'equipment_id' => $equipment->id,
            'document_id' => $document->id
        ]);
    }
}
