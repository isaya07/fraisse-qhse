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
      <div v-if="currentUser">
        <Button class="p-button-text" @click="toggleUserMenu" id="user-menu-button">
          <font-awesome-icon :icon="['fas', 'user']" class="mr-2" />
          {{ currentUser?.first_name }} {{ currentUser?.last_name }}
          <font-awesome-icon
            :icon="['fas', userMenuVisible ? 'caret-up' : 'caret-down']"
            class="ml-2"
          />
        </Button>
        <Popover
          id="user-menu-popover"
          :target="'#user-menu-button'"
          :visible="userMenuVisible"
          @hide="userMenuVisible = false"
        >
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLayout } from '@/layout/composables/layout'
// import AppConfigurator from './AppConfigurator.vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import Button from 'primevue/button'
import Popover from 'primevue/popover'

const router = useRouter()
const appStore = useAppStore()

const userMenuVisible = ref(false)

const { toggleMenu } = useLayout()

const toggleUserMenu = () => {
  userMenuVisible.value = !userMenuVisible.value
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
