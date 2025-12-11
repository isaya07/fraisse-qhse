import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

import '@/assets/css/styles.scss'
import '@/assets/css/tailwind.css'

// Import des icônes Font Awesome
library.add(fas)

// Chart.js Registration
import 'chart.js/auto'

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)
import { definePreset } from '@primevue/themes'

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f5f7fa',
      100: '#eaedf4',
      200: '#d0d9e8',
      300: '#a6b8d6',
      400: '#7592c0',
      500: '#4f71a8',
      600: '#3b5685',
      700: '#2f456b',
      800: '#263957',
      900: '#0e213d',
      950: '#081324',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}',
        },
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          // 700: '{slate.700}', // Original neutral
          700: '#334155', // Lighter bluish tint
          // 800: '{slate.800}', // Original neutral
          800: '#1a2436', // Bluish tint (Cards, Sidebars)
          // 900: '{slate.900}', // Original neutral
          900: '#111826', // Bluish tint
          // 950: '{slate.950}', // Original neutral
          950: '#243046', // Deep bluish background (Page Bg)
        },
      },
    },
  },
})

app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: '.app-dark',
    },
  },
})
app.use(ToastService)
app.use(ConfirmationService)
app.mount('#app')
