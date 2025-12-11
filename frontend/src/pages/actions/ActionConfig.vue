<template>
  <div class="p-4">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div class="flex items-center gap-4">
        <Button text rounded severity="secondary" @click="goBack">
          <template #icon>
            <font-awesome-icon icon="arrow-left" />
          </template>
        </Button>
        <h2 class="mt-0!">Gérer les actions</h2>
      </div>
      <div class="flex gap-2">
        <Button
          label="Gérer les types"
          icon="pi pi-tags"
          severity="secondary"
          outlined
          @click="showTypeManager = true"
        >
          <template #icon>
            <font-awesome-icon icon="tags" class="mr-2" />
          </template>
        </Button>
        <Button label="Nouvelle action" @click="createNewAction" severity="primary">
          <template #icon>
            <font-awesome-icon icon="plus" class="mr-2" />
          </template>
        </Button>
      </div>
    </div>
    <Card>
      <template #content>
        <ActionTypeManager v-model:visible="showTypeManager" />

        <DataTable
          ref="dt"
          :value="actions"
          lazy
          :paginator="true"
          :rows="itemsPerPage"
          :totalRecords="totalRecords"
          :loading="loading"
          @page="onPage"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25, 50]"
          currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} actions"
          tableStyle="min-width: 50rem"
          class="p-datatable-sm"
        >
          <template #header>
            <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div class="flex flex-wrap gap-2">
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
                  v-model="priorityFilter"
                  :options="priorityOptions"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Priorité"
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
              <IconField iconPosition="left">
                <InputIcon>
                  <font-awesome-icon icon="magnifying-glass" />
                </InputIcon>
                <InputText v-model="searchQuery" placeholder="Rechercher..." />
              </IconField>
            </div>
          </template>

          <template #empty> Aucune action trouvée. </template>

          <Column field="title" header="Titre" sortable style="min-width: 14rem">
            <template #body="{ data }">
              <div class="font-medium">{{ data.title }}</div>
              <div class="text-sm text-gray-500 truncate max-w-xs">{{ data.description }}</div>
            </template>
          </Column>

          <Column field="action_type_id" header="Type" sortable style="min-width: 8rem">
            <template #body="{ data }">
              <Tag
                :value="data.action_type?.name || '-'"
                :style="{ backgroundColor: data.action_type?.color }"
              />
            </template>
          </Column>

          <Column field="priority" header="Priorité" sortable style="min-width: 8rem">
            <template #body="{ data }">
              <Tag
                :value="getPriorityLabel(data.priority)"
                :severity="getPrioritySeverity(data.priority)"
              />
            </template>
          </Column>

          <Column field="status" header="Statut" sortable style="min-width: 8rem">
            <template #body="{ data }">
              <Tag
                :value="getStatusLabel(data.status)"
                :severity="getStatusSeverity(data.status)"
              />
            </template>
          </Column>

          <Column field="assigned_to" header="Responsable" sortable style="min-width: 10rem">
            <template #body="{ data }">
              <div v-if="data.assignee" class="flex items-center gap-2">
                <Avatar :label="getInitials(data.assignee)" shape="circle" size="small" />
                <span>{{ data.assignee.first_name }} {{ data.assignee.last_name }}</span>
              </div>
              <span v-else class="text-gray-400 italic">Non assigné</span>
            </template>
          </Column>

          <Column field="progress" header="Progression" sortable style="min-width: 10rem">
            <template #body="{ data }">
              <ProgressBar
                :value="data.progress"
                :showValue="true"
                style="height: 1rem"
              ></ProgressBar>
            </template>
          </Column>

          <Column field="due_date" header="Échéance" sortable style="min-width: 10rem">
            <template #body="{ data }">
              <span :class="{ 'text-red-500 font-bold': isOverdue(data.due_date, data.status) }">
                {{ formatDate(data.due_date) }}
              </span>
            </template>
          </Column>

          <Column header="Actions" :exportable="false" style="min-width: 8rem">
            <template #body="{ data }">
              <div class="flex gap-2">
                <Button
                  text
                  rounded
                  severity="info"
                  @click="viewAction(data.id)"
                  v-tooltip.top="'Voir'"
                >
                  <font-awesome-icon icon="eye" />
                </Button>
                <Button
                  text
                  rounded
                  severity="success"
                  @click="editAction(data.id)"
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
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useActionStore } from '@/stores/actions'
import { useActionTypeStore } from '@/stores/actionTypes'
import type { Action, User } from '@/stores/app'
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
import ProgressBar from 'primevue/progressbar'
import Avatar from 'primevue/avatar'
import ActionTypeManager from '@/components/actions/ActionTypeManager.vue'

