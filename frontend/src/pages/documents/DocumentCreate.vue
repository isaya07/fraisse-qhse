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
            <h2 class="text-color">Créer un nouveau document</h2>
          </div>
        </div>
      </div>
    </div>

    <Card>
      <template #content>
        <DocumentForm
          :submitButtonText="'Enregistrer'"
          :loading="loading"
          @submit="submitForm"
          @cancel="cancel"
        />
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
import Button from 'primevue/button'
import Card from 'primevue/card'


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

const goBack = () => {
  router.back()
}

</script>
