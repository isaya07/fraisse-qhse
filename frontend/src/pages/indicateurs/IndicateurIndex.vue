<template>
  <div class="p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Indicateurs & KPI</h1>
      <Button
        icon="pi pi-plus"
        label="Nouvel indicateur"
        @click="createNewIndicator"
        class="p-button-primary"
      />
    </div>

    <!-- Barre de recherche et filtres -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <div class="flex-grow">
        <div class="relative">
          <input
            v-model="searchQuery"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            type="text"
            placeholder="Rechercher un indicateur..."
          />
          <div class="absolute inset-y-0 right-0 flex items-center pr-3">
            <font-awesome-icon :icon="['fas', 'search']" class="text-gray-400" />
          </div>
        </div>
      </div>
    </div>

    <!-- Filtres additionnels -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
        <p-dropdown
          v-model="categoryFilter"
          :options="categoryOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Toutes les catégories"
          class="w-full"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Tendance</label>
        <p-dropdown
          v-model="trendFilter"
          :options="trendOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Toutes les tendances"
          class="w-full"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Statut</label>
        <p-dropdown
          v-model="statusFilter"
          :options="statusOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Tous les statuts"
          class="w-full"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Tri</label>
        <p-dropdown
          v-model="sortOrder"
          :options="sortOptions"
          optionLabel="label"
          optionValue="value"
          class="w-full"
        />
      </div>
    </div>

    <!-- Liste des indicateurs -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-gray-500" />
    </div>

    <div v-else-if="indicators.length === 0" class="flex justify-center items-center py-12">
      <p class="text-lg text-gray-600">Aucun indicateur trouvé</p>
    </div>

    <div v-else>
      <div class="mb-8">
        <IndicatorCard
          v-for="indicator in indicators"
          :key="indicator.id"
          :indicator="indicator"
          @view="viewIndicator"
          @edit="editIndicator"
          @delete="deleteIndicator"
        />
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-8">
        <p-paginator
          :rows="itemsPerPage.value"
          :totalRecords="indicatorStore.pagination.totalItems"
          :pageLinkSize="3"
          :currentPageReportTemplate="'Affichage {first} à {last} de {totalRecords}'"
          @page="onPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import PDropdown from 'primevue/dropdown'
import PPaginator from 'primevue/paginator'
import IndicatorCard from '@/components/indicators/IndicatorCard.vue'
import { useIndicatorStore } from '@/stores/indicators'

const router = useRouter()
const indicatorStore = useIndicatorStore()

// États locaux
const searchQuery = ref('')
const categoryFilter = ref('')
const trendFilter = ref('')
const statusFilter = ref('')
const sortOrder = ref('name')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Options pour les filtres
const categoryOptions = [
  { label: 'Toutes les catégories', value: '' },
  { label: 'Sécurité', value: 'safety' },
  { label: 'Qualité', value: 'quality' },
  { label: 'Environnement', value: 'environment' },
  { label: 'Hygiène', value: 'health' },
]

const trendOptions = [
  { label: 'Toutes les tendances', value: '' },
  { label: 'Positive', value: 'positive' },
  { label: 'Négative', value: 'negative' },
  { label: 'Neutre', value: 'neutral' },
]

const statusOptions = [
  { label: 'Tous les statuts', value: '' },
  { label: 'Actif', value: 'true' },
  { label: 'Inactif', value: 'false' },
]

const sortOptions = [
  { label: 'Par nom', value: 'name' },
  { label: 'Par code', value: 'code' },
  { label: 'Par catégorie', value: 'category' },
]

// Fonction pour charger les indicateurs
const loadIndicators = async () => {
  await indicatorStore.fetchIndicators(currentPage.value, itemsPerPage.value)
}

const viewIndicator = (id: number) => {
  router.push(`/indicators/${id}`)
}

const editIndicator = (id: number) => {
  router.push(`/indicators/${id}/edit`)
}

const createNewIndicator = () => {
  router.push('/indicators/create')
}

const deleteIndicator = async (id: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet indicateur ?')) {
    try {
      await indicatorStore.deleteIndicator(id)
      // Recharger la liste après suppression
      await loadIndicators()
    } catch (error) {
      console.error("Erreur lors de la suppression de l'indicateur:", error)
    }
  }
}

const onPageChange = async (event: { page: number }) => {
  currentPage.value = event.page + 1
  await loadIndicators()
}

// Charger les indicateurs au montage
onMounted(() => {
  loadIndicators()
})

// Accéder aux indicateurs et état de chargement depuis le store
const indicators = computed(() => indicatorStore.indicators)
const loading = computed(() => indicatorStore.loading)
</script>

<style scoped>
@reference "@/assets/css/tailwind.css";

.indicators-page {
  @apply p-4;
}

.indicators-list {
  @apply mb-8;
}
</style>
