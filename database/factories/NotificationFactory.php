<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'type' => fake()->randomElement(['action', 'equipment', 'training', 'document']),
            'related_id' => fake()->numberBetween(1, 100),
            'message' => fake()->sentence(),
            'read_at' => fake()->boolean(50) ? now() : null,
        ];
    }
}
