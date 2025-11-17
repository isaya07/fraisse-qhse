<?php
declare(strict_types=1);

namespace App\Controller\Api;

use Cake\Core\Configure;
use Cake\Http\Exception\UnauthorizedException;
use Cake\View\JsonView;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

/**
 * Auth Controller
 *
 * Gestion de l'authentification JWT pour l'API
 */
class AuthController extends AppController
{
    /**
     * Initialisation du contrôleur
     *
     * @return void
     */
    public function initialize(): void
    {
        parent::initialize();
        // Désactiver l'authentification pour les actions de connexion
        $this->Authentication->allowUnauthenticated(['login', 'register', 'refresh']);
    }

    /**
     * Autorisation avant chaque action
     *
     * @return \Psr\Http\Message\ResponseInterface|null
     */
    public function beforeFilter(\Cake\Event\EventInterface $event)
    {
        parent::beforeFilter($event);
        // Désactiver l'autorisation pour les actions de connexion
        $this->Authorization->skipAuthorization();
        return null;
    }

     /**
     * Vue en Json (api rest)
     *
     * @return void
     */   
    public function viewClasses(): array
    {
        return [JsonView::class];
    }

    /**
     * Connexion
     *
     * @return void
     */
    public function login()
    {
        $this->request->allowMethod(['post']);

        $data = $this->request->getData();
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';

        // Récupérer l'utilisateur de la base de données
        $usersTable = $this->fetchTable('Users');
        $user = $usersTable->find()
            ->where(['username' => $username, 'is_active' => true])
            ->first();

        // Vérifier les identifiants
        if (!$user || !password_verify($password, $user->password)) {
            throw new UnauthorizedException(__('Invalid username or password'));
        }

        // Générer le token JWT
        $token = $this->generateToken($user);

        $this->set('token', $token);
        $this->set('user', [
            'id' => $user->id,
            'username' => $user->username,
            'email' => $user->email,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'role' => $user->role
        ]);
        $this->viewBuilder()->setOption('serialize', ['token', 'user']);
        // $this->set('_serialize', ['token', 'user']);
    }

    /**
     * Générer un token JWT
     *
     * @param \App\Model\Entity\User $user
     * @return string
     */
    private function generateToken($user): string
    {
        $key = Configure::read('Jwt.secret');
        $algorithm = Configure::read('Jwt.algorithm');
        $expiresIn = Configure::read('Jwt.expires_in');

        $payload = [
            'iss' => 'QHSEManager', // Issuer
            'sub' => $user->id, // Subject
            'iat' => time(), // Issued at
            'exp' => time() + $expiresIn, // Expiration
            'user_id' => $user->id,
            'username' => $user->username,
            'role' => $user->role
        ];

        return JWT::encode($payload, $key, $algorithm);
    }

    /**
     * Déconnexion
     *
     * @return void
     */
    public function logout()
    {
        $this->request->allowMethod(['post']);

        // Pour une déconnexion simple, on peut juste invalider le token côté client
        // Pour une invalidation côté serveur, on aurait besoin d'un système de blacklisting

        $this->set('success', true);
        $this->viewBuilder()->setOption('serialize', ['success']);
        // $this->set('_serialize', ['success']);
    }

    /**
     * Vérification du token
     *
     * @return void
     */
    public function verify()
    {
        $user = $this->Authentication->getIdentity();

        if (!$user) {
            throw new UnauthorizedException(__('Invalid or expired token'));
        }

        $this->set('user', [
            'id' => $user->getIdentifier(),
            'username' => $user->username,
            'email' => $user->email,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'role' => $user->role
        ]);
        // $this->set('_serialize', ['user']);
        $this->viewBuilder()->setOption('serialize', ['user']);
    }
}