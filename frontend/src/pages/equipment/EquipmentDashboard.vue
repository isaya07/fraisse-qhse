<template>
  <div class="p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h2>Gestion des Équipements & EPI</h2>
      <div class="flex gap-2">
        <Button label="Nouvel équipement" icon="pi pi-plus" @click="openEquipmentDialog" />
      </div>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <StatTile
        title="Total Équipements"
        :value="store.equipmentList.length"
        icon="tools"
        color="blue"
        :loading="store.loading"
      />
      <StatTile
        title="Disponibles"
        :value="availableCount"
        icon="check-circle"
        color="green"
        :loading="store.loading"
      />
      <StatTile
        title="En Maintenance"
        :value="maintenanceCount"
        icon="wrench"
        color="orange"
        :loading="store.loading"
      />
      <StatTile
        title="EPI Expirés / À contrôler"
        :value="expiredCount"
        icon="exclamation-triangle"
        color="red"
        :loading="store.loading"
      />
    </div>

    <!-- Categories Grid (Compact Style) -->
    <h3 class="pb-4">Parcourir par catégorie</h3>

    <div v-if="store.loading && !store.categories.length" class="flex justify-center py-12">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-color-secondary" />
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
      <Card
        v-for="category in store.categories"
        :key="category.id"
        class="hover:shadow-md transition-all cursor-pointer group"
        @click="filterByCategory(category.id)"
      >
        <template #content>
          <div class="flex items-center gap-3">
            <div
              class="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg shadow-sm"
              :style="{ backgroundColor: category.color || '#64748B' }"
            >
              <font-awesome-icon :icon="category.icon || 'box'" />
            </div>
            <div class="flex-1 min-w-0">
              <h5 class="truncate">{{ category.name }}</h5>
              <p class="text-xs text-color-secondary">
                {{ category.equipment_count || 0 }} éléments
              </p>
            </div>
            <font-awesome-icon
              icon="chevron-right"
              class="text-surface-300 group-hover:text-blue-500 transition-colors text-lg"
            />
          </div>
        </template>
      </Card>

      <!-- Add Category Compact Card -->
      <div
        class="border border-dashed border-surface-border rounded-xl flex items-center gap-3 p-3 cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
        @click="openCategoryDialog"
      >
        <div
          class="w-10 h-10 rounded-lg bg-surface-100 dark:bg-surface-800 flex items-center justify-center text-color-secondary group-hover:text-blue-500 transition-colors"
        >
          <font-awesome-icon icon="plus" />
        </div>
        <span
          class="text-color-secondary font-medium text-sm group-hover:text-blue-500 transition-colors"
          >Nouvelle catégorie</span
        >
      </div>
    </div>

    <!-- Recent Activity / Alerts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Alerts Section -->
      <Card>
        <template #content>
          <h4 class="pb-2">
            <font-awesome-icon icon="bell" class="text-red-500" />
            Alertes & Rappels
          </h4>

          <div v-if="expiredEquipment.length === 0" class="text-center py-8 text-color-secondary">
            <font-awesome-icon icon="check-circle" class="text-green-500 text-3xl mb-2" />
            <p>Tout est en ordre !</p>
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="item in expiredEquipment.slice(0, 5)"
              :key="item.id"
              class="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-800"
            >
              <div class="flex items-center gap-3">
                <font-awesome-icon icon="exclamation-circle" class="text-red-500" />
                <div>
                  <p class="font-medium text-color">{{ item.name }}</p>
                  <p class="text-xs text-red-600 dark:text-red-400">
                    {{ getExpirationLabel(item) }}
                  </p>
                </div>
              </div>
              <Button
                label="Voir"
                size="small"
                severity="danger"
                text
                @click="viewEquipment(item)"
              />
            </div>
          </div>
        </template>
      </Card>

      <!-- Quick Actions / Recent Logs -->
      <Card>
        <template #content>
          <h4 class="pb-2">
            <font-awesome-icon icon="history" class="text-blue-500" />
            Dernières interventions
          </h4>
          <div
            v-if="store.maintenanceLogs.length === 0"
            class="text-center py-8 text-color-secondary"
          >
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
                  class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs shadow-sm"
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
              <span
                class="text-xs px-2 py-1 rounded font-medium"
                :class="getResultBadge(log.result)"
              >
                {{ getResultLabel(log.result) }}
              </span>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useEquipmentStore, type Equipment } from '@/stores/equipment'
import Button from 'primevue/button'
import StatTile from '@/components/common/StatTile.vue'
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
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
    case 'non_compliant':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
    case 'fixed':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
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
