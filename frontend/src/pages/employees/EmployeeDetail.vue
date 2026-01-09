<template>
  <div
    v-if="employeeStore.loading && !employeeStore.currentEmployee"
    class="flex justify-center items-center h-64"
  >
    <font-awesome-icon :icon="['fas', 'circle-notch']" spin class="text-4xl text-blue-500" />
  </div>

  <div v-else-if="employeeStore.error" class="p-6">
    <div class="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
      {{ employeeStore.error }}
    </div>
    <Button label="Retour" class="mt-4" @click="$router.push('/employees')">
      <template #icon>
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
      </template>
    </Button>
  </div>

  <div v-else-if="employeeStore.currentEmployee" class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start gap-4">
      <div class="flex items-center gap-4">
        <Button text rounded @click="$router.push('/employees')">
          <template #icon>
            <font-awesome-icon :icon="['fas', 'arrow-left']" />
          </template>
        </Button>
        <div class="relative">
          <Avatar
            :label="getInitials(employeeStore.currentEmployee)"
            size="xlarge"
            shape="circle"
            :style="{
              backgroundColor: stringToColor(employeeStore.currentEmployee.username),
              color: '#ffffff',
            }"
          />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {{ employeeStore.currentEmployee.first_name }}
            {{ employeeStore.currentEmployee.last_name }}
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ employeeStore.currentEmployee.role }}
          </p>
        </div>
      </div>
      <div>
        <!-- Actions if needed -->
      </div>
    </div>

    <!-- Tabs -->
    <Card>
      <template #content>
        <Tabs value="0">
          <TabList>
            <Tab value="0">Synthèse</Tab>
            <Tab value="1">Formations</Tab>
            <Tab value="2">Équipements</Tab>
            <Tab value="3">Documents</Tab>
          </TabList>
          <TabPanels>
            <!-- Synthèse -->
            <TabPanel value="0">
              <div>
                <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  Informations Personnelles
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-500 mb-1">Email</label>
                    <p class="text-gray-900 dark:text-gray-100">
                      {{ employeeStore.currentEmployee.email }}
                    </p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-500 mb-1">Identifiant</label>
                    <p class="text-gray-900 dark:text-gray-100">
                      {{ employeeStore.currentEmployee.username }}
                    </p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-500 mb-1">Statut</label>
                    <Tag
                      :severity="employeeStore.currentEmployee.is_active ? 'success' : 'danger'"
                      :value="employeeStore.currentEmployee.is_active ? 'Actif' : 'Inactif'"
                    />
                  </div>
                </div>
              </div>
            </TabPanel>

            <!-- Formations -->
            <TabPanel value="1">
              <div>
                <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  Formations & Habilitations
                </h3>
                <div
                  v-if="
                    !employeeStore.currentEmployee.participations ||
                    employeeStore.currentEmployee.participations.length === 0
                  "
                  class="text-gray-500 italic"
                >
                  Aucune formation enregistrée.
                </div>
                <div v-else class="space-y-4">
                  <div
                    v-for="participation in employeeStore.currentEmployee.participations"
                    :key="participation.id"
                    class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div>
                      <h4 class="font-medium text-gray-900 dark:text-gray-100">
                        {{ participation.session?.training?.title || 'Formation inconnue' }}
                      </h4>
                      <p class="text-sm text-gray-500">
                        Obtenu le: {{ formatDate(participation.obtained_date) }}
                        <span
                          v-if="participation.expiration_date"
                          :class="
                            isExpired(participation.expiration_date)
                              ? 'text-red-500'
                              : 'text-green-500'
                          "
                        >
                          (Expire le: {{ formatDate(participation.expiration_date) }})
                        </span>
                      </p>
                    </div>
                    <div class="flex items-center gap-2">
                      <Tag
                        :severity="getTrainingStatusSeverity(participation.status)"
                        :value="formatStatus(participation.status)"
                      />
                      <Button
                        v-if="participation.certificate_path"
                        text
                        rounded
                        aria-label="Certificat"
                      >
                        <template #icon>
                          <font-awesome-icon :icon="['fas', 'download']" />
                        </template>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>

            <!-- Équipements -->
            <TabPanel value="2">
              <div>
                <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  Équipements (EPI)
                </h3>
                <!-- Current Equipment -->
                <h4 class="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dotation Actuelle
                </h4>
                <div
                  v-if="
                    !employeeStore.currentEmployee.current_equipment ||
                    employeeStore.currentEmployee.current_equipment.length === 0
                  "
                  class="text-gray-500 italic mb-6"
                >
                  Aucun équipement en possession.
                </div>
                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div
                    v-for="equipment in employeeStore.currentEmployee.current_equipment"
                    :key="equipment.id"
                    class="p-4 border rounded-lg"
                  >
                    <div class="flex justify-between items-start">
                      <div>
                        <h5 class="font-medium">{{ equipment.name }}</h5>
                        <p class="text-xs text-gray-500">{{ equipment.internal_ref }}</p>
                      </div>
                      <Tag :value="equipment.status" severity="info" />
                    </div>
                  </div>
                </div>

                <!-- History if needed (from assignments relation) -->
              </div>
            </TabPanel>

            <!-- Documents -->
            <TabPanel value="3">
              <div>
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Documents Personnels
                  </h3>
                  <Button label="Ajouter" size="small">
                    <template #icon>
                      <font-awesome-icon :icon="['fas', 'plus']" />
                    </template>
                  </Button>
                </div>

                <div
                  v-if="
                    !employeeStore.currentEmployee.documents ||
                    employeeStore.currentEmployee.documents.length === 0
                  "
                  class="text-gray-500 italic"
                >
                  Aucun document attaché.
                </div>
                <div v-else class="space-y-2">
                  <div
                    v-for="doc in employeeStore.currentEmployee.documents"
                    :key="doc.id"
                    class="flex items-center justify-between p-3 border rounded hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <div class="flex items-center gap-3">
                      <font-awesome-icon :icon="['fas', 'file-pdf']" class="text-red-500 text-xl" />
                      <span>{{ doc.title }}</span>
                    </div>
                    <Button text rounded size="small">
                      <template #icon>
                        <font-awesome-icon :icon="['fas', 'download']" />
                      </template>
                    </Button>
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useEmployeeStore } from '@/stores/employees'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
// PrimeVue Components
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Tag from 'primevue/tag'

const route = useRoute()
const employeeStore = useEmployeeStore()

onMounted(() => {
  const id = Number(route.params.id)
  if (id) {
    employeeStore.fetchEmployeeById(id)
  }
})

// Helpers
const getInitials = (user: any) => {
  if (user.first_name && user.last_name) {
    return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
  }
  return user.username.substring(0, 2).toUpperCase()
}

const stringToColor = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const c = (hash & 0x00ffffff).toString(16).toUpperCase()
  return '#' + '00000'.substring(0, 6 - c.length) + c
}

const formatDate = (dateValue: string | null) => {
  if (!dateValue) return '-'
  return format(new Date(dateValue), 'dd MMM yyyy', { locale: fr })
}

const isExpired = (dateValue: string) => {
  return new Date(dateValue) < new Date()
}

const formatStatus = (status: string) => {
  const map: Record<string, string> = {
    completed: 'Validé',
    pending: 'En attente',
    failed: 'Échoué',
  }
  return map[status] || status
}

const getTrainingStatusSeverity = (status: string) => {
  switch (status) {
    case 'completed':
      return 'success'
    case 'pending':
      return 'warn'
    case 'failed':
      return 'danger'
    default:
      return 'info'
  }
}
</script>
