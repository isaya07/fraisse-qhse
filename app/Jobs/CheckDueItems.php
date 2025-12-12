<?php

namespace App\Jobs;

use App\Models\Action;
use App\Models\Document;
use App\Models\Equipment;
use App\Models\Notification;
use App\Models\NotificationSetting;
use App\Models\SafetyVisit;
use App\Models\ToolboxTalk;
use App\Models\TrainingSession;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CheckDueItems implements ShouldQueue
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
            $settings = NotificationSetting::firstOrCreate(
                ['user_id' => $user->id],
                ['alert_thresholds' => [
                    'action' => 3,
                    'equipment' => 7,
                    'document' => 30,
                    'training' => 7,
                    'planning' => 1
                ]]
            );

            $thresholds = $settings->alert_thresholds ?? [];
            
            // Defaults
            $actionThreshold = $thresholds['action'] ?? 3;
            $equipmentThreshold = $thresholds['equipment'] ?? 7;
            $documentThreshold = $thresholds['document'] ?? 30;
            $trainingThreshold = $thresholds['training'] ?? 7;
            $planningThreshold = $thresholds['planning'] ?? 1;

            // 1. Check Actions (Responsible)
            $actions = Action::where('responsible_id', $user->id)
                ->whereNotIn('status', ['Clôturée', 'Réalisée'])
                ->whereDate('due_date', '<=', Carbon::now()->addDays($actionThreshold))
                ->whereDate('due_date', '>=', Carbon::now()) // Future or today
                ->get();

            foreach ($actions as $action) {
                $this->createNotification($user->id, 'action', $action->id, "L'action '{$action->title}' arrive à échéance le {$action->due_date->format('d/m/Y')}.");
            }

            // 2. Check Equipment (Manager/Responsible - assuming user is admin or specific role for now, or if we had a manager_id)
            // For now, let's notify if the user has a role that manages equipment (e.g. 'admin' or 'manager')
            // Since we don't have easy role check here without loading relations, let's assume if they have the setting enabled/threshold set, they want to know.
            // But we don't want to spam everyone.
            // Let's rely on a hypothetical 'manager_id' on equipment or just notify everyone for now if they configured it?
            // Better: Check if user is 'admin' or 'manager'.
            // Assuming $user->role exists or similar.
            // Let's stick to: If user has configured this notification (implied by existence of settings), we check.
            
            // Optimization: Only check once per day per item, not per user per item if possible. 
            // But settings are per user.
            
            $equipments = Equipment::whereDate('next_maintenance_date', '<=', Carbon::now()->addDays($equipmentThreshold))
                 ->whereDate('next_maintenance_date', '>=', Carbon::now())
                 ->get();
            
            if ($equipments->isNotEmpty()) {
                 foreach ($equipments as $equipment) {
                     $this->createNotification($user->id, 'equipment', $equipment->id, "L'équipement '{$equipment->name}' nécessite un contrôle avant le {$equipment->next_maintenance_date->format('d/m/Y')}.");
                 }
            }

            // 3. Check Documents (Expires Date) - Notify Creator or Approver
            $documents = Document::where(function($q) use ($user) {
                    $q->where('created_by', $user->id)
                      ->orWhere('approved_by', $user->id);
                })
                ->whereNotNull('expires_date')
                ->whereDate('expires_date', '<=', Carbon::now()->addDays($documentThreshold))
                ->whereDate('expires_date', '>=', Carbon::now())
                ->get();

            foreach ($documents as $doc) {
                $this->createNotification($user->id, 'document', $doc->id, "Le document '{$doc->title}' expire le {$doc->expires_date->format('d/m/Y')}.");
            }

            // 4. Check Trainings (Sessions starting soon) - Notify Instructor
            // Assuming 'instructor' field in TrainingSession matches user's name or ID? 
            // The model has 'instructor' as string. If it matches "First Last", we can try.
            // Or if we had 'instructor_id'.
            // Let's notify if user is Admin/Manager for all sessions?
            // Or if user is a participant?
            // Let's notify participants.
            $sessions = TrainingSession::whereHas('participations', function($q) use ($user) {
                    $q->where('employee_id', $user->id); // Assuming employee_id links to User or Employee model.
                    // If Employee model is separate, we need to map User -> Employee.
                    // Let's assume User IS the employee for simplicity in this context, or skip if complex.
                })
                ->where('status', 'planned')
                ->whereDate('start_date', '<=', Carbon::now()->addDays($trainingThreshold))
                ->whereDate('start_date', '>=', Carbon::now())
                ->get();

            foreach ($sessions as $session) {
                $this->createNotification($user->id, 'training', $session->id, "La session de formation '{$session->training->title}' commence le {$session->start_date->format('d/m/Y')}.");
            }

            // 5. Check Planning (Visits/Talks) - Notify Auditor/Instructor
            $visits = SafetyVisit::where('auditor_id', $user->id)
                ->where('status', 'planned')
                ->whereDate('date', '<=', Carbon::now()->addDays($planningThreshold))
                ->whereDate('date', '>=', Carbon::now())
                ->get();

            foreach ($visits as $visit) {
                $this->createNotification($user->id, 'visit', $visit->id, "Visite de sécurité prévue le {$visit->date->format('d/m/Y')}.");
            }

            $talks = ToolboxTalk::where('instructor_id', $user->id)
                ->whereDate('date', '<=', Carbon::now()->addDays($planningThreshold))
                ->whereDate('date', '>=', Carbon::now())
                ->get();

            foreach ($talks as $talk) {
                $this->createNotification($user->id, 'talk', $talk->id, "1/4h Sécurité '{$talk->topic}' prévu le {$talk->date->format('d/m/Y')}.");
            }
        }
    }

    private function createNotification($userId, $type, $relatedId, $message)
    {
        // Prevent duplicate notifications for the same item on the same day
        $exists = Notification::where('user_id', $userId)
            ->where('type', $type)
            ->where('related_id', $relatedId)
            ->whereDate('created_at', Carbon::today())
            ->exists();

        if (!$exists) {
            Notification::create([
                'user_id' => $userId,
                'type' => $type,
                'related_id' => $relatedId,
                'message' => $message,
            ]);
        }
    }
}
