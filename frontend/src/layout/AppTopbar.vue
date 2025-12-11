<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button class="layout-menu-button layout-topbar-action" @click="toggleMenu">
        <font-awesome-icon :icon="['fas', 'bars']" />
      </button>
      <router-link to="/" class="layout-topbar-logo">
        <FraisseLogo size="42" class="mr-2" />
        <div class="flex flex-col justify-center leading-none">
          <span class="text-xl font-bold text-color">FRAISSE & FILS</span>
          <span class="text-xs text-primary font-bold tracking-wider">QHSE Manager</span>
        </div>
      </router-link>
    </div>

    <div class="layout-topbar-actions">
      <div class="layout-config-menu flex gap-2 items-center">
        <button
          v-if="currentUser"
          type="button"
          class="layout-topbar-action notification-button"
          @click="toggleNotificationPanel"
          title="Notifications"
        >
          <OverlayBadge
            :value="notificationStore.unreadCount > 0 ? notificationStore.unreadCount : undefined"
            severity="danger"
            size="small"
          >
            <font-awesome-icon :icon="['fas', 'bell']" />
          </OverlayBadge>
        </button>

        <Popover ref="notificationPanel" class="w-80 sm:w-96">
          <div class="flex flex-col gap-4">
            <div class="flex justify-between items-center border-b pb-2">
              <span class="font-semibold text-lg">Notifications</span>
              <Button
                v-if="notificationStore.unreadCount > 0"
                label="Tout marquer comme lu"
                size="small"
                text
                @click="markAllAsRead"
              />
            </div>

            <div
              v-if="notificationStore.notifications.length === 0"
              class="text-center py-4 text-gray-500"
            >
              Aucune nouvelle notification
            </div>

            <div v-else class="flex flex-col gap-2 max-h-80 overflow-y-auto custom-scrollbar">
              <div
                v-for="notification in notificationStore.notifications"
                :key="notification.id"
                class="p-3 rounded-lg cursor-pointer border-l-4 border-primary transition-colors"
                :class="[
                  notification.read_at ? 'opacity-60 bg-surface-0 dark:bg-surface-800' : 'bg-primary-50 dark:bg-primary-900/20'
                ]"
                @click="markAsRead(notification.id)"
              >
                <div class="flex justify-between items-start mb-1">
                  <span class="text-xs font-semibold uppercase text-primary">{{
                    notification.type
                  }}</span>
                  <span class="text-xs text-color-secondary">{{
                    formatTimeAgo(notification.created_at)
                  }}</span>
                </div>
                <p class="text-sm text-color">{{ notification.message }}</p>
              </div>
            </div>

            <div class="border-t pt-2 text-center">
              <Button
                label="Voir toutes les notifications"
                link
                size="small"
                @click="viewAllNotifications"
              />
            </div>
          </div>
        </Popover>

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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLayout } from '@/layout/composables/layout'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useNotificationStore } from '@/stores/notification'
import OverlayBadge from 'primevue/overlaybadge'
import Popover from 'primevue/popover'
import Button from 'primevue/button'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import FraisseLogo from '@/components/FraisseLogo.vue'

const router = useRouter()
const appStore = useAppStore()
const notificationStore = useNotificationStore()

const userMenuVisible = ref()
const notificationPanel = ref()

const { toggleMenu } = useLayout()

const toggleUserMenu = (event: Event) => {
  userMenuVisible.value.toggle(event)
}

const toggleNotificationPanel = (event: Event) => {
  notificationPanel.value.toggle(event)
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

const formatTimeAgo = (date: string) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr })
}

const markAsRead = async (id: number) => {
  await notificationStore.markAsRead(id)
}

const markAllAsRead = async () => {
  await notificationStore.markAllAsRead()
}

const viewAllNotifications = () => {
  notificationPanel.value.hide()
  router.push('/notifications')
}

let pollingInterval: number | null | ReturnType<typeof setInterval> = null

onMounted(() => {
  if (currentUser.value) {
    notificationStore.fetchUnreadCount()
    notificationStore.fetchNotifications(true) // Fetch unread initially for the popup

    // Poll for notifications every minute
    pollingInterval = setInterval(() => {
      notificationStore.fetchUnreadCount()
      notificationStore.fetchNotifications(true)
    }, 60000)
  }
})

onUnmounted(() => {
  if (pollingInterval) {
    clearInterval(pollingInterval)
  }
})
</script>

<style scoped></style>
