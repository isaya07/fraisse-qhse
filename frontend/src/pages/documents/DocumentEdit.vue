<template>
  <div class="p-4 p-4">
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

    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-gray-500" />
    </div>

    <div v-else-if="!currentDocument && !error" class="flex justify-center items-center py-12">
      <p class="text-lg text-gray-600">Document non trouvé</p>
    </div>

    <div v-else-if="error" class="flex justify-center items-center py-12">
      <p class="text-lg text-red-600">{{ error }}</p>
    </div>

    <div v-else class="bg-white p-6 rounded-lg shadow-md">
      <DocumentForm
        :initialData="formData"
        :submitButtonText="'Enregistrer'"
        :loading="isSubmitting"
        @submit="submitForm"
        @cancel="cancel"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDocumentStore, type DocumentFormData } from '@/stores/documents'
import DocumentForm from '@/components/documents/DocumentForm.vue'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const route = useRoute()
const documentStore = useDocumentStore()
const toast = useToast()

const formData = ref<DocumentFormData>({
  title: '',
  description: '',
  document_folder_id: null,
  category: '',
  version: '',
  status: 'draft',
})

const isLoading = ref(false)
const isSubmitting = ref(false)
const error = ref('')

const loadDocument = async () => {
  const id = Number(route.params.id)
  isLoading.value = true
  error.value = ''

  try {
    await documentStore.fetchDocumentById(parseInt(route.params.id as string))
    if (documentStore.currentDocument) {
      const doc = documentStore.currentDocument
      formData.value = {
        title: doc.title,
        description: doc.description || '',
        document_folder_id: doc.document_folder_id || null,
        category: doc.category || '',
        version: doc.version,
        status: doc.status,
      }
    } else {
      error.value = 'Document non trouvé'
    }
  } catch (err) {
    error.value = 'Erreur lors du chargement du document'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const submitForm = async (data: DocumentFormData & { file?: File }) => {
  isSubmitting.value = true
  error.value = ''

  try {
    const formDataToSend = new FormData()
    formDataToSend.append('_method', 'PUT') // Method spoofing for Laravel
    formDataToSend.append('title', data.title)
    formDataToSend.append('description', data.description || '')
    if (data.document_folder_id) {
      formDataToSend.append('document_folder_id', data.document_folder_id.toString())
    }
    formDataToSend.append('category', data.category)
    formDataToSend.append('version', data.version)
    formDataToSend.append('status', data.status)

    if (data.file) {
      formDataToSend.append('file', data.file)
    }

    await documentStore.updateDocument(parseInt(route.params.id as string), formDataToSend)
    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Document mis à jour avec succès',
      life: 3000,
      icon: 'check',
    })
    router.push('/documents')
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Impossible de mettre à jour le document',
      life: 3000,
    })
    console.error(error)
  } finally {
    isSubmitting.value = false
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
