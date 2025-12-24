<template>
  <LinkedDocuments
    :documents="equipment.documents"
    :loading="loading"
    @request-create="onDocumentSubmit"
    @request-link="onLinkDocument"
    @request-download="downloadDocument"
    @request-unlink="onUnlinkDocument"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useEquipmentStore } from '@/stores/equipment'
import { useApi } from '@/composables/useApi'
import LinkedDocuments from '@/components/common/LinkedDocuments.vue'
import { format } from 'date-fns'

const props = defineProps<{
  equipment: any
}>()

const toast = useToast()
const store = useEquipmentStore()
const { get, post, del } = useApi()

const loading = ref(false)

const onDocumentSubmit = async (data: any) => {
  loading.value = true
  try {
    const formData = new FormData()

    // Append all text fields
    Object.keys(data).forEach((key) => {
      if (key !== 'file' && data[key] !== null && data[key] !== undefined) {
        if (data[key] instanceof Date) {
          formData.append(key, format(data[key], 'yyyy-MM-dd'))
        } else {
          formData.append(key, data[key])
        }
      }
    })

    // Append file
    if (data.file) {
      formData.append('file', data.file)
    }

    // Append equipment_id
    formData.append('equipment_id', props.equipment.id.toString())

    const response = await post('/documents', formData)

    if (response.success) {
      toast.add({ severity: 'success', summary: 'Succès', detail: 'Document ajouté', life: 3000 })
      await store.fetchEquipmentDetail(props.equipment.id)
    } else {
      throw new Error(response.error || "Erreur lors de l'ajout")
    }
  } catch (error: any) {
    console.error(error)
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: error.message || "Échec de l'upload",
      life: 3000,
    })
  } finally {
    loading.value = false
  }
}

const onLinkDocument = async (doc: any) => {
  try {
    const response = await post(`/equipment/${props.equipment.id}/documents`, {
      document_id: doc.id,
    })

    if (response.success) {
      toast.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Document lié avec succès',
        life: 3000,
      })
      await store.fetchEquipmentDetail(props.equipment.id)
    } else {
      toast.add({
        severity: 'error',
        summary: 'Erreur',
        detail: response.error || 'Erreur lors de la liaison',
        life: 3000,
      })
    }
  } catch (error) {
    console.error(error)
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Erreur lors de la liaison',
      life: 3000,
    })
  }
}

const onUnlinkDocument = async (doc: any) => {
  try {
    const response = await del(`/equipment/${props.equipment.id}/documents/${doc.id}`)

    if (response.success) {
      toast.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Document délié avec succès',
        life: 3000,
      })
      await store.fetchEquipmentDetail(props.equipment.id)
    } else {
      toast.add({
        severity: 'error',
        summary: 'Erreur',
        detail: response.error || 'Erreur lors du déliage',
        life: 3000,
      })
    }
  } catch (error) {
    console.error(error)
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Erreur lors du déliage',
      life: 3000,
    })
  }
}

const downloadDocument = async (doc: any) => {
  try {
    const response = await get(`/documents/${doc.id}/download`, {
      responseType: 'blob',
    })

    if (response.success && response.data) {
      const url = window.URL.createObjectURL(response.data as Blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', doc.filename)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } else {
      toast.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Impossible de télécharger le fichier',
        life: 3000,
      })
    }
  } catch (error) {
    console.error(error)
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Erreur de téléchargement',
      life: 3000,
    })
  }
}
</script>
