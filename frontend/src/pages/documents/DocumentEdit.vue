<template>
  <div class="document-edit-page p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Modifier le document</h1>
      <router-link
        to="/documents"
        class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-2" />
        Retour à la liste
      </router-link>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-12">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-gray-500" />
    </div>

    <div v-else-if="!currentDocument" class="flex justify-center items-center py-12">
      <p class="text-lg text-gray-600">Document non trouvé</p>
    </div>

    <div v-else class="bg-white p-6 rounded-lg shadow-md">
      <DocumentForm
        :initialData="formData"
        :submitButtonText="'Enregistrer'"
        @submit="submitForm"
        @cancel="cancel"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDocumentStore } from '@/stores/documents'
import DocumentForm from '@/components/documents/DocumentForm.vue'

// Définir le type pour les données du document
interface DocumentData {
  title: string
  description: string
  category: string
  version: string
  status: string
  file?: File
}

const router = useRouter()
const route = useRoute()
const documentStore = useDocumentStore()

const formData = ref<DocumentData>({
  title: '',
  description: '',
  category: '',
  version: '',
  status: 'draft',
})

const loading = ref(false)
const error = ref('')

const loadDocument = async () => {
  const id = Number(route.params.id)
  loading.value = true

  try {
    await documentStore.fetchDocumentById(id)
    if (documentStore.currentDocument) {
      // Remplir le formulaire avec les données du document
      const doc = documentStore.currentDocument
      formData.value = {
        title: doc.title || '',
        description: doc.description || '',
        category: doc.category || '',
        version: doc.version || '1.0',
        status: doc.status || 'draft',
      }
    } else {
      error.value = 'Document non trouvé'
    }
  } catch (err) {
    error.value = 'Erreur lors du chargement du document'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const submitForm = async (data: DocumentData) => {
  loading.value = true
  error.value = ''

  try {
    const id = Number(route.params.id)
    await documentStore.updateDocument(id, data)
    router.push('/documents')
  } catch (err: unknown) {
    error.value = (err as Error).message || 'Erreur lors de la mise à jour du document'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const cancel = () => {
  router.push('/documents')
}

onMounted(() => {
  loadDocument()
})

// Récupérer le document courant depuis le store
const currentDocument = computed(() => documentStore.currentDocument)
</script>

<style scoped>
.document-edit-page {
  @apply p-4;
}
</style>
