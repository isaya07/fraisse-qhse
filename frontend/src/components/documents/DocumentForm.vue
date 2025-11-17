<template>
  <form @submit.prevent="submitForm">
    <InputField v-model="formData.title" label="Titre *" placeholder="Titre du document" required />
    <TextAreaField
      v-model="formData.description"
      label="Description"
      placeholder="Description du document"
      :rows="4"
    />
    <SelectField
      v-model="formData.category"
      label="Catégorie"
      :options="categoryOptions"
      :has-default-option="true"
      default-option-text="Sélectionnez une catégorie"
    />
    <InputField v-model="formData.version" label="Version" placeholder="Version du document" />
    <SelectField v-model="formData.status" label="Statut" :options="statusOptions" />

    <div class="field">
      <label class="label">Fichier</label>
      <div class="control">
        <div class="file">
          <label class="file-label">
            <input class="file-input" type="file" @change="handleFileUpload" />
            <span class="file-cta">
              <span class="file-icon">
                <font-awesome-icon :icon="['fas', 'upload']" />
              </span>
              <span class="file-label"> Choisissez un fichier… </span>
            </span>
          </label>
        </div>
        <p v-if="selectedFile" class="help">
          Fichier sélectionné: {{ selectedFile.name }} ({{ formatFileSize(selectedFile.size) }})
        </p>
      </div>
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
import { ref, reactive } from 'vue'
import InputField from '@/components/form/InputField.vue'
import SelectField from '@/components/form/SelectField.vue'
import TextAreaField from '@/components/form/TextAreaField.vue'
import MyButton from '@/components/ui/MyButton.vue'

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
const selectedFile = ref<File | null>(null)

// États
const state = reactive({
  loading: false,
  error: '',
})

// Options pour les sélections
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

// Fonction de gestion du téléchargement de fichier
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0]
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
