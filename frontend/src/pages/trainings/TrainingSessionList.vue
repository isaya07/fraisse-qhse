<template>
  <div class="p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Sessions de formation</h1>
      <Button label="Nouvelle session" @click="openSessionDialog">
        <template #icon>
          <font-awesome-icon icon="plus" class="mr-2" />
        </template>
      </Button>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-gray-500" />
    </div>

    <div v-else>
      <SessionList :sessions="store.sessions" @view="viewSession" @edit="editSession" />
    </div>

    <!-- Dialog Session -->
    <Dialog
      v-model:visible="sessionDialogVisible"
      :header="editingSession ? 'Modifier la session' : 'Nouvelle session'"
      :modal="true"
      class="p-fluid w-full max-w-lg"
    >
      <div class="field">
        <label for="training">Formation</label>
        <Dropdown
          id="training"
          v-model="sessionForm.training_id"
          :options="store.trainings"
          optionLabel="title"
          optionValue="id"
          placeholder="Sélectionnez une formation"
          filter
        />
      </div>

      <div class="field mt-4">
        <label for="organization">Organisme</label>
        <Dropdown
          id="organization"
          v-model="sessionForm.training_organization_id"
          :options="store.organizations"
          optionLabel="name"
          optionValue="id"
          placeholder="Sélectionnez un organisme"
          filter
          showClear
        />
      </div>

      <div class="grid grid-cols-2 gap-4 mt-4">
        <div class="field">
          <label for="startDate">Date de début</label>
          <DatePicker
            id="startDate"
            v-model="sessionForm.start_date"
            showIcon
            showTime
            hourFormat="24"
          />
        </div>
        <div class="field">
          <label for="endDate">Date de fin</label>
          <DatePicker
            id="endDate"
            v-model="sessionForm.end_date"
            showIcon
            showTime
            hourFormat="24"
          />
        </div>
      </div>

      <div class="field mt-4">
        <label for="location">Lieu</label>
        <InputText id="location" v-model="sessionForm.location" />
      </div>

      <div class="field mt-4">
        <label for="instructor">Formateur</label>
        <InputText id="instructor" v-model="sessionForm.instructor" />
      </div>

      <div class="grid grid-cols-2 gap-4 mt-4">
        <div class="field">
          <label for="maxParticipants">Max participants</label>
          <InputNumber id="maxParticipants" v-model="sessionForm.max_participants" :min="1" />
        </div>
        <div class="field">
          <label for="cost">Coût (€)</label>
          <InputNumber
            id="cost"
            v-model="sessionForm.cost"
            mode="currency"
            currency="EUR"
            locale="fr-FR"
          />
        </div>
      </div>

      <div class="field mt-4">
        <label for="status">Statut</label>
        <Dropdown
          id="status"
          v-model="sessionForm.status"
          :options="statusOptions"
          optionLabel="label"
          optionValue="value"
        />
      </div>

      <template #footer>
        <Button label="Annuler" text severity="secondary" @click="closeSessionDialog" />
        <Button label="Enregistrer" @click="saveSession" />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useTrainingStore, type TrainingSession } from '@/stores/training'
import SessionList from '@/components/trainings/SessionList.vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import DatePicker from 'primevue/datepicker'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const store = useTrainingStore()
const toast = useToast()

const loading = computed(() => store.loading)

const statusOptions = [
  { label: 'Planifiée', value: 'planned' },
  { label: 'Réalisée', value: 'completed' },
  { label: 'Annulée', value: 'cancelled' },
]

const sessionDialogVisible = ref(false)
const editingSession = ref<TrainingSession | null>(null)
const sessionForm = ref({
  training_id: null as number | null,
  training_organization_id: null as number | null,
  start_date: null as Date | null,
  end_date: null as Date | null,
  location: '',
  instructor: '',
  max_participants: null as number | null,
  cost: null as number | null,
  status: 'planned' as string,
})

watch(
  [() => sessionForm.value.training_id, () => sessionForm.value.start_date],
  ([newTrainingId, newStartDate]) => {
    // Auto-calculate end date only when creating a new session
    if (!editingSession.value && newTrainingId && newStartDate) {
      const training = store.trainings.find((t) => t.id === newTrainingId)
      if (training && training.duration_hours) {
        const endDate = new Date(newStartDate)
        const durationMs = training.duration_hours * 60 * 60 * 1000
        endDate.setTime(endDate.getTime() + durationMs)
        sessionForm.value.end_date = endDate
      }
    }
  },
)

const viewSession = (session: TrainingSession) => {
  router.push(`/trainings/sessions/${session.id}`)
}

const openSessionDialog = () => {
  editingSession.value = null
  sessionForm.value = {
    training_id: null,
    training_organization_id: null,
    start_date: new Date(),
    end_date: new Date(),
    location: '',
    instructor: '',
    max_participants: null,
    cost: null,
    status: 'planned',
  }
  sessionDialogVisible.value = true
}

const editSession = (session: TrainingSession) => {
  editingSession.value = session
  sessionForm.value = {
    training_id: session.training_id,
    training_organization_id: session.training_organization_id,
    start_date: new Date(session.start_date),
    end_date: new Date(session.end_date),
    location: session.location,
    instructor: session.instructor || '',
    max_participants: session.max_participants,
    cost: session.cost,
    status: session.status,
  }
  sessionDialogVisible.value = true
}

const closeSessionDialog = () => {
  sessionDialogVisible.value = false
  editingSession.value = null
}

const saveSession = async () => {
  if (
    !sessionForm.value.training_id ||
    !sessionForm.value.start_date ||
    !sessionForm.value.end_date ||
    !sessionForm.value.location
  ) {
    toast.add({
      severity: 'warn',
      summary: 'Attention',
      detail: 'Veuillez remplir les champs obligatoires',
      life: 3000,
    })
    return
  }

  const payload = {
    ...sessionForm.value,
    start_date: sessionForm.value.start_date.toISOString(),
    end_date: sessionForm.value.end_date.toISOString(),
  }

  try {
    if (editingSession.value) {
      await store.updateSession(editingSession.value.id, payload)
      toast.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Session mise à jour',
        life: 3000,
      })
    } else {
      await store.createSession(payload)
      toast.add({ severity: 'success', summary: 'Succès', detail: 'Session créée', life: 3000 })
    }
    closeSessionDialog()
  } catch (e) {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Une erreur est survenue',
      life: 3000,
    })
  }
}

onMounted(async () => {
  await Promise.all([store.fetchSessions(), store.fetchTrainings(), store.fetchOrganizations()])
})
</script>
