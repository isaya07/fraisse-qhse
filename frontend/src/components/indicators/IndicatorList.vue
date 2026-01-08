<template>
  <Card>
    <template #content>
      <DataTable
        :value="indicators"
        paginator
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        tableStyle="min-width: 50rem"
        stripedRows
        removableSort
      >
        <template #empty> Aucun indicateur trouvé. </template>

        <Column field="name" header="Nom" sortable>
          <template #body="slotProps">
            <span class="font-medium">{{ slotProps.data.name }}</span>
          </template>
        </Column>

        <Column field="indicator_category.name" header="Catégorie" sortable>
          <template #body="slotProps">
            <div
              v-if="slotProps.data.indicator_category"
              class="flex items-center gap-2 px-2 py-1 rounded text-xs font-medium text-white w-fit"
              :style="{ backgroundColor: slotProps.data.indicator_category.color || '#64748B' }"
            >
              <font-awesome-icon :icon="slotProps.data.indicator_category.icon || 'folder'" />
              {{ slotProps.data.indicator_category.name }}
            </div>
            <span v-else>-</span>
          </template>
        </Column>

        <Column field="target_value" header="Cible" sortable>
          <template #body="slotProps">
            {{ slotProps.data.target_value }} {{ slotProps.data.unit }}
          </template>
        </Column>

        <Column field="trend_direction" header="Tendance" sortable>
          <template #body="slotProps">
            <Tag
              :severity="getTrendSeverity(slotProps.data.trend_direction, slotProps.data.goal_type)"
              :value="getTrendLabel(slotProps.data.trend_direction)"
            >
              <template #icon>
                <font-awesome-icon
                  :icon="getTrendIcon(slotProps.data.trend_direction)"
                  class="mr-2"
                />
              </template>
            </Tag>
          </template>
        </Column>

        <Column header="Actions" :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              text
              rounded
              severity="secondary"
              @click="$emit('view', slotProps.data.id)"
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
              @click="$emit('edit', slotProps.data.id)"
              v-tooltip="'Modifier'"
              v-if="slotProps.data.can?.update"
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
import type { Indicator } from '@/stores/app'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import Card from 'primevue/card'

defineProps<{
  indicators: Indicator[]
}>()

defineEmits(['view', 'edit'])

const getTrendLabel = (value: string) => {
  const map: Record<string, string> = {
    positive: 'Hausse',
    negative: 'Baisse',
    neutral: 'Stable',
  }
  return map[value] || value
}

const getTrendSeverity = (
  direction: string | undefined | null,
  goalType: string | undefined | null,
): string => {
  if (!direction || !goalType) return 'info'
  if (direction === 'neutral') return 'info'

  if (goalType === 'maximize') {
    return direction === 'positive' ? 'success' : 'danger'
  } else if (goalType === 'minimize') {
    return direction === 'positive' ? 'danger' : 'success'
  }
  return 'info'
}

const getTrendIcon = (value: string | undefined | null) => {
  if (!value) return 'minus'
  const map: Record<string, string> = {
    positive: 'arrow-trend-up',
    negative: 'arrow-trend-down',
    neutral: 'minus',
  }
  return map[value] || 'minus'
}
</script>
