<template>
  <div class="indicator-card card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <span :class="`icon is-large ${getTrendColorClass(indicator.trend_direction)}`">
            <font-awesome-icon :icon="getIconForIndicator(indicator)" size="2x" />
          </span>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ indicator.name }}</p>
          <p class="subtitle is-6">
            <span class="tag is-info">{{ indicator.code }}</span>
            •
            <span :class="getTrendColorClass(indicator.trend_direction)">
              {{ getTrendText(indicator.trend_direction) }}
            </span>
          </p>
        </div>
      </div>

      <div class="content">
        <p v-if="indicator.description">{{ indicator.description }}</p>

        <div class="columns is-mobile">
          <div class="column">
            <p><strong>Catégorie:</strong> {{ indicator.category || 'Non catégorisé' }}</p>
            <p><strong>Unité:</strong> {{ indicator.unit || 'N/A' }}</p>
            <p><strong>Fréquence:</strong> {{ getFrequencyText(indicator.frequency) }}</p>
          </div>

          <div class="column is-narrow">
            <div class="has-text-centered">
              <p><strong>Cible:</strong></p>
              <p class="is-size-5 has-text-weight-bold">
                {{ formatValue(indicator.target_value) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <nav class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <Button
              :icon="['fas', 'eye']"
              text="Voir"
              variant="info"
              @click="$emit('view', indicator.id)"
            />
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <Button
              :icon="['fas', 'edit']"
              text="Éditer"
              variant="warning"
              @click="$emit('edit', indicator.id)"
            />
          </div>
          <div class="level-item">
            <Button
              :icon="['fas', 'trash']"
              text="Supprimer"
              variant="danger"
              @click="$emit('delete', indicator.id)"
            />
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Indicator } from '../../stores/app'
import Button from '../ui/MyButton.vue'

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
      return 'has-text-success'
    case 'negative':
      return 'has-text-danger'
    case 'neutral':
      return 'has-text-info'
    default:
      return 'has-text-light'
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
