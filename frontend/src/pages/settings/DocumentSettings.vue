<template>
  <div class="p-6 border border-surface-border rounded-lg bg-surface-50 dark:bg-surface-800">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2 text-color">
      <i class="pi pi-file text-blue-500"></i>
      Module Documents
    </h2>

    <div class="flex flex-col gap-4">
      <div class="field">
        <label for="basePath" class="block text-sm font-medium mb-2 text-color-secondary">
          Chemin de base (sur le serveur)
        </label>
        <InputText
          id="basePath"
          v-model="settings.document_base_path"
          placeholder="ex: documents"
          class="w-full"
        />
        <small class="text-color-secondary"
          >Dossier où seront stockés les fichiers (relatif à storage/app/public)</small
        >
      </div>

      <div class="field">
        <label for="namingConvention" class="block text-sm font-medium mb-2 text-color-secondary">
          Convention de nommage
        </label>
        <InputText
          id="namingConvention"
          v-model="settings.document_naming_convention"
          placeholder="ex: {date}_{original_name}"
          class="w-full"
        />
        <small class="text-color-secondary">
          Variables disponibles: {original_name}, {date}, {timestamp}
        </small>
      </div>
    </div>
    <div class="flex justify-end mt-6 pt-4">
      <Button
        label="Enregistrer les modifications"
        @click="saveSettings"
        :loading="loading"
      >
        <template #icon>
          <font-awesome-icon icon="save" class="mr-2" />
        </template>
      </Button>
    </div>

    <!-- Category Management Section -->
    <div class="mt-8 pt-6 border-t border-surface-border">
      <CategoryManagement />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from 'primevue/usetoast'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import CategoryManagement from '@/components/settings/CategoryManagement.vue'

const settingsStore = useSettingsStore()
const toast = useToast()

const loading = computed(() => settingsStore.loading)
const settings = ref({
  document_base_path: 'documents',
  document_naming_convention: '{original_name}',
})

onMounted(async () => {
  await settingsStore.fetchSettings()
  if (settingsStore.settings) {
    settings.value = {
      document_base_path: settingsStore.settings.document_base_path || 'documents',
      document_naming_convention:
        settingsStore.settings.document_naming_convention || '{original_name}',
    }
  }
})

const saveSettings = async () => {
  try {
    await settingsStore.updateSettings(settings.value)
    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Paramètres sauvegardés',
      life: 3000,
      icon: 'check',
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Impossible de sauvegarder les paramètres',
      life: 3000,
      icon: 'times',
    })
  }
}
</script>
