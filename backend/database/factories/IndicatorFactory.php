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
            'name' => $this->faker->sentence(3),
            'code' => $this->faker->unique()->lexify('IND-?????'),
            'indicator_category_id' => null, // Will be set via relationship
            'unit' => $this->faker->randomElement(['%', 'hours', 'incidents', 'score']),
            'target_value' => $this->faker->randomFloat(2, 80, 100),
            'threshold_min' => $this->faker->randomFloat(2, 70, 80),
            'threshold_max' => $this->faker->randomFloat(2, 90, 100),
            'calculation_method' => $this->faker->optional()->randomElement(['average', 'sum', 'ratio']),
            'data_source' => $this->faker->optional()->word(),
            'frequency' => $this->faker->randomElement(['daily', 'weekly', 'monthly', 'quarterly', 'yearly']),
            'trend_direction' => $this->faker->randomElement(['positive', 'negative', 'neutral']),
            'created_by' => null, // Will be set via relationship
            'is_active' => fake()->boolean(),
        ];
    }
}
