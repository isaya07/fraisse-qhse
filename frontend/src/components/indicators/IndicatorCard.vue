<template>
  <Card
    class="h-full shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    @click="$emit('view', indicator.id)"
  >
    <template #title>
      <div class="flex justify-between items-start">
        <span class="text-lg font-semibold truncate" :title="indicator.name">{{
          indicator.name
        }}</span>
      </div>
    </template>
    <template #subtitle>
      <div class="flex items-center gap-2 mb-2">
        <div
          v-if="indicator.indicator_category"
          class="flex items-center gap-2 px-2 py-1 rounded text-xs font-medium text-white"
          :style="{ backgroundColor: indicator.indicator_category.color || '#64748B' }"
        >
          <font-awesome-icon :icon="indicator.indicator_category.icon || 'folder'" />
          {{ indicator.indicator_category.name }}
        </div>
      </div>
    </template>
    <template #content>
      <div class="flex flex-col gap-4">
        <div class="flex justify-between items-end">
          <div class="flex flex-col">
            <span class="text-sm text-gray-500">Cible</span>
            <span class="text-xl font-bold"
              >{{ indicator.target_value }}
              <span class="text-sm font-normal">{{ indicator.unit }}</span></span
            >
          </div>
          <Tag
            :severity="getTrendSeverity(indicator.trend_direction)"
            :value="getTrendLabel(indicator.trend_direction)"
          />
        </div>

        <!-- Chart -->
        <div class="h-32 w-full">
          <Chart
            v-if="mounted"
            type="line"
            :data="chartData"
            :options="chartOptions"
            class="h-full"
          />
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted, computed } from 'vue'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Chart from 'primevue/chart'
import type { Indicator } from '@/stores/app'

const props = defineProps<{
  indicator: Indicator
}>()

defineEmits<{
  (e: 'view', id: number): void
  (e: 'edit', id: number): void
}>()

const mounted = ref(false)

onMounted(() => {
  // Small delay to ensure DOM is ready for Chart.js
  setTimeout(() => {
    mounted.value = true
  }, 100)
})

const getTrendLabel = (value: string) => {
  const map: Record<string, string> = {
    positive: 'Positive',
    negative: 'Négative',
    neutral: 'Neutre',
  }
  return map[value] || value
}

const getTrendSeverity = (value: string): string => {
  const map: Record<string, string> = {
    positive: 'success',
    negative: 'danger',
    neutral: 'info',
  }
  return map[value] || 'info'
}

// Chart Data Generator
const chartData = computed(() => {
  const indicator = props.indicator
  if (!indicator.values || indicator.values.length === 0) {
    // Return empty or placeholder if no data
    return {
      labels: [],
      datasets: [],
    }
  }

  // Sort values by date ascending
  const sortedValues = [...indicator.values].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  )

  // Take last 6 values for mini chart
  const recentValues = sortedValues.slice(-6)

  const labels = recentValues.map((v) =>
    new Date(v.date).toLocaleDateString(undefined, { month: 'short' }),
  )
  const data = recentValues.map((v) => v.value)
  const target = indicator.target_value

  const datasets = [
    {
      label: 'Valeur',
      data: data,
      fill: true,
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      pointRadius: 2,
    },
  ]

  if (target !== undefined && target !== null) {
    datasets.push({
      label: 'Cible',
      data: Array(labels.length).fill(target),
      fill: false,
      borderColor: '#10B981', // Green for target
      borderDash: [5, 5],
      tension: 0,
      pointRadius: 0,
      borderWidth: 1,
    } as any)
  }

  return {
    labels,
    datasets,
  }
})

const chartOptions = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    x: {
      display: false, // Hide x axis labels for cleaner mini-chart
      grid: {
        display: false,
      },
    },
    y: {
      display: true,
      ticks: {
        count: 3, // Limit ticks
        font: {
          size: 10,
        },
      },
      grid: {
        color: '#f3f4f6',
      },
    },
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false,
  },
}
</script>
