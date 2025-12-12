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
        Schema::create('indicators', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->text('description')->nullable();
            $table->string('code', 50)->unique();
            $table->foreignId('indicator_category_id')->nullable()->constrained('indicator_categories')->onDelete('set null');
            $table->string('unit', 50)->nullable();
            $table->decimal('target_value', 10, 2)->nullable();
            $table->decimal('threshold_min', 10, 2)->nullable();
            $table->decimal('threshold_max', 10, 2)->nullable();
            $table->string('calculation_method', 100)->nullable();
            $table->string('data_source', 255)->nullable();
            $table->enum('frequency', ['daily', 'weekly', 'monthly', 'quarterly', 'yearly']);
            $table->enum('trend_direction', ['positive', 'negative', 'neutral']);
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('indicators');
    }
};
