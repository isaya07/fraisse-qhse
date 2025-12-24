<template>
  <div class="dashboard p-4">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h2>Bonjour, {{ user?.first_name || 'Utilisateur' }}</h2>
        <p class="text-color-secondary">{{ currentDate }}</p>
      </div>
      <div class="flex gap-2">
        <div class="flex gap-2">
          <Button size="small" @click="$router.push('/actions/create')">
            <font-awesome-icon icon="plus" />
            Nouvelle Action
          </Button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <font-awesome-icon icon="spinner" spin size="3x" class="text-primary" />
    </div>

    <div v-else class="grid grid-cols-12 gap-6">
      <!-- Top Stats Row -->
      <div
        v-for="(stat, key) in displayStats"
        :key="key"
        class="col-span-12 md:col-span-6 lg:col-span-3"
      >
        <StatTile
          :title="stat.title"
          :value="stat.value"
          :icon="stat.icon"
          :color="stat.color"
          :loading="loading"
        />
      </div>

      <!-- Main Content Area (3 Columns) -->

      <!-- Column 1: Priority Actions & Equipment -->
      <div class="col-span-12 lg:col-span-4 space-y-6">
        <!-- My Priority Actions -->
        <Card>
          <template #title>
            <div class="flex justify-between items-center">
              <span>Mes Actions Prioritaires</span>
              <Button label="Voir tout" link size="small" @click="$router.push('/actions')" />
            </div>
          </template>
          <template #content>
            <div v-if="myActions.length === 0" class="text-center py-8 text-color-secondary">
              <font-awesome-icon icon="check-circle" size="2x" class="mb-2 text-green-500" />
              <p>Aucune action prioritaire en attente !</p>
            </div>
            <div v-else class="space-y-4">
              <div
                v-for="action in myActions"
                :key="action.id"
                class="flex items-center justify-between p-3 border-b border-surface-border last:border-0 hover:bg-surface-50 cursor-pointer transition-colors rounded"
                @click="$router.push(`/actions/${action.id}`)"
              >
                <div class="flex items-center gap-3">
                  <div class="flex flex-col">
                    <span class="font-medium truncate max-w-xs">{{ action.title }}</span>
                    <span class="text-xs text-color-secondary">
                      Échéance : {{ formatDate(action.due_date) }}
                    </span>
                  </div>
                </div>
                <Tag
                  :value="getPriorityLabel(action.priority)"
                  :severity="getPrioritySeverity(action.priority)"
                />
              </div>
            </div>
          </template>
        </Card>

        <!-- My Equipment -->
        <Card>
          <template #title>Mon Équipement</template>
          <template #content>
            <div v-if="myEquipment.length === 0" class="text-sm text-color-secondary">
              Aucun équipement assigné.
            </div>
            <div v-else class="space-y-3">
              <div
                v-for="item in myEquipment"
                :key="item.id"
                class="flex items-center gap-3 p-2 border rounded hover:bg-surface-50 cursor-pointer"
                @click="$router.push(`/equipment/${item.id}`)"
              >
                <div
                  class="w-10 h-10 bg-surface-100 rounded flex items-center justify-center text-surface-500"
                >
                  <font-awesome-icon icon="tools" />
                </div>
                <div class="flex-1 overflow-hidden">
                  <div class="font-medium truncate">{{ item.name }}</div>
                  <div class="text-xs text-color-secondary truncate">{{ item.internal_ref }}</div>
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>

      <!-- Column 2: Stats/Charts & Documents -->
      <div class="col-span-12 lg:col-span-4 space-y-6">
        <!-- Charts (Admin/Manager only) -->
        <Card v-if="charts && charts.actions_by_status">
          <template #title>Répartition des Actions</template>
          <template #content>
            <div class="h-64 flex justify-center">
              <Chart
                v-if="chartData"
                type="doughnut"
                :data="chartData"
                :options="chartOptions"
                class="h-full"
              />
            </div>
          </template>
        </Card>

        <!-- Recent Documents / News -->
        <Card>
          <template #title>Derniers Documents</template>
          <template #content>
            <div class="space-y-3">
              <div v-for="doc in recentDocuments" :key="doc.id" class="flex gap-2 items-start">
                <font-awesome-icon :icon="['fas', 'file']" class="mt-1 text-primary" />
                <div>
                  <div
                    class="text-sm font-medium hover:text-primary cursor-pointer transition-colors"
                    @click="$router.push(`/documents/${doc.id}`)"
                  >
                    {{ doc.title }}
                  </div>
                  <div class="text-xs text-color-secondary">
                    {{ formatDate(doc.published_date) }}
                  </div>
                </div>
              </div>
              <div v-if="recentDocuments.length === 0" class="text-sm text-color-secondary">
                Aucun document récent.
              </div>
            </div>
          </template>
        </Card>
      </div>

      <!-- Column 3: Agenda (Right) -->
      <div class="col-span-12 lg:col-span-4 space-y-6">
        <!-- Unified Agenda -->
        <Card>
          <template #title>
            <div class="flex items-center gap-2">
              <font-awesome-icon icon="calendar-check" />
              Agenda des Échéances
            </div>
          </template>
          <template #content>
            <div
              v-if="
                agendaGroups.overdue.length === 0 &&
                agendaGroups.today.length === 0 &&
                agendaGroups.upcoming.length === 0
              "
              class="text-sm text-color-secondary"
            >
              Aucune échéance à venir.
            </div>

            <div v-else class="space-y-4">
              <!-- Overdue -->
              <div v-if="agendaGroups.overdue.length > 0">
                <div class="text-xs font-bold text-red-500 uppercase mb-2 tracking-wider">
                  En Retard / Urgent
                </div>
                <div class="space-y-2">
                  <div
                    v-for="(item, idx) in agendaGroups.overdue"
                    :key="'overdue-' + idx"
                    class="flex items-center justify-between p-2 rounded bg-red-50 border border-red-100 hover:bg-red-100 cursor-pointer transition-colors"
                    @click="item.link ? $router.push(item.link) : null"
                  >
                    <div class="flex items-center gap-3">
                      <span :class="item.color"><font-awesome-icon :icon="item.icon" /></span>
                      <div class="flex flex-col">
                        <span class="text-sm font-medium text-surface-900">{{ item.title }}</span>
                        <span class="text-xs text-color-secondary"
                          >{{ item.label }} - {{ formatDate(item.date) }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Today / Tomorrow -->
              <div v-if="agendaGroups.today.length > 0">
                <div class="text-xs font-bold text-orange-500 uppercase mb-2 tracking-wider">
                  Cette Semaine
                </div>
                <div class="space-y-2">
                  <div
                    v-for="(item, idx) in agendaGroups.today"
                    :key="'today-' + idx"
                    class="flex items-center justify-between p-2 rounded bg-orange-50 border border-orange-100 hover:bg-orange-100 cursor-pointer transition-colors"
                    @click="item.link ? $router.push(item.link) : null"
                  >
                    <div class="flex items-center gap-3">
                      <span :class="item.color"><font-awesome-icon :icon="item.icon" /></span>
                      <div class="flex flex-col">
                        <span class="text-sm font-medium text-surface-900">{{ item.title }}</span>
                        <span class="text-xs text-color-secondary"
                          >{{ item.label }} - {{ formatDate(item.date) }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Upcoming -->
              <div v-if="agendaGroups.upcoming.length > 0">
                <div class="text-xs font-bold text-blue-500 uppercase mb-2 tracking-wider">
                  À Venir
                </div>
                <div class="space-y-2">
                  <div
                    v-for="(item, idx) in agendaGroups.upcoming"
                    :key="'upcoming-' + idx"
                    class="flex items-center justify-between p-2 rounded hover:bg-surface-50 border border-surface-border cursor-pointer transition-colors"
                    @click="item.link ? $router.push(item.link) : null"
                  >
                    <div class="flex items-center gap-3">
                      <span :class="item.color"><font-awesome-icon :icon="item.icon" /></span>
                      <div class="flex flex-col">
                        <span class="text-sm font-medium text-surface-900">{{ item.title }}</span>
                        <span class="text-xs text-color-secondary"
                          >{{ item.label }} - {{ formatDate(item.date) }}</span
                        >
                      </div>
                    </div>
                  </div>
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
import { useApi } from '@/composables/useApi'
import { useAppStore } from '@/stores/app'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Chart from 'primevue/chart'
import StatTile from '@/components/common/StatTile.vue'

// Interfaces
interface DashboardStats {
  total_actions_open?: number
  documents_pending?: number
  my_actions_pending?: number
  my_equipment_count?: number
  compliance_rate?: number
}

interface DashboardChartData {
  labels: string[]
  data: number[]
}

interface DashboardCharts {
  actions_by_status?: DashboardChartData
}

interface Action {
  id: number
  title: string
  due_date: string
  priority: string
  status: string
}

interface Equipment {
  id: number
  name: string
  internal_ref: string
}

interface RecentDocument {
  id: number
  title: string
  published_date: string
}

interface TrainingSession {
  start_date: string
  training?: {
    title: string
  }
}

interface TrainingParticipation {
  expiration_date: string
  session?: {
    training?: {
      title: string
    }
  }
}

interface DashboardResponse {
  success?: boolean
  data?: {
    stats: DashboardStats
    charts: DashboardCharts
    my_actions: Action[]
    my_equipment: Equipment[]
    recent_documents: RecentDocument[]
    upcoming_sessions: TrainingSession[]
    expiring_certifications: TrainingParticipation[]
    expiring_documents: any[] // NEW
    upcoming_maintenance: any[] // NEW
    deadlines: {
      actions: Action[]
      equipment: Equipment[] // Equipment model content
    }
  }
  // Fallback structure
  stats?: DashboardStats
  charts?: DashboardCharts
  my_actions?: Action[]
  my_equipment?: Equipment[]
  recent_documents?: RecentDocument[]
  upcoming_sessions?: TrainingSession[]
  expiring_certifications?: TrainingParticipation[]
  expiring_documents?: any[] // NEW
  upcoming_maintenance?: any[] // NEW
  deadlines?: {
    actions: Action[]
    equipment: Equipment[]
  }
}

const { get } = useApi()
const appStore = useAppStore()

const loading = ref(true)
const stats = ref<DashboardStats>({})
const charts = ref<DashboardCharts>({})
const myActions = ref<Action[]>([])
const myEquipment = ref<Equipment[]>([])
const recentDocuments = ref<RecentDocument[]>([])
const upcomingSessions = ref<TrainingSession[]>([])
const expiringCertifications = ref<TrainingParticipation[]>([])
const expiringDocuments = ref<any[]>([]) // NEW
const upcomingMaintenance = ref<any[]>([]) // NEW
const deadlines = ref<{ actions: Action[]; equipment: any[] }>({ actions: [], equipment: [] }) // Equipment type is 'any' here for simplicity or define full Equipment with fields

const user = computed(() => appStore.user)
const currentDate = computed(() => {
  return format(new Date(), 'EEEE d MMMM yyyy', { locale: fr }).replace(/^\w/, (c) =>
    c.toUpperCase(),
  )
})

// Display Stats Configuration
const displayStats = computed(() => {
  const s = stats.value || {}
  const role = user.value?.role

  const items: {
    title: string
    value: string | number
    color: string
    icon: string
  }[] = []

  // Global / Manager Stats
  if (role === 'admin' || role === 'manager') {
    items.push({
      title: 'Actions Ouvertes',
      value: s.total_actions_open || 0,
      color: 'orange',
      icon: 'list-check',
    })
    items.push({
      title: 'Documents à Valider',
      value: s.documents_pending || 0,
      color: 'yellow',
      icon: 'file-signature',
    })
  } else {
    // User Stats replacement for top row
    items.push({
      title: 'Mes Actions',
      value: s.my_actions_pending || 0,
      color: 'blue',
      icon: 'tasks',
    })
  }

  // Common Stats
  items.push({
    title: 'Équipements (Moi)',
    value: s.my_equipment_count || 0,
    color: 'cyan',
    icon: 'tools',
  })

  // Global Compliance
  if (s.compliance_rate !== undefined) {
    items.push({
      title: 'Conformité Globale',
      value: s.compliance_rate + '%',
      color: 'green',
      icon: 'check-circle',
    })
  }

  return items
})

const chartData = computed(() => {
  if (!charts.value?.actions_by_status) return null
  return {
    labels: charts.value.actions_by_status.labels,
    datasets: [
      {
        data: charts.value.actions_by_status.data,
        backgroundColor: ['#3B82F6', '#F59E0B', '#10B981', '#EF4444'],
        hoverBackgroundColor: ['#2563EB', '#D97706', '#059669', '#DC2626'],
      },
    ],
  }
})

const chartOptions = {
  plugins: {
    legend: {
      position: 'right',
    },
  },
  cutout: '60%',
}

// Unified Agenda Computed Property
const agendaGroups = computed(() => {
  const allItems: any[] = []

  // 1. Actions Deadlines
  deadlines.value.actions.forEach((a) => {
    allItems.push({
      type: 'action',
      title: a.title,
      date: new Date(a.due_date),
      label: 'Action',
      icon: 'tasks',
      color: 'text-blue-500',
      id: a.id,
      link: `/actions/${a.id}`,
    })
  })

  // 2. Equipment Expirations
  deadlines.value.equipment.forEach((e) => {
    if (e.expiration_date) {
      allItems.push({
        type: 'equipment',
        title: e.name,
        date: new Date(e.expiration_date),
        label: 'Contrôle / Expiration',
        icon: 'tools',
        color: 'text-cyan-500',
        id: e.id,
        link: `/equipment/${e.id}`,
      })
    }
  })

  // 3. Training Certifications (Expiring)
  expiringCertifications.value.forEach((c) => {
    allItems.push({
      type: 'certification',
      title: c.session?.training?.title || 'Formation',
      date: new Date(c.expiration_date),
      label: 'Expire bientôt',
      icon: 'certificate',
      color: 'text-orange-500',
      id: null, // No direct link for now
      link: null,
    })
  })

  // 4. Upcoming Sessions
  upcomingSessions.value.forEach((s) => {
    allItems.push({
      type: 'training',
      title: s.training?.title || 'Formation',
      date: new Date(s.start_date),
      label: 'Session',
      icon: 'graduation-cap',
      color: 'text-purple-500',
      id: null,
      link: null,
    })
  })

  // 5. Expiring Documents (NEW)
  expiringDocuments.value.forEach((doc: any) => {
    if (doc.expires_date) {
      allItems.push({
        type: 'document',
        title: doc.title,
        date: new Date(doc.expires_date),
        label: 'Document à renouveler',
        icon: 'file-alt',
        color: 'text-yellow-500',
        id: doc.id,
        link: `/documents/${doc.id}`,
      })
    }
  })

  // 6. Upcoming Maintenance (NEW)
  upcomingMaintenance.value.forEach((maint: any) => {
    if (maint.next_maintenance_date) {
      allItems.push({
        type: 'maintenance',
        title: `Maintenance - ${maint.equipment?.name || 'Équipement'}`,
        date: new Date(maint.next_maintenance_date),
        label: 'Maintenance préventive',
        icon: 'wrench',
        color: 'text-red-500',
        id: maint.equipment?.id,
        link: maint.equipment?.id ? `/equipment/${maint.equipment.id}` : null,
      })
    }
  })

  // Sort by Date
  allItems.sort((a, b) => a.date.getTime() - b.date.getTime())

  // Grouping Logic
  const groups = {
    overdue: [] as any[],
    today: [] as any[],
    upcoming: [] as any[],
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  allItems.forEach((item) => {
    // Reset time for comparison
    const itemDate = new Date(item.date)
    itemDate.setHours(0, 0, 0, 0)

    if (itemDate < today) {
      groups.overdue.push(item)
    } else if (
      itemDate.getTime() === today.getTime() ||
      itemDate.getTime() === tomorrow.getTime()
    ) {
      groups.today.push(item)
    } else {
      groups.upcoming.push(item)
    }
  })

  return groups
})

const fetchDashboardData = async () => {
  loading.value = true
  try {
    const response = (await get('/dashboard/stats')) as DashboardResponse

    // Check if response has success property (standard wrapper) or is the data itself
    if (response && response.success && response.data) {
      const data = response.data
      stats.value = data.stats || {}
      charts.value = data.charts || {}
      myActions.value = data.my_actions || []
      myEquipment.value = data.my_equipment || []
      recentDocuments.value = data.recent_documents || []
      upcomingSessions.value = data.upcoming_sessions || []
      expiringCertifications.value = data.expiring_certifications || []
      expiringDocuments.value = data.expiring_documents || [] // NEW
      upcomingMaintenance.value = data.upcoming_maintenance || [] // NEW
      deadlines.value = data.deadlines || { actions: [], equipment: [] }
    } else if (response && response.stats) {
      // Fallback if useApi unwraps it
      stats.value = response.stats || {}
      charts.value = response.charts || {}
      myActions.value = response.my_actions || []
      myEquipment.value = response.my_equipment || []
      recentDocuments.value = response.recent_documents || []
      upcomingSessions.value = response.upcoming_sessions || []
      expiringCertifications.value = response.expiring_certifications || []
      expiringDocuments.value = response.expiring_documents || [] // NEW
      upcomingMaintenance.value = response.upcoming_maintenance || [] // NEW
      deadlines.value = response.deadlines || { actions: [], equipment: [] }
    }
  } catch (error) {
    console.error('Failed to load dashboard data', error)
  } finally {
    loading.value = false
  }
}

// Helpers
const formatDate = (date: string) => {
  if (!date) return '-'
  return format(new Date(date), 'dd MMM yyyy', { locale: fr })
}

const getPriorityLabel = (val: string) => {
  const map: Record<string, string> = {
    low: 'Basse',
    medium: 'Moyenne',
    high: 'Haute',
    critical: 'Critique',
  }
  return map[val] || val
}
const getPrioritySeverity = (val: string) => {
  const map: Record<string, string> = {
    low: 'success',
    medium: 'info',
    high: 'warning',
    critical: 'danger',
  }
  return map[val] || 'info'
}

onMounted(() => {
  fetchDashboardData()
})
</script>
