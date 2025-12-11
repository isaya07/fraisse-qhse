<template>
  <Dialog
    :visible="visible"
    @update:visible="handleClose"
    header="Nouvelle version du document"
    :modal="true"
    :style="{ width: '600px' }"
  >
    <div class="flex flex-col gap-4 py-4">
      <!-- Version Info -->
      <div class="bg-blue-50 border border-blue-200 rounded p-4">
        <div class="flex items-center gap-2 mb-2">
          <font-awesome-icon icon="info-circle" class="text-blue-600" />
          <span class="font-semibold text-blue-900">Information de version</span>
        </div>
        <div class="text-sm text-blue-800">
          <p>Version actuelle : <strong>{{ currentVersion }}</strong></p>
          <p>Nouvelle version : <strong>{{ previewVersion }}</strong></p>
        </div>
      </div>

      <!-- Version Type -->
      <div class="field">
        <label class="block text-sm font-medium mb-3 text-color-secondary">Type de version *</label>
        <div class="flex gap-4">
          <div class="flex items-center">
            <RadioButton
              v-model="formData.versionType"
              inputId="minor"
              value="minor"
              :class="{ 'p-invalid': errors.versionType }"
            />
            <label for="minor" class="ml-2 cursor-pointer">
              <div>
                <span class="font-medium">Mineure</span>
                <p class="text-xs text-color-secondary">Corrections, mises à jour mineures</p>
              </div>
            </label>
          </div>
          <div class="flex items-center">
            <RadioButton
              v-model="formData.versionType"
              inputId="major"
              value="major"
              :class="{ 'p-invalid': errors.versionType }"
            />
            <label for="major" class="ml-2 cursor-pointer">
              <div>
                <span class="font-medium">Majeure</span>
                <p class="text-xs text-color-secondary">Changements significatifs</p>
              </div>
            </label>
          </div>
        </div>
        <small v-if="errors.versionType" class="text-red-500">{{ errors.versionType }}</small>
      </div>

      <!-- File Upload -->
      <div class="field">
        <label for="file" class="block text-sm font-medium mb-2 text-color-secondary"
          >Nouveau fichier *</label
        >
        <FileUpload
          mode="basic"
          :auto="false"
          chooseLabel="Choisir un fichier"
          @select="onFileSelect"
          :maxFileSize="10485760"
          :class="{ 'p-invalid': errors.file }"
        />
        <small v-if="selectedFileName" class="text-color-secondary block mt-1">
          Fichier sélectionné : {{ selectedFileName }}
        </small>
        <small v-if="errors.file" class="text-red-500 block mt-1">{{ errors.file }}</small>
      </div>

      <!-- Changelog -->
      <div class="field">
        <label for="changelog" class="block text-sm font-medium mb-2 text-color-secondary"
          >Description des changements *</label
        >
        <Textarea
          id="changelog"
          v-model="formData.changelog"
          rows="5"
          placeholder="Décrivez les modifications apportées dans cette version (minimum 10 caractères)..."
          class="w-full"
          :class="{ 'p-invalid': errors.changelog }"
        />
        <small class="text-color-secondary">{{ formData.changelog.length }} / 10 caractères minimum</small>
        <small v-if="errors.changelog" class="text-red-500 block">{{ errors.changelog }}</small>
      </div>
    </div>

    <template #footer>
      <Button label="Annuler" text severity="secondary" @click="handleClose" />
      <Button
        label="Créer la version"
        @click="handleSubmit"
        :loading="loading"
        :disabled="!isFormValid"
      >
        <template #icon>
          <font-awesome-icon icon="upload" class="mr-2" />
        </template>
      </Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import RadioButton from 'primevue/radiobutton'
import FileUpload, { type FileUploadSelectEvent } from 'primevue/fileupload'
import Textarea from 'primevue/textarea'

interface Props {
  visible: boolean
  currentVersion: string
  loading?: boolean
}

interface Emits {
  (e: 'update:visible', value: boolean): void
  (e: 'upload', data: { file: File; changelog: string; versionType: string }): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const emit = defineEmits<Emits>()

const formData = ref({
  versionType: 'minor',
  file: null as File | null,
  changelog: '',
})

const selectedFileName = ref('')
const errors = ref<Record<string, string>>({})

const previewVersion = computed(() => {
  if (!props.currentVersion) return '1.0'
  
  const parts = props.currentVersion.split('.')
  const major = parseInt(parts[0] || '1')
  const minor = parseInt(parts[1] || '0')
  
  if (formData.value.versionType === 'major') {
    return `${major + 1}.0`
  }
  
  return `${major}.${minor + 1}`
})

const isFormValid = computed(() => {
  return (
    formData.value.file !== null &&
    formData.value.changelog.length >= 10 &&
    formData.value.versionType !== ''
  )
})

const onFileSelect = (event: FileUploadSelectEvent) => {
  const files = event.files
  if (files && files.length > 0) {
    formData.value.file = files[0]
    selectedFileName.value = files[0].name
    errors.value.file = ''
  }
}

const validateForm = (): boolean => {
  errors.value = {}
  
  if (!formData.value.file) {
    errors.value.file = 'Le fichier est requis'
  }
  
  if (formData.value.changelog.length < 10) {
    errors.value.changelog = 'Le changelog doit contenir au moins 10 caractères'
  }
  
  if (!formData.value.versionType) {
    errors.value.versionType = 'Le type de version est requis'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (!validateForm()) return
  
  if (formData.value.file) {
    emit('upload', {
      file: formData.value.file,
      changelog: formData.value.changelog,
      versionType: formData.value.versionType,
    })
  }
}

const handleClose = () => {
  emit('update:visible', false)
  resetForm()
}

const resetForm = () => {
  formData.value = {
    versionType: 'minor',
    file: null,
    changelog: '',
  }
  selectedFileName.value = ''
  errors.value = {}
}

// Reset form when dialog closes
watch(() => props.visible, (newVal) => {
  if (!newVal) {
    resetForm()
  }
})
</script>
