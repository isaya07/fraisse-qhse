<?php
declare(strict_types=1);

namespace App\Controller\Api;

use Cake\Http\Exception\NotFoundException;
use Cake\Http\Exception\ForbiddenException;

/**
 * Documents Controller
 *
 * @property \App\Model\Table\DocumentsTable $Documents
 * @method \App\Model\Entity\Document[]|\Cake\Datasource\ResultSetInterface|\Cake\Datasource\Paging\PaginatedInterface paginate($object = null, array $settings = [])
 */
class DocumentsController extends AppController
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

        // Les administrateurs peuvent voir tous les documents
        // Les autres utilisateurs ne voient que les documents approuvés ou les leurs (s'ils sont createurs)
        $query = $this->Documents->find();
        
        if ($user->role !== 'admin') {
            $query = $query->where([
                'OR' => [
                    ['status' => 'approved'],
                    ['created_by' => $user->id]
                ]
            ]);
        }

        $documents = $this->paginate($query);

        $this->set(compact('documents'));
        $this->set('_serialize', ['documents']);
    }

    /**
     * View method
     *
     * @param string|null $id Document id.
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

        $document = $this->Documents->get($id, [
            'contain' => ['Creators', 'Approvers']
        ]);

        // L'utilisateur peut voir le document s'il est admin, s'il est le créateur, ou si le document est approuvé
        if ($user->role !== 'admin' && $user->id !== $document->created_by && $document->status !== 'approved') {
            throw new ForbiddenException(__('Accès non autorisé à ce document'));
        }

        $this->set('document', $document);
        $this->set('_serialize', ['document']);
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

        $document = $this->Documents->newEmptyEntity();
        $this->request->allowMethod(['post']);

        $data = $this->request->getData();
        // Assurer que l'utilisateur connecté est le créateur
        $data['created_by'] = $user->id;
        
        // Les documents créés par des non-admins sont en statut "draft" par défaut
        if ($user->role !== 'admin') {
            $data['status'] = 'draft';
        }

        $document = $this->Documents->patchEntity($document, $data);

        if ($this->Documents->save($document)) {
            $this->set('document', $document);
            $this->set('_serialize', ['document']);
        } else {
            $this->set('document', $document);
            $this->set('_serialize', ['document']);
            $this->response = $this->response->withStatus(422); // Unprocessable Entity
        }
    }

    /**
     * Edit method
     *
     * @param string|null $id Document id.
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

        $document = $this->Documents->get($id, [
            'contain' => []
        ]);

        // Seul le créateur ou un admin peut modifier le document
        if ($user->role !== 'admin' && $user->id !== $document->created_by) {
            throw new ForbiddenException(__('Accès non autorisé'));
        }

        $this->request->allowMethod(['patch', 'post', 'put']);
        $data = $this->request->getData();
        
        // Les non-admins ne peuvent pas modifier le statut
        if ($user->role !== 'admin') {
            unset($data['status']);
        }
        
        $document = $this->Documents->patchEntity($document, $data);

        if ($this->Documents->save($document)) {
            $this->set('document', $document);
            $this->set('_serialize', ['document']);
        } else {
            $this->set('document', $document);
            $this->set('_serialize', ['document']);
            $this->response = $this->response->withStatus(422); // Unprocessable Entity
        }
    }

    /**
     * Delete method
     *
     * @param string|null $id Document id.
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

        $document = $this->Documents->get($id);

        // Seul le créateur ou un admin peut supprimer le document
        if ($user->role !== 'admin' && $user->id !== $document->created_by) {
            throw new ForbiddenException(__('Accès non autorisé'));
        }

        if ($this->Documents->delete($document)) {
            $this->set('_serialize', []);
        } else {
            $this->response = $this->response->withStatus(422); // Unprocessable Entity
            $this->set('_serialize', []);
        }
    }
    
    /**
     * Approve method - specific to documents
     *
     * @param string|null $id Document id.
     * @return \Cake\Http\Response|null
     */
    public function approve($id = null)
    {
        $this->request->allowMethod(['post']);
        
        $user = $this->Authentication->getIdentity();
        if (!$user || $user->role !== 'admin') {
            throw new ForbiddenException(__('Accès non autorisé'));
        }

        $document = $this->Documents->get($id);
        
        // Mettre à jour le statut et l'utilisateur approuveur
        $document = $this->Documents->patchEntity($document, [
            'status' => 'approved',
            'approved_by' => $user->id,
            'published_date' => date('Y-m-d H:i:s')
        ]);

        if ($this->Documents->save($document)) {
            $this->set('document', $document);
            $this->set('_serialize', ['document']);
        } else {
            $this->set('document', $document);
            $this->set('_serialize', ['document']);
            $this->response = $this->response->withStatus(422); // Unprocessable Entity
        }
    }
}