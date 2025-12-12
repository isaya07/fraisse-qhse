<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('documents', function (Blueprint $table) {
            $table->foreignId('document_folder_id')->nullable()->constrained('document_folders')->onDelete('set null');
            // Ensure category column exists as string if it was removed or modified
            if (!Schema::hasColumn('documents', 'category')) {
                $table->string('category')->nullable();
            }
        });
    }

    public function down()
    {
        Schema::table('documents', function (Blueprint $table) {
            $table->dropForeign(['document_folder_id']);
            $table->dropColumn('document_folder_id');
        });
    }
};
