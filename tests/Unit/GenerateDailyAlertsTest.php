<?php

namespace Tests\Unit;

use App\Jobs\GenerateDailyAlerts;
use App\Models\Action;
use App\Models\Equipment;
use App\Models\Notification;
use App\Models\NotificationSetting;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GenerateDailyAlertsTest extends TestCase
{
    use RefreshDatabase;

    public function test_generates_action_alerts_for_upcoming_due_dates()
    {
        $user = User::factory()->create(['is_active' => true]);
        NotificationSetting::create([
            'user_id' => $user->id,
            'alert_thresholds' => ['action' => 3]
        ]);

        // Create action due in 2 days (within threshold)
        $action = Action::factory()->create([
            'assigned_to' => $user->id,
            'created_by' => $user->id,
            'status' => 'open',
            'due_date' => Carbon::today()->addDays(2),
        ]);

        $job = new GenerateDailyAlerts();
        $job->handle();

        $this->assertDatabaseHas('notifications', [
            'user_id' => $user->id,
            'type' => 'action',
            'related_id' => $action->id,
        ]);
    }

    public function test_does_not_generate_alerts_for_completed_actions()
    {
        $user = User::factory()->create(['is_active' => true]);

        Action::factory()->create([
            'assigned_to' => $user->id,
            'created_by' => $user->id,
            'status' => 'completed',
            'due_date' => Carbon::today()->addDays(2),
        ]);

        $job = new GenerateDailyAlerts();
        $job->handle();

        $this->assertDatabaseMissing('notifications', [
            'user_id' => $user->id,
            'type' => 'action',
        ]);
    }

    public function test_does_not_generate_alerts_for_inactive_users()
    {
        $user = User::factory()->create(['is_active' => false]);

        Action::factory()->create([
            'assigned_to' => $user->id,
            'created_by' => $user->id,
            'status' => 'open',
            'due_date' => Carbon::today()->addDays(2),
        ]);

        $job = new GenerateDailyAlerts();
        $job->handle();

        $this->assertDatabaseMissing('notifications', [
            'user_id' => $user->id,
        ]);
    }

    public function test_respects_custom_alert_thresholds()
    {
        $user = User::factory()->create(['is_active' => true]);
        NotificationSetting::create([
            'user_id' => $user->id,
            'alert_thresholds' => ['action' => 1] // Only 1 day threshold
        ]);

        // Create action due in 2 days (outside threshold)
        Action::factory()->create([
            'assigned_to' => $user->id,
            'created_by' => $user->id,
            'status' => 'open',
            'due_date' => Carbon::today()->addDays(2),
        ]);

        $job = new GenerateDailyAlerts();
        $job->handle();

        $this->assertDatabaseMissing('notifications', [
            'user_id' => $user->id,
            'type' => 'action',
        ]);
    }

    public function test_does_not_create_duplicate_notifications()
    {
        $user = User::factory()->create(['is_active' => true]);
        $action = Action::factory()->create([
            'assigned_to' => $user->id,
            'created_by' => $user->id,
            'status' => 'open',
            'due_date' => Carbon::today()->addDays(2),
        ]);

        // Run job twice
        $job = new GenerateDailyAlerts();
        $job->handle();
        $job->handle();

        // Should only have one notification
        $count = Notification::where('user_id', $user->id)
            ->where('type', 'action')
            ->where('related_id', $action->id)
            ->count();

        $this->assertEquals(1, $count);
    }
}
