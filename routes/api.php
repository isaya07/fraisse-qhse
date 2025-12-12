<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\DocumentController;
use App\Http\Controllers\Api\ActionController;
use App\Http\Controllers\Api\IndicatorController;

// Routes publiques (authentification)
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Routes protégées (nécessitent un token)
Route::middleware('auth:sanctum')->group(function () {
    // Informations utilisateur
    Route::get('/user', [AuthController::class, 'user']);

    // Gestion des utilisateurs
    Route::apiResource('users', UserController::class)->except(['create', 'edit']);

    // Gestion des documents
    Route::post('documents/{id}/request-approval', [DocumentController::class, 'requestApproval']);
    Route::post('documents/{id}/approve', [DocumentController::class, 'approve']);
    Route::post('documents/{id}/reject', [DocumentController::class, 'reject']);
    Route::get('documents/{id}/download', [DocumentController::class, 'download']);
    // Gestion des versions de documents
    Route::prefix('documents/{document}')->group(function () {
        Route::get('/versions', [\App\Http\Controllers\Api\DocumentVersionController::class, 'index']);
        Route::post('/versions', [\App\Http\Controllers\Api\DocumentVersionController::class, 'store']);
    });
    Route::get('/versions/{version}', [\App\Http\Controllers\Api\DocumentVersionController::class, 'show']);
    Route::post('/versions/{version}/restore', [\App\Http\Controllers\Api\DocumentVersionController::class, 'restore']);
    Route::get('/versions/{version}/download', [\App\Http\Controllers\Api\DocumentVersionController::class, 'download']);
    Route::apiResource('documents', DocumentController::class);

    // Gestion des catégories
    Route::apiResource('categories', \App\Http\Controllers\Api\CategoryController::class);


    // Gestion des dossiers de documents
    Route::apiResource('document-folders', \App\Http\Controllers\Api\DocumentFolderController::class);

    // Gestion des paramètres
    Route::get('/settings', [\App\Http\Controllers\Api\SettingController::class, 'index']);
    Route::post('/settings', [\App\Http\Controllers\Api\SettingController::class, 'update']);

    // Gestion des actions
    Route::get('action-types', [\App\Http\Controllers\Api\ActionTypeController::class, 'index']);
    Route::apiResource('actions', ActionController::class);
    Route::post('/actions/{id}/documents', [ActionController::class, 'attachDocument']);
    Route::delete('/actions/{id}/documents/{documentId}', [ActionController::class, 'detachDocument']);
    Route::post('/actions/{id}/indicators', [ActionController::class, 'attachIndicator']);
    Route::delete('/actions/{id}/indicators/{indicatorId}', [ActionController::class, 'detachIndicator']);
    Route::post('/actions/{id}/comments', [\App\Http\Controllers\Api\CommentController::class, 'store']);
    Route::delete('/comments/{comment}', [\App\Http\Controllers\Api\CommentController::class, 'destroy']);
    Route::post('/actions/{id}/update-progress', [ActionController::class, 'updateProgress']);

    // Gestion des indicateurs
    Route::apiResource('indicator-categories', \App\Http\Controllers\Api\IndicatorCategoryController::class);
    Route::post('indicators/{id}/values', [IndicatorController::class, 'addValue']);
    Route::apiResource('indicators', IndicatorController::class);
    Route::put('indicator-values/{id}', [\App\Http\Controllers\Api\IndicatorValueController::class, 'update']);
    Route::delete('indicator-values/{id}', [\App\Http\Controllers\Api\IndicatorValueController::class, 'destroy']);

    // Gestion des formations
    Route::apiResource('training-categories', \App\Http\Controllers\Api\TrainingCategoryController::class);
    Route::apiResource('training-organizations', \App\Http\Controllers\Api\TrainingOrganizationController::class);
    Route::apiResource('trainings', \App\Http\Controllers\Api\TrainingController::class);
    Route::apiResource('training-sessions', \App\Http\Controllers\Api\TrainingSessionController::class);
    Route::apiResource('training-participations', \App\Http\Controllers\Api\TrainingParticipationController::class)->except(['index', 'show']);
    // Equipment Module
    Route::apiResource('equipment-categories', \App\Http\Controllers\Api\EquipmentCategoryController::class);
    Route::apiResource('equipment', \App\Http\Controllers\Api\EquipmentController::class);
    Route::post('equipment/{equipment}/assign', [\App\Http\Controllers\Api\EquipmentController::class, 'assign']);
    Route::post('equipment/{equipment}/return', [\App\Http\Controllers\Api\EquipmentController::class, 'returnEquipment']);
    Route::apiResource('maintenance-logs', \App\Http\Controllers\Api\MaintenanceLogController::class);

    // Notification Module
    Route::get('/notifications', [\App\Http\Controllers\Api\NotificationController::class, 'index']);
    Route::get('/notifications/unread-count', [\App\Http\Controllers\Api\NotificationController::class, 'unreadCount']);
    Route::put('/notifications/{id}/read', [\App\Http\Controllers\Api\NotificationController::class, 'markAsRead']);
    Route::put('/notifications/read-all', [\App\Http\Controllers\Api\NotificationController::class, 'markAllAsRead']);
    Route::get('/notifications/settings', [\App\Http\Controllers\Api\NotificationController::class, 'getSettings']);
    Route::put('/notifications/settings', [\App\Http\Controllers\Api\NotificationController::class, 'updateSettings']);

    // Planning Module
    Route::apiResource('planning/events', \App\Http\Controllers\Api\PlanningController::class)->only(['index']);
    Route::apiResource('safety-visits', \App\Http\Controllers\Api\SafetyVisitController::class);
    Route::apiResource('toolbox-talks', \App\Http\Controllers\Api\ToolboxTalkController::class);
});