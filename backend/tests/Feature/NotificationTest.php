<?php

namespace Tests\Feature;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NotificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_users_can_view_notifications()
    {
        $user = User::factory()->create();
        Notification::factory()->count(3)->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->getJson('/api/notifications');

        $response->assertStatus(200)
            ->assertJsonStructure(['data']);
    }

    public function test_users_can_get_unread_count()
    {
        $user = User::factory()->create();
        Notification::factory()->count(5)->create([
            'user_id' => $user->id,
            'read_at' => null
        ]);
        Notification::factory()->count(2)->create([
            'user_id' => $user->id,
            'read_at' => now()
        ]);

        $response = $this->actingAs($user)->getJson('/api/notifications/unread-count');

        $response->assertStatus(200)
            ->assertJson(['count' => 5]);
    }

    public function test_users_can_mark_notification_as_read()
    {
        $user = User::factory()->create();
        $notification = Notification::factory()->create([
            'user_id' => $user->id,
            'read_at' => null
        ]);

        $response = $this->actingAs($user)->putJson("/api/notifications/{$notification->id}/read");

        $response->assertStatus(200);
        $this->assertNotNull($notification->fresh()->read_at);
    }

    public function test_users_can_mark_all_notifications_as_read()
    {
        $user = User::factory()->create();
        Notification::factory()->count(3)->create([
            'user_id' => $user->id,
            'read_at' => null
        ]);

        $response = $this->actingAs($user)->putJson('/api/notifications/read-all');

        $response->assertStatus(200);
        $this->assertEquals(0, Notification::where('user_id', $user->id)->whereNull('read_at')->count());
    }

    public function test_users_can_view_notification_settings()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->getJson('/api/notifications/settings');

        $response->assertStatus(200);
    }

    public function test_users_can_update_notification_settings()
    {
        $user = User::factory()->create();

        $settingsData = [
            'email_enabled' => true,
            'email_time' => '08:00:00',
            'alert_thresholds' => [
                'action' => 3,
                'equipment' => 7,
            ],
        ];

        $response = $this->actingAs($user)->putJson('/api/notifications/settings', $settingsData);

        $response->assertStatus(200);
    }

    public function test_users_cannot_view_others_notifications()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $notification = Notification::factory()->create(['user_id' => $user2->id]);

        // User1 should not see user2's notifications in their list
        $response = $this->actingAs($user1)->getJson('/api/notifications');

        $response->assertStatus(200);
        $response->assertJsonMissing(['id' => $notification->id]);
    }
}
