<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ArchiveOldVersions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'documents:archive-versions {--keep=10 : The number of versions to keep active}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Archives old document versions, keeping only the specified number of recent versions.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $keep = (int) $this->option('keep');
        $this->info("Keeping last {$keep} versions per document...");

        // Récupérer tous les documents qui ont plus de $keep versions
        $documents = \App\Models\Document::whereHas('versions', function ($query) use ($keep) {
            // Count includes archived ones, but we are interested if total versions are excessive
            // Optimisation possible: filter by non-archived count
        }, '>', $keep)->get();

        $count = 0;

        foreach ($documents as $document) {
            // Récupérer les versions actives triées par date décroissante
            // On veut skip les $keep premières (les plus récentes) et archiver le reste
            $versionsToArchive = $document->versions()
                ->where('is_archived', false)
                ->orderBy('created_at', 'desc')
                ->skip($keep)
                ->take(PHP_INT_MAX)
                ->get();

            if ($versionsToArchive->isNotEmpty()) {
                foreach ($versionsToArchive as $version) {
                    $version->update([
                        'is_archived' => true,
                        'archived_at' => now(),
                    ]);
                    $count++;
                }
                $this->line("Archived " . $versionsToArchive->count() . " versions for document ID: {$document->id}");
            }
        }

        $this->info("Archiving completed. Total versions archived: {$count}");
    }
}
