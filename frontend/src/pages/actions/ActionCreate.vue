<template>
  <div class="action-create-page p-4">
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
        :users="users"
        :submitButtonText="'Créer l\'action'"
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
import type { User } from '@/stores/app'

// Définir le type pour les données de l'action
interface ActionData {
  title: string
  description: string
  type: string
  priority: string
  status: string
  assigned_to: number | null
  due_date: string
  progress: number
  related_to: string
  related_id: number | null
}

const router = useRouter()
const actionStore = useActionStore()

// Données factices pour les utilisateurs (à remplacer par des données réelles)
const users = ref<User[]>([
  {
    id: 1,
    username: 'admin',
    email: 'admin@qhse.local',
    first_name: 'Admin',
    last_name: 'QHSE',
    role: 'admin',
  },
  {
    id: 2,
    username: 'manager',
    email: 'manager@qhse.local',
    first_name: 'Manager',
    last_name: 'QHSE',
    role: 'manager',
  },
  {
    id: 3,
    username: 'user1',
    email: 'user1@qhse.local',
    first_name: 'User',
    last_name: 'One',
    role: 'user',
  },
])

// Fonction de soumission du formulaire
const submitAction = async (data: ActionData) => {
  try {
    // Créer l'action
    await actionStore.createAction({
      ...data,
      assigned_to: data.assigned_to || undefined,
      related_id: data.related_id || undefined,
    })

    // Rediriger vers la liste des actions
    router.push('/actions')
  } catch (err) {
    console.error("Erreur lors de la création de l'action:", err)
    // Gestion de l'erreur est faite dans le composant ActionForm
  }
}

// Fonction d'annulation
const cancel = () => {
  router.push('/actions')
}
</script>

<style scoped>
.action-create-page {
  @apply p-4;
}
</style>
