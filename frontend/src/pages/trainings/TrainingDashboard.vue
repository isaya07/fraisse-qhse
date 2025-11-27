<template>
  <div class="p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h2>Tableau de bord Formation</h2>
      <div class="flex gap-2">
        <router-link to="/trainings/catalog">
          <Button label="Catalogue" severity="secondary" outlined>
            <template #icon>
              <font-awesome-icon icon="book" class="mr-2" />
            </template>
          </Button>
        </router-link>
        <router-link to="/trainings/sessions">
          <Button label="Sessions" severity="secondary" outlined>
            <template #icon>
              <font-awesome-icon icon="calendar" class="mr-2" />
            </template>
          </Button>
        </router-link>
      </div>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card>
        <template #content>
          <div class="flex items-center justify-between">
            <div>
              <span class="block text-gray-500 text-sm font-medium mb-1">Sessions à venir</span>
              <span class="text-3xl font-bold">{{ upcomingSessionsCount }}</span>
            </div>
            <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <font-awesome-icon icon="calendar-alt" size="lg" />
            </div>
          </div>
        </template>
      </Card>

      <Card>
        <template #content>
          <div class="flex items-center justify-between">
            <div>
              <span class="block text-gray-500 text-sm font-medium mb-1">Formations actives</span>
              <span class="text-3xl font-bold">{{ activeTrainingsCount }}</span>
            </div>
            <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <font-awesome-icon icon="book-open" size="lg" />
            </div>
          </div>
        </template>
      </Card>

      <Card>
        <template #content>
          <div class="flex items-center justify-between">
            <div>
              <span class="block text-gray-500 text-sm font-medium mb-1">Participants ce mois</span>
              <span class="text-3xl font-bold">{{ participantsThisMonth }}</span>
            </div>
            <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <font-awesome-icon icon="users" size="lg" />
            </div>
          </div>
        </template>
      </Card>

      <Card>
        <template #content>
          <div class="flex items-center justify-between">
            <div>
              <span class="block text-gray-500 text-sm font-medium mb-1">Renouvellements</span>
              <span class="text-3xl font-bold">{{ renewalsNeeded.length }}</span>
            </div>
            <div class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <font-awesome-icon icon="clock" size="lg" />
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- Upcoming Sessions -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <h3>Prochaines sessions</h3>
        <router-link to="/trainings/sessions" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
          Voir tout
        </router-link>
      </div>
      <SessionList :sessions="upcomingSessions" @view="viewSession" @edit="editSession" />
    </div>

    <!-- Renewals Needed -->
    <div class="mb-8">
      <h3>Renouvellements à prévoir</h3>
      <div v-if="renewalsNeeded.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card v-for="renewal in renewalsNeeded" :key="renewal.id">
          <template #content>
            <div class="flex items-start justify-between">
              <div>
                <span class="block font-semibold text-gray-800">{{ renewal.training?.title }}</span>
                <span class="block text-sm text-gray-600 mt-1">
                  {{ renewal.user?.first_name }} {{ renewal.user?.last_name }}
                </span>
                <div class="mt-2 flex items-center gap-2 text-sm">
                  <font-awesome-icon icon="clock" :class="renewal.is_expired ? 'text-red-600' : 'text-orange-600'" />
                  <span :class="renewal.is_expired ? 'text-red-700 font-medium' : 'text-orange-700'">
                    Expire le {{ new Date(renewal.expiration_date).toLocaleDateString() }}
                  </span>
                </div>
              </div>
              <Button text rounded size="small" :severity="renewal.is_expired ? 'danger' : 'warning'"
                v-tooltip="'Relancer'">
                <template #icon>
                  <font-awesome-icon icon="envelope" />
                </template>
              </Button>
            </div>
          </template>
        </Card>
      </div>
      <Card v-else>
        <template #content>
          <font-awesome-icon icon="check-circle" class="text-green-500 text-3xl mb-3" />
          <p class="text-gray-500 font-medium">
            Aucun renouvellement à prévoir pour les 3 prochains mois.
          </p>
          <p class="text-gray-500 text-sm mt-1">Tout est à jour !</p>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTrainingStore } from '@/stores/training'
import Card from 'primevue/card'
import Button from 'primevue/button'
import SessionList from '@/components/trainings/SessionList.vue'

const router = useRouter()
const store = useTrainingStore()

const upcomingSessionsCount = computed(() => {
  return store.sessions.filter((s) => s.status === 'planned').length
})

const activeTrainingsCount = computed(() => store.trainings.length)

const participantsThisMonth = computed(() => {
  // Mock calculation for now as we don't have full participation data loaded everywhere
  return 0
})

const upcomingSessions = computed(() => {
  return store.sessions
    .filter((s) => s.status === 'planned')
    .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
    .slice(0, 5)
})

const renewalsNeeded = computed(() => {
  const renewals: any[] = []
  const now = new Date()
  const threeMonthsFromNow = new Date()
  threeMonthsFromNow.setMonth(now.getMonth() + 3)

  store.sessions.forEach((session) => {
    if (session.participations) {
      session.participations.forEach((p) => {
        if (p.status === 'validated' && p.expiration_date) {
          const expDate = new Date(p.expiration_date)
          if (expDate <= threeMonthsFromNow) {
            renewals.push({
              id: p.id,
              user: p.user,
              training: session.training,
              expiration_date: p.expiration_date,
              is_expired: expDate < now,
            })
          }
        }
      })
    }
  })

  return renewals.sort(
    (a, b) => new Date(a.expiration_date).getTime() - new Date(b.expiration_date).getTime(),
  )
})

const viewSession = (session: any) => {
  router.push(`/trainings/sessions/${session.id}`)
}

const editSession = (session: any) => {
  // Implement edit logic or navigation
  console.log('Edit session', session.id)
}

onMounted(async () => {
  await Promise.all([store.fetchSessions(), store.fetchTrainings()])
})
</script>
