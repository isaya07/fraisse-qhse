<?php

namespace App\Console\Commands;

use App\Models\Document;
use App\Models\Notification;
use Carbon\Carbon;
use Illuminate\Console\Command;

class CheckDocumentExpirations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'documents:check-expirations';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check for expiring documents and send notifications';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Checking document expirations...');

        $documents = Document::whereNotNull('expires_date')
            ->where('status', '!=', 'archived')
            ->where('status', '!=', 'rejected') // Don't care about rejected
            ->get();

        $count = 0;

        foreach ($documents as $document) {
            $expires = $document->expires_date; // Cast to Carbon instance expected
            if (!$expires)
                continue;

            $days = now()->diffInDays($expires, false); // negative if past

            // 1. Expired
            if ($days < 0) {
                $this->notify($document, 'document_expired', "Le document '{$document->title}' a expiré le {$expires->format('d/m/Y')}.");
            }
            // 2. 7 Days warning
            elseif ($days <= 7 && $days > 6) { // Loose check for "around 7 days" or exactly 7? Cron turns daily. <= 7 covers it if we prevent duplicates. 
                // Better: if ($days == 7) to trigger once. But if cron is missed?
                // Logic: check duplicate notification for this type/doc in last X days.
                $this->notify($document, 'document_expiring', "Le document '{$document->title}' expire dans {$days} jours (7 jours warning).");
            }
            // 3. 30 Days warning
            elseif ($days <= 30 && $days > 29) {
                $this->notify($document, 'document_expiring', "Le document '{$document->title}' expire dans 30 jours.");
            }
        }

        $this->info("Checked {$documents->count()} documents. notifications sent.");
    }

    protected function notify(Document $document, string $type, string $message)
    {
        // Prevent duplicate spam: Check if distinct notification for this document/type sent recently (e.g. 20 days for 30days alert? 5 days for 7days?)
        // Specifically for 'expired', it might spam daily.
        // Logic: Check if we notified 'expired' EVER? Or maybe in last 30 days.

        $exists = Notification::where('type', $type)
            ->where('related_id', $document->id)
            ->where('user_id', $document->created_by) // Notify creator (and maybe owner if diff)
            ->where('created_at', '>', now()->subDays(2)) // Don't repeat within 2 days (for expirING)
            // For expirED, maybe reminders every week?
            ->exists();

        if ($exists)
            return;

        if ($document->created_by) {
            Notification::create([
                'user_id' => $document->created_by,
                'type' => $type,
                'related_id' => $document->id,
                'message' => $message,
            ]);
        }

        // Also notify Admins/Managers? Optional.
    }
}
