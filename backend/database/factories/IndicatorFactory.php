<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Indicator>
 */
class IndicatorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(3),
            'code' => fake()->unique()->lexify('IND-?????'),
            'category' => fake()->optional()->randomElement(['safety', 'quality', 'environment', 'compliance']),
            'unit' => fake()->randomElement(['%', 'hours', 'incidents', 'score']),
            'target_value' => fake()->randomFloat(2, 80, 100),
            'threshold_min' => fake()->randomFloat(2, 70, 80),
            'threshold_max' => fake()->randomFloat(2, 90, 100),
            'calculation_method' => fake()->optional()->randomElement(['average', 'sum', 'ratio']),
            'data_source' => fake()->optional()->word(),
            'frequency' => fake()->randomElement(['daily', 'weekly', 'monthly', 'quarterly', 'yearly']),
            'trend_direction' => fake()->randomElement(['positive', 'negative', 'neutral']),
            'created_by' => null, // Will be set via relationship
            'is_active' => fake()->boolean(),
        ];
    }
}
