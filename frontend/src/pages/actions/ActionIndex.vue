<template>
  <div class="actions-page p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Plans d'Action</h1>
      <Button
        icon="pi pi-plus"
        label="Nouvelle action"
        @click="createNewAction"
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
            placeholder="Rechercher une action..."
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
        <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
        <p-dropdown
          v-model="typeFilter"
          :options="typeOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Tous les types"
          class="w-full"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
        <p-dropdown
          v-model="priorityFilter"
          :options="priorityOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Toutes les priorités"
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

    <!-- Liste des actions -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-gray-500" />
    </div>

    <div v-else-if="actions.length === 0" class="flex justify-center items-center py-12">
      <p class="text-lg text-gray-600">Aucune action trouvée</p>
    </div>

    <div v-else>
      <div class="actions-list">
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
      <div class="flex justify-center mt-8">
        <p-paginator
          :rows="itemsPerPage.value"
          :totalRecords="actionStore.pagination.totalItems"
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

// Options pour les filtres
const typeOptions = [
  { label: 'Tous les types', value: '' },
  { label: 'Corrective', value: 'corrective' },
  { label: 'Préventive', value: 'preventive' },
  { label: 'Amélioration', value: 'improvement' },
]

const priorityOptions = [
  { label: 'Toutes les priorités', value: '' },
  { label: 'Basse', value: 'low' },
  { label: 'Moyenne', value: 'medium' },
  { label: 'Haute', value: 'high' },
  { label: 'Critique', value: 'critical' },
]

const statusOptions = [
  { label: 'Tous les statuts', value: '' },
  { label: 'Ouvert', value: 'open' },
  { label: 'En cours', value: 'in_progress' },
  { label: 'Terminé', value: 'completed' },
  { label: 'Annulé', value: 'cancelled' },
]

const sortOptions = [
  { label: 'Plus récents', value: 'newest' },
  { label: 'Plus anciens', value: 'oldest' },
  { label: 'Par progression', value: 'progress' },
]

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

const onPageChange = async (event: { page: number }) => {
  currentPage.value = event.page + 1
  await loadActions()
}

// Charger les actions au montage
onMounted(() => {
  loadActions()
})

// Accéder aux actions et état de chargement depuis le store
const actions = computed(() => actionStore.actions)
const loading = computed(() => actionStore.loading)
</script>

<style scoped>
@reference "@/assets/css/tailwind.css";

.actions-page {
  @apply p-4;
}

.actions-list {
  @apply mb-8;
}
</style>
