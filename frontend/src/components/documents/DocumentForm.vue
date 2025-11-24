<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Titre -->
      <div class="field">
        <label for="title" class="block text-sm font-medium mb-2 text-gray-700">Titre *</label>
        <InputText
          id="title"
          v-model="formData.title"
          placeholder="Titre du document"
          class="w-full"
          :class="{ 'p-invalid': errors.title }"
        />
        <small v-if="errors.title" class="text-red-500">{{ errors.title }}</small>
      </div>

      <!-- Version -->
      <div class="field">
        <label for="version" class="block text-sm font-medium mb-2 text-gray-700">Version *</label>
        <InputText
          id="version"
          v-model="formData.version"
          placeholder="1.0"
          class="w-full"
          :class="{ 'p-invalid': errors.version }"
        />
        <small v-if="errors.version" class="text-red-500">{{ errors.version }}</small>
      </div>

      <!-- Dossier -->
      <div class="field">
        <label for="folder" class="block text-sm font-medium mb-2 text-gray-700">Dossier</label>
        <TreeSelect
          v-model="formData.document_folder_id"
          :options="folderOptions"
          placeholder="Sélectionnez un dossier"
          class="w-full"
          :class="{ 'p-invalid': errors.document_folder_id }"
        />
        <small v-if="errors.document_folder_id" class="text-red-500">{{
          errors.document_folder_id
        }}</small>
      </div>

      <!-- Type de document (Catégorie) -->
      <div class="field">
        <label for="category" class="block text-sm font-medium mb-2 text-gray-700"
          >Type de document *</label
        >
        <Dropdown
          id="category"
          v-model="formData.category"
          :options="categoryOptions"
          optionLabel="text"
          optionValue="value"
          placeholder="Sélectionnez un type"
          class="w-full"
          :class="{ 'p-invalid': errors.category }"
        />
        <small v-if="errors.category" class="text-red-500">{{ errors.category }}</small>
      </div>

      <!-- Statut -->
      <div class="field">
        <label for="status" class="block text-sm font-medium mb-2 text-gray-700">Statut *</label>
        <Dropdown
          id="status"
          v-model="formData.status"
          :options="statusOptions"
          optionLabel="text"
          optionValue="value"
          placeholder="Sélectionnez un statut"
          class="w-full"
          :class="{ 'p-invalid': errors.status }"
        />
        <small v-if="errors.status" class="text-red-500">{{ errors.status }}</small>
      </div>
    </div>

    <!-- Description -->
    <div class="field">
      <label for="description" class="block text-sm font-medium mb-2 text-gray-700"
        >Description</label
      >
      <Textarea
        id="description"
        v-model="formData.description"
        placeholder="Description du document"
        rows="4"
        class="w-full"
      />
    </div>

    <!-- Fichier -->
    <div class="field">
      <label class="block text-sm font-medium mb-2 text-gray-700">Fichier</label>
      <FileUpload
        mode="basic"
        name="file"
        :auto="false"
        chooseLabel="Choisir un fichier"
        @select="onFileSelect"
        :maxFileSize="10000000"
        class="w-full"
      />
      <div
        v-if="selectedFile"
        class="mt-2 flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded"
      >
        <i class="pi pi-file"></i>
        <span>{{ selectedFile.name }} ({{ formatFileSize(selectedFile.size) }})</span>
        <Button icon="pi pi-times" text rounded severity="danger" size="small" @click="clearFile" />
      </div>
      <small v-if="errors.file" class="text-red-500">{{ errors.file }}</small>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
      <Button label="Annuler" icon="pi pi-times" text severity="secondary" @click="onCancel" />
      <Button type="submit" :label="submitButtonText" icon="pi pi-save" :loading="loading" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, computed } from 'vue'
import { z } from 'zod'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import FileUpload from 'primevue/fileupload'
import TreeSelect from 'primevue/treeselect'
import { useDocumentFolderStore } from '@/stores/documentFolders'
import type { DocumentFormData } from '@/stores/documents'

// Types

interface Props {
  initialData?: Partial<DocumentFormData>
  submitButtonText?: string
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: DocumentFormData & { file?: File }): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({
    title: '',
    description: '',
    document_folder_id: null,
    category: '',
    version: '1.0',
    status: 'draft',
  }),
  submitButtonText: 'Enregistrer',
  loading: false,
})

const emit = defineEmits<Emits>()
const folderStore = useDocumentFolderStore()

// Données
const formData = reactive<DocumentFormData>({
  title: '',
  description: '',
  document_folder_id: null,
  category: '',
  version: '1.0',
  status: 'draft',
  ...props.initialData,
})

const selectedFile = ref<File | undefined>(undefined)
const errors = reactive<Record<string, string>>({})

// Validation Schema (Zod)
const schema = z.object({
  title: z.string().min(1, 'Le titre est requis').max(255, 'Le titre est trop long'),
  description: z.string().optional(),
  document_folder_id: z.number().nullable(),
  category: z.string().min(1, 'Le type de document est requis'),
  version: z.string().min(1, 'La version est requise'),
  status: z.string().min(1, 'Le statut est requis'),
})

// Options
const folderOptions = computed(() => {
  const mapFolderToNode = (folder: any): any => ({
    key: folder.id,
    label: folder.name,
    data: folder.id,
    children: folder.children ? folder.children.map(mapFolderToNode) : [],
  })
  return folderStore.folders.map(mapFolderToNode)
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

// Méthodes
const onFileSelect = (event: any) => {
  const file = event.files[0]
  if (file) {
    selectedFile.value = file
    delete errors.file
  }
}

const clearFile = () => {
  selectedFile.value = undefined
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const validate = () => {
  // Reset errors
  Object.keys(errors).forEach((key) => delete errors[key])

  try {
    schema.parse(formData)
    return true
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.issues.forEach((err) => {
        if (err.path) {
          errors[err.path[0] as string] = err.message
        }
      })
    }
    return false
  }
}

const onSubmit = () => {
  if (validate()) {
    if (!selectedFile.value && !props.initialData.title) {
      // Simple check if new doc needs file
      errors.file = 'Le fichier est requis pour un nouveau document'
      return
    }
    emit('submit', { ...formData, file: selectedFile.value })
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
      Object.assign(formData, newVal)
    }
  },
  { deep: true },
)

onMounted(() => {
  folderStore.fetchFolders()
})
</script>
