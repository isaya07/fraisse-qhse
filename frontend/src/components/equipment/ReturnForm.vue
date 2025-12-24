<template>
  <div class="return-form">
    <div class="grid grid-cols-1 gap-4">
      <div class="field">
        <label for="returned_at" class="block text-sm font-medium text-color-secondary mb-1"
          >Date de retour *</label
        >
        <DatePicker
          id="returned_at"
          v-model="form.returned_at"
          showTime
          dateFormat="dd/mm/yy"
          class="w-full"
          :class="{ 'p-invalid': errors.returned_at }"
        />
        <small v-if="errors.returned_at" class="text-red-500">{{ errors.returned_at }}</small>
      </div>

      <div class="field">
        <label for="location" class="block text-sm font-medium text-color-secondary mb-1"
          >Nouvelle Localisation *</label
        >
        <Select
          id="location"
          v-model="form.location"
          :options="locationOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Sélectionner un emplacement"
          class="w-full"
          :class="{ 'p-invalid': errors.location }"
        />
        <small v-if="errors.location" class="text-red-500">{{ errors.location }}</small>
      </div>

      <div class="field">
        <label for="notes" class="block text-sm font-medium text-color-secondary mb-1"
          >Notes / État</label
        >
        <Textarea
          id="notes"
          v-model="form.notes"
          rows="3"
          class="w-full"
          placeholder="État de l'équipement au retour..."
        />
      </div>
    </div>

    <div class="flex justify-end gap-2 mt-6">
      <Button label="Annuler" severity="secondary" text @click="$emit('cancel')">
        <template #icon>
          <font-awesome-icon icon="xmark" class="mr-2" />
        </template>
      </Button>
      <Button label="Confirmer le retour" @click="save" :loading="store.loading">
        <template #icon>
          <font-awesome-icon icon="check" class="mr-2" />
        </template>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEquipmentStore } from '@/stores/equipment'
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

const form = ref({
  returned_at: new Date(),
  location: 'warehouse',
  notes: '',
})

const locationOptions = [
  { label: 'Magasin', value: 'warehouse' },
  { label: 'Atelier', value: 'workshop' },
  { label: 'Bureau', value: 'office' },
  { label: 'Véhicule', value: 'vehicle' },
  { label: 'Chantier', value: 'site' },
]

const errors = ref<Record<string, string>>({})

const validate = () => {
  errors.value = {}
  if (!form.value.returned_at) errors.value.returned_at = 'La date est requise'
  if (!form.value.location) errors.value.location = 'La localisation est requise'

  return Object.keys(errors.value).length === 0
}

const save = async () => {
  if (!validate()) return

  const data = {
    returned_at: format(form.value.returned_at, 'yyyy-MM-dd HH:mm:ss'),
    location: form.value.location,
    notes: form.value.notes,
  }

  try {
    await store.returnEquipment(props.equipmentId, data)
    emit('save')
  } catch (e) {
    console.error(e)
  }
}
</script>
