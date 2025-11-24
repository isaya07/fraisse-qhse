<template>
  <div class="p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <h2>Configuration des Indicateurs</h2>
      <div class="flex gap-2">
        <Button
          label="Retour au tableau de bord"
          @click="goToDashboard"
          severity="secondary"
          outlined
        >
          <template #icon>
            <font-awesome-icon icon="chart-line" class="mr-2" />
          </template>
        </Button>
        <Button label="Nouvel indicateur" @click="createNewIndicator" severity="primary">
          <template #icon>
            <font-awesome-icon icon="plus" class="mr-2" />
          </template>
        </Button>
      </div>
    </div>
    <div class="card">
      <DataTable
        ref="dt"
        :value="indicators"
        lazy
        :paginator="true"
        :rows="itemsPerPage"
        :totalRecords="totalRecords"
        :loading="loading"
        @page="onPage"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25, 50]"
        currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} indicateurs"
        tableStyle="min-width: 50rem"
        class="p-datatable-sm"
      >
        <template #header>
          <div class="flex flex-wrap gap-2 items-center justify-between mb-4">
            <h4 class="m-0">Liste des indicateurs</h4>
            <Select
              v-model="categoryFilter"
              :options="categoryOptions"
              optionLabel="name"
              optionValue="id"
              placeholder="Catégorie"
              class="w-full md:w-40"
              showClear
            />
            <Select
              v-model="trendFilter"
              :options="trendOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Tendance"
              class="w-full md:w-40"
              showClear
            />
            <Select
              v-model="statusFilter"
              :options="statusOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Statut"
              class="w-full md:w-40"
              showClear
            />
            <IconField iconPosition="left">
              <InputIcon>
                <font-awesome-icon icon="magnifying-glass" />
              </InputIcon>
              <InputText v-model="searchQuery" placeholder="Rechercher..." />
            </IconField>
          </div>
        </template>

        <template #empty> Aucun indicateur trouvé. </template>

        <Column field="name" header="Nom" sortable style="min-width: 14rem">
          <template #body="{ data }">
            <div class="font-medium">{{ data.name }}</div>
            <div class="text-sm text-gray-500 truncate max-w-xs">{{ data.description }}</div>
          </template>
        </Column>

        <Column
          field="indicator_category.name"
          header="Catégorie"
          sortable
          style="min-width: 10rem"
        >
          <template #body="{ data }">
            {{ data.indicator_category?.name || '-' }}
          </template>
        </Column>

        <Column field="manager" header="Responsable" style="min-width: 12rem">
          <template #body="{ data }">
            <div v-if="data.manager" class="flex items-center gap-2">
              <div
                class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold"
              >
                {{ data.manager.first_name[0] }}{{ data.manager.last_name[0] }}
              </div>
              <span class="text-sm"
                >{{ data.manager.first_name }} {{ data.manager.last_name }}</span
              >
            </div>
            <span v-else class="text-gray-400">-</span>
          </template>
        </Column>

        <Column field="frequency" header="Fréquence" sortable style="min-width: 10rem">
          <template #body="{ data }">
            {{ getFrequencyLabel(data.frequency) }}
          </template>
        </Column>

        <Column field="target_value" header="Cible" sortable style="min-width: 8rem">
          <template #body="{ data }"> {{ data.target_value }} {{ data.unit }} </template>
        </Column>

        <Column field="trend_direction" header="Tendance" sortable style="min-width: 10rem">
          <template #body="{ data }">
            <Tag
              :value="getTrendLabel(data.trend_direction)"
              :severity="getTrendSeverity(data.trend_direction)"
            />
          </template>
        </Column>

        <Column field="is_active" header="Statut" sortable style="min-width: 8rem">
          <template #body="{ data }">
            <Tag
              :value="data.is_active ? 'Actif' : 'Inactif'"
              :severity="data.is_active ? 'success' : 'secondary'"
            />
          </template>
        </Column>

        <Column header="Actions" :exportable="false" style="min-width: 8rem">
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button
                text
                rounded
                severity="info"
                @click="viewIndicator(data.id)"
                v-tooltip.top="'Voir'"
              >
                <font-awesome-icon icon="eye" />
              </Button>
              <Button
                text
                rounded
                severity="success"
                @click="editIndicator(data.id)"
                v-tooltip.top="'Modifier'"
              >
                <font-awesome-icon icon="pencil" />
              </Button>
              <Button
                text
                rounded
                severity="danger"
                @click="confirmDelete(data)"
                v-tooltip.top="'Supprimer'"
              >
                <font-awesome-icon icon="trash" />
              </Button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useIndicatorStore } from '@/stores/indicators'
