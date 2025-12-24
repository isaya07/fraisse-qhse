<template>
  <Card>
    <template #content>
      <div
        class="h-32 bg-surface-100 dark:bg-surface-800 rounded-t-lg flex items-center justify-center relative overflow-hidden mb-4"
      >
        <img
          v-if="equipment.image_path"
          :src="equipment.image_path"
          class="w-full h-full object-cover"
        />
        <div v-else class="text-color-secondary flex flex-col items-center">
          <font-awesome-icon :icon="equipment.category?.icon || 'tools'" class="text-3xl mb-2" />
          <span class="text-xs">{{ equipment.category?.name }}</span>
        </div>

        <!-- Status Badge -->
        <div class="absolute top-2 right-2">
          <Tag
            :value="getStatusLabel(equipment.status)"
            :severity="getStatusSeverity(equipment.status)"
            class="px-2 py-1 text-xs font-bold"
          />
        </div>
      </div>
      <div class="flex flex-col gap-3">
        <div class="flex items-baseline">
          <span class="text-base font-medium text-color-secondary w-40 shrink-0"
            >Numéro de série :</span
          >
          <span class="text-color font-mono">{{ equipment.serial_number }}</span>
        </div>
        <div class="flex items-baseline">
          <span class="text-base font-medium text-color-secondary w-40 shrink-0"
            >Référence Interne :</span
          >
          <span class="text-color">{{ equipment.internal_ref || '-' }}</span>
        </div>
        <div class="flex items-baseline">
          <span class="text-base font-medium text-color-secondary w-40 shrink-0">Catégorie :</span>
          <span class="text-color">{{ equipment.category?.name || '-' }}</span>
        </div>
        <div class="flex items-baseline">
          <span class="text-base font-medium text-color-secondary w-40 shrink-0">Marque :</span>
          <span class="text-color">{{ equipment.brand || '-' }}</span>
        </div>
        <div class="flex items-baseline">
          <span class="text-base font-medium text-color-secondary w-40 shrink-0">Modèle :</span>
          <span class="text-color">{{ equipment.model || '-' }}</span>
        </div>
        <div class="flex items-baseline">
          <span class="text-base font-medium text-color-secondary w-40 shrink-0"
            >Localisation :</span
          >
          <span class="text-color">{{ getLocationLabel(equipment.location) }}</span>
        </div>
        <div class="flex items-baseline">
          <span class="text-base font-medium text-color-secondary w-40 shrink-0"
            >Date d'achat :</span
          >
          <span class="text-color">{{ formatDate(equipment.purchase_date) }}</span>
        </div>
        <div class="flex items-baseline">
          <span class="text-base font-medium text-color-secondary w-40 shrink-0"
            >Prochaine Maint. :</span
          >
          <span :class="getNextMaintenanceClass(equipment)">{{
            getNextMaintenanceDate(equipment)
          }}</span>
        </div>
      </div>

      <div class="flex gap-2 mt-6 pt-4 border-t border-surface-border">
        <Button label="Modifier" outlined class="flex-1 p-button-sm" @click="$emit('edit')">
          <template #icon>
            <font-awesome-icon icon="pen" class="mr-2" />
          </template>
        </Button>
        <Button
          label="Supprimer"
          outlined
          severity="danger"
          class="flex-1 p-button-sm"
          @click="$emit('delete')"
        >
          <template #icon>
            <font-awesome-icon icon="trash" class="mr-2" />
          </template>
        </Button>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import { format, addMonths, isPast, isToday } from 'date-fns'
import { fr } from 'date-fns/locale'

defineProps<{
  equipment: any
}>()

defineEmits(['edit', 'delete'])

const getStatusLabel = (status: string) => {
  const map: Record<string, string> = {
    available: 'Disponible',
    assigned: 'Assigné',
    maintenance: 'En Maintenance',
    broken: 'Hors Service',
    retired: 'Rebuté',
  }
  return map[status] || status
}

const getStatusSeverity = (status: string) => {
  const map: Record<string, any> = {
    available: 'success',
    assigned: 'info',
    maintenance: 'warn',
    broken: 'danger',
    retired: 'secondary',
  }
  return map[status] || 'info'
}

const getLocationLabel = (location: string) => {
  const map: Record<string, string> = {
    warehouse: 'Entrepôt',
    workshop: 'Atelier',
    office: 'Bureau',
    vehicle: 'Véhicule',
    site: 'Chantier',
  }
  return map[location] || location
}

const formatDate = (date: string | null) => {
  if (!date) return '-'
  return format(new Date(date), 'dd MMMM yyyy', { locale: fr })
}

const getNextMaintenanceDate = (equipment: any) => {
  // If we have explicit next maintenance date (calculated or set), use it
  // But logic depends on where it comes from. For now let's assume periodic check logs or property.
  // If not on equipment object directly, simple calculation based on purchase/last maintenance + frequency
  if (equipment.maintenance_frequency_months && equipment.purchase_date) {
    const lastDate = equipment.purchase_date // Fallback
    // Real logic would find last periodic check
    const nextDate = addMonths(new Date(lastDate), equipment.maintenance_frequency_months)
    return format(nextDate, 'dd MMMM yyyy', { locale: fr })
  }
  return '-'
}

const getNextMaintenanceClass = (equipment: any) => {
  if (equipment.maintenance_frequency_months && equipment.purchase_date) {
    const lastDate = equipment.purchase_date
    const nextDate = addMonths(new Date(lastDate), equipment.maintenance_frequency_months)
    if (isPast(nextDate) && !isToday(nextDate)) return 'text-red-500 font-bold'
    if (isToday(nextDate)) return 'text-orange-500 font-bold'
  }
  return 'text-900'
}
</script>
