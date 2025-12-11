<template>
  <div class="p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <h2>Tableau de bord Actions</h2>
      <div class="flex gap-2">
        <Button label="Gérer les actions" @click="goToConfig" severity="secondary" outlined>
          <template #icon>
            <font-awesome-icon icon="cog" class="mr-2" />
          </template>
        </Button>
        <Button label="Nouvelle action" @click="createNewAction" severity="primary">
          <template #icon>
            <font-awesome-icon icon="plus" class="mr-2" />
          </template>
        </Button>
      </div>
    </div>

    <!-- Filters -->
    <Card class="mb-6">
      <template #content>
        <div class="flex flex-wrap gap-4">
          <div class="flex-1 min-w-[200px]">
            <IconField iconPosition="left">
              <InputIcon>
                <font-awesome-icon icon="magnifying-glass" />
              </InputIcon>
              <InputText v-model="searchQuery" placeholder="Rechercher..." class="w-full" />
            </IconField>
          </div>
          <Select
            v-model="typeFilter"
            :options="typeOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Type"
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
        </div>
      </template>
    </Card>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-12">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-color-secondary" />
    </div>

    <!-- Empty State -->
    <div
      v-else-if="actions.length === 0"
      class="text-center py-12 bg-surface-50 dark:bg-surface-800 rounded-lg border-2 border-dashed border-surface-border"
    >
      <font-awesome-icon icon="tasks" class="text-color-secondary text-5xl mb-4" />
      <h3 class="text-lg font-medium text-color">Aucune action trouvée</h3>
      <p class="text-color-secondary mt-1">Commencez par créer une nouvelle action.</p>
      <Button label="Nouvelle action" @click="createNewAction" severity="primary" class="mt-4">
        <template #icon>
          <font-awesome-icon icon="plus" class="mr-2" />
        </template>
      </Button>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ActionCard
        v-for="action in actions"
        :key="action.id"
        :action="action"
        @view="viewAction"
        @edit="editAction"
        @delete="confirmDelete"
      />
    </div>

    <!-- Pagination -->
    <div v-if="totalRecords > itemsPerPage" class="mt-6">
      <Paginator
        :rows="itemsPerPage"
        :totalRecords="totalRecords"
        :first="currentPage * itemsPerPage"
        @page="onPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useActionStore } from '@/stores/actions'
import { useActionTypeStore } from '@/stores/actionTypes'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import ActionCard from '@/components/actions/ActionCard.vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Select from 'primevue/select'
import Paginator from 'primevue/paginator'

const router = useRouter()
const actionStore = useActionStore()
const actionTypeStore = useActionTypeStore()
const confirm = useConfirm()
const toast = useToast()

// États
const searchQuery = ref('')
const typeFilter = ref(null)
const statusFilter = ref(null)
const itemsPerPage = ref(9)
const currentPage = ref(0)

// Accès au store
const actions = computed(() => actionStore.actions)
const loading = computed(() => actionStore.loading)
const totalRecords = computed(() => actionStore.pagination.total)

// Options
const typeOptions = computed(() => {
  return (actionTypeStore.types || []).map((type) => ({
    label: type.name,
    value: type.id,
  }))
})

const statusOptions = [
  { label: 'Ouvert', value: 'open' },
  { label: 'En cours', value: 'in_progress' },
  { label: 'Terminé', value: 'completed' },
  { label: 'Annulé', value: 'cancelled' },
]

// Chargement des données
const loadActions = async () => {
  const filters = {
    search: searchQuery.value,
    action_type_id: typeFilter.value,
    status: statusFilter.value,
  }
  await actionStore.fetchActions(currentPage.value + 1, itemsPerPage.value, filters)
}

const onPage = (event: { page: number; rows: number }) => {
  currentPage.value = event.page
  loadActions()
}

// Actions
const createNewAction = () => {
  router.push('/actions/create')
}

const goToConfig = () => {
  router.push('/actions/config')
}

const viewAction = (id: number) => {
  router.push(`/actions/${id}`)
}

const editAction = (id: number) => {
  router.push(`/actions/${id}/edit`)
}

const confirmDelete = (id: number) => {
  const action = actions.value.find((a) => a.id === id)
  if (!action) return

  confirm.require({
    message: `Voulez-vous vraiment supprimer l'action "${action.title}" ?`,
    header: 'Confirmation de suppression',
    icon: 'pi pi-exclamation-triangle',
    rejectLabel: 'Annuler',
    acceptLabel: 'Supprimer',
    rejectClass: 'p-button-secondary p-button-outlined',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await actionStore.deleteAction(action.id)
        toast.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Action supprimée',
          life: 3000,
        })
        loadActions()
      } catch {
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Impossible de supprimer l'action",
          life: 3000,
        })
      }
    },
  })
}

// Watchers
watch([searchQuery, typeFilter, statusFilter], () => {
  currentPage.value = 0
  loadActions()
})

onMounted(() => {
  actionTypeStore.fetchTypes()
  loadActions()
})
</script>
