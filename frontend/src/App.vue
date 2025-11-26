<template>
  <router-view />
  <!-- <Toast>
    <template #message="slotProps">
      <div class="flex items-center gap-4 p-4">
        <font-awesome-icon :icon="['fas', slotProps.message.icon || getSeverityIcon(slotProps.message.severity)]"
          class="text-2xl" />
        <div class="flex flex-col">
          <span class="font-bold mb-1">{{ slotProps.message.summary }}</span>
          <span class="text-sm">{{ slotProps.message.detail }}</span>
        </div>
      </div>
    </template>
</Toast> -->
  <ConfirmDialog>
    <template #message="slotProps">
      <div class="flex items-center gap-4 p-4">
        <font-awesome-icon v-if="slotProps.message.icon" :icon="['fas', slotProps.message.icon]"
          class="text-3xl text-red-500" />
        <span class="p-confirm-dialog-message">{{ slotProps.message.message }}</span>
      </div>
    </template>
  </ConfirmDialog>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import ConfirmDialog from 'primevue/confirmdialog'
import { useAppStore } from '@/stores/app'

const toast = useToast()

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'success':
      return 'check'
    case 'info':
      return 'info-circle'
    case 'warn':
      return 'exclamation-triangle'
    case 'error':
      return 'times-circle'
    default:
      return 'info-circle'
  }
}

// Fonction pour gérer l'événement d'erreur API
const handleApiError = (event: CustomEvent) => {
  const { severity, summary, detail, life } = event.detail
  toast.add({ severity, summary, detail, life })
}

onMounted(() => {
  // Écouter l'événement personnalisé pour les erreurs API
  window.addEventListener('api-error', handleApiError as EventListener)

  // Restaurer la session utilisateur si un token existe
  const appStore = useAppStore()
  if (appStore.token && !appStore.user) {
    appStore.fetchCurrentUser()
  }
})

onUnmounted(() => {
  // Nettoyer l'écouteur d'événement
  window.removeEventListener('api-error', handleApiError as EventListener)
})
</script>
