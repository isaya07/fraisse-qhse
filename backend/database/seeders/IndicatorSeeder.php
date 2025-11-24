<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Indicator;
use App\Models\User;

class IndicatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $categories = \App\Models\IndicatorCategory::all();

        $indicators = [
            ['name' => 'Taux de fréquence (TF)', 'description' => 'Nombre d\'accidents avec arrêt par million d\'heures travaillées', 'target_value' => 10, 'unit' => 'TF'],
            ['name' => 'Taux de gravité (TG)', 'description' => 'Nombre de jours d\'arrêt par millier d\'heures travaillées', 'target_value' => 0.5, 'unit' => 'TG'],
            ['name' => 'Nombre de causeries sécurité', 'description' => 'Nombre de quarts d\'heure sécurité réalisés par mois', 'target_value' => 4, 'unit' => 'Causeries'],
            ['name' => 'Jours sans accident', 'description' => 'Nombre de jours consécutifs sans accident avec arrêt', 'target_value' => 365, 'unit' => 'Jours'],
            ['name' => 'Consommation carburant', 'description' => 'Consommation moyenne de la flotte de véhicules', 'target_value' => 8, 'unit' => 'L/100km'],
            ['name' => 'Déchets recyclés', 'description' => 'Pourcentage de déchets de chantier valorisés', 'target_value' => 70, 'unit' => '%'],
            ['name' => 'Visites chantier', 'description' => 'Nombre de visites sécurité réalisées par la direction', 'target_value' => 2, 'unit' => 'Visites/mois'],
            ['name' => 'Formation sécurité', 'description' => 'Heures de formation sécurité dispensées', 'target_value' => 100, 'unit' => 'Heures'],
        ];

        foreach ($indicators as $indData) {
            Indicator::factory()->create([
                'name' => $indData['name'],
                'description' => $indData['description'],
                'target_value' => $indData['target_value'],
                'unit' => $indData['unit'],
                'created_by' => $users->random()->id,
                'indicator_category_id' => $categories->isNotEmpty() ? $categories->random()->id : null,
            ]);
        }
    }
}