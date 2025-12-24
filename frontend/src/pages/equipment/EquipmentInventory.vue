<template>
  <div class="p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h2>Inventaire Équipements</h2>
      <Button label="Nouvel équipement" icon="pi pi-plus" @click="openEquipmentDialog" />
    </div>

    <!-- Filters -->
    <Card class="mb-6">
      <template #content>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="field">
            <label class="block text-sm font-medium text-color-secondary mb-1">Recherche</label>
            <span class="p-input-icon-left w-full">
              <i class="pi pi-search" />
              <InputText v-model="filters.search" placeholder="Nom, série, réf..." class="w-full" />
            </span>
          </div>
          <div class="field">
            <label class="block text-sm font-medium text-color-secondary mb-1">Catégorie</label>
            <Select
              v-model="filters.category_id"
              :options="store.categories"
              optionLabel="name"
              optionValue="id"
              placeholder="Toutes les catégories"
              showClear
              class="w-full"
            />
          </div>
          <div class="field">
            <label class="block text-sm font-medium text-color-secondary mb-1">Statut</label>
            <Select
              v-model="filters.status"
              :options="statusOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Tous les statuts"
              showClear
              class="w-full"
            />
          </div>
          <div class="field">
            <label class="block text-sm font-medium text-color-secondary mb-1">Localisation</label>
            <Select
              v-model="filters.location"
              :options="locationOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Toutes les localisations"
              showClear
              class="w-full"
            />
          </div>
        </div>
      </template>
    </Card>

    <!-- Equipment Grid -->
    <div v-if="store.loading" class="flex justify-center py-12">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-color-secondary" />
    </div>
    <div
      v-else-if="filteredEquipment.length === 0"
      class="text-center py-12 surface-card rounded-lg shadow"
    >
      <font-awesome-icon icon="box-open" class="text-color-secondary text-5xl mb-4" />
      <p class="text-color-secondary text-lg">Aucun équipement trouvé</p>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <Card
        v-for="item in filteredEquipment"
        :key="item.id"
        class="surface-card rounded-lg shadow hover:shadow-md transition-all cursor-pointer border border-surface-border flex flex-col"
        @click="viewEquipment(item)"
      >
        <template #content>
          <!-- Header / Image Placeholder -->
          <div
            class="h-32 bg-surface-100 dark:bg-surface-800 rounded-t-lg flex items-center justify-center relative overflow-hidden"
          >
            <img v-if="item.image_path" :src="item.image_path" class="w-full h-full object-cover" />
            <div v-else class="text-color-secondary flex flex-col items-center">
              <font-awesome-icon :icon="item.category?.icon || 'tools'" class="text-3xl mb-2" />
              <span class="text-xs">{{ item.category?.name }}</span>
            </div>

            <!-- Status Badge -->
            <div
              class="absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold shadow-sm"
              :class="getStatusBadge(item.status)"
            >
              {{ getStatusLabel(item.status) }}
            </div>
          </div>

          <!-- Content -->
          <div class="p-4 flex-1 flex flex-col">
            <h4 class="font-bold text-color mb-1 truncate" :title="item.name">{{ item.name }}</h4>
            <p class="text-sm text-color-secondary mb-2 truncate">
              Ref: {{ item.internal_ref || item.serial_number }}
            </p>

            <div class="mt-auto space-y-2">
              <div class="flex items-center text-sm text-color-secondary">
                <font-awesome-icon icon="map-marker-alt" class="w-4 mr-2 text-color-secondary" />
                <span>{{ getLocationLabel(item.location) }}</span>
              </div>

              <div v-if="item.current_assignment" class="flex items-center text-sm text-blue-600">
                <font-awesome-icon icon="user" class="w-4 mr-2" />
                <span class="truncate">
                  {{ item.current_assignment.user?.first_name }}
                  {{ item.current_assignment.user?.last_name }}
                </span>
              </div>

              <div
                v-if="item.expiration_date"
                class="flex items-center text-sm"
                :class="
                  isExpired(item.expiration_date)
                    ? 'text-red-600 font-bold'
                    : 'text-color-secondary'
                "
              >
                <font-awesome-icon
                  icon="clock"
                  class="w-4 mr-2"
                  :class="isExpired(item.expiration_date) ? 'text-red-500' : 'text-color-secondary'"
                />
                <span>Exp: {{ formatDate(item.expiration_date) }}</span>
              </div>

              <div
                v-if="item.maintenance_frequency_months"
                class="flex items-center text-sm text-color-secondary"
              >
                <font-awesome-icon icon="calendar-check" class="w-4 mr-2 text-color-secondary" />
                <span>Freq: {{ item.maintenance_frequency_months }} mois</span>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- Dialog -->
    <Dialog
      v-model:visible="equipmentDialogVisible"
      header="Nouvel équipement"
      :modal="true"
      class="p-fluid w-full max-w-2xl"
    >
      <EquipmentForm @save="onEquipmentSaved" @cancel="equipmentDialogVisible = false" />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEquipmentStore, type Equipment } from '@/stores/equipment'
