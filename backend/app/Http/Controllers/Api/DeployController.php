<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;

class DeployController extends Controller
{
    public function deploy(Request $request, $key)
    {
        $deployKey = env('DEPLOY_KEY');

        if (!$deployKey || $key !== $deployKey) {
            abort(403, 'Unauthorized access.');
        }

        // Disable compression and buffering for real-time output
        if (function_exists('apache_setenv')) {
            apache_setenv('no-gzip', 1);
        }
        ini_set('output_buffering', 'off');
        ini_set('zlib.output_compression', false);
        ini_set('implicit_flush', true);
        while (ob_get_level() > 0) {
            ob_end_flush();
        }

        // Increase execution time limit
        set_time_limit(300);

        echo "<!DOCTYPE html><html><body style='background:#f4f4f4; font-family:monospace; padding:20px;'>";
        echo "<h2>🚀 Deployment Log</h2><pre style='background:white; padding:15px; border-radius:5px; border:1px solid #ddd;'>";
        echo "Starting deployment process...\n\n";
        flush();

        try {
            // 1. Migrate Database
            echo "<strong>1. Running Migrations...</strong>\n";
            flush();

            Artisan::call('migrate', ['--force' => true]);
            echo strip_tags(Artisan::output()) . "\n";
            flush();

            // 2. Storage Link
            echo "<strong>2. Linking Storage...</strong>\n";
            flush();

            try {
                Artisan::call('storage:link');
                echo strip_tags(Artisan::output()) . "\n";
            } catch (\Exception $e) {
                echo "Warning: " . $e->getMessage() . "\n";
            }
            flush();

            // 3. Clear Caches
            echo "<strong>3. Clearing Caches...</strong>\n";
            flush();

            Artisan::call('optimize:clear');
            echo strip_tags(Artisan::output()) . "\n";
            flush();

            // 4. Re-cache (Only if not in debug mode essentially, but usually safe to skip on shared host if causing issues)
            echo "<strong>4. Re-caching Config/Routes...</strong>\n";
            flush();

            Artisan::call('config:cache');
            echo "Config Cached.\n";

            Artisan::call('route:cache');
            echo "Routes Cached.\n";

            Artisan::call('view:cache');
            echo "Views Cached.\n";
            flush();

            Log::info('Web Deployment successful from IP: ' . $request->ip());
            echo "\n<span style='color:green; font-weight:bold;'>✅ Deployment Completed Successfully.</span>";

        } catch (\Throwable $e) {
            Log::error('Web Deployment failed: ' . $e->getMessage());

            echo "\n<span style='color:red; font-weight:bold;'>❌ FATAL ERROR:</span>\n";
            echo $e->getMessage() . "\n\n";
            echo "Trace:\n" . $e->getTraceAsString();
        }

        echo "</pre></body></html>";
        exit; // Prevent Laravel from sending additional headers/content
    }
}
