<?php
declare(strict_types=1);

use Migrations\AbstractMigration;

class CreateActionIndicatorsTable extends AbstractMigration
{
    /**
     * Up Method.
     *
     * @return void
     */
    public function up(): void
    {
        $this->table('action_indicators')
            ->addColumn('action_id', 'integer', [
                'default' => null,
                'limit' => 11,
                'null' => false,
                'signed' => false,
            ])
            ->addColumn('indicator_id', 'integer', [
                'default' => null,
                'limit' => 11,
                'null' => false,
                'signed' => false,
            ])
            ->addColumn('created', 'datetime', [
                'default' => null,
                'null' => true,
            ])
            ->addIndex(['action_id'], ['name' => 'idx_action_indicators_action_id'])
            ->addIndex(['indicator_id'], ['name' => 'idx_action_indicators_indicator_id'])
            ->addForeignKey('action_id', 'actions', 'id', ['delete' => 'CASCADE', 'update' => 'NO_ACTION'])
            ->addForeignKey('indicator_id', 'indicators', 'id', ['delete' => 'CASCADE', 'update' => 'NO_ACTION'])
            ->create();
    }

    /**
     * Down Method.
     *
     * @return void
     */
    public function down(): void
    {
        $this->table('action_indicators')->drop()->save();
    }
}