<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Indicator;
use App\Models\IndicatorValue;
use App\Models\User;
use Carbon\Carbon;

class IndicatorValueSeeder extends Seeder
{
    public function run(): void
    {
        $indicators = Indicator::all();
        $users = User::all();

        if ($indicators->isEmpty() || $users->isEmpty()) {
            return;
        }

        foreach ($indicators as $indicator) {
            // Generate data for the last 12 months
            for ($i = 11; $i >= 0; $i--) {
                $date = Carbon::now()->subMonths($i)->startOfMonth();
                
                // Base value is the target value
                $baseValue = $indicator->target_value;
                
                // Add some randomness (+/- 20%)
                $variation = $baseValue * 0.2;
                $randomFactor = (mt_rand(-100, 100) / 100); // -1 to 1
                $value = $baseValue + ($variation * $randomFactor);

                // Ensure value is not negative for most indicators
                if ($value < 0) $value = 0;

                // Specific logic for "Jours sans accident" (cumulative)
                if ($indicator->name === 'Jours sans accident') {
                    // Just increasing days, maybe reset once
                    $value = ($i * 30) + mt_rand(0, 5); 
                    if ($i < 2) $value = mt_rand(0, 10); // Reset recently
                }

                // Round to 2 decimal places
                $value = round($value, 2);

                IndicatorValue::create([
                    'indicator_id' => $indicator->id,
                    'value' => $value,
                    'date' => $date,
                    'comment' => 'Valeur mensuelle générée automatiquement',
                    'created_by' => $users->random()->id,
                    'created_at' => $date,
                    'updated_at' => $date,
                ]);
            }
        }
    }
}
