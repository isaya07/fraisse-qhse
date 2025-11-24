<template>
  <div class="p-4 p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h2>Créer un nouvel indicateur</h2>
      <Button label="Retour" @click="goBack" severity="secondary" variant="outlined">
        <template #icon>
          <font-awesome-icon icon="arrow-left" class="mr-2" />
        </template>
      </Button>
    </div>

    <Card>
      <template #content>
        <IndicatorForm
          :submitButtonText="'Créer l\'indicateur'"
          :loading="loading"
          @submit="submitIndicator"
          @cancel="cancel"
        />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
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
  is_active: boolean
}

const router = useRouter()
const indicatorStore = useIndicatorStore()
const toast = useToast()
const loading = ref(false)

// Fonction de soumission du formulaire
const submitIndicator = async (data: IndicatorData) => {
  loading.value = true
  try {
    // Créer l'indicateur
    await indicatorStore.createIndicator({
      ...data,
      target_value: data.target_value || undefined,
      threshold_min: data.threshold_min || undefined,
      threshold_max: data.threshold_max || undefined,
    })

    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Indicateur créé avec succès',
      life: 3000,
    })
    // Rediriger vers la liste des indicateurs
    router.push('/indicators/config')
  } catch (err) {
    console.error("Erreur lors de la création de l'indicateur:", err)
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: "Erreur lors de la création de l'indicateur",
      life: 3000,
    })
  } finally {
    loading.value = false
  }
}

// Fonction d'annulation
const cancel = () => {
  router.push('/indicators/config')
}

const goBack = () => router.back()
</script>
