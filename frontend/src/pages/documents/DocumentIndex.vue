<template>
  <div class="p-4 h-[calc(100vh-6rem)] flex flex-col">
    <!-- Header & Breadcrumbs -->
    <div class="flex flex-col gap-4 mb-4">
      <div class="flex justify-between items-center">
        <h2 class="m-0 text-2xl font-semibold">Documents QHSE</h2>
        <div class="flex gap-2">
          <SelectButton
            v-model="viewMode"
            :options="viewOptions"
            optionLabel="icon"
            optionValue="value"
            :allowEmpty="false"
          >
            <template #option="slotProps">
              <font-awesome-icon :icon="slotProps.option.icon" />
            </template>
          </SelectButton>
          <Button label="Nouveau" @click="createNewDocument" severity="primary">
            <template #icon>
              <font-awesome-icon icon="plus" class="mr-2" />
            </template>
          </Button>
        </div>
      </div>

      <div
        class="flex items-center gap-2 bg-surface-0 dark:bg-surface-800 p-2 rounded-lg border border-surface-200 dark:border-surface-700"
      >
        <Button
          text
          rounded
          severity="secondary"
          size="small"
          @click="onFolderUnselect"
          :disabled="!selectedFolder"
        >
          <template #icon>
            <font-awesome-icon icon="home" />
          </template>
        </Button>

        <template v-for="(crumb, index) in breadcrumbs" :key="crumb.id">
          <span class="text-surface-400 dark:text-surface-500">/</span>
          <span
            class="hover:text-primary cursor-pointer transition-colors font-medium"
            :class="{
              'text-primary': index === breadcrumbs.length - 1,
              'text-color-secondary': index !== breadcrumbs.length - 1,
            }"
            @click="onBreadcrumbClick(crumb)"
          >
            {{ crumb.label }}
          </span>
        </template>
      </div>
    </div>

    <div class="flex flex-1 gap-4 overflow-hidden">
      <!-- Sidebar Dossiers -->
      <div class="w-1/4 flex flex-col min-w-[250px] max-w-[300px]">
        <DocumentFolderSidebar @select="onFolderSelect" @unselect="onFolderUnselect" />
      </div>

      <!-- Main Content -->
      <div
        class="flex-1 flex flex-col overflow-hidden bg-surface-0 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl shadow-sm"
      >
        <!-- Toolbar -->
        <div
          class="flex flex-wrap gap-2 items-center justify-between px-4 py-3 border-b border-surface-200 dark:border-surface-700"
        >
          <h4 class="m-0 text-lg">
            {{ selectedFolder ? selectedFolder.name : 'Tous les documents' }}
            <span class="text-sm font-normal text-color-secondary ml-2"
              >({{ totalRecords }} documents)</span
            >
          </h4>
          <IconField iconPosition="left">
            <InputIcon>
              <font-awesome-icon icon="magnifying-glass" />
            </InputIcon>
            <InputText
              v-model="searchQuery"
              placeholder="Rechercher..."
              size="small"
              class="w-64"
            />
          </IconField>
        </div>

        <!-- Content Area -->
        <div class="flex-1 overflow-y-auto p-4" v-if="loading">
          <!-- Skeleton Loading -->
          <div v-if="viewMode === 'list'" class="flex flex-col gap-2">
            <Skeleton v-for="i in 5" :key="i" height="3rem" class="w-full" />
          </div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <Skeleton v-for="i in 8" :key="i" height="12rem" class="w-full rounded-lg" />
          </div>
        </div>

        <div class="flex-1 overflow-y-auto p-0" v-else>
          <!-- LIST VIEW -->
          <DataTable
            v-if="viewMode === 'list'"
            ref="dt"
            :value="documents"
            lazy
            :paginator="true"
            :rows="itemsPerPage"
            :totalRecords="totalRecords"
            :loading="false"
            @page="onPage"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 25, 50]"
            currentPageReportTemplate="{first} - {last} / {totalRecords}"
            class="p-datatable-sm border-none"
            scrollable
            scrollHeight="flex"
            tableStyle="min-width: 50rem"
          >
            <template #empty>
              <div class="flex flex-col items-center justify-center p-8 text-color-secondary">
                <font-awesome-icon icon="folder-open" class="text-4xl mb-2 opacity-50" />
                <p>Aucun document trouvé.</p>
              </div>
            </template>

            <Column field="title" header="Nom" sortable style="min-width: 250px">
              <template #body="{ data }">
                <div
                  class="flex items-center gap-3 cursor-pointer group"
                  @click="viewDocument(data.id)"
                >
                  <FileIcon :filename="data.filename" size="md" />
                  <div class="flex flex-col">
                    <span
                      class="font-medium text-color group-hover:text-primary transition-colors"
                      >{{ data.title }}</span
                    >
                    <span class="text-xs text-color-secondary">{{ data.filename }}</span>
                  </div>
                </div>
              </template>
            </Column>

            <Column field="category" header="Type" sortable style="width: 120px">
              <template #body="{ data }">
                <Tag
                  v-if="data.category"
                  :value="data.category.name"
                  :style="{
                    backgroundColor: data.category.color || 'var(--surface-500)',
                    color: '#fff',
                  }"
                >
                  <template #icon>
                    <font-awesome-icon
                      v-if="data.category.icon"
                      :icon="['fas', data.category.icon]"
                      class="mr-1"
                    />
                  </template>
                </Tag>
                <span v-else class="text-color-secondary">-</span>
              </template>
            </Column>

            <Column field="status" header="Statut" style="width: 100px">
              <template #body="{ data }">
                <Tag
                  :value="getStatusLabel(data.status)"
                  :severity="getStatusSeverity(data.status)"
                />
              </template>
            </Column>

            <Column field="updated_at" header="Modifié le" style="width: 120px">
              <template #body="{ data }">
                <span class="text-color-secondary text-sm">
                  {{ formatDate(data.updated_at) }}
                </span>
              </template>
            </Column>

            <Column
              header="Actions"
              :exportable="false"
              style="width: 80px"
              alignFrozen="right"
              frozen
            >
              <template #body="{ data }">
                <div class="flex justify-end">
                  <Button
                    icon="pi pi-ellipsis-v"
                    text
                    rounded
                    severity="secondary"
                    @click="(event) => toggleRowMenu(event, data)"
                  >
                    <template #icon>
                      <font-awesome-icon icon="ellipsis-vertical" />
                    </template>
                  </Button>
                </div>
              </template>
            </Column>
          </DataTable>

          <!-- GRID VIEW -->
          <div v-else class="p-4 h-full flex flex-col">
            <div
              v-if="documents.length === 0"
              class="flex flex-col items-center justify-center h-full text-color-secondary"
            >
              <font-awesome-icon icon="folder-open" class="text-6xl mb-4 opacity-30" />
              <p class="text-lg">Aucun document dans ce dossier.</p>
            </div>

            <div
              v-else
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-4"
            >
              <DocumentGridItem
                v-for="doc in documents"
                :key="doc.id"
                :document="doc"
                @click="viewDocument(doc.id)"
                @view="viewDocument(doc.id)"
                @edit="editDocument(doc.id)"
                @download="downloadDocument(doc)"
                @delete="confirmDelete(doc)"
              />
            </div>

            <!-- Simple Pagination for Grid (since DataTable handles it internally for List) -->
            <Paginator
              v-if="totalRecords > 0"
              :rows="itemsPerPage"
              :totalRecords="totalRecords"
              :first="currentPage * itemsPerPage"
              @page="onPage"
              template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
              currentPageReportTemplate="{first} - {last} / {totalRecords}"
              class="mt-auto border-t border-surface-200 dark:border-surface-700"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Shared Menu for Actions -->
    <Menu ref="rowMenu" :model="menuItems" :popup="true" />
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
import SelectButton from 'primevue/selectbutton'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Tag from 'primevue/tag'
import Menu from 'primevue/menu'
import Skeleton from 'primevue/skeleton'
import Paginator from 'primevue/paginator'
import DocumentFolderSidebar from '@/components/documents/DocumentFolderSidebar.vue'
import DocumentGridItem from '@/components/documents/DocumentGridItem.vue'
import FileIcon from '@/components/common/FileIcon.vue'
import type { Document } from '@/stores/app'