import { useIndicatorCategoryStore } from '@/stores/indicatorCategories'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Tag from 'primevue/tag'
import Select from 'primevue/select'
import type { Indicator } from '@/stores/app'

// Interface pour l'événement de pagination DataTable
interface PageEvent {
  page: number
  first: number
  rows: number
  pageCount: number
}

const router = useRouter()
const indicatorStore = useIndicatorStore()
const indicatorCategoryStore = useIndicatorCategoryStore()
const confirm = useConfirm()
const toast = useToast()

// États
const searchQuery = ref('')
const categoryFilter = ref(null)
const trendFilter = ref(null)
const statusFilter = ref(null)
const itemsPerPage = ref(10)
const currentPage = ref(0)

// Accès au store
const indicators = computed(() => indicatorStore.indicators)
const loading = computed(() => indicatorStore.loading)
const totalRecords = computed(() => indicatorStore.pagination.total)

// Options pour les filtres
const categoryOptions = computed(() => indicatorCategoryStore.categories)

const trendOptions = [
  { label: 'Positive', value: 'positive' },
  { label: 'Négative', value: 'negative' },
  { label: 'Neutre', value: 'neutral' },
]

const statusOptions = [
  { label: 'Actif', value: 'true' },
  { label: 'Inactif', value: 'false' },
]

// Chargement des données
const loadIndicators = async () => {
  const filters = {
    search: searchQuery.value,
    indicator_category_id: categoryFilter.value,
    trend_direction: trendFilter.value,
    is_active: statusFilter.value,
  }
  await indicatorStore.fetchIndicators(currentPage.value + 1, itemsPerPage.value, filters)
}

const onPage = (event: PageEvent) => {
  currentPage.value = event.page
  itemsPerPage.value = event.rows
  loadIndicators()
}

// Helpers pour l'affichage

const getFrequencyLabel = (value: string) => {
  const map: Record<string, string> = {
    daily: 'Quotidienne',
    weekly: 'Hebdomadaire',
    monthly: 'Mensuelle',
    quarterly: 'Trimestrielle',
    yearly: 'Annuelle',
  }
  return map[value] || value
}

const getTrendLabel = (value: string) => {
  const map: Record<string, string> = {
    positive: 'Positive',
    negative: 'Négative',
    neutral: 'Neutre',
  }
  return map[value] || value
}

const getTrendSeverity = (value: string): string => {
  const map: Record<string, string> = {
    positive: 'success',
    negative: 'danger',
    neutral: 'info',
  }
  return map[value] || 'info'
}

// Actions
const createNewIndicator = () => {
  router.push('/indicators/create')
}

const viewIndicator = (id: number) => {
  router.push(`/indicators/${id}`)
}

const editIndicator = (id: number) => {
  router.push(`/indicators/${id}/edit`)
}

const goToDashboard = () => {
  router.push('/indicators')
}

const confirmDelete = (indicator: Indicator) => {
  confirm.require({
    message: `Voulez-vous vraiment supprimer l'indicateur "${indicator.name}" ?`,
    header: 'Confirmation de suppression',
    icon: 'exclamation-triangle',
    rejectLabel: 'Annuler',
    acceptLabel: 'Supprimer',
    rejectClass: 'p-button-secondary p-button-outlined',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await indicatorStore.deleteIndicator(indicator.id)
        toast.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Indicateur supprimé',
          life: 3000,
        })
        loadIndicators()
      } catch (error) {
        console.error('Erreur lors de la suppression:', error)
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Impossible de supprimer l'indicateur",
          life: 3000,
        })
      }
    },
  })
}

// Watchers
watch([searchQuery, categoryFilter, trendFilter, statusFilter], () => {
  currentPage.value = 0
  loadIndicators()
})

onMounted(() => {
  indicatorCategoryStore.fetchCategories()
  loadIndicators()
})
</script>
