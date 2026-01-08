<template>
  <div class="p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div class="flex items-center gap-4">
        <h2>Tableau de bord Actions</h2>
        <!-- View Toggle -->
        <SelectButton
          v-model="viewMode"
          :options="viewOptions"
          optionLabel="icon"
          optionValue="value"
          :allowEmpty="false"
        >
          <template #option="{ option }">
            <font-awesome-icon :icon="['fas', option.icon]" v-tooltip.top="option.label" />
          </template>
        </SelectButton>
      </div>

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
            v-if="viewMode !== 'kanban'"
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
      v-else-if="actions.length === 0 && !loading"
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

    <!-- Container -->
    <div v-else>
      <!-- List View -->
      <div v-if="viewMode === 'list'" class="surface-card rounded-lg shadow overflow-hidden">
        <DataTable
          :value="actions"
          paginator
          :rows="itemsPerPage"
          :rowsPerPageOptions="[10, 20, 50]"
          responsiveLayout="scroll"
          selectionMode="single"
          @row-click="(e) => viewAction(e.data.id)"
          rowHover
        >
          <Column field="title" header="Titre" sortable>
            <template #body="{ data }">
              <span class="font-bold text-color">{{ data.title }}</span>
            </template>
          </Column>
          <Column field="action_type.name" header="Type" sortable>
            <template #body="{ data }">
              <Tag
                v-if="data.action_type"
                :value="data.action_type.name"
                :style="{
                  backgroundColor: data.action_type.color + '20',
                  color: data.action_type.color,
                }"
              />
            </template>
          </Column>
          <Column field="priority" header="Priorité" sortable>
            <template #body="{ data }">
              <Tag
                :value="getPriorityLabel(data.priority)"
                :severity="getPrioritySeverity(data.priority)"
              />
            </template>
          </Column>
          <Column field="status" header="Statut" sortable>
            <template #body="{ data }">
              <Tag
                :value="getStatusLabel(data.status)"
                :severity="getStatusSeverity(data.status)"
              />
            </template>
          </Column>
          <Column field="assignee" header="Responsable">
            <template #body="{ data }">
              <div v-if="data.assignee" class="flex items-center gap-2">
                <Avatar
                  :label="getInitials(data.assignee)"
                  shape="circle"
                  size="small"
                  :style="{ backgroundColor: stringToColor(data.assignee.last_name) }"
                  class="text-white text-xs"
                />
                <span class="text-sm"
                  >{{ data.assignee.first_name }} {{ data.assignee.last_name }}</span
                >
              </div>
              <span v-else class="text-color-secondary text-sm">-</span>
            </template>
          </Column>
          <Column field="due_date" header="Échéance" sortable>
            <template #body="{ data }">
              <span v-if="data.due_date" :class="getDueDateColorClass(data.due_date, data.status)">
                {{ formatDate(data.due_date) }}
              </span>
              <span v-else>-</span>
            </template>
          </Column>
        </DataTable>
      </div>

      <!-- Grid View -->
      <div
        v-else-if="viewMode === 'grid'"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <ActionCard
          v-for="action in actions"
          :key="action.id"
          :action="action"
          @view="viewAction"
          @edit="editAction"
          @delete="confirmDelete"
        />
      </div>

      <!-- Kanban View -->
      <div
        v-else-if="viewMode === 'kanban'"
        class="flex gap-4 overflow-x-auto pb-4 h-[calc(100vh-250px)]"
      >
        <div
          v-for="status in statusOptions"
          :key="status.value"
          class="flex-shrink-0 w-80 flex flex-col bg-surface-50 dark:bg-surface-800 rounded-lg h-full border border-surface-200 dark:border-surface-700"
        >
          <!-- Column Header -->
          <div
            class="p-3 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between sticky top-0 bg-inherit z-10 rounded-t-lg"
          >
            <div class="flex items-center gap-2">
              <span class="font-bold text-color">{{ status.label }}</span>
              <Tag :value="getActionsByStatus(status.value).length" severity="secondary" />
            </div>
          </div>

          <!-- Content -->
          <div class="p-2 flex-1 overflow-y-auto space-y-3 custom-scrollbar">
            <ActionCard
              v-for="action in getActionsByStatus(status.value)"
              :key="action.id"
              :action="action"
              @view="viewAction"
              @edit="editAction"
              @delete="confirmDelete"
              class="scale-95 hover:scale-100 transition-transform origin-top"
            />
            <div
              v-if="getActionsByStatus(status.value).length === 0"
              class="text-center py-8 text-color-secondary italic text-sm"
            >
              Aucune action
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination (Only for Grid/List as Kanban shows all ideally, or paginated per col) -->
      <!-- For simplicity, keeping pagination global for now, but Kanban usually scrolls independently -->
      <div v-if="totalRecords > itemsPerPage && viewMode !== 'kanban'" class="mt-6">
        <Paginator
          :rows="itemsPerPage"
          :totalRecords="totalRecords"
          :first="currentPage * itemsPerPage"
          @page="onPage"
        />
      </div>
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
import SelectButton from 'primevue/selectbutton'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Avatar from 'primevue/avatar'
import { format } from 'date-fns'

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
const viewMode = ref(localStorage.getItem('actions_view_mode') || 'grid')
watch(viewMode, (newValue) => {
  localStorage.setItem('actions_view_mode', newValue)
})
const viewOptions = [
  { icon: 'th-large', value: 'grid', label: 'Grille' },
  { icon: 'list', value: 'list', label: 'Liste' },
  { icon: 'columns', value: 'kanban', label: 'Kanban' },
]

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

// Kanban Helper
const getActionsByStatus = (status: string) => {
  return actions.value.filter((a) => a.status === status)
}

// Helpers
const getStatusLabel = (value: string | undefined) => {
  if (!value) return '-'
  const map: Record<string, string> = {
    open: 'Ouvert',
    in_progress: 'En cours',
    completed: 'Terminé',
    cancelled: 'Annulé',
  }
  return map[value] || value
}

const getStatusSeverity = (value: string | undefined): string => {
  if (!value) return 'secondary'
  const map: Record<string, string> = {
    open: 'info',
    in_progress: 'warn',
    completed: 'success',
    cancelled: 'secondary',
  }
  return map[value] || 'secondary'
}

const getPriorityLabel = (value: string | undefined) => {
  if (!value) return '-'
  const map: Record<string, string> = {
    low: 'Basse',
    medium: 'Moyenne',
    high: 'Haute',
    critical: 'Critique',
  }
  return map[value] || value
}

const getPrioritySeverity = (value: string | undefined): string => {
  if (!value) return 'secondary'
  const map: Record<string, string> = {
    low: 'info',
    medium: 'warn',
    high: 'danger',
    critical: 'danger',
  }
  return map[value] || 'info'
}

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const getDueDateColorClass = (dateString: string | undefined, status: string | undefined) => {
  if (!dateString || !status || status === 'completed' || status === 'cancelled')
    return 'text-color'
  const today = new Date()
  const dueDate = new Date(dateString)
  const diffTime = dueDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return 'text-red-600 font-bold'
  if (diffDays <= 3) return 'text-orange-500 font-bold'
  if (diffDays <= 7) return 'text-yellow-600'
  return 'text-color'
}

const getInitials = (user: any) => {
  if (!user) return '?'
  return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase()
}

const stringToColor = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const c = (hash & 0x00ffffff).toString(16).toUpperCase()
  return '#' + '00000'.substring(0, 6 - c.length) + c
}

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
