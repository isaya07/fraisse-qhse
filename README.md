# QHSE Manager 🛡️

Application web complète de pilotage QHSE (Qualité, Hygiène, Sécurité, Environnement) avec modules métier complets, gestion documentaire avancée, plans d'action, suivi d'indicateurs et fonctionnalités d'entreprise.

## 🎯 Fonctionnalités

### 📋 Gestion Documentaire

- **Upload et versioning** des documents QHSE avec drag & drop
- **Catégorisation** avancée (procédures, formulaires, consignes, etc.)
- **Workflow de validation** avec approbation multi-niveaux
- **Recherche et filtrage** intelligent avec recherche globale
- **Contrôle d'accès** par rôle utilisateur (RBAC)
- **Historique des versions** avec traçabilité complète
- **Gestion des métadonnées** (tags, description, statut)
- **Prévisualisation** des fichiers (PDF, images, texte)

### ✅ Plans d'Action

- **Création d'actions** correctives, préventives et d'amélioration
- **Attribution et suivi** des responsables avec notifications
- **Gestion des échéances** avec détection automatique des retards
- **Workflow d'approbation** personnalisable
- **Système de commentaires** avec discussions threadées
- **Pièces jointes** et liens vers documents
- **Progression visuelle** (0-100%) avec indicateurs colorés
- **Reporting** et tableaux de bord avec statistiques

### 📊 Indicateurs & KPI

- **Configuration d'indicateurs** personnalisés avec cibles et seuils
- **Saisie périodique** des données avec validation automatique
- **Tableaux de bord** interactifs avec Chart.js (lignes, barres, gauges)
- **Alertes automatiques** sur dépassement de seuils
- **Calculs de tendances** et moyennes glissantes
- **Exports** CSV/Excel et rapports automatiques
- **Gestion des catégories** avec codes couleur

### 🔍 Recherche Globale

- **Recherche unifiée** dans tous les modules
- **Recherche en temps réel** avec autocomplete
- **Filtres avancés** par type, date, statut
- **Historique des recherches** sauvegardé localement
- **Raccourci clavier** (Ctrl+K) pour accès rapide
- **Highlighting** des termes recherchés

### 📈 Rapports Personnalisés

- **Générateur de rapports** avec interface drag & drop
- **Formats multiples** : CSV, JSON, PDF, Excel
- **Système de templates** réutilisables
- **Filtres avancés** par période et critères
- **Sauvegarde** et gestion des modèles
- **Export sécurisé** avec téléchargement

### 🔔 Notifications Temps Réel

- **Système de notifications** avec polling automatique
- **Types multiples** : info, warning, error, success
- **Centre de notifications** dans le header
- **Marquage lu/non lu** et gestion en lot
- **Compteur temps réel** des notifications non lues

### 👥 Administration Utilisateurs

- **Gestion complète** du cycle de vie des utilisateurs
- **Import/Export** CSV/Excel avec validation
- **Recherche avancée** et filtres multiples
- **Statistiques en temps réel** et dashboard
- **Gestion des rôles** (Admin, Manager, User, Viewer)

### 🔧 Modules Spécialisés

#### 🛡️ Sécurité BTP

- **Suivi des habilitations électriques** avec conformité réglementaire
- **Gestion des EPI** (Équipements de Protection Individuelle)
- **Déclaration et analyse** des incidents de sécurité
- **Contrôles périodiques** et formations obligatoires

#### 📋 Inspections & Audits

- **Génération automatique** de checklists personnalisables
- **Système de scoring** intelligent avec seuils configurables
- **Planification d'audits** avec calcul de compliance score
- **Suivi des non-conformités** et actions correctives

#### ⚗️ Substances Dangereuses

- **Gestion d'inventaire** avec seuils d'alerte
- **Conformité ICPE** et déclarations réglementaires
- **Classification Seveso** automatique
- **Suivi des contrôles** périodiques

#### 🏭 Équipements

- **Suivi de maintenance** préventive et curative
- **Évaluation des conditions** avec facteurs multiples
- **Planification automatique** des interventions
- **Historique complet** des opérations

#### 📚 Formations & Habilitations

- **Gestion des sessions** de formation
- **Suivi des habilitations** par poste et personne
- **Conformité réglementaire** et échéances
- **Certificats et attestations** numériques

#### 📅 Planification

- **Calendrier intégré** avec vues multiples (mois, semaine, jour)
- **Gantt interactif** pour les projets complexes
- **Gestion des ressources** et conflits
- **Notifications** d'échéances et rappels

#### 📊 Tableaux de Bord

- **Dashboards personnalisables** par rôle
- **KPI en temps réel** avec calculs automatiques
- **Graphiques interactifs** et exports
- **Alertes configurables** et seuils

### 👥 Gestion des Utilisateurs

- **Authentification sécurisée** avec JWT
- **Gestion des rôles** (Admin, Manager, User, Viewer)
- **Logs d'activité** et traçabilité
- **Sessions** et sécurité avancée

## 🏗️ Architecture Technique

### Structure du projet

