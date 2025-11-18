<template>
  <form @submit.prevent="submitForm" class="flex flex-col gap-4">
    <div class="field">
      <label for="name" class="block text-sm font-medium mb-1">Nom</label>
      <p-input-text
        id="name"
        v-model="formData.name"
        placeholder="Nom de l'indicateur"
        required
        class="w-full"
      />
    </div>

    <div class="field">
      <label for="description" class="block text-sm font-medium mb-1">Description</label>
      <p-textarea
        id="description"
        v-model="formData.description"
        placeholder="Description de l'indicateur"
        :rows="4"
        class="w-full"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="field">
        <label for="code" class="block text-sm font-medium mb-1">Code</label>
        <p-input-text
          id="code"
          v-model="formData.code"
          placeholder="Code de l'indicateur"
          required
          class="w-full"
        />
      </div>

      <div class="field">
        <label for="category" class="block text-sm font-medium mb-1">Catégorie</label>
        <p-input-text
          id="category"
          v-model="formData.category"
          placeholder="Catégorie de l'indicateur"
          class="w-full"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="field">
        <label for="unit" class="block text-sm font-medium mb-1">Unité</label>
        <p-input-text
          id="unit"
          v-model="formData.unit"
          placeholder="Unité de mesure"
          class="w-full"
        />
      </div>

      <div class="field">
        <label for="frequency" class="block text-sm font-medium mb-1">Fréquence</label>
        <p-dropdown
          id="frequency"
          v-model="formData.frequency"
          :options="frequencyOptions"
          optionLabel="text"
          optionValue="value"
          required
          class="w-full"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="field">
        <label for="target_value" class="block text-sm font-medium mb-1">Valeur cible</label>
        <p-input-number
          id="target_value"
          v-model="formData.target_value"
          placeholder="Valeur cible"
          :min="0"
          :step="0.01"
          class="w-full"
        />
      </div>

      <div class="field">
        <label for="trend_direction" class="block text-sm font-medium mb-1">Sens de tendance</label>
        <p-dropdown
          id="trend_direction"
          v-model="formData.trend_direction"
          :options="trendDirectionOptions"
          optionLabel="text"
          optionValue="value"
          required
          class="w-full"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="field">
        <label for="threshold_min" class="block text-sm font-medium mb-1">Seuil minimum</label>
        <p-input-number
          id="threshold_min"
          v-model="formData.threshold_min"
          placeholder="Seuil minimum"
          :min="0"
          :step="0.01"
          class="w-full"
        />
      </div>

      <div class="field">
        <label for="threshold_max" class="block text-sm font-medium mb-1">Seuil maximum</label>
        <p-input-number
          id="threshold_max"
          v-model="formData.threshold_max"
          placeholder="Seuil maximum"
          :min="0"
          :step="0.01"
          class="w-full"
        />
      </div>
    </div>

    <div class="field">
      <label for="calculation_method" class="block text-sm font-medium mb-1"
        >Méthode de calcul</label
      >
      <p-textarea
        id="calculation_method"
        v-model="formData.calculation_method"
        placeholder="Description de la méthode de calcul"
        :rows="4"
        class="w-full"
      />
    </div>

    <div class="field">
      <label for="data_source" class="block text-sm font-medium mb-1">Source des données</label>
      <p-input-text
        id="data_source"
        v-model="formData.data_source"
        placeholder="Source des données"
        class="w-full"
      />
    </div>

    <div class="field flex items-center">
      <p-checkbox id="is_active" v-model="formData.is_active" :binary="true" inputId="is_active" />
      <label for="is_active" class="ml-2 block text-sm">Actif</label>
    </div>

    <div class="flex justify-end gap-2 pt-4">
      <p-button
        type="submit"
        label="Enregistrer"
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
import { ref, reactive } from 'vue'
import PInputText from 'primevue/inputtext'
import PInputNumber from 'primevue/inputnumber'
import PDropdown from 'primevue/dropdown'
import PTextarea from 'primevue/textarea'
import PButton from 'primevue/button'
import PCheckbox from 'primevue/checkbox'

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
    target_value: undefined,
    threshold_min: undefined,
    threshold_max: undefined,
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
  target_value: number | undefined
  threshold_min: number | undefined
  threshold_max: number | undefined
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
.field {
  @apply mb-4;
}
</style>
