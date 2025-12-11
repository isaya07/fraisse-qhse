<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Nom -->
      <div class="mb-4 col-span-1 md:col-span-2">
        <label for="name" class="block text-sm font-medium mb-2 text-color-secondary">Nom *</label>
        <InputText
          id="name"
          v-model="formData.name"
          placeholder="Nom de l'indicateur"
          class="w-full"
          :class="{ 'p-invalid': errors.name }"
        />
        <small v-if="errors.name" class="text-red-500">{{ errors.name }}</small>
      </div>

      <!-- Catégorie -->
      <div class="mb-4">
        <label for="category" class="block text-sm font-medium mb-2 text-color-secondary"
          >Catégorie</label
        >
        <Select
          id="category"
          v-model="formData.indicator_category_id"
          :options="categoryOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Sélectionnez une catégorie"
          class="w-full"
          showClear
        />
      </div>

      <!-- Responsable -->
      <div class="mb-4">
        <label for="manager" class="block text-sm font-medium mb-2 text-color-secondary"
          >Responsable</label
        >
        <Select
          id="manager"
          v-model="formData.manager_id"
          :options="userOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Sélectionnez un responsable"
          class="w-full"
          showClear
          filter
        />
      </div>

      <!-- Unité -->
      <div class="mb-4">
        <label for="unit" class="block text-sm font-medium mb-2 text-color-secondary">Unité</label>
        <InputText
          id="unit"
          v-model="formData.unit"
          placeholder="Unité de mesure (ex: %, kg, €)"
          class="w-full"
        />
      </div>

      <!-- Fréquence -->
      <div class="mb-4">
        <label for="frequency" class="block text-sm font-medium mb-2 text-color-secondary"
          >Fréquence *</label
        >
        <Select
          id="frequency"
          v-model="formData.frequency"
          :options="frequencyOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Sélectionnez une fréquence"
          class="w-full"
          :class="{ 'p-invalid': errors.frequency }"
        />
        <small v-if="errors.frequency" class="text-red-500">{{ errors.frequency }}</small>
      </div>

      <!-- Valeur cible -->
      <div class="mb-4">
        <label for="target_value" class="block text-sm font-medium mb-2 text-color-secondary"
          >Valeur cible</label
        >
        <InputNumber
          id="target_value"
          v-model="formData.target_value"
          placeholder="Valeur cible"
          :min="0"
          :maxFractionDigits="2"
          class="w-full"
        />
      </div>

      <!-- Objectif (Goal Type) -->
      <div class="mb-4">
        <label for="goal_type" class="block text-sm font-medium mb-2 text-color-secondary"
          >Objectif de l'indicateur *</label
        >
        <Select
          id="goal_type"
          v-model="formData.goal_type"
          :options="goalTypeOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Sélectionnez l'objectif"
          class="w-full"
          :class="{ 'p-invalid': errors.goal_type }"
        />
        <small v-if="errors.goal_type" class="text-red-500">{{ errors.goal_type }}</small>
        <small class="text-xs text-muted-color block mt-1">
          Détermine comment la tendance est calculée automatiquement.
        </small>
      </div>

      <!-- Seuils -->
      <div class="mb-4">
        <label for="threshold_min" class="block text-sm font-medium mb-2 text-color-secondary"
          >Seuil minimum</label
        >
        <InputNumber
          id="threshold_min"
          v-model="formData.threshold_min"
          placeholder="Seuil minimum"
          :min="0"
          :maxFractionDigits="2"
          class="w-full"
        />
      </div>

      <div class="mb-4">
        <label for="threshold_max" class="block text-sm font-medium mb-2 text-color-secondary"
          >Seuil maximum</label
        >
        <InputNumber
          id="threshold_max"
          v-model="formData.threshold_max"
          placeholder="Seuil maximum"
          :min="0"
          :maxFractionDigits="2"
          class="w-full"
        />
      </div>

      <!-- Source des données -->
      <div class="mb-4 col-span-1 md:col-span-2">
        <label for="data_source" class="block text-sm font-medium mb-2 text-color-secondary"
          >Source des données</label
        >
        <InputText
          id="data_source"
          v-model="formData.data_source"
          placeholder="Source des données"
          class="w-full"
        />
      </div>

      <!-- Méthode de calcul -->
      <div class="mb-4 col-span-1 md:col-span-2">
        <label for="calculation_method" class="block text-sm font-medium mb-2 text-color-secondary"
          >Méthode de calcul</label
        >
        <Textarea
          id="calculation_method"
          v-model="formData.calculation_method"
          placeholder="Description de la méthode de calcul"
          rows="3"
          class="w-full"
        />
      </div>

      <!-- Description -->
      <div class="mb-4 col-span-1 md:col-span-2">
        <label for="description" class="block text-sm font-medium mb-2 text-color-secondary"
          >Description</label
        >
        <Textarea
          id="description"
          v-model="formData.description"
          placeholder="Description détaillée de l'indicateur"
          rows="4"
          class="w-full"
        />
      </div>

      <!-- Actif -->
      <div class="mb-4 col-span-1 md:col-span-2 flex items-center gap-2">
        <Checkbox v-model="formData.is_active" :binary="true" inputId="is_active" />
        <label for="is_active" class="text-sm font-medium text-color-secondary cursor-pointer"
          >Indicateur actif</label
        >
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-3 pt-4 border-t border-surface-border">
      <Button label="Annuler" icon="pi pi-times" text severity="secondary" @click="onCancel" />
      <Button type="submit" :label="submitButtonText" icon="pi pi-save" :loading="loading" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { z } from 'zod'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import { useIndicatorCategoryStore } from '@/stores/indicatorCategories'
