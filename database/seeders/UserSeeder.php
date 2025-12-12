<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Créer des utilisateurs avec des rôles spécifiques
        User::factory()->create([
            'username' => 'admin',
            'email' => 'admin@qhse.local',
            'first_name' => 'Admin',
            'last_name' => 'QHSE',
            'role' => 'admin',
            'is_active' => true,
        ]);

        User::factory()->create([
            'username' => 'manager',
            'email' => 'manager@qhse.local',
            'first_name' => 'Manager',
            'last_name' => 'QHSE',
            'role' => 'manager',
            'is_active' => true,
        ]);

        User::factory()->create([
            'username' => 'user1',
            'email' => 'user1@qhse.local',
            'first_name' => 'User',
            'last_name' => 'One',
            'role' => 'user',
            'is_active' => true,
        ]);

        User::factory()->create([
            'username' => 'viewer',
            'email' => 'viewer@qhse.local',
            'first_name' => 'Viewer',
            'last_name' => 'QHSE',
            'role' => 'viewer',
            'is_active' => true,
        ]);
    }
}
