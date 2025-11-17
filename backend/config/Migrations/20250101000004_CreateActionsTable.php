<?php
declare(strict_types=1);

use Migrations\AbstractMigration;

class CreateActionsTable extends AbstractMigration
{
    /**
     * Up Method.
     *
     * @return void
     */
    public function up(): void
    {
        $this->table('actions')
            ->addColumn('title', 'string', [
                'default' => null,
                'limit' => 255,
                'null' => false,
            ])
            ->addColumn('description', 'text', [
                'default' => null,
                'null' => true,
            ])
            ->addColumn('type', 'enum', [
                'default' => 'corrective',
                'values' => ['corrective', 'preventive', 'improvement'],
                'null' => false,
            ])
            ->addColumn('priority', 'enum', [
                'default' => 'medium',
                'values' => ['low', 'medium', 'high', 'critical'],
                'null' => false,
            ])
            ->addColumn('status', 'enum', [
                'default' => 'open',
                'values' => ['open', 'in_progress', 'completed', 'cancelled'],
                'null' => false,
            ])
            ->addColumn('assigned_to', 'integer', [
                'default' => null,
                'limit' => 11,
                'null' => true,
                'signed' => false,
            ])
            ->addColumn('created_by', 'integer', [
                'default' => null,
                'limit' => 11,
                'null' => false,
                'signed' => false,
            ])
            ->addColumn('due_date', 'date', [
                'default' => null,
                'null' => true,
            ])
            ->addColumn('completed_date', 'date', [
                'default' => null,
                'null' => true,
            ])
            ->addColumn('progress', 'integer', [
                'default' => 0,
                'limit' => 3,
                'null' => false,
                'signed' => false,
            ])
            ->addColumn('related_to', 'string', [
                'default' => null,
                'limit' => 100,
                'null' => true,
            ])
            ->addColumn('related_id', 'integer', [
                'default' => null,
                'limit' => 11,
                'null' => true,
                'signed' => false,
            ])
            ->addColumn('created', 'datetime', [
                'default' => null,
                'null' => true,
            ])
            ->addColumn('modified', 'datetime', [
                'default' => null,
                'null' => true,
            ])
            ->addIndex(['assigned_to'], ['name' => 'idx_actions_assigned_to'])
            ->addIndex(['created_by'], ['name' => 'idx_actions_created_by'])
            ->addIndex(['status'], ['name' => 'idx_actions_status'])
            ->addIndex(['priority'], ['name' => 'idx_actions_priority'])
            ->addIndex(['due_date'], ['name' => 'idx_actions_due_date'])
            ->addForeignKey('assigned_to', 'users', 'id', ['delete' => 'SET_NULL', 'update' => 'NO_ACTION'])
            ->addForeignKey('created_by', 'users', 'id', ['delete' => 'RESTRICT', 'update' => 'NO_ACTION'])
            ->create();
    }

    /**
     * Down Method.
     *
     * @return void
     */
    public function down(): void
    {
        $this->table('actions')->drop()->save();
    }
}