<template>
  <div class="card">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-medium">Participants</h3>
      <Button label="Ajouter" icon="pi pi-plus" size="small" @click="openAddDialog" />
    </div>

    <DataTable :value="participations" stripedRows size="small">
      <template #empty> Aucun participant inscrit. </template>

      <Column field="user.last_name" header="Nom">
        <template #body="slotProps">
          {{ slotProps.data.user?.last_name }} {{ slotProps.data.user?.first_name }}
        </template>
      </Column>

      <Column field="status" header="Statut">
        <template #body="slotProps">
          <Tag
            :value="getStatusLabel(slotProps.data.status)"
            :severity="getStatusSeverity(slotProps.data.status)"
          />
        </template>
      </Column>

      <Column header="Actions" :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            text
            rounded
            severity="info"
            class="mr-2"
            @click="editParticipation(slotProps.data)"
            v-tooltip="'Modifier le statut'"
          >
            <template #icon>
              <font-awesome-icon icon="pencil" />
            </template>
          </Button>
          <Button
            icon="pi pi-trash"
            text
            rounded
            severity="danger"
            @click="confirmDelete(slotProps.data)"
            v-tooltip="'Retirer'"
          >
            <template #icon>
              <font-awesome-icon icon="trash" />
            </template>
          </Button>
        </template>
      </Column>
    </DataTable>

    <!-- Dialog Ajout/Modif -->
    <Dialog
      v-model:visible="dialogVisible"
      :header="editingParticipation ? 'Modifier la participation' : 'Ajouter un participant'"
      :modal="true"
      class="p-fluid w-full max-w-md"
    >
      <div class="field" v-if="!editingParticipation">
        <label for="user">Utilisateur</label>
        <Dropdown
          id="user"
          v-model="form.user_id"
          :options="users"
          optionLabel="fullname"
          optionValue="id"
          placeholder="Sélectionnez un utilisateur"
          filter
          class="w-full"
        />
      </div>

      <div class="field mt-4">
        <label for="status">Statut</label>
        <Dropdown
          id="status"
          v-model="form.status"
          :options="statusOptions"
          optionLabel="label"
          optionValue="value"
          class="w-full"
        />
      </div>

      <template #footer>
        <Button label="Annuler" text severity="secondary" @click="closeDialog" />
        <Button label="Enregistrer" @click="saveParticipation" />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TrainingParticipation } from '@/stores/training'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import { useConfirm } from 'primevue/useconfirm'

const props = defineProps<{
  participations: TrainingParticipation[]
  users: any[] // Should be User type
}>()

const emit = defineEmits(['add', 'update', 'remove'])

const confirm = useConfirm()
const dialogVisible = ref(false)
const editingParticipation = ref<TrainingParticipation | null>(null)
const form = ref({
  user_id: null as number | null,
  status: 'registered' as string,
})

const statusOptions = [
  { label: 'Inscrit', value: 'registered' },
  { label: 'Présent', value: 'attended' },
  { label: 'Validé', value: 'validated' },
  { label: 'Échoué', value: 'failed' },
  { label: 'Annulé', value: 'cancelled' },
]

const getStatusLabel = (status: string) => {
  const option = statusOptions.find((o) => o.value === status)
  return option ? option.label : status
}

const getStatusSeverity = (status: string) => {
  const map: Record<string, string> = {
    registered: 'info',
    attended: 'warning',
    validated: 'success',
    failed: 'danger',
    cancelled: 'secondary',
  }
  return map[status] || 'info'
}

const openAddDialog = () => {
  editingParticipation.value = null
  form.value = { user_id: null, status: 'registered' }
  dialogVisible.value = true
}

const editParticipation = (participation: TrainingParticipation) => {
  editingParticipation.value = participation
  form.value = {
    user_id: participation.user_id,
    status: participation.status,
  }
  dialogVisible.value = true
}

const closeDialog = () => {
  dialogVisible.value = false
  editingParticipation.value = null
}

const saveParticipation = () => {
  if (editingParticipation.value) {
    emit('update', { ...editingParticipation.value, status: form.value.status })
  } else {
    emit('add', { user_id: form.value.user_id, status: form.value.status })
  }
  closeDialog()
}

const confirmDelete = (participation: TrainingParticipation) => {
  confirm.require({
    message: 'Voulez-vous vraiment retirer ce participant ?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      emit('remove', participation.id)
    },
  })
}
</script>
