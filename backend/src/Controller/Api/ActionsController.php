<?php
declare(strict_types=1);

namespace App\Controller\Api;

use Cake\Http\Exception\ForbiddenException;

/**
 * Actions Controller
 *
 * @property \App\Model\Table\ActionsTable $Actions
 * @method \App\Model\Entity\Action[]|\Cake\Datasource\ResultSetInterface|\Cake\Datasource\Paging\PaginatedInterface paginate($object = null, array $settings = [])
 */
class ActionsController extends AppController
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

        // Les administrateurs voient toutes les actions
        // Les autres utilisateurs ne voient que les actions qui leur sont assignées ou qu'ils ont créées
        $query = $this->Actions->find();
        
        if ($user->role !== 'admin') {
            $query = $query->where([
                'OR' => [
                    ['assigned_to' => $user->id],
                    ['created_by' => $user->id]
                ]
            ]);
        }

        $actions = $this->paginate($query->contain(['Assignees', 'Creators', 'Documents', 'Indicators']));

        $this->set(compact('actions'));
        $this->set('_serialize', ['actions']);
    }

    /**
     * View method
     *
     * @param string|null $id Action id.
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

        $action = $this->Actions->get($id, [
            'contain' => ['Assignees', 'Creators', 'Documents', 'Indicators']
        ]);

        // L'utilisateur peut voir l'action s'il est admin, s'il est le créateur ou s'il lui est assignée
        if ($user->role !== 'admin' && $user->id !== $action->created_by && $user->id !== $action->assigned_to) {
            throw new ForbiddenException(__('Accès non autorisé à cette action'));
        }

        $this->set('action', $action);
        $this->set('_serialize', ['action']);
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

        $action = $this->Actions->newEmptyEntity();
        $this->request->allowMethod(['post']);

        $data = $this->request->getData();
        // Assurer que l'utilisateur connecté est le créateur
        $data['created_by'] = $user->id;
        
        // Si l'utilisateur n'est pas admin, il ne peut pas assigner à quelqu'un d'autre
        if ($user->role !== 'admin' && isset($data['assigned_to']) && $data['assigned_to'] != $user->id) {
            throw new ForbiddenException(__('Vous ne pouvez pas assigner une action à un autre utilisateur'));
        }

        $action = $this->Actions->patchEntity($action, $data);

        // Sauvegarder l'action d'abord
        if ($this->Actions->save($action)) {
            // Gérer les relations avec les documents et indicateurs
            if (isset($data['documents']) && is_array($data['documents'])) {
                $documents = $this->Actions->Documents->find()
                    ->where(['id IN' => $data['documents']])
                    ->toArray();
                $this->Actions->link($action, ['Documents' => $documents]);
            }
            
            if (isset($data['indicators']) && is_array($data['indicators'])) {
                $indicators = $this->Actions->Indicators->find()
                    ->where(['id IN' => $data['indicators']])
                    ->toArray();
                $this->Actions->link($action, ['Indicators' => $indicators]);
            }

            // Recharger l'action avec les relations
            $action = $this->Actions->get($action->id, [
                'contain' => ['Assignees', 'Creators', 'Documents', 'Indicators']
            ]);

            $this->set('action', $action);
            $this->set('_serialize', ['action']);
        } else {
            $this->set('action', $action);
            $this->set('_serialize', ['action']);
            $this->response = $this->response->withStatus(422); // Unprocessable Entity
        }
    }

    /**
     * Edit method
     *
     * @param string|null $id Action id.
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

        $action = $this->Actions->get($id, [
            'contain' => ['Documents', 'Indicators']
        ]);

        // Seul le créateur, l'assigné ou un admin peut modifier l'action
        if ($user->role !== 'admin' && $user->id !== $action->created_by && $user->id !== $action->assigned_to) {
            throw new ForbiddenException(__('Accès non autorisé'));
        }

        $this->request->allowMethod(['patch', 'post', 'put']);
        $data = $this->request->getData();
        
        // Les non-admins ne peuvent pas changer l'utilisateur assigné sauf s'ils sont l'assigné actuel
        if ($user->role !== 'admin') {
            if ($user->id !== $action->assigned_to) {
                // Si l'utilisateur n'est pas l'assigné actuel, ne permettre la modification de assigned_to que si c'est lui-même
                if (isset($data['assigned_to']) && $data['assigned_to'] != $user->id) {
                    throw new ForbiddenException(__('Vous ne pouvez pas modifier l\'assignation de cette action'));
                }
            }
        }
        
        // Sauvegarder les modifications
        $action = $this->Actions->patchEntity($action, $data);

        if ($this->Actions->save($action)) {
            // Gérer les relations avec les documents et indicateurs
            if (isset($data['documents'])) {
                $documents = $this->Actions->Documents->find()
                    ->where(['id IN' => $data['documents']])
                    ->toArray();
                $this->Actions->patchEntity($action, ['Documents' => $documents]);
                $this->Actions->save($action);
            }
            
            if (isset($data['indicators'])) {
                $indicators = $this->Actions->Indicators->find()
                    ->where(['id IN' => $data['indicators']])
                    ->toArray();
                $this->Actions->patchEntity($action, ['Indicators' => $indicators]);
                $this->Actions->save($action);
            }
            
            // Recharger l'action avec les relations
            $action = $this->Actions->get($action->id, [
                'contain' => ['Assignees', 'Creators', 'Documents', 'Indicators']
            ]);

            $this->set('action', $action);
            $this->set('_serialize', ['action']);
        } else {
            $this->set('action', $action);
            $this->set('_serialize', ['action']);
            $this->response = $this->response->withStatus(422); // Unprocessable Entity
        }
    }

    /**
     * Delete method
     *
     * @param string|null $id Action id.
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

        $action = $this->Actions->get($id);

        // Seul le créateur ou un admin peut supprimer l'action
        if ($user->role !== 'admin' && $user->id !== $action->created_by) {
            throw new ForbiddenException(__('Accès non autorisé'));
        }

        if ($this->Actions->delete($action)) {
            $this->set('_serialize', []);
        } else {
            $this->response = $this->response->withStatus(422); // Unprocessable Entity
            $this->set('_serialize', []);
        }
    }
    
    /**
     * UpdateProgress method - specific to actions
     *
     * @param string|null $id Action id.
     * @return \Cake\Http\Response|null
     */
    public function updateProgress($id = null)
    {
        $this->request->allowMethod(['post']);
        
        $user = $this->Authentication->getIdentity();
        if (!$user) {
            throw new ForbiddenException(__('Authentification requise'));
        }

        $action = $this->Actions->get($id);

        // Seul l'assigné ou un admin peut modifier la progression
        if ($user->role !== 'admin' && $user->id !== $action->assigned_to) {
            throw new ForbiddenException(__('Accès non autorisé'));
        }

        $data = $this->request->getData();
        $progress = (int)$data['progress'];
        
        // Valider la progression
        if ($progress < 0 || $progress > 100) {
            $this->set('action', $action);
            $this->set('_serialize', ['action']);
            $this->response = $this->response->withStatus(400); // Bad Request
            return;
        }
        
        // Si la progression est 100, mettre à jour la date de complétion
        if ($progress === 100 && $action->status !== 'completed') {
            $action = $this->Actions->patchEntity($action, [
                'progress' => $progress,
                'status' => 'completed',
                'completed_date' => date('Y-m-d')
            ]);
        } else {
            $action = $this->Actions->patchEntity($action, [
                'progress' => $progress
            ]);
            
            // Si la progression est > 0 et < 100, s'assurer que le statut est "in_progress"
            if ($progress > 0 && $progress < 100 && $action->status !== 'completed') {
                if ($action->status !== 'in_progress') {
                    $action = $this->Actions->patchEntity($action, [
                        'status' => 'in_progress'
                    ]);
                }
            } elseif ($progress === 0) {
                $action = $this->Actions->patchEntity($action, [
                    'status' => 'open'
                ]);
            }
        }

        if ($this->Actions->save($action)) {
            $this->set('action', $action);
            $this->set('_serialize', ['action']);
        } else {
            $this->set('action', $action);
            $this->set('_serialize', ['action']);
            $this->response = $this->response->withStatus(422); // Unprocessable Entity
        }
    }
}