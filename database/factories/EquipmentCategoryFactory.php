<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EquipmentCategory>
 */
class EquipmentCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement(['Safety Equipment', 'Tools', 'Protective Gear', 'Machinery']),
            'type' => fake()->randomElement(['equipment', 'ppe', 'vehicle']),
            'maintenance_frequency_months' => fake()->numberBetween(1, 12),
            'icon' => fake()->randomElement(['hard-hat', 'wrench', 'shield-alt', 'truck']),
            'color' => fake()->hexColor(),
        ];
    }
}
