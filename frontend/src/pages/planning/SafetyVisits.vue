<template>
  <div class="card">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold text-gray-800">Visites Sécurité</h1>
      <Button label="Nouvelle Visite" @click="openCreateDialog">
        <template #icon>
          <font-awesome-icon icon="plus" />
        </template>
      </Button>
    </div>

    <DataTable :value="store.visits" :loading="store.loading" paginator :rows="10" stripedRows>
      <Column field="date" header="Date" sortable>
        <template #body="{ data }">
          {{ formatDate(data.date) }}
        </template>
      </Column>
      <Column field="location" header="Lieu" sortable></Column>
      <Column field="auditor.first_name" header="Auditeur" sortable>
        <template #body="{ data }">
          {{ data.auditor.first_name }} {{ data.auditor.last_name }}
        </template>
      </Column>
      <Column field="status" header="Statut" sortable>
        <template #body="{ data }">
          <Tag :value="getStatusLabel(data.status)" :severity="getStatusSeverity(data.status)" />
        </template>
      </Column>
      <Column field="score" header="Score" sortable>
        <template #body="{ data }">
          <span v-if="data.score !== null">{{ data.score }}/100</span>
          <span v-else>-</span>
        </template>
      </Column>
      <Column header="Actions" style="width: 120px">
        <template #body="{ data }">
          <div class="flex gap-2">
            <Button size="small" text rounded severity="info" @click="openEditDialog(data)">
              <template #icon>
                <font-awesome-icon icon="pencil" />
              </template>
            </Button>
            <Button size="small" text rounded severity="danger" @click="confirmDelete(data)">
              <template #icon>
                <font-awesome-icon icon="trash" />
              </template>
            </Button>
          </div>
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="dialogVisible"
      :header="editingVisit ? 'Modifier la visite' : 'Nouvelle visite'"
      modal
      class="p-fluid w-full max-w-lg"
    >
      <VisitForm :visit="editingVisit" @save="closeDialog" @cancel="dialogVisible = false" />
    </Dialog>

    <ConfirmDialog></ConfirmDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePlanningStore, type SafetyVisit } from '@/stores/planning'
import { useConfirm } from 'primevue/useconfirm'
import { format } from 'date-fns'
import VisitForm from '@/components/planning/VisitForm.vue'

const store = usePlanningStore()
const confirm = useConfirm()

const dialogVisible = ref(false)
const editingVisit = ref<SafetyVisit | undefined>(undefined)

onMounted(() => {
  store.fetchVisits()
})

const formatDate = (date: string) => {
  return format(new Date(date), 'dd/MM/yyyy')
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'planned':
      return 'Planifiée'
    case 'completed':
      return 'Réalisée'
    case 'cancelled':
      return 'Annulée'
    default:
      return status
  }
}

const getStatusSeverity = (status: string) => {
  switch (status) {
    case 'planned':
      return 'info'
    case 'completed':
      return 'success'
    case 'cancelled':
      return 'danger'
    default:
      return 'secondary'
  }
}

const openCreateDialog = () => {
  editingVisit.value = undefined
  dialogVisible.value = true
}

const openEditDialog = (visit: SafetyVisit) => {
  editingVisit.value = visit
  dialogVisible.value = true
}

const closeDialog = () => {
  dialogVisible.value = false
  store.fetchVisits()
}

const confirmDelete = (visit: SafetyVisit) => {
  confirm.require({
    message: 'Êtes-vous sûr de vouloir supprimer cette visite ?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      store.deleteVisit(visit.id)
    },
  })
}
</script>
