<template>
  <div class="action-create-page">
    <div class="level">
      <div class="level-left">
        <h1 class="title">Créer une nouvelle action</h1>
      </div>
      <div class="level-right">
        <router-link to="/actions" class="button is-light">
          <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-2" />
          Retour à la liste
        </router-link>
      </div>
    </div>

    <div class="box">
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
  padding: 1rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.mt-5 {
  margin-top: 1.5rem;
}

.mt-3 {
  margin-top: 0.75rem;
}
</style>
