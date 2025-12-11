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
            <h2 class="text-color">Créer une nouvelle action</h2>
          </div>
        </div>
      </div>
    </div>

    <Card>
      <template #content>
        <ActionForm
          :submitButtonText="'Créer l\'action'"
          :loading="loading"
          @submit="submitAction"
          @cancel="cancel"
        />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useActionStore } from '@/stores/actions'
import ActionForm from '@/components/actions/ActionForm.vue'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'

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
    })
  } finally {
    loading.value = false
  }
}

// Fonction d'annulation
const cancel = () => router.push('/actions')
const goBack = () => router.back()
</script>
