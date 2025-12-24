<template>
  <Card>
    <template #content>
      <div class="flex justify-between items-center mb-4">
        <h4>Historique des Affectations</h4>
        <Button
          v-if="status === 'available'"
          label="Nouvelle Affectation"
          size="small"
          outlined
          @click="$emit('assign')"
        >
          <template #icon>
            <font-awesome-icon icon="user-plus" class="mr-2" />
          </template>
        </Button>
        <Button
          v-else-if="status === 'assigned'"
          label="Retourner"
          size="small"
          severity="warning"
          outlined
          @click="$emit('return')"
        >
          <template #icon>
            <font-awesome-icon icon="rotate-left" class="mr-2" />
          </template>
        </Button>
      </div>

      <div
        v-if="!assignments || assignments.length === 0"
        class="text-center py-8 text-color-secondary"
      >
        <p>Aucune affectation enregistrée</p>
      </div>

      <div v-else class="space-y-4 max-h-96 overflow-y-auto custom-scrollbar pr-2">
        <div
          v-for="assignment in sortedAssignments"
          :key="assignment.id"
          class="border-b border-surface-border last:border-0 pb-4 last:pb-0"
        >
          <div class="flex justify-between items-start mb-2">
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center text-color-secondary"
              >
                <font-awesome-icon icon="user" class="text-xs" />
              </div>
              <div>
                <p class="font-medium text-color">
                  {{ assignment.user?.first_name }} {{ assignment.user?.last_name }}
                </p>
                <p class="text-xs text-color-secondary">
                  {{ formatDate(assignment.assigned_at) }}
                  <span v-if="assignment.returned_at">
                    - {{ formatDate(assignment.returned_at) }}
                  </span>
                  <span v-else class="text-green-600 font-medium ml-1"> (En cours) </span>
                </p>
              </div>
            </div>
          </div>
          <div
            v-if="assignment.notes"
            class="bg-surface-50 dark:bg-surface-900 p-2 rounded text-sm text-color-secondary italic ml-11 mb-2"
          >
            <span class="font-bold not-italic text-xs text-blue-500 block mb-1">Affectation :</span>
            "{{ assignment.notes }}"
          </div>
          <div
            v-if="assignment.return_notes"
            class="bg-orange-50 dark:bg-orange-900/20 p-2 rounded text-sm text-color-secondary italic ml-11"
          >
            <span class="font-bold not-italic text-xs text-orange-500 block mb-1">Retour :</span>
            "{{ assignment.return_notes }}"
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const props = defineProps<{
  assignments: any[]
  status: string
}>()

defineEmits(['assign', 'return'])

// Sort assignments by date descending
const sortedAssignments = computed(() => {
  if (!props.assignments) return []
  return [...props.assignments].sort((a, b) => {
    return new Date(b.assigned_at).getTime() - new Date(a.assigned_at).getTime()
  })
})

const formatDate = (date: string) => {
  return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: fr })
}
</script>
