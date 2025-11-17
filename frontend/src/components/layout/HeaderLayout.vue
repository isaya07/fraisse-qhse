<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <font-awesome-icon :icon="['fas', 'shield-alt']" class="mr-2" />
        <strong>QHSE Manager</strong>
      </router-link>

      <a
        role="button"
        class="navbar-burger"
        :class="{ 'is-active': isMenuActive }"
        aria-label="menu"
        aria-expanded="false"
        @click="toggleMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': isMenuActive }">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">
          <font-awesome-icon :icon="['fas', 'home']" class="mr-2" />
          Accueil
        </router-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <font-awesome-icon :icon="['fas', 'file-alt']" class="mr-2" />
            Documents
          </a>

          <div class="navbar-dropdown">
            <router-link to="/documents" class="navbar-item">
              <font-awesome-icon :icon="['fas', 'list']" class="mr-2" />
              Liste des documents
            </router-link>
            <router-link to="/documents/create" class="navbar-item">
              <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />
              Créer un document
            </router-link>
          </div>
        </div>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <font-awesome-icon :icon="['fas', 'tasks']" class="mr-2" />
            Actions
          </a>

          <div class="navbar-dropdown">
            <router-link to="/actions" class="navbar-item">
              <font-awesome-icon :icon="['fas', 'list']" class="mr-2" />
              Liste des actions
            </router-link>
            <router-link to="/actions/create" class="navbar-item">
              <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />
              Créer une action
            </router-link>
          </div>
        </div>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <font-awesome-icon :icon="['fas', 'chart-line']" class="mr-2" />
            Indicateurs
          </a>

          <div class="navbar-dropdown">
            <router-link to="/indicators" class="navbar-item">
              <font-awesome-icon :icon="['fas', 'list']" class="mr-2" />
              Liste des indicateurs
            </router-link>
            <router-link to="/indicators/create" class="navbar-item">
              <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />
              Créer un indicateur
            </router-link>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <!-- Bouton pour changer de thème -->
        <div class="navbar-item">
          <a class="button is-ghost" @click="toggleTheme" aria-label="Changer de thème">
            <font-awesome-icon
              :icon="['fas', appStore.theme === 'dark' ? 'sun' : 'moon']"
              class="mr-2"
            />
          </a>
        </div>

        <div class="navbar-item" v-if="!currentUser">
          <div class="buttons">
            <router-link to="/login" class="button is-primary">
              <font-awesome-icon :icon="['fas', 'sign-in-alt']" class="mr-2" />
              Connexion
            </router-link>
          </div>
        </div>

        <div class="navbar-item has-dropdown is-hoverable" v-else>
          <a class="navbar-link">
            <font-awesome-icon :icon="['fas', 'user']" class="mr-2" />
            {{ currentUser?.first_name }} {{ currentUser?.last_name }}
          </a>

          <div class="navbar-dropdown">
            <router-link to="/profile" class="navbar-item">
              <font-awesome-icon :icon="['fas', 'user-circle']" class="mr-2" />
              Profil
            </router-link>
            <hr class="navbar-divider" />
            <a class="navbar-item" @click="logout">
              <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="mr-2" />
              Déconnexion
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

const router = useRouter()
const appStore = useAppStore()

const isMenuActive = ref(false)

const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value
}

const logout = async () => {
  await appStore.logout()
  await router.push('/login')
}

const toggleTheme = () => {
  appStore.toggleTheme()
}

// Récupérer l'utilisateur connecté
const currentUser = computed(() => appStore.currentUser)
</script>
