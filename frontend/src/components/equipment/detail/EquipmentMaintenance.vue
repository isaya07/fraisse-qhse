<template>
  <Card>
    <template #content>
      <div class="flex justify-between items-center mb-4">
        <h4>Historique de Maintenance</h4>
        <Button label="Ajouter" size="small" outlined @click="$emit('add-maintenance')">
          <template #icon>
            <font-awesome-icon icon="plus" class="mr-2" />
          </template>
        </Button>
      </div>

      <div
        v-if="!maintenanceLogs || maintenanceLogs.length === 0"
        class="text-center py-8 text-color-secondary"
      >
        <p>Aucune maintenance enregistrée</p>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="log in maintenanceLogs"
          :key="log.id"
          class="border-b border-surface-border last:border-0 pb-4 last:pb-0"
        >
          <div class="flex justify-between items-start mb-2">
            <div class="flex items-center gap-2">
              <span
                class="w-8 h-8 flex items-center justify-center rounded-full text-white text-sm"
                :class="getLogColor(log.type)"
              >
                <font-awesome-icon :icon="getLogIcon(log.type)" />
              </span>
              <div class="flex flex-col">
                <span class="font-bold text-sm">{{ getLogTypeLabel(log.type) }}</span>
                <span class="text-xs text-color-secondary">{{ formatDate(log.date) }}</span>
              </div>
            </div>
            <span
              class="text-xs px-2 py-1 rounded font-medium"
              :class="getResultSeverity(log.result)"
            >
              {{ getResultLabel(log.result) }}
            </span>
          </div>
          <p class="text-color mb-2">{{ log.description }}</p>
          <div class="flex justify-between items-center text-sm text-color-secondary">
            <span>Par: {{ log.performer }}</span>
            <span v-if="log.cost">{{ log.cost }} €</span>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

defineProps<{
  maintenanceLogs: any[]
}>()

defineEmits(['add-maintenance'])

const formatDate = (date: string) => {
  return format(new Date(date), 'dd MMM yyyy', { locale: fr })
}

const getLogTypeLabel = (type: string) => {
  const map: Record<string, string> = {
    periodic_check: 'Vérification Périodique',
    repair: 'Réparation',
    calibration: 'Étalonnage',
  }
  return map[type] || type
}

const getLogColor = (type: string) => {
  const map: Record<string, string> = {
    periodic_check: 'bg-blue-500',
    repair: 'bg-orange-500',
    calibration: 'bg-purple-500',
  }
  return map[type] || 'bg-gray-500'
}

const getLogIcon = (type: string) => {
  const map: Record<string, string> = {
    periodic_check: 'clipboard-check',
    repair: 'tools',
    calibration: 'balance-scale',
  }
  return map[type] || 'clipboard'
}

const getResultLabel = (result: string) => {
  const map: Record<string, string> = {
    compliant: 'Conforme',
    non_compliant: 'Non Conforme',
    fixed: 'Réparé',
  }
  return map[result] || result
}

const getResultSeverity = (result: string) => {
  const map: Record<string, any> = {
    compliant: 'success',
    non_compliant: 'danger',
    fixed: 'info',
  }
  return map[result] || 'info'
}
</script>
