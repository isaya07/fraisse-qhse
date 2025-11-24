<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Action>
 */
class ActionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'type' => fake()->randomElement(['corrective', 'preventive', 'improvement']),
            'priority' => fake()->randomElement(['low', 'medium', 'high', 'critical']),
            'status' => fake()->randomElement(['open', 'in_progress', 'completed', 'cancelled']),
            'assigned_to' => null, // Will be set via relationship
            'created_by' => null, // Will be set via relationship
            'due_date' => fake()->optional()->date(),
            'completed_date' => fake()->optional()->date(),
            'progress' => fake()->numberBetween(0, 100),
            'related_to' => fake()->optional()->randomElement(['document', 'indicator']),
            'related_id' => fake()->optional()->randomNumber(),
        ];
    }
}
