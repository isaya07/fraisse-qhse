<template>
  <div
    class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer h-full flex flex-col relative overflow-hidden group"
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
        <div class="flex items-center gap-2 text-sm text-gray-600">
          <font-awesome-icon
            :icon="['fas', training.category?.icon || 'book']"
            :style="{ color: training.category?.color || '#64748b' }"
          />
          <span class="font-medium">{{ training.category?.name || 'Sans catégorie' }}</span>
        </div>
      </div>

      <!-- Title -->
      <h3 class="font-bold text-gray-900 text-lg leading-snug">
        {{ training.title }}
      </h3>

      <!-- Description -->
      <p class="text-sm text-gray-500 line-clamp-2" v-if="training.description">
        {{ training.description }}
      </p>

      <!-- Footer: Duration & Validity -->
      <div class="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
        <div class="flex items-center gap-2 text-sm text-gray-600" v-if="training.duration_hours">
          <font-awesome-icon icon="clock" class="text-gray-400" />
          <span>{{ training.duration_hours }}h</span>
        </div>

        <div class="flex items-center gap-2 text-sm text-gray-600" v-if="training.validity_months">
          <font-awesome-icon icon="calendar-check" class="text-gray-400" />
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
