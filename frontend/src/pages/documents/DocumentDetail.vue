<template>
  <div class="h-[calc(100vh-6rem)] p-4 flex flex-col" v-if="document">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4 shrink-0">
      <div class="flex items-center gap-3">
        <Button text rounded severity="secondary" @click="goBack">
          <template #icon>
            <font-awesome-icon icon="arrow-left" />
          </template>
        </Button>
        <div>
          <div class="flex items-center gap-2">
            <h2 class="m-0 text-2xl font-semibold">{{ document.title }}</h2>
            <Tag
              :value="getStatusLabel(document.status)"
              :severity="getStatusSeverity(document.status)"
            />
          </div>
          <span class="text-sm text-color-secondary">{{ document.filename }}</span>
        </div>
      </div>

      <div class="flex gap-2">
        <!-- Approval Workflow -->
        <template v-if="document.status === 'draft' || document.status === 'rejected'">
          <Button label="Demander approbation" severity="help" @click="requestApproval">
            <template #icon>
              <font-awesome-icon icon="paper-plane" class="mr-2" />
            </template>
          </Button>
        </template>
        <template v-if="document.status === 'pending_approval' && canApprove">
          <Button label="Rejeter" severity="danger" outlined @click="rejectDocument">
            <template #icon>
              <font-awesome-icon icon="times" class="mr-2" />
            </template>
          </Button>
          <Button label="Approuver" severity="success" @click="approveDocument">
            <template #icon>
              <font-awesome-icon icon="check" class="mr-2" />
            </template>
          </Button>
        </template>

        <Button
          v-if="document.status === 'approved'"
          label="Nouvelle version"
          severity="info"
          @click="openNewVersionDialog"
        >
          <template #icon>
            <font-awesome-icon icon="upload" class="mr-2" />
          </template>
        </Button>
        <Button label="Modifier" severity="secondary" outlined @click="editDocument">
          <template #icon>
            <font-awesome-icon icon="pen" class="mr-2" />
          </template>
        </Button>
        <Button label="Télécharger" severity="primary" @click="downloadFile">
          <template #icon>
            <font-awesome-icon icon="download" class="mr-2" />
          </template>
        </Button>
        <Button severity="danger" text rounded @click="confirmDelete" v-tooltip.top="'Supprimer'">
          <template #icon>
            <font-awesome-icon icon="trash" />
          </template>
        </Button>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="flex-1 flex gap-4 min-h-0 overflow-hidden">
      <!-- Left: Preview (flex-1) -->
      <div
        class="flex-1 flex flex-col bg-surface-0 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl shadow-sm overflow-hidden relative"
      >
        <!-- Loading State -->
        <div
          v-if="loadingPreview"
          class="absolute inset-0 flex items-center justify-center bg-surface-0/50 z-10"
        >
          <font-awesome-icon icon="spinner" spin class="text-4xl text-primary" />
        </div>

        <!-- PDF Preview -->
        <iframe
          v-if="previewUrl && previewType === 'pdf'"
          :src="previewUrl"
          class="w-full h-full border-none"
          title="Document Preview"
        ></iframe>

        <!-- Image Preview -->
        <div
          v-else-if="previewUrl && previewType === 'image'"
          class="w-full h-full flex items-center justify-center p-4 bg-surface-100 dark:bg-surface-900"
        >
          <img
            :src="previewUrl"
            class="max-w-full max-h-full object-contain shadow-md"
            alt="Preview"
          />
        </div>

        <!-- No Preview -->
        <div
          v-else
          class="w-full h-full flex flex-col items-center justify-center bg-surface-50 dark:bg-surface-900 text-color-secondary p-8 text-center"
        >
          <FileIcon :filename="document.filename" size="xl" class="mb-4 !text-9xl opacity-50" />
          <p class="text-xl font-medium mb-2">Aperçu non disponible</p>
          <p class="text-sm mb-6 max-w-md">
            Ce type de fichier ne peut pas être prévisualisé directement. Veuillez le télécharger
            pour le consulter.
          </p>
          <Button label="Télécharger le fichier" @click="downloadFile">
            <template #icon>
              <font-awesome-icon icon="download" class="mr-2" />
            </template>
          </Button>
        </div>
      </div>

      <!-- Right: Info Panel (w-1/3) -->
      <div class="w-full md:w-[450px] shrink-0 flex flex-col gap-4 overflow-y-auto">
        <!-- Details Section -->
        <Card>
          <template #title>
            <div class="text-lg font-bold flex items-center gap-2">
              <font-awesome-icon icon="circle-info" class="text-primary" />
              Détails
            </div>
          </template>
          <template #content>
            <div class="flex flex-col gap-4">
              <div class="grid grid-cols-2 gap-y-4 text-sm">
                <div class="text-color-secondary">Version</div>
                <div class="font-medium text-color">{{ document.version }}</div>

                <div class="text-color-secondary">Type</div>
                <div>
                  <Tag
                    v-if="document.category"
                    :value="document.category.name"
                    :style="{
                      backgroundColor: document.category.color || 'var(--surface-500)',
                      color: '#fff',
                    }"
                    class="text-xs"
                  />
                  <span v-else>-</span>
                </div>

                <div class="text-color-secondary">Créé par</div>
                <div class="font-medium text-color">
                  {{ document.creator?.first_name }} {{ document.creator?.last_name }}
                </div>

                <div class="text-color-secondary">Date création</div>
                <div class="text-color">{{ formatDate(document.created_at) }}</div>

                <div class="text-color-secondary">Mise à jour</div>
                <div class="text-color">{{ formatDate(document.updated_at) }}</div>

                <div class="text-color-secondary">Taille</div>
                <div class="text-color">{{ formatFileSize(document.file_size) }}</div>
              </div>

              <div
                v-if="document.description"
                class="pt-3 border-t border-surface-200 dark:border-surface-700"
              >
                <div class="text-color-secondary text-sm mb-1">Description</div>
                <p class="m-0 text-sm leading-relaxed text-color">{{ document.description }}</p>
              </div>
            </div>
          </template>
        </Card>

        <!-- Actions Linked -->
        <Card v-if="document.actions && document.actions.length > 0">
          <template #title>
            <div class="text-lg font-bold flex items-center gap-2">
              <font-awesome-icon icon="list-check" class="text-primary" />
              Actions liées
            </div>
          </template>
          <template #content>
            <div class="flex flex-col gap-2">
              <div
                v-for="action in document.actions"
                :key="action.id"
                class="p-3 border border-surface-200 dark:border-surface-700 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700/50 cursor-pointer transition-colors bg-surface-50/50 dark:bg-surface-700/20"
                @click="router.push(`/actions/${action.id}`)"
              >
                <div class="flex justify-between items-start mb-1">
                  <span class="font-medium text-sm line-clamp-2 text-color">{{
                    action.title
                  }}</span>
                  <Tag
                    :severity="getPrioritySeverity(action.priority)"
                    class="text-[10px] px-2"
                    :value="getPriorityLabel(action.priority)"
                  />
                </div>
                <div class="flex justify-between items-center text-xs text-color-secondary">
                  <span>{{ getStatusLabel(action.status) }}</span>
                  <span v-if="action.due_date">{{ formatDate(action.due_date) }}</span>
                </div>
              </div>
            </div>
          </template>
        </Card>

        <!-- Versions -->
        <DocumentVersionHistory
          v-if="document"
          :document-id="document.id"
          :current-version="document.version"
          @restore="handleRestoreVersion"
        />
      </div>
    </div>
  </div>

  <div v-else class="flex justify-center items-center h-[calc(100vh-6rem)]">
    <font-awesome-icon icon="spinner" spin size="3x" class="text-primary opacity-50" />
  </div>

  <!-- Upload New Version Dialog -->
  <UploadNewVersionDialog
    v-if="document"
    v-model:visible="uploadDialogVisible"
    :current-version="document.version"
    :loading="uploading"
    @upload="handleUploadVersion"
  />