const router = useRouter()
const documentStore = useDocumentStore()
const folderStore = useDocumentFolderStore()
const confirm = useConfirm()
const toast = useToast()

// View Mode
const viewMode = ref<'list' | 'grid'>(
  (localStorage.getItem('documents_view_mode') as 'list' | 'grid') || 'list',
)
watch(viewMode, (newValue) => {
  localStorage.setItem('documents_view_mode', newValue)
})
const viewOptions = ref([
  { value: 'list', icon: 'list' },
  { value: 'grid', icon: 'table-cells-large' },
])

// States
const searchQuery = ref('')
const itemsPerPage = ref(10)
const currentPage = ref(0)
const selectedFolder = ref<DocumentFolder | null>(null)
const rowMenu = ref()
const selectedDocForMenu = ref<Document | null>(null)

// Computed
const documents = computed(() => documentStore.documents)
const loading = computed(() => documentStore.loading || folderStore.loading)
const totalRecords = computed(() => documentStore.pagination.total)

// Breadcrumbs logic
const breadcrumbs = computed(() => {
  if (!selectedFolder.value) return []

  const crumbs = []
  let current: DocumentFolder | undefined = selectedFolder.value

  while (current) {
    crumbs.unshift({
      id: current.id,
      label: current.name,
      data: current,
    })

    // Find parent in store (naive approach, recursive search might be needed if flat list not available)
    // Since `folders` in store might be a tree, we need to find the flat parent.
    // Assuming store has flatted folders or we can find by ID.
    // If store only has a tree, we might need a helper. For now let's rely on `parent_id` and search in tree.
    if (current.parent_id) {
      current = findFolderById(folderStore.folders, current.parent_id)
    } else {
      current = undefined
    }
  }
  return crumbs
})

