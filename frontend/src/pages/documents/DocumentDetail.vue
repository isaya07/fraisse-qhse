<template>
  <div class="p-4" v-if="document">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div class="flex items-center gap-4">
        <Button text rounded severity="secondary" @click="goBack">
          <template #icon>
            <font-awesome-icon icon="arrow-left" />
          </template>
        </Button>
        <div>
          <h2>{{ document.title }}</h2>
          <div class="flex items-center gap-2 text-sm text-gray-500">
            <font-awesome-icon :icon="getFileIcon(document.filename)" />
            <span>{{ document.filename }}</span>
            <span class="mx-2">|</span>
            <Tag :value="getStatusLabel(document.status)" :severity="getStatusSeverity(document.status)" />
          </div>
        </div>
      </div>
      <div class="flex gap-2">
        <Button label="Télécharger" severity="secondary" outlined @click="downloadFile">
          <template #icon>
            <font-awesome-icon icon="download" class="mr-2" />
          </template>
        </Button>
        <Button label="Modifier" severity="primary" @click="editDocument">
          <template #icon>
            <font-awesome-icon icon="pencil" class="mr-2" />
          </template>
        </Button>
        <Button label="Supprimer" severity="danger" text @click="confirmDelete">
          <template #icon>
            <font-awesome-icon icon="trash" class="mr-2" />
          </template>
        </Button>
      </div>
    </div>

    <div class="flex justify-end gap-2 mb-6" v-if="document">
      <Button v-if="document.status === 'draft' || document.status === 'rejected'" label="Demander approbation"
        severity="help" @click="requestApproval">
        <template #icon>
          <font-awesome-icon icon="paper-plane" class="mr-2" />
        </template>
      </Button>
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
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 flex flex-col gap-6">
        <!-- Info Card -->
        <Card>
          <template #title>Informations Générales</template>
          <template #content>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span class="block text-sm text-gray-500">Type</span>
                <Tag :value="getCategoryLabel(document.category)" :severity="getCategorySeverity(document.category)" />
              </div>
              <div>
                <span class="block text-sm text-gray-500">Version</span>
                <span class="font-medium">{{ document.version }}</span>
              </div>
              <div>
                <span class="block text-sm text-gray-500">Créé par</span>
                <span class="font-medium">{{ document.creator?.first_name }} {{ document.creator?.last_name }}</span>
              </div>
              <div>
                <span class="block text-sm text-gray-500">Date de création</span>
                <span class="font-medium">{{ formatDate(document.created) }}</span>
              </div>
              <div v-if="document.expires_date">
                <span class="block text-sm text-gray-500">Date d'expiration</span>
                <span class="font-medium text-red-600">{{
                  formatDate(document.expires_date)
                }}</span>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t border-gray-100" v-if="document.description">
              <span class="block text-sm text-gray-500 mb-1">Description</span>
              <p class="text-gray-700">{{ document.description }}</p>
            </div>
          </template>
        </Card>
      </div>

      <!-- Sidebar -->
      <div class="flex flex-col gap-6">
        <!-- File Details -->
        <Card>
          <template #title>Fichier</template>
          <template #content>
            <div class="flex flex-col gap-3 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">Nom</span>
                <span class="font-medium truncate max-w-[150px]" :title="document.filename">{{
                  document.filename
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Taille</span>
                <span class="font-medium">{{ formatFileSize(document.file_size) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Type MIME</span>
                <span class="font-medium truncate max-w-[150px]" :title="document.mime_type">{{
                  document.mime_type || '-'
                }}</span>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center py-12">
    <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-gray-500" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDocumentStore } from '@/stores/documents'
import { useAppStore } from '@/stores/app'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Tag from 'primevue/tag'

const route = useRoute()
const router = useRouter()
const store = useDocumentStore()
const appStore = useAppStore()
const confirm = useConfirm()
const toast = useToast()

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

const getCategoryLabel = (value: string | undefined) => {
  if (!value) return '-'
  const map: Record<string, string> = {
    procedure: 'Procédure',
    form: 'Formulaire',
    consigne: 'Consigne',
    other: 'Autre',
  }
  return map[value] || value
}

const getCategorySeverity = (value: string | undefined): string => {
  if (!value) return 'secondary'
  const map: Record<string, string> = {
    procedure: 'info',
    form: 'warn',
    consigne: 'danger',
    other: 'secondary',
  }
  return map[value] || 'secondary'
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

onMounted(async () => {
  const id = parseInt(route.params.id as string)
  if (id) {
    await store.fetchDocumentById(id)
  }
})
</script>
