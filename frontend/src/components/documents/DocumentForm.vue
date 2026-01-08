<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-6">
    <!-- Fichier (Moved to top) -->
    <div class="field">
      <label class="block text-sm font-medium mb-2 text-color-secondary">Fichier</label>

      <div v-if="isEditMode" class="bg-blue-50 p-4 rounded-md border border-blue-200 mb-2">
        <div class="flex items-start">
          <font-awesome-icon :icon="['fas', 'info-circle']" class="text-blue-500 mt-1 mr-2" />
          <p class="text-sm text-blue-700 m-0">
            Pour modifier le fichier ou créer une nouvelle version, veuillez utiliser le bouton
            <strong>"Nouvelle Version"</strong> sur la page de détail du document.
          </p>
        </div>
      </div>

      <FileUpload
        v-if="!isEditMode"
        name="file"
        :multiple="false"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,image/jpeg,image/png"
        :maxFileSize="10000000"
        :auto="false"
        :showUploadButton="false"
        :showCancelButton="false"
        chooseLabel="Charger un fichier"
        @select="onFileSelect"
        @remove="onFileRemove"
        @clear="onFileClear"
      >
        <template #content="{ files, removeFileCallback }">
          <div v-if="files.length > 0" class="flex flex-col gap-2">
            <div
              v-for="(file, index) in files"
              :key="index"
              class="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg"
            >
              <div class="flex items-center gap-3 overflow-hidden">
                <font-awesome-icon :icon="['fas', 'file']" class="text-primary text-xl shrink-0" />
                <div class="flex flex-col overflow-hidden">
                  <span class="font-medium text-sm truncate" :title="file.name">{{
                    file.name
                  }}</span>
                  <span class="text-xs text-color-secondary">{{ formatFileSize(file.size) }}</span>
                </div>
              </div>
              <Button
                outlined
                rounded
                severity="danger"
                size="small"
                @click="removeFileCallback(index)"
                class="shrink-0 ml-2"
              >
                <template #icon>
                  <font-awesome-icon :icon="['fas', 'times']" />
                </template>
              </Button>
            </div>
          </div>
        </template>
        <template #empty>
          <div class="flex items-center justify-center flex-col py-4">
            <font-awesome-icon
              :icon="['fas', 'cloud-upload-alt']"
              class="text-4xl text-color-secondary mb-3"
            />
            <p class="m-0 text-color-secondary">Glisser-déposer le fichier ici.</p>
          </div>
        </template>
      </FileUpload>
      <small v-if="errors.file" class="text-red-500">{{ errors.file }}</small>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Titre -->
      <div class="field">
        <label for="title" class="block text-sm font-medium mb-2 text-color-secondary"
          >Titre *</label
        >
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
        <label for="version" class="block text-sm font-medium mb-2 text-color-secondary"
          >Version *</label
        >
        <InputText
          id="version"
          v-model="formData.version"
          placeholder="1.0"
          class="w-full"
          :class="{ 'p-invalid': errors.version }"
          :disabled="isEditMode"
        />
        <small v-if="errors.version" class="text-red-500">{{ errors.version }}</small>
      </div>

      <!-- Dossier -->
      <div class="field">
        <label for="folder" class="block text-sm font-medium mb-2 text-color-secondary"
          >Dossier</label
        >
        <TreeSelect
          v-model="selectedFolder"
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
        <label for="category" class="block text-sm font-medium mb-2 text-color-secondary"
          >Type de document *</label
        >
        <Select
          id="category"
          v-model="formData.category_id"
          :options="categoryOptions"
          optionLabel="text"
          optionValue="value"
          placeholder="Sélectionnez un type"
          class="w-full"
          :class="{ 'p-invalid': errors.category_id }"
        >
          <template #option="{ option }">
            <div class="flex items-center gap-2">
              <font-awesome-icon v-if="option.icon" :icon="['fas', option.icon]" />
              <span>{{ option.text }}</span>
            </div>
          </template>
          <template #value="{ value }">
            <div v-if="value" class="flex items-center gap-2">
              <font-awesome-icon
                v-if="categoryOptions.find((c) => c.value === value)?.icon"
                :icon="['fas', categoryOptions.find((c) => c.value === value)?.icon]"
              />
              <span>{{ categoryOptions.find((c) => c.value === value)?.text }}</span>
            </div>
          </template>
        </Select>
        <small v-if="errors.category_id" class="text-red-500">{{ errors.category_id }}</small>
      </div>

      <!-- Statut -->
      <div class="field">
        <label for="status" class="block text-sm font-medium mb-2 text-color-secondary"
          >Statut *</label
        >
        <Select
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
      <!-- Date d'expiration -->
      <div class="field">
        <label for="expires_date" class="block text-sm font-medium mb-2 text-color-secondary"
          >Date d'expiration (optionnel)</label
        >
        <DatePicker
          id="expires_date"
          v-model="formData.expires_date"
          dateFormat="dd/mm/yy"
          placeholder="Sélectionnez une date"
          class="w-full"
          fluid
          showIcon
          iconDisplay="input"
          :class="{ 'p-invalid': errors.expires_date }"
        />
        <small v-if="errors.expires_date" class="text-red-500">{{ errors.expires_date }}</small>
      </div>
    </div>
    <!-- Description -->
    <div class="field">
      <label for="description" class="block text-sm font-medium mb-2 text-color-secondary"
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

    <!-- Actions -->
    <div class="flex justify-end gap-3 pt-4 border-t border-surface-border">
      <Button label="Annuler" text severity="secondary" @click="onCancel">
        <template #icon>
          <font-awesome-icon :icon="['fas', 'times']" />
        </template>
      </Button>
      <Button type="submit" :label="submitButtonText" :loading="loading">
        <template #icon>
          <font-awesome-icon :icon="['fas', 'save']" />
        </template>
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, computed } from 'vue'
import { z } from 'zod'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import FileUpload, { type FileUploadSelectEvent } from 'primevue/fileupload'
import TreeSelect from 'primevue/treeselect'
import DatePicker from 'primevue/datepicker'
import { useDocumentFolderStore, type DocumentFolder } from '@/stores/documentFolders'
import type { DocumentFormData } from '@/stores/documents'
import type { TreeNode } from 'primevue/treenode'

