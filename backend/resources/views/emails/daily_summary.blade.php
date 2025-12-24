<!DOCTYPE html>
<html>

<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background-color: #f8f9fa;
            padding: 15px;
            border-bottom: 2px solid #e9ecef;
        }

        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #2c3e50;
        }

        .content {
            padding: 20px 0;
        }

        .notification-item {
            padding: 10px;
            border-bottom: 1px solid #eee;
        }

        .notification-type {
            font-weight: bold;
            font-size: 0.9em;
            text-transform: uppercase;
            margin-bottom: 4px;
        }

        .notification-message {
            color: #555;
        }

        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #999;
            text-align: center;
        }

        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #3B82F6;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }

        .type-action {
            color: #F59E0B;
        }

        .type-equipment {
            color: #06B6D4;
        }

        .type-document {
            color: #10B981;
        }

        .type-training {
            color: #8B5CF6;
        }

        .type-visit {
            color: #EF4444;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <div class="logo">Fraisse QHSE</div>
        </div>

        <div class="content">
            <h2>Bonjour {{ $user->first_name }},</h2>

            <p>Voici votre récapitulatif quotidien des alertes QHSE :</p>

            @foreach($notifications as $notification)
                <div class="notification-item">
                    <div class="notification-type type-{{ $notification->type }}">
                        {{ $notification->type }}
                    </div>
                    <div class="notification-message">
                        {{ $notification->message }}
                    </div>
                </div>
            @endforeach

            <div style="text-align: center;">
                <a href="{{ config('app.frontend_url') }}/notifications" class="btn">
                    Voir toutes mes notifications
                </a>
            </div>
        </div>

        <div class="footer">
            <p>Cet email est envoyé automatiquement par votre plateforme QHSE.</p>
        </div>
    </div>
</body>

</html>