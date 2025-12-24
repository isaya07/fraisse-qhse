<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Action;
use App\Models\Document;
use App\Models\Equipment;
use App\Models\EquipmentAssignment;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function getStats(Request $request)
    {
        $user = $request->user();
        $isAdminOrManager = in_array($user->role, ['admin', 'manager']);

        // 1. Global Stats (Admin/Manager only, or different for User)
        $globalStats = [];
        if ($isAdminOrManager) {
            $globalStats = [
                'total_actions_open' => Action::whereIn('status', ['open', 'in_progress'])->count(),
                'total_actions_critical' => Action::whereIn('status', ['open', 'in_progress'])->where('priority', 'critical')->count(),
                'documents_pending' => Document::where('status', 'pending_approval')->count(),
                'equipment_out' => Equipment::where('status', 'in_use')->count(),
                // Mock compliance rate for now
                'compliance_rate' => 94
            ];
        }

        // 2. Personal Stats (All users)
        $personalStats = [
            'my_actions_pending' => Action::where('assigned_to', $user->id)
                ->whereIn('status', ['open', 'in_progress'])
                ->count(),
            'my_equipment_count' => EquipmentAssignment::where('user_id', $user->id)
                ->whereNull('returned_at')
                ->count(),
        ];

        // 3. Charts Data (Admin/Manager)
        $charts = [];
        if ($isAdminOrManager) {
            // Actions by status
            $actionsByStatus = Action::select('status', DB::raw('count(*) as count'))
                ->groupBy('status')
                ->pluck('count', 'status')
                ->toArray();

            $charts['actions_by_status'] = [
                'labels' => ['Ouvert', 'En cours', 'Terminé', 'Annulé'],
                'data' => [
                    $actionsByStatus['open'] ?? 0,
                    $actionsByStatus['in_progress'] ?? 0,
                    $actionsByStatus['completed'] ?? 0,
                    $actionsByStatus['cancelled'] ?? 0,
                ]
            ];
        }

        // 4. Recent Lists
        // My Priority Actions
        $myActions = Action::where('assigned_to', $user->id)
            ->whereIn('status', ['open', 'in_progress'])
            ->orderBy('due_date', 'asc') // Sooner due date first
            ->take(5)
            ->with(['actionType', 'creator'])
            ->get();

        // My Equipment
        $myEquipment = $user->currentEquipment()
            ->with('category')
            ->get();

        // Recent Documents (for news feed)
        $recentDocuments = Document::where('status', 'approved')
            ->with(['creator', 'category']) // Eager load relations
            ->orderBy('published_date', 'desc')
            ->take(5)
            ->get();

        // 5. Training Data
        // Next 5 upcoming sessions (Global or filtered by interest could be better, but global for now)
        $upcomingSessions = \App\Models\TrainingSession::where('start_date', '>=', now())
            ->orderBy('start_date', 'asc')
            ->take(10)
            ->with('training')
            ->get();

        // My expiring certifications (next 90 days)
        $expiringCertifications = \App\Models\TrainingParticipation::where('user_id', $user->id)
            ->where('status', 'passed')
            ->where('expiration_date', '>=', now())
            ->where('expiration_date', '<=', now()->addDays(90))
            ->orderBy('expiration_date', 'asc')
            ->with(['session.training'])
            ->get();
        // 6. Action Deadlines (My actions, not done)
        $myActionsDeadlines = \App\Models\Action::where('assigned_to', $user->id)
            ->whereIn('status', ['open', 'in_progress', 'pending_review'])
            ->whereNotNull('due_date')
            ->with(['actionType', 'creator']) // Eager load relations
            ->orderBy('due_date', 'asc')
            ->take(10)
            ->get();

        // 7. Equipment Expirations (My assigned equipment)
        $myEquipmentDeadlines = $user->currentEquipment()
            ->with('category') // Eager load category
            ->whereNotNull('expiration_date')
            ->orderBy('expiration_date', 'asc')
            ->take(5)
            ->get();

        // 8. Expiring Documents (Next 30 days, approved only)
        $expiringDocuments = Document::where('status', 'approved')
            ->whereNotNull('expires_date')
            ->where('expires_date', '>=', now())
            ->where('expires_date', '<=', now()->addDays(30))
            ->with(['creator', 'category'])
            ->orderBy('expires_date', 'asc')
            ->take(10)
            ->get();

        // 9. Upcoming Maintenance (Equipment with next_maintenance_date in next 30 days)
        $upcomingMaintenance = \App\Models\MaintenanceLog::whereHas('equipment', function ($q) use ($user) {
            // Only for user's assigned equipment or all if admin/manager
            if (!in_array($user->role, ['admin', 'manager'])) {
                $q->whereHas('currentAssignment', function ($qa) use ($user) {
                    $qa->where('user_id', $user->id);
                });
            }
        })
            ->whereNotNull('next_maintenance_date')
            ->where('next_maintenance_date', '>=', now())
            ->where('next_maintenance_date', '<=', now()->addDays(30))
            ->with(['equipment.category'])
            ->orderBy('next_maintenance_date', 'asc')
            ->take(10)
            ->get();

        return response()->json([
            'user_role' => $user->role,
            'stats' => array_merge($globalStats, $personalStats),
            'charts' => $charts,
            'my_actions' => $myActions,
            'my_equipment' => $myEquipment,
            'recent_documents' => $recentDocuments,
            'upcoming_sessions' => $upcomingSessions,
            'expiring_certifications' => $expiringCertifications,
            'expiring_documents' => $expiringDocuments, // NEW
            'upcoming_maintenance' => $upcomingMaintenance, // NEW
            'deadlines' => [
                'actions' => $myActionsDeadlines,
                'equipment' => $myEquipmentDeadlines
            ]
        ]);
    }
}
