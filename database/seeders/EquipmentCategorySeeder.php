<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EquipmentCategory;

class EquipmentCategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            [
                'name' => 'Outillage Electroportatif',
                'type' => 'equipment',
                'maintenance_frequency_months' => 12,
                'icon' => 'plug',
                'color' => '#3B82F6', // Blue
            ],
            [
                'name' => 'EPI (Casques, Harnais)',
                'type' => 'ppe',
                'maintenance_frequency_months' => 6,
                'icon' => 'hard-hat',
                'color' => '#F59E0B', // Orange
            ],
            [
                'name' => 'Véhicules',
                'type' => 'vehicle',
                'maintenance_frequency_months' => 12,
                'icon' => 'truck',
                'color' => '#10B981', // Green
            ],
            [
                'name' => 'Appareils de Mesure',
                'type' => 'equipment',
                'maintenance_frequency_months' => 12,
                'icon' => 'ruler-combined',
                'color' => '#8B5CF6', // Purple
            ],
            [
                'name' => 'Echelles & Escabeaux',
                'type' => 'equipment',
                'maintenance_frequency_months' => 6,
                'icon' => 'stream',
                'color' => '#EF4444', // Red
            ],
            [
                'name' => 'Informatique',
                'type' => 'equipment',
                'maintenance_frequency_months' => null,
                'icon' => 'laptop',
                'color' => '#64748B', // Slate
            ],
        ];

        foreach ($categories as $category) {
            EquipmentCategory::create($category);
        }
    }
}
