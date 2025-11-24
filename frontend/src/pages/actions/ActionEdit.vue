<template>
  <div class="p-4 p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Modifier l'action</h1>
      <router-link
        to="/actions"
        class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-2" />
        Retour à la liste
      </router-link>
    </div>

    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-gray-500" />
    </div>

    <div v-else-if="!currentAction && !error" class="flex justify-center items-center py-12">
      <p class="text-lg text-gray-600">Action non trouvée</p>
    </div>

    <div v-else-if="error" class="flex justify-center items-center py-12">
      <p class="text-lg text-red-600">{{ error }}</p>
    </div>

    <div v-else class="bg-white p-6 rounded-lg shadow-md">
      <ActionForm
        :initialData="formData"
        :submitButtonText="'Enregistrer les modifications'"
        :loading="isSubmitting"
        @submit="submitAction"
        @cancel="cancel"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
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
const route = useRoute()
const actionStore = useActionStore()
const toast = useToast()

// États du formulaire
const formData = ref<ActionData>({
  title: '',
  description: '',
  action_type_id: null,
  priority: '',
  status: 'open',
  assigned_to: null,
  due_date: null,
  progress: 0,
  related_to: '',
  related_id: null,
})

const isLoading = ref(false)
const isSubmitting = ref(false)
const error = ref('')

// Charger l'action à modifier
const loadAction = async () => {
  const id = parseInt(route.params.id as string)
  if (isNaN(id)) {
    error.value = "ID d'action invalide"
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    await actionStore.fetchActionById(id)
    const action = actionStore.currentAction

    if (action) {
      // Remplir le formulaire avec les données de l'action
      formData.value = {
        title: action.title,
        description: action.description || '',
        action_type_id: action.action_type_id || action.action_type?.id || null,
        priority: action.priority,
        status: action.status,
        assigned_to: action.assigned_to || null,
        due_date: action.due_date || null,
        progress: action.progress,
        related_to: action.related_to || '',
        related_id: action.related_id || null,
      }
    } else {
      error.value = 'Action non trouvée'
    }
  } catch (err) {
    console.error("Erreur lors du chargement de l'action:", err)
    error.value = "Erreur lors du chargement de l'action"
  } finally {
    isLoading.value = false
  }
}

// Fonction de soumission du formulaire
const submitAction = async (data: ActionData) => {
  const id = parseInt(route.params.id as string)
  if (isNaN(id)) {
    error.value = "ID d'action invalide"
    return
  }

  isSubmitting.value = true
  error.value = ''

  try {
    // Mettre à jour l'action
    await actionStore.updateAction(id, {
      ...data,
      assigned_to: data.assigned_to || undefined,
      related_id: data.related_id || undefined,
      due_date: data.due_date || undefined,
    })

    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Action mise à jour avec succès',
      life: 3000,
      icon: 'check',
    })
    // Rediriger vers la liste des actions
    router.push('/actions')
  } catch (err: unknown) {
    const errorMessage = (err as Error).message || "Erreur lors de la mise à jour de l'action"
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: "Erreur lors de la mise à jour de l'action",
      life: 3000,
      icon: 'times',
    })
    console.error(err)
  } finally {
    isSubmitting.value = false
  }
}

// Fonction d'annulation
const cancel = () => {
  router.push('/actions')
}

// Charger l'action au montage du composant
onMounted(() => {
  loadAction()
})

// Récupérer l'action courante depuis le store
const currentAction = computed(() => actionStore.currentAction)
</script>
