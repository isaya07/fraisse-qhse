<template>
  <div class="p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 class="text-2xl font-bold text-color mb-4 md:mb-0">Gestion des Équipements & EPI</h1>
      <div class="flex gap-2">
        <Button label="Nouvel équipement" icon="pi pi-plus" @click="openEquipmentDialog" />
      </div>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="surface-card rounded-lg shadow p-4 border-l-4 border-blue-500">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-color-secondary text-sm font-medium">Total Équipements</p>
            <h3 class="text-2xl font-bold text-color mt-1">{{ store.equipmentList.length }}</h3>
          </div>
          <div class="bg-blue-100 p-2 rounded-full text-blue-600">
            <font-awesome-icon icon="tools" />
          </div>
        </div>
      </div>

      <div class="surface-card rounded-lg shadow p-4 border-l-4 border-green-500">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-color-secondary text-sm font-medium">Disponibles</p>
            <h3 class="text-2xl font-bold text-color mt-1">{{ availableCount }}</h3>
          </div>
          <div class="bg-green-100 p-2 rounded-full text-green-600">
            <font-awesome-icon icon="check-circle" />
          </div>
        </div>
      </div>

      <div class="surface-card rounded-lg shadow p-4 border-l-4 border-orange-500">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-color-secondary text-sm font-medium">En Maintenance</p>
            <h3 class="text-2xl font-bold text-color mt-1">{{ maintenanceCount }}</h3>
          </div>
          <div class="bg-orange-100 p-2 rounded-full text-orange-600">
            <font-awesome-icon icon="wrench" />
          </div>
        </div>
      </div>

      <div class="surface-card rounded-lg shadow p-4 border-l-4 border-red-500">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-color-secondary text-sm font-medium">EPI Expirés / À contrôler</p>
            <h3 class="text-2xl font-bold text-color mt-1">{{ expiredCount }}</h3>
          </div>
          <div class="bg-red-100 p-2 rounded-full text-red-600">
            <font-awesome-icon icon="exclamation-triangle" />
          </div>
        </div>
      </div>
    </div>

    <!-- Categories Grid -->
    <h2 class="text-xl font-semibold text-color mb-4">Parcourir par catégorie</h2>
    <div v-if="store.loading && !store.categories.length" class="flex justify-center py-12">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-color-secondary" />
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      <div
        v-for="category in store.categories"
        :key="category.id"
        class="surface-card rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer p-4 border border-surface-border"
        @click="filterByCategory(category.id)"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl"
            :style="{ backgroundColor: category.color || '#64748B' }"
          >
            <font-awesome-icon :icon="category.icon || 'box'" />
          </div>
          <div>
            <h3 class="font-semibold text-color">{{ category.name }}</h3>
            <p class="text-sm text-color-secondary">{{ category.equipment_count || 0 }} éléments</p>
          </div>
        </div>
      </div>

      <!-- Add Category Card -->
      <div
        class="border-2 border-dashed border-surface-border rounded-lg flex flex-col items-center justify-center p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors min-h-[80px]"
        @click="openCategoryDialog"
      >
        <font-awesome-icon icon="plus" class="text-color-secondary text-xl mb-2" />
        <span class="text-color-secondary font-medium text-sm">Nouvelle catégorie</span>
      </div>
    </div>

    <!-- Recent Activity / Alerts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Alerts Section -->
      <div class="surface-card rounded-lg shadow p-4">
        <h3 class="font-semibold text-color mb-4 flex items-center gap-2">
          <font-awesome-icon icon="bell" class="text-red-500" />
          Alertes & Rappels
        </h3>
        <div v-if="expiredEquipment.length === 0" class="text-center py-8 text-color-secondary">
          <font-awesome-icon icon="check-circle" class="text-green-500 text-3xl mb-2" />
          <p>Tout est en ordre !</p>
        </div>
        <div v-else class="space-y-3">
          <div
            v-for="item in expiredEquipment.slice(0, 5)"
            :key="item.id"
            class="flex items-center justify-between p-3 bg-red-50 rounded border border-red-100"
          >
            <div class="flex items-center gap-3">
              <font-awesome-icon icon="exclamation-circle" class="text-red-500" />
              <div>
                <p class="font-medium text-color">{{ item.name }}</p>
                <p class="text-xs text-red-600">
                  {{ getExpirationLabel(item) }}
                </p>
              </div>
            </div>
            <Button label="Voir" size="small" severity="danger" text @click="viewEquipment(item)" />
          </div>
        </div>
      </div>

      <!-- Quick Actions / Recent Logs -->
      <div class="surface-card rounded-lg shadow p-4">
        <h3 class="font-semibold text-color mb-4 flex items-center gap-2">
          <font-awesome-icon icon="history" class="text-blue-500" />
          Dernières interventions
        </h3>
        <div v-if="store.maintenanceLogs.length === 0" class="text-center py-8 text-color-secondary">
          <p>Aucun historique récent</p>
        </div>
        <div v-else class="space-y-3">
          <div
            v-for="log in store.maintenanceLogs.slice(0, 5)"
            :key="log.id"
            class="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-800 rounded border border-surface-border"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
                :class="getLogColor(log.type)"
              >
                <font-awesome-icon :icon="getLogIcon(log.type)" />
              </div>
              <div>
                <p class="font-medium text-color">
                  {{ log.equipment?.name || 'Équipement inconnu' }}
                </p>
                <p class="text-xs text-color-secondary">
                  {{ formatDate(log.date) }} - {{ log.performer }}
                </p>
              </div>
            </div>
            <span class="text-xs px-2 py-1 rounded font-medium" :class="getResultBadge(log.result)">
              {{ getResultLabel(log.result) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useEquipmentStore, type Equipment, type MaintenanceLog } from '@/stores/equipment'
import Button from 'primevue/button'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const router = useRouter()
const store = useEquipmentStore()

const availableCount = computed(
  () => store.equipmentList.filter((e) => e.status === 'available').length,
)
const maintenanceCount = computed(
  () => store.equipmentList.filter((e) => e.status === 'maintenance').length,
)

const expiredEquipment = computed(() => {
  const today = new Date()
  return store.equipmentList.filter((e) => {
    if (e.expiration_date) {
      return new Date(e.expiration_date) <= today
    }
    return false
  })
})

const expiredCount = computed(() => expiredEquipment.value.length)

const formatDate = (date: string) => {
  return format(new Date(date), 'dd MMM yyyy', { locale: fr })
}

const getExpirationLabel = (item: Equipment) => {
  if (!item.expiration_date) return ''
  const date = new Date(item.expiration_date)
  return `Expiré le ${format(date, 'dd/MM/yyyy')}`
}

const getLogColor = (type: string) => {
  switch (type) {
    case 'periodic_check':
      return 'bg-blue-500'
    case 'repair':
      return 'bg-orange-500'
    case 'calibration':
      return 'bg-purple-500'
    default:
      return 'bg-gray-500'
  }
}

const getLogIcon = (type: string) => {
  switch (type) {
    case 'periodic_check':
      return 'clipboard-check'
    case 'repair':
      return 'tools'
    case 'calibration':
      return 'balance-scale'
    default:
      return 'file'
  }
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
  switch (result) {
    case 'compliant':
      return 'Conforme'
    case 'non_compliant':
      return 'Non Conforme'
    case 'fixed':
      return 'Réparé'
    default:
      return result
  }
}

const filterByCategory = (categoryId: number) => {
  router.push({ path: '/equipment/inventory', query: { category: categoryId } })
}

const openEquipmentDialog = () => {
  // TODO: Implement dialog or navigate to create page
  router.push('/equipment/inventory')
}

const openCategoryDialog = () => {
  // TODO: Implement category dialog
}

const viewEquipment = (item: Equipment) => {
  router.push(`/equipment/${item.id}`)
}

onMounted(async () => {
  await Promise.all([store.fetchCategories(), store.fetchEquipment(), store.fetchMaintenanceLogs()])
})
</script>
