<template>
  <div class="document-create-page">
    <div class="level">
      <div class="level-left">
        <h1 class="title">Créer un nouveau document</h1>
      </div>
      <div class="level-right">
        <router-link to="/documents" class="button is-light">
          <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-2" />
          Retour à la liste
        </router-link>
      </div>
    </div>

    <div class="box">
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
  padding: 1rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.mt-3 {
  margin-top: 0.75rem;
}
</style>
