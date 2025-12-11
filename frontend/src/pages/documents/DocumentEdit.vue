<template>
  <div class="p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-4">
      <div class="flex items-center gap-4">
        <Button text rounded severity="secondary" @click="goBack">
          <template #icon>
            <font-awesome-icon icon="arrow-left" />
          </template>
        </Button>
        <div>
          <div class="flex items-center gap-3">
            <h2 class="text-color">Modifier le document</h2>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-color-secondary" />
    </div>

    <div v-else-if="!currentDocument && !error" class="flex justify-center items-center py-12">
      <p class="text-lg text-color-secondary">Document non trouvé</p>
    </div>

    <div v-else-if="error" class="flex justify-center items-center py-12">
      <p class="text-lg text-red-600">{{ error }}</p>
    </div>

    <Card v-else>
      <template #content>
        <DocumentForm
          :initialData="formData"
          :submitButtonText="'Enregistrer'"
          :loading="isSubmitting"
          :isEditMode="true"
          @submit="submitForm"
          @cancel="cancel"
        />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDocumentStore, type DocumentFormData } from '@/stores/documents'
import DocumentForm from '@/components/documents/DocumentForm.vue'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import Card from 'primevue/card'


const router = useRouter()
const route = useRoute()
const documentStore = useDocumentStore()
const toast = useToast()

const formData = ref<DocumentFormData>({
  title: '',
  description: '',
  document_folder_id: null,
  category_id: null,
  version: '',
  status: 'draft',
})

const isLoading = ref(false)
const isSubmitting = ref(false)
const error = ref('')

const loadDocument = async () => {
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
        category_id: doc.category?.id || null,
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
    formDataToSend.append('description', data.description ?? '')
    if (data.document_folder_id) {
      formDataToSend.append('document_folder_id', data.document_folder_id.toString())
    }
    if (data.category_id) {
      formDataToSend.append('category_id', data.category_id.toString())
    }
    formDataToSend.append('version', data.version)
    formDataToSend.append('status', data.status)

    if (data.expires_date) {
      const date = new Date(data.expires_date)
      const formattedDate = date.toISOString().split('T')[0]
      formDataToSend.append('expires_date', formattedDate ?? '')
    }

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

const goBack = () => {
  router.back()
}

// Récupérer le document courant depuis le store
const currentDocument = computed(() => documentStore.currentDocument)
</script>
