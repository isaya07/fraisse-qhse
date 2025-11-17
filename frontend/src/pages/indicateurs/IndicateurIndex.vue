<template>
  <div class="indicators-page">
    <div class="level">
      <div class="level-left">
        <h1 class="title">Indicateurs & KPI</h1>
      </div>
      <div class="level-right">
        <Button
          :icon="['fas', 'plus']"
          text="Nouvel indicateur"
          variant="primary"
          @click="createNewIndicator"
        />
      </div>
    </div>

    <!-- Barre de recherche et filtres -->
    <div class="field has-addons mb-5">
      <div class="control is-expanded">
        <input
          v-model="searchQuery"
          class="input"
          type="text"
          placeholder="Rechercher un indicateur..."
        />
      </div>
      <div class="control">
        <button class="button is-info">
          <font-awesome-icon :icon="['fas', 'search']" />
        </button>
      </div>
    </div>

    <!-- Filtres additionnels -->
    <div class="columns mb-5">
      <div class="column is-3">
        <div class="field">
          <label class="label">Catégorie</label>
          <div class="select is-fullwidth">
            <select v-model="categoryFilter">
              <option value="">Toutes les catégories</option>
              <option value="safety">Sécurité</option>
              <option value="quality">Qualité</option>
              <option value="environment">Environnement</option>
              <option value="health">Hygiène</option>
            </select>
          </div>
        </div>
      </div>
      <div class="column is-3">
        <div class="field">
          <label class="label">Tendance</label>
          <div class="select is-fullwidth">
            <select v-model="trendFilter">
              <option value="">Toutes les tendances</option>
              <option value="positive">Positive</option>
              <option value="negative">Négative</option>
              <option value="neutral">Neutre</option>
            </select>
          </div>
        </div>
      </div>
      <div class="column is-3">
        <div class="field">
          <label class="label">Statut</label>
          <div class="select is-fullwidth">
            <select v-model="statusFilter">
              <option value="">Tous les statuts</option>
              <option value="true">Actif</option>
              <option value="false">Inactif</option>
            </select>
          </div>
        </div>
      </div>
      <div class="column is-3">
        <div class="field">
          <label class="label">Tri</label>
          <div class="select is-fullwidth">
            <select v-model="sortOrder">
              <option value="name">Par nom</option>
              <option value="code">Par code</option>
              <option value="category">Par catégorie</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Liste des indicateurs -->
    <div v-if="loading" class="has-text-centered py-6">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" />
    </div>

    <div v-else-if="indicators.length === 0" class="has-text-centered py-6">
      <p class="is-size-5">Aucun indicateur trouvé</p>
    </div>

    <div v-else>
      <div class="indicators-list">
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
      <nav class="pagination is-centered" role="navigation" aria-label="pagination">
        <a
          :class="['pagination-previous', { 'is-disabled': currentPage === 1 }]"
          @click="changePage(currentPage - 1)"
        >
          Précédent
        </a>
        <a
          :class="['pagination-next', { 'is-disabled': currentPage === totalPages }]"
          @click="changePage(currentPage + 1)"
        >
          Suivant
        </a>
        <ul class="pagination-list">
          <li v-for="page in getPagesToShow()" :key="page">
            <a
              :class="['pagination-link', { 'is-current': page === currentPage }]"
              @click="changePage(page)"
            >
              {{ page }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/ui/MyButton.vue'
import IndicatorCard from '@/components/indicators/IndicatorCard.vue'
import { useIndicatorStore } from '@/stores/indicators'
// import type { Indicator } from '@/stores/app'

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

const changePage = async (page: number) => {
  if (page >= 1 && page <= indicatorStore.pagination.totalPages) {
    currentPage.value = page
    await loadIndicators()
  }
}

const getPagesToShow = () => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(indicatorStore.pagination.totalPages, currentPage.value + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
}

// Charger les indicateurs au montage
onMounted(() => {
  loadIndicators()
})

// Accéder aux indicateurs et état de chargement depuis le store
const indicators = computed(() => indicatorStore.indicators)
const loading = computed(() => indicatorStore.loading)
const totalPages = indicatorStore.pagination.totalPages
</script>

<style scoped>
.indicators-page {
  padding: 1rem;
}

.indicators-list {
  margin-bottom: 2rem;
}

.py-6 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.mr-2 {
  margin-right: 0.5rem;
}
</style>
