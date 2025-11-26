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


        Schema::create('safety_visits', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('location');
            $table->foreignId('auditor_id')->constrained('users');
            $table->integer('score')->nullable();
            $table->enum('status', ['planned', 'completed', 'cancelled'])->default('planned');
            $table->string('report_path')->nullable();
            $table->timestamps();
        });

        Schema::create('toolbox_talks', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('topic');
            $table->foreignId('instructor_id')->constrained('users');
            $table->string('location');
            $table->string('notes_path')->nullable();
            $table->timestamps();
        });

        Schema::create('toolbox_talk_attendees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('toolbox_talk_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('toolbox_talk_attendees');
        Schema::dropIfExists('toolbox_talks');
        Schema::dropIfExists('safety_visits');

    }
};
