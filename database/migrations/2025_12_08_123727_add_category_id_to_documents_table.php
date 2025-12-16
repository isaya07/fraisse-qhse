<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('documents', function (Blueprint $table) {
            if (!Schema::hasColumn('documents', 'category_id')) {
                $table->foreignId('category_id')->nullable()->after('version')->constrained('categories')->onDelete('set null');
            }
        });

        // Data Migration Script
        // Create default categories first to ensure we can map existing documents
        $defaultCategories = [
            'procedure' => 'Procédure',
            'form' => 'Formulaire',
            'consigne' => 'Consigne',
            'other' => 'Autre',
        ];

        $categoryIds = [];

        foreach ($defaultCategories as $slug => $name) {
            $id = DB::table('categories')->insertGetId([
                'name' => $name,
                'slug' => $slug,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            $categoryIds[$slug] = $id;
            // Also map potential 'procedure' vs 'Procédure' if stored as text in DB
            $categoryIds[$name] = $id;
        }

        // Migrate existing documents
        $documents = DB::table('documents')->get();
        foreach ($documents as $doc) {
            if ($doc->category) {
                // Try to find matching category by slug or name
                // The current app stores 'procedure', 'form' etc (from what we saw in DocumentForm.vue)
                // But let's handle case insensitive comparison
                $currentCat = strtolower($doc->category);
                $catId = null;

                if (isset($categoryIds[$currentCat])) {
                    $catId = $categoryIds[$currentCat];
                } else {
                    // Create new category if not exists? Or default to 'other'?
                    // Let's create it to be safe
                    $newSlug = Str::slug($doc->category);
                    $catId = DB::table('categories')->insertGetId([
                        'name' => $doc->category,
                        'slug' => $newSlug,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                    $categoryIds[$currentCat] = $catId; // Cache it
                }

                DB::table('documents')->where('id', $doc->id)->update(['category_id' => $catId]);
            }
        }

        // Drop the old column after migration?
        // Let's keep it nullable for now in case of rollback issues, but plan says "drop category string"
        // To be safe, we will drop it in a separate step or just ignore it.
        // Let's drop it to force usage of new column
        Schema::table('documents', function (Blueprint $table) {
            if (Schema::hasColumn('documents', 'category')) {
                $table->dropColumn('category');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('documents', function (Blueprint $table) {
            $table->string('category', 100)->nullable()->after('version');
        });

        // Restore data (Reverse migration)
        $documents = DB::table('documents')->get();
        foreach ($documents as $doc) {
            if ($doc->category_id) {
                $category = DB::table('categories')->find($doc->category_id);
                if ($category) {
                    DB::table('documents')->where('id', $doc->id)->update(['category' => $category->slug]); // or name? Previous was likely slug-like
                }
            }
        }

        Schema::table('documents', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->dropColumn('category_id');
        });
    }
};
