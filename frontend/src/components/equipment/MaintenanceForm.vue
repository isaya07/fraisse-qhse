<template>
  <div class="maintenance-form">
    <div class="grid grid-cols-1 gap-4">
      <div class="field">
        <label for="type" class="block text-sm font-medium text-gray-700 mb-1"
          >Type d'intervention *</label
        >
        <Select
          id="type"
          v-model="form.type"
          :options="typeOptions"
          optionLabel="label"
          optionValue="value"
          class="w-full"
          :class="{ 'p-invalid': errors.type }"
        />
        <small v-if="errors.type" class="text-red-500">{{ errors.type }}</small>
      </div>

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
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1"
          >Description *</label
        >
        <Textarea
          id="description"
          v-model="form.description"
          rows="3"
          class="w-full"
          :class="{ 'p-invalid': errors.description }"
        />
        <small v-if="errors.description" class="text-red-500">{{ errors.description }}</small>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="field">
          <label for="performer" class="block text-sm font-medium text-gray-700 mb-1"
            >Intervenant *</label
          >
          <InputText
            id="performer"
            v-model="form.performer"
            class="w-full"
            :class="{ 'p-invalid': errors.performer }"
          />
          <small v-if="errors.performer" class="text-red-500">{{ errors.performer }}</small>
        </div>

        <div class="field">
          <label for="cost" class="block text-sm font-medium text-gray-700 mb-1">Coût (€)</label>
          <InputNumber
            id="cost"
            v-model="form.cost"
            mode="currency"
            currency="EUR"
            locale="fr-FR"
            class="w-full"
          />
        </div>
      </div>

      <div class="field">
        <label for="result" class="block text-sm font-medium text-gray-700 mb-1">Résultat *</label>
        <Select
          id="result"
          v-model="form.result"
          :options="resultOptions"
          optionLabel="label"
          optionValue="value"
          class="w-full"
          :class="{ 'p-invalid': errors.result }"
        />
        <small v-if="errors.result" class="text-red-500">{{ errors.result }}</small>
      </div>

      <div class="field">
        <label for="next_maintenance_date" class="block text-sm font-medium text-gray-700 mb-1"
          >Prochaine maintenance</label
        >
        <DatePicker
          id="next_maintenance_date"
          v-model="form.next_maintenance_date"
          dateFormat="dd/mm/yy"
          class="w-full"
        />
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
      <Button label="Enregistrer" icon="pi pi-check" @click="save" :loading="store.loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEquipmentStore } from '@/stores/equipment'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'
import { format } from 'date-fns'

const props = defineProps<{
  equipmentId: number
}>()

const emit = defineEmits(['save', 'cancel'])

const store = useEquipmentStore()

const form = ref({
  type: 'periodic_check',
  date: new Date(),
  description: '',
  cost: null as number | null,
  performer: '',
  result: 'compliant',
  next_maintenance_date: null as Date | null,
  document_path: '',
})

const errors = ref<Record<string, string>>({})

const typeOptions = [
  { label: 'Contrôle Périodique', value: 'periodic_check' },
  { label: 'Réparation', value: 'repair' },
  { label: 'Calibration', value: 'calibration' },
]

const resultOptions = [
  { label: 'Conforme', value: 'compliant' },
  { label: 'Non Conforme', value: 'non_compliant' },
  { label: 'Réparé', value: 'fixed' },
]

const validate = () => {
  errors.value = {}
  if (!form.value.type) errors.value.type = 'Le type est requis'
  if (!form.value.date) errors.value.date = 'La date est requise'
  if (!form.value.description) errors.value.description = 'La description est requise'
  if (!form.value.performer) errors.value.performer = "L'intervenant est requis"
  if (!form.value.result) errors.value.result = 'Le résultat est requis'

  return Object.keys(errors.value).length === 0
}

const save = async () => {
  if (!validate()) return

  const data = {
    equipment_id: props.equipmentId,
    ...form.value,
    type: form.value.type as 'periodic_check' | 'repair' | 'calibration',
    result: form.value.result as 'compliant' | 'non_compliant' | 'fixed',
    date: format(form.value.date, 'yyyy-MM-dd'),
    next_maintenance_date: form.value.next_maintenance_date
      ? format(form.value.next_maintenance_date, 'yyyy-MM-dd')
      : null,
  }

  try {
    await store.createMaintenanceLog(data)
    emit('save')
  } catch (e) {
    console.error(e)
  }
}
</script>
