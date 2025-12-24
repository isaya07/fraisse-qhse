<?php

namespace Database\Factories;

use App\Models\TrainingCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Training>
 */
class TrainingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'training_category_id' => TrainingCategory::factory(),
            'title' => fake()->sentence(4),
            'description' => fake()->optional()->paragraph(),
            'duration_hours' => fake()->numberBetween(1, 40),
            'validity_months' => fake()->optional()->numberBetween(12, 60),
            'required_frequency_months' => fake()->optional()->numberBetween(6, 36),
        ];
    }
}
