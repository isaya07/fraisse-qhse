<?php

namespace Database\Factories;

use App\Models\EquipmentCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Equipment>
 */
class EquipmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => EquipmentCategory::factory(),
            'serial_number' => fake()->unique()->regexify('[A-Z]{2}[0-9]{6}'),
            'internal_ref' => fake()->optional()->regexify('REF-[0-9]{4}'),
            'name' => fake()->words(3, true),
            'brand' => fake()->company(),
            'model' => fake()->bothify('Model-##??'),
            'purchase_date' => fake()->dateTimeBetween('-5 years', 'now'),
            'manufacture_date' => fake()->dateTimeBetween('-6 years', '-1 year'),
            'expiration_date' => fake()->optional()->dateTimeBetween('now', '+5 years'),
            'maintenance_frequency_months' => fake()->numberBetween(1, 12),
            'status' => fake()->randomElement(['available', 'assigned', 'maintenance', 'retired']),
            'location' => fake()->randomElement(['warehouse', 'workshop', 'office', 'vehicle', 'site']),
            'image_path' => null,
        ];
    }
}
