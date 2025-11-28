<template>
  <div class="p-4 h-[calc(100vh-6rem)] flex flex-col">
    <div class="flex justify-between items-center mb-2">
      <h2>Documents QHSE</h2>
      <div class="flex gap-2">
        <Button label="Nouveau document" @click="createNewDocument" severity="primary">
          <template #icon>
            <font-awesome-icon icon="plus" class="mr-2" />
          </template>
        </Button>
      </div>
    </div>

    <div class="flex flex-1 gap-4 overflow-hidden">
      <!-- Sidebar Dossiers -->
      <div class="w-1/4 flex flex-col">
        <DocumentFolderSidebar @select="onFolderSelect" @unselect="onFolderUnselect" />
      </div>

      <!-- Liste Documents -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <Card class="h-full flex flex-col">
          <template #title>
            <div class="flex flex-wrap gap-2 items-center justify-between px-4 py-2">
              <h4>
                {{ selectedFolder ? selectedFolder.name : 'Tous les documents' }}
              </h4>
              <IconField iconPosition="left">
                <InputIcon>
                  <font-awesome-icon icon="magnifying-glass" />
                </InputIcon>
                <InputText v-model="searchQuery" placeholder="Rechercher..." size="small" />
              </IconField>
            </div>
          </template>
          <template #content>
            <DataTable ref="dt" :value="documents" lazy :paginator="true" :rows="itemsPerPage"
              :totalRecords="totalRecords" :loading="loading" @page="onPage"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              :rowsPerPageOptions="[10, 25, 50]" currentPageReportTemplate="{first} - {last} / {totalRecords}"
              class="p-datatable-sm" scrollable scrollHeight="flex">
              <template #empty> Aucun document trouvé. </template>

              <Column field="title" header="Nom" sortable style="min-width: 200px">
                <template #body="{ data }">
                  <div class="flex items-center gap-2">
                    <font-awesome-icon :icon="getFileIcon(data.filename)" class="text-xl"
                      :class="getFileIconColor(data.filename)" />
                    <div class="flex flex-col">
                      <span class="font-medium">{{ data.title }}</span>
                      <span class="text-xs text-gray-500">{{ data.filename }}</span>
                    </div>
                  </div>
                </template>
              </Column>

              <Column field="category" header="Type" sortable style="width: 120px">
                <template #body="{ data }">
                  <Tag :value="getCategoryLabel(data.category)" :severity="getCategorySeverity(data.category)" />
                </template>
              </Column>

              <Column field="version" header="Ver." style="width: 80px">
                <template #body="{ data }">
                  <span class="bg-gray-100 px-2 py-1 rounded text-xs">{{ data.version }}</span>
                </template>
              </Column>

              <Column field="status" header="Statut" style="width: 100px">
                <template #body="{ data }">
                  <Tag :value="getStatusLabel(data.status)" :severity="getStatusSeverity(data.status)" />
                </template>
              </Column>

              <Column field="updated_at" header="Modifié le" style="width: 120px">
                <template #body="{ data }">
                  {{ formatDate(data.updated_at) }}
                </template>
              </Column>

              <Column header="Actions" :exportable="false" style="width: 100px">
                <template #body="{ data }">
                  <div class="flex gap-1">
                    <Button text rounded severity="secondary" size="small" @click="downloadDocument(data)"
                      v-tooltip.top="'Télécharger'">
                      <template #icon>
                        <font-awesome-icon icon="download" />
                      </template>
                    </Button>
                    <Button text rounded severity="info" size="small" @click="viewDocument(data.id)"
                      v-tooltip.top="'Voir'">
                      <template #icon>
                        <font-awesome-icon icon="eye" />
                      </template>
                    </Button>
                    <Button text rounded severity="success" size="small" @click="editDocument(data.id)"
                      v-tooltip.top="'Modifier'">
                      <template #icon>
                        <font-awesome-icon icon="pen" />
                      </template>
                    </Button>
                    <Button text rounded severity="danger" size="small" @click="confirmDelete(data)"
                      v-tooltip.top="'Supprimer'">
                      <template #icon>
                        <font-awesome-icon icon="trash" />
                      </template>
                    </Button>
                  </div>
                </template>
              </Column>
            </DataTable>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useDocumentStore } from '@/stores/documents'
import { useDocumentFolderStore, type DocumentFolder } from '@/stores/documentFolders'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Tag from 'primevue/tag'
import Card from 'primevue/card'
import DocumentFolderSidebar from '@/components/documents/DocumentFolderSidebar.vue'
import type { Document } from '@/stores/app'

