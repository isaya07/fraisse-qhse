<?php

namespace Database\Seeders;

use App\Models\IndicatorCategory;
use Illuminate\Database\Seeder;

class IndicatorCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Sécurité',
                'description' => 'Indicateurs de sécurité au travail',
                'icon' => 'shield-halved',
                'color' => '#EF4444',
            ],
            [
                'name' => 'Qualité',
                'description' => 'Indicateurs de qualité des produits/services',
                'icon' => 'star',
                'color' => '#3B82F6',
            ],
            [
                'name' => 'Environnement',
                'description' => 'Indicateurs environnementaux',
                'icon' => 'globe',
                'color' => '#10B981',
            ],
            [
                'name' => 'Santé',
                'description' => 'Indicateurs de santé au travail',
                'icon' => 'heart',
                'color' => '#EC4899',
            ],
            [
                'name' => 'Formation',
                'description' => 'Indicateurs de formation du personnel',
                'icon' => 'graduation-cap',
                'color' => '#06B6D4',
            ],
            [
                'name' => 'Audit',
                'description' => 'Indicateurs d\'audit et conformité',
                'icon' => 'clipboard-check',
                'color' => '#8B5CF6',
            ],
            [
                'name' => 'Coûts',
                'description' => 'Indicateurs économiques QHSE',
                'icon' => 'euro-sign',
                'color' => '#F59E0B',
            ],
            [
                'name' => 'Performance',
                'description' => 'Indicateurs de performance globale',
                'icon' => 'chart-simple',
                'color' => '#64748B',
            ],
        ];

        foreach ($categories as $category) {
            IndicatorCategory::create($category);
        }
    }
}
