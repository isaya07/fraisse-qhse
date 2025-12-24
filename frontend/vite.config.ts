import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
    tailwindcss(),
    Components({
      resolvers: [PrimeVueResolver()],
    }),
    visualizer({
      filename: './dist/stats.html', // Fichier de sortie
      open: true, // Ouvre automatiquement dans le navigateur
      gzipSize: true, // Affiche la taille gzippée
      brotliSize: true, // Affiche la taille brotli
      template: 'treemap', // Type de visualisation (treemap, sunburst, network)
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor chunks (librairies externes)
          if (id.includes('node_modules')) {
            // Vue core
            if (id.includes('vue') && !id.includes('primevue')) {
              return 'vendor-vue'
            }
            // PrimeVue
            if (id.includes('primevue') || id.includes('@primevue')) {
              return 'vendor-primevue'
            }
            // Chart.js
            if (id.includes('chart.js')) {
              return 'vendor-chart'
            }
            // FontAwesome
            if (id.includes('@fortawesome')) {
              return 'vendor-icons'
            }
            // Vue Router
            if (id.includes('vue-router')) {
              return 'vendor-router'
            }
            // Pinia
            if (id.includes('pinia')) {
              return 'vendor-pinia'
            }
            // Date utilities
            if (id.includes('date-fns')) {
              return 'vendor-utils'
            }
            // Autres dépendances
            return 'vendor-other'
          }

          // App chunks (vos pages groupées par module)
          if (id.includes('/pages/actions/')) return 'app-actions'
          if (id.includes('/pages/documents/')) return 'app-documents'
          if (id.includes('/pages/indicateurs/')) return 'app-indicators'
          if (id.includes('/pages/equipment/')) return 'app-equipment'
          if (id.includes('/pages/trainings/')) return 'app-trainings'
          if (id.includes('/pages/planning/')) return 'app-planning'
          if (id.includes('/pages/users/')) return 'app-users'
          if (id.includes('/pages/notifications/')) return 'app-notifications'
          if (id.includes('/pages/settings/')) return 'app-settings'
          if (id.includes('/pages/profile/')) return 'app-profile'
        },
      },
    },
    // Augmenter la limite d'avertissement (optionnel)
    chunkSizeWarningLimit: 1000, // 1000 KB
  },
})
