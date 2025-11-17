<?php
declare(strict_types=1);

use Migrations\AbstractMigration;

class CreateActionDocumentsTable extends AbstractMigration
{
    /**
     * Up Method.
     *
     * @return void
     */
    public function up(): void
    {
        $this->table('action_documents')
            ->addColumn('action_id', 'integer', [
                'default' => null,
                'limit' => 11,
                'null' => false,
                'signed' => false,
            ])
            ->addColumn('document_id', 'integer', [
                'default' => null,
                'limit' => 11,
                'null' => false,
                'signed' => false,
            ])
            ->addColumn('created', 'datetime', [
                'default' => null,
                'null' => true,
            ])
            ->addIndex(['action_id'], ['name' => 'idx_action_documents_action_id'])
            ->addIndex(['document_id'], ['name' => 'idx_action_documents_document_id'])
            ->addForeignKey('action_id', 'actions', 'id', ['delete' => 'CASCADE', 'update' => 'NO_ACTION'])
            ->addForeignKey('document_id', 'documents', 'id', ['delete' => 'CASCADE', 'update' => 'NO_ACTION'])
            ->create();
    }

    /**
     * Down Method.
     *
     * @return void
     */
    public function down(): void
    {
        $this->table('action_documents')->drop()->save();
    }
}