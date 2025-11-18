<template>
  <div class="p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Documents QHSE</h1>
      <Button
        icon="pi pi-plus"
        label="Nouveau document"
        @click="createNewDocument"
        class="p-button-primary"
      />
    </div>

    <!-- Barre de recherche et filtres -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <div class="flex-grow">
        <div class="relative">
          <input
            v-model="searchQuery"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            type="text"
            placeholder="Rechercher un document..."
          />
          <div class="absolute inset-y-0 right-0 flex items-center pr-3">
            <font-awesome-icon :icon="['fas', 'search']" class="text-gray-400" />
          </div>
        </div>
      </div>
    </div>

    <!-- Filtres additionnels -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
        <p-dropdown
          v-model="categoryFilter"
          :options="categoryOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Toutes les catégories"
          class="w-full"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Statut</label>
        <p-dropdown
          v-model="statusFilter"
          :options="statusOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Tous les statuts"
          class="w-full"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Tri</label>
        <p-dropdown
          v-model="sortOrder"
          :options="sortOptions"
          optionLabel="label"
          optionValue="value"
          class="w-full"
        />
      </div>
    </div>

    <!-- Liste des documents -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-gray-500" />
    </div>

    <div v-else-if="documents.length === 0" class="flex justify-center items-center py-12">
      <p class="text-lg text-gray-600">Aucun document trouvé</p>
    </div>

    <div v-else>
      <div class="mb-8">
        <DocumentCard
          v-for="document in documents"
          :key="document.id"
          :document="document"
          @view="viewDocument"
          @edit="editDocument"
          @delete="deleteDocument"
          @download="downloadDocument"
        />
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-8">
        <p-paginator
          :rows="itemsPerPage.value"
          :totalRecords="documentStore.pagination.totalItems"
          :pageLinkSize="3"
          :currentPageReportTemplate="'Affichage {first} à {last} de {totalRecords}'"
          @page="onPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import PDropdown from 'primevue/dropdown'
import PPaginator from 'primevue/paginator'
import DocumentCard from '@/components/documents/DocumentCard.vue'
import { useDocumentStore } from '@/stores/documents'

const router = useRouter()
const documentStore = useDocumentStore()

// États locaux
const searchQuery = ref('')
const categoryFilter = ref('')
const statusFilter = ref('')
const sortOrder = ref('newest')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Options pour les filtres
const categoryOptions = [
  { label: 'Toutes les catégories', value: '' },
  { label: 'Procédures', value: 'procedure' },
  { label: 'Formulaires', value: 'form' },
  { label: 'Consignes', value: 'consigne' },
  { label: 'Autres', value: 'other' },
]

const statusOptions = [
  { label: 'Tous les statuts', value: '' },
  { label: 'Brouillon', value: 'draft' },
  { label: 'En attente', value: 'pending_approval' },
  { label: 'Approuvé', value: 'approved' },
  { label: 'Rejeté', value: 'rejected' },
  { label: 'Archivé', value: 'archived' },
]

const sortOptions = [
  { label: 'Plus récents', value: 'newest' },
  { label: 'Plus anciens', value: 'oldest' },
  { label: 'Par titre', value: 'title' },
]

// Fonction pour charger les documents
const loadDocuments = async () => {
  await documentStore.fetchDocuments(currentPage.value, itemsPerPage.value)
}

const viewDocument = (id: number) => {
  router.push(`/documents/${id}`)
}

const editDocument = (id: number) => {
  router.push(`/documents/${id}/edit`)
}

const createNewDocument = () => {
  router.push('/documents/create')
}

const deleteDocument = async (id: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
    try {
      await documentStore.deleteDocument(id)
      // Recharger la liste après suppression
      await loadDocuments()
    } catch (error) {
      console.error('Erreur lors de la suppression du document:', error)
    }
  }
}

const downloadDocument = (filepath: string) => {
  // Télécharger le document
  window.open(filepath, '_blank')
}

const onPageChange = async (event: { page: number }) => {
  currentPage.value = event.page + 1
  await loadDocuments()
}

// Charger les documents au montage
onMounted(() => {
  loadDocuments()
})

// Accéder aux documents et état de chargement depuis le store
const documents = computed(() => documentStore.documents)
const loading = computed(() => documentStore.loading)
</script>
