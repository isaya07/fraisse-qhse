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
        Schema::create('maintenance_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('equipment_id')->constrained('equipment')->onDelete('cascade');
            $table->enum('type', ['periodic_check', 'repair', 'calibration']);
            $table->date('date');
            $table->text('description');
            $table->decimal('cost', 10, 2)->nullable();
            $table->string('performer');
            $table->enum('result', ['compliant', 'non_compliant', 'fixed']);
            $table->date('next_maintenance_date')->nullable();
            $table->string('document_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maintenance_logs');
    }
};
