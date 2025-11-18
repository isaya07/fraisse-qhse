<template>
  <form @submit.prevent="submitForm" class="flex flex-col gap-4">
    <div class="field">
      <label for="title" class="block text-sm font-medium mb-1">Titre *</label>
      <p-input-text
        id="title"
        v-model="formData.title"
        placeholder="Titre du document"
        required
        class="w-full"
      />
    </div>

    <div class="field">
      <label for="description" class="block text-sm font-medium mb-1">Description</label>
      <p-textarea
        id="description"
        v-model="formData.description"
        placeholder="Description du document"
        :rows="4"
        class="w-full"
      />
    </div>

    <div class="field">
      <label for="category" class="block text-sm font-medium mb-1">Catégorie</label>
      <p-dropdown
        id="category"
        v-model="formData.category"
        :options="categoryOptionsWithDefault"
        optionLabel="text"
        optionValue="value"
        class="w-full"
      />
    </div>

    <div class="field">
      <label for="version" class="block text-sm font-medium mb-1">Version</label>
      <p-input-text
        id="version"
        v-model="formData.version"
        placeholder="Version du document"
        class="w-full"
      />
    </div>

    <div class="field">
      <label for="status" class="block text-sm font-medium mb-1">Statut</label>
      <p-dropdown
        id="status"
        v-model="formData.status"
        :options="statusOptions"
        optionLabel="text"
        optionValue="value"
        class="w-full"
      />
    </div>

    <div class="field">
      <label class="block text-sm font-medium mb-1">Fichier</label>
      <div class="relative">
        <input
          type="file"
          @change="onFileSelect"
          class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
      <p v-if="selectedFile" class="text-sm text-gray-600 mt-1">
        Fichier sélectionné: {{ selectedFile.name }} ({{ formatFileSize(selectedFile.size) }})
      </p>
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
import PDropdown from 'primevue/dropdown'
import PTextarea from 'primevue/textarea'
import PButton from 'primevue/button'

// Définir les types pour les props
interface Props {
  initialData?: Partial<DocumentFormData>
  submitButtonText?: string
}

// Définir les types pour les événements
interface Emits {
  (e: 'submit', data: DocumentFormData & { file?: File }): void
  (e: 'cancel'): void
}

// Props et émissions
const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({
    title: '',
    description: '',
    category: '',
    version: '1.0',
    status: 'draft',
  }),
  submitButtonText: 'Enregistrer',
})

const emit = defineEmits<Emits>()

// Définir le type pour les données de formulaire
interface DocumentFormData {
  title: string
  description: string
  category: string
  version: string
  status: string
}

// Données du formulaire
const formData = ref<Partial<DocumentFormData>>({ ...props.initialData })

// Fichier sélectionné
const selectedFile = ref<File | undefined>(undefined)

// États
const state = reactive({
  loading: false,
  error: '',
})

// Options pour les sélections avec option par défaut
const categoryOptionsWithDefault = computed(() => {
  const defaultOption = { value: '', text: 'Sélectionnez une catégorie' }
  return [defaultOption, ...categoryOptions]
})

const categoryOptions = [
  { value: 'procedure', text: 'Procédure' },
  { value: 'form', text: 'Formulaire' },
  { value: 'consigne', text: 'Consigne' },
  { value: 'other', text: 'Autre' },
]

const statusOptions = [
  { value: 'draft', text: 'Brouillon' },
  { value: 'pending_approval', text: "En attente d'approbation" },
  { value: 'approved', text: 'Approuvé' },
  { value: 'rejected', text: 'Rejeté' },
  { value: 'archived', text: 'Archivé' },
]

// Fonction pour gérer la sélection de fichier
const onFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0 && target.files[0]) {
    selectedFile.value = target.files[0]
  } else {
    selectedFile.value = undefined
  }
}

// Fonction pour formater la taille du fichier
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Fonction de soumission
const submitForm = () => {
  if (!formData.value.title) {
    state.error = 'Le titre est requis'
    return
  }

  state.error = ''
  emit('submit', { ...(formData.value as DocumentFormData), file: selectedFile.value || undefined })
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
