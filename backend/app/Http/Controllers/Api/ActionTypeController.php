<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ActionType;
use Illuminate\Http\Request;

class ActionTypeController extends Controller
{
    public function index()
    {
        $types = ActionType::all();
        return response()->json([
            'success' => true,
            'data' => $types
        ]);
    }
}
