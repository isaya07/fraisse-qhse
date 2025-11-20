<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button class="layout-menu-button layout-topbar-action" @click="toggleMenu">
        <i class="pi pi-bars"></i>
      </button>
      <router-link to="/" class="layout-topbar-logo">
        <font-awesome-icon :icon="['fas', 'shield-alt']" class="mr-2" />
        <span>QHSE Manager</span>
      </router-link>
    </div>

    <div class="layout-topbar-actions">
      <div class="layout-config-menu">
        <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
          <font-awesome-icon :icon="['fas', appStore.theme === 'dark' ? 'sun' : 'moon']" />
          <!-- <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i> -->
        </button>
        <!--  <div class="relative">
          <button
            v-styleclass="{
              selector: '@next',
              enterFromClass: 'hidden',
              enterActiveClass: 'animate-scalein',
              leaveToClass: 'hidden',
              leaveActiveClass: 'animate-fadeout',
              hideOnOutsideClick: true,
            }"
            type="button"
            class="layout-topbar-action layout-topbar-action-highlight"
          >
            <i class="pi pi-palette"></i>
          </button>
          <AppConfigurator />
        </div> -->
      </div>

      <button
        class="layout-topbar-menu-button layout-topbar-action"
        v-styleclass="{
          selector: '@next',
          enterFromClass: 'hidden',
          enterActiveClass: 'animate-scalein',
          leaveToClass: 'hidden',
          leaveActiveClass: 'animate-fadeout',
          hideOnOutsideClick: true,
        }"
      >
        <font-awesome-icon :icon="['fas', 'bars']" />
        <!-- <i class="pi pi-ellipsis-v"></i>  -->
      </button>

      <!-- Menu mobile utilisateur -->
      <div v-if="currentUser" class="layout-config-menu">
        <button
          class=""
          v-styleclass="{
            selector: '@next',
            enterFromClass: 'hidden',
            enterActiveClass: 'animate-scalein',
            leaveToClass: 'hidden',
            leaveActiveClass: 'animate-fadeout',
            hideOnOutsideClick: true,
          }"
          @click="toggleUserMenu"
        >
          <font-awesome-icon :icon="['fas', 'user']" class="mr-2" />
          <span>{{ currentUser?.first_name }} {{ currentUser?.last_name }}</span>
        </button>
        <Popover ref="userMenuVisible">
          <div class="user-popover-content">
            <router-link to="/profile" class="user-popover-item" @click="userMenuVisible = false">
              <font-awesome-icon :icon="['fas', 'user-circle']" class="mr-2" />
              <span>Profil</span>
            </router-link>
            <a @click="handleLogout" class="user-popover-item">
              <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="mr-2" />
              <span>Déconnexion</span>
            </a>
          </div>
        </Popover>
      </div>
      <div v-else class="layout-config-menu">
        <button
          class="layout-topbar-action"
          v-styleclass="{
            selector: '@next',
            enterFromClass: 'hidden',
            enterActiveClass: 'animate-scalein',
            leaveToClass: 'hidden',
            leaveActiveClass: 'animate-fadeout',
            hideOnOutsideClick: true,
          }"
        >
          <router-link to="/login" class="layout-topbar-logo">
            <font-awesome-icon :icon="['fas', 'sign-in-alt']" class="mr-2" />
            <span>Connexion</span>
          </router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLayout } from '@/layout/composables/layout'
// import AppConfigurator from './AppConfigurator.vue'
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
  userMenuVisible.value = false
}

// Récupérer l'utilisateur connecté
const currentUser = computed(() => appStore.currentUser)
</script>

<style scoped>
.user-popover-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
}

.user-popover-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 4px;
  color: var(--text-color);
  cursor: pointer;
}

.user-popover-item:hover {
  background-color: var(--surface-hover);
}

.user-popover-item i {
  margin-right: 0.5rem;
}
</style>
