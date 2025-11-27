<template>
  <div class="p-4 p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h2>Créer un nouveau document</h2>
      <router-link to="/documents"
        class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
        <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-2" />
        Retour à la liste
      </router-link>
    </div>

    <Card>
      <template #content>
        <DocumentForm :submitButtonText="'Enregistrer'" :loading="loading" @submit="submitForm" @cancel="cancel" />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDocumentStore, type DocumentFormData } from '@/stores/documents'
import DocumentForm from '@/components/documents/DocumentForm.vue'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const documentStore = useDocumentStore()
const toast = useToast()
const loading = ref(false)

// Fonction de soumission du formulaire
const submitForm = async (data: DocumentFormData & { file?: File | undefined }) => {
  loading.value = true
  try {
    const formDataToSend = new FormData()
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

    // Créer le document
    await documentStore.createDocument(formDataToSend)
    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Document créé avec succès',
      life: 3000,
      icon: 'check',
    })
    // Rediriger vers la liste des documents
    router.push('/documents')
  } catch (error) {
    console.error('Erreur lors de la création du document:', error)
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Impossible de créer le document',
      life: 3000,
      icon: 'times',
    })
  } finally {
    loading.value = false
  }
}

// Fonction d'annulation
const cancel = () => {
  router.push('/documents')
}
</script>
