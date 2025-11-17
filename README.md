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
    ├── src/
    │   ├── Controller/
    │   │   └── Api/          # Contrôleurs API
    │   ├── Model/
    │   │   ├── Entity/       # Entités
    │   │   └── Table/        # Tables
    │   └── Application.php
    ├── config/
    │   └── Migrations/       # Migrations de base de données
    ├── tests/
    └── webroot/
```

### Frontend

- **[Vue.js 3.5](https://vuejs.org/)** - Framework JavaScript moderne avec Composition API
- **[Vite 5.4](https://vitejs.dev/)** - Build Tool moderne avec HMR
- **[Bulma CSS 1.0.4](https://bulma.io/)** - Framework CSS moderne
- **[Font Awesome 7](https://fontawesome.com/)** - Icônes vectorielles et CSS
- **[TypeScript 5.5](https://www.typescriptlang.org/)** - Typage statique strict
- **[Pinia 2.2](https://pinia.vuejs.org/)** - Gestion d'état moderne
- **[Chart.js 4.5.0](https://www.chartjs.org/)** - Visualisation de données avancée
- **[Vitest 2.0](https://vitest.dev/)** - Framework de test unitaire

### Backend

- **[CakePHP 5.0](https://cakephp.org/)** - Framework PHP moderne avec gestion des dépendances Composer
- **[PHP 8.4](https://www.php.net/)** - Langage de programmation serveur
- **[MariaDB 12](https://mariadb.org/)** - Système de gestion de base de données

### Sécurité & Authentification

- **[JWT](https://jwt.io/)** - Authentification stateless avec gestion des sessions
- **Protection CSRF** native et sécurisation complète des API
- **Audit trails** complets avec logs d'activité
- **Gestion des sessions** en base de données

### Qualité & Tests

- **Suite de tests** complète avec scripts automatisés
- **Tests unitaires** avec PHPUnit pour le backend et Vitest pour le frontend
- **API Health Check** (`/api/health`) pour monitoring

### Documentation

- documentation complète du code backend avec des exemples de code et des explications détaillées
- documentation complète du code frontend avec des exemples de code et des explications détaillées
- génération de la doc avec Typedoc pour le frontend et Swagger pour le backend

## 👤 Comptes de Démonstration

L'application est livrée avec des comptes pré-configurés :

| Rôle               | Email              | Mot de passe | Permissions           |
| ------------------ | ------------------ | --------------------- |
| **Administrateur** | admin@qhse.local   | password     | Accès complet         |
| **Manager QHSE**   | manager@qhse.local | password     | Gestion QHSE complète |
| **Utilisateur**    | user1@qhse.local   | password     | Utilisation standard  |
| **Visiteur**       | viewer@qhse.local  | password     | Lecture seule         |

Développé avec ❤️ par Isaya

---

Fraisse_QHSE Manager - Simplifiez votre pilotage QHSE_ 🛡️
