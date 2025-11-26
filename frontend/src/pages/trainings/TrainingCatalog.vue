<template>
  <div class="p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Catalogue des formations</h1>
      <div class="flex gap-2">
        <Button
          label="Nouvelle catégorie"
          icon="pi pi-folder-plus"
          severity="secondary"
          outlined
          @click="openCategoryDialog"
        />
        <Button label="Nouvelle formation" icon="pi pi-plus" @click="openTrainingDialog" />
      </div>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-gray-500" />
    </div>

    <div v-else class="flex flex-col gap-8">
      <div v-for="category in categoriesWithTrainings" :key="category.id">
        <div class="flex items-center gap-3 mb-4 border-b border-gray-200 pb-2">
          <div
            class="w-8 h-8 rounded flex items-center justify-center text-white"
            :style="{ backgroundColor: category.color || '#64748B' }"
          >
            <font-awesome-icon :icon="category.icon || 'folder'" />
          </div>
          <h2 class="text-xl font-semibold text-gray-800">{{ category.name }}</h2>
          <Button
            icon="pi pi-pencil"
            text
            rounded
            size="small"
            severity="secondary"
            @click="editCategory(category)"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <TrainingCard
            v-for="training in getTrainingsByCategory(category.id)"
            :key="training.id"
            :training="training"
            @click="editTraining(training)"
          />
          <!-- Add Card -->
          <div
            class="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors min-h-[200px]"
            @click="openTrainingDialog(category.id)"
          >
            <font-awesome-icon icon="plus" class="text-gray-400 text-3xl mb-2" />
            <span class="text-gray-500 font-medium">Ajouter une formation</span>
          </div>
        </div>
      </div>

      <!-- Uncategorized -->
      <div v-if="uncategorizedTrainings.length > 0">
        <div class="flex items-center gap-3 mb-4 border-b border-gray-200 pb-2">
          <div class="w-8 h-8 rounded bg-gray-400 flex items-center justify-center text-white">
            <font-awesome-icon icon="question" />
          </div>
          <h2 class="text-xl font-semibold text-gray-800">Sans catégorie</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <TrainingCard
            v-for="training in uncategorizedTrainings"
            :key="training.id"
            :training="training"
            @click="editTraining(training)"
          />
        </div>
      </div>
    </div>

    <!-- Dialog Category -->
    <Dialog
      v-model:visible="categoryDialogVisible"
      :header="editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'"
      :modal="true"
      class="p-fluid w-full max-w-md"
    >
      <div class="field">
        <label for="catName">Nom</label>
        <InputText id="catName" v-model="categoryForm.name" required autofocus />
      </div>
      <div class="field mt-4">
        <label for="catColor">Couleur</label>
        <div class="flex gap-2">
          <ColorPicker v-model="categoryForm.color" />
          <InputText v-model="categoryForm.color" placeholder="#RRGGBB" />
        </div>
      </div>
      <div class="field mt-4">
        <label for="catIcon">Icône</label>
        <IconPicker v-model="categoryForm.icon" />
      </div>
      <template #footer>
        <Button label="Annuler" text severity="secondary" @click="closeCategoryDialog" />
        <Button label="Enregistrer" @click="saveCategory" />
      </template>
    </Dialog>

    <!-- Dialog Training -->
    <Dialog
      v-model:visible="trainingDialogVisible"
      :header="editingTraining ? 'Modifier la formation' : 'Nouvelle formation'"
      :modal="true"
      class="p-fluid w-full max-w-lg"
    >
      <div class="field">
        <label for="title">Titre</label>
        <InputText id="title" v-model="trainingForm.title" required autofocus />
      </div>
      <div class="field mt-4">
        <label for="category">Catégorie</label>
        <Dropdown
          id="category"
          v-model="trainingForm.training_category_id"
          :options="store.categories"
          optionLabel="name"
          optionValue="id"
          placeholder="Sélectionnez une catégorie"
        />
      </div>
      <div class="field mt-4">
        <label for="description">Description</label>
        <Textarea id="description" v-model="trainingForm.description" rows="3" />
      </div>
      <div class="grid grid-cols-2 gap-4 mt-4">
        <div class="field">
          <label for="duration">Durée (heures)</label>
          <InputNumber id="duration" v-model="trainingForm.duration_hours" :min="0" />
        </div>
        <div class="field">
          <label for="validity">Validité (mois)</label>
          <InputNumber id="validity" v-model="trainingForm.validity_months" :min="0" />
        </div>
      </div>
      <div class="field mt-4">
        <label for="frequency">Fréquence requise (mois)</label>
        <InputNumber id="frequency" v-model="trainingForm.required_frequency_months" :min="0" />
      </div>

      <template #footer>
        <Button label="Annuler" text severity="secondary" @click="closeTrainingDialog" />
        <Button label="Enregistrer" @click="saveTraining" />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTrainingStore, type TrainingCategory, type Training } from '@/stores/training'
