<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AccessControlController extends Controller
{
    /**
     * Get permission list for a specific entity.
     * Expects query params: entity_type (model class) and entity_id.
     */
    public function index(Request $request)
    {
        $request->validate([
            'entity_type' => 'required|string',
            'entity_id' => 'required|integer',
        ]);

        $entityClass = $this->resolveEntityClass($request->entity_type);
        if (!$entityClass) {
            return response()->json(['success' => false, 'error' => 'Invalid entity type'], 400);
        }

        $entity = $entityClass::find($request->entity_id);
        if (!$entity) {
            return response()->json(['success' => false, 'error' => 'Entity not found'], 404);
        }

        // Check if user can view permissions (Admin or Creator)
        // Or if they have 'admin' access on the object
        $user = $request->user();
        $canManage = $user->role === 'admin' ||
            $entity->created_by === $user->id ||
            $entity->hasAccess($user, 'admin');

        if (!$canManage) {
            return response()->json(['success' => false, 'error' => 'Unauthorized'], 403);
        }

        $permissions = $entity->permissions()->with('user')->get();

        return response()->json([
            'success' => true,
            'data' => $permissions
        ]);
    }

    /**
     * Grant permission to a user for an entity.
     */
    public function store(Request $request)
    {
        $request->validate([
            'entity_type' => 'required|string',
            'entity_id' => 'required|integer',
            'user_id' => 'required|exists:users,id',
            'access_level' => 'required|in:read,write,admin',
        ]);

        $entityClass = $this->resolveEntityClass($request->entity_type);
        $entity = $entityClass::find($request->entity_id);

        if (!$entity) {
            return response()->json(['success' => false, 'error' => 'Entity not found'], 404);
        }

        // Authorization check
        $user = $request->user();
        $canManage = $user->role === 'admin' ||
            $entity->created_by === $user->id ||
            $entity->hasAccess($user, 'admin');

        if (!$canManage) {
            return response()->json(['success' => false, 'error' => 'Unauthorized'], 403);
        }

        $targetUser = User::find($request->user_id);
        $entity->grantAccess($targetUser, $request->access_level);

        return response()->json([
            'success' => true,
            'message' => 'Permission granted',
            'data' => $entity->permissions()->with('user')->get()
        ]);
    }

    /**
     * Revoke permission.
     */
    public function destroy(Request $request, $id)
    {
        // $id is the ID of the access_control_record, OR we can pass entity info + user_id logic.
        // It's cleaner to handle via the pivot ID if we send it from frontend, 
        // OR we can do a revoke payload.
        // Let's implement deleting by ID of the access_control row.

        $accessControl = \App\Models\AccessControl::with('entity')->find($id);

        if (!$accessControl) {
            return response()->json(['success' => false, 'error' => 'Permission not found'], 404);
        }

        $entity = $accessControl->entity;

        // Authorization check
        $user = $request->user();
        if (!$entity) {
            // Orphaned record? Just delete it if admin
            if ($user->role === 'admin') {
                $accessControl->delete();
                return response()->json(['success' => true, 'message' => 'Permission revoked']);
            }
            return response()->json(['success' => false, 'error' => 'Entity not found'], 404);
        }

        $canManage = $user->role === 'admin' ||
            $entity->created_by === $user->id ||
            $entity->hasAccess($user, 'admin');

        if (!$canManage) {
            return response()->json(['success' => false, 'error' => 'Unauthorized'], 403);
        }

        $accessControl->delete();

        return response()->json([
            'success' => true,
            'message' => 'Permission revoked',
            'data' => $entity->permissions()->with('user')->get()
        ]);
    }

    private function resolveEntityClass($type)
    {
        $map = [
            'document' => \App\Models\Document::class,
            'action' => \App\Models\Action::class,
            'indicator' => \App\Models\Indicator::class,
            'training' => \App\Models\Training::class,
            'training_session' => \App\Models\TrainingSession::class,
            'equipment' => \App\Models\Equipment::class,
        ];

        return $map[$type] ?? null;
    }
}
