<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Str;

class ConsoleController extends Controller
{
    public function index(Request $request, $key)
    {
        // 1. Security Check
        $deployKey = env('DEPLOY_KEY');
        if (!$deployKey || $key !== $deployKey) {
            abort(403, 'Unauthorized access via Admin Console.');
        }

        // 2. Handle Command Execution (POST/AJAX)
        if ($request->isMethod('post')) {
            $command = $request->input('command');

            // Basic blacklist to prevent interactive commands hanging
            $blacklist = ['tinker', 'serve', 'monitor', 'queue:listen', 'schedule:work'];
            foreach ($blacklist as $blocked) {
                // Check if command starts with blocked word
                if (Str::startsWith($command, $blocked)) {
                    return response()->json([
                        'status' => 'error',
                        'output' => "Command '$blocked' is known to hang in non-interactive modes. Blocked for safety."
                    ]);
                }
            }

            try {
                // Capture output is improved by calling Artisan logic
                // Artisan::call() returns exit code. Artisan::output() gets the text.
                $exitCode = Artisan::call($command);
                $output = Artisan::output();

                return response()->json([
                    'status' => 'success',
                    'output' => $output ?: "[Command executed successfully with no output]"
                ]);

            } catch (\Throwable $e) {
                return response()->json([
                    'status' => 'error',
                    'output' => "FATAL ERROR:\n" . $e->getMessage()
                ]);
            }
        }

        // 3. Render Terminal UI (GET)
        return $this->renderConsole($key);
    }

    private function renderConsole($key)
    {
        $url = url("/api/console/{$key}");

        $html = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QHSE Admin Console</title>
    <style>
        body {
            background-color: #0c0c0c;
            color: #ccc;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 14px;
            margin: 0;
            padding: 20px;
            height: 100vh;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
        }
        .console-output {
            flex: 1;
            overflow-y: auto;
            white-space: pre-wrap;
            margin-bottom: 10px;
            padding-bottom: 20px;
        }
        .input-line {
            display: flex;
            align-items: center;
            border-top: 1px solid #333;
            padding-top: 10px;
        }
        .prompt {
            color: #00ff00;
            margin-right: 10px;
            font-weight: bold;
        }
        input {
            background: transparent;
            border: none;
            color: #fff;
            width: 100%;
            font-family: inherit;
            font-size: inherit;
            outline: none;
        }
        .log-entry { margin-bottom: 5px; }
        .log-command { color: #ffff00; font-weight: bold; }
        .log-response { color: #cccccc; }
        .log-error { color: #ff5555; }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #1a1a1a; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="console-output" id="output">
        <div class="log-entry">
            <span class="log-response">Welcome to QHSE Admin Console v1.0</span>
        </div>
        <div class="log-entry">
            <span class="log-response">Security Level: PROTECTED</span>
        </div>
        <div class="log-entry">
            <span class="log-response">Type 'list' to see available commands.</span>
        </div>
        <br>
    </div>
    
    <div class="input-line">
        <span class="prompt">artisan@qhse:~$</span>
        <input type="text" id="commandInput" autofocus autocomplete="off" placeholder="Type artisan command...">
    </div>

    <script>
        const input = document.getElementById('commandInput');
        const output = document.getElementById('output');
        const baseUrl = "$url";

        // History navigation
        let history = [];
        let historyIndex = -1;

        input.addEventListener('keydown', async (e) => {
            if (e.key === 'Enter') {
                const command = input.value.trim();
                if (!command) return;

                // Add to output
                appendToOutput(command, 'command');
                input.value = '';
                
                // Add to history
                history.push(command);
                historyIndex = history.length;

                // Execute
                await executeCommand(command);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    input.value = history[historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex < history.length - 1) {
                    historyIndex++;
                    input.value = history[historyIndex];
                } else {
                    historyIndex = history.length;
                    input.value = '';
                }
            }
        });

        function appendToOutput(text, type) {
            const div = document.createElement('div');
            div.className = 'log-entry';
            
            if (type === 'command') {
                div.innerHTML = `<span class="prompt">➜</span> <span class="log-command">\${text}</span>`;
            } else if (type === 'error') {
                div.className += ' log-error';
                div.textContent = text;
            } else {
                div.className += ' log-response';
                div.textContent = text;
            }

            output.appendChild(div);
            output.scrollTop = output.scrollHeight;
        }

        async function executeCommand(cmd) {
            // Client-side clear
            if (cmd === 'clear' || cmd === 'cls') {
                output.innerHTML = '';
                return;
            }

            try {
                const response = await fetch(baseUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ command: cmd })
                });

                const rawText = await response.text();
                let data;

                try {
                    data = JSON.parse(rawText);
                } catch (e) {
                    // Not JSON (e.g., HTML Error Page, 500, Maintenance Mode)
                    appendToOutput('SERVER ERROR (Non-JSON Response):', 'error');
                    // Remove HTML tags for cleaner display
                    const cleanText = rawText.replace(/<[^>]*>?/gm, '');
                    appendToOutput(cleanText.substring(0, 500) + (cleanText.length > 500 ? '...' : ''), 'error');
                    return;
                }

                if (data.status === 'success') {
                    appendToOutput(data.output, 'response');
                } else {
                    appendToOutput(data.output || 'Unknown Error', 'error');
                }
            } catch (err) {
                appendToOutput('Network/Server Error: ' + err.message, 'error');
            }
        }
    </script>
</body>
</html>
HTML;
        return response($html);
    }
}
