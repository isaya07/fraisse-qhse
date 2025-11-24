<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Paramètres</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Apparence -->
      <div class="card">
        <h2 class="text-xl font-semibold mb-4">Apparence</h2>
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <span class="font-medium">Thème sombre</span>
            <span class="text-sm text-gray-500">Activer le mode sombre pour l'application</span>
          </div>
          <ToggleSwitch v-model="isDarkMode" @change="toggleTheme" />
        </div>
      </div>

      <!-- Notifications (Placeholder) -->
      <div class="card">
        <h2 class="text-xl font-semibold mb-4">Notifications</h2>
        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <div class="flex flex-col">
              <span class="font-medium">Notifications par email</span>
              <span class="text-sm text-gray-500"
                >Recevoir des emails pour les actions assignées</span
              >
            </div>
            <ToggleSwitch v-model="emailNotifications" />
          </div>
          <div class="flex items-center justify-between">
            <div class="flex flex-col">
              <span class="font-medium">Rappels d'échéance</span>
              <span class="text-sm text-gray-500"
                >Recevoir un rappel avant l'échéance d'une action</span
              >
            </div>
            <ToggleSwitch v-model="dueReminders" />
          </div>
        </div>
      </div>

      <!-- Système (Admin only) -->
      <div class="card md:col-span-2">
        <h2 class="text-xl font-semibold mb-4 text-red-600">Zone de danger</h2>
        <div class="p-4 border border-red-200 rounded-lg bg-red-50">
          <div class="flex items-center justify-between">
            <div class="flex flex-col">
              <span class="font-medium text-red-700">Vider le cache</span>
              <span class="text-sm text-red-500">Effacer le cache local de l'application</span>
            </div>
            <Button label="Vider le cache" severity="danger" outlined @click="clearCache" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import ToggleSwitch from 'primevue/toggleswitch'
import Button from 'primevue/button'

const appStore = useAppStore()

const isDarkMode = ref(false)
const emailNotifications = ref(true)
const dueReminders = ref(true)

const toggleTheme = () => {
  appStore.toggleTheme()
  isDarkMode.value = appStore.theme === 'dark'
}

const clearCache = () => {
  localStorage.clear()
  window.location.reload()
}

onMounted(() => {
  isDarkMode.value = appStore.theme === 'dark'
})
</script>
