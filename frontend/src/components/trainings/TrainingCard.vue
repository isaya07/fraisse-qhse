<template>
  <div
    class="surface-card rounded-lg shadow-sm border border-surface-border hover:shadow-md transition-all duration-200 cursor-pointer h-full flex flex-col relative overflow-hidden group"
    @click="$emit('click')"
  >
    <!-- Left Border for Category Color -->
    <div
      class="absolute left-0 top-0 bottom-0 w-1.5"
      :style="{ backgroundColor: training.category?.color || '#cbd5e1' }"
    ></div>

    <div class="p-5 pl-7 flex-1 flex flex-col gap-4">
      <!-- Header: Category -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 text-sm text-color-secondary">
          <font-awesome-icon
            :icon="['fas', training.category?.icon || 'book']"
            :style="{ color: training.category?.color || 'var(--text-color-secondary)' }"
          />
          <span class="font-medium">{{ training.category?.name || 'Sans catégorie' }}</span>
        </div>
      </div>

      <!-- Title -->
      <h3 class="font-bold text-color text-lg leading-snug">
        {{ training.title }}
      </h3>

      <!-- Description -->
      <p class="text-sm text-color-secondary line-clamp-2" v-if="training.description">
        {{ training.description }}
      </p>

      <!-- Footer: Duration & Validity -->
      <div class="flex items-center justify-between pt-4 border-t border-surface-border mt-auto">
        <div class="flex items-center gap-2 text-sm text-color-secondary" v-if="training.duration_hours">
          <font-awesome-icon icon="clock" class="text-color-secondary" />
          <span>{{ training.duration_hours }}h</span>
        </div>

        <div class="flex items-center gap-2 text-sm text-color-secondary" v-if="training.validity_months">
          <font-awesome-icon icon="calendar-check" class="text-color-secondary" />
          <span>Validité: {{ formatValidity(training.validity_months) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Training } from '@/stores/training'

const props = defineProps<{
  training: Training
}>()

defineEmits(['click'])

const formatValidity = (months: number) => {
  if (months >= 12) {
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    return remainingMonths > 0 ? `${years} ans ${remainingMonths} mois` : `${years} ans`
  }
  return `${months} mois`
}
</script>
