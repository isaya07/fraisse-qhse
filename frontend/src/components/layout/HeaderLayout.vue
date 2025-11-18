<template>
  <nav class="bg-blue-950 text-white shadow-xl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link class="flex items-center px-2 py-4 text-lg font-bold" to="/">
            <font-awesome-icon :icon="['fas', 'shield-alt']" class="mr-2" />
            <strong>QHSE Manager</strong>
          </router-link>

          <!-- Menu desktop -->
          <div class="hidden md:ml-6 md:flex md:space-x-8">
            <router-link
              to="/"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium hover:bg-blue-700 rounded-md p-2"
            >
              <font-awesome-icon :icon="['fas', 'home']" class="mr-2" />
              Accueil
            </router-link>

            <!-- Menu déroulant Documents -->
            <div class="relative">
              <button
                class="flex items-center px-1 pt-1 text-sm font-medium hover:bg-blue-700 rounded-md p-2"
              >
                <font-awesome-icon :icon="['fas', 'file-alt']" class="mr-2" />
                Documents
                <font-awesome-icon :icon="['fas', 'caret-down']" class="ml-1" />
              </button>
              <div
                class="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block"
              >
                <div class="py-1">
                  <router-link
                    to="/documents"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <font-awesome-icon :icon="['fas', 'list']" class="mr-2" />
                    Liste des documents
                  </router-link>
                  <router-link
                    to="/documents/create"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-10"
                  >
                    <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />
                    Créer un document
                  </router-link>
                </div>
              </div>
            </div>

            <!-- Menu déroulant Actions -->
            <div class="relative">
              <button
                class="flex items-center px-1 pt-1 text-sm font-medium hover:bg-blue-700 rounded-md p-2"
              >
                <font-awesome-icon :icon="['fas', 'tasks']" class="mr-2" />
                Actions
                <font-awesome-icon :icon="['fas', 'caret-down']" class="ml-1" />
              </button>
              <div
                class="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block"
              >
                <div class="py-1">
                  <router-link
                    to="/actions"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-10"
                  >
                    <font-awesome-icon :icon="['fas', 'list']" class="mr-2" />
                    Liste des actions
                  </router-link>
                  <router-link
                    to="/actions/create"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-10"
                  >
                    <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />
                    Créer une action
                  </router-link>
                </div>
              </div>
            </div>

            <!-- Menu déroulant Indicateurs -->
            <div class="relative">
              <button
                class="flex items-center px-1 pt-1 text-sm font-medium hover:bg-blue-70 rounded-md p-2"
              >
                <font-awesome-icon :icon="['fas', 'chart-line']" class="mr-2" />
                Indicateurs
                <font-awesome-icon :icon="['fas', 'caret-down']" class="ml-1" />
              </button>
              <div
                class="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block"
              >
                <div class="py-1">
                  <router-link
                    to="/indicators"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-10"
                  >
                    <font-awesome-icon :icon="['fas', 'list']" class="mr-2" />
                    Liste des indicateurs
                  </router-link>
                  <router-link
                    to="/indicators/create"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />
                    Créer un indicateur
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center">
          <!-- Bouton pour changer de thème -->
          <button
            class="p-1 rounded-full text-white hover:text-gray-300 focus:outline-none mr-4"
            @click="toggleTheme"
            aria-label="Changer de thème"
          >
            <font-awesome-icon :icon="['fas', appStore.theme === 'dark' ? 'sun' : 'moon']" />
          </button>

          <div v-if="!currentUser">
            <router-link to="/login" class="text-white hover:text-gray-300">
              <font-awesome-icon :icon="['fas', 'sign-in-alt']" class="mr-2" />
              Connexion
            </router-link>
          </div>

          <div v-else class="relative">
            <button class="flex items-center text-sm rounded-full focus:outline-none">
              <font-awesome-icon :icon="['fas', 'user']" class="mr-2" />
              {{ currentUser?.first_name }} {{ currentUser?.last_name }}
              <font-awesome-icon :icon="['fas', 'caret-down']" class="ml-1" />
            </button>
            <div
              class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-10"
            >
              <div class="py-1">
                <router-link
                  to="/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-10"
                >
                  <font-awesome-icon :icon="['fas', 'user-circle']" class="mr-2" />
                  Profil
                </router-link>
                <div class="border-t border-gray-200"></div>
                <a
                  @click="logout"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="mr-2" />
                  Déconnexion
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Bouton menu mobile -->
        <div class="-mr-2 flex items-center md:hidden">
          <button
            @click="toggleMenu"
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="sr-only">Ouvrir menu principal</span>
            <font-awesome-icon :icon="['fas', isMenuActive ? 'times' : 'bars']" />
          </button>
        </div>
      </div>
    </div>

    <!-- Menu mobile -->
    <div v-if="isMenuActive" class="md:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <router-link
          to="/"
          class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
        >
          <font-awesome-icon :icon="['fas', 'home']" class="mr-2" />
          Accueil
        </router-link>

        <!-- Menu mobile Documents -->
        <div class="block px-3 py-2 rounded-md text-base font-medium text-white">
          <button class="flex items-center w-full text-left" @click="toggleSubMenu('documents')">
            <font-awesome-icon :icon="['fas', 'file-alt']" class="mr-2" />
            Documents
            <font-awesome-icon
              :icon="['fas', isSubMenuOpen.documents ? 'caret-up' : 'caret-down']"
              class="ml-auto"
            />
          </button>
          <div v-if="isSubMenuOpen.documents" class="ml-4 mt-2 space-y-1">
            <router-link
              to="/documents"
              class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
            >
              <font-awesome-icon :icon="['fas', 'list']" class="mr-2" />
              Liste des documents
            </router-link>
            <router-link
              to="/documents/create"
              class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
            >
              <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />
              Créer un document
            </router-link>
          </div>
        </div>

        <!-- Menu mobile Actions -->
        <div class="block px-3 py-2 rounded-md text-base font-medium text-white">
          <button class="flex items-center w-full text-left" @click="toggleSubMenu('actions')">
            <font-awesome-icon :icon="['fas', 'tasks']" class="mr-2" />
            Actions
            <font-awesome-icon
              :icon="['fas', isSubMenuOpen.actions ? 'caret-up' : 'caret-down']"
              class="ml-auto"
            />
          </button>
          <div v-if="isSubMenuOpen.actions" class="ml-4 mt-2 space-y-1">
            <router-link
              to="/actions"
              class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
            >
              <font-awesome-icon :icon="['fas', 'list']" class="mr-2" />
              Liste des actions
            </router-link>
            <router-link
              to="/actions/create"
              class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
            >
              <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />
              Créer une action
            </router-link>
          </div>
        </div>

        <!-- Menu mobile Indicateurs -->
        <div class="block px-3 py-2 rounded-md text-base font-medium text-white">
          <button class="flex items-center w-full text-left" @click="toggleSubMenu('indicators')">
            <font-awesome-icon :icon="['fas', 'chart-line']" class="mr-2" />
            Indicateurs
            <font-awesome-icon
              :icon="['fas', isSubMenuOpen.indicators ? 'caret-up' : 'caret-down']"
              class="ml-auto"
            />
          </button>
          <div v-if="isSubMenuOpen.indicators" class="ml-4 mt-2 space-y-1">
            <router-link
              to="/indicators"
              class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
            >
              <font-awesome-icon :icon="['fas', 'list']" class="mr-2" />
              Liste des indicateurs
            </router-link>
            <router-link
              to="/indicators/create"
              class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
            >
              <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />
              Créer un indicateur
            </router-link>
          </div>
        </div>

        <!-- Menu mobile utilisateur -->
        <div v-if="currentUser" class="block px-3 py-2 rounded-md text-base font-medium text-white">
          <button class="flex items-center w-full text-left" @click="toggleSubMenu('user')">
            <font-awesome-icon :icon="['fas', 'user']" class="mr-2" />
            {{ currentUser?.first_name }} {{ currentUser?.last_name }}
            <font-awesome-icon
              :icon="['fas', isSubMenuOpen.user ? 'caret-up' : 'caret-down']"
              class="ml-auto"
            />
          </button>
          <div v-if="isSubMenuOpen.user" class="ml-4 mt-2 space-y-1">
            <router-link
              to="/profile"
              class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
            >
              <font-awesome-icon :icon="['fas', 'user-circle']" class="mr-2" />
              Profil
            </router-link>
            <a
              @click="logout"
              class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 cursor-pointer"
            >
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
const isSubMenuOpen = ref({
  documents: false,
  actions: false,
  indicators: false,
  user: false,
})

const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value
}

const toggleSubMenu = (menu: string) => {
  isSubMenuOpen.value = {
    ...isSubMenuOpen.value,
    [menu]: !isSubMenuOpen.value[menu as keyof typeof isSubMenuOpen.value],
  }
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
