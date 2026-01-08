<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div
      v-for="session in sessions"
      :key="session.id"
      class="p-card p-component p-4 flex flex-col justify-between h-full hover:shadow-lg transition-shadow bg-surface-0 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg"
    >
      <div class="flex justify-between items-start mb-3">
        <Tag
          :value="getStatusLabel(session.status)"
          :severity="getStatusSeverity(session.status)"
          class="text-xs"
        />
      </div>

      <div class="flex justify-between items-start mb-4">
        <h3 class="text-lg font-semibold text-color truncate pr-2">{{ session.training.title }}</h3>
        <Button
          v-if="session.can?.update"
          text
          rounded
          severity="secondary"
          @click="$emit('edit', session.id)"
        >
          <template #icon>
            <font-awesome-icon icon="pencil" />
          </template>
        </Button>
      </div>

      <div class="space-y-3 mb-4">
        <div class="flex items-center text-color-secondary text-sm" v-if="session.organization">
          <font-awesome-icon icon="building" class="mr-2" /> {{ session.organization.name }}
        </div>
        <div class="flex items-center text-color-secondary text-sm">
          <font-awesome-icon icon="calendar" class="mr-2" />
          {{ formatDate(session.start_date) }} - {{ formatDate(session.end_date) }}
        </div>
        <div class="flex items-center text-color-secondary text-sm" v-if="session.location">
          <font-awesome-icon icon="map-marker-alt" class="mr-2" />
          {{ session.location || 'Non spécifié' }}
        </div>
      </div>

      <div class="flex justify-between items-center pt-4 border-t border-surface-border">
        <div class="flex -space-x-2 overflow-hidden">
          <!-- Avatars -->
          <Avatar
            v-for="participation in (session.participations || []).slice(0, 3)"
            :key="participation.id"
            :label="getInitials(participation.user)"
            shape="circle"
            class="border-2 border-surface-0 dark:border-surface-900"
          />
          <div
            v-if="(session.participations?.length || 0) > 3"
            class="flex items-center justify-center w-8 h-8 rounded-full bg-surface-200 dark:bg-surface-700 text-xs border-2 border-surface-0 dark:border-surface-900"
          >
            +{{ (session.participations?.length || 0) - 3 }}
          </div>
        </div>
        <Button label="Détails" size="small" outlined @click="$emit('view', session.id)">
          <template #icon>
            <font-awesome-icon icon="arrow-right" class="mr-2" />
          </template>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TrainingSession } from '@/stores/training'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

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

const getInitials = (user: any) => {
  if (!user) return ''
  return `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase()
}
</script>
