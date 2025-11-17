<template>
  <div class="indicator-create-page">
    <div class="level">
      <div class="level-left">
        <h1 class="title">Créer un nouvel indicateur</h1>
      </div>
      <div class="level-right">
        <router-link to="/indicators" class="button is-light">
          <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-2" />
          Retour à la liste
        </router-link>
      </div>
    </div>

    <div class="box">
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
  padding: 1rem;
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
