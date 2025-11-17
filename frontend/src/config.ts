// config.ts

// Déterminer l'environnement
const isDevelopment = process.env.NODE_ENV === 'development' || import.meta.env.DEV

// Configuration de l'API selon l'environnement
const API_CONFIG = {
  development: {
    apiUrl: 'http://qhse.local/api',
  },
  production: {
    apiUrl: '/api', // Utilisation d'une URL relative en production pour que le serveur web la gère
  },
}

// Obtenir la configuration en fonction de l'environnement
const currentEnv = isDevelopment ? 'development' : 'production'
export const config = {
  apiUrl: API_CONFIG[currentEnv].apiUrl,
  isDevelopment,
  isProduction: !isDevelopment,
}
