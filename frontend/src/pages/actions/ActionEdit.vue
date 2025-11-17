<template>
  <div class="action-edit-page">
    <div class="level">
      <div class="level-left">
        <h1 class="title">Modifier l'action</h1>
      </div>
      <div class="level-right">
        <router-link to="/actions" class="button is-light">
          <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-2" />
          Retour à la liste
        </router-link>
      </div>
    </div>

    <div v-if="loading" class="has-text-centered py-6">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" />
    </div>

    <div v-else-if="!action" class="has-text-centered py-6">
      <p class="is-size-5">Action non trouvée</p>
    </div>

    <div v-else class="box">
      <ActionForm
        :initialData="form"
        :users="users"
        :submitButtonText="'Enregistrer les modifications'"
        @submit="submitAction"
        @cancel="cancel"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useActionStore } from '@/stores/actions'
import ActionForm from '@/components/actions/ActionForm.vue'
import type { User, Action } from '@/stores/app'

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
const route = useRoute()
const actionStore = useActionStore()

// États du formulaire
const form = ref<ActionData>({
  title: '',
  description: '',
  type: '',
  priority: '',
  status: 'open',
  assigned_to: null,
  due_date: '',
  progress: 0,
  related_to: '',
  related_id: null,
})

const loading = ref(false)
const error = ref('')
const action = ref(null as Action | null)

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

// Charger l'action à modifier
const loadAction = async () => {
  const id = parseInt(route.params.id as string)
  if (isNaN(id)) {
    error.value = "ID d'action invalide"
    return
  }

  loading.value = true
  try {
    await actionStore.fetchActionById(id)
    action.value = actionStore.currentAction

    if (action.value) {
      // Remplir le formulaire avec les données de l'action
      form.value = {
        title: action.value.title,
        description: action.value.description || '',
        type: action.value.type,
        priority: action.value.priority,
        status: action.value.status,
        assigned_to: action.value.assigned_to || null,
        due_date: action.value.due_date || '',
        progress: action.value.progress,
        related_to: action.value.related_to || '',
        related_id: action.value.related_id || null,
      }
    } else {
      error.value = 'Action non trouvée'
    }
  } catch (err) {
    console.error("Erreur lors du chargement de l'action:", err)
    error.value = "Erreur lors du chargement de l'action"
  } finally {
    loading.value = false
  }
}

// Fonction de soumission du formulaire
const submitAction = async (data: ActionData) => {
  const id = parseInt(route.params.id as string)
  if (isNaN(id)) {
    error.value = "ID d'action invalide"
    return
  }

  loading.value = true
  error.value = ''

  try {
    // Mettre à jour l'action
    await actionStore.updateAction(id, {
      ...data,
      assigned_to: data.assigned_to || undefined,
      related_id: data.related_id || undefined,
    })

    // Rediriger vers la liste des actions
    router.push('/actions')
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'action:", err)
    // Gestion de l'erreur est faite dans le composant ActionForm
  } finally {
    loading.value = false
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
</script>

<style scoped>
.action-edit-page {
  padding: 1rem;
}

.py-6 {
  padding-top: 3rem;
  padding-bottom: 3rem;
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
