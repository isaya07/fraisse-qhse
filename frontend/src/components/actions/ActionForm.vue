<template>
  <form @submit.prevent="submitForm" class="flex flex-col gap-4">
    <div class="field">
      <label for="title" class="block text-sm font-medium mb-1">Titre</label>
      <p-input-text
        id="title"
        v-model="formData.title"
        placeholder="Titre de l'action"
        required
        class="w-full"
      />
    </div>

    <div class="field">
      <label for="description" class="block text-sm font-medium mb-1">Description</label>
      <p-textarea
        id="description"
        v-model="formData.description"
        placeholder="Description de l'action"
        :rows="4"
        class="w-full"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="field">
        <label for="type" class="block text-sm font-medium mb-1">Type</label>
        <p-dropdown
          id="type"
          v-model="formData.type"
          :options="typeOptions"
          optionLabel="text"
          optionValue="value"
          required
          class="w-full"
        />
      </div>

      <div class="field">
        <label for="priority" class="block text-sm font-medium mb-1">Priorité</label>
        <p-dropdown
          id="priority"
          v-model="formData.priority"
          :options="priorityOptions"
          optionLabel="text"
          optionValue="value"
          required
          class="w-full"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="field">
        <label for="status" class="block text-sm font-medium mb-1">Statut</label>
        <p-dropdown
          id="status"
          v-model="formData.status"
          :options="statusOptions"
          optionLabel="text"
          optionValue="value"
          required
          class="w-full"
        />
      </div>

      <div class="field">
        <label for="assigned_to" class="block text-sm font-medium mb-1">Assigné à</label>
        <p-dropdown
          id="assigned_to"
          v-model="formData.assigned_to"
          :options="userOptionsWithDefault"
          optionLabel="text"
          optionValue="value"
          class="w-full"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="field">
        <label for="due_date" class="block text-sm font-medium mb-1">Date d'échéance</label>
        <p-input-text id="due_date" v-model="formData.due_date" type="date" class="w-full" />
      </div>

      <div class="field">
        <label for="progress" class="block text-sm font-medium mb-1">Progression</label>
        <p-input-number
          id="progress"
          v-model="formData.progress"
          placeholder="Progression en %"
          :min="0"
          :max="100"
          :step="1"
          class="w-full"
        />
        <small class="text-sm text-gray-500">Valeur entre 0 et 100</small>
      </div>
    </div>

    <div class="field">
      <label for="related_to" class="block text-sm font-medium mb-1">Lié à</label>
      <p-dropdown
        id="related_to"
        v-model="formData.related_to"
        :options="relatedToOptionsWithDefault"
        optionLabel="text"
        optionValue="value"
        class="w-full"
      />
    </div>

    <div v-if="formData.related_to" class="field">
      <label for="related_id" class="block text-sm font-medium mb-1">ID de l'élément lié</label>
      <p-input-number
        id="related_id"
        v-model="formData.related_id"
        placeholder="ID de l'élément lié"
        :min="1"
        class="w-full"
      />
    </div>

    <div class="flex justify-end gap-2 pt-4">
      <p-button
        type="submit"
        :label="submitButtonText"
        icon="pi pi-save"
        :loading="state.loading"
        :disabled="state.loading"
        class="p-button-primary"
      />
      <p-button type="button" label="Annuler" @click="onCancel" class="p-button-secondary" />
    </div>

    <!-- Message d'erreur -->
    <div v-if="state.error" class="p-3 bg-red-100 text-red-700 rounded-md mt-3">
      {{ state.error }}
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import PInputText from 'primevue/inputtext'
import PInputNumber from 'primevue/inputnumber'
import PDropdown from 'primevue/dropdown'
import PTextarea from 'primevue/textarea'
import PButton from 'primevue/button'
import type { User } from '@/stores/app'

// Définir les types pour les props
interface Props {
  initialData?: ActionFormData
  users?: User[]
  submitButtonText?: string
}

// Définir les types pour les événements
interface Emits {
  (e: 'submit', data: ActionFormData): void
  (e: 'cancel'): void
}

// Props et émissions
const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({
    title: '',
    description: '',
    type: '',
    priority: '',
    status: 'open',
    assigned_to: undefined,
    due_date: '',
    progress: 0,
    related_to: '',
    related_id: undefined,
  }),
  users: () => [],
  submitButtonText: 'Enregistrer',
})

const emit = defineEmits<Emits>()

// Définir le type pour les données de formulaire
interface ActionFormData {
  title: string
  description: string
  type: string
  priority: string
  status: string
  assigned_to: number | undefined
  due_date: string
  progress: number
  related_to: string
  related_id: number | undefined
}

// Données du formulaire
const formData = ref<ActionFormData>({ ...props.initialData })

// États
const state = reactive({
  loading: false,
  error: '',
})

// Options pour les sélections
const typeOptions = [
  { value: 'corrective', text: 'Corrective' },
  { value: 'preventive', text: 'Préventive' },
  { value: 'improvement', text: 'Amélioration' },
]

const priorityOptions = [
  { value: 'low', text: 'Basse' },
  { value: 'medium', text: 'Moyenne' },
  { value: 'high', text: 'Haute' },
  { value: 'critical', text: 'Critique' },
]

const statusOptions = [
  { value: 'open', text: 'Ouvert' },
  { value: 'in_progress', text: 'En cours' },
  { value: 'completed', text: 'Terminé' },
  { value: 'cancelled', text: 'Annulé' },
]

const relatedToOptions = [
  { value: 'document', text: 'Document' },
  { value: 'indicator', text: 'Indicateur' },
  { value: 'inspection', text: 'Inspection' },
  { value: 'equipment', text: 'Équipement' },
  { value: 'training', text: 'Formation' },
]

// Options pour les utilisateurs avec option par défaut
const userOptionsWithDefault = computed(() => {
  const defaultOption = { value: null, text: 'Personne non assignée' }
  const userOptions = props.users.map((user) => ({
    value: user.id,
    text: `${user.first_name} ${user.last_name} (${user.username})`,
  }))
  return [defaultOption, ...userOptions]
})

// Options pour les éléments liés avec option par défaut
const relatedToOptionsWithDefault = computed(() => {
  const defaultOption = { value: '', text: 'Aucune relation' }
  return [defaultOption, ...relatedToOptions]
})

// Fonction de soumission
const submitForm = () => {
  state.error = ''
  emit('submit', formData.value)
}

// Fonction d'annulation
const onCancel = () => {
  emit('cancel')
}
</script>

<style scoped>
.field {
  @apply mb-4;
}
</style>