import TrainingCard from '@/components/trainings/TrainingCard.vue'
import IconPicker from '@/components/common/IconPicker.vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import ColorPicker from 'primevue/colorpicker'
import { useToast } from 'primevue/usetoast'

const store = useTrainingStore()
const toast = useToast()

const loading = computed(() => store.loading)

const categoriesWithTrainings = computed(() => {
  return store.categories
})

const uncategorizedTrainings = computed(() => {
  // Assuming all trainings must have a category based on backend validation, but handling just in case
  return store.trainings.filter((t) => !t.training_category_id)
})

const getTrainingsByCategory = (categoryId: number) => {
  return store.trainings.filter((t) => t.training_category_id === categoryId)
}

// Category Dialog
const categoryDialogVisible = ref(false)
const editingCategory = ref<TrainingCategory | null>(null)
const categoryForm = ref({
  name: '',
  color: '#64748B',
  icon: 'folder',
})

const openCategoryDialog = () => {
  editingCategory.value = null
  categoryForm.value = { name: '', color: '#64748B', icon: 'folder' }
  categoryDialogVisible.value = true
}

const editCategory = (category: TrainingCategory) => {
  editingCategory.value = category
  categoryForm.value = {
    name: category.name,
    color: category.color || '#64748B',
    icon: category.icon || 'folder',
  }
  categoryDialogVisible.value = true
}

const closeCategoryDialog = () => {
  categoryDialogVisible.value = false
  editingCategory.value = null
}

const saveCategory = async () => {
  try {
    if (editingCategory.value) {
      await store.updateCategory(editingCategory.value.id, categoryForm.value)
      toast.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Catégorie mise à jour',
        life: 3000,
      })
    } else {
      await store.createCategory(categoryForm.value)
      toast.add({ severity: 'success', summary: 'Succès', detail: 'Catégorie créée', life: 3000 })
    }
    closeCategoryDialog()
  } catch (e) {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Une erreur est survenue',
      life: 3000,
    })
  }
}

// Training Dialog
const trainingDialogVisible = ref(false)
const editingTraining = ref<Training | null>(null)
const trainingForm = ref({
  training_category_id: null as number | null,
  title: '',
  description: '',
  duration_hours: null as number | null,
  validity_months: null as number | null,
  required_frequency_months: null as number | null,
})

const openTrainingDialog = (categoryId?: number | Event) => {
  editingTraining.value = null
  trainingForm.value = {
    training_category_id: typeof categoryId === 'number' ? categoryId : null,
    title: '',
    description: '',
    duration_hours: null,
    validity_months: null,
    required_frequency_months: null,
  }
  trainingDialogVisible.value = true
}

const editTraining = (training: Training) => {
  editingTraining.value = training
  trainingForm.value = {
    training_category_id: training.training_category_id,
    title: training.title,
    description: training.description || '',
    duration_hours: training.duration_hours,
    validity_months: training.validity_months,
    required_frequency_months: training.required_frequency_months,
  }
  trainingDialogVisible.value = true
}

const closeTrainingDialog = () => {
  trainingDialogVisible.value = false
  editingTraining.value = null
}

const saveTraining = async () => {
  if (!trainingForm.value.title || !trainingForm.value.training_category_id) {
    toast.add({
      severity: 'warn',
      summary: 'Attention',
      detail: 'Veuillez remplir les champs obligatoires',
      life: 3000,
    })
    return
  }

  try {
    if (editingTraining.value) {
      await store.updateTraining(editingTraining.value.id, {
        ...trainingForm.value,
        training_category_id: trainingForm.value.training_category_id as number,
      })
      toast.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Formation mise à jour',
        life: 3000,
      })
    } else {
      await store.createTraining({
        ...trainingForm.value,
        training_category_id: trainingForm.value.training_category_id as number,
      })
      toast.add({ severity: 'success', summary: 'Succès', detail: 'Formation créée', life: 3000 })
    }
    closeTrainingDialog()
  } catch (e) {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Une erreur est survenue',
      life: 3000,
    })
  }
}

onMounted(async () => {
  await Promise.all([store.fetchCategories(), store.fetchTrainings()])
})
</script>
