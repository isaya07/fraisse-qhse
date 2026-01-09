<?php

namespace Database\Factories;

use App\Models\DocumentFolder;
use Illuminate\Database\Eloquent\Factories\Factory;

class DocumentFolderFactory extends Factory
{
    protected $model = DocumentFolder::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'parent_id' => null,
        ];
    }
}
