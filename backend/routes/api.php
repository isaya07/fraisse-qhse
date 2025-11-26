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
    Route::apiResource('documents', DocumentController::class);

    // Gestion des dossiers de documents
    Route::apiResource('document-folders', \App\Http\Controllers\Api\DocumentFolderController::class);

    // Gestion des paramètres
    Route::get('/settings', [\App\Http\Controllers\Api\SettingController::class, 'index']);
    Route::post('/settings', [\App\Http\Controllers\Api\SettingController::class, 'update']);

    // Gestion des actions
    Route::get('action-types', [\App\Http\Controllers\Api\ActionTypeController::class, 'index']);
    Route::apiResource('actions', ActionController::class);

    // Gestion des indicateurs
    Route::get('indicator-categories', [IndicatorController::class, 'categories']);
    Route::post('indicators/{id}/values', [IndicatorController::class, 'addValue']);
    Route::apiResource('indicators', IndicatorController::class);

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