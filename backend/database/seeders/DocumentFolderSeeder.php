<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\DocumentFolder;

class DocumentFolderSeeder extends Seeder
{
    public function run(): void
    {
        // Ressources Humaines
        $rh = DocumentFolder::create(['name' => 'Ressources Humaines']);
        DocumentFolder::create(['name' => 'Contrats', 'parent_id' => $rh->id]);
        DocumentFolder::create(['name' => 'Fiches de paie', 'parent_id' => $rh->id]);
        DocumentFolder::create(['name' => 'Livrets d\'accueil', 'parent_id' => $rh->id]);
        DocumentFolder::create(['name' => 'Formations', 'parent_id' => $rh->id]);

        // Sécurité (QHSE)
        $securite = DocumentFolder::create(['name' => 'Sécurité']);
        DocumentFolder::create(['name' => 'Procédures', 'parent_id' => $securite->id]);
        DocumentFolder::create(['name' => 'Causeries', 'parent_id' => $securite->id]);
        DocumentFolder::create(['name' => 'Audits', 'parent_id' => $securite->id]);
        DocumentFolder::create(['name' => 'PPSPS', 'parent_id' => $securite->id]);
        DocumentFolder::create(['name' => 'Fiches de données de sécurité', 'parent_id' => $securite->id]);

        // Qualité
        $qualite = DocumentFolder::create(['name' => 'Qualité']);
        DocumentFolder::create(['name' => 'Certifications ISO', 'parent_id' => $qualite->id]);
        DocumentFolder::create(['name' => 'Non-conformités', 'parent_id' => $qualite->id]);
        DocumentFolder::create(['name' => 'Satisfaction client', 'parent_id' => $qualite->id]);

        // Chantiers
        $chantiers = DocumentFolder::create(['name' => 'Chantiers']);
        DocumentFolder::create(['name' => 'Chantier A - Lycée Mermoz', 'parent_id' => $chantiers->id]);
        DocumentFolder::create(['name' => 'Chantier B - Pont de la Rivière', 'parent_id' => $chantiers->id]);
        DocumentFolder::create(['name' => 'Chantier C - Route Nationale 7', 'parent_id' => $chantiers->id]);

        // Matériel
        $materiel = DocumentFolder::create(['name' => 'Matériel']);
        DocumentFolder::create(['name' => 'Véhicules', 'parent_id' => $materiel->id]);
        DocumentFolder::create(['name' => 'Engins de chantier', 'parent_id' => $materiel->id]);
        DocumentFolder::create(['name' => 'Outillage portatif', 'parent_id' => $materiel->id]);
        DocumentFolder::create(['name' => 'EPI', 'parent_id' => $materiel->id]);
    }
}
