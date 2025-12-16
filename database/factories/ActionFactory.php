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
            'title' => $this->faker->sentence(4),
            'action_type_id' => null, // Will be set via relationship
            'priority' => $this->faker->randomElement(['low', 'medium', 'high', 'critical']),
            'status' => $this->faker->randomElement(['open', 'in_progress', 'completed', 'cancelled']),
            'assigned_to' => null, // Will be set via relationship
            'created_by' => null, // Will be set via relationship
            'due_date' => $this->faker->optional()->date(),
            'completed_date' => $this->faker->optional()->date(),
            'progress' => $this->faker->numberBetween(0, 100),
            'related_to' => $this->faker->optional()->randomElement(['document', 'indicator']),
            'related_id' => $this->faker->optional()->randomNumber(),
        ];
    }
}
