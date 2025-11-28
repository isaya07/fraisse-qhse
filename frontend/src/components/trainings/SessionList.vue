<template>
  <Card>
    <template #content>
      <DataTable
        :value="sessions"
        paginator
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        tableStyle="min-width: 50rem"
        stripedRows
        removableSort
      >
        <template #empty> Aucune session trouvée. </template>

        <Column field="start_date" header="Date" sortable>
          <template #body="slotProps">
            {{ formatDate(slotProps.data.start_date) }}
          </template>
        </Column>

        <Column field="training.title" header="Formation" sortable>
          <template #body="slotProps">
            <span class="font-medium">{{ slotProps.data.training?.title }}</span>
          </template>
        </Column>

        <Column field="organization.name" header="Organisme" sortable>
          <template #body="slotProps">
            {{ slotProps.data.organization?.name || '-' }}
          </template>
        </Column>

        <Column field="location" header="Lieu" sortable></Column>

        <Column field="status" header="Statut" sortable>
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
              text
              rounded
              severity="secondary"
              @click="$emit('view', slotProps.data)"
              v-tooltip="'Voir les détails'"
            >
              <template #icon>
                <font-awesome-icon icon="eye" />
              </template>
            </Button>
            <Button
              text
              rounded
              severity="info"
              class="mr-2"
              @click="$emit('edit', slotProps.data)"
              v-tooltip="'Modifier'"
            >
              <template #icon>
                <font-awesome-icon icon="pencil" />
              </template>
            </Button>
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { TrainingSession } from '@/stores/training'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Button from 'primevue/button'

defineProps<{
  sessions: TrainingSession[]
}>()

defineEmits(['view', 'edit'])

const formatDate = (dateString: string) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const getStatusLabel = (status: string) => {
  const map: Record<string, string> = {
    planned: 'Planifiée',
    completed: 'Réalisée',
    cancelled: 'Annulée',
  }
  return map[status] || status
}

const getStatusSeverity = (status: string) => {
  const map: Record<string, string> = {
    planned: 'info',
    completed: 'success',
    cancelled: 'danger',
  }
  return map[status] || 'info'
}
</script>
