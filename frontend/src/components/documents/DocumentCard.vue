<template>
  <div class="document-card card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <font-awesome-icon
            :icon="getIconForMimeType(document.mime_type)"
            size="2x"
            :class="getStatusColorClass(document.status)"
          />
        </div>
        <div class="media-content">
          <p class="title is-4">{{ document.title }}</p>
          <p class="subtitle is-6">
            <span :class="getStatusColorClass(document.status)">
              {{ getStatusText(document.status) }}
            </span>
            • Version {{ document.version }}
          </p>
        </div>
      </div>

      <div class="content">
        <p v-if="document.description">{{ document.description }}</p>
        <div class="tags">
          <span v-if="document.category" class="tag is-info">{{ document.category }}</span>
          <span class="tag is-light">Créé le {{ formatDate(document.created) }}</span>
        </div>
      </div>

      <nav class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <Button
              :icon="['fas', 'eye']"
              text="Voir"
              variant="info"
              @click="$emit('view', document.id)"
            />
          </div>
          <div class="level-item">
            <Button
              :icon="['fas', 'download']"
              text="Télécharger"
              variant="primary"
              @click="$emit('download', document.filepath)"
            />
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <Button
              :icon="['fas', 'edit']"
              text="Éditer"
              variant="warning"
              @click="$emit('edit', document.id)"
            />
          </div>
          <div class="level-item">
            <Button
              :icon="['fas', 'trash']"
              text="Supprimer"
              variant="danger"
              @click="$emit('delete', document.id)"
            />
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Document } from '../../stores/app'
import Button from '../ui/MyButton.vue'

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
      return 'has-text-info'
    case 'pending_approval':
      return 'has-text-warning'
    case 'approved':
      return 'has-text-success'
    case 'rejected':
      return 'has-text-danger'
    case 'archived':
      return 'has-text-dark'
    default:
      return 'has-text-light'
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