</template>

<script setup lang="ts">
import { onMounted, computed, ref, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDocumentStore } from '@/stores/documents'
import { useDocumentVersionStore } from '@/stores/documentVersions'
import { useAppStore } from '@/stores/app'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { useApi } from '@/composables/useApi'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import FileIcon from '@/components/common/FileIcon.vue'
import DocumentVersionHistory from '@/components/documents/DocumentVersionHistory.vue'
import UploadNewVersionDialog from '@/components/documents/UploadNewVersionDialog.vue'

const route = useRoute()
const router = useRouter()
const store = useDocumentStore()
const versionStore = useDocumentVersionStore()
const appStore = useAppStore()
const confirm = useConfirm()
const toast = useToast()
const { get } = useApi()

const uploadDialogVisible = ref(false)
const uploading = ref(false)
const previewUrl = ref<string | null>(null)
const loadingPreview = ref(false)

const document = computed(() => store.currentDocument)

const previewType = computed(() => {
  if (!document.value || !document.value.filename) return 'other'
  const ext = document.value.filename.split('.').pop()?.toLowerCase()
  if (ext === 'pdf') return 'pdf'
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) return 'image'
  return 'other'
})

// Load Preview
const loadPreview = async () => {
  if (!document.value) return

  // Only fetch for PDF or Images
  if (previewType.value === 'other') return

  loadingPreview.value = true
  try {
    // We reuse the download endpoint but asking for blob
    const response = await get<Blob>(`/documents/${document.value.id}/download`, {
      responseType: 'blob',
    })

    if (response.success && response.data) {
      // Revoke old URL if exists
      if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)

      // Create new URL
      const blob = new Blob([response.data], {
        type: document.value.mime_type || 'application/pdf',
      }) // Default to PDF if mime missing logic
      previewUrl.value = URL.createObjectURL(blob)
    }
  } catch (e) {
    console.error('Preview failed', e)
  } finally {
    loadingPreview.value = false
  }
}

