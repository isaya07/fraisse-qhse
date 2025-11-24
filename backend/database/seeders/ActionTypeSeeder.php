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
        ];

        foreach ($types as $type) {
            ActionType::firstOrCreate(['name' => $type['name']], $type);
        }
    }
}
