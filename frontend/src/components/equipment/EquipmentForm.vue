<template>
  <div class="equipment-form">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Basic Info -->
      <div class="field">
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nom de l'équipement *</label>
        <InputText id="name" v-model="form.name" class="w-full" :class="{ 'p-invalid': errors.name }" />
        <small v-if="errors.name" class="text-red-500">{{ errors.name }}</small>
      </div>

      <div class="field">
        <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
        <Select id="category" v-model="form.category_id" :options="store.categories" optionLabel="name" optionValue="id"
          placeholder="Sélectionner une catégorie" class="w-full" :class="{ 'p-invalid': errors.category_id }" />
        <small v-if="errors.category_id" class="text-red-500">{{ errors.category_id }}</small>
      </div>

      <div class="field">
        <label for="serial_number" class="block text-sm font-medium text-gray-700 mb-1">Numéro de série *</label>
        <InputText id="serial_number" v-model="form.serial_number" class="w-full"
          :class="{ 'p-invalid': errors.serial_number }" />
        <small v-if="errors.serial_number" class="text-red-500">{{ errors.serial_number }}</small>
      </div>

      <div class="field">
        <label for="internal_ref" class="block text-sm font-medium text-gray-700 mb-1">Référence interne</label>
        <InputText id="internal_ref" v-model="form.internal_ref" class="w-full" />
      </div>

      <div class="field">
        <label for="brand" class="block text-sm font-medium text-gray-700 mb-1">Marque</label>
        <InputText id="brand" v-model="form.brand" class="w-full" />
      </div>

      <div class="field">
        <label for="model" class="block text-sm font-medium text-gray-700 mb-1">Modèle</label>
        <InputText id="model" v-model="form.model" class="w-full" />
      </div>

      <!-- Dates & Status -->
      <div class="field">
        <label for="purchase_date" class="block text-sm font-medium text-gray-700 mb-1">Date d'achat *</label>
        <DatePicker id="purchase_date" v-model="form.purchase_date" dateFormat="dd/mm/yy" class="w-full"
          :class="{ 'p-invalid': errors.purchase_date }" />
        <small v-if="errors.purchase_date" class="text-red-500">{{ errors.purchase_date }}</small>
      </div>

      <div class="field">
        <label for="expiration_date" class="block text-sm font-medium text-gray-700 mb-1">Date d'expiration</label>
        <DatePicker id="expiration_date" v-model="form.expiration_date" dateFormat="dd/mm/yy" class="w-full" />
      </div>

      <div class="field">
        <label for="maintenance_frequency_months" class="block text-sm font-medium text-gray-700 mb-1">Fréquence de
          contrôle (mois)</label>
        <InputNumber id="maintenance_frequency_months" v-model="form.maintenance_frequency_months" class="w-full"
          :min="0" showButtons />
      </div>

      <div class="field">
        <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Statut *</label>
        <Select id="status" v-model="form.status" :options="statusOptions" optionLabel="label" optionValue="value"
          class="w-full" :class="{ 'p-invalid': errors.status }" />
      </div>

      <div class="field">
        <label for="location" class="block text-sm font-medium text-gray-700 mb-1">Localisation *</label>
        <Select id="location" v-model="form.location" :options="locationOptions" optionLabel="label" optionValue="value"
          class="w-full" :class="{ 'p-invalid': errors.location }" />
      </div>

      <div class="field col-span-1 md:col-span-2">
        <label for="image_path" class="block text-sm font-medium text-gray-700 mb-1">URL Image</label>
        <InputText id="image_path" v-model="form.image_path" class="w-full" placeholder="https://..." />
      </div>
    </div>

    <div class="flex justify-end gap-2 mt-6">
      <Button label="Annuler" icon="pi pi-times" severity="secondary" text @click="$emit('cancel')" />
      <Button label="Enregistrer" icon="pi pi-check" @click="save" :loading="store.loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useEquipmentStore, type Equipment } from '@/stores/equipment'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import { format } from 'date-fns'

import { useToast } from 'primevue/usetoast'

const props = defineProps<{
  equipment?: Equipment
}>()

const emit = defineEmits(['save', 'cancel'])

const store = useEquipmentStore()
const toast = useToast()

const form = ref({
  name: '',
  category_id: null as number | null,
  serial_number: '',
  internal_ref: '' as string | null,
  brand: '' as string | null,
  model: '' as string | null,
  purchase_date: null as Date | null,
  expiration_date: null as Date | null,
  maintenance_frequency_months: null as number | null,
  status: 'available',
  location: 'warehouse',
  image_path: '' as string | null,
})

const errors = ref<Record<string, string>>({})

const statusOptions = [
  { label: 'Disponible', value: 'available' },
  { label: 'Affecté', value: 'assigned' },
  { label: 'En Maintenance', value: 'maintenance' },
  { label: 'Hors Service', value: 'broken' },
  { label: 'Rebuté', value: 'retired' },
]

const locationOptions = [
  { label: 'Magasin', value: 'warehouse' },
  { label: 'Atelier', value: 'workshop' },
  { label: 'Bureau', value: 'office' },
  { label: 'Véhicule', value: 'vehicle' },
  { label: 'Chantier', value: 'site' },
]

onMounted(() => {
  if (props.equipment) {
    form.value = {
      name: props.equipment.name,
      category_id: props.equipment.category_id,
      serial_number: props.equipment.serial_number,
      internal_ref: props.equipment.internal_ref,
      brand: props.equipment.brand,
      model: props.equipment.model,
      purchase_date: props.equipment.purchase_date ? new Date(props.equipment.purchase_date) : null,
      expiration_date: props.equipment.expiration_date
        ? new Date(props.equipment.expiration_date)
        : null,
      maintenance_frequency_months: props.equipment.maintenance_frequency_months,
      status: props.equipment.status,
      location: props.equipment.location,
      image_path: props.equipment.image_path,
    }
  }
})

const validate = () => {
  errors.value = {}
  if (!form.value.name) errors.value.name = 'Le nom est requis'
  if (!form.value.category_id) errors.value.category_id = 'La catégorie est requise'
  if (!form.value.serial_number) errors.value.serial_number = 'Le numéro de série est requis'
  if (!form.value.purchase_date) errors.value.purchase_date = "La date d'achat est requise"
  if (!form.value.status) errors.value.status = 'Le statut est requis'
  if (!form.value.location) errors.value.location = 'La localisation est requise'

  return Object.keys(errors.value).length === 0
}

const save = async () => {
  if (!validate()) return

  const data = {
    ...form.value,
    category_id: form.value.category_id || undefined,
    status: form.value.status as 'available' | 'assigned' | 'maintenance' | 'broken' | 'retired',
    location: form.value.location as 'warehouse' | 'workshop' | 'office' | 'vehicle' | 'site',
    purchase_date: form.value.purchase_date ? format(form.value.purchase_date, 'yyyy-MM-dd') : undefined,
    expiration_date: form.value.expiration_date
      ? format(form.value.expiration_date, 'yyyy-MM-dd')
      : null,
  }

  try {
    if (props.equipment) {
      await store.updateEquipment(props.equipment.id, data)
      toast.add({ severity: 'success', summary: 'Succès', detail: 'Équipement mis à jour', life: 3000 })
    } else {
      await store.createEquipment(data)
      toast.add({ severity: 'success', summary: 'Succès', detail: 'Équipement créé', life: 3000 })
    }
    emit('save')
  } catch (e) {
    console.error(e)
    toast.add({ severity: 'error', summary: 'Erreur', detail: "Une erreur est survenue lors de l'enregistrement", life: 3000 })
  }
}
</script>
