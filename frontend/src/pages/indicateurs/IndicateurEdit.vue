<template>
  <div class="indicator-edit-page">
    <div class="level">
      <div class="level-left">
        <h1 class="title">Modifier l'indicateur</h1>
      </div>
      <div class="level-right">
        <router-link to="/indicators" class="button is-light">
          <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-2" />
          Retour à la liste
        </router-link>
      </div>
    </div>

    <div v-if="state.loading" class="has-text-centered py-6">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" />
    </div>

    <div v-else-if="!indicator" class="has-text-centered py-6">
      <p class="is-size-5">Indicateur non trouvé</p>
    </div>

    <div v-else class="box">
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
  target_value: number | null
  threshold_min: number | null
  threshold_max: number | null
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
  target_value: null,
  threshold_min: null,
  threshold_max: null,
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
        target_value: indicatorData.target_value || null,
        threshold_min: indicatorData.threshold_min || null,
        threshold_max: indicatorData.threshold_max || null,
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
  padding: 1rem;
}

.py-6 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.mt-5 {
  margin-top: 1.5rem;
}

.mt-3 {
  margin-top: 0.75rem;
}
</style>
