<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Titre -->
      <div class="mb-4 col-span-1 md:col-span-2">
        <label for="title" class="block text-sm font-medium mb-2 text-gray-700">Titre *</label>
        <InputText
          id="title"
          v-model="formData.title"
          placeholder="Titre de l'action"
          class="w-full"
          :class="{ 'p-invalid': errors.title }"
        />
        <small v-if="errors.title" class="text-red-500">{{ errors.title }}</small>
      </div>

      <!-- Type -->
      <div class="mb-4">
        <label for="type" class="block text-sm font-medium mb-2 text-gray-700">Type *</label>
        <Select
          id="type"
          v-model="formData.action_type_id"
          :options="typeOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Sélectionnez un type"
          class="w-full"
          :class="{ 'p-invalid': errors.action_type_id }"
        />
        <small v-if="errors.action_type_id" class="text-red-500">{{ errors.action_type_id }}</small>
      </div>

      <!-- Priorité -->
      <div class="mb-4">
        <label for="priority" class="block text-sm font-medium mb-2 text-gray-700"
          >Priorité *</label
        >
        <Select
          id="priority"
          v-model="formData.priority"
          :options="priorityOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Sélectionnez une priorité"
          class="w-full"
          :class="{ 'p-invalid': errors.priority }"
        />
        <small v-if="errors.priority" class="text-red-500">{{ errors.priority }}</small>
      </div>

      <!-- Statut -->
      <div class="mb-4">
        <label for="status" class="block text-sm font-medium mb-2 text-gray-700">Statut *</label>
        <Select
          id="status"
          v-model="formData.status"
          :options="statusOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Sélectionnez un statut"
          class="w-full"
          :class="{ 'p-invalid': errors.status }"
        />
        <small v-if="errors.status" class="text-red-500">{{ errors.status }}</small>
      </div>

      <!-- Responsable -->
      <div class="mb-4">
        <label for="assigned_to" class="block text-sm font-medium mb-2 text-gray-700"
          >Responsable</label
        >
        <Select
          id="assigned_to"
          v-model="formData.assigned_to"
          :options="userOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Sélectionnez un responsable"
          class="w-full"
          showClear
          filter
        />
      </div>

      <!-- Échéance -->
      <div class="mb-4">
        <label for="due_date" class="block text-sm font-medium mb-2 text-gray-700">Échéance</label>
        <DatePicker
          id="due_date"
          v-model="formData.due_date"
          dateFormat="yy-mm-dd"
          showIcon
          class="w-full"
        />
      </div>

      <!-- Progression -->
      <div class="mb-4">
        <label for="progress" class="block text-sm font-medium mb-2 text-gray-700"
          >Progression ({{ formData.progress }}%)</label
        >
        <Slider v-model="formData.progress" class="w-full" :step="5" />
      </div>
    </div>

    <!-- Description -->
    <div class="mb-4">
      <label for="description" class="block text-sm font-medium mb-2 text-gray-700"
        >Description</label
      >
      <Textarea
        id="description"
        v-model="formData.description"
        placeholder="Description détaillée de l'action"
        rows="4"
        class="w-full"
      />
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
      <Button label="Annuler" icon="pi pi-times" text severity="secondary" @click="onCancel" />
      <Button type="submit" :label="submitButtonText" icon="pi pi-save" :loading="loading" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { z } from 'zod'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker'
import Slider from 'primevue/slider'
import { useActionTypeStore } from '@/stores/actionTypes'
import { useUserStore } from '@/stores/users'
import { onMounted, computed } from 'vue'

// Stores
const actionTypeStore = useActionTypeStore()
const userStore = useUserStore()

// Types
interface ActionFormData {
  title: string
  description: string
  action_type_id: number | null
  priority: string
  status: string
  assigned_to: number | null
  due_date: Date | null
  progress: number
  related_to: string
  related_id: number | null
}

interface ActionFormDataForApi {
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

// Interface pour les données initiales
interface InitialActionData {
  title: string
  description: string
  action_type_id: number | null
  priority: string
  status: string
  assigned_to: number | null
  due_date: Date | string | null
  progress: number
  related_to: string
  related_id: number | null
}

interface Props {
  initialData?: Partial<InitialActionData>
  submitButtonText?: string
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: ActionFormDataForApi): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({
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
  }),
  submitButtonText: 'Enregistrer',
  loading: false,
})

const emit = defineEmits<Emits>()

// Helper pour convertir la date
const parseDate = (date: Date | string | null | undefined): Date | null => {
  if (!date) return null
  if (date instanceof Date) return date
  return new Date(date)
}

// Données
const formData = ref<ActionFormData>({
  title: props.initialData.title || '',
  description: props.initialData.description || '',
  action_type_id: props.initialData.action_type_id || null,
  priority: props.initialData.priority || '',
  status: props.initialData.status || 'open',
  assigned_to: props.initialData.assigned_to || null,
  due_date: parseDate(props.initialData.due_date),
  progress: props.initialData.progress || 0,
  related_to: props.initialData.related_to || '',
  related_id: props.initialData.related_id || null,
})

const errors = ref<Record<string, string>>({})

// Validation Schema (Zod)
const schema = z.object({
  title: z.string().min(1, 'Le titre est requis').max(255, 'Le titre est trop long'),
  description: z.string().optional(),
  action_type_id: z.number().int().positive('Le type est requis'),
  priority: z.string().min(1, 'La priorité est requise'),
  status: z.string().min(1, 'Le statut est requis'),
  progress: z.number().min(0).max(100),
})

// Options
const typeOptions = computed(() => {
  return (actionTypeStore.types || []).map((type) => ({
    label: type.name,
    value: type.id,
  }))
})

const userOptions = computed(() => {
  return (userStore.users || []).map((user) => ({
    label: `${user.first_name} ${user.last_name}`,
    value: user.id,
  }))
})

const priorityOptions = [
  { label: 'Basse', value: 'low' },
  { label: 'Moyenne', value: 'medium' },
  { label: 'Haute', value: 'high' },
  { label: 'Critique', value: 'critical' },
]

const statusOptions = [
  { label: 'Ouvert', value: 'open' },
  { label: 'En cours', value: 'in_progress' },
  { label: 'Terminé', value: 'completed' },
  { label: 'Annulé', value: 'cancelled' },
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
      error.issues.forEach((err: z.ZodIssue) => {
        if (err.path) {
          errors.value[err.path[0] as string] = err.message
        }
      })
    }
    return false
  }
}

const handleSubmit = () => {
  if (validate()) {
    // Formater la date pour l'envoi
    const dataToSend = { ...formData.value }
    const formattedData: ActionFormDataForApi = { ...dataToSend } as any
    if (dataToSend.due_date instanceof Date) {
      formattedData.due_date = dataToSend.due_date.toISOString().split('T')[0]
    } else {
      formattedData.due_date = null
    }

    emit('submit', formattedData)
  }
}

const onCancel = () => {
  emit('cancel')
}

// Watch initialData changes
watch(
  () => props.initialData,
  (newVal) => {
    if (newVal) {
      formData.value = {
        title: newVal.title || '',
        description: newVal.description || '',
        action_type_id: newVal.action_type_id || null,
        priority: newVal.priority || '',
        status: newVal.status || 'open',
        assigned_to: newVal.assigned_to || null,
        due_date: parseDate(newVal.due_date),
        progress: newVal.progress || 0,
        related_to: newVal.related_to || '',
        related_id: newVal.related_id || null,
      }
    }
  },
  { deep: true },
)

onMounted(() => {
  actionTypeStore.fetchTypes()
  userStore.fetchUsers(1, 100)
})
</script>
