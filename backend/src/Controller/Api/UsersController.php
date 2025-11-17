<?php
declare(strict_types=1);

namespace App\Controller\Api;

/**
 * Users Controller
 *
 * @method \App\Model\Entity\User[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class UsersController extends AppController
{
    /**
     * Initialize method
     *
     * @return void
     */
    public function initialize(): void
    {
        parent::initialize();

        // Seul l'administrateur peut gérer les utilisateurs
        $this->Authorization->skipAuthorization();
        $this->Authentication->allowUnauthenticated(['add']);
    }

    /**
     * Index method
     *
     * @return \Cake\Http\Response|null|void
     */
    public function index()
    {
        $user = $this->Authentication->getIdentity();
        if (!$user || $user->role !== 'admin') {
            throw new \Cake\Http\Exception\ForbiddenException(__('Accès non autorisé'));
        }

        $users = $this->paginate($this->Users);

        $this->set(compact('users'));
        $this->set('_serialize', ['users']);
    }

    /**
     * View method
     *
     * @param string|null $id User id.
     * @return \Cake\Http\Response|null|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $currentUser = $this->Authentication->getIdentity();
        if (!$currentUser) {
            throw new \Cake\Http\Exception\UnauthorizedException(__('Authentification requise'));
        }

        $user = $this->Users->get($id, [
            'contain' => [],
        ]);

        // Un utilisateur ne peut voir que son propre profil, sauf s'il est admin
        if ($currentUser->id !== $user->id && $currentUser->role !== 'admin') {
            throw new \Cake\Http\Exception\ForbiddenException(__('Accès non autorisé'));
        }

        $this->set('user', $user);
        $this->set('_serialize', ['user']);
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null|void
     */
    public function add()
    {
        $currentUser = $this->Authentication->getIdentity();

        // Seul un admin peut créer des utilisateurs, sauf pour l'inscription publique si nécessaire
        if ($currentUser && $currentUser->role !== 'admin') {
            throw new \Cake\Http\Exception\ForbiddenException(__('Accès non autorisé'));
        }

        $user = $this->Users->newEmptyEntity();

        $this->request->allowMethod(['post']);
        $data = $this->request->getData();

        // Empêcher la spécification directe du rôle par un utilisateur non-admin
        if (!$currentUser || $currentUser->role !== 'admin') {
            $data['role'] = 'user'; // Attribuer automatiquement le rôle 'user'
        }

        $user = $this->Users->patchEntity($user, $data);

        if ($this->Users->save($user)) {
            $this->set('user', $user);
            $this->set('_serialize', ['user']);
            $this->Flash->success(__('The user has been saved.'));

            return;
        }

        $this->set('user', $user);
        $this->set('_serialize', ['user']);
        $this->Flash->error(__('The user could not be saved. Please, try again.'));
    }

    /**
     * Edit method
     *
     * @param string|null $id User id.
     * @return \Cake\Http\Response|null|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $currentUser = $this->Authentication->getIdentity();
        if (!$currentUser) {
            throw new \Cake\Http\Exception\UnauthorizedException(__('Authentification requise'));
        }

        $user = $this->Users->get($id, [
            'contain' => [],
        ]);

        // Un utilisateur ne peut modifier que son propre profil, sauf s'il est admin
        if ($currentUser->id !== $user->id && $currentUser->role !== 'admin') {
            throw new \Cake\Http\Exception\ForbiddenException(__('Accès non autorisé'));
        }

        // Les non-admins ne peuvent pas changer le rôle
        $data = $this->request->getData();
        if ($currentUser->role !== 'admin') {
            unset($data['role']);
        }

        $this->request->allowMethod(['patch', 'post', 'put']);
        $user = $this->Users->patchEntity($user, $data);

        if ($this->Users->save($user)) {
            $this->set('user', $user);
            $this->set('_serialize', ['user']);
            $this->Flash->success(__('The user has been saved.'));

            return;
        }

        $this->set('user', $user);
        $this->set('_serialize', ['user']);
        $this->Flash->error(__('The user could not be saved. Please, try again.'));
    }

    /**
     * Delete method
     *
     * @param string|null $id User id.
     * @return \Cake\Http\Response|null|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $currentUser = $this->Authentication->getIdentity();
        if (!$currentUser || $currentUser->role !== 'admin') {
            throw new \Cake\Http\Exception\ForbiddenException(__('Accès non autorisé'));
        }

        $this->request->allowMethod(['delete']);
        $user = $this->Users->get($id);

        if ($currentUser->id === $user->id) {
            throw new \Cake\Http\Exception\ForbiddenException(__('Vous ne pouvez pas supprimer votre propre compte'));
        }

        if ($this->Users->delete($user)) {
            $this->Flash->success(__('The user has been deleted.'));
        } else {
            $this->Flash->error(__('The user could not be deleted. Please, try again.'));
        }

        $this->set('_serialize', []);
    }
}