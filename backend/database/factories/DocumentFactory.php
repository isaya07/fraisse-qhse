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
            'title' => $this->faker->sentence(4),
            'filename' => $this->faker->word() . '.pdf',
            'filepath' => 'documents/' . $this->faker->uuid() . '.pdf',
            'file_size' => $this->faker->randomNumber(6), // e.g., 123456
            'mime_type' => 'application/pdf',
            'version' => $this->faker->semver(),
            'category_id' => $this->faker->numberBetween(1, 4), // Assuming default categories are seeded 1-4
            'status' => $this->faker->randomElement(['draft', 'pending_approval', 'approved', 'rejected', 'archived']),
            'created_by' => null, // Will be set via relationship
            'approved_by' => null, // Will be set via relationship
            'published_date' => $this->faker->optional()->date(),
            'expires_date' => $this->faker->optional()->date(),
        ];
    }
}
