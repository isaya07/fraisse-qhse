<?php
declare(strict_types=1);

namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Indicators Model
 *
 * @method \App\Model\Entity\Indicator newEmptyEntity()
 * @method \App\Model\Entity\Indicator newEntity(array $data, array $options = [])
 * @method \App\Model\Entity\Indicator[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Indicator get($primaryKey, $options = [])
 * @method \App\Model\Entity\Indicator findOrCreate($search, ?callable $callback = null, $options = [])
 * @method \App\Model\Entity\Indicator patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Indicator[] patchEntities(iterable $entities, array $data, array $options = [])
 * @method \App\Model\Entity\Indicator|false save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Indicator saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Indicator[]|\Cake\Datasource\ResultSetInterface|false saveMany(iterable $entities, $options = [])
 * @method \App\Model\Entity\Indicator[]|\Cake\Datasource\ResultSetInterface saveManyOrFail(iterable $entities, $options = [])
 * @method \App\Model\Entity\Indicator[]|\Cake\Datasource\ResultSetInterface|false deleteMany(iterable $entities, $options = [])
 * @method \App\Model\Entity\Indicator[]|\Cake\Datasource\ResultSetInterface deleteManyOrFail(iterable $entities, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class IndicatorsTable extends Table
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

        $this->setTable('indicators');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');

        $this->belongsTo('Creators', [
            'className' => 'Users',
            'foreignKey' => 'created_by',
            'joinType' => 'INNER',
        ]);

        // Relation pour les actions liées à l'indicateur
        $this->belongsToMany('Actions', [
            'className' => 'Actions',
            'foreignKey' => 'indicator_id',
            'targetForeignKey' => 'action_id',
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
            ->scalar('name')
            ->maxLength('name', 255)
            ->requirePresence('name', 'create')
            ->notEmptyString('name');

        $validator
            ->scalar('code')
            ->maxLength('code', 50)
            ->requirePresence('code', 'create')
            ->notEmptyString('code')
            ->add('code', 'unique', ['rule' => 'validateUnique', 'provider' => 'table']);

        $validator
            ->scalar('category')
            ->maxLength('category', 100)
            ->allowEmptyString('category');

        $validator
            ->scalar('unit')
            ->maxLength('unit', 50)
            ->allowEmptyString('unit');

        $validator
            ->decimal('target_value')
            ->allowEmptyString('target_value');

        $validator
            ->decimal('threshold_min')
            ->allowEmptyString('threshold_min');

        $validator
            ->decimal('threshold_max')
            ->allowEmptyString('threshold_max');

        $validator
            ->scalar('calculation_method')
            ->maxLength('calculation_method', 100)
            ->allowEmptyString('calculation_method');

        $validator
            ->scalar('data_source')
            ->maxLength('data_source', 255)
            ->allowEmptyString('data_source');

        $validator
            ->scalar('frequency')
            ->inList('frequency', ['daily', 'weekly', 'monthly', 'quarterly', 'yearly'])
            ->requirePresence('frequency', 'create')
            ->notEmptyString('frequency');

        $validator
            ->scalar('trend_direction')
            ->inList('trend_direction', ['positive', 'negative', 'neutral'])
            ->requirePresence('trend_direction', 'create')
            ->notEmptyString('trend_direction');

        $validator
            ->integer('created_by')
            ->notEmptyString('created_by');

        $validator
            ->boolean('is_active')
            ->requirePresence('is_active', 'create')
            ->notEmptyString('is_active');

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
        $rules->add($rules->isUnique(['code']), ['errorField' => 'code']);
        $rules->add($rules->existsIn(['created_by'], 'Creators'));

        return $rules;
    }
}