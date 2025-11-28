<template>
  <div class="grid grid-cols-1 gap-4">
    <div class="field">
      <label for="date" class="block text-sm font-medium text-gray-700 mb-1">Date *</label>
      <DatePicker
        id="date"
        v-model="form.date"
        dateFormat="dd/mm/yy"
        class="w-full"
        :class="{ 'p-invalid': errors.date }"
      />
      <small v-if="errors.date" class="text-red-500">{{ errors.date }}</small>
    </div>

    <div class="field">
      <label for="location" class="block text-sm font-medium text-gray-700 mb-1">Lieu *</label>
      <InputText
        id="location"
        v-model="form.location"
        class="w-full"
        :class="{ 'p-invalid': errors.location }"
      />
      <small v-if="errors.location" class="text-red-500">{{ errors.location }}</small>
    </div>

    <div class="field">
      <label for="auditor" class="block text-sm font-medium text-gray-700 mb-1">Auditeur *</label>
      <Select
        id="auditor"
        v-model="form.auditor_id"
        :options="users"
        optionLabel="fullname"
        optionValue="id"
        placeholder="Sélectionner un auditeur"
        class="w-full"
        :class="{ 'p-invalid': errors.auditor_id }"
        filter
      />
      <small v-if="errors.auditor_id" class="text-red-500">{{ errors.auditor_id }}</small>
    </div>

    <div class="field">
      <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Statut *</label>
      <Select
        id="status"
        v-model="form.status"
        :options="statusOptions"
        optionLabel="label"
        optionValue="value"
        class="w-full"
      />
    </div>

    <div class="field">
      <label for="score" class="block text-sm font-medium text-gray-700 mb-1">Score (/100)</label>
      <InputNumber id="score" v-model="form.score" :min="0" :max="100" class="w-full" />
    </div>

    <div class="flex justify-end gap-2 mt-4">
      <Button label="Annuler" text @click="$emit('cancel')">
        <template #icon>
          <font-awesome-icon icon="times" />
        </template>
      </Button>
      <Button label="Enregistrer" @click="save">
        <template #icon>
          <font-awesome-icon icon="check" />
        </template>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { usePlanningStore, type SafetyVisit } from '@/stores/planning'
import { useUserStore } from '@/stores/users'
import { format } from 'date-fns'
import { useToast } from 'primevue/usetoast'

const props = defineProps<{
  visit?: SafetyVisit
}>()

const emit = defineEmits(['save', 'cancel'])

const store = usePlanningStore()
const userStore = useUserStore()
const toast = useToast()

const form = ref({
  date: null as Date | null,
  location: '',
  auditor_id: null as number | null,
  status: 'planned',
  score: null as number | null,
})

const errors = ref<Record<string, string>>({})

const statusOptions = [
  { label: 'Planifiée', value: 'planned' },
  { label: 'Réalisée', value: 'completed' },
  { label: 'Annulée', value: 'cancelled' },
]

const users = computed(() =>
  userStore.users.map((u) => ({
    ...u,
    fullname: `${u.first_name} ${u.last_name}`,
  })),
)

onMounted(async () => {
  if (userStore.users.length === 0) {
    await userStore.fetchUsers()
  }

  if (props.visit) {
    form.value = {
      date: new Date(props.visit.date),
      location: props.visit.location,
      auditor_id: props.visit.auditor_id,
      status: props.visit.status,
      score: props.visit.score,
    }
  }
})

const validate = () => {
  errors.value = {}
  if (!form.value.date) errors.value.date = 'La date est requise'
  if (!form.value.location) errors.value.location = 'Le lieu est requis'
  if (!form.value.auditor_id) errors.value.auditor_id = "L'auditeur est requis"

  return Object.keys(errors.value).length === 0
}

const save = async () => {
  if (!validate()) return

  const data: Partial<SafetyVisit> = {
    ...form.value,
    date: format(form.value.date!, 'yyyy-MM-dd'),
    auditor_id: form.value.auditor_id || undefined,
    score: form.value.score || undefined,
    status: form.value.status as 'planned' | 'completed' | 'cancelled' | undefined,
  }

  try {
    if (props.visit) {
      await store.updateVisit(props.visit.id, data)
      toast.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Visite mise à jour',
        life: 3000,
      })
    } else {
      await store.createVisit(data)
      toast.add({ severity: 'success', summary: 'Succès', detail: 'Visite créée', life: 3000 })
    }
    emit('save')
  } catch (e) {
    console.error(e)
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: "Erreur lors de l'enregistrement",
      life: 3000,
    })
  }
}
</script>
