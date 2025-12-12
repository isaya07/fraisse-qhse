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
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-color-secondary" />
    </div>

    <div v-else-if="indicator" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Chart Section -->
      <div class="lg:col-span-2 flex flex-col gap-6">
        <Card>
          <template #title>Évolution</template>
          <template #content>
            <div class="h-[400px] w-full">
              <Chart
                type="line"
                :data="chartData"
                :options="chartOptions"
                class="h-full"
                :key="indicator.id"
              />
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
              <Column header="Actions" style="width: 100px" v-if="appStore.userRole === 'admin'">
                <template #body="slotProps">
                  <div class="flex gap-2">
                    <Button
                      icon="pi pi-pencil"
                      text
                      rounded
                      severity="secondary"
                      size="small"
                      @click="editValue(slotProps.data)"
                    >
                      <template #icon>
                        <font-awesome-icon icon="pencil" />
                      </template>
                    </Button>
                    <Button
                      icon="pi pi-trash"
                      text
                      rounded
                      severity="danger"
                      size="small"
                      @click="confirmDeleteValue(slotProps.data)"
                    >
                      <template #icon>
                        <font-awesome-icon icon="trash" />
                      </template>
                    </Button>
                  </div>
                </template>
              </Column>
            </DataTable>
          </template>
        </Card>
      </div>

      <!-- Sidebar / Input Section -->
      <div class="flex flex-col gap-6">
        <!-- Current Status Card -->
        <Card>
          <template #content>
            <div class="flex flex-col gap-2">
              <span class="text-sm text-color-secondary">Dernière valeur</span>
              <div class="flex items-end gap-2">
                <span class="text-4xl font-bold text-color">
                  {{ lastValue?.value ?? '-' }}
                </span>
                <span class="text-lg text-color-secondary mb-1">{{ indicator.unit }}</span>
              </div>
              <div class="flex items-center gap-2 mt-2">
                <Tag
                  :severity="getTrendSeverity(indicator.trend_direction, indicator.goal_type)"
                  :value="getTrendLabel(indicator.trend_direction)"
                >
                  <template #icon>
                    <font-awesome-icon
                      :icon="getTrendIcon(indicator.trend_direction)"
                      class="mr-2"
                    />
                  </template>
                </Tag>
                <span class="text-sm text-color-secondary"
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
                <label for="date" class="text-sm font-medium text-color-secondary">Date</label>
                <DatePicker
                  v-model="newValue.date"
                  dateFormat="dd/mm/yy"
                  showIcon
                  fluid
                  inputId="date"
                />
              </div>

              <div class="flex flex-col gap-2">
                <label for="value" class="text-sm font-medium text-color-secondary"
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
                <label for="comment" class="text-sm font-medium text-color-secondary"
                  >Commentaire</label
                >
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
                <span class="text-color-secondary">Fréquence</span>
                <span class="font-medium">{{ getFrequencyLabel(indicator.frequency) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-color-secondary">Objectif</span>
                <span class="font-medium">{{ getGoalTypeLabel(indicator.goal_type) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-color-secondary">Source</span>
                <span class="font-medium">{{ indicator.data_source || '-' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-color-secondary">Méthode de calcul</span>
                <span class="font-medium text-right max-w-[60%]">{{
                  indicator.calculation_method || '-'
                }}</span>
              </div>
              <div v-if="indicator.description" class="mt-2 pt-2 border-t border-surface-border">
                <span class="text-color-secondary block mb-1">Description</span>
                <p class="text-color">{{ indicator.description }}</p>
              </div>
              <div v-if="indicator.manager" class="mt-2 pt-2 border-t border-surface-border">
                <span class="text-color-secondary block mb-1">Responsable</span>
                <div class="flex items-center gap-2">
                  <div
                    class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold"
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

        <!-- Linked Actions -->
        <Card>
          <template #title>
            <div class="flex items-center gap-2 mb-2">
              <font-awesome-icon icon="tasks" />
              <span>Actions Liées</span>
            </div>
          </template>
          <template #content>
            <div
              v-if="indicator.actions && indicator.actions.length > 0"
              class="flex flex-col gap-3"
            >
              <div
                v-for="action in indicator.actions"
                :key="action.id"
                class="p-3 border rounded-lg hover:bg-surface-50 cursor-pointer transition-colors"
                @click="router.push(`/actions/${action.id}`)"
              >
                <div class="flex justify-between items-start mb-1">
                  <span class="font-medium text-color text-sm line-clamp-2">{{
                    action.title
                  }}</span>
                  <Tag
                    :severity="getPrioritySeverity(action.priority)"
                    class="text-xs"
                    :value="getPriorityLabel(action.priority).charAt(0)"
                  />
                </div>
                <div class="flex justify-between items-center text-xs text-color-secondary">
                  <span>{{ getStatusLabel(action.status) }}</span>
                  <span v-if="action.due_date">{{ formatDate(action.due_date) }}</span>
                </div>
              </div>
            </div>
            <div v-else class="text-color-secondary text-sm italic">Aucune action liée.</div>
          </template>
        </Card>
      </div>
    </div>

    <!-- Edit Value Dialog -->
    <Dialog
      v-model:visible="showEditValueDialog"
      header="Modifier la valeur"
      :style="{ width: '450px' }"
      modal
    >
      <div class="flex flex-col gap-4 pt-4">
        <div class="flex flex-col gap-2">
          <label for="edit-date" class="text-sm font-medium text-color-secondary">Date</label>
          <DatePicker
            v-model="editValueForm.date"
            dateFormat="dd/mm/yy"
            showIcon
            fluid
            inputId="edit-date"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="edit-value" class="text-sm font-medium text-color-secondary">Valeur</label>
          <InputNumber
            v-model="editValueForm.value"
            :minFractionDigits="0"
            :maxFractionDigits="2"
            inputId="edit-value"
            fluid
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="edit-comment" class="text-sm font-medium text-color-secondary"
            >Commentaire</label
          >
          <Textarea v-model="editValueForm.comment" rows="3" autoResize id="edit-comment" />
        </div>
      </div>

      <template #footer>
        <Button label="Annuler" text @click="showEditValueDialog = false" severity="secondary">
          <template #icon>
            <font-awesome-icon icon="times" class="mr-2" />
          </template>
        </Button>
        <Button label="Enregistrer" @click="submitEditValue" :loading="submittingEdit">
          <template #icon>
            <font-awesome-icon icon="check" class="mr-2" />
          </template>
        </Button>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useIndicatorStore } from '@/stores/indicators'
import { useAppStore } from '@/stores/app'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Chart from 'primevue/chart'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import DatePicker from 'primevue/datepicker'
import Dialog from 'primevue/dialog'
import type { IndicatorValue } from '@/stores/app'

// Define types for Chart.js datasets
interface ChartDataset {
  label: string
  data: number[]
  fill: boolean
  borderColor: string
  backgroundColor?: string
  tension: number
  borderDash?: number[]
  pointRadius?: number
  borderWidth?: number
}

const route = useRoute()
const router = useRouter()
const store = useIndicatorStore()
const appStore = useAppStore()
const toast = useToast()
const confirm = useConfirm()

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

// Edit Value Logic
const showEditValueDialog = ref(false)
const submittingEdit = ref(false)
const editValueForm = ref({
  id: 0,
  date: new Date(),
  value: null as number | null,
  comment: '',
})

const editValue = (val: IndicatorValue) => {
  editValueForm.value = {
    id: val.id,
    date: new Date(val.date),
    value: val.value,
    comment: val.comment || '',
  }
  showEditValueDialog.value = true
}

const submitEditValue = async () => {
  if (editValueForm.value.value === null) return

  submittingEdit.value = true
  try {
    const id = indicator.value?.id
    if (!id) return

    // Format date as YYYY-MM-DD
    const dateStr = editValueForm.value.date.toISOString().split('T')[0] ?? ''

    await store.updateIndicatorValue(id, editValueForm.value.id, {
      value: editValueForm.value.value,
      date: dateStr,
      comment: editValueForm.value.comment,
    })

    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Valeur mise à jour',
      life: 3000,
    })
    showEditValueDialog.value = false
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Impossible de mettre à jour la valeur',
      life: 3000,
    })
  } finally {
    submittingEdit.value = false
  }
}

const confirmDeleteValue = (val: IndicatorValue) => {
  confirm.require({
    message: 'Voulez-vous vraiment supprimer cette valeur ?',
    header: 'Confirmation',
    icon: 'exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        if (!indicator.value?.id) return
        await store.deleteIndicatorValue(indicator.value.id, val.id)
        toast.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Valeur supprimée',
          life: 3000,
        })
      } catch {
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de supprimer la valeur',
          life: 3000,
        })
      }
    },
  })
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
  const map: Record<string, string> = {
    positive: 'Hausse',
    negative: 'Baisse',
    neutral: 'Stable',
  }
  return map[value] || value
}

