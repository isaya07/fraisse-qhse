<template>
  <div class="grid grid-cols-1 gap-4">
    <div class="field">
      <label for="date" class="block text-sm font-medium text-color-secondary mb-1">Date *</label>
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
      <label for="topic" class="block text-sm font-medium text-color-secondary mb-1">Sujet *</label>
      <InputText
        id="topic"
        v-model="form.topic"
        class="w-full"
        :class="{ 'p-invalid': errors.topic }"
      />
      <small v-if="errors.topic" class="text-red-500">{{ errors.topic }}</small>
    </div>

    <div class="field">
      <label for="location" class="block text-sm font-medium text-color-secondary mb-1">Lieu *</label>
      <InputText
        id="location"
        v-model="form.location"
        class="w-full"
        :class="{ 'p-invalid': errors.location }"
      />
      <small v-if="errors.location" class="text-red-500">{{ errors.location }}</small>
    </div>

    <div class="field">
      <label for="instructor" class="block text-sm font-medium text-color-secondary mb-1"
        >Animateur *</label
      >
      <Select
        id="instructor"
        v-model="form.instructor_id"
        :options="users"
        optionLabel="fullname"
        optionValue="id"
        placeholder="Sélectionner un animateur"
        class="w-full"
        :class="{ 'p-invalid': errors.instructor_id }"
        filter
      />
      <small v-if="errors.instructor_id" class="text-red-500">{{ errors.instructor_id }}</small>
    </div>

    <div class="field">
      <label for="attendees" class="block text-sm font-medium text-color-secondary mb-1"
        >Participants</label
      >
      <MultiSelect
        id="attendees"
        v-model="form.attendees"
        :options="users"
        optionLabel="fullname"
        optionValue="id"
        placeholder="Sélectionner les participants"
        class="w-full"
        display="chip"
        filter
      />
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
import { usePlanningStore, type ToolboxTalk } from '@/stores/planning'
import { useUserStore } from '@/stores/users'
import { format } from 'date-fns'
import { useToast } from 'primevue/usetoast'

const props = defineProps<{
  talk?: ToolboxTalk
}>()

const emit = defineEmits(['save', 'cancel'])

const store = usePlanningStore()
const userStore = useUserStore()
const toast = useToast()

const form = ref({
  date: null as Date | null,
  topic: '',
  location: '',
  instructor_id: null as number | null,
  attendees: [] as number[],
})

const errors = ref<Record<string, string>>({})

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

  if (props.talk) {
    form.value = {
      date: new Date(props.talk.date),
      topic: props.talk.topic,
      location: props.talk.location,
      instructor_id: props.talk.instructor_id,
      attendees: props.talk.attendees?.map((a) => a.id) || [],
    }
  }
})

const validate = () => {
  errors.value = {}
  if (!form.value.date) errors.value.date = 'La date est requise'
  if (!form.value.topic) errors.value.topic = 'Le sujet est requis'
  if (!form.value.location) errors.value.location = 'Le lieu est requis'
  if (!form.value.instructor_id) errors.value.instructor_id = "L'animateur est requis"

  return Object.keys(errors.value).length === 0
}

const save = async () => {
  if (!validate()) return

  // We use 'any' here because the store expects a partial ToolboxTalk where attendees are objects,
  // but for creation/update we send IDs. The store action signature should ideally reflect this duality.
  const data: any = {
    ...form.value,
    date: format(form.value.date!, 'yyyy-MM-dd'),
    instructor_id: form.value.instructor_id || undefined,
  }

  try {
    if (props.talk) {
      await store.updateTalk(props.talk.id, data)
      toast.add({
        severity: 'success',
        summary: 'Succès',
        detail: '1/4h Sécurité mis à jour',
        life: 3000,
      })
    } else {
      await store.createTalk(data as any)
      toast.add({
        severity: 'success',
        summary: 'Succès',
        detail: '1/4h Sécurité créé',
        life: 3000,
      })
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
