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

        try {
            // Put application in potential maintenance mode or just run commands
            // We'll run typical deployment commands
            $output = [];

            // 1. Storage Link
            Artisan::call('storage:link');
            $output[] = 'Storage Linked: ' . Artisan::output();

            // 2. Clear Caches
            Artisan::call('optimize:clear');
            $output[] = 'Cache Cleared: ' . Artisan::output();

            // 3. Migrate Database
            Artisan::call('migrate', ['--force' => true]);
            $output[] = 'Migrations: ' . Artisan::output();

            // 4. Re-cache Config & Routes for production performance
            Artisan::call('config:cache');
            $output[] = 'Config Cached: ' . Artisan::output();

            Artisan::call('route:cache');
            $output[] = 'Routes Cached: ' . Artisan::output();

            Artisan::call('view:cache');
            $output[] = 'Views Cached: ' . Artisan::output();

            Log::info('Web Deployment successful from IP: ' . $request->ip());

            return response()->json([
                'status' => 'success',
                'message' => 'Deployment commands executed successfully.',
                'output' => $output
            ]);

        } catch (\Exception $e) {
            Log::error('Web Deployment failed: ' . $e->getMessage());

            return response()->json([
                'status' => 'error',
                'message' => 'Deployment failed: ' . $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }
}