const getTrendSeverity = (
  direction: string | undefined | null,
  goalType: string | undefined | null,
) => {
  if (!direction || !goalType) return 'info'

  if (direction === 'neutral') return 'info'

  if (goalType === 'maximize') {
    return direction === 'positive' ? 'success' : 'danger'
  } else if (goalType === 'minimize') {
    return direction === 'positive' ? 'danger' : 'success'
  } else if (goalType === 'target') {
    // For target, pure direction doesn't tell us if it's good or bad without values.
    // We could implement more complex logic if needed, but for now let's keep it neutral or blue
    // unless we want to do the math here. Given we have values, let's try to be smart?
    // Actually, simply knowing if it went Up or Down isn't enough.
    // Let's use 'info' (Blue) for Target trends regardless of direction, to correspond to "Notice" rather than Good/Bad.
    return 'info'
  }

  return 'info'
}

const getTrendIcon = (value: string | undefined | null) => {
  if (!value) return 'minus'
  const map: Record<string, string> = {
    positive: 'arrow-trend-up',
    negative: 'arrow-trend-down',
    neutral: 'minus',
  }
  return map[value] || 'minus'
}

const getGoalTypeLabel = (value: string | undefined) => {
  if (!value) return '-'
  const map: Record<string, string> = {
    maximize: 'Maximiser',
    minimize: 'Minimiser',
    target: 'Cibler',
  }
  return map[value] || value
}

const getStatusLabel = (value: string | undefined) => {
  if (!value) return '-'
  const map: Record<string, string> = {
    open: 'Ouvert',
    in_progress: 'En cours',
    completed: 'Terminé',
    cancelled: 'Annulé',
  }
  return map[value] || value
}

const getPriorityLabel = (value: string | undefined) => {
  if (!value) return '-'
  const map: Record<string, string> = {
    low: 'Basse',
    medium: 'Moyenne',
    high: 'Haute',
    critical: 'Critique',
  }
  return map[value] || value
}

const getPrioritySeverity = (value: string | undefined): string => {
  if (!value) return 'secondary'
  const map: Record<string, string> = {
    low: 'info',
    medium: 'warn',
    high: 'danger',
    critical: 'danger',
  }
  return map[value] || 'info'
}

onMounted(() => {
  loadData()
})
</script>
