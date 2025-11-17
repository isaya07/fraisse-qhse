<?php
declare(strict_types=1);

namespace App\Controller\Api;

use Cake\Http\Exception\ForbiddenException;

/**
 * Indicators Controller
 *
 * @property \App\Model\Table\IndicatorsTable $Indicators
 * @method \App\Model\Entity\Indicator[]|\Cake\Datasource\ResultSetInterface|\Cake\Datasource\Paging\PaginatedInterface paginate($object = null, array $settings = [])
 */
class IndicatorsController extends AppController
{
    /**
     * Index method
     *
     * @return \Cake\Http\Response|null
     */
    public function index()
    {
        $this->Authorization->skipAuthorization();
        
        $user = $this->Authentication->getIdentity();
        if (!$user) {
            throw new ForbiddenException(__('Authentification requise'));
        }

        // Les administrateurs voient tous les indicateurs
        // Les autres utilisateurs ne voient que les indicateurs actifs
        $query = $this->Indicators->find();
        
        if ($user->role !== 'admin') {
            $query = $query->where(['is_active' => true]);
        }

        $indicators = $this->paginate($query->contain(['Creators']));

        $this->set(compact('indicators'));
        $this->set('_serialize', ['indicators']);
    }

    /**
     * View method
     *
     * @param string|null $id Indicator id.
     * @return \Cake\Http\Response|null
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $this->Authorization->skipAuthorization();
        
        $user = $this->Authentication->getIdentity();
        if (!$user) {
            throw new ForbiddenException(__('Authentification requise'));
        }

        $indicator = $this->Indicators->get($id, [
            'contain' => ['Creators', 'Actions']
        ]);

        // L'utilisateur peut voir l'indicateur s'il est admin ou si l'indicateur est actif
        if ($user->role !== 'admin' && !$indicator->is_active) {
            throw new ForbiddenException(__('Accès non autorisé à cet indicateur'));
        }

        $this->set('indicator', $indicator);
        $this->set('_serialize', ['indicator']);
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null
     */
    public function add()
    {
        $this->Authorization->skipAuthorization();
        
        $user = $this->Authentication->getIdentity();
        if (!$user) {
            throw new ForbiddenException(__('Authentification requise'));
        }

        $indicator = $this->Indicators->newEmptyEntity();
        $this->request->allowMethod(['post']);

        $data = $this->request->getData();
        // Assurer que l'utilisateur connecté est le créateur
        $data['created_by'] = $user->id;
        
        // Les non-admins ne peuvent pas créer d'indicateurs inactifs
        if ($user->role !== 'admin') {
            $data['is_active'] = true;
        }

        $indicator = $this->Indicators->patchEntity($indicator, $data);

        if ($this->Indicators->save($indicator)) {
            $this->set('indicator', $indicator);
            $this->set('_serialize', ['indicator']);
        } else {
            $this->set('indicator', $indicator);
            $this->set('_serialize', ['indicator']);
            $this->response = $this->response->withStatus(422); // Unprocessable Entity
        }
    }

    /**
     * Edit method
     *
     * @param string|null $id Indicator id.
     * @return \Cake\Http\Response|null
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $this->Authorization->skipAuthorization();
        
        $user = $this->Authentication->getIdentity();
        if (!$user) {
            throw new ForbiddenException(__('Authentification requise'));
        }

        $indicator = $this->Indicators->get($id, [
            'contain' => []
        ]);

        // Seul le créateur ou un admin peut modifier l'indicateur
        if ($user->role !== 'admin' && $user->id !== $indicator->created_by) {
            throw new ForbiddenException(__('Accès non autorisé'));
        }

        $this->request->allowMethod(['patch', 'post', 'put']);
        $data = $this->request->getData();
        
        // Les non-admins ne peuvent pas modifier le statut d'activation
        if ($user->role !== 'admin') {
            unset($data['is_active']);
        }
        
        $indicator = $this->Indicators->patchEntity($indicator, $data);

        if ($this->Indicators->save($indicator)) {
            $this->set('indicator', $indicator);
            $this->set('_serialize', ['indicator']);
        } else {
            $this->set('indicator', $indicator);
            $this->set('_serialize', ['indicator']);
            $this->response = $this->response->withStatus(422); // Unprocessable Entity
        }
    }

    /**
     * Delete method
     *
     * @param string|null $id Indicator id.
     * @return \Cake\Http\Response|null
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['delete']);
        
        $user = $this->Authentication->getIdentity();
        if (!$user) {
            throw new ForbiddenException(__('Authentification requise'));
        }

        $indicator = $this->Indicators->get($id);

        // Seul le créateur ou un admin peut supprimer l'indicateur
        if ($user->role !== 'admin' && $user->id !== $indicator->created_by) {
            throw new ForbiddenException(__('Accès non autorisé'));
        }

        if ($this->Indicators->delete($indicator)) {
            $this->set('_serialize', []);
        } else {
            $this->response = $this->response->withStatus(422); // Unprocessable Entity
            $this->set('_serialize', []);
        }
    }
    
    /**
     * ToggleActivation method - specific to indicators
     *
     * @param string|null $id Indicator id.
     * @return \Cake\Http\Response|null
     */
    public function toggleActivation($id = null)
    {
        $this->request->allowMethod(['post']);
        
        $user = $this->Authentication->getIdentity();
        if (!$user || $user->role !== 'admin') {
            throw new ForbiddenException(__('Accès non autorisé'));
        }

        $indicator = $this->Indicators->get($id);
        
        // Inverser le statut d'activation
        $indicator = $this->Indicators->patchEntity($indicator, [
            'is_active' => !$indicator->is_active
        ]);

        if ($this->Indicators->save($indicator)) {
            $this->set('indicator', $indicator);
            $this->set('_serialize', ['indicator']);
        } else {
            $this->set('indicator', $indicator);
            $this->set('_serialize', ['indicator']);
            $this->response = $this->response->withStatus(422); // Unprocessable Entity
        }
    }
}