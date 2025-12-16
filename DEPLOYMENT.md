# 🚀 Guide de Déploiement HelioHost (No-SSH)

Ce guide détaille la procédure **automatisée et sans SSH** pour déployer l'application Fraisse QHSE sur l'hébergement mutualisé HelioHost (Johnny).

---

## 🏗️ Architecture de Déploiement

Pour contourner les limitations du serveur (pas de composer, pas de npm, timeout strict, pas de SSH), nous utilisons la stratégie suivante :

1.  **GitHub Actions** : Construit le Frontend (Vite) et installe les dépendances PHP (Vendor) sur une machine virtuelle.
2.  **Branche `deploy`** : Le résultat (code + vendor + build) est poussé sur cette branche orpheline.
3.  **cPanel Git-Push** : Le serveur récupère cette branche "prête à l'emploi".
4.  **Web Runners** : Les commandes techniques (migrations, cache) sont lancées via une interface web sécurisée.

---

## ✅ Prérequis sur le Serveur (Une seule fois)

1.  **Créer la Base de Données**

    - Via cPanel > MySQL Database Wizard.
    - Noter le nom de la base, utilisateur et mot de passe.

2.  **Configurer la Clé de Déploiement (`DEPLOY_KEY`)**

    - Créer/Éditer le fichier `.env` à la racine de l'application sur le serveur.
    - Ajouter une clé secrète complexe :
      ```ini
      DEPLOY_KEY=votre_cle_super_secrete_que_vous_inventez_12345
      ```

3.  **Problème de Cache Config (Erreur 403)**
    - Si vous changez le `.env` et que rien ne se passe, supprimez ce fichier via File Manager :
      `backend/bootstrap/cache/config.php`

---

## 🔄 Comment Déployer une Mise à Jour

### 1. Côté GitHub (Automatique)

Il suffit de pousser votre code sur la branche `main`.
L'action `.github/workflows/heliohost-deploy.yml` va automatiquement :

1.  Compiler le Frontend VueJS.
2.  Installer les dépendances PHP (Composer).
3.  Injecter le tout sur la branche `deploy`.

### 2. Côté Serveur (cPanel)

1.  Allez dans **Git Version Control**.
2.  En face de votre dépôt, cliquez sur **Manage**.
3.  Sélectionnez la branche **`deploy`** (si ce n'est pas déjà fait).
4.  Cliquez sur **Update from Remote** (Pull).
    - _Le code sur le serveur est maintenant à jour._

### 3. Finalisation (Web Runner)

Pour lancer les migrations de base de données sans accès SSH :

1.  Ouvrez votre navigateur.
2.  Accédez à l'URL suivante (remplacez par votre clé) :
    `https://votre-site.com/api/deploy/VOTRE_CLE_SECRETE`
3.  Une interface s'ouvre. Cliquez sur **"Lancer le Déploiement"**.
    - Le script va exécuter les migrations par petits paquets (pour éviter les timeouts).
    - Il va vider les caches.
    - Il va (optionnellement) lancer le Seeding.

---

## 🛠️ Console d'Administration Cachée

Pour la maintenance quotidienne (debug, vérification), vous avez accès à un terminal web.

- **URL** : `https://votre-site.com/api/console/VOTRE_CLE_SECRETE`
- **Fonction** : Permet de taper des commandes Artisan comme si vous étiez en SSH.

**Commandes Utiles :**

- `route:list` : Voir toutes les routes API.
- `migrate:status` : Vérifier l'état de la base de données.
- `db:seed --force` : Relancer les données de test (Attention aux doublons !).
- `down` : Mettre le site en maintenance.
- `up` : Remettre le site en ligne.
- `optimize:clear` : Vider tous les caches (Vue, Config, Routes).

---

## 🚨 Dépannage Courant

| Erreur                                | Cause Probable                               | Solution                                                                |
| :------------------------------------ | :------------------------------------------- | :---------------------------------------------------------------------- |
| **Erreur 500** au chargement du site  | Permissions fichiers ou .env incorrect.      | Vérifier logs dans `storage/logs/laravel.log`. Vérifier `.env`.         |
| **Erreur 403 (Interdit)** sur /deploy | Clé `DEPLOY_KEY` incorrecte ou cache bloqué. | Vérifier clé dans URL. Supprimer `bootstrap/cache/config.php`.          |
| **Timeout / Chargement infini**       | Le serveur a coupé le script (50s max).      | Utiliser le Web Runner qui découpe les tâches.                          |
| **"Table already exists"**            | Migration lancée deux fois.                  | Mes migrations sont "patchées", relancez-les via le Runner, ça passera. |
| **"Class 'Faker' not found"**         | Dépendance manquante en prod.                | Déjà réglé dans le dernier commit (déplacé dans require). Redéployer.   |

---

## 📂 Structure du fichier .env (Production)

Assurez-vous que votre fichier `.env` sur le serveur ressemble à ceci :

```ini
APP_NAME="Fraisse QHSE"
APP_ENV=production
APP_KEY=base64:.... (généré)
APP_DEBUG=false
APP_URL=https://votre-site.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=votre_user_bdd
DB_USERNAME=votre_user
DB_PASSWORD=votre_pass

BROADCAST_DRIVER=log
CACHE_DRIVER=file    <-- Important pour le mutualisé
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync <-- Important (pas de worker en fond)
SESSION_DRIVER=file
SESSION_LIFETIME=120

DEPLOY_KEY=votre_cle_secrete_123456
```
