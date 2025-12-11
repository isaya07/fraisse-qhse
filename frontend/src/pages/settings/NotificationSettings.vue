<template>
  <div class="p-6 border border-surface-border rounded-lg bg-surface-50 dark:bg-surface-800">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2 text-color">
      <font-awesome-icon :icon="['fas', 'bell']" class="text-blue-500" />
      Module Notifications
    </h2>

    <div class="flex flex-col gap-6">
      <div class="field-checkbox flex items-center gap-2">
        <Checkbox id="email_enabled" v-model="form.email_enabled" :binary="true" />
        <label for="email_enabled" class="font-medium text-color-secondary"
          >Recevoir le résumé quotidien par email</label
        >
      </div>

      <div class="field" v-if="form.email_enabled">
        <label for="email_time" class="block text-sm font-medium text-color-secondary mb-1"
          >Heure d'envoi</label
        >
        <DatePicker
          v-model="form.email_time"
          updateModelType="string"
          showIcon
          fluid
          iconDisplay="input"
          timeOnly
          inputId="email_time"
        >
          <template #inputicon>
            <font-awesome-icon :icon="['fas', 'clock']" />
          </template>
        </DatePicker>
        <small class="text-color-secondary"
          >L'heure à laquelle vous souhaitez recevoir le récapitulatif.</small
        >
      </div>

      <div class="border-t border-surface-border pt-4">
        <h3 class="text-lg font-semibold mb-4 text-color">Seuils d'alerte (jours avant échéance)</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="field">
            <label for="action_threshold" class="block text-sm font-medium text-color-secondary mb-1"
              >Actions</label
            >
            <InputNumber
              id="action_threshold"
              v-model="form.alert_thresholds.action"
              showButtons
              :min="1"
              :max="30"
              suffix=" jours"
              class="w-full"
            />
          </div>

          <div class="field">
            <label for="equipment_threshold" class="block text-sm font-medium text-color-secondary mb-1"
              >Équipements</label
            >
            <InputNumber
              id="equipment_threshold"
              v-model="form.alert_thresholds.equipment"
              showButtons
              :min="1"
              :max="60"
              suffix=" jours"
              class="w-full"
            />
          </div>

          <div class="field">
            <label for="document_threshold" class="block text-sm font-medium text-color-secondary mb-1"
              >Documents (Expiration)</label
            >
            <InputNumber
              id="document_threshold"
              v-model="form.alert_thresholds.document"
              showButtons
              :min="1"
              :max="90"
              suffix=" jours"
              class="w-full"
            />
          </div>

          <div class="field">
            <label for="training_threshold" class="block text-sm font-medium text-color-secondary mb-1"
              >Formations</label
            >
            <InputNumber
              id="training_threshold"
              v-model="form.alert_thresholds.training"
              showButtons
              :min="1"
              :max="30"
              suffix=" jours"
              class="w-full"
            />
          </div>

          <div class="field">
            <label for="planning_threshold" class="block text-sm font-medium text-color-secondary mb-1"
              >Planning (Visites/Causeries)</label
            >
            <InputNumber
              id="planning_threshold"
              v-model="form.alert_thresholds.planning"
              showButtons
              :min="1"
              :max="14"
              suffix=" jours"
              class="w-full"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-end mt-6 pt-4 border-t border-surface-border">
        <Button
          label="Enregistrer les modifications"
          @click="save"
          :loading="loading"
        >
          <template #icon>
            <font-awesome-icon icon="save" class="mr-2" />
          </template>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNotificationStore } from '@/stores/notification'
import { useToast } from 'primevue/usetoast'
import Checkbox from 'primevue/checkbox'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'

const store = useNotificationStore()
const toast = useToast()

const loading = ref(false)
const form = ref({
  email_enabled: true,
  email_time: new Date(0, 0, 0, 8, 0, 0), // 8:00 AM as Date object for time picker
  alert_thresholds: {
    action: 3,
    equipment: 7,
    document: 30,
    training: 7,
    planning: 1,
  },
})

onMounted(async () => {
  await store.fetchSettings()
  if (store.settings) {
    // Convert time string to Date object for the time picker
    const [hours, minutes] = store.settings.email_time.split(':').map(Number);
    form.value = {
      email_enabled: store.settings.email_enabled,
      email_time: new Date(0, 0, 0, hours, minutes, 0), // Date object with time
      alert_thresholds: {
        action: store.settings.alert_thresholds.action ?? 3,
        equipment: store.settings.alert_thresholds.equipment ?? 7,
        document: store.settings.alert_thresholds.document ?? 30,
        training: store.settings.alert_thresholds.training ?? 7,
        planning: store.settings.alert_thresholds.planning ?? 1,
      },
    }
  }
})

const save = async () => {
  loading.value = true
  try {
    // Convert Date object back to time string in HH:mm:ss format
    const timeString = form.value.email_time instanceof Date
      ? `${String(form.value.email_time.getHours()).padStart(2, '0')}:${String(form.value.email_time.getMinutes()).padStart(2, '0')}:00`
      : form.value.email_time;
      
    await store.updateSettings({
      email_enabled: form.value.email_enabled,
      email_time: timeString,
      alert_thresholds: form.value.alert_thresholds,
    })
    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Paramètres enregistrés',
      life: 3000,
    })
  } catch (e) {
    console.log(e)
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: "Erreur lors de l'enregistrement",
      life: 3000,
    })
  } finally {
    loading.value = false
  }
}
</script>
