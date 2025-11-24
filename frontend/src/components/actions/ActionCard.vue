<template>
  <Card
    class="hover:shadow-md transition-all duration-200 cursor-pointer h-full flex flex-col relative overflow-hidden group"
    @click="$emit('view', action.id)"
  >
    <!-- Left Border for Priority -->
    <div
      :class="`absolute left-0 top-0 bottom-0 w-1.5 ${getPriorityBorderClass(action.priority)}`"
    ></div>
    <template #content>
      <div class="flex-1 flex flex-col gap-4">
        <!-- Header: Type & Status -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <font-awesome-icon
              :icon="['fas', action.action_type?.icon || 'tasks']"
              :style="{ color: action.action_type?.color }"
              size="xl"
            />
            <span class="text-xl font-medium">{{ action.action_type?.name }}</span>
          </div>
          <Tag
            :value="getStatusText(action.status)"
            :severity="getStatusSeverity(action.status)"
            class="text-xs px-2 py-0.5"
          />
        </div>

        <!-- Title -->
        <h3 class="font-bold text-gray-900 text-lg leading-snug">
          {{ action.title }}
        </h3>

        <!-- Progress Bar -->
        <div class="mt-auto">
          <div class="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progression</span>
            <span class="font-medium">{{ action.progress }}%</span>
          </div>
          <!-- <ProgressBar
            :value="action.progress"
            :showValue="false"
            :class="getProgressColorClass(action.progress)"
          />  -->
          <div class="w-full bg-gray-100 rounded-full h-4">
            <div
              class="h-4 rounded-full transition-all duration-300"
              :class="getProgressColorClass(action.progress)"
              :style="{ width: `${action.progress}%` }"
            ></div>
          </div>
        </div>

        <!-- Footer: Assignee & Date -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-100 mt-2">
          <div class="flex items-center gap-2">
            <Avatar
              v-if="action.assignee"
              :label="getInitials(action.assignee)"
              shape="circle"
              size="small"
              class="w-8 h-8 text-xs"
              :style="{ backgroundColor: '#f1f5f9', color: '#475569' }"
            />
            <div class="flex flex-col">
              <span class="text-xs text-gray-500">Responsable</span>
              <span class="text-sm font-medium text-gray-700 truncate max-w-[120px]">
                {{
                  action.assignee
                    ? `${action.assignee.first_name} ${action.assignee.last_name}`
                    : 'Non assigné'
                }}
              </span>
            </div>
          </div>

          <div class="flex flex-col items-end">
            <span class="text-xs text-gray-500">Échéance</span>
            <div
              class="flex items-center gap-1.5 text-sm font-medium"
              :class="isOverdue ? 'text-red-600' : 'text-gray-700'"
            >
              <font-awesome-icon icon="calendar" class="text-xs" />
              <span>{{ formatDate(action.due_date) }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'
import type { Action, User } from '../../stores/app'
import Tag from 'primevue/tag'
import Avatar from 'primevue/avatar'

const props = defineProps({
  action: {
    type: Object as PropType<Action>,
    required: true,
  },
})

defineEmits(['view'])

// Helpers
const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    open: 'Ouvert',
    in_progress: 'En cours',
    completed: 'Terminé',
    cancelled: 'Annulé',
  }
  return map[status] || status
}

const getStatusSeverity = (status: string) => {
  const map: Record<string, string> = {
    open: 'info',
    in_progress: 'warn',
    completed: 'success',
    cancelled: 'secondary',
  }
  return map[status] || 'info'
}

const getPriorityBorderClass = (priority: string) => {
  const map: Record<string, string> = {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-orange-500',
    critical: 'bg-red-600',
  }
  return map[priority] || 'bg-gray-300'
}

const getProgressColorClass = (progress: number) => {
  if (progress >= 100) return 'bg-green-500'
  if (progress > 60) return 'bg-blue-500'
  if (progress > 30) return 'bg-yellow-500'
  return 'bg-gray-400'
}

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

const isOverdue = computed(() => {
  if (!props.action.due_date || ['completed', 'cancelled'].includes(props.action.status))
    return false
  return new Date(props.action.due_date) < new Date()
})

const getInitials = (user: User) => {
  return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase()
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
