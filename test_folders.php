<?php

use App\Models\DocumentFolder;

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$folders = DocumentFolder::with('childrenRecursive')->whereNull('parent_id')->get();

echo json_encode($folders, JSON_PRETTY_PRINT);
