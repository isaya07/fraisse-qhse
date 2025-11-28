<template>
  <div class="p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div class="flex items-center gap-4">
        <Button text rounded severity="secondary" @click="goBack">
          <template #icon>
            <font-awesome-icon icon="arrow-left" />
          </template>
        </Button>
        <div>
          <div class="flex items-center gap-3">
            <h2>{{ indicator?.name }}</h2>
            <div
              v-if="indicator?.indicator_category"
              class="flex items-center gap-2 px-2 py-0.5 rounded text-xs font-medium text-white"
              :style="{ backgroundColor: indicator.indicator_category.color || '#64748B' }"
            >
              <font-awesome-icon :icon="indicator.indicator_category.icon || 'folder'" />
              {{ indicator.indicator_category.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-2">
        <Button label="Modifier" severity="secondary" outlined @click="editIndicator">
          <template #icon>
            <font-awesome-icon icon="pencil" class="mr-2" />
          </template>
        </Button>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-gray-500" />
    </div>

    <div v-else-if="indicator" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Chart Section -->
      <div class="lg:col-span-2 flex flex-col gap-6">
        <Card>
          <template #title>Évolution</template>
          <template #content>
            <div class="h-[400px] w-full">
              <Chart type="line" :data="chartData" :options="chartOptions" class="h-full" />
            </div>
          </template>
        </Card>

        <Card>
          <template #title>Historique des valeurs</template>
          <template #content>
            <DataTable :value="indicator.values" paginator :rows="5" size="small" stripedRows>
              <Column field="date" header="Date">
                <template #body="slotProps">
                  {{ formatDate(slotProps.data.date) }}
                </template>
              </Column>
              <Column field="value" header="Valeur">
                <template #body="slotProps">
                  <span class="font-bold">{{ slotProps.data.value }} {{ indicator.unit }}</span>
                </template>
              </Column>
              <Column field="comment" header="Commentaire"></Column>
              <Column field="creator.username" header="Saisi par"></Column>
            </DataTable>
          </template>
        </Card>
      </div>

      <!-- Sidebar / Input Section -->
      <div class="flex flex-col gap-6">
        <!-- Current Status Card -->
        <Card class="bg-blue-50 dark:bg-gray-800 border-l-4 border-blue-500">
          <template #content>
            <div class="flex flex-col gap-2">
              <span class="text-sm text-gray-600 dark:text-gray-400">Dernière valeur</span>
              <div class="flex items-end gap-2">
                <span class="text-4xl font-bold text-gray-900 dark:text-gray-100">
                  {{ lastValue?.value ?? '-' }}
                </span>
                <span class="text-lg text-gray-600 dark:text-gray-400 mb-1">{{
                  indicator.unit
                }}</span>
              </div>
              <div class="flex items-center gap-2 mt-2">
                <Tag
                  :severity="getTrendSeverity(indicator.trend_direction)"
                  :value="getTrendLabel(indicator.trend_direction)"
                />
                <span class="text-sm text-gray-500 dark:text-gray-400"
                  >Cible: {{ indicator.target_value }} {{ indicator.unit }}</span
                >
              </div>
            </div>
          </template>
        </Card>

        <!-- Add Value Form -->
        <Card>
          <template #title>Ajouter une valeur</template>
          <template #content>
            <form @submit.prevent="submitValue" class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <label for="date" class="text-sm font-medium text-gray-700">Date</label>
                <DatePicker
                  v-model="newValue.date"
                  dateFormat="dd/mm/yy"
                  showIcon
                  fluid
                  inputId="date"
                />
              </div>

              <div class="flex flex-col gap-2">
                <label for="value" class="text-sm font-medium text-gray-700"
                  >Valeur ({{ indicator.unit }})</label
                >
                <InputNumber
                  v-model="newValue.value"
                  :minFractionDigits="0"
                  :maxFractionDigits="2"
                  inputId="value"
                  fluid
                />
              </div>

              <div class="flex flex-col gap-2">
                <label for="comment" class="text-sm font-medium text-gray-700">Commentaire</label>
                <Textarea v-model="newValue.comment" rows="3" autoResize />
              </div>

              <Button type="submit" label="Ajouter" :loading="submitting">
                <template #icon>
                  <font-awesome-icon icon="plus" class="mr-2" />
                </template>
              </Button>
            </form>
          </template>
        </Card>

        <!-- Details Card -->
        <Card>
          <template #title>Détails</template>
          <template #content>
            <div class="flex flex-col gap-3 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">Fréquence</span>
                <span class="font-medium">{{ getFrequencyLabel(indicator.frequency) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Source</span>
                <span class="font-medium">{{ indicator.data_source || '-' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Méthode de calcul</span>
                <span class="font-medium text-right max-w-[60%]">{{
                  indicator.calculation_method || '-'
                }}</span>
              </div>
              <div v-if="indicator.description" class="mt-2 pt-2 border-t border-gray-100">
                <span class="text-gray-500 block mb-1">Description</span>
                <p class="text-gray-700">{{ indicator.description }}</p>
              </div>
              <div v-if="indicator.manager" class="mt-2 pt-2 border-t border-gray-100">
                <span class="text-gray-500 block mb-1">Responsable</span>
                <div class="flex items-center gap-2">
                  <div
                    class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold"
                  >
                    {{ indicator.manager.first_name[0] }}{{ indicator.manager.last_name[0] }}
                  </div>
                  <span class="font-medium"
                    >{{ indicator.manager.first_name }} {{ indicator.manager.last_name }}</span
                  >
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useIndicatorStore } from '@/stores/indicators'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Chart from 'primevue/chart'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import DatePicker from 'primevue/datepicker'

// Define types for Chart.js datasets
interface ChartDataset {
  label: string;
  data: number[];
  fill: boolean;
  borderColor: string;
  backgroundColor?: string;
  tension: number;
  borderDash?: number[];
  pointRadius?: number;
  borderWidth?: number;
}

const route = useRoute()
const router = useRouter()
const store = useIndicatorStore()
const toast = useToast()

const submitting = ref(false)
const newValue = ref({
  date: new Date(),
  value: null as number | null,
  comment: '',
})

const indicator = computed(() => store.currentIndicator)
const loading = computed(() => store.loading)

const lastValue = computed(() => {
  if (indicator.value?.values && indicator.value.values.length > 0) {
    return indicator.value.values[0] // Assuming ordered by date desc
  }
  return null
})

const chartData = computed(() => {
  if (!indicator.value || !indicator.value.values) return { labels: [], datasets: [] }

  // Sort values by date ascending for chart
  const sortedValues = [...indicator.value.values].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  )

  const labels = sortedValues.map((v) => (v.date ? new Date(v.date).toLocaleDateString() : '-'))
  const data = sortedValues.map((v) => v.value)
  const target = indicator.value.target_value

  const datasets: ChartDataset[] = [
    {
      label: 'Valeur',
      data: data,
      fill: true,
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      borderWidth: 1,
    },
  ]

  if (target !== undefined && target !== null) {
    datasets.push({
      label: 'Cible',
      data: Array(labels.length).fill(target),
      fill: false,
      borderColor: '#10B981', // Green
      borderDash: [5, 5],
      tension: 0,
      pointRadius: 0,
      borderWidth: 2,
    })
  }

  const thresholdMin = indicator.value.threshold_min
  if (thresholdMin !== undefined && thresholdMin !== null) {
    datasets.push({
      label: 'Seuil Min',
      data: Array(labels.length).fill(thresholdMin),
      fill: false,
      borderColor: '#F97316', // Orange
      borderDash: [2, 2],
      tension: 0,
      pointRadius: 0,
      borderWidth: 1,
    })
  }

  const thresholdMax = indicator.value.threshold_max
  if (thresholdMax !== undefined && thresholdMax !== null) {
    datasets.push({
      label: 'Seuil Max',
      data: Array(labels.length).fill(thresholdMax),
      fill: false,
      borderColor: '#EF4444', // Red
      borderDash: [2, 2],
      tension: 0,
      pointRadius: 0,
      borderWidth: 1,
    })
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
      position: 'bottom',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}

const loadData = async () => {
  const paramId = route.params.id
  const idString = Array.isArray(paramId) ? paramId[0] : paramId
  if (idString) {
    const id = parseInt(idString as string)
    if (!isNaN(id)) {
      await store.fetchIndicatorById(id)
    }
  }
}

const submitValue = async () => {
  if (!newValue.value.value || !newValue.value.date) {
    toast.add({
      severity: 'warn',
      summary: 'Attention',
      detail: 'Veuillez remplir la date et la valeur',
      life: 3000,
      icon: 'exclamation-triangle',
    })
    return
  }

  submitting.value = true
  try {
    const paramId = route.params.id
    const idString = Array.isArray(paramId) ? paramId[0] : paramId
    if (!idString) {
      throw new Error("ID de l'indicateur manquant")
    }
    const id = parseInt(idString as string)
    if (isNaN(id)) {
      throw new Error("ID de l'indicateur invalide")
    }
    
    // Format date as YYYY-MM-DD for backend
    const dateStr = newValue.value.date.toISOString().split('T')[0] as string

    await store.addIndicatorValue(id, {
      value: newValue.value.value,
      date: dateStr,
      comment: newValue.value.comment,
    })

    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Valeur ajoutée',
      life: 3000,
      icon: 'check',
    })

    // Reset form
    newValue.value = {
      date: new Date(),
      value: null,
      comment: '',
    }
  } catch (e) {
    console.log(e)
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: "Erreur lors de l'ajout",
      life: 3000,
      icon: 'times',
    })
  } finally {
    submitting.value = false
  }
}

const goBack = () => router.back()
const editIndicator = () => router.push(`/indicators/${route.params.id}/edit`)

const formatDate = (dateStr: string | undefined) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString()
}

const getFrequencyLabel = (value: string | undefined) => {
  if (!value) return '-'
  const map: Record<string, string> = {
    daily: 'Quotidienne',
    weekly: 'Hebdomadaire',
    monthly: 'Mensuelle',
    quarterly: 'Trimestrielle',
    yearly: 'Annuelle',
  }
  return map[value] || value
}

const getTrendLabel = (value: string | undefined | null) => {
  if (!value) return 'Stable'
  const num = parseFloat(value)
  if (isNaN(num)) return 'Stable'
  if (num > 0) return 'Hausse'
  if (num < 0) return 'Baisse'
  return 'Stable'
}

const getTrendSeverity = (value: string | undefined | null) => {
  if (!value) return 'info'
  const num = parseFloat(value)
  if (isNaN(num)) return 'info'
  if (num > 0) return 'success'
  if (num < 0) return 'danger'
  return 'info'
}

onMounted(() => {
  loadData()
})
</script>
