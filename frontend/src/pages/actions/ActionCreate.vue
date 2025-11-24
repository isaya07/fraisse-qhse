<template>
  <div class="p-4 p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Créer une nouvelle action</h1>
      <router-link
        to="/actions"
        class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-2" />
        Retour à la liste
      </router-link>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md">
      <ActionForm
        :submitButtonText="'Créer l\'action'"
        :loading="loading"
        @submit="submitAction"
        @cancel="cancel"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useActionStore } from '@/stores/actions'
import ActionForm from '@/components/actions/ActionForm.vue'
import { useToast } from 'primevue/usetoast'

// Définir le type pour les données de l'action
interface ActionData {
  title: string
  description: string
  action_type_id: number | null
  priority: string
  status: string
  assigned_to: number | null
  due_date: string | null
  progress: number
  related_to: string
  related_id: number | null
}

const router = useRouter()
const actionStore = useActionStore()
const toast = useToast()
const loading = ref(false)

// Fonction de soumission du formulaire
const submitAction = async (data: ActionData) => {
  loading.value = true
  try {
    // Créer l'action
    await actionStore.createAction({
      ...data,
      assigned_to: data.assigned_to || undefined,
      related_id: data.related_id || undefined,
      due_date: data.due_date || undefined,
    })

    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Action créée avec succès',
      life: 3000,
      icon: 'check',
    })
    // Rediriger vers la liste des actions
    router.push('/actions')
  } catch (err) {
    console.error("Erreur lors de la création de l'action:", err)
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: "Erreur lors de la création de l'action",
      life: 3000,
      icon: 'times',
    })
  } finally {
    loading.value = false
  }
}

// Fonction d'annulation
const cancel = () => {
  router.push('/actions')
}
</script>
