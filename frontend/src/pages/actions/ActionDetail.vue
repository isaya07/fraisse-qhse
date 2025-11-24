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
        <div>
          <div class="flex items-center gap-3">
            <h2>{{ action?.title }}</h2>
            <Tag
              :value="getStatusLabel(action?.status)"
              :severity="getStatusSeverity(action?.status)"
            />
          </div>
        </div>
      </div>
      <div class="flex gap-2">
        <Button label="Modifier" @click="editAction" severity="warning" outlined>
          <template #icon>
            <font-awesome-icon icon="pencil" class="mr-2" />
          </template>
        </Button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-12">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-gray-500" />
    </div>

    <!-- Content -->
    <div v-else-if="action" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Info -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Meta Info -->
        <Card>
          <template #title><h4>Informations</h4></template>
          <template #content>
            <div>
              <span class="block text-lg text-color-secondary">Type</span>
              <div class="flex items-center gap-2 mt-1">
                <font-awesome-icon
                  :icon="['fas', action.action_type?.icon || 'tasks']"
                  :style="{ color: action.action_type?.color }"
                />
                <span class="font-medium">{{ action.action_type?.name || '-' }}</span>
              </div>
            </div>
            <div>
              <span class="block text-sm text-gray-500">Description</span>
              <p class="text-gray-700 whitespace-pre-line">
                {{ action.description || 'Aucune description.' }}
              </p>
            </div>
            <div>
              <span class="block text-sm text-gray-500">Priorité</span>
              <Tag
                :value="getPriorityLabel(action.priority)"
                :severity="getPrioritySeverity(action.priority)"
                class="mt-1"
              />
            </div>
            <div>
              <span class="block text-sm text-gray-500">Responsable</span>
              <div v-if="action.assignee" class="flex items-center gap-2 mt-1">
                <Avatar :label="getInitials(action.assignee)" shape="circle" size="normal" />
                <span class="font-medium"
                  >{{ action.assignee.first_name }} {{ action.assignee.last_name }}</span
                >
              </div>
              <span v-else class="text-gray-400 italic mt-1 block">Non assigné</span>
            </div>
            <div>
              <span class="block text-sm text-gray-500">Créé par</span>
              <div class="mt-1 font-medium">
                {{
                  action.creator
                    ? `${action.creator.first_name} ${action.creator.last_name}`
                    : 'Système'
                }}
              </div>
              <div class="text-xs text-gray-400">{{ formatDate(action.created) }}</div>
            </div>
          </template>
        </Card>

        <!-- Documents (Placeholder) -->
        <Card>
          <template #title><h4>Documents liés</h4></template>
          <template #content>
            <p class="text-gray-500 italic">Fonctionnalité à venir...</p>
          </template>
        </Card>
      </div>

      <!-- Sidebar Info -->
      <div class="space-y-6">
        <!-- Progress -->
        <Card>
          <template #title><h4>Progression</h4></template>
          <template #content>
            <div class="flex items-center gap-4">
              <ProgressBar :value="action.progress" :showValue="true" class="flex-1 h-4" />
              <span class="font-bold text-gray-700">{{ action.progress }}%</span>
            </div>
          </template>
        </Card>
        <!-- Dates -->
        <Card>
          <template #title><h4>Dates clés</h4></template>
          <template #content>
            <div>
              <span class="block text-sm text-gray-500">Échéance</span>
              <div
                class="mt-1 font-medium"
                :class="{ 'text-red-500': isOverdue(action.due_date, action.status) }"
              >
                {{ formatDate(action.due_date) }}
              </div>
            </div>

            <div v-if="action.completed_date">
              <span class="block text-sm text-gray-500">Date de fin</span>
              <div class="mt-1 font-medium text-green-600">
                {{ formatDate(action.completed_date) }}
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="text-center py-12">
      <font-awesome-icon icon="exclamation-circle" class="text-red-500 text-5xl mb-4" />
      <h3 class="text-lg font-medium text-gray-900">Action introuvable</h3>
      <Button label="Retour à la liste" @click="goBack" severity="secondary" class="mt-4" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useActionStore } from '@/stores/actions'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import ProgressBar from 'primevue/progressbar'
import Avatar from 'primevue/avatar'
import type { User } from '@/stores/app'

const route = useRoute()
const router = useRouter()
const actionStore = useActionStore()

const actionId = Number(route.params.id)
const loading = ref(true)

const action = computed(() => actionStore.currentAction)

onMounted(async () => {
  if (actionId) {
    loading.value = true
    await actionStore.fetchActionById(actionId)
    loading.value = false
  }
})

// Helpers
const getPriorityLabel = (value: string | undefined) => {
  if (!value) return '-'
  const map: Record<string, string> = {
    low: 'Basse',
    medium: 'Moyenne',
    high: 'Haute',
    critical: 'Critique',
  }
  return map[value] || value
}

const getPrioritySeverity = (value: string | undefined): string => {
  if (!value) return 'secondary'
  const map: Record<string, string> = {
    low: 'info',
    medium: 'warn',
    high: 'danger',
    critical: 'danger',
  }
  return map[value] || 'info'
}

const getStatusLabel = (value: string | undefined) => {
  if (!value) return '-'
  const map: Record<string, string> = {
    open: 'Ouvert',
    in_progress: 'En cours',
    completed: 'Terminé',
    cancelled: 'Annulé',
  }
  return map[value] || value
}

const getStatusSeverity = (value: string | undefined): string => {
  if (!value) return 'secondary'
  const map: Record<string, string> = {
    open: 'info',
    in_progress: 'warn',
    completed: 'success',
    cancelled: 'secondary',
  }
  return map[value] || 'secondary'
}

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const isOverdue = (dateString: string | undefined, status: string | undefined) => {
  if (!dateString || !status || status === 'completed' || status === 'cancelled') return false
  return new Date(dateString) < new Date()
}

const getInitials = (user: User) => {
  return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase()
}

// Actions
const goBack = () => {
  router.back()
}

const editAction = () => {
  router.push(`/actions/${actionId}/edit`)
}
</script>
