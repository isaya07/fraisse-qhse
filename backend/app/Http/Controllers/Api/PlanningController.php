<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Action;
use App\Models\TrainingSession;
use App\Models\SafetyVisit;
use App\Models\ToolboxTalk;
use App\Models\MaintenanceLog;
use Illuminate\Http\Request;

class PlanningController extends Controller
{
    public function index(Request $request)
    {
        $start = $request->input('start');
        $end = $request->input('end');

        $events = [];

        // 1. Actions
        $actions = Action::whereNotNull('due_date')
            ->when($start, fn($q) => $q->where('due_date', '>=', $start))
            ->when($end, fn($q) => $q->where('due_date', '<=', $end))
            ->get();

        foreach ($actions as $action) {
            $events[] = [
                'id' => 'action-' . $action->id,
                'title' => 'Action: ' . $action->title,
                'start' => $action->due_date->format('Y-m-d'),
                'type' => 'action',
                'original_id' => $action->id,
                'color' => '#3B82F6', // Blue
            ];
        }

        // 2. Training Sessions
        $trainings = TrainingSession::with('training')
            ->when($start, fn($q) => $q->where('start_date', '>=', $start))
            ->when($end, fn($q) => $q->where('start_date', '<=', $end))
            ->get();

        foreach ($trainings as $session) {
            $events[] = [
                'id' => 'training-' . $session->id,
                'title' => 'Formation: ' . ($session->training->title ?? 'Inconnue'),
                'start' => $session->start_date->format('Y-m-d'),
                'end' => $session->end_date ? $session->end_date->format('Y-m-d') : null,
                'type' => 'training',
                'original_id' => $session->id,
                'color' => '#10B981', // Green
            ];
        }

        // 3. Safety Visits
        $visits = SafetyVisit::with('auditor')
            ->when($start, fn($q) => $q->where('date', '>=', $start))
            ->when($end, fn($q) => $q->where('date', '<=', $end))
            ->get();

        foreach ($visits as $visit) {
            $events[] = [
                'id' => 'visit-' . $visit->id,
                'title' => 'Visite Sécurité (' . $visit->location . ')',
                'start' => $visit->date->format('Y-m-d'),
                'type' => 'visit',
                'original_id' => $visit->id,
                'color' => '#F59E0B', // Amber
            ];
        }

        // 4. Toolbox Talks
        $talks = ToolboxTalk::with('instructor')
            ->when($start, fn($q) => $q->where('date', '>=', $start))
            ->when($end, fn($q) => $q->where('date', '<=', $end))
            ->get();

        foreach ($talks as $talk) {
            $events[] = [
                'id' => 'talk-' . $talk->id,
                'title' => '1/4h Sécurité: ' . $talk->topic,
                'start' => $talk->date->format('Y-m-d'),
                'type' => 'talk',
                'original_id' => $talk->id,
                'color' => '#8B5CF6', // Purple
            ];
        }

        // 5. Equipment Maintenance (from logs with next_maintenance_date)
        $maintenances = MaintenanceLog::with('equipment')
            ->whereNotNull('next_maintenance_date')
            ->when($start, fn($q) => $q->where('next_maintenance_date', '>=', $start))
            ->when($end, fn($q) => $q->where('next_maintenance_date', '<=', $end))
            ->get();

        foreach ($maintenances as $log) {
            $events[] = [
                'id' => 'maintenance-' . $log->id,
                'title' => 'Maintenance: ' . ($log->equipment->name ?? 'Équipement'),
                'start' => $log->next_maintenance_date, // Already string or date
                'type' => 'maintenance',
                'original_id' => $log->equipment_id,
                'color' => '#EF4444', // Red
            ];
        }

        return response()->json(['success' => true, 'data' => $events]);
    }
}
