<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Document>
 */
class DocumentFactory extends Factory
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
            'filename' => fake()->word() . '.pdf',
            'filepath' => 'documents/' . fake()->uuid() . '.pdf',
            'file_size' => fake()->randomNumber(6), // e.g., 123456
            'mime_type' => 'application/pdf',
            'version' => fake()->semver(),
            'category' => fake()->optional()->randomElement(['procedure', 'form', 'instruction', 'record']),
            'status' => fake()->randomElement(['draft', 'pending_approval', 'approved', 'rejected', 'archived']),
            'created_by' => null, // Will be set via relationship
            'approved_by' => null, // Will be set via relationship
            'published_date' => fake()->optional()->date(),
            'expires_date' => fake()->optional()->date(),
        ];
    }
}