// Recursive finder
const findFolderById = (folders: DocumentFolder[], id: number): DocumentFolder | undefined => {
  for (const f of folders) {
    if (f.id === id) return f
    if (f.children) {
      const found = findFolderById(f.children, id)
      if (found) return found
    }
  }
  return undefined
}

// Menu Items
const menuItems = computed(() => [
  {
    label: 'Voir',
    icon: 'pi pi-eye',
    command: () => {
      if (selectedDocForMenu.value) viewDocument(selectedDocForMenu.value.id)
    },
  },
  {
    label: 'Télécharger',
    icon: 'pi pi-download',
    command: () => {
      if (selectedDocForMenu.value) downloadDocument(selectedDocForMenu.value)
    },
  },
  {
    label: 'Modifier',
    icon: 'pi pi-pencil',
    command: () => {
      if (selectedDocForMenu.value) editDocument(selectedDocForMenu.value.id)
    },
  },
  {
    separator: true,
  },
  {
    label: 'Supprimer',
    icon: 'pi pi-trash',
    class: 'text-red-500',
    command: () => {
      if (selectedDocForMenu.value) confirmDelete(selectedDocForMenu.value)
    },
  },
])

const toggleRowMenu = (event: Event, doc: Document) => {
  selectedDocForMenu.value = doc
  rowMenu.value.toggle(event)
}

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

const onBreadcrumbClick = (crumb: any) => {
  // Select the folder from breadcrumb
  const folder = findFolderById(folderStore.folders, crumb.id)
  if (folder) {
    onFolderSelect(folder)
  }
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
    acceptLabel: 'Supprimer',
    acceptClass: 'p-button-danger',
    rejectClass: 'p-button-secondary',
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
:deep(.p-datatable .p-datatable-tbody > tr > td) {
  padding: 0.75rem 1rem;
}
:deep(.p-datatable-header) {
  background: transparent;
  border: none;
}
</style>
