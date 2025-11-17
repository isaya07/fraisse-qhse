<template>
  <div class="action-card card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <span :class="`icon is-large ${getPriorityColorClass(action.priority)}`">
            <font-awesome-icon :icon="getIconForActionType(action.type)" size="2x" />
          </span>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ action.title }}</p>
          <p class="subtitle is-6">
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

      <div class="content">
        <p v-if="action.description">{{ action.description }}</p>

        <div class="columns is-mobile">
          <div class="column is-narrow">
            <p><strong>Progression:</strong></p>
            <progress
              class="progress"
              :class="getProgressColorClass(action.progress)"
              :value="action.progress"
              max="100"
            >
              {{ action.progress }}%
            </progress>
            <p class="has-text-centered">{{ action.progress }}%</p>
          </div>

          <div class="column">
            <p v-if="action.due_date">
              <strong>Échéance:</strong> {{ formatDate(action.due_date) }}
            </p>
            <p v-if="action.assigned_to">
              <strong>Assigné à:</strong> {{ getAssignedUserName(action.assigned_to) }}
            </p>
            <p><strong>Type:</strong> {{ getTypeText(action.type) }}</p>
          </div>
        </div>
      </div>

      <nav class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <Button
              :icon="['fas', 'eye']"
              text="Voir"
              variant="info"
              @click="$emit('view', action.id)"
            />
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <Button
              :icon="['fas', 'edit']"
              text="Éditer"
              variant="warning"
              @click="$emit('edit', action.id)"
            />
          </div>
          <div class="level-item">
            <Button
              :icon="['fas', 'trash']"
              text="Supprimer"
              variant="danger"
              @click="$emit('delete', action.id)"
            />
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Action, User } from '../../stores/app'
import Button from '../ui/MyButton.vue'

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
      return 'has-text-info'
    case 'in_progress':
      return 'has-text-info'
    case 'completed':
      return 'has-text-success'
    case 'cancelled':
      return 'has-text-danger'
    default:
      return 'has-text-light'
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
      return 'has-text-success'
    case 'medium':
      return 'has-text-warning'
    case 'high':
      return 'has-text-danger'
    case 'critical':
      return 'has-text-danger'
    default:
      return 'has-text-light'
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
  if (progress < 30) return 'is-danger'
  if (progress < 70) return 'is-warning'
  if (progress < 100) return 'is-info'
  return 'is-success'
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