import { useUserStore } from '@/stores/users'

// Types
interface IndicatorFormData {
  name: string
  description: string
  code: string
  indicator_category_id: number | null
  manager_id: number | null
  unit: string
  target_value: number | null
  threshold_min: number | null
  threshold_max: number | null
  calculation_method: string
  data_source: string
  frequency: string
  trend_direction: string
  goal_type: 'maximize' | 'minimize' | 'target'
  is_active: boolean
}

interface Props {
  initialData?: Partial<IndicatorFormData>
  submitButtonText?: string
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: IndicatorFormData): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({
    name: '',
    description: '',
    code: '',
    indicator_category_id: null,
    manager_id: null,
    unit: '',
    target_value: null,
    threshold_min: null,
    threshold_max: null,
    calculation_method: '',
    data_source: '',
    frequency: 'monthly',
    trend_direction: 'neutral', // default, calculated backend
    goal_type: 'maximize',
    is_active: true,
  }),
  submitButtonText: 'Enregistrer',
  loading: false,
})

const emit = defineEmits<Emits>()

// Store
const categoryStore = useIndicatorCategoryStore()
const userStore = useUserStore()

// Données
const formData = ref<IndicatorFormData>({
  name: props.initialData.name || '',
  description: props.initialData.description || '',
  code: props.initialData.code || '',
  indicator_category_id: props.initialData.indicator_category_id || null,
  manager_id: props.initialData.manager_id || null,
  unit: props.initialData.unit || '',
  target_value: props.initialData.target_value ?? null,
  threshold_min: props.initialData.threshold_min ?? null,
  threshold_max: props.initialData.threshold_max ?? null,
  calculation_method: props.initialData.calculation_method || '',
  data_source: props.initialData.data_source || '',
  frequency: props.initialData.frequency || 'monthly',
  trend_direction: props.initialData.trend_direction || 'neutral',
  goal_type: props.initialData.goal_type || 'maximize',
  is_active: props.initialData.is_active ?? true,
})

const errors = ref<Record<string, string>>({})

// Validation Schema (Zod)
const schema = z.object({
  name: z.string().min(1, 'Le nom est requis').max(255, 'Le nom est trop long'),
  frequency: z.string().min(1, 'La fréquence est requise'),
  goal_type: z.string().min(1, "L'objectif est requis"),
})

// Options
const categoryOptions = computed(() => {
  return (categoryStore.categories || []).map((cat) => ({
    label: cat.name,
    value: cat.id,
  }))
})

const userOptions = computed(() => {
  return (userStore.users || []).map((user) => ({
    label: `${user.first_name} ${user.last_name}`,
    value: user.id,
  }))
})

const frequencyOptions = [
  { value: 'daily', label: 'Quotidienne' },
  { value: 'weekly', label: 'Hebdomadaire' },
  { value: 'monthly', label: 'Mensuelle' },
  { value: 'quarterly', label: 'Trimestrielle' },
  { value: 'yearly', label: 'Annuelle' },
]

const goalTypeOptions = [
  { value: 'maximize', label: 'Maximiser (Mieux si ça monte)' },
  { value: 'minimize', label: 'Minimiser (Mieux si ça descend)' },
  { value: 'target', label: 'Cibler (Mieux si proche de la cible)' },
]

// Méthodes
const validate = () => {
  // Reset errors
  errors.value = {}

  try {
    schema.parse(formData.value)
    return true
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.issues.forEach((err) => {
        if (err.path && err.path.length > 0) {
          const pathKey = err.path[0] as string
          if (pathKey) {
            errors.value[pathKey] = err.message
          }
        }
      })
    }
    return false
  }
}

const handleSubmit = () => {
  if (validate()) {
    // Generate code if empty
    if (!formData.value.code) {
      formData.value.code = formData.value.name
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '_')
        .substring(0, 50)
    }
    emit('submit', { ...formData.value })
  }
}

const onCancel = () => {
  emit('cancel')
}

// Lifecycle
onMounted(() => {
  categoryStore.fetchCategories()
  userStore.fetchUsers(1, 100) // Fetch all users for dropdown
})

// Watch initialData changes
watch(
  () => props.initialData,
  (newVal) => {
    if (newVal) {
      formData.value = {
        name: newVal.name || '',
        description: newVal.description || '',
        code: newVal.code || '',
        indicator_category_id: newVal.indicator_category_id || null,
        manager_id: newVal.manager_id || null,
        unit: newVal.unit || '',
        target_value: newVal.target_value ?? null,
        threshold_min: newVal.threshold_min ?? null,
        threshold_max: newVal.threshold_max ?? null,
        calculation_method: newVal.calculation_method || '',
        data_source: newVal.data_source || '',
        frequency: newVal.frequency || 'monthly',
        trend_direction: newVal.trend_direction || 'neutral',
        goal_type: newVal.goal_type || 'maximize',
        is_active: newVal.is_active ?? true,
      }
    }
  },
  { deep: true },
)
</script>
