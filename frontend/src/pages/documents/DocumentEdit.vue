<template>
  <div class="document-edit-page">
    <div class="level">
      <div class="level-left">
        <h1 class="title">Modifier le document</h1>
      </div>
      <div class="level-right">
        <router-link to="/documents" class="button is-light">
          <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-2" />
          Retour à la liste
        </router-link>
      </div>
    </div>

    <div v-if="loading" class="has-text-centered py-6">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" />
    </div>

    <div v-else-if="!currentDocument" class="has-text-centered py-6">
      <p class="is-size-5">Document non trouvé</p>
    </div>

    <div v-else class="box">
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
  padding: 1rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.mt-3 {
  margin-top: 0.75rem;
}

.py-6 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
</style>
