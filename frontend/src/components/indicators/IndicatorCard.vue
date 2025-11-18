<template>
  <div class="indicator-card bg-white rounded-lg shadow-md overflow-hidden mb-4">
    <div class="p-6">
      <div class="flex items-start">
        <div class="mr-4">
          <span :class="`text-3xl ${getTrendColorClass(indicator.trend_direction)}`">
            <font-awesome-icon :icon="getIconForIndicator(indicator)" size="2x" />
          </span>
        </div>
        <div class="flex-1">
          <h3 class="text-xl font-bold text-gray-800 mb-1">{{ indicator.name }}</h3>
          <p class="text-sm text-gray-600 mb-3">
            <span
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mr-2"
            >
              {{ indicator.code }}
            </span>
            •
            <span :class="getTrendColorClass(indicator.trend_direction)">
              {{ getTrendText(indicator.trend_direction) }}
            </span>
          </p>
        </div>
      </div>

      <div class="mb-4">
        <p v-if="indicator.description" class="text-gray-700 mb-4">{{ indicator.description }}</p>

        <div class="flex flex-col sm:flex-row">
          <div class="w-full sm:w-2/3">
            <p>
              <span class="font-semibold">Catégorie:</span>
              {{ indicator.category || 'Non catégorisé' }}
            </p>
            <p><span class="font-semibold">Unité:</span> {{ indicator.unit || 'N/A' }}</p>
            <p>
              <span class="font-semibold">Fréquence:</span>
              {{ getFrequencyText(indicator.frequency) }}
            </p>
          </div>

          <div class="w-full sm:w-1/3 mt-4 sm:mt-0 sm:ml-auto">
            <div class="text-center">
              <p class="font-semibold">Cible:</p>
              <p class="text-lg font-bold">
                {{ formatValue(indicator.target_value) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row justify-between items-center">
        <div class="mb-4 sm:mb-0">
          <p-button
            :icon="['fas', 'eye']"
            label="Voir"
            severity="info"
            size="small"
            @click="$emit('view', indicator.id)"
          />
        </div>
        <div class="flex space-x-2">
          <p-button
            :icon="['fas', 'edit']"
            label="Éditer"
            severity="warning"
            size="small"
            @click="$emit('edit', indicator.id)"
          />
          <p-button
            :icon="['fas', 'trash']"
            label="Supprimer"
            severity="danger"
            size="small"
            @click="$emit('delete', indicator.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Indicator } from '../../stores/app'
import PButton from 'primevue/button'

defineProps({
  indicator: {
    type: Object as PropType<Indicator>,
    required: true,
  },
})

defineEmits(['view', 'edit', 'delete'])

const getIconForIndicator = (indicator: Indicator) => {
  if (!indicator.is_active) return ['fas', 'chart-line']

  switch (indicator.trend_direction) {
    case 'positive':
      return ['fas', 'arrow-trend-up']
    case 'negative':
      return ['fas', 'arrow-trend-down']
    case 'neutral':
      return ['fas', 'chart-line']
    default:
      return ['fas', 'chart-bar']
  }
}

const getTrendColorClass = (trendDirection: string) => {
  switch (trendDirection) {
    case 'positive':
      return 'text-green-500'
    case 'negative':
      return 'text-red-500'
    case 'neutral':
      return 'text-blue-500'
    default:
      return 'text-gray-500'
  }
}

const getTrendText = (trendDirection: string) => {
  switch (trendDirection) {
    case 'positive':
      return 'Tendance positive'
    case 'negative':
      return 'Tendance négative'
    case 'neutral':
      return 'Tendance neutre'
    default:
      return trendDirection
  }
}

const getFrequencyText = (frequency: string) => {
  switch (frequency) {
    case 'daily':
      return 'Quotidien'
    case 'weekly':
      return 'Hebdomadaire'
    case 'monthly':
      return 'Mensuel'
    case 'quarterly':
      return 'Trimestriel'
    case 'yearly':
      return 'Annuel'
    default:
      return frequency
  }
}

const formatValue = (value: number | undefined) => {
  return value !== undefined ? value.toFixed(2) : 'N/A'
}
</script>

<style scoped>
.indicator-card {
  margin-bottom: 1rem;
}
</style>
