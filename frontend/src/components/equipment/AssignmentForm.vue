<template>
  <div class="assignment-form">
    <div class="grid grid-cols-1 gap-4">
      <div class="field">
        <label for="user" class="block text-sm font-medium text-gray-700 mb-1">Utilisateur *</label>
        <Select
          id="user"
          v-model="form.user_id"
          :options="users"
          optionLabel="fullname"
          optionValue="id"
          placeholder="Sélectionner un utilisateur"
          class="w-full"
          :class="{ 'p-invalid': errors.user_id }"
          filter
        />
        <small v-if="errors.user_id" class="text-red-500">{{ errors.user_id }}</small>
      </div>

      <div class="field">
        <label for="assigned_at" class="block text-sm font-medium text-gray-700 mb-1"
          >Date d'affectation *</label
        >
        <DatePicker
          id="assigned_at"
          v-model="form.assigned_at"
          showTime
          dateFormat="dd/mm/yy"
          class="w-full"
          :class="{ 'p-invalid': errors.assigned_at }"
        />
        <small v-if="errors.assigned_at" class="text-red-500">{{ errors.assigned_at }}</small>
      </div>

      <div class="field">
        <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <Textarea id="notes" v-model="form.notes" rows="3" class="w-full" />
      </div>
    </div>

    <div class="flex justify-end gap-2 mt-6">
      <Button
        label="Annuler"
        icon="pi pi-times"
        severity="secondary"
        text
        @click="$emit('cancel')"
      />
      <Button label="Affecter" icon="pi pi-check" @click="save" :loading="store.loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useEquipmentStore } from '@/stores/equipment'
import { useUserStore } from '@/stores/users'
import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import { format } from 'date-fns'

const props = defineProps<{
  equipmentId: number
}>()

const emit = defineEmits(['save', 'cancel'])

const store = useEquipmentStore()
const userStore = useUserStore()

const form = ref({
  user_id: null as number | null,
  assigned_at: new Date(),
  notes: '',
})

const errors = ref<Record<string, string>>({})

// Computed property to format users for dropdown
const users = computed(() => {
  return userStore.users.map((u) => ({
    ...u,
    fullname: `${u.first_name} ${u.last_name}`,
  }))
})

onMounted(async () => {
  if (userStore.users.length === 0) {
    await userStore.fetchUsers()
  }
})

const validate = () => {
  errors.value = {}
  if (!form.value.user_id) errors.value.user_id = "L'utilisateur est requis"
  if (!form.value.assigned_at) errors.value.assigned_at = 'La date est requise'

  return Object.keys(errors.value).length === 0
}

const save = async () => {
  if (!validate()) return

  const data = {
    user_id: form.value.user_id!,
    assigned_at: format(form.value.assigned_at, 'yyyy-MM-dd HH:mm:ss'),
    notes: form.value.notes,
  }

  try {
    await store.assignEquipment(props.equipmentId, data)
    emit('save')
  } catch (e) {
    console.error(e)
  }
}
</script>
