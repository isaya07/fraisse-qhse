<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('actions', function (Blueprint $table) {
            $table->foreignId('action_type_id')->nullable()->constrained('action_types')->onDelete('set null');
            $table->dropColumn('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('actions', function (Blueprint $table) {
            $table->dropForeign(['action_type_id']);
            $table->dropColumn('action_type_id');
            $table->enum('type', ['corrective', 'preventive', 'improvement'])->nullable();
        });
    }
};
