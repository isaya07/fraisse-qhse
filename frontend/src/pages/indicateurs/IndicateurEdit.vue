<template>
  <div class="indicator-edit-page p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Modifier l'indicateur</h1>
      <router-link
        to="/indicators"
        class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-2" />
        Retour à la liste
      </router-link>
    </div>

    <div v-if="state.loading" class="flex justify-center items-center py-12">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-gray-500" />
    </div>

    <div v-else-if="!indicator" class="flex justify-center items-center py-12">
      <p class="text-lg text-gray-600">Indicateur non trouvé</p>
    </div>

    <div v-else class="bg-white p-6 rounded-lg shadow-md">
      <IndicatorForm
        :initialData="form"
        :submitButtonText="'Enregistrer les modifications'"
        @submit="submitIndicator"
        @cancel="cancel"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useIndicatorStore } from '@/stores/indicators'
import IndicatorForm from '@/components/indicators/IndicatorForm.vue'
import type { Indicator } from '@/stores/app'

// Définir le type pour les données de l'indicateur
interface IndicatorData {
  name: string
  description: string
  code: string
  category: string
  unit: string
  target_value: number | undefined
  threshold_min: number | undefined
  threshold_max: number | undefined
  calculation_method: string
  data_source: string
  frequency: string
  trend_direction: string
  is_active: boolean
}

const router = useRouter()
const route = useRoute()
const indicatorStore = useIndicatorStore()

// États du formulaire
const form = ref<IndicatorData>({
  name: '',
  description: '',
  code: '',
  category: '',
  unit: '',
  target_value: undefined,
  threshold_min: undefined,
  threshold_max: undefined,
  calculation_method: '',
  data_source: '',
  frequency: 'monthly',
  trend_direction: 'positive',
  is_active: true,
})

const state = ref({
  loading: false,
  error: '',
})

const indicator = ref<Indicator | null>(null)

// Charger l'indicateur à modifier
const loadIndicator = async () => {
  const id = parseInt(route.params.id as string)
  if (isNaN(id)) {
    state.value.error = "ID d'indicateur invalide"
    return
  }

  state.value.loading = true
  try {
    await indicatorStore.fetchIndicatorById(id)

    if (indicatorStore.currentIndicator) {
      // Remplir le formulaire avec les données de l'indicateur
      const indicatorData = indicatorStore.currentIndicator
      indicator.value = indicatorData
      form.value = {
        name: indicatorData.name,
        description: indicatorData.description || '',
        code: indicatorData.code,
        category: indicatorData.category || '',
        unit: indicatorData.unit || '',
        target_value: indicatorData.target_value || undefined,
        threshold_min: indicatorData.threshold_min || undefined,
        threshold_max: indicatorData.threshold_max || undefined,
        calculation_method: indicatorData.calculation_method || '',
        data_source: indicatorData.data_source || '',
        frequency: indicatorData.frequency,
        trend_direction: indicatorData.trend_direction,
        is_active: indicatorData.is_active,
      }
    } else {
      state.value.error = 'Indicateur non trouvé'
    }
  } catch (err) {
    console.error("Erreur lors du chargement de l'indicateur:", err)
    state.value.error = "Erreur lors du chargement de l'indicateur"
  } finally {
    state.value.loading = false
  }
}

// Fonction de soumission du formulaire
const submitIndicator = async (data: IndicatorData) => {
  const id = parseInt(route.params.id as string)
  if (isNaN(id)) {
    state.value.error = "ID d'indicateur invalide"
    return
  }

  state.value.loading = true
  state.value.error = ''

  try {
    // Mettre à jour l'indicateur
    await indicatorStore.updateIndicator(id, data)

    // Rediriger vers la liste des indicateurs
    router.push('/indicators')
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'indicateur:", err)
    // Gestion de l'erreur est faite dans le composant IndicatorForm
  } finally {
    state.value.loading = false
  }
}

// Fonction d'annulation
const cancel = () => {
  router.push('/indicators')
}

// Charger l'indicateur au montage du composant
onMounted(() => {
  loadIndicator()
})
</script>

<style scoped>
.indicator-edit-page {
  @apply p-4;
}
</style>
