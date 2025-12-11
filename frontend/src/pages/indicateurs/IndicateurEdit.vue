<template>
  <div class="p-4 p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h2>Modifier l'indicateur</h2>
      <Button label="Retour" @click="goBack" severity="secondary" variant="outlined">
        <template #icon>
          <font-awesome-icon icon="arrow-left" class="mr-2" />
        </template>
      </Button>
    </div>

    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-color-secondary" />
    </div>

    <div v-else-if="!currentIndicator && !error" class="flex justify-center items-center py-12">
      <p class="text-lg text-color-secondary">Indicateur non trouvé</p>
    </div>

    <div v-else-if="error" class="flex justify-center items-center py-12">
      <p class="text-lg text-red-600">{{ error }}</p>
    </div>

    <Card v-else>
      <template #content>
        <IndicatorForm
          :initialData="formData"
          :submitButtonText="'Enregistrer les modifications'"
          :loading="isSubmitting"
          @submit="submitIndicator"
          @cancel="cancel"
        />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useIndicatorStore } from '@/stores/indicators'
import IndicatorForm from '@/components/indicators/IndicatorForm.vue'
import { useToast } from 'primevue/usetoast'

// Définir le type pour les données de l'indicateur
interface IndicatorData {
  name: string
  description: string
  code: string

  indicator_category_id: number | null
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

const router = useRouter()
const route = useRoute()
const indicatorStore = useIndicatorStore()
const toast = useToast()

// États du formulaire
const formData = ref<IndicatorData>({
  name: '',
  description: '',
  code: '',

  indicator_category_id: null,
  unit: '',
  target_value: null,
  threshold_min: null,
  threshold_max: null,
  calculation_method: '',
  data_source: '',
  frequency: 'monthly',
  trend_direction: 'neutral',
  goal_type: 'maximize',
  is_active: true,
})

const isLoading = ref(false)
const isSubmitting = ref(false)
const error = ref('')

// Charger l'indicateur à modifier
const loadIndicator = async () => {
  const id = parseInt(route.params.id as string)
  if (isNaN(id)) {
    error.value = "ID d'indicateur invalide"
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    await indicatorStore.fetchIndicatorById(id)
    const indicator = indicatorStore.currentIndicator

    if (indicator) {
      // Remplir le formulaire avec les données de l'indicateur
      formData.value = {
        name: indicator.name,
        description: indicator.description || '',
        code: indicator.code,

        indicator_category_id: indicator.indicator_category_id || null,
        unit: indicator.unit || '',
        target_value: indicator.target_value || null,
        threshold_min: indicator.threshold_min || null,
        threshold_max: indicator.threshold_max || null,
        calculation_method: indicator.calculation_method || '',
        data_source: indicator.data_source || '',
        frequency: indicator.frequency,
        trend_direction: indicator.trend_direction,
        goal_type: indicator.goal_type || 'maximize',
        is_active: indicator.is_active,
      }
    } else {
      error.value = 'Indicateur non trouvé'
    }
  } catch (err) {
    console.error("Erreur lors du chargement de l'indicateur:", err)
    error.value = "Erreur lors du chargement de l'indicateur"
  } finally {
    isLoading.value = false
  }
}

// Fonction de soumission du formulaire
const submitIndicator = async (data: IndicatorData) => {
  const id = parseInt(route.params.id as string)
  if (isNaN(id)) {
    error.value = "ID d'indicateur invalide"
    return
  }

  isSubmitting.value = true
  error.value = ''

  try {
    // Mettre à jour l'indicateur
    await indicatorStore.updateIndicator(id, {
      ...data,
      target_value: data.target_value,
      threshold_min: data.threshold_min,
      threshold_max: data.threshold_max,
    })

    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Indicateur mis à jour avec succès',
      life: 3000,
    })
    // Rediriger vers la liste des indicateurs
    router.push('/indicators/config')
  } catch (err: unknown) {
    const errorMessage = (err as Error).message || "Erreur lors de la mise à jour de l'indicateur"
    toast.add({ severity: 'error', summary: 'Erreur', detail: errorMessage, life: 3000 })
    console.error(err)
  } finally {
    isSubmitting.value = false
  }
}

// Fonction d'annulation
const cancel = () => {
  router.push('/indicators/config')
}

const goBack = () => router.back()

// Charger l'indicateur au montage du composant
onMounted(() => {
  loadIndicator()
})

// Récupérer l'indicateur courant depuis le store
const currentIndicator = computed(() => indicatorStore.currentIndicator)
</script>
