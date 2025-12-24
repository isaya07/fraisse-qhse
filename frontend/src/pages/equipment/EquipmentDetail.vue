<template>
  <div class="p-4" v-if="equipment">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div class="flex items-center gap-4">
        <Button text rounded @click="router.back()">
          <template #icon>
            <font-awesome-icon icon="arrow-left" />
          </template>
        </Button>
        <div>
          <h2>{{ equipment.name }}</h2>
          <p class="text-color-secondary">
            {{ equipment.category?.name }} • {{ equipment.brand }} {{ equipment.model }}
          </p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Info Column -->
      <div class="lg:col-span-1 space-y-6">
        <EquipmentInfo :equipment="equipment" @edit="openEditDialog" @delete="confirmDelete" />

        <!-- Current Assignment -->
        <Card v-if="equipment.current_assignment">
          <template #content>
            <div class="mb-4">
              <h4>Affectation en cours</h4>
            </div>
            <div class="flex items-center gap-4 mb-4">
              <div
                class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl"
              >
                <font-awesome-icon icon="user" />
              </div>
              <div>
                <p class="font-bold text-color">
                  {{ equipment.current_assignment.user?.first_name }}
                  {{ equipment.current_assignment.user?.last_name }}
                </p>
                <p class="text-sm text-color-secondary">
                  Depuis le {{ formatDateTime(equipment.current_assignment.assigned_at) }}
                </p>
              </div>
            </div>
            <div
              v-if="equipment.current_assignment.notes"
              class="bg-surface-100 dark:bg-surface-800 p-3 rounded text-sm text-color-secondary italic"
            >
              "{{ equipment.current_assignment.notes }}"
            </div>
          </template>
        </Card>

        <EquipmentDocuments :equipment="equipment" />
      </div>

      <!-- History Column -->
      <div class="lg:col-span-2 space-y-6">
        <EquipmentMaintenance
          :maintenance-logs="store.maintenanceLogs"
          @add-maintenance="openMaintenanceDialog"
        />

        <EquipmentAssignments
          :assignments="equipment.assignments || []"
          :status="equipment.status"
          @assign="openAssignDialog"
          @return="openReturnDialog"
        />
      </div>
    </div>

    <!-- Dialogs -->
    <Dialog
      v-model:visible="maintenanceDialogVisible"
      header="Nouvelle Maintenance"
      :modal="true"
      class="p-fluid w-full max-w-lg"
    >
      <MaintenanceForm
        v-if="equipment"
        :equipment-id="equipment.id"
        @save="onMaintenanceSaved"
        @cancel="maintenanceDialogVisible = false"
      />
    </Dialog>

    <Dialog
      v-model:visible="assignmentDialogVisible"
      header="Affecter l'équipement"
      :modal="true"
      class="p-fluid w-full max-w-lg"
    >
      <AssignmentForm
        v-if="equipment"
        :equipment-id="equipment.id"
        @save="onAssignmentSaved"
        @cancel="assignmentDialogVisible = false"
      />
    </Dialog>

    <Dialog
      v-model:visible="returnDialogVisible"
      header="Retourner l'équipement"
      :modal="true"
      class="p-fluid w-full max-w-lg"
    >
      <ReturnForm
        v-if="equipment"
        :equipment-id="equipment.id"
        @save="onReturnSaved"
        @cancel="returnDialogVisible = false"
      />
    </Dialog>

    <Dialog
      v-model:visible="editDialogVisible"
      header="Modifier l'équipement"
      :modal="true"
      class="p-fluid w-full max-w-2xl"
    >
      <EquipmentForm
        v-if="equipment"
        :equipment="equipment"
        @save="onEditSaved"
        @cancel="editDialogVisible = false"
      />
    </Dialog>
  </div>
  <div v-else class="flex justify-center py-12">
    <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-color-secondary" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEquipmentStore } from '@/stores/equipment'
import MaintenanceForm from '@/components/equipment/MaintenanceForm.vue'
import AssignmentForm from '@/components/equipment/AssignmentForm.vue'
import ReturnForm from '@/components/equipment/ReturnForm.vue'
import EquipmentForm from '@/components/equipment/EquipmentForm.vue'
import EquipmentDocuments from '@/components/equipment/EquipmentDocuments.vue'
import EquipmentInfo from '@/components/equipment/detail/EquipmentInfo.vue'
import EquipmentMaintenance from '@/components/equipment/detail/EquipmentMaintenance.vue'
import EquipmentAssignments from '@/components/equipment/detail/EquipmentAssignments.vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Card from 'primevue/card'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'

const route = useRoute()
const router = useRouter()
const store = useEquipmentStore()
const confirm = useConfirm()
const toast = useToast()

const equipment = computed(() => store.currentEquipment)
const maintenanceDialogVisible = ref(false)
const assignmentDialogVisible = ref(false)
const returnDialogVisible = ref(false)
const editDialogVisible = ref(false)

const formatDateTime = (date: string) => {
  return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: fr })
}

const openEditDialog = () => {
  editDialogVisible.value = true
}
const openAssignDialog = () => {
  assignmentDialogVisible.value = true
}
const openReturnDialog = () => {
  returnDialogVisible.value = true
}
const openMaintenanceDialog = () => {
  maintenanceDialogVisible.value = true
}

const onMaintenanceSaved = () => {
  maintenanceDialogVisible.value = false
}

const onAssignmentSaved = () => {
  assignmentDialogVisible.value = false
}

const onReturnSaved = () => {
  returnDialogVisible.value = false
}

const onEditSaved = () => {
  editDialogVisible.value = false
}

const confirmDelete = () => {
  confirm.require({
    message: 'Êtes-vous sûr de vouloir supprimer cet équipement ?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      if (equipment.value) {
        try {
          await store.deleteEquipment(equipment.value.id)
          toast.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Équipement supprimé',
            life: 3000,
          })
          router.push('/equipment')
        } catch (error) {
          console.error(error)
          toast.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Erreur lors de la suppression',
            life: 3000,
          })
        }
      }
    },
  })
}

onMounted(async () => {
  const id = Number(route.params.id)
  if (id) {
    await store.fetchEquipmentDetail(id)
    await store.fetchMaintenanceLogs(id)
  }
})
</script>
