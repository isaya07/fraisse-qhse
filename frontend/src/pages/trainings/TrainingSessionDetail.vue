<template>
  <div class="p-4" v-if="session">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div class="flex items-center gap-4">
        <Button text rounded severity="secondary" @click="goBack">
          <template #icon>
            <font-awesome-icon icon="arrow-left" />
          </template>
        </Button>
        <div>
          <h2>{{ session.training?.title }}</h2>
          <div class="flex items-center gap-2 text-sm text-color-secondary">
            <font-awesome-icon icon="calendar" />
            <span>{{ formatDate(session.start_date) }} - {{ formatDate(session.end_date) }}</span>
            <span class="mx-2">|</span>
            <Tag
              :value="getStatusLabel(session.status)"
              :severity="getStatusSeverity(session.status)"
            />
          </div>
        </div>
      </div>
      <div class="flex gap-2">
        <Button
          v-if="session.can?.update"
          label="Modifier"
          severity="warning"
          outlined
          @click="editSession"
        >
          <template #icon>
            <font-awesome-icon icon="pencil" class="mr-2" />
          </template>
        </Button>
        <Button
          v-if="session.can?.delete"
          label="Supprimer"
          severity="danger"
          outlined
          @click="deleteSession"
        >
          <template #icon>
            <font-awesome-icon icon="trash" class="mr-2" />
          </template>
        </Button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column: Info & Stats -->
      <div class="space-y-6">
        <!-- Info Card -->
        <Card>
          <template #title><h4>Informations</h4></template>
          <template #content>
            <div class="flex flex-col gap-4">
              <div>
                <span class="block text-sm text-color-secondary mb-1">Organisme</span>
                <span class="font-medium text-lg">{{ session.organization?.name || '-' }}</span>
              </div>
              <div>
                <span class="block text-sm text-color-secondary mb-1">Lieu</span>
                <span class="font-medium">{{ session.location }}</span>
              </div>
              <div>
                <span class="block text-sm text-color-secondary mb-1">Formateur</span>
                <span class="font-medium">{{ session.instructor || '-' }}</span>
              </div>
              <div>
                <span class="block text-sm text-color-secondary mb-1">Coût</span>
                <span class="font-medium">{{
                  session.cost ? formatCurrency(session.cost) : '-'
                }}</span>
              </div>
            </div>
          </template>
        </Card>

        <!-- Stats -->
        <Card>
          <template #title><h4>Occupation</h4></template>
          <template #content>
            <div class="flex flex-col gap-3">
              <div class="flex justify-between items-center">
                <span class="text-sm text-color-secondary">Inscrits</span>
                <span class="font-medium"
                  >{{ session.participations?.length || 0 }} /
                  {{ session.max_participants || '∞' }}</span
                >
              </div>
              <div class="w-full bg-surface-100 dark:bg-surface-700 rounded-full h-2">
                <div
                  class="bg-blue-500 h-2 rounded-full"
                  :style="{ width: getParticipationPercentage() + '%' }"
                ></div>
              </div>
            </div>
          </template>
        </Card>
      </div>

      <!-- Right Column: Tabs -->
      <div class="lg:col-span-2 space-y-6">
        <Card>
          <template #content>
            <Tabs value="participants">
              <TabList>
                <Tab value="participants">Participants</Tab>
                <Tab value="documents">Documents</Tab>
              </TabList>
              <TabPanels>
                <!-- PARTICIPANTS TAB -->
                <TabPanel value="participants">
                  <ParticipantManager
                    :participations="session.participations || []"
                    :users="users"
                    :readonly="!session.can?.update"
                    @add="addParticipant"
                    @update="updateParticipant"
                    @remove="removeParticipant"
                  />
                </TabPanel>

                <!-- DOCUMENTS TAB -->
                <TabPanel value="documents">
                  <div class="flex justify-between items-center mb-4">
                    <h4 class="m-0">Documents associés</h4>
                    <Button
                      label="Ajouter"
                      size="small"
                      outlined
                      v-if="session.can?.update"
                      v-tooltip="'Ajouter un document'"
                      icon="pi pi-plus"
                    />
                  </div>
                  <div
                    v-if="session.documents && session.documents.length > 0"
                    class="flex flex-col gap-2"
                  >
                    <div
                      v-for="doc in session.documents"
                      :key="doc.id"
                      class="flex items-center justify-between p-3 border rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
                    >
                      <div class="flex items-center gap-3 overflow-hidden">
                        <div
                          class="w-8 h-8 rounded bg-primary-50 flex items-center justify-center text-primary-600"
                        >
                          <font-awesome-icon icon="file" />
                        </div>
                        <div class="flex flex-col">
                          <span class="truncate font-medium">{{ doc.title }}</span>
                          <span class="text-xs text-color-secondary">{{
                            formatDate(doc.created_at)
                          }}</span>
                        </div>
                      </div>
                      <Button
                        text
                        rounded
                        size="small"
                        severity="secondary"
                        v-tooltip="'Télécharger'"
                      >
                        <template #icon>
                          <font-awesome-icon icon="download" />
                        </template>
                      </Button>
                    </div>
                  </div>
                  <p v-else class="text-color-secondary italic text-center py-4">
                    Aucun document associé.
                  </p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </template>
        </Card>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center py-12">
    <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-color-secondary" />
  </div>
  <ConfirmDialog />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTrainingStore, type TrainingParticipationStatus } from '@/stores/training'
