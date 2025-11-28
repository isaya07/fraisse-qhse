// config.ts

// Déterminer l'environnement
const isDevelopment = import.meta.env.DEV

// Configuration de l'API selon l'environnement
const API_CONFIG = {
  development: {
    apiUrl: import.meta.env.VITE_API_URL_DEV,
  },
  production: {
    apiUrl: import.meta.env.VITE_API_URL_PROD, // Utilisation d'une URL relative en production pour que le serveur web la gère
  },
}

// Obtenir la configuration en fonction de l'environnement
const currentEnv = isDevelopment ? 'development' : 'production'
console.log(API_CONFIG[currentEnv].apiUrl)
export const config = {
  apiUrl: API_CONFIG[currentEnv].apiUrl,
  isDevelopment,
  isProduction: !isDevelopment,
}
