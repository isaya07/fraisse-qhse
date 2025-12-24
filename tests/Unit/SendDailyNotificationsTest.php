<?php

namespace Tests\Unit;

use App\Jobs\SendDailyNotifications;
use App\Models\Notification;
use App\Models\NotificationSetting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class SendDailyNotificationsTest extends TestCase
{
    use RefreshDatabase;

    public function test_sends_email_when_user_has_unread_notifications_and_email_enabled()
    {
        Mail::fake();

        $user = User::factory()->create(['email' => 'test@example.com']);
        NotificationSetting::create([
            'user_id' => $user->id,
            'email_enabled' => true,
            'email_time' => '08:00:00'
        ]);

        Notification::create([
            'user_id' => $user->id,
            'type' => 'action',
            'related_id' => 1,
            'message' => 'Test notification',
            'read_at' => null
        ]);

        $job = new SendDailyNotifications(true); // Force send
        $job->handle();

        Mail::assertSent(\App\Mail\DailyNotificationSummary::class, function ($mail) use ($user) {
            return $mail->hasTo($user->email);
        });
    }

    public function test_does_not_send_email_when_email_disabled()
    {
        Mail::fake();

        $user = User::factory()->create();
        NotificationSetting::create([
            'user_id' => $user->id,
            'email_enabled' => false,
            'email_time' => '08:00:00'
        ]);

        Notification::create([
            'user_id' => $user->id,
            'type' => 'action',
            'related_id' => 1,
            'message' => 'Test notification',
            'read_at' => null
        ]);

        $job = new SendDailyNotifications(true);
        $job->handle();

        Mail::assertNotSent(\App\Mail\DailyNotificationSummary::class);
    }

    public function test_does_not_send_email_when_no_unread_notifications()
    {
        Mail::fake();

        $user = User::factory()->create();
        NotificationSetting::create([
            'user_id' => $user->id,
            'email_enabled' => true,
            'email_time' => '08:00:00'
        ]);

        // All notifications are read
        Notification::create([
            'user_id' => $user->id,
            'type' => 'action',
            'related_id' => 1,
            'message' => 'Test notification',
            'read_at' => now()
        ]);

        $job = new SendDailyNotifications(true);
        $job->handle();

        Mail::assertNotSent(\App\Mail\DailyNotificationSummary::class);
    }

    public function test_force_flag_bypasses_time_check()
    {
        Mail::fake();

        $user = User::factory()->create();
        NotificationSetting::create([
            'user_id' => $user->id,
            'email_enabled' => true,
            'email_time' => '23:00:00' // Different time
        ]);

        Notification::create([
            'user_id' => $user->id,
            'type' => 'action',
            'related_id' => 1,
            'message' => 'Test notification',
            'read_at' => null
        ]);

        $job = new SendDailyNotifications(true); // Force = true
        $job->handle();

        Mail::assertSent(\App\Mail\DailyNotificationSummary::class);
    }
}
