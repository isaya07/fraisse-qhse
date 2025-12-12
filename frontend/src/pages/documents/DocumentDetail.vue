<template>
  <div class="p-4 flex flex-col" v-if="document">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
      <div class="flex items-center gap-4">
        <Button text rounded severity="secondary" @click="goBack">
          <template #icon>
            <font-awesome-icon icon="arrow-left" />
          </template>
        </Button>
        <h2 class="mt-0!">{{ document.title }}</h2>
        <Tag
          :value="getStatusLabel(document.status)"
          :severity="getStatusSeverity(document.status)"
        />
      </div>
      <div class="flex gap-2">
        <!-- New Version Section (only for approved documents) -->
        <ButtonGroup>
          <Button
            v-if="document.status === 'approved'"
            label="Nouvelle version"
            severity="info"
            @click="openNewVersionDialog"
          >
            <template #icon>
              <font-awesome-icon icon="upload" />
            </template>
          </Button>
          <Button label="Télécharger" severity="primary" @click="downloadFile">
            <template #icon>
              <font-awesome-icon icon="download" />
            </template>
          </Button>
          <Button label="Modifier" severity="success" @click="editDocument">
            <template #icon>
              <font-awesome-icon icon="pencil" />
            </template>
          </Button>
          <Button label="Supprimer" severity="danger" @click="confirmDelete">
            <template #icon>
              <font-awesome-icon icon="trash" />
            </template>
          </Button>
        </ButtonGroup>
      </div>
    </div>

    <div class="flex justify-end gap-2 mb-2">
      <Button
        v-if="document.status === 'draft' || document.status === 'rejected'"
        label="Demander approbation"
        severity="help"
        @click="requestApproval"
      >
        <template #icon>
          <font-awesome-icon icon="paper-plane" />
        </template>
      </Button>
      <template v-if="document.status === 'pending_approval' && canApprove">
        <ButtonGroup>
          <Button label="Rejeter" severity="danger" outlined @click="rejectDocument">
            <template #icon>
              <font-awesome-icon icon="times" />
            </template>
          </Button>
          <Button label="Approuver" severity="success" @click="approveDocument">
            <template #icon>
              <font-awesome-icon icon="check" />
            </template>
          </Button>
        </ButtonGroup>
      </template>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 flex flex-col gap-6">
        <!-- Info Card -->
        <Card>
          <template #title>
            <div class="flex items-center gap-2 mb-2">
              <font-awesome-icon icon="info-circle" />
              <span>Informations Générales</span>
            </div>
          </template>
          <template #content>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span class="block text-sm text-color-secondary font-bold">Type : </span>
                <Tag
                  v-if="document.category"
                  :value="document.category.name"
                  :style="{
                    backgroundColor: document.category.color || 'var(--surface-500)',
                    color: '#fff',
                  }"
                >
                  <template #icon>
                    <font-awesome-icon
                      v-if="document.category.icon"
                      :icon="['fas', document.category.icon]"
                      class="mr-1"
                    />
                  </template>
                </Tag>
                <span v-else class="text-color-secondary">Non défini</span>
              </div>
              <div>
                <span class="block text-sm text-color-secondary font-bold">Version : </span>
                <span class="font-medium text-color">{{ document.version }}</span>
              </div>
              <div>
                <span class="block text-sm text-color-secondary font-bold">Créé par : </span>
                <span class="font-medium text-color"
                  >{{ document.creator?.first_name }} {{ document.creator?.last_name }}</span
                >
              </div>
              <div>
                <span class="block text-sm text-color-secondary font-bold"
                  >Date de création :
                </span>
                <span class="font-medium text-color">{{ formatDate(document.created_at) }}</span>
              </div>
              <div v-if="document.approver">
                <span class="block text-sm text-color-secondary font-bold">Approuvé par : </span>
                <span class="font-medium text-color"
                  >{{ document.approver?.first_name }} {{ document.approver?.last_name }}</span
                >
              </div>
              <div v-if="document.published_date">
                <span class="block text-sm text-color-secondary font-bold"
                  >Date de publication</span
                >
                <span class="font-medium text-color">{{
                  formatDate(document.published_date)
                }}</span>
              </div>
              <div v-if="document.expires_date">
                <span class="block text-sm text-color-secondary font-bold"
                  >Date d'expiration :
                </span>
                <span class="font-medium text-red-500">{{
                  formatDate(document.expires_date)
                }}</span>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t border-surface-border" v-if="document.description">
              <span class="block text-sm text-color-secondary font-bold mb-1">Description : </span>
              <p class="text-color">{{ document.description }}</p>
            </div>
          </template>
        </Card>
        <!-- Version History -->
        <DocumentVersionHistory
          v-if="document"
          :document-id="document.id"
          :current-version="document.version"
          @restore="handleRestoreVersion"
        />
      </div>

      <!-- Sidebar -->
      <div class="flex flex-col gap-6">
        <!-- File Details -->
        <Card>
          <template #title>
            <div class="flex items-center gap-2 mb-2">
              <font-awesome-icon icon="file" />
              <span>Fichier</span>
            </div>
          </template>
          <template #content>
            <div class="flex flex-col gap-3 text-sm">
              <div class="flex justify-between">
                <span class="text-color-secondary font-bold">Nom : </span>
                <span class="text-color truncate" :title="document.filename">{{
                  document.filename
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-color-secondary font-bold">Taille : </span>
                <span class="text-color">{{ formatFileSize(document.file_size) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-color-secondary font-bold">Type MIME : </span>
                <span class="text-color truncate" :title="document.mime_type">{{
                  document.mime_type || '-'
                }}</span>
                <font-awesome-icon :icon="getFileIcon(document.filename)" />
              </div>
            </div>
          </template>
        </Card>

        <!-- Linked Actions -->
        <Card>
          <template #title>
            <div class="flex items-center gap-2 mb-2">
              <font-awesome-icon icon="tasks" />
              <span>Actions Liées</span>
            </div>
          </template>
          <template #content>
            <div v-if="document.actions && document.actions.length > 0" class="flex flex-col gap-3">
              <div
                v-for="action in document.actions"
                :key="action.id"
                class="p-3 border rounded-lg hover:bg-surface-50 cursor-pointer transition-colors"
                @click="router.push(`/actions/${action.id}`)"
              >
                <div class="flex justify-between items-start mb-1">
                  <span class="font-medium text-color text-sm line-clamp-2">{{
                    action.title
                  }}</span>
                  <Tag
                    :severity="getPrioritySeverity(action.priority)"
                    class="text-xs"
                    :value="getPriorityLabel(action.priority).charAt(0)"
                  />
                </div>
                <div class="flex justify-between items-center text-xs text-color-secondary">
                  <span>{{ getStatusLabel(action.status) }}</span>
                  <span v-if="action.due_date">{{ formatDate(action.due_date) }}</span>
                </div>
              </div>
            </div>
            <div v-else class="text-color-secondary text-sm italic">Aucune action liée.</div>
          </template>
        </Card>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center py-12">
    <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-gray-500" />
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
import { onMounted, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDocumentStore } from '@/stores/documents'
import { useDocumentVersionStore } from '@/stores/documentVersions'
import { useAppStore } from '@/stores/app'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import DocumentVersionHistory from '@/components/documents/DocumentVersionHistory.vue'
import UploadNewVersionDialog from '@/components/documents/UploadNewVersionDialog.vue'

const route = useRoute()
const router = useRouter()
const store = useDocumentStore()
const versionStore = useDocumentVersionStore()
const appStore = useAppStore()
const confirm = useConfirm()
const toast = useToast()

const uploadDialogVisible = ref(false)
const uploading = ref(false)

const document = computed(() => store.currentDocument)

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

    // Recharger le document et les versions
    await store.fetchDocumentById(parseInt(route.params.id as string))
    await versionStore.fetchVersions(document.value.id)
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

        // Recharger le document pour voir la nouvelle version courante
        if (document.value) {
          await store.fetchDocumentById(document.value.id)
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

const getFileIcon = (filename: string | undefined) => {
  if (!filename) return 'file'
  const ext = filename.split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'pdf':
      return 'file-pdf'
    case 'doc':
    case 'docx':
      return 'file-word'
    case 'xls':
    case 'xlsx':
      return 'file-excel'
    case 'jpg':
    case 'png':
    case 'jpeg':
      return 'image'
    default:
      return 'file'
  }
}

const getStatusLabel = (value: string | undefined) => {
  if (!value) return '-'
  const map: Record<string, string> = {
    draft: 'Brouillon',
    pending_approval: 'En attente',
    approved: 'Approuvé',
    rejected: 'Rejeté',
    archived: 'Archivé',
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

onMounted(async () => {
  const id = parseInt(route.params.id as string)
  if (id) {
    await store.fetchDocumentById(id)
  }
})
</script>
