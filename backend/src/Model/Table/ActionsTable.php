<?php
declare(strict_types=1);

namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Actions Model
 *
 * @method \App\Model\Entity\Action newEmptyEntity()
 * @method \App\Model\Entity\Action newEntity(array $data, array $options = [])
 * @method \App\Model\Entity\Action[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Action get($primaryKey, $options = [])
 * @method \App\Model\Entity\Action findOrCreate($search, ?callable $callback = null, $options = [])
 * @method \App\Model\Entity\Action patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Action[] patchEntities(iterable $entities, array $data, array $options = [])
 * @method \App\Model\Entity\Action|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Action saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Action[]|\Cake\Datasource\ResultSetInterface|false saveMany(iterable $entities, $options = [])
 * @method \App\Model\Entity\Action[]|\Cake\Datasource\ResultSetInterface saveManyOrFail(iterable $entities, $options = [])
 * @method \App\Model\Entity\Action[]|\Cake\Datasource\ResultSetInterface|false deleteMany(iterable $entities, $options = [])
 * @method \App\Model\Entity\Action[]|\Cake\Datasource\ResultSetInterface deleteManyOrFail(iterable $entities, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class ActionsTable extends Table
{
    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config): void
    {
        parent::initialize($config);

        $this->setTable('actions');
        $this->setDisplayField('title');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');

        $this->belongsTo('Assignees', [
            'className' => 'Users',
            'foreignKey' => 'assigned_to',
            'joinType' => 'LEFT',
        ]);
        $this->belongsTo('Creators', [
            'className' => 'Users',
            'foreignKey' => 'created_by',
            'joinType' => 'INNER',
        ]);

        // Relations pour les documents et indicateurs liés à l'action
        $this->belongsToMany('Documents', [
            'className' => 'Documents',
            'foreignKey' => 'action_id',
            'targetForeignKey' => 'document_id',
            'joinTable' => 'action_documents',
        ]);

        $this->belongsToMany('Indicators', [
            'className' => 'Indicators',
            'foreignKey' => 'action_id',
            'targetForeignKey' => 'indicator_id',
            'joinTable' => 'action_indicators',
        ]);
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator): Validator
    {
        $validator
            ->integer('id')
            ->allowEmptyString('id', null, 'create');

        $validator
            ->scalar('title')
            ->maxLength('title', 255)
            ->requirePresence('title', 'create')
            ->notEmptyString('title');

        $validator
            ->scalar('type')
            ->inList('type', ['corrective', 'preventive', 'improvement'])
            ->requirePresence('type', 'create')
            ->notEmptyString('type');

        $validator
            ->scalar('priority')
            ->inList('priority', ['low', 'medium', 'high', 'critical'])
            ->requirePresence('priority', 'create')
            ->notEmptyString('priority');

        $validator
            ->scalar('status')
            ->inList('status', ['open', 'in_progress', 'completed', 'cancelled'])
            ->requirePresence('status', 'create')
            ->notEmptyString('status');

        $validator
            ->integer('assigned_to')
            ->allowEmptyString('assigned_to');

        $validator
            ->integer('created_by')
            ->notEmptyString('created_by');

        $validator
            ->date('due_date')
            ->allowEmptyDate('due_date');

        $validator
            ->date('completed_date')
            ->allowEmptyDate('completed_date');

        $validator
            ->integer('progress')
            ->min('progress', 0)
            ->max('progress', 100)
            ->requirePresence('progress', 'create')
            ->notEmptyString('progress');

        $validator
            ->scalar('related_to')
            ->maxLength('related_to', 100)
            ->allowEmptyString('related_to');

        $validator
            ->integer('related_id')
            ->allowEmptyString('related_id');

        return $validator;
    }

    /**
     * Returns a rules checker object that will be used for validating
     * application integrity.
     *
     * @param \Cake\ORM\RulesChecker $rules The rules object to be modified.
     * @return \Cake\ORM\RulesChecker
     */
    public function buildRules(RulesChecker $rules): RulesChecker
    {
        $rules->add($rules->existsIn(['assigned_to'], 'Assignees'));
        $rules->add($rules->existsIn(['created_by'], 'Creators'));

        return $rules;
    }
}