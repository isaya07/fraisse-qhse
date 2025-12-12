<?php

namespace App\Jobs;

use App\Models\Notification;
use App\Models\NotificationSetting;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendDailyNotifications implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            $settings = NotificationSetting::where('user_id', $user->id)->first();

            if (!$settings || !$settings->email_enabled) {
                continue;
            }

            // Check if it's time to send (roughly). 
            // In a real scheduler, we might run this job every hour and check if the current hour matches the user's preferred time.
            // For simplicity, let's assume this job runs hourly.
            $userTime = Carbon::createFromFormat('H:i:s', $settings->email_time);
            if (Carbon::now()->format('H') !== $userTime->format('H')) {
                continue;
            }

            $unreadNotifications = Notification::where('user_id', $user->id)
                ->whereNull('read_at')
                ->get();

            if ($unreadNotifications->count() > 0) {
                // Send Email
                // Mail::to($user->email)->send(new \App\Mail\DailyNotificationSummary($user, $unreadNotifications));
                // For now, we'll just log it as we haven't created the Mail class yet.
                \Log::info("Sending daily summary to {$user->email} with {$unreadNotifications->count()} notifications.");
            }
        }
    }
}
