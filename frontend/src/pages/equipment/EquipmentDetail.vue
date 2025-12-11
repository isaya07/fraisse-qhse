<template>
  <div class="p-4" v-if="equipment">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div class="flex items-center gap-4">
        <Button icon="pi pi-arrow-left" text rounded @click="router.back()" />
        <div>
          <h1 class="text-2xl font-bold text-color">{{ equipment.name }}</h1>
          <p class="text-color-secondary">
            {{ equipment.category?.name }} • {{ equipment.brand }} {{ equipment.model }}
          </p>
        </div>
      </div>
      <div class="flex gap-2 mt-4 md:mt-0">
        <Button
          label="Modifier"
          icon="pi pi-pencil"
          severity="secondary"
          outlined
          @click="openEditDialog"
        />
        <Button
          v-if="equipment.status === 'available'"
          label="Affecter"
          icon="pi pi-user-plus"
          @click="openAssignDialog"
        />
        <Button
          v-if="equipment.status === 'assigned'"
          label="Retourner"
          icon="pi pi-replay"
          severity="warning"
          @click="openReturnDialog"
        />
        <Button
          label="Maintenance"
          icon="pi pi-wrench"
          severity="help"
          @click="openMaintenanceDialog"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Info Card -->
      <div class="lg:col-span-1 space-y-6">
        <div class="surface-card rounded-lg shadow p-6">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-lg font-semibold text-color">Informations</h2>
            <span
              class="px-2 py-1 rounded text-xs font-bold"
              :class="getStatusBadge(equipment.status)"
            >
              {{ getStatusLabel(equipment.status) }}
            </span>
          </div>

          <div v-if="equipment.image_path" class="mb-6 rounded-lg overflow-hidden h-48 bg-surface-100 dark:bg-surface-800">
            <img :src="equipment.image_path" class="w-full h-full object-cover" />
          </div>

          <div class="space-y-4">
            <div>
              <label class="text-xs font-bold text-color-secondary uppercase">Numéro de série</label>
              <p class="text-color font-mono">{{ equipment.serial_number }}</p>
            </div>
            <div>
              <label class="text-xs font-bold text-color-secondary uppercase">Référence Interne</label>
              <p class="text-color">{{ equipment.internal_ref || '-' }}</p>
            </div>
            <div>
              <label class="text-xs font-bold text-color-secondary uppercase">Localisation</label>
              <div class="flex items-center gap-2">
                <font-awesome-icon icon="map-marker-alt" class="text-color-secondary" />
                <p class="text-color">{{ getLocationLabel(equipment.location) }}</p>
              </div>
            </div>
            <div>
              <label class="text-xs font-bold text-color-secondary uppercase">Fréquence de contrôle</label>
              <p class="font-medium text-color">
                {{
                  equipment.maintenance_frequency_months
                    ? `${equipment.maintenance_frequency_months} mois`
                    : 'Non défini'
                }}
              </p>
            </div>
            <div>
              <label class="text-xs font-bold text-color-secondary uppercase"
                >Prochaine vérification</label
              >
              <p
                class="font-medium"
                :class="
                  nextVerificationDate && isExpired(nextVerificationDate)
                    ? 'text-red-600'
                    : 'text-color'
                "
              >
                {{ nextVerificationDate ? formatDate(nextVerificationDate) : 'Non planifiée' }}
                <font-awesome-icon
                  v-if="nextVerificationDate && isExpired(nextVerificationDate)"
                  icon="exclamation-triangle"
                  class="ml-2"
                />
              </p>
            </div>
            <div>
              <label class="text-xs font-bold text-color-secondary uppercase">Date d'achat</label>
              <p class="text-color">{{ formatDate(equipment.purchase_date) }}</p>
            </div>
            <div v-if="equipment.expiration_date">
              <label class="text-xs font-bold text-color-secondary uppercase">Date d'expiration</label>
              <p
                class="font-medium"
                :class="isExpired(equipment.expiration_date) ? 'text-red-600' : 'text-color'"
              >
                {{ formatDate(equipment.expiration_date) }}
                <font-awesome-icon
                  v-if="isExpired(equipment.expiration_date)"
                  icon="exclamation-triangle"
                  class="ml-2"
                />
              </p>
            </div>
          </div>
        </div>

        <!-- Current Assignment -->
        <div
          v-if="equipment.current_assignment"
          class="surface-card rounded-lg shadow p-6 border-l-4 border-blue-500"
        >
          <h2 class="text-lg font-semibold text-color mb-4">Affectation en cours</h2>
          <div class="flex items-center gap-4 mb-4">
            <div
              class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl"
            >
              <font-awesome-icon icon="user" />
            </div>
            <div>
              <p class="font-bold text-color">
                {{ equipment.current_assignment.user?.first_name }}
                {{ equipment.current_assignment.user?.last_name }}
              </p>
              <p class="text-sm text-color-secondary">
                Depuis le {{ formatDateTime(equipment.current_assignment.assigned_at) }}
              </p>
            </div>
          </div>
          <div
            v-if="equipment.current_assignment.notes"
            class="bg-surface-100 dark:bg-surface-800 p-3 rounded text-sm text-color-secondary italic"
          >
            "{{ equipment.current_assignment.notes }}"
          </div>
        </div>
      </div>

      <!-- History & Logs -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Maintenance History -->
        <div class="surface-card rounded-lg shadow p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-color">Historique de Maintenance</h2>
            <Button
              label="Ajouter"
              icon="pi pi-plus"
              size="small"
              text
              @click="openMaintenanceDialog"
            />
          </div>

          <div v-if="store.maintenanceLogs.length === 0" class="text-center py-8 text-color-secondary">
            <p>Aucune maintenance enregistrée</p>
          </div>
          <div v-else class="space-y-4">
              <div
                v-for="log in store.maintenanceLogs"
                :key="log.id"
                class="border-b border-surface-border last:border-0 pb-4 last:pb-0"
              >
                <div class="flex justify-between items-start mb-2">
                  <div class="flex items-center gap-2">
                    <span
                      class="px-2 py-0.5 rounded text-xs font-bold uppercase"
                      :class="getLogTypeBadge(log.type)"
                    >
                      {{ getLogTypeLabel(log.type) }}
                    </span>
                    <span class="text-sm text-color-secondary">{{ formatDate(log.date) }}</span>
                  </div>
                  <span
                    class="text-xs px-2 py-1 rounded font-medium"
                    :class="getResultBadge(log.result)"
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
          </div>
        </div>

        <!-- Assignment History (Placeholder) -->
        <div class="surface-card rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-color mb-4">Historique des Affectations</h2>
          <p class="text-color-secondary italic">Fonctionnalité à venir...</p>
        </div>
      </div>
    </div>

    <!-- Dialogs -->
    <Dialog
      v-model:visible="maintenanceDialogVisible"
      header="Nouvelle Maintenance"
      :modal="true"
      class="p-fluid w-full max-w-lg"
    >
      <MaintenanceForm
        v-if="equipment"
        :equipment-id="equipment.id"
        @save="onMaintenanceSaved"
        @cancel="maintenanceDialogVisible = false"
      />
    </Dialog>

    <Dialog
      v-model:visible="assignmentDialogVisible"
      header="Affecter l'équipement"
      :modal="true"
      class="p-fluid w-full max-w-lg"
    >
      <AssignmentForm
        v-if="equipment"
        :equipment-id="equipment.id"
        @save="onAssignmentSaved"
        @cancel="assignmentDialogVisible = false"
      />
    </Dialog>

    <Dialog
      v-model:visible="editDialogVisible"
      header="Modifier l'équipement"
      :modal="true"
      class="p-fluid w-full max-w-2xl"
    >
      <EquipmentForm
        v-if="equipment"
        :equipment="equipment"
        @save="onEditSaved"
        @cancel="editDialogVisible = false"
      />
    </Dialog>
  </div>
  <div v-else class="flex justify-center py-12">
    <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-color-secondary" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEquipmentStore } from '@/stores/equipment'
