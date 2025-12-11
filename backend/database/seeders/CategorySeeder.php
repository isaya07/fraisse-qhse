<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Check if categories already exist to avoid duplicates if run multiple times
        if (DB::table('categories')->count() > 0) {
            return;
        }

        $categories = [
            [
                'name' => 'Procédure',
                'slug' => 'procedure',
                'description' => 'Documents décrivant la manière d\'accomplir une tâche',
                'color' => '#3B82F6', // Blue
                'icon' => 'file-lines',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Formulaire',
                'slug' => 'form',
                'description' => 'Documents à remplir pour collecter des informations',
                'color' => '#F59E0B', // Orange
                'icon' => 'file-pen',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Consigne',
                'slug' => 'consigne',
                'description' => 'Instructions de sécurité ou opérationnelles',
                'color' => '#EF4444', // Red
                'icon' => 'triangle-exclamation',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Autre',
                'slug' => 'other',
                'description' => 'Autres types de documents',
                'color' => '#6B7280', // Gray
                'icon' => 'file',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('categories')->insert($categories);
    }
}
