<template>
  <div class="documents-page">
    <div class="level">
      <div class="level-left">
        <h1 class="title">Documents QHSE</h1>
      </div>
      <div class="level-right">
        <Button
          :icon="['fas', 'plus']"
          text="Nouveau document"
          variant="primary"
          @click="createNewDocument"
        />
      </div>
    </div>

    <!-- Barre de recherche et filtres -->
    <div class="field has-addons mb-5">
      <div class="control is-expanded">
        <input
          v-model="searchQuery"
          class="input"
          type="text"
          placeholder="Rechercher un document..."
        />
      </div>
      <div class="control">
        <button class="button is-info">
          <font-awesome-icon :icon="['fas', 'search']" />
        </button>
      </div>
    </div>

    <!-- Filtres additionnels -->
    <div class="columns mb-5">
      <div class="column is-3">
        <div class="field">
          <label class="label">Catégorie</label>
          <div class="select is-fullwidth">
            <select v-model="categoryFilter">
              <option value="">Toutes les catégories</option>
              <option value="procedure">Procédures</option>
              <option value="form">Formulaires</option>
              <option value="consigne">Consignes</option>
              <option value="other">Autres</option>
            </select>
          </div>
        </div>
      </div>
      <div class="column is-3">
        <div class="field">
          <label class="label">Statut</label>
          <div class="select is-fullwidth">
            <select v-model="statusFilter">
              <option value="">Tous les statuts</option>
              <option value="draft">Brouillon</option>
              <option value="pending_approval">En attente</option>
              <option value="approved">Approuvé</option>
              <option value="rejected">Rejeté</option>
              <option value="archived">Archivé</option>
            </select>
          </div>
        </div>
      </div>
      <div class="column is-3">
        <div class="field">
          <label class="label">Tri</label>
          <div class="select is-fullwidth">
            <select v-model="sortOrder">
              <option value="newest">Plus récents</option>
              <option value="oldest">Plus anciens</option>
              <option value="title">Par titre</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Liste des documents -->
    <div v-if="loading" class="has-text-centered py-6">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" />
    </div>

    <div v-else-if="documents.length === 0" class="has-text-centered py-6">
      <p class="is-size-5">Aucun document trouvé</p>
    </div>

    <div v-else>
      <div class="documents-list">
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
      <nav class="pagination is-centered" role="navigation" aria-label="pagination">
        <a
          :class="['pagination-previous', { 'is-disabled': currentPage === 1 }]"
          @click="changePage(currentPage - 1)"
        >
          Précédent
        </a>
        <a
          :class="['pagination-next', { 'is-disabled': currentPage === totalPages }]"
          @click="changePage(currentPage + 1)"
        >
          Suivant
        </a>
        <ul class="pagination-list">
          <li v-for="page in getPagesToShow()" :key="page">
            <a
              :class="['pagination-link', { 'is-current': page === currentPage }]"
              @click="changePage(page)"
            >
              {{ page }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/ui/MyButton.vue'
import DocumentCard from '@/components/documents/DocumentCard.vue'
import { useDocumentStore } from '@/stores/documents'
// import type { Document } from '@/stores/app'

const router = useRouter()
const documentStore = useDocumentStore()

// États locaux
const searchQuery = ref('')
const categoryFilter = ref('')
const statusFilter = ref('')
const sortOrder = ref('newest')
const currentPage = ref(1)
const itemsPerPage = ref(10)

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

const changePage = async (page: number) => {
  if (page >= 1 && page <= documentStore.pagination.totalPages) {
    currentPage.value = page
    await loadDocuments()
  }
}

const getPagesToShow = () => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(documentStore.pagination.totalPages, currentPage.value + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
}

// Charger les documents au montage
onMounted(() => {
  loadDocuments()
})

// Accéder aux documents et état de chargement depuis le store
const documents = computed(() => documentStore.documents)
const loading = computed(() => documentStore.loading)
const totalPages = computed(() => documentStore.pagination.totalPages)
</script>

<style scoped>
.documents-page {
  padding: 1rem;
}

.documents-list {
  margin-bottom: 2rem;
}

.py-6 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.mr-2 {
  margin-right: 0.5rem;
}
</style>
