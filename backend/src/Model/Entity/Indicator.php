<?php
declare(strict_types=1);

namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Indicator Entity
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property string $code
 * @property string|null $category
 * @property string|null $unit
 * @property float|null $target_value
 * @property float|null $threshold_min
 * @property float|null $threshold_max
 * @property string|null $calculation_method
 * @property string|null $data_source
 * @property string $frequency
 * @property int $created_by
 * @property bool $is_active
 * @property \Cake\I18n\FrozenTime|null $created
 * @property \Cake\I18n\FrozenTime|null $modified
 *
 * @property \App\Model\Entity\User $creator
 * @property \App\Model\Entity\Action[] $action_indicators
 */
class Indicator extends Entity
{
    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
    protected array $_accessible = [
        'name' => true,
        'description' => true,
        'code' => true,
        'category' => true,
        'unit' => true,
        'target_value' => true,
        'threshold_min' => true,
        'threshold_max' => true,
        'calculation_method' => true,
        'data_source' => true,
        'frequency' => true,
        'trend_direction' => true,
        'created_by' => true,
        'is_active' => true,
        'action_indicators' => true,
    ];
}