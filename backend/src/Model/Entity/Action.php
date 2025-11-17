<?php
declare(strict_types=1);

namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Action Entity
 *
 * @property int $id
 * @property string $title
 * @property string|null $description
 * @property string $type
 * @property string $priority
 * @property string $status
 * @property int|null $assigned_to
 * @property int $created_by
 * @property \Cake\I18n\FrozenDate|null $due_date
 * @property \Cake\I18n\FrozenDate|null $completed_date
 * @property int $progress
 * @property string|null $related_to
 * @property int|null $related_id
 * @property \Cake\I18n\FrozenTime|null $created
 * @property \Cake\I18n\FrozenTime|null $modified
 *
 * @property \App\Model\Entity\User $assignee
 * @property \App\Model\Entity\User $creator
 * @property \App\Model\Entity\Document[] $action_documents
 * @property \App\Model\Entity\Indicator[] $action_indicators
 */
class Action extends Entity
{
    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
    protected array $_accessible = [
        'title' => true,
        'description' => true,
        'type' => true,
        'priority' => true,
        'status' => true,
        'assigned_to' => true,
        'created_by' => true,
        'due_date' => true,
        'completed_date' => true,
        'progress' => true,
        'related_to' => true,
        'related_id' => true,
        'action_documents' => true,
        'action_indicators' => true,
    ];
}