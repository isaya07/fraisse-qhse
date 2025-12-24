<?php

namespace App\Jobs;

use App\Models\Action;
use App\Models\Document;
use App\Models\Equipment;
use App\Models\Notification;
use App\Models\NotificationSetting;
use App\Models\TrainingParticipation;
use App\Models\TrainingSession;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class GenerateDailyAlerts implements ShouldQueue
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
        \Log::info("Starting GenerateDailyAlerts job...");

        // Eager load notification settings to prevent N+1
        $users = User::where('is_active', true)
            ->with('notificationSettings')
            ->get();

        $today = Carbon::today();

        foreach ($users as $user) {
            // Use eager loaded settings or create default
            $settings = $user->notificationSettings ?? NotificationSetting::create([
                'user_id' => $user->id,
                'alert_thresholds' => [
                    'action' => 3,
                    'equipment' => 7,
                    'document' => 30,
                    'training' => 7,
                    'planning' => 1
                ]
            ]);

            $thresholds = $settings->alert_thresholds ?? [
                'action' => 3,
                'equipment' => 7,
                'document' => 30,
                'training' => 7,
                'planning' => 1
            ];

            $this->checkActions($user, $thresholds['action'] ?? 3);
            $this->checkEquipment($user, $thresholds['equipment'] ?? 7);
            $this->checkDocuments($user, $thresholds['document'] ?? 30); // Documents are usually checked by role/all, but simpler here
            $this->checkTraining($user, $thresholds['training'] ?? 7);
            $this->checkPlanning($user, $thresholds['planning'] ?? 1);
        }
        \Log::info("Finished GenerateDailyAlerts job.");
    }

    private function checkActions(User $user, int $days)
    {
        $targetDate = Carbon::today()->addDays($days)->format('Y-m-d');
        \Log::info("Checking actions for User {$user->id} with target date <=: {$targetDate}");

        // Alert if due date is between Today and Today+Threshold
        // This ensures check catches it whether it's 1, 2, or 3 days away.
        $actions = Action::where('assigned_to', $user->id)
            ->whereIn('status', ['open', 'in_progress'])
            ->whereDate('due_date', '>=', Carbon::today())
            ->whereDate('due_date', '<=', $targetDate)
            ->get();

        if ($actions->count() > 0) {
            \Log::info("User {$user->id}: Found {$actions->count()} actions due in {$days} days.");
        }

        foreach ($actions as $action) {
            Notification::firstOrCreate([
                'user_id' => $user->id,
                'type' => 'action',
                'related_id' => $action->id,
                'message' => "L'action \"{$action->title}\" arrive à échéance dans {$days} jours.",
            ]);
        }
    }

    private function checkEquipment(User $user, int $days)
    {
        $targetDate = Carbon::today()->addDays($days)->format('Y-m-d');

        $equipments = $user->currentEquipment()
            ->whereDate('expiration_date', '>=', Carbon::today())
            ->whereDate('expiration_date', '<=', $targetDate)
            ->get();

        if ($equipments->count() > 0) {
            \Log::info("User {$user->id}: Found {$equipments->count()} equipment expiring in {$days} days.");
        }

        foreach ($equipments as $equipment) {
            Notification::firstOrCreate([
                'user_id' => $user->id,
                'type' => 'equipment',
                'related_id' => $equipment->id,
                'message' => "L'équipement \"{$equipment->name}\" expire dans {$days} jours.",
            ]);
        }
    }

    private function checkDocuments(User $user, int $days)
    {
        // Documents expiring soon. Typically for admins/managers or creators.
        // For simplicity, let's assume if user is Admin or Manager, they get alerts for ALL documents expiring.
        if (!in_array($user->role, ['admin', 'manager'])) {
            return;
        }

        $targetDate = Carbon::today()->addDays($days)->format('Y-m-d');

        $documents = Document::whereDate('expires_date', '>=', Carbon::today())
            ->whereDate('expires_date', '<=', $targetDate)
            ->get();

        if ($documents->count() > 0) {
            \Log::info("User {$user->id}: Found {$documents->count()} documents expiring in {$days} days.");
        }

        foreach ($documents as $doc) {
            Notification::firstOrCreate([
                'user_id' => $user->id,
                'type' => 'document',
                'related_id' => $doc->id,
                'message' => "Le document \"{$doc->title}\" expire dans {$days} jours.",
            ]);
        }
    }

    private function checkTraining(User $user, int $days)
    {
        $targetDate = Carbon::today()->addDays($days)->format('Y-m-d');

        // 1. Upcoming Sessions (for participants)
        // Need to check relationship User -> TrainingSession (via participation?)
        // Assuming TrainingParticipation links User to Session
        $participations = TrainingParticipation::where('user_id', $user->id)
            ->whereHas('session', function ($q) use ($targetDate) {
                $q->whereDate('start_date', '>=', Carbon::today())
                    ->whereDate('start_date', '<=', $targetDate);
            })
            ->with(['session.training'])
            ->get();

        foreach ($participations as $p) {
            $trainingTitle = $p->session->training->title ?? 'Formation';
            Notification::firstOrCreate([
                'user_id' => $user->id,
                'type' => 'training',
                'related_id' => $p->session_id,
                'message' => "La session de formation \"{$trainingTitle}\" commence dans {$days} jours.",
            ]);
        }

        // 2. Expiring Certifications
        $expiringCerts = TrainingParticipation::where('user_id', $user->id)
            ->where('status', 'passed')
            ->whereDate('expiration_date', '>=', Carbon::today())
            ->whereDate('expiration_date', '<=', $targetDate)
            ->with(['session.training'])
            ->get();

        foreach ($expiringCerts as $cert) {
            $trainingTitle = $cert->session->training->title ?? 'Certification';
            Notification::firstOrCreate([
                'user_id' => $user->id,
                'type' => 'training',
                'related_id' => $cert->id, // Linking to participation ID for certification context
                'message' => "Votre certification \"{$trainingTitle}\" expire dans {$days} jours.",
            ]);
        }
    }

    private function checkPlanning(User $user, int $days)
    {
        $targetDate = Carbon::today()->addDays($days)->format('Y-m-d');

        $visits = \App\Models\SafetyVisit::where('auditor_id', $user->id)
            ->where('status', 'planned')
            ->whereDate('date', '>=', Carbon::today())
            ->whereDate('date', '<=', $targetDate)
            ->get();

        if ($visits->count() > 0) {
            \Log::info("User {$user->id}: Found {$visits->count()} safety visits in {$days} days.");
        }

        foreach ($visits as $visit) {
            Notification::firstOrCreate([
                'user_id' => $user->id,
                'type' => 'visit',
                'related_id' => $visit->id,
                'message' => "Visite de sécurité prévue dans {$days} jours.",
            ]);
        }

        $talks = \App\Models\ToolboxTalk::where('instructor_id', $user->id)
            ->whereDate('date', '>=', Carbon::today())
            ->whereDate('date', '<=', $targetDate)
            ->get();

        if ($talks->count() > 0) {
            \Log::info("User {$user->id}: Found {$talks->count()} toolbox talks in {$days} days.");
        }

        foreach ($talks as $talk) {
            Notification::firstOrCreate([
                'user_id' => $user->id,
                'type' => 'talk',
                'related_id' => $talk->id,
                'message' => "Animation 1/4h Sécurité \"{$talk->topic}\" prévue dans {$days} jours.",
            ]);
        }
    }
}
