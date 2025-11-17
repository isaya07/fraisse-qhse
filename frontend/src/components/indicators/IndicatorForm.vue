<template>
  <form @submit.prevent="submitForm">
    <InputField v-model="formData.name" label="Nom" placeholder="Nom de l'indicateur" required />
    <TextAreaField
      v-model="formData.description"
      label="Description"
      placeholder="Description de l'indicateur"
      :rows="4"
    />

    <div class="columns">
      <div class="column is-half">
        <InputField
          v-model="formData.code"
          label="Code"
          placeholder="Code de l'indicateur"
          required
        />
      </div>
      <div class="column is-half">
        <InputField
          v-model="formData.category"
          label="Catégorie"
          placeholder="Catégorie de l'indicateur"
        />
      </div>
    </div>

    <div class="columns">
      <div class="column is-half">
        <InputField v-model="formData.unit" label="Unité" placeholder="Unité de mesure" />
      </div>
      <div class="column is-half">
        <SelectField
          v-model="formData.frequency"
          label="Fréquence"
          :options="frequencyOptions"
          required
        />
      </div>
    </div>

    <div class="columns">
      <div class="column is-half">
        <NumberField
          v-model="formData.target_value"
          label="Valeur cible"
          placeholder="Valeur cible"
          :min="0"
          :step="0.01"
        />
      </div>
      <div class="column is-half">
        <SelectField
          v-model="formData.trend_direction"
          label="Sens de tendance"
          :options="trendDirectionOptions"
          required
        />
      </div>
    </div>

    <div class="columns">
      <div class="column is-half">
        <NumberField
          v-model="formData.threshold_min"
          label="Seuil minimum"
          placeholder="Seuil minimum"
          :min="0"
          :step="0.01"
        />
      </div>
      <div class="column is-half">
        <NumberField
          v-model="formData.threshold_max"
          label="Seuil maximum"
          placeholder="Seuil maximum"
          :min="0"
          :step="0.01"
        />
      </div>
    </div>

    <div class="field">
      <TextAreaField
        v-model="formData.calculation_method"
        label="Méthode de calcul"
        placeholder="Description de la méthode de calcul"
        :rows="4"
      />
    </div>

    <div class="field">
      <InputField
        v-model="formData.data_source"
        label="Source des données"
        placeholder="Source des données"
      />
    </div>

    <div class="field">
      <label class="checkbox">
        <input v-model="formData.is_active" type="checkbox" />
        Actif
      </label>
    </div>

    <div class="field is-grouped is-grouped-right mt-5">
      <div class="control">
        <MyButton
          type="submit"
          text="Enregistrer"
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
import { ref, reactive } from 'vue'
import InputField from '@/components/form/InputField.vue'
import NumberField from '@/components/form/NumberField.vue'
import SelectField from '@/components/form/SelectField.vue'
import TextAreaField from '@/components/form/TextAreaField.vue'
import MyButton from '@/components/ui/MyButton.vue'

// Définir les types pour les props
interface Props {
  initialData?: IndicatorFormData
}

// Définir les types pour les événements
interface Emits {
  (e: 'submit', data: IndicatorFormData): void
  (e: 'cancel'): void
}

// Props et émissions
const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({
    name: '',
    description: '',
    code: '',
    category: '',
    unit: '',
    target_value: null,
    threshold_min: null,
    threshold_max: null,
    calculation_method: '',
    data_source: '',
    frequency: 'monthly',
    trend_direction: 'positive',
    is_active: true,
  }),
})

const emit = defineEmits<Emits>()

// Définir le type pour les données de formulaire
interface IndicatorFormData {
  name: string
  description: string
  code: string
  category: string
  unit: string
  target_value: number | null
  threshold_min: number | null
  threshold_max: number | null
  calculation_method: string
  data_source: string
  frequency: string
  trend_direction: string
  is_active: boolean
}

// Données du formulaire
const formData = ref<IndicatorFormData>({ ...props.initialData })

// États
const state = reactive({
  loading: false,
  error: '',
})

// Options pour les sélections
const frequencyOptions = [
  { value: 'daily', text: 'Quotidienne' },
  { value: 'weekly', text: 'Hebdomadaire' },
  { value: 'monthly', text: 'Mensuelle' },
  { value: 'quarterly', text: 'Trimestrielle' },
  { value: 'yearly', text: 'Annuelle' },
]

const trendDirectionOptions = [
  { value: 'positive', text: 'Positive (meilleur si valeur augmente)' },
  { value: 'negative', text: 'Négative (meilleur si valeur diminue)' },
  { value: 'neutral', text: 'Neutre (valeur cible est optimale)' },
]

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