const router = useRouter()
const actionStore = useActionStore()
const actionTypeStore = useActionTypeStore()
const confirm = useConfirm()
const toast = useToast()

// États
const searchQuery = ref('')
const typeFilter = ref(null)
const priorityFilter = ref(null)
const statusFilter = ref(null)
const itemsPerPage = ref(10)
const currentPage = ref(0)
const showTypeManager = ref(false)

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

const priorityOptions = [
  { label: 'Basse', value: 'low' },
  { label: 'Moyenne', value: 'medium' },
  { label: 'Haute', value: 'high' },
  { label: 'Critique', value: 'critical' },
]

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
    priority: priorityFilter.value,
    status: statusFilter.value,
  }
  await actionStore.fetchActions(currentPage.value + 1, itemsPerPage.value, filters)
}

const onPage = (event: { page: number; rows: number }) => {
  currentPage.value = event.page
  itemsPerPage.value = event.rows
  loadActions()
}

// Helpers
const getPriorityLabel = (value: string) => {
  const map: Record<string, string> = {
    low: 'Basse',
    medium: 'Moyenne',
    high: 'Haute',
    critical: 'Critique',
  }
  return map[value] || value
}

const getPrioritySeverity = (value: string): string => {
  const map: Record<string, string> = {
    low: 'info',
    medium: 'warn',
    high: 'danger',
    critical: 'danger',
  }
  return map[value] || 'info'
}

const getStatusLabel = (value: string) => {
  const map: Record<string, string> = {
    open: 'Ouvert',
    in_progress: 'En cours',
    completed: 'Terminé',
    cancelled: 'Annulé',
  }
  return map[value] || value
}

const getStatusSeverity = (value: string): string => {
  const map: Record<string, string> = {
    open: 'info',
    in_progress: 'warn',
    completed: 'success',
    cancelled: 'secondary',
  }
  return map[value] || 'secondary'
}

const formatDate = (dateString: string) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const isOverdue = (dateString: string, status: string) => {
  if (!dateString || status === 'completed' || status === 'cancelled') return false
  return new Date(dateString) < new Date()
}

const getInitials = (user: User) => {
  return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase()
}

// Actions
const createNewAction = () => {
  router.push('/actions/create')
}

const goBack = () => router.back()

const viewAction = (id: number) => {
  router.push(`/actions/${id}`)
}

const editAction = (id: number) => {
  router.push(`/actions/${id}/edit`)
}

const confirmDelete = (action: Action) => {
  confirm.require({
    message: `Voulez-vous vraiment supprimer l'action "${action.title}" ?`,
    header: 'Confirmation de suppression',
    icon: 'exclamation-triangle',
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
          icon: 'check',
        })
        loadActions()
      } catch {
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Impossible de supprimer l'action",
          life: 3000,
          icon: 'times',
        })
      }
    },
  })
}

// Watchers
watch([searchQuery, typeFilter, priorityFilter, statusFilter], () => {
  currentPage.value = 0
  loadActions()
})

onMounted(() => {
  actionTypeStore.fetchTypes()
  loadActions()
})
</script>