import MaintenanceForm from '@/components/equipment/MaintenanceForm.vue'
import AssignmentForm from '@/components/equipment/AssignmentForm.vue'
import EquipmentForm from '@/components/equipment/EquipmentForm.vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { format, addMonths } from 'date-fns'
import { fr } from 'date-fns/locale'

const route = useRoute()
const router = useRouter()
const store = useEquipmentStore()

const equipment = computed(() => store.currentEquipment)
const maintenanceDialogVisible = ref(false)
const assignmentDialogVisible = ref(false)
const editDialogVisible = ref(false)

const nextVerificationDate = computed(() => {
  if (!equipment.value) return null

  // 1. Try to find from logs
  const logs = store.maintenanceLogs
  if (logs && logs.length > 0) {
    // Sort by date desc
    const sortedLogs = [...logs].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
    const lastLog = sortedLogs[0]

    if (lastLog) {
      // If explicitly set in log
      if (lastLog.next_maintenance_date) {
        return new Date(lastLog.next_maintenance_date)
      }

      // If frequency exists, calculate from last log date
      if (equipment.value.maintenance_frequency_months) {
        const lastDate = new Date(lastLog.date)
        return addMonths(lastDate, equipment.value.maintenance_frequency_months)
      }
    }
  }

  // 2. If no logs, but purchased and frequency exists
  if (equipment.value.purchase_date && equipment.value.maintenance_frequency_months) {
    const purchaseDate = new Date(equipment.value.purchase_date)
    return addMonths(purchaseDate, equipment.value.maintenance_frequency_months)
  }

  return null
})

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'available':
      return 'bg-green-100 text-green-700'
    case 'assigned':
      return 'bg-blue-100 text-blue-700'
    case 'maintenance':
      return 'bg-orange-100 text-orange-700'
    case 'broken':
      return 'bg-red-100 text-red-700'
    case 'retired':
      return 'bg-gray-100 text-gray-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    available: 'Disponible',
    assigned: 'Affecté',
    maintenance: 'En Maintenance',
    broken: 'Hors Service',
    retired: 'Rebuté',
  }
  return labels[status] || status
}

