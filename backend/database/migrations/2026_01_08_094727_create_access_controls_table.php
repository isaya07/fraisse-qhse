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
        Schema::create('access_controls', function (Blueprint $table) {
            $table->id();
            $table->morphs('entity'); // entity_type, entity_id
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            // We can add role_id later if needed, or use a polymorphic 'grantee'
            // For now, let's stick to user_id as per plan, but keep it nullable for future extensibility
            $table->string('access_level'); // 'read', 'write', 'admin', 'approve'
            $table->timestamps();

            // Unique constraint to prevent duplicate rules for same user/entity
            $table->unique(['entity_type', 'entity_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('access_controls');
    }
};
