<template>
  <div class="action-card bg-white rounded-lg shadow-md overflow-hidden mb-4">
    <div class="p-6">
      <div class="flex items-start">
        <div class="mr-4">
          <span :class="`text-3xl ${getPriorityColorClass(action.priority)}`">
            <font-awesome-icon :icon="getIconForActionType(action.type)" size="2x" />
          </span>
        </div>
        <div class="flex-1">
          <h3 class="text-xl font-bold text-gray-800 mb-1">{{ action.title }}</h3>
          <p class="text-sm text-gray-600 mb-3">
            <span :class="getStatusColorClass(action.status)">
              {{ getStatusText(action.status) }}
            </span>
            •
            <span :class="getPriorityColorClass(action.priority)">
              {{ getPriorityText(action.priority) }}
            </span>
          </p>
        </div>
      </div>

      <div class="mb-4">
        <p v-if="action.description" class="text-gray-700 mb-4">{{ action.description }}</p>

        <div class="flex flex-col sm:flex-row">
          <div class="w-full sm:w-1/3 mb-4 sm:mb-0 sm:mr-4">
            <p class="font-semibold mb-1">Progression:</p>
            <div class="w-full bg-gray-200 rounded-full h-2.5 mb-1">
              <div
                class="h-2.5 rounded-full"
                :class="getProgressColorClass(action.progress)"
                :style="{ width: action.progress + '%' }"
              ></div>
            </div>
            <p class="text-center text-sm">{{ action.progress }}%</p>
          </div>

          <div class="w-full sm:w-2/3">
            <p v-if="action.due_date" class="mb-1">
              <span class="font-semibold">Échéance:</span> {{ formatDate(action.due_date) }}
            </p>
            <p v-if="action.assigned_to" class="mb-1">
              <span class="font-semibold">Assigné à:</span>
              {{ getAssignedUserName(action.assigned_to) }}
            </p>
            <p class="mb-1">
              <span class="font-semibold">Type:</span> {{ getTypeText(action.type) }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex justify-between items-center">
        <div>
          <p-button
            :icon="['fas', 'eye']"
            label="Voir"
            severity="info"
            size="small"
            @click="$emit('view', action.id)"
          />
        </div>
        <div class="flex space-x-2">
          <p-button
            :icon="['fas', 'edit']"
            label="Éditer"
            severity="warning"
            size="small"
            @click="$emit('edit', action.id)"
          />
          <p-button
            :icon="['fas', 'trash']"
            label="Supprimer"
            severity="danger"
            size="small"
            @click="$emit('delete', action.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Action, User } from '../../stores/app'
import PButton from 'primevue/button'

const props = defineProps({
  action: {
    type: Object as PropType<Action>,
    required: true,
  },
  users: {
    type: Array as PropType<User[]>,
    default: () => [],
  },
})

defineEmits(['view', 'edit', 'delete'])

const getIconForActionType = (type: string) => {
  switch (type) {
    case 'corrective':
      return ['fas', 'wrench']
    case 'preventive':
      return ['fas', 'shield-alt']
    case 'improvement':
      return ['fas', 'arrow-up']
    default:
      return ['fas', 'tasks']
  }
}

const getStatusColorClass = (status: string) => {
  switch (status) {
    case 'open':
      return 'text-blue-500'
    case 'in_progress':
      return 'text-blue-500'
    case 'completed':
      return 'text-green-500'
    case 'cancelled':
      return 'text-red-500'
    default:
      return 'text-gray-500'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'open':
      return 'Ouvert'
    case 'in_progress':
      return 'En cours'
    case 'completed':
      return 'Terminé'
    case 'cancelled':
      return 'Annulé'
    default:
      return status
  }
}

const getPriorityColorClass = (priority: string) => {
  switch (priority) {
    case 'low':
      return 'text-green-500'
    case 'medium':
      return 'text-yellow-500'
    case 'high':
      return 'text-red-500'
    case 'critical':
      return 'text-red-600'
    default:
      return 'text-gray-500'
  }
}

const getPriorityText = (priority: string) => {
  switch (priority) {
    case 'low':
      return 'Basse'
    case 'medium':
      return 'Moyenne'
    case 'high':
      return 'Haute'
    case 'critical':
      return 'Critique'
    default:
      return priority
  }
}

const getTypeText = (type: string) => {
  switch (type) {
    case 'corrective':
      return 'Corrective'
    case 'preventive':
      return 'Préventive'
    case 'improvement':
      return 'Amélioration'
    default:
      return type
  }
}

const getProgressColorClass = (progress: number) => {
  if (progress < 30) return 'bg-red-500'
  if (progress < 70) return 'bg-yellow-500'
  if (progress < 100) return 'bg-blue-500'
  return 'bg-green-500'
}

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'Non définie'
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('fr-FR', options)
}

const getAssignedUserName = (userId: number | undefined) => {
  if (!userId) return 'Non assigné'
  const user = props.users.find((u) => u.id === userId)
  return user ? `${user.first_name} ${user.last_name}` : 'Utilisateur inconnu'
}
</script>

<style scoped>
.action-card {
  margin-bottom: 1rem;
}

.progress {
  margin-bottom: 0.5rem;
}
</style>
