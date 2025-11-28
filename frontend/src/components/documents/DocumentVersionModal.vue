<template>
  <Dialog
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    modal
    header="Nouvelle Version"
    :style="{ width: '50vw' }"
    :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
  >
    <div class="flex flex-col gap-6">
      <div class="bg-blue-50 p-4 rounded-md border border-blue-200">
        <div class="flex items-start">
          <font-awesome-icon :icon="['fas', 'info-circle']" class="text-blue-500 mt-1 mr-2" />
          <div>
            <p class="text-sm text-blue-700 m-0 font-semibold">
              Version actuelle : {{ currentVersion }}
            </p>
            <p class="text-sm text-blue-600 m-0">
              La nouvelle version doit être supérieure à la version actuelle.
            </p>
          </div>
        </div>
      </div>

      <form @submit.prevent="onSubmit" class="flex flex-col gap-6">
        <!-- Fichier -->
        <div class="field">
          <label class="block text-sm font-medium mb-2 text-gray-700">Nouveau Fichier *</label>
          <FileUpload
            name="file"
            :auto="true"
            :customUpload="true"
            @uploader="onFileSelect"
            :maxFileSize="20000000"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,image/jpeg,image/png"
          >
            <template #empty>
              <div class="flex items-center justify-center flex-col">
                <font-awesome-icon
                  :icon="['fas', 'cloud-upload-alt']"
                  class="text-6xl text-gray-300 mb-4"
                />
                <p class="mt-4 mb-0">Glisser-déposer le fichier ici.</p>
              </div>
            </template>
          </FileUpload>

          <div
            v-if="selectedFile"
            class="mt-2 flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded"
          >
            <font-awesome-icon :icon="['fas', 'check-circle']" class="text-green-500" />
            <span class="font-semibold">{{ selectedFile.name }}</span>
            <span>({{ formatFileSize(selectedFile.size) }})</span>
            <Button
              @click="clearFile"
              outlined
              rounded
              severity="danger"
              size="small"
              class="w-8 h-8"
            >
              <template #icon>
                <font-awesome-icon :icon="['fas', 'times']" />
              </template>
            </Button>
          </div>
          <small v-if="errors.file" class="text-red-500">{{ errors.file }}</small>
        </div>

        <!-- Version -->
        <div class="field">
          <label for="version" class="block text-sm font-medium mb-2 text-gray-700"
            >Numéro de version *</label
          >
          <InputText
            id="version"
            v-model="formData.version"
            placeholder="Ex: 1.1"
            class="w-full"
            :class="{ 'p-invalid': errors.version }"
          />
          <small v-if="errors.version" class="text-red-500">{{ errors.version }}</small>
        </div>

        <!-- Changelog -->
        <div class="field">
          <label for="changelog" class="block text-sm font-medium mb-2 text-gray-700"
            >Commentaire (Changelog)</label
          >
          <Textarea
            id="changelog"
            v-model="formData.changelog"
            placeholder="Décrivez les changements apportés dans cette version..."
            rows="4"
            class="w-full"
          />
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <Button label="Annuler" text severity="secondary" @click="$emit('update:visible', false)">
            <template #icon>
              <font-awesome-icon :icon="['fas', 'times']" />
            </template>
          </Button>
          <Button type="submit" label="Créer la version" :loading="loading">
            <template #icon>
              <font-awesome-icon :icon="['fas', 'save']" />
            </template>
          </Button>
        </div>
      </form>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import FileUpload from 'primevue/fileupload'

interface Props {
  visible: boolean
  currentVersion: string
  loading?: boolean
}

interface Emits {
  (e: 'update:visible', value: boolean): void
  (e: 'submit', data: { file: File; version: string; changelog: string }): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const selectedFile = ref<File | undefined>(undefined)
const formData = reactive({
  version: '',
  changelog: '',
})
const errors = reactive<Record<string, string>>({})

// Suggest next version
watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      // Reset form
      selectedFile.value = undefined
      formData.changelog = ''
      errors.file = ''
      errors.version = ''

      // Simple increment logic (e.g., 1.0 -> 1.1)
      const parts = props.currentVersion.split('.')
      if (parts.length > 0) {
        const lastPart = parts[parts.length - 1]
        if (lastPart !== undefined) {
          const parsedLastPart = parseInt(lastPart)
          if (!isNaN(parsedLastPart)) {
            parts[parts.length - 1] = (parsedLastPart + 1).toString()
            formData.version = parts.join('.')
          } else {
            formData.version = props.currentVersion
          }
        } else {
          formData.version = props.currentVersion
        }
      } else {
        formData.version = ''
      }
    }
  },
)

const onFileSelect = (event: { files: File[] | File }) => {
  const files = Array.isArray(event.files) ? event.files : [event.files]
  const file = files[0]
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
  const unit = sizes[i] || sizes[sizes.length - 1]
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + unit
}

const validate = () => {
  let isValid = true
  errors.file = ''
  errors.version = ''

  if (!selectedFile.value) {
    errors.file = 'Le fichier est requis'
    isValid = false
  }

  if (!formData.version) {
    errors.version = 'Le numéro de version est requis'
    isValid = false
  } else if (formData.version === props.currentVersion) {
    errors.version = 'La version doit être différente de la version actuelle'
    isValid = false
  }

  return isValid
}

const onSubmit = () => {
  if (validate() && selectedFile.value) {
    emit('submit', {
      file: selectedFile.value,
      version: formData.version,
      changelog: formData.changelog,
    })
  }
}
</script>
