<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Action;
use App\Models\User;

class ActionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        $actions = [
            ['title' => 'Renouvellement habilitations électriques', 'description' => 'Organiser session de recyclage pour l\'équipe électricité', 'priority' => 'high', 'status' => 'open'],
            ['title' => 'Contrôle périodique extincteurs', 'description' => 'Vérification annuelle par le prestataire', 'priority' => 'medium', 'status' => 'in_progress'],
            ['title' => 'Audit chantier Lycée Mermoz', 'description' => 'Audit sécurité complet phase gros oeuvre', 'priority' => 'high', 'status' => 'completed'],
            ['title' => 'Achat nouveaux EPI', 'description' => 'Commander casques et chaussures pour les nouveaux embauchés', 'priority' => 'medium', 'status' => 'open'],
            ['title' => 'Mise à jour DUER', 'description' => 'Actualiser le Document Unique suite aux nouveaux équipements', 'priority' => 'high', 'status' => 'in_progress'],
            ['title' => 'Réparation clôture dépôt', 'description' => 'Réparer le grillage endommagé zone arrière', 'priority' => 'low', 'status' => 'open'],
            ['title' => 'Causerie sécurité : Risque routier', 'description' => 'Préparer support pour la prochaine causerie', 'priority' => 'medium', 'status' => 'completed'],
            ['title' => 'Maintenance pont élévateur', 'description' => 'Maintenance préventive atelier mécanique', 'priority' => 'medium', 'status' => 'open'],
        ];

        $actionTypes = \App\Models\ActionType::all();

        foreach ($actions as $actData) {
            Action::factory()->create([
                'title' => $actData['title'],
                'description' => $actData['description'],
                'priority' => $actData['priority'],
                'status' => $actData['status'],
                'action_type_id' => $actionTypes->isNotEmpty() ? $actionTypes->random()->id : null,
                'created_by' => $users->random()->id,
                'assigned_to' => $users->random()->id,
                'due_date' => now()->addDays(rand(1, 60)),
            ]);
        }
    }
}