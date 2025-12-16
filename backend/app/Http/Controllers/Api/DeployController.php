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

        // Increase execution time limit for individual steps
        set_time_limit(120);

        // Check if a specific step is requested
        if ($request->has('step')) {
            return $this->runStep($request->input('step'));
        }

        // Otherwise, render the client-side runner
        return $this->renderRunner($key);
    }

    private function runStep($step)
    {
        try {
            $output = '';

            // Special handling for migration chunking
            if ($step === 'migrate') {
                return $this->runMigrationChunk();
            }

            switch ($step) {
                case 'storage':
                    try {
                        Artisan::call('storage:link');
                        $output = Artisan::output();
                    } catch (\Exception $e) {
                        $output = "Storage link already exists or error: " . $e->getMessage();
                    }
                    break;
                case 'optimize':
                    Artisan::call('optimize:clear');
                    $output = Artisan::output();
                    break;
                case 'cache':
                    Artisan::call('config:cache');
                    $output .= Artisan::output();
                    Artisan::call('route:cache');
                    $output .= Artisan::output();
                    Artisan::call('view:cache');
                    $output .= Artisan::output();
                    break;
                default:
                    return response()->json(['status' => 'error', 'message' => 'Unknown step'], 400);
            }

            return response()->json([
                'status' => 'success',
                'message' => "Step '$step' completed.",
                'output' => strip_tags($output)
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }

    private function runMigrationChunk()
    {
        $migrator = app('migrator');

        // Ensure connection/repository exists
        if (!$migrator->repositoryExists()) {
            $migrator->getRepository()->createRepository();
        }

        // Get all files and ran migrations
        // Fix: getPaths() is not always available/public. Use explicit default path.
        $files = $migrator->getMigrationFiles([database_path('migrations')]);
        $ran = $migrator->getRepository()->getRan();

        // Calculate pending
        $pending = array_diff(array_keys($files), $ran);
        $totalPending = count($pending);

        if ($totalPending === 0) {
            return response()->json([
                'status' => 'success',
                'message' => 'Toutes les migrations sont déjà appliquées.',
                'output' => 'Nothing to migrate.',
                'remaining' => 0
            ]);
        }

        // Chunking: Logic to run only first 2
        // Taking a small number to avoid timeout
        $chunkSize = 3;
        $toRun = array_slice($pending, 0, $chunkSize);

        $outputBuffer = [];

        foreach ($toRun as $migrationName) {
            $file = $files[$migrationName];
            try {
                // Manually calling Artisan migrate path is simpler than using Migrator directly 
                // because Migrator requires "resolving" the file etc.
                // But 'migrate --path' requires relative path.

                // Construct relative path: database/migrations/filename.php
                // Be careful about absolute paths returned by getMigrationFiles

                // Let's assume standard structure: basename of file is the key? No, key is migration name.
                // Value is full path.

                $fullPath = $files[$migrationName];
                // Convert to relative path for Artisan
                $relativePath = str_replace(base_path() . '/', '', $fullPath);

                Artisan::call('migrate', [
                    '--path' => $relativePath,
                    '--force' => true
                ]);

                $outputBuffer[] = "Migrated: $migrationName";

            } catch (\Exception $e) {
                // If one fails, stop and return error
                return response()->json([
                    'status' => 'error',
                    'message' => "Error on $migrationName: " . $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ], 500);
            }
        }

        $remaining = $totalPending - count($toRun);

        return response()->json([
            'status' => 'success',
            'message' => "Exécuté " . count($toRun) . " migration(s). Reste : $remaining",
            'output' => implode("\n", $outputBuffer),
            'remaining' => $remaining
        ]);
    }

    private function renderRunner($key)
    {
        $url = url("/api/deploy/{$key}");

        $html = <<<HTML
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deployment Runner</title>
    <style>
        body { font-family: monospace; padding: 20px; background: #f4f4f4; color: #333; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { margin-top: 0; color: #2c3e50; }
        .log-window { background: #1e1e1e; color: #00ff00; padding: 15px; border-radius: 5px; height: 400px; overflow-y: auto; white-space: pre-wrap; margin-bottom: 20px; border: 1px solid #333; }
        .btn { padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; font-weight: bold; }
        .btn:disabled { background: #95a5a6; cursor: not-allowed; }
        .btn:hover:not(:disabled) { background: #2980b9; }
        .status { margin-top: 10px; font-weight: bold; }
        .error { color: #ff5555; }
        .success { color: #50fa7b; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Déploiement par Étapes (Chunked)</h1>
        <div id="log" class="log-window">Prêt à déployer...</div>
        <button id="startBtn" class="btn" onclick="startDeploy()">Lancer le Déploiement</button>
        <div id="status" class="status"></div>
    </div>

    <script>
        const baseUrl = "$url";
        const steps = [
            { id: 'migrate', label: 'Migration de la base de données' },
            { id: 'storage', label: 'Lien symbolique Storage' },
            { id: 'optimize', label: 'Nettoyage (Optimize:clear)' },
            { id: 'cache', label: 'Mise en cache (Config/Route/View)' }
        ];

        function log(message, type = 'info') {
            const logDiv = document.getElementById('log');
            const timestamp = new Date().toLocaleTimeString();
            let color = type === 'error' ? '#ff5555' : (type === 'success' ? '#50fa7b' : '#00ff00');
            logDiv.innerHTML += `<div style="color:\${color}">[\${timestamp}] \${message}</div>`;
            logDiv.scrollTop = logDiv.scrollHeight;
        }

        async function startDeploy() {
            const btn = document.getElementById('startBtn');
            btn.disabled = true;
            btn.innerText = 'Déploiement en cours...';
            document.getElementById('log').innerHTML = ''; 
            
            log('Démarrage du processus...', 'info');

            for (const step of steps) {
                log(`Exécution de : \${step.label}...`, 'info');
                
                let done = false;
                
                while (!done) {
                    try {
                        const response = await fetch(`\${baseUrl}?step=\${step.id}`);
                        const data = await response.json();
    
                        if (data.status === 'success') {
                            log(`> \${data.output}`, 'success');
                            
                            // Handling Migration Chunking
                            if (step.id === 'migrate' && data.remaining && data.remaining > 0) {
                                log(`... Pause pour éviter le timeout. Reste : \${data.remaining} migrations ...`, 'info');
                                await new Promise(r => setTimeout(r, 1000)); // Pause
                                continue; // Loop again for next chunk
                            }
                            
                            log(`Validation : \${step.label} ✅`, 'success');
                            done = true; // Move to next step
                            
                        } else {
                            throw new Error(data.message || 'Erreur inconnue');
                        }
                    } catch (error) {
                        log(`ERREUR CRITIQUE sur \${step.label} : \${error.message}`, 'error');
                        document.getElementById('status').innerText = 'Déploiement ÉCHOUÉ';
                        document.getElementById('status').style.color = 'red';
                        btn.disabled = false;
                        btn.innerText = 'Réessayer';
                        return; 
                    }
                }
                
                await new Promise(r => setTimeout(r, 500));
            }

            log('🏁 Déploiement terminé avec succès !', 'success');
            document.getElementById('status').innerText = 'Déploiement RÉUSSI';
            document.getElementById('status').style.color = 'green';
            btn.innerText = 'Déploiement Terminé';
        }
    </script>
</body>
</html>
HTML;
        return response($html);
    }
}
