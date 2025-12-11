<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ActionType;

class ActionTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            [
                'name' => 'Corrective',
                'description' => 'Action visant à éliminer la cause d\'une non-conformité détectée.',
                'color' => '#EF4444', // Red
                'icon' => 'wrench',
            ],
            [
                'name' => 'Préventive',
                'description' => 'Action visant à éliminer la cause d\'une non-conformité potentielle.',
                'color' => '#F59E0B', // Amber
                'icon' => 'shield-alt',
            ],
            [
                'name' => 'Amélioration',
                'description' => 'Action visant à améliorer la performance.',
                'color' => '#10B981', // Emerald
                'icon' => 'arrow-up',
            ],
            [
                'name' => 'Curative',
                'description' => 'Action immédiate pour traiter le symptôme d\'un problème.',
                'color' => '#8B5CF6', // Purple
                'icon' => 'band-aid',
            ],
            [
                'name' => 'Audit',
                'description' => 'Action issue d\'un audit interne ou externe.',
                'color' => '#3B82F6', // Blue
                'icon' => 'clipboard-check',
            ],
            [
                'name' => 'Sécurité',
                'description' => 'Action liée à la sécurité des personnes ou des biens.',
                'color' => '#EAB308', // Yellow
                'icon' => 'hard-hat',
            ],
            [
                'name' => 'Stratégique',
                'description' => 'Action décidée en revue de direction ou liée aux objectifs stratégiques.',
                'color' => '#1F2937', // Gray
                'icon' => 'gavel',
            ],
            [
                'name' => 'Formation',
                'description' => 'Action de formation ou de sensibilisation.',
                'color' => '#EC4899', // Pink
                'icon' => 'graduation-cap',
            ],
        ];

        foreach ($types as $type) {
            ActionType::firstOrCreate(['name' => $type['name']], $type);
        }
    }
}