import { useCategoryStore } from '@/stores/category'

// Types
interface Props {
  initialData?: Partial<DocumentFormData>
  submitButtonText?: string
  loading?: boolean
  isEditMode?: boolean
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
    category_id: null,
    version: '1.0',
    status: 'draft',
  }),
  submitButtonText: 'Enregistrer',
  loading: false,
  isEditMode: false,
})

const emit = defineEmits<Emits>()
const folderStore = useDocumentFolderStore()
const categoryStore = useCategoryStore()

// Données
const formData = reactive<DocumentFormData>({
  title: '',
  description: '',
  document_folder_id: null,
  category_id: null,
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
  category_id: z.number('Le type de document est requis'),
  version: z.string().min(1, 'La version est requise'),
  status: z.string().min(1, 'Le statut est requis'),
  expires_date: z.date().nullable().optional(),
})

// Options
const folderOptions = computed<TreeNode[]>(() => {
  const mapFolderToNode = (folder: DocumentFolder): TreeNode => ({
    key: folder.id.toString(),
    label: folder.name,
    data: folder.id,
    children: folder.children ? folder.children.map(mapFolderToNode) : [],
  })
  return folderStore.folders.map(mapFolderToNode)
})

const categoryOptions = computed(() => {
  return categoryStore.categories.map((cat) => ({
    value: cat.id,
    text: cat.name,
    icon: cat.icon,
  }))
})

const statusOptions = [
  { value: 'draft', text: 'Brouillon' },
  { value: 'pending_approval', text: "En attente d'approbation" },
  { value: 'approved', text: 'Approuvé' },
  { value: 'rejected', text: 'Rejeté' },
  { value: 'archived', text: 'Archivé' },
]

const onFileSelect = (event: FileUploadSelectEvent) => {
  const file = Array.isArray(event.files) ? event.files[0] : event.files
  if (file) {
    selectedFile.value = file
    delete errors.file
  }
}

const onFileRemove = (/* event: FileUploadRemoveEvent */) => {
  selectedFile.value = undefined
}

const onFileClear = () => {
  selectedFile.value = undefined
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const unit = sizes[i] || sizes[sizes.length - 1]
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + unit
}

const selectedFolder = computed({
  get: () => {
    return formData.document_folder_id ? { [formData.document_folder_id.toString()]: true } : null
  },
  set: (value: any) => {
    if (value && typeof value === 'object') {
      const keys = Object.keys(value)
      if (keys.length > 0) {
        formData.document_folder_id = parseInt(keys[0] as string)
      } else {
        formData.document_folder_id = null
      }
    } else {
      formData.document_folder_id = null
    }
  },
})

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
  categoryStore.fetchCategories()
})
</script>
