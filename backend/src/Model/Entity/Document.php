<?php
declare(strict_types=1);

namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Document Entity
 *
 * @property int $id
 * @property string $title
 * @property string|null $description
 * @property string $filename
 * @property string $filepath
 * @property int|null $file_size
 * @property string|null $mime_type
 * @property string $version
 * @property string|null $category
 * @property string $status
 * @property int|null $created_by
 * @property int|null $approved_by
 * @property \Cake\I18n\FrozenTime|null $published_date
 * @property \Cake\I18n\FrozenTime|null $expires_date
 * @property \Cake\I18n\FrozenTime|null $created
 * @property \Cake\I18n\FrozenTime|null $modified
 *
 * @property \App\Model\Entity\User $creator
 * @property \App\Model\Entity\User $approver
 * @property \App\Model\Entity\Action[] $action_documents
 */
class Document extends Entity
{
    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
    protected array $_accessible = [
        'title' => true,
        'description' => true,
        'filename' => true,
        'filepath' => true,
        'file_size' => true,
        'mime_type' => true,
        'version' => true,
        'category' => true,
        'status' => true,
        'created_by' => true,
        'approved_by' => true,
        'published_date' => true,
        'expires_date' => true,
        'action_documents' => true,
    ];
}