import { useUserStore } from '@/stores/users'
import ParticipantManager from '@/components/trainings/ParticipantManager.vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import ConfirmDialog from 'primevue/confirmdialog'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

const route = useRoute()
const router = useRouter()
const store = useTrainingStore()
const userStore = useUserStore()
const toast = useToast()
const confirm = useConfirm()

const session = computed(() =>
  store.sessions.find((s) => s.id === parseInt(route.params.id as string)),
)
const users = computed(() => userStore.users)

const formatDate = (dateString: string) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value)
}

const getStatusLabel = (status: string) => {
  const map: Record<string, string> = {
    planned: 'Planifiée',
    completed: 'Réalisée',
    cancelled: 'Annulée',
  }
  return map[status] || status
}

const getStatusSeverity = (status: string) => {
  const map: Record<string, string> = {
    planned: 'info',
    completed: 'success',
    cancelled: 'danger',
  }
  return map[status] || 'info'
}

const getParticipationPercentage = () => {
  if (!session.value || !session.value.max_participants) return 0
  const count = session.value.participations?.length || 0
  return Math.min(100, (count / session.value.max_participants) * 100)
}

const goBack = () => {
  router.back()
}

const editSession = () => {
  // Logic to open edit dialog (maybe reuse the one from list view or separate page)
  console.log('Edit session')
}

const deleteSession = () => {
  confirm.require({
    message: 'Êtes-vous sûr de vouloir supprimer cette session ?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      if (!session.value) return
      try {
        await store.deleteSession(session.value.id)
        toast.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Session supprimée',
          life: 3000,
        })
        router.push('/trainings/sessions')
      } catch {
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de supprimer la session',
          life: 3000,
        })
      }
    },
    reject: () => {
      // Callback on reject
    },
  })
}

// Participant Management
// Participant Management
const addParticipant = async (data: { user_id: number; status: string }) => {
  try {
    await store.addParticipant({
      training_session_id: session.value?.id,
      user_id: data.user_id,
      status: data.status as TrainingParticipationStatus,
    })
    toast.add({ severity: 'success', summary: 'Succès', detail: 'Participant ajouté', life: 3000 })
  } catch (e) {
    console.log(e)
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: "Erreur lors de l'ajout",
      life: 3000,
    })
  }
}

const updateParticipant = async (data: {
  id: number
  status: TrainingParticipationStatus
  obtained_date?: string
  expiration_date?: string
}) => {
  try {
    await store.updateParticipant(data.id, {
      status: data.status,
      obtained_date: data.obtained_date,
      expiration_date: data.expiration_date,
    })
    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Participant mis à jour',
      life: 3000,
    })
  } catch (e) {
    console.log(e)
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Erreur lors de la mise à jour',
      life: 3000,
    })
  }
}

const removeParticipant = async (id: number) => {
  if (!session.value) return
  try {
    await store.removeParticipant(id, session.value.id)
    toast.add({ severity: 'success', summary: 'Succès', detail: 'Participant retiré', life: 3000 })
  } catch (e) {
    console.log(e)
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Erreur lors de la suppression',
      life: 3000,
    })
  }
}

onMounted(async () => {
  const id = parseInt(route.params.id as string)
  if (id) {
    // Ensure we have the session details (including relations)
    // We might need a specific fetchSession(id) action in store if fetchSessions() doesn't load everything or if we land directly here
    // For now, fetchSessions loads everything, but maybe not deep relations if optimized.
    // Let's assume fetchSessions is enough or add fetchSessionById
    if (store.sessions.length === 0) {
      await store.fetchSessions()
    }
    await userStore.fetchUsers()
  }
})
</script>
