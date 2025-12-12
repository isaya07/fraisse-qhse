<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\NotificationSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $query = Notification::where('user_id', Auth::id())->orderBy('created_at', 'desc');

        if ($request->has('unread') && $request->unread === 'true') {
            $query->whereNull('read_at');
        }

        return response()->json($query->paginate(20));
    }

    public function unreadCount()
    {
        $count = Notification::where('user_id', Auth::id())->whereNull('read_at')->count();
        return response()->json(['count' => $count]);
    }

    public function markAsRead($id)
    {
        $notification = Notification::where('user_id', Auth::id())->findOrFail($id);
        $notification->update(['read_at' => now()]);
        return response()->json(['message' => 'Notification marked as read']);
    }

    public function markAllAsRead()
    {
        Notification::where('user_id', Auth::id())
            ->whereNull('read_at')
            ->update(['read_at' => now()]);
        return response()->json(['message' => 'All notifications marked as read']);
    }

    public function getSettings()
    {
        $settings = NotificationSetting::firstOrCreate(
            ['user_id' => Auth::id()],
            ['email_enabled' => true, 'email_time' => '08:00:00', 'alert_thresholds' => ['action' => 3, 'equipment' => 7]]
        );
        return response()->json($settings);
    }

    public function updateSettings(Request $request)
    {
        $request->validate([
            'email_enabled' => 'boolean',
            'email_time' => 'required|date_format:H:i:s',
            'alert_thresholds' => 'array',
        ]);

        $settings = NotificationSetting::updateOrCreate(
            ['user_id' => Auth::id()],
            $request->only(['email_enabled', 'email_time', 'alert_thresholds'])
        );

        return response()->json($settings);
    }
}
