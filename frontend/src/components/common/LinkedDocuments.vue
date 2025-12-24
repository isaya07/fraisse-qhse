<template>
  <Card>
    <template #content>
      <div class="flex justify-between items-center mb-4">
        <h4>{{ title || 'Documents liés' }}</h4>
        <div class="flex gap-2" v-if="!readonly">
          <Button
            label="Lier un existant"
            size="small"
            severity="secondary"
            outlined
            @click="showLinkDialog = true"
          >
            <template #icon>
              <font-awesome-icon icon="link" class="mr-2" />
            </template>
          </Button>
          <Button label="Ajouter" size="small" @click="showAddDialog = true">
            <template #icon>
              <font-awesome-icon icon="plus" class="mr-2" />
            </template>
          </Button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-8">
        <font-awesome-icon icon="spinner" spin size="2x" class="text-color-secondary" />
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!documents || documents.length === 0"
        class="text-center py-8 text-color-secondary"
      >
        <p>Aucun document lié</p>
      </div>

      <!-- Document List -->
      <div v-else class="space-y-4">
        <div
          v-for="doc in documents"
          :key="doc.id"
          class="flex justify-between items-center border-b border-surface-border last:border-0 pb-4 last:pb-0"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xl"
            >
              <font-awesome-icon :icon="getFileIcon(doc.filename)" />
            </div>
            <div>
              <p
                class="font-medium text-color cursor-pointer hover:text-primary transition-colors"
                @click="$emit('request-download', doc)"
              >
                {{ doc.title || doc.filename }}
              </p>
              <p class="text-xs text-color-secondary">
                {{ formatDate(doc.created_at) }}
                <span v-if="doc.file_size"> • {{ formatFileSize(doc.file_size) }}</span>
              </p>
            </div>
          </div>
          <div class="flex gap-2">
            <Button
              text
              rounded
              aria-label="Télécharger"
              @click="$emit('request-download', doc)"
              v-tooltip.top="'Télécharger'"
            >
              <template #icon>
                <font-awesome-icon icon="download" />
              </template>
            </Button>
            <Button
              v-if="!readonly"
              text
              rounded
              severity="danger"
              aria-label="Délier"
              @click="confirmUnlink(doc)"
              v-tooltip.top="'Délier'"
            >
              <template #icon>
                <font-awesome-icon icon="unlink" />
              </template>
            </Button>
          </div>
        </div>
      </div>

      <!-- Dialog for Document Form (Add new) -->
      <Dialog
        v-model:visible="showAddDialog"
        header="Ajouter un document"
        :modal="true"
        class="p-fluid w-full max-w-2xl"
      >
        <DocumentForm
          :initial-data="initialDocumentData"
          submit-button-text="Ajouter"
          :loading="loading"
          @submit="onDocumentSubmit"
          @cancel="showAddDialog = false"
        />
      </Dialog>

      <!-- Dialog for Linking Existing Document -->
      <Dialog
        v-model:visible="showLinkDialog"
        header="Lier un document existant"
        :modal="true"
        class="p-fluid w-full max-w-lg"
      >
        <div class="flex flex-col gap-4">
          <p class="text-sm text-color-secondary">
            Recherchez un document existant dans la GED pour le lier.
          </p>
          <DocumentSelector @select="onLinkDocument" />
        </div>
      </Dialog>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import DocumentForm from '@/components/documents/DocumentForm.vue'
import DocumentSelector from '@/components/common/DocumentSelector.vue'

// Define Props
interface Props {
  documents: any[]
  title?: string
  readonly?: boolean
  loading?: boolean
  initialStatus?: string // For DocumentForm default status
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Documents liés',
  readonly: false,
  loading: false,
  initialStatus: 'approved',
})

// Define Emits
const emit = defineEmits(['request-link', 'request-unlink', 'request-create', 'request-download'])

// State
const showAddDialog = ref(false)
const showLinkDialog = ref(false)

const initialDocumentData = {
  status: props.initialStatus,
  version: '1.0',
}

// Helpers
const getFileIcon = (filename: string) => {
  if (!filename) return ['fas', 'file']
  const ext = filename.split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'pdf':
      return ['fas', 'file-pdf']
    case 'doc':
    case 'docx':
      return ['fas', 'file-word']
    case 'xls':
    case 'xlsx':
      return ['fas', 'file-excel']
    case 'jpg':
    case 'jpeg':
    case 'png':
      return ['fas', 'file-image']
    default:
      return ['fas', 'file']
  }
}

const formatDate = (date: string) => {
  if (!date) return '-'
  return format(new Date(date), 'dd MMM yyyy', { locale: fr })
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Handlers
const onLinkDocument = (doc: any) => {
  emit('request-link', doc)
  showLinkDialog.value = false
}

const onDocumentSubmit = (data: any) => {
  emit('request-create', data)
  showAddDialog.value = false
}

const confirmUnlink = (doc: any) => {
  emit('request-unlink', doc)
}
</script>
