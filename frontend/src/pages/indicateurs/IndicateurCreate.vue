<template>
  <div class="indicator-create-page p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Créer un nouvel indicateur</h1>
      <router-link
        to="/indicators"
        class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-2" />
        Retour à la liste
      </router-link>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md">
      <IndicatorForm
        :submitButtonText="'Créer l\'indicateur'"
        @submit="submitIndicator"
        @cancel="cancel"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useIndicatorStore } from '@/stores/indicators'
import IndicatorForm from '@/components/indicators/IndicatorForm.vue'
import type { Indicator } from '@/stores/app'

const router = useRouter()
const indicatorStore = useIndicatorStore()

// Fonction de soumission du formulaire
const submitIndicator = async (data: Partial<Indicator>) => {
  try {
    // Créer l'indicateur
    await indicatorStore.createIndicator(data)

    // Rediriger vers la liste des indicateurs
    router.push('/indicators')
  } catch (err) {
    console.error("Erreur lors de la création de l'indicateur:", err)
    // Gestion de l'erreur est faite dans le composant IndicatorForm
  }
}

// Fonction d'annulation
const cancel = () => {
  router.push('/indicators')
}
</script>

<style scoped>
.indicator-create-page {
  @apply p-4;
}
</style>
