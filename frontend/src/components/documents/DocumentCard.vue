<template>
  <div class="document-card bg-white rounded-lg shadow-md overflow-hidden mb-4">
    <div class="p-6">
      <div class="flex items-start">
        <div class="mr-4">
          <font-awesome-icon
            :icon="getIconForMimeType(document.mime_type)"
            size="2x"
            :class="getStatusColorClass(document.status)"
          />
        </div>
        <div class="flex-1">
          <h3 class="text-xl font-bold text-gray-800 mb-1">{{ document.title }}</h3>
          <p class="text-sm text-gray-600 mb-3">
            <span :class="getStatusColorClass(document.status)">
              {{ getStatusText(document.status) }}
            </span>
            • Version {{ document.version }}
          </p>
        </div>
      </div>

      <div class="mb-4">
        <p v-if="document.description" class="text-gray-700 mb-3">{{ document.description }}</p>
        <div class="flex flex-wrap gap-2">
          <span
            v-if="document.category"
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
          >
            {{ document.category }}
          </span>
          <span
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
          >
            Créé le {{ formatDate(document.created) }}
          </span>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row justify-between items-center">
        <div class="flex space-x-2 mb-4 sm:mb-0">
          <p-button
            :icon="['fas', 'eye']"
            label="Voir"
            severity="info"
            size="small"
            @click="$emit('view', document.id)"
          />
          <p-button
            :icon="['fas', 'download']"
            label="Télécharger"
            severity="primary"
            size="small"
            @click="$emit('download', document.filepath)"
          />
        </div>
        <div class="flex space-x-2">
          <p-button
            :icon="['fas', 'edit']"
            label="Éditer"
            severity="warning"
            size="small"
            @click="$emit('edit', document.id)"
          />
          <p-button
            :icon="['fas', 'trash']"
            label="Supprimer"
            severity="danger"
            size="small"
            @click="$emit('delete', document.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Document } from '../../stores/app'
import PButton from 'primevue/button'

defineProps({
  document: {
    type: Object as PropType<Document>,
    required: true,
  },
})

defineEmits(['view', 'edit', 'delete', 'download'])

const getIconForMimeType = (mimeType: string | undefined) => {
  if (!mimeType) return ['fas', 'file']

  if (mimeType.includes('pdf')) return ['fas', 'file-pdf']
  if (mimeType.includes('word')) return ['fas', 'file-word']
  if (mimeType.includes('excel')) return ['fas', 'file-excel']
  if (mimeType.includes('image')) return ['fas', 'file-image']
  if (mimeType.includes('text')) return ['fas', 'file-alt']

  return ['fas', 'file']
}

const getStatusColorClass = (status: string) => {
  switch (status) {
    case 'draft':
      return 'text-blue-500'
    case 'pending_approval':
      return 'text-yellow-500'
    case 'approved':
      return 'text-green-500'
    case 'rejected':
      return 'text-red-500'
    case 'archived':
      return 'text-gray-700'
    default:
      return 'text-gray-500'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'draft':
      return 'Brouillon'
    case 'pending_approval':
      return 'En attente'
    case 'approved':
      return 'Approuvé'
    case 'rejected':
      return 'Rejeté'
    case 'archived':
      return 'Archivé'
    default:
      return status
  }
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('fr-FR', options)
}
</script>

<style scoped>
.document-card {
  margin-bottom: 1rem;
}
</style>
