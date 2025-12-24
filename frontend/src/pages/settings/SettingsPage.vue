<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold text-color mb-6">Paramètres</h1>

    <div class="card">
      <Tabs :value="activeTab">
        <TabList>
          <Tab value="0">Général</Tab>
          <Tab value="1">Documents</Tab>
          <Tab value="2">Notifications</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <!-- Apparence -->
              <div
                class="p-6 border border-surface-border rounded-lg bg-surface-50 dark:bg-surface-800"
              >
                <h2 class="text-xl font-semibold mb-4 text-color">Apparence</h2>
                <div class="flex items-center justify-between">
                  <div class="flex flex-col">
                    <span class="font-medium text-color">Thème sombre</span>
                    <span class="text-sm text-color-secondary"
                      >Activer le mode sombre pour l'application</span
                    >
                  </div>
                  <ToggleSwitch v-model="isDarkMode" @change="toggleTheme" />
                </div>
              </div>

              <!-- Système (Admin only) -->
              <div
                class="p-6 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20"
              >
                <h2 class="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">
                  Zone de danger
                </h2>
                <div class="flex items-center justify-between">
                  <div class="flex flex-col">
                    <span class="font-medium text-red-700 dark:text-red-300">Vider le cache</span>
                    <span class="text-sm text-red-500 dark:text-red-400"
                      >Effacer le cache local de l'application</span
                    >
                  </div>
                  <Button label="Vider le cache" severity="danger" outlined @click="clearCache" />
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="1">
            <DocumentSettings />
          </TabPanel>
          <TabPanel value="2">
            <NotificationSettings />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useAppStore } from '@/stores/app'
import { useRoute } from 'vue-router'
import ToggleSwitch from 'primevue/toggleswitch'
import Button from 'primevue/button'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import DocumentSettings from './DocumentSettings.vue'
import NotificationSettings from './NotificationSettings.vue'

const appStore = useAppStore()
const route = useRoute()

const isDarkMode = ref(false)
const activeTab = ref('0')

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
  if (route.query.tab) {
    activeTab.value = String(route.query.tab)
  }
})

watch(
  () => route.query.tab,
  (newTab) => {
    if (newTab) {
      activeTab.value = String(newTab)
    }
  },
)
</script>
