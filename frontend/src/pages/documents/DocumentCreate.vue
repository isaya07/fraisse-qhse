<template>
  <div class="document-create-page p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Créer un nouveau document</h1>
      <router-link
        to="/documents"
        class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-2" />
        Retour à la liste
      </router-link>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md">
      <DocumentForm :submitButtonText="'Enregistrer'" @submit="submitForm" @cancel="cancel" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
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
const documentStore = useDocumentStore()

// Fonction de soumission du formulaire
const submitForm = async (data: DocumentData) => {
  try {
    // Créer le document
    await documentStore.createDocument(data)

    // Rediriger vers la liste des documents
    router.push('/documents')
  } catch (err) {
    console.error('Erreur lors de la création du document:', err)
    // Gestion de l'erreur est faite dans le composant DocumentForm
  }
}

// Fonction d'annulation
const cancel = () => {
  router.push('/documents')
}
</script>

<style scoped>
.document-create-page {
  @apply p-4;
}
</style>
