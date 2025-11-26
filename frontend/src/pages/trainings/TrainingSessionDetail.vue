<template>
  <div class="p-4" v-if="session">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div class="flex items-center gap-4">
        <Button icon="pi pi-arrow-left" text rounded severity="secondary" @click="goBack" />
        <div>
          <h1 class="text-2xl font-bold text-gray-800">{{ session.training?.title }}</h1>
          <div class="flex items-center gap-2 text-sm text-gray-500">
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
      <Button
        label="Modifier"
        icon="pi pi-pencil"
        severity="secondary"
        outlined
        @click="editSession"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 flex flex-col gap-6">
        <!-- Info Card -->
        <Card>
          <template #title>Informations</template>
          <template #content>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span class="block text-sm text-gray-500">Organisme</span>
                <span class="font-medium">{{ session.organization?.name || '-' }}</span>
              </div>
              <div>
                <span class="block text-sm text-gray-500">Lieu</span>
                <span class="font-medium">{{ session.location }}</span>
              </div>
              <div>
                <span class="block text-sm text-gray-500">Formateur</span>
                <span class="font-medium">{{ session.instructor || '-' }}</span>
              </div>
              <div>
                <span class="block text-sm text-gray-500">Coût</span>
                <span class="font-medium">{{
                  session.cost ? formatCurrency(session.cost) : '-'
                }}</span>
              </div>
            </div>
          </template>
        </Card>

        <!-- Participants -->
        <ParticipantManager
          :participations="session.participations || []"
          :users="users"
          @add="addParticipant"
          @update="updateParticipant"
          @remove="removeParticipant"
        />
      </div>

      <!-- Sidebar -->
      <div class="flex flex-col gap-6">
        <!-- Documents -->
        <Card>
          <template #title>
            <div class="flex justify-between items-center">
              <span>Documents</span>
              <Button
                icon="pi pi-plus"
                text
                rounded
                size="small"
                v-tooltip="'Ajouter un document'"
              />
            </div>
          </template>
          <template #content>
            <div
              v-if="session.documents && session.documents.length > 0"
              class="flex flex-col gap-2"
            >
              <div
                v-for="doc in session.documents"
                :key="doc.id"
                class="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
              >
                <div class="flex items-center gap-2 overflow-hidden">
                  <font-awesome-icon icon="file" class="text-gray-400" />
                  <span class="truncate text-sm">{{ doc.name }}</span>
                </div>
                <Button icon="pi pi-download" text rounded size="small" severity="secondary" />
              </div>
            </div>
            <div v-else class="text-center py-4 text-gray-500 text-sm">Aucun document associé.</div>
          </template>
        </Card>

        <!-- Stats -->
        <Card>
          <template #title>Statistiques</template>
          <template #content>
            <div class="flex flex-col gap-3">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Inscrits</span>
                <span class="font-medium"
                  >{{ session.participations?.length || 0 }} /
                  {{ session.max_participants || '∞' }}</span
                >
              </div>
              <div class="w-full bg-gray-100 rounded-full h-2">
                <div
                  class="bg-blue-500 h-2 rounded-full"
                  :style="{ width: getParticipationPercentage() + '%' }"
                ></div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center py-12">
    <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-gray-500" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTrainingStore } from '@/stores/training'
import { useUserStore } from '@/stores/users'
import ParticipantManager from '@/components/trainings/ParticipantManager.vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import { useToast } from 'primevue/usetoast'

const route = useRoute()
const router = useRouter()
const store = useTrainingStore()
const userStore = useUserStore()
const toast = useToast()

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

// Participant Management
// Participant Management
const addParticipant = async (data: { user_id: number; status: string }) => {
  try {
    await store.addParticipant({
      training_session_id: session.value?.id,
      user_id: data.user_id,
      status: data.status as any,
    })
    toast.add({ severity: 'success', summary: 'Succès', detail: 'Participant ajouté', life: 3000 })
  } catch (e: any) {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: e.message || "Erreur lors de l'ajout",
      life: 3000,
    })
  }
}

const updateParticipant = async (data: any) => {
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
  } catch (e: any) {
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
  } catch (e: any) {
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