```
base_dir/
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ui/           # Composants d'interface réutilisables
│   │   │   ├── layout/       # Composants de mise en page
│   │   │   ├── documents/    # Composants spécifiques aux documents
│   │   │   ├── actions/      # Composants spécifiques aux actions
│   │   │   └── indicators/   # Composants spécifiques aux indicateurs
│   │   ├── pages/            # Composants de pages spécifiques
│   │   ├── layout/           # Layouts applicatifs
│   │   ├── stores/           # Stores Pinia
│   │   ├── composables/      # Logique réutilisable
│   │   ├── utils/            # Fonctions utilitaires
│   │   ├── router/
│   │   └── main.ts
│   ├── public/
│   ├── tests/
│   └── config/
└── backend/
    ├── app/
    │   ├── Http/
    │   │   ├── Controllers/  # Contrôleurs API
    │   │   └── Middleware/   # Middlewares d'authentification
    │   ├── Models/           # Modèles Eloquent
    │   └── Providers/        # Providers de service
    ├── config/
    │   ├── app.php          # Configuration principale
    │   ├── database.php     # Configuration de la base de données
    │   └── sanctum.php      # Configuration de l'authentification
    ├── database/
    │   ├── migrations/      # Migrations de base de données
    │   ├── seeders/         # Seeders pour les données de test
    │   └── factories/       # Factories pour les modèles
    ├── routes/
    │   └── api.php          # Routes API
    └── tests/
```

### Frontend

- **[Vue.js 3.5](https://vuejs.org/)** - Framework JavaScript moderne avec Composition API
- **[Vite 7.2](https://vitejs.dev/)** - Build Tool moderne avec HMR
- **[PrimeVue 4.4](https://primevue.org/)** - Suite de composants UI complète
- **[Tailwind CSS 4.1](https://tailwindcss.com/)** - Framework CSS utilitaire
- **[Font Awesome 7](https://fontawesome.com/)** - Icônes vectorielles et CSS
- **[TypeScript 5.9](https://www.typescriptlang.org/)** - Typage statique strict
- **[Pinia 3.0](https://pinia.vuejs.org/)** - Gestion d'état moderne
- **[Chart.js 4.5](https://www.chartjs.org/)** - Visualisation de données avancée
- **[Vitest 4.0](https://vitest.dev/)** - Framework de test unitaire

### Backend

- **[Laravel 11.x](https://laravel.com/)** - Framework PHP moderne avec gestion des dépendances Composer
- **[PHP 8.2+](https://www.php.net/)** - Langage de programmation serveur
- **[MariaDB 10+](https://mariadb.org/)** - Système de gestion de base de données
- **[Laravel Sanctum](https://laravel.com/docs/11.x/sanctum)** - Authentification API sécurisée

### Sécurité & Authentification

- **[JWT](https://jwt.io/)** - Authentification stateless avec gestion des sessions
- **Protection CSRF** native et sécurisation complète des API
- **Audit trails** complets avec logs d'activité
- **Gestion des sessions** en base de données

### Qualité & Tests

- **Suite de tests** complète avec scripts automatisés
- **Tests unitaires** avec PHPUnit pour le backend et Vitest pour le frontend
- **Factories et Seeders** pour les données de test
- **API Health Check** (`/up`) pour monitoring

### Documentation

- documentation complète du code backend avec des exemples de code et des explications détaillées
- documentation complète du code frontend avec des exemples de code et des explications détaillées
- génération de la doc avec Typedoc pour le frontend et Swagger pour le backend

## 🚀 Installation & Configuration

Suivez ces étapes pour installer le projet sur votre environnement local.

### Prérequis

- **PHP 8.2+**
- **Composer**
- **Node.js 18+** & **npm**
- **MySQL** ou **MariaDB**

### 1. Installation du Backend (Laravel)

```bash
cd backend

# Installer les dépendances PHP
composer install

# Copier le fichier d'environnement
cp .env.example .env

# Générer la clé d'application
php artisan key:generate

# Configurer la base de données dans .env
# DB_DATABASE=fraisse_qhse
# DB_USERNAME=root
# DB_PASSWORD=

# Exécuter les migrations et les seeders
php artisan migrate --seed

# Lancer le serveur de développement
php artisan serve
```

Le backend sera accessible sur `http://localhost:8000`.

### 2. Installation du Frontend (Vue.js)

```bash
cd frontend

# Installer les dépendances JS
npm install

# Lancer le serveur de développement
npm run dev
```

Le frontend sera accessible sur `http://localhost:5173`.

### ⏰ Planificateur de Tâches (Scheduler)

Pour que les notifications automatiques et les emails quotidiens fonctionnent, vous devez configurer le scheduler Laravel sur votre serveur.

Ajoutez l'entrée suivante à votre crontab :

```bash
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

Cela exécutera les jobs planifiés (vérification des échéances, envoi d'emails) aux moments définis.

## 👤 Comptes de Démonstration

L'application est livrée avec des comptes pré-configurés :

| Rôle               | Email              | Mot de passe | Permissions           |
| ------------------ | ------------------ | ------------ | --------------------- |
| **Administrateur** | admin@qhse.local   | password     | Accès complet         |
| **Manager QHSE**   | manager@qhse.local | password     | Gestion QHSE complète |
| **Utilisateur**    | user1@qhse.local   | password     | Utilisation standard  |
| **Visiteur**       | viewer@qhse.local  | password     | Lecture seule         |

Développé avec ❤️ par Isaya

---

Fraisse*QHSE Manager - Simplifiez votre pilotage QHSE* 🛡️
