<?php

namespace Database\Factories;

use App\Models\Training;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TrainingSession>
 */
class TrainingSessionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = fake()->dateTimeBetween('now', '+3 months');
        $endDate = (clone $startDate)->modify('+' . fake()->numberBetween(1, 5) . ' days');

        return [
            'training_id' => Training::factory(),
            'training_organization_id' => null,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'location' => fake()->city(),
            'instructor' => fake()->name(),
            'max_participants' => fake()->numberBetween(5, 30),
            'cost' => fake()->optional()->randomFloat(2, 100, 5000),
            'status' => fake()->randomElement(['planned', 'completed', 'cancelled']),
        ];
    }
}
