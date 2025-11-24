<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button class="layout-menu-button layout-topbar-action" @click="toggleMenu">
        <font-awesome-icon :icon="['fas', 'bars']" />
      </button>
      <router-link to="/" class="layout-topbar-logo">
        <div class="logo-icon-wrapper">
          <font-awesome-icon :icon="['fas', 'shield-alt']" class="logo-icon" />
        </div>
        <span>QHSE Manager</span>
      </router-link>
    </div>

    <div class="layout-topbar-actions">
      <div class="layout-config-menu">
        <button
          type="button"
          class="layout-topbar-action theme-toggle"
          @click="toggleDarkMode"
          title="Changer de thème"
        >
          <font-awesome-icon :icon="['fas', appStore.theme === 'dark' ? 'sun' : 'moon']" />
        </button>
      </div>

      <!-- Menu mobile utilisateur -->
      <div v-if="currentUser" class="user-menu-container">
        <button
          class="user-profile-button"
          @click="toggleUserMenu"
          aria-haspopup="true"
          aria-controls="user_menu"
        >
          <div class="user-avatar">
            <span>{{ getUserInitials() }}</span>
          </div>
          <span class="user-name hidden md:block"
            >{{ currentUser?.first_name }} {{ currentUser?.last_name }}</span
          >
          <font-awesome-icon :icon="['fas', 'chevron-down']" class="ml-2 text-xs hidden md:block" />
        </button>

        <Popover ref="userMenuVisible" id="user_menu">
          <div class="user-popover-content">
            <div class="user-popover-header">
              <span class="font-semibold"
                >{{ currentUser?.first_name }} {{ currentUser?.last_name }}</span
              >
              <span class="text-xs text-gray-500">{{ currentUser?.email }}</span>
            </div>
            <div class="separator"></div>
            <router-link to="/profile" class="user-popover-item" @click="userMenuVisible.hide()">
              <font-awesome-icon :icon="['fas', 'user-circle']" class="mr-2" />
              <span>Mon Profil</span>
            </router-link>
            <router-link to="/settings" class="user-popover-item" @click="userMenuVisible.hide()">
              <font-awesome-icon :icon="['fas', 'cog']" class="mr-2" />
              <span>Paramètres</span>
            </router-link>
            <div class="separator"></div>
            <a @click="handleLogout" class="user-popover-item text-red-600 hover:bg-red-50">
              <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="mr-2" />
              <span>Déconnexion</span>
            </a>
          </div>
        </Popover>
      </div>
      <div v-else class="layout-config-menu">
        <router-link to="/login" class="login-button">
          <font-awesome-icon :icon="['fas', 'sign-in-alt']" class="mr-2" />
          <span>Connexion</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLayout } from '@/layout/composables/layout'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

const router = useRouter()
const appStore = useAppStore()

const userMenuVisible = ref()

const { toggleMenu } = useLayout()

const toggleUserMenu = (event: Event) => {
  userMenuVisible.value.toggle(event)
}

const toggleDarkMode = () => {
  if (!document.startViewTransition) {
    appStore.toggleTheme()
    return
  }
  document.startViewTransition(() => appStore.toggleTheme())
}

const handleLogout = async () => {
  await appStore.logout()
  await router.push('/login')
  userMenuVisible.value.hide()
}

// Récupérer l'utilisateur connecté
const currentUser = computed(() => appStore.currentUser)

const getUserInitials = () => {
  if (!currentUser.value) return ''
  return `${currentUser.value.first_name?.charAt(0) || ''}${currentUser.value.last_name?.charAt(0) || ''}`.toUpperCase()
}
</script>

<style scoped>
.layout-topbar {
  position: fixed;
  height: 4rem;
  z-index: 997;
  left: 0;
  top: 0;
  width: 100%;
  padding: 0 2rem;
  background-color: var(--surface-card);
  transition: left 0.2s;
  display: flex;
  align-items: center;
  box-shadow:
    0px 3px 5px rgba(0, 0, 0, 0.02),
    0px 0px 2px rgba(0, 0, 0, 0.05),
    0px 1px 4px rgba(0, 0, 0, 0.08);
}

.layout-topbar-logo-container {
  display: flex;
  align-items: center;
  width: 300px;
}

.layout-topbar-logo {
  display: flex;
  align-items: center;
  color: var(--text-color);
  font-size: 1.5rem;
  font-weight: 600;
  text-decoration: none;
  gap: 0.5rem;
}

.logo-icon-wrapper {
  background-color: transparent;
  color: var(--primary-color);
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.layout-menu-button {
  margin-right: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-color-secondary);
  transition: background-color 0.2s;
}

.layout-menu-button:hover {
  background-color: var(--surface-hover);
  color: var(--text-color);
}

.layout-topbar-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.layout-topbar-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-color-secondary);
  transition: background-color 0.2s;
}

.layout-topbar-action:hover {
  background-color: var(--surface-hover);
  color: var(--text-color);
}

.user-profile-button {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 2rem;
  border: 1px solid var(--surface-border);
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--text-color);
}

.user-profile-button:hover {
  background-color: var(--surface-hover);
  border-color: var(--primary-200);
}

.user-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: var(--primary-100);
  color: var(--primary-700);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  margin-right: 0.5rem;
}

.user-popover-content {
  display: flex;
  flex-direction: column;
  width: 200px;
}

.user-popover-header {
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.separator {
  height: 1px;
  background-color: var(--surface-border);
  margin: 0.25rem 0;
}

.user-popover-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: var(--text-color);
  cursor: pointer;
  transition: background-color 0.2s;
}

.user-popover-item:hover {
  background-color: var(--surface-hover);
}

.login-button {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: var(--primary-500);
  color: var(--text-color);
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
}

.login-button:hover {
  background-color: var(--primary-600);
}
</style>
