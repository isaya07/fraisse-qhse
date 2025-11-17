<?php
declare(strict_types=1);

namespace App\Controller\Api;

use App\Controller\AppController as BaseController;

/**
 * API App Controller
 *
 * Tous les contrôleurs API devraient étendre cette classe.
 */
class AppController extends BaseController
{
    /**
     * Initialisation du contrôleur API
     *
     * @return void
     */
    public function initialize(): void
    {
        parent::initialize();

        // Désactiver les vues pour l'API et utiliser JsonView
        $this->viewBuilder()->setClassName('Cake\View\JsonView');

        // Gestion de l'authentification JWT
        $this->loadComponent('Authentication.Authentication', [
            'identityAttribute' => 'user',
            'authError' => 'Authentication failed. Please login again.',
            'unauthenticatedRedirect' => false,
        ]);

        // Autorisation RBAC
        $this->loadComponent('Authorization.Authorization');
    }

    /**
     * Méthode pour gérer les erreurs
     *
     * @param \Exception $error
     * @return void
     */
    public function setError($error)
    {
        // Pour les erreurs d'autorisation et d'authentification, on renvoie un message d'erreur JSON
        $statusCode = $error->getCode() ?: 500;
        $message = $error->getMessage();

        // Pour les erreurs d'autorisation ou d'authentification, renvoyer un code spécifique
        if ($error instanceof \Cake\Http\Exception\UnauthorizedException) {
            $statusCode = 401;
        } elseif ($error instanceof \Cake\Http\Exception\ForbiddenException) {
            $statusCode = 403;
        } elseif ($error instanceof \Cake\Http\Exception\NotFoundException) {
            $statusCode = 404;
        } elseif ($statusCode < 400 || $statusCode >= 600) {
            $statusCode = 500;
        }

        $this->set('error', [
            'message' => $message,
            'code' => $statusCode
        ]);
        $this->set('_serialize', ['error']);

        // Définir le code de statut HTTP
        $this->response = $this->response->withStatus($statusCode);
    }
}