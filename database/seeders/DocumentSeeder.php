<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Document;
use App\Models\User;

class DocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $folders = \App\Models\DocumentFolder::all();

        $documents = [
            // RH
            ['title' => 'Livret d\'accueil 2024', 'category' => 'other', 'folder' => 'Livrets d\'accueil'],
            ['title' => 'Modèle Contrat CDI', 'category' => 'form', 'folder' => 'Contrats'],
            ['title' => 'Demande de congés', 'category' => 'form', 'folder' => 'Ressources Humaines'],
            
            // Sécurité
            ['title' => 'Procédure Travail en Hauteur', 'category' => 'procedure', 'folder' => 'Procédures'],
            ['title' => 'Procédure Espace Confiné', 'category' => 'procedure', 'folder' => 'Procédures'],
            ['title' => 'Consigne Utilisation Harnais', 'category' => 'consigne', 'folder' => 'Procédures'],
            ['title' => 'Causerie - Port des EPI', 'category' => 'form', 'folder' => 'Causeries'],
            ['title' => 'PPSPS - Chantier Lycée', 'category' => 'other', 'folder' => 'PPSPS'],
            ['title' => 'FDS - Ciment Prompt', 'category' => 'other', 'folder' => 'Fiches de données de sécurité'],

            // Qualité
            ['title' => 'Certificat ISO 9001', 'category' => 'other', 'folder' => 'Certifications ISO'],
            ['title' => 'Fiche de non-conformité', 'category' => 'form', 'folder' => 'Non-conformités'],

            // Chantiers
            ['title' => 'Plans d\'exécution - Lycée', 'category' => 'other', 'folder' => 'Chantier A - Lycée Mermoz'],
            ['title' => 'Planning prévisionnel - Pont', 'category' => 'other', 'folder' => 'Chantier B - Pont de la Rivière'],
            ['title' => 'DICT - Route Nationale', 'category' => 'form', 'folder' => 'Chantier C - Route Nationale 7'],

            // Matériel
            ['title' => 'Fiche de vie - Pelle 12T', 'category' => 'form', 'folder' => 'Engins de chantier'],
            ['title' => 'Contrôle technique - Fourgon AB-123-CD', 'category' => 'other', 'folder' => 'Véhicules'],
        ];

        foreach ($documents as $docData) {
            $folder = $folders->firstWhere('name', $docData['folder']);
            
            Document::factory()->create([
                'title' => $docData['title'],
                'category' => $docData['category'],
                'document_folder_id' => $folder ? $folder->id : null,
                'created_by' => $users->random()->id,
                'approved_by' => $users->random()->id,
                'status' => 'approved',
                'version' => '1.0',
            ]);
        }
    }
}