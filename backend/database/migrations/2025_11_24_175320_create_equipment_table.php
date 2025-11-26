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
        Schema::create('equipment', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('equipment_categories')->onDelete('cascade');
            $table->string('serial_number')->unique();
            $table->string('internal_ref')->nullable();
            $table->string('name');
            $table->string('brand')->nullable();
            $table->string('model')->nullable();
            $table->date('purchase_date');
            $table->date('manufacture_date')->nullable();
            $table->date('expiration_date')->nullable();
            $table->enum('status', ['available', 'assigned', 'maintenance', 'broken', 'retired'])->default('available');
            $table->enum('location', ['warehouse', 'workshop', 'office', 'vehicle', 'site'])->default('warehouse');
            $table->string('image_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipment');
    }
};