import EquipmentForm from '@/components/equipment/EquipmentForm.vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Dialog from 'primevue/dialog'
import { format } from 'date-fns'

const route = useRoute()
const router = useRouter()
const store = useEquipmentStore()

const equipmentDialogVisible = ref(false)

const filters = ref({
  search: '',
  category_id: null as number | null,
  status: null as string | null,
  location: null as string | null,
})

const statusOptions = [
  { label: 'Disponible', value: 'available' },
  { label: 'Affecté', value: 'assigned' },
  { label: 'En Maintenance', value: 'maintenance' },
  { label: 'Hors Service', value: 'broken' },
  { label: 'Rebuté', value: 'retired' },
]

const locationOptions = [
  { label: 'Magasin', value: 'warehouse' },
  { label: 'Atelier', value: 'workshop' },
  { label: 'Bureau', value: 'office' },
  { label: 'Véhicule', value: 'vehicle' },
  { label: 'Chantier', value: 'site' },
]

const filteredEquipment = computed(() => {
  return store.equipmentList.filter((item) => {
    // Search
    if (filters.value.search) {
      const searchLower = filters.value.search.toLowerCase()
      const matchesName = item.name.toLowerCase().includes(searchLower)
      const matchesRef = (item.internal_ref || '').toLowerCase().includes(searchLower)
      const matchesSerial = item.serial_number.toLowerCase().includes(searchLower)
      if (!matchesName && !matchesRef && !matchesSerial) return false
    }

    // Category
    if (filters.value.category_id && item.category_id !== filters.value.category_id) return false

    // Status
    if (filters.value.status && item.status !== filters.value.status) return false

    // Location
    if (filters.value.location && item.location !== filters.value.location) return false

    return true
  })
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
  const option = statusOptions.find((o) => o.value === status)
  return option ? option.label : status
}

const getLocationLabel = (location: string) => {
  const option = locationOptions.find((o) => o.value === location)
  return option ? option.label : location
}

const formatDate = (date: string) => {
  return format(new Date(date), 'dd/MM/yyyy')
}

const isExpired = (dateStr: string) => {
  return new Date(dateStr) <= new Date()
}

const openEquipmentDialog = () => {
  equipmentDialogVisible.value = true
}

const onEquipmentSaved = () => {
  equipmentDialogVisible.value = false
  // Refresh list if needed, but store should handle it
}

const viewEquipment = (item: Equipment) => {
  router.push(`/equipment/${item.id}`)
}

// Initialize filters from query params
onMounted(async () => {
  await Promise.all([store.fetchCategories(), store.fetchEquipment()])

  if (route.query.category) {
    filters.value.category_id = Number(route.query.category)
  }
})

// Update query params when filters change (optional, but good for UX)
watch(
  () => filters.value.category_id,
  (newVal) => {
    if (newVal) {
      router.replace({ query: { ...route.query, category: newVal } })
    } else {
      const query = { ...route.query }
      delete query.category
      router.replace({ query })
    }
  },
)
</script>