const getLocationLabel = (location: string) => {
  const labels: Record<string, string> = {
    warehouse: 'Magasin',
    workshop: 'Atelier',
    office: 'Bureau',
    vehicle: 'Véhicule',
    site: 'Chantier',
  }
  return labels[location] || location
}

const getLogTypeBadge = (type: string) => {
  switch (type) {
    case 'periodic_check':
      return 'bg-blue-100 text-blue-700'
    case 'repair':
      return 'bg-orange-100 text-orange-700'
    case 'calibration':
      return 'bg-purple-100 text-purple-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

const getLogTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    periodic_check: 'Contrôle Périodique',
    repair: 'Réparation',
    calibration: 'Calibration',
  }
  return labels[type] || type
}

const getResultBadge = (result: string) => {
  switch (result) {
    case 'compliant':
      return 'bg-green-100 text-green-700'
    case 'non_compliant':
      return 'bg-red-100 text-red-700'
    case 'fixed':
      return 'bg-blue-100 text-blue-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

const getResultLabel = (result: string) => {
  const labels: Record<string, string> = {
    compliant: 'Conforme',
    non_compliant: 'Non Conforme',
    fixed: 'Réparé',
  }
  return labels[result] || result
}

const formatDate = (date: string | Date) => {
  return format(new Date(date), 'dd MMMM yyyy', { locale: fr })
}

const formatDateTime = (date: string) => {
  return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: fr })
}

const isExpired = (dateStr: string | Date) => {
  return new Date(dateStr) <= new Date()
}

const openEditDialog = () => {
  editDialogVisible.value = true
}
const openAssignDialog = () => {
  assignmentDialogVisible.value = true
}
const openReturnDialog = () => {
  /* TODO: Implement return dialog */
}
const openMaintenanceDialog = () => {
  maintenanceDialogVisible.value = true
}

const onMaintenanceSaved = () => {
  maintenanceDialogVisible.value = false
  // Store updates automatically
}

const onAssignmentSaved = () => {
  assignmentDialogVisible.value = false
}

const onEditSaved = () => {
  editDialogVisible.value = false
}

onMounted(async () => {
  const id = Number(route.params.id)
  if (id) {
    await store.fetchEquipmentDetail(id)
    await store.fetchMaintenanceLogs(id)
  }
})
</script>
