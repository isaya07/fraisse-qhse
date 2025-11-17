<?php
declare(strict_types=1);

use Migrations\AbstractMigration;

class CreateDocumentsTable extends AbstractMigration
{
    /**
     * Up Method.
     *
     * @return void
     */
    public function up(): void
    {
        $this->table('documents')
            ->addColumn('title', 'string', [
                'default' => null,
                'limit' => 255,
                'null' => false,
            ])
            ->addColumn('description', 'text', [
                'default' => null,
                'null' => true,
            ])
            ->addColumn('filename', 'string', [
                'default' => null,
                'limit' => 255,
                'null' => false,
            ])
            ->addColumn('filepath', 'string', [
                'default' => null,
                'limit' => 500,
                'null' => false,
            ])
            ->addColumn('file_size', 'integer', [
                'default' => null,
                'null' => true,
            ])
            ->addColumn('mime_type', 'string', [
                'default' => null,
                'limit' => 100,
                'null' => true,
            ])
            ->addColumn('version', 'string', [
                'default' => '1.0',
                'limit' => 20,
                'null' => false,
            ])
            ->addColumn('category', 'string', [
                'default' => null,
                'limit' => 100,
                'null' => true,
            ])
            ->addColumn('status', 'enum', [
                'default' => 'draft',
                'values' => ['draft', 'pending_approval', 'approved', 'rejected', 'archived'],
                'null' => false,
            ])
            ->addColumn('created_by', 'integer', [
                'default' => null,
                'limit' => 11,
                'null' => true,
                'signed' => false,
            ])
            ->addColumn('approved_by', 'integer', [
                'default' => null,
                'limit' => 11,
                'null' => true,
                'signed' => false,
            ])
            ->addColumn('published_date', 'datetime', [
                'default' => null,
                'null' => true,
            ])
            ->addColumn('expires_date', 'datetime', [
                'default' => null,
                'null' => true,
            ])
            ->addColumn('created', 'datetime', [
                'default' => null,
                'null' => true,
            ])
            ->addColumn('modified', 'datetime', [
                'default' => null,
                'null' => true,
            ])
            ->addIndex(['created_by'], ['name' => 'idx_documents_created_by'])
            ->addIndex(['approved_by'], ['name' => 'idx_documents_approved_by'])
            ->addIndex(['category'], ['name' => 'idx_documents_category'])
            ->addIndex(['status'], ['name' => 'idx_documents_status'])
            ->addForeignKey('created_by', 'users', 'id', ['delete' => 'SET_NULL', 'update' => 'NO_ACTION'])
            ->addForeignKey('approved_by', 'users', 'id', ['delete' => 'SET_NULL', 'update' => 'NO_ACTION'])
            ->create();
    }

    /**
     * Down Method.
     *
     * @return void
     */
    public function down(): void
    {
        $this->table('documents')->drop()->save();
    }
}