const router = useRouter()
const documentStore = useDocumentStore()
const folderStore = useDocumentFolderStore()
const confirm = useConfirm()
const toast = useToast()

// États
const searchQuery = ref('')
const itemsPerPage = ref(10)
const currentPage = ref(0)
const selectedFolder = ref<DocumentFolder | null>(null)

// Computed
const documents = computed(() => documentStore.documents)
const loading = computed(() => documentStore.loading || folderStore.loading)
const totalRecords = computed(() => documentStore.pagination.total)

// Methods
const loadDocuments = async () => {
  const filters: any = {
    search: searchQuery.value,
  }
  if (selectedFolder.value) {
    filters.document_folder_id = selectedFolder.value.id
  }
  await documentStore.fetchDocuments(currentPage.value + 1, itemsPerPage.value, filters)
}

const onPage = (event: any) => {
  currentPage.value = event.page
  itemsPerPage.value = event.rows
  loadDocuments()
}

const onFolderSelect = (folder: DocumentFolder) => {
  selectedFolder.value = folder
  currentPage.value = 0
  loadDocuments()
}

const onFolderUnselect = () => {
  selectedFolder.value = null
  currentPage.value = 0
  loadDocuments()
}

// Document Actions
const createNewDocument = () => {
  router.push({
    path: '/documents/create',
    query: selectedFolder.value ? { document_folder_id: selectedFolder.value.id } : {},
  })
}

const viewDocument = (id: number) => {
  router.push(`/documents/${id}`)
}

const editDocument = (id: number) => {
  router.push(`/documents/${id}/edit`)
}

const confirmDelete = (doc: Document) => {
  confirm.require({
    message: `Voulez-vous vraiment supprimer le document "${doc.title}" ?`,
    header: 'Confirmation de suppression',
    icon: 'exclamation-triangle',
    rejectLabel: 'Annuler',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await documentStore.deleteDocument(doc.id)
        toast.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Document supprimé',
          life: 3000,
          icon: 'check',
        })
        loadDocuments()
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de supprimer le document',
          life: 3000,
          icon: 'times',
        })
      }
    },
  })
}

const downloadDocument = async (doc: Document) => {
  try {
    toast.add({
      severity: 'info',
      summary: 'Téléchargement',
      detail: 'Le téléchargement a commencé...',
      life: 3000,
    })
    await documentStore.downloadDocument(doc.id, doc.filename)
  } catch (e) {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Erreur lors du téléchargement',
      life: 3000,
    })
  }
}

// Helpers
const getFileIcon = (filename: string) => {
  if (!filename) return 'file'
  const ext = (filename || '').split('.').pop()?.toLowerCase()
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

const getFileIconColor = (filename: string) => {
  if (!filename) return 'text-gray-500'
  const ext = (filename || '').split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'pdf':
      return 'text-red-500'
    case 'doc':
    case 'docx':
      return 'text-blue-500'
    case 'xls':
    case 'xlsx':
      return 'text-green-500'
    case 'jpg':
    case 'png':
    case 'jpeg':
      return 'text-purple-500'
    default:
      return 'text-gray-500'
  }
}

const getCategoryLabel = (value: string) => {
  const map: Record<string, string> = {
    procedure: 'Procédure',
    form: 'Formulaire',
    consigne: 'Consigne',
    other: 'Autre',
  }
  return map[value] || value
}

const getCategorySeverity = (value: string): string => {
  const map: Record<string, string> = {
    procedure: 'info',
    form: 'warn',
    consigne: 'danger',
    other: 'secondary',
  }
  return map[value] || 'secondary'
}

const getStatusLabel = (value: string) => {
  const map: Record<string, string> = {
    draft: 'Brouillon',
    pending_approval: 'En attente',
    approved: 'Approuvé',
    rejected: 'Rejeté',
    archived: 'Archivé',
  }
  return map[value] || value
}

const getStatusSeverity = (value: string): string => {
  const map: Record<string, string> = {
    draft: 'secondary',
    pending_approval: 'warn',
    approved: 'success',
    rejected: 'danger',
    archived: 'contrast',
  }
  return map[value] || 'secondary'
}

const formatDate = (dateString: string) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

watch(searchQuery, () => {
  currentPage.value = 0
  loadDocuments()
})

onMounted(async () => {
  await loadDocuments()
})
</script>

<style scoped>
:deep(.p-card-body) {
  height: 100%;
  padding: 0;
}

:deep(.p-card-content) {
  height: 100%;
  padding: 0;
  overflow: hidden;
}
</style>