const goBack = () => {
  router.back()
}

const editDocument = () => {
  router.push(`/documents/${route.params.id}/edit`)
}

const downloadFile = async () => {
  if (!document.value) return
  try {
    toast.add({
      severity: 'info',
      summary: 'Téléchargement',
      detail: 'Le téléchargement a commencé...',
      life: 3000,
    })
    await store.downloadDocument(document.value.id, document.value.filename)
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Erreur lors du téléchargement',
      life: 3000,
    })
  }
}

const confirmDelete = () => {
  confirm.require({
    message: 'Voulez-vous vraiment supprimer ce document ?',
    header: 'Confirmation',
    icon: 'exclamation-triangle',
    acceptClass: 'p-button-danger',
    rejectClass: 'p-button-secondary',
    rejectLabel: 'Annuler',
    acceptLabel: 'Supprimer',
    accept: async () => {
      try {
        if (document.value) {
          await store.deleteDocument(document.value.id)
          toast.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Document supprimé',
            life: 3000,
          })
          router.push('/documents')
        }
      } catch {
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de la suppression',
          life: 3000,
        })
      }
    },
  })
}

const openNewVersionDialog = () => {
  uploadDialogVisible.value = true
}

const handleUploadVersion = async (data: {
  file: File
  changelog: string
  versionType: string
}) => {
  if (!document.value) return
  uploading.value = true
  try {
    const formData = new FormData()
    formData.append('file', data.file)
    formData.append('changelog', data.changelog)
    formData.append('version_type', data.versionType)

    await versionStore.createVersion(document.value.id, formData)

    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Nouvelle version créée avec succès',
      life: 3000,
    })
    uploadDialogVisible.value = false

    // Refresh
    await store.fetchDocumentById(parseInt(route.params.id as string))
    await versionStore.fetchVersions(document.value.id)
    loadPreview()
  } catch (error) {
    console.error('Error uploading version:', error)
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Impossible de créer la nouvelle version',
      life: 3000,
    })
  } finally {
    uploading.value = false
  }
}

const handleRestoreVersion = (version: any) => {
  confirm.require({
    message: `Voulez-vous vraiment restaurer la version ${version.version} ? Cela créera une nouvelle version majeure basée sur ce fichier.`,
    header: 'Confirmation de restauration',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-warning',
    acceptLabel: 'Restaurer',
    rejectLabel: 'Annuler',
    accept: async () => {
      try {
        await versionStore.restoreVersion(version.id)
        toast.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Version restaurée avec succès',
          life: 3000,
        })
        if (document.value) {
          await store.fetchDocumentById(document.value.id)
          loadPreview()
        }
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de restaurer la version',
          life: 3000,
        })
      }
    },
  })
}

const canApprove = computed(() => {
  return ['admin', 'manager'].includes(appStore.user?.role || '')
})

const requestApproval = async () => {
  if (!document.value) return
  try {
    await store.requestApproval(document.value.id)
    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: "Demande d'approbation envoyée",
      life: 3000,
    })
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Erreur lors de la demande',
      life: 3000,
    })
  }
}

const approveDocument = async () => {
  if (!document.value) return
  try {
    await store.approveDocument(document.value.id)
    toast.add({ severity: 'success', summary: 'Succès', detail: 'Document approuvé', life: 3000 })
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: "Erreur lors de l'approbation",
      life: 3000,
    })
  }
}

const rejectDocument = async () => {
  if (!document.value) return
  try {
    await store.rejectDocument(document.value.id)
    toast.add({ severity: 'success', summary: 'Succès', detail: 'Document rejeté', life: 3000 })
  } catch {
    toast.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors du rejet', life: 3000 })
  }
}

// Helpers
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const formatFileSize = (bytes: number | undefined) => {
  if (bytes === undefined) return '-'
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getStatusLabel = (value: string | undefined) => {
  if (!value) return '-'
  const map: Record<string, string> = {
    draft: 'Brouillon',
    pending_approval: 'En attente',
    approved: 'Approuvé',
    rejected: 'Rejeté',
    archived: 'Archivé',
    open: 'Ouvert',
    in_progress: 'En cours',
    closed: 'Fermé',
    done: 'Terminé',
  }
  return map[value] || value
}

const getStatusSeverity = (value: string | undefined): string => {
  if (!value) return 'secondary'
  const map: Record<string, string> = {
    draft: 'secondary',
    pending_approval: 'warn',
    approved: 'success',
    rejected: 'danger',
    archived: 'contrast',
  }
  return map[value] || 'secondary'
}

const getPriorityLabel = (value: string | undefined): string => {
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

watch(
  () => store.currentDocument,
  (newDoc) => {
    if (newDoc) {
      loadPreview()
    }
  },
  { immediate: true },
)

onMounted(async () => {
  const id = parseInt(route.params.id as string)
  if (id) {
    await store.fetchDocumentById(id)
  }
})

onUnmounted(() => {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
})
</script>
