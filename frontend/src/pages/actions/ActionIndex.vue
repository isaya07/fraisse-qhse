<template>
  <div class="actions-page">
    <div class="level">
      <div class="level-left">
        <h1 class="title">Plans d'Action</h1>
      </div>
      <div class="level-right">
        <Button
          :icon="['fas', 'plus']"
          text="Nouvelle action"
          variant="primary"
          @click="createNewAction"
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
          placeholder="Rechercher une action..."
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
          <label class="label">Type</label>
          <div class="select is-fullwidth">
            <select v-model="typeFilter">
              <option value="">Tous les types</option>
              <option value="corrective">Corrective</option>
              <option value="preventive">Préventive</option>
              <option value="improvement">Amélioration</option>
            </select>
          </div>
        </div>
      </div>
      <div class="column is-3">
        <div class="field">
          <label class="label">Priorité</label>
          <div class="select is-fullwidth">
            <select v-model="priorityFilter">
              <option value="">Toutes les priorités</option>
              <option value="low">Basse</option>
              <option value="medium">Moyenne</option>
              <option value="high">Haute</option>
              <option value="critical">Critique</option>
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
              <option value="open">Ouvert</option>
              <option value="in_progress">En cours</option>
              <option value="completed">Terminé</option>
              <option value="cancelled">Annulé</option>
            </select>
          </div>
        </div>
      </div>
      <div class="column is-3">
        <div class="field">
          <label class="label">Tri</label>
          <div class="select is-fullwidth">
            <select v-model="sortOrder">
              <option value="newest">Plus récents</option>
              <option value="oldest">Plus anciens</option>
              <option value="progress">Par progression</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Liste des actions -->
    <div v-if="loading" class="has-text-centered py-6">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" />
    </div>

    <div v-else-if="actions.length === 0" class="has-text-centered py-6">
      <p class="is-size-5">Aucune action trouvée</p>
    </div>

    <div v-else>
      <div class="actions-list">
        <!-- Supposant que nous aurons une liste d'utilisateurs -->
        <ActionCard
          v-for="action in actions"
          :key="action.id"
          :action="action"
          :users="users"
          @view="viewAction"
          @edit="editAction"
          @delete="deleteAction"
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
import ActionCard from '@/components/actions/ActionCard.vue'
import { useActionStore } from '@/stores/actions'
import type { User } from '@/stores/app'

const router = useRouter()
const actionStore = useActionStore()

// États locaux
const searchQuery = ref('')
const typeFilter = ref('')
const priorityFilter = ref('')
const statusFilter = ref('')
const sortOrder = ref('newest')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Données factices pour les utilisateurs (à remplacer par des données réelles)
const users = ref<User[]>([
  {
    id: 1,
    username: 'admin',
    email: 'admin@qhse.local',
    first_name: 'Admin',
    last_name: 'QHSE',
    role: 'admin',
  },
  {
    id: 2,
    username: 'manager',
    email: 'manager@qhse.local',
    first_name: 'Manager',
    last_name: 'QHSE',
    role: 'manager',
  },
  {
    id: 3,
    username: 'user1',
    email: 'user1@qhse.local',
    first_name: 'User',
    last_name: 'One',
    role: 'user',
  },
])

// Fonction pour charger les actions
const loadActions = async () => {
  await actionStore.fetchActions(currentPage.value, itemsPerPage.value)
}

const viewAction = (id: number) => {
  router.push(`/actions/${id}`)
}

const editAction = (id: number) => {
  router.push(`/actions/${id}/edit`)
}

const createNewAction = () => {
  router.push('/actions/create')
}

const deleteAction = async (id: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette action ?')) {
    try {
      await actionStore.deleteAction(id)
      // Recharger la liste après suppression
      await loadActions()
    } catch (error) {
      console.error("Erreur lors de la suppression de l'action:", error)
    }
  }
}

const changePage = async (page: number) => {
  if (page >= 1 && page <= actionStore.pagination.totalPages) {
    currentPage.value = page
    await loadActions()
  }
}

const getPagesToShow = () => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(actionStore.pagination.totalPages, currentPage.value + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
}

// Charger les actions au montage
onMounted(() => {
  loadActions()
})

// Accéder aux actions et état de chargement depuis le store
const actions = computed(() => actionStore.actions)
const loading = computed(() => actionStore.loading)
const totalPages = actionStore.pagination.totalPages
</script>

<style scoped>
.actions-page {
  padding: 1rem;
}

.actions-list {
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
