<template>
  <form @submit.prevent="submitForm">
    <InputField v-model="formData.title" label="Titre" placeholder="Titre de l'action" required />
    <TextAreaField
      v-model="formData.description"
      label="Description"
      placeholder="Description de l'action"
      :rows="4"
    />

    <div class="columns">
      <div class="column is-half">
        <SelectField v-model="formData.type" label="Type" :options="typeOptions" required />
      </div>
      <div class="column is-half">
        <SelectField
          v-model="formData.priority"
          label="Priorité"
          :options="priorityOptions"
          required
        />
      </div>
    </div>

    <div class="columns">
      <div class="column is-half">
        <SelectField v-model="formData.status" label="Statut" :options="statusOptions" required />
      </div>
      <div class="column is-half">
        <SelectField
          v-model="formData.assigned_to"
          label="Assigné à"
          :options="userOptions"
          :has-default-option="true"
          default-option-text="Personne non assignée"
        />
      </div>
    </div>

    <div class="columns">
      <div class="column is-half">
        <InputField v-model="formData.due_date" label="Date d'échéance" type="date" />
      </div>
      <div class="column is-half">
        <NumberField
          v-model="formData.progress"
          label="Progression"
          placeholder="Progression en %"
          :min="0"
          :max="100"
          :step="1"
        />
        <p class="help">Valeur entre 0 et 100</p>
      </div>
    </div>

    <div class="field">
      <SelectField
        v-model="formData.related_to"
        label="Lié à"
        :options="relatedToOptions"
        :has-default-option="true"
        default-option-text="Aucune relation"
      />
    </div>

    <div v-if="formData.related_to" class="field">
      <NumberField
        v-model="formData.related_id"
        label="ID de l'élément lié"
        placeholder="ID de l'élément lié"
        :min="1"
      />
    </div>

    <div class="field is-grouped is-grouped-right mt-5">
      <div class="control">
        <MyButton
          type="submit"
          :text="submitButtonText"
          variant="primary"
          :loading="state.loading"
          :disabled="state.loading"
          :icon-left="state.loading ? ['fas', 'spinner'] : ['fas', 'save']"
        />
      </div>
      <div class="control">
        <MyButton type="button" text="Annuler" variant="light" @click="onCancel" />
      </div>
    </div>

    <!-- Message d'erreur -->
    <div v-if="state.error" class="notification is-danger mt-3">
      {{ state.error }}
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import InputField from '@/components/form/InputField.vue'
import NumberField from '@/components/form/NumberField.vue'
import SelectField from '@/components/form/SelectField.vue'
import TextAreaField from '@/components/form/TextAreaField.vue'
import MyButton from '@/components/ui/MyButton.vue'
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
    assigned_to: null,
    due_date: '',
    progress: 0,
    related_to: '',
    related_id: null,
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
  assigned_to: number | null
  due_date: string
  progress: number
  related_to: string
  related_id: number | null
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

// Options pour les utilisateurs
const userOptions = computed(() => {
  return props.users.map((user) => ({
    value: user.id,
    text: `${user.first_name} ${user.last_name} (${user.username})`,
  }))
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
.mt-5 {
  margin-top: 1.5rem;
}

.mt-3 {
  margin-top: 0.75rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.ml-2 {
  margin-left: 0.5rem;
}
</style>
