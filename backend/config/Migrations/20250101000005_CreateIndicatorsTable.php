<?php
declare(strict_types=1);

use Migrations\AbstractMigration;

class CreateIndicatorsTable extends AbstractMigration
{
    /**
     * Up Method.
     *
     * @return void
     */
    public function up(): void
    {
        $this->table('indicators')
            ->addColumn('name', 'string', [
                'default' => null,
                'limit' => 255,
                'null' => false,
            ])
            ->addColumn('description', 'text', [
                'default' => null,
                'null' => true,
            ])
            ->addColumn('code', 'string', [
                'default' => null,
                'limit' => 50,
                'null' => false,
            ])
            ->addColumn('category', 'string', [
                'default' => null,
                'limit' => 100,
                'null' => true,
            ])
            ->addColumn('unit', 'string', [
                'default' => null,
                'limit' => 50,
                'null' => true,
            ])
            ->addColumn('target_value', 'decimal', [
                'default' => null,
                'precision' => 10,
                'scale' => 2,
                'null' => true,
            ])
            ->addColumn('threshold_min', 'decimal', [
                'default' => null,
                'precision' => 10,
                'scale' => 2,
                'null' => true,
            ])
            ->addColumn('threshold_max', 'decimal', [
                'default' => null,
                'precision' => 10,
                'scale' => 2,
                'null' => true,
            ])
            ->addColumn('calculation_method', 'string', [
                'default' => null,
                'limit' => 100,
                'null' => true,
            ])
            ->addColumn('data_source', 'string', [
                'default' => null,
                'limit' => 255,
                'null' => true,
            ])
            ->addColumn('frequency', 'enum', [
                'default' => 'monthly',
                'values' => ['daily', 'weekly', 'monthly', 'quarterly', 'yearly'],
                'null' => false,
            ])
            ->addColumn('created_by', 'integer', [
                'default' => null,
                'limit' => 11,
                'null' => false,
                'signed' => false,
            ])
            ->addColumn('trend_direction', 'enum', [
                'default' => 'neutral',
                'values' => ['positive', 'negative', 'neutral'],
                'null' => false,
            ])
            ->addColumn('is_active', 'boolean', [
                'default' => true,
                'null' => false,
            ])
            ->addColumn('created', 'datetime', [
                'default' => null,
                'null' => true,
            ])
            ->addColumn('modified', 'datetime', [
                'default' => null,
                'null' => true,
            ])
            ->addIndex(['code'], ['unique' => true])
            ->addIndex(['category'], ['name' => 'idx_indicators_category'])
            ->addIndex(['frequency'], ['name' => 'idx_indicators_frequency'])
            ->addIndex(['is_active'], ['name' => 'idx_indicators_is_active'])
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
        $this->table('indicators')->drop()->save();
    }
}