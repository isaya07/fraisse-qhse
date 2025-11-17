import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import router from './router'
import './assets/styles/main.scss'

// Import des icônes Font Awesome
library.add(fas)

// Fonction pour appliquer le thème au démarrage
function applyThemeOnStart() {
  // Récupérer le thème depuis le localStorage ou utiliser 'light' par défaut
  const theme = localStorage.getItem('theme') || 'light'

  // Appliquer le thème au document en utilisant l'attribut data-theme (approche Bulma)
  document.documentElement.setAttribute('data-theme', theme)
}

// Appliquer le thème avant de créer l'application
applyThemeOnStart()

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
