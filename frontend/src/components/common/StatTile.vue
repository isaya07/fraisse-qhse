<template>
  <Card class="transition-all hover:shadow-md">
    <template #content>
      <div class="flex justify-between items-center">
        <div>
          <span class="block text-color-secondary text-sm font-medium mb-1">{{ title }}</span>
          <ProgressSpinner v-if="loading" style="width: 16px; height: 16px" fill="transparent" />
          <span v-else class="text-2xl font-bold text-color">{{ value }}</span>
        </div>
        <div
          class="w-12 h-12 rounded-full flex items-center justify-center"
          :class="`bg-${color}-100 text-${color}-600 dark:bg-${color}-900/30 dark:text-${color}-400`"
        >
          <font-awesome-icon :icon="icon" size="lg" />
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner'
defineProps<{
  title: string
  value: string | number
  icon: string
  color: string // e.g. 'blue', 'green', 'orange', 'red'
  loading?: boolean
}>()
</script>
