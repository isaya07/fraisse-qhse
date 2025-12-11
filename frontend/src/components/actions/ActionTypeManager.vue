<template>
  <Drawer
    :visible="visible"
    @update:visible="emit('update:visible', $event)"
    position="right"
    :style="{ width: '40rem' }"
  >
    <template #header>
      <div class="flex items-center gap-2">
        <font-awesome-icon icon="tags" class="text-xl text-primary" />
        <span class="text-xl font-bold">Gérer les types d'actions</span>
      </div>
    </template>

    <div class="flex flex-col h-full">
      <!-- Liste des types -->
      <div class="flex-1 overflow-y-auto mb-4 custom-scrollbar pr-2">
        <div v-if="loading" class="flex justify-center py-8">
          <font-awesome-icon icon="spinner" spin size="2x" class="text-color-secondary" />
        </div>

        <div v-else-if="types.length === 0" class="text-center py-8 text-color-secondary">
          <p>Aucun type d'action défini</p>
        </div>

        <div v-else class="flex flex-col gap-3">
          <div
            v-for="type in types"
            :key="type.id"
            @click="editType(type)"
            class="relative flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group"
            :class="[
              editingType?.id === type.id
                ? 'border-primary bg-primary-50 dark:bg-primary-900/20'
                : 'border-surface-border bg-surface-card hover:border-primary-200 hover:shadow-sm',
            ]"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm"
                :style="{ backgroundColor: type.color || '#3b82f6' }"
              >
                <font-awesome-icon :icon="type.icon || 'tag'" class="text-lg" />
              </div>
              <div>
                <div class="font-bold text-color text-base mb-0.5">{{ type.name }}</div>
                <div class="text-sm text-color-secondary line-clamp-2 leading-tight">
                  {{ type.description }}
                </div>
              </div>
            </div>

            <div class="ml-2" v-if="editingType?.id !== type.id">
              <Button
                icon="pi pi-trash"
                text
                rounded
                severity="danger"
                size="small"
                class="opacity-0 group-hover:opacity-100 transition-opacity"
                @click.stop="confirmDelete(type)"
                v-tooltip.top="'Supprimer'"
              >
                <template #icon>
                  <font-awesome-icon icon="trash" class="text-sm" />
                </template>
              </Button>
            </div>
            <div class="ml-2" v-else>
              <font-awesome-icon icon="pen" class="text-primary text-sm" />
            </div>
          </div>
        </div>
      </div>

      <!-- Formulaire Ajout/Modif -->
      <div class="border-t border-surface-border pt-6 mt-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-color">
            {{ editingType ? 'Modifier le type' : 'Nouveau type' }}
          </h3>
          <Button
            v-if="editingType"
            label="Nouveau type"
            icon="pi pi-plus"
            size="small"
            severity="secondary"
            outlined
            @click="resetForm"
          >
            <template #icon>
              <font-awesome-icon icon="plus" class="mr-2" />
            </template>
          </Button>
        </div>
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
          <div>
            <label class="block text-sm font-medium mb-1 text-color-secondary">Nom *</label>
            <InputText
              v-model="form.name"
              placeholder="Ex: Audit sécurité"
              class="w-full"
              :class="{ 'p-invalid': submitted && !form.name }"
            />
            <small v-if="submitted && !form.name" class="text-red-500">Le nom est requis</small>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1 text-color-secondary">Description</label>
            <Textarea
              v-model="form.description"
              rows="2"
              class="w-full"
              placeholder="Brève description..."
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1 text-color-secondary">Couleur</label>
              <div class="flex gap-2">
                <ColorPicker v-model="form.color" format="hex" class="w-full" />
                <div
                  :style="{
                    backgroundColor: `#${form.color}`,
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '4px',
                  }"
                  class="border border-surface-border"
                ></div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1 text-color-secondary">Icône</label>
              <IconPicker v-model="form.icon" />
            </div>
          </div>

          <div class="flex justify-end gap-2 mt-4">
            <Button
              v-if="editingType"
              label="Supprimer"
              severity="danger"
              text
              @click="confirmDelete(editingType)"
              size="small"
              class="mr-auto"
            >
              <template #icon>
                <font-awesome-icon icon="trash" class="mr-2" />
              </template>
            </Button>

            <Button
              type="submit"
              :label="editingType ? 'Enregistrer' : 'Ajouter'"
              :loading="submitting"
            >
              <template #icon>
                <font-awesome-icon :icon="editingType ? 'check' : 'plus'" class="mr-2" />
              </template>
            </Button>
          </div>
        </form>
      </div>
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useActionTypeStore, type ActionType } from '@/stores/actionTypes'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import Drawer from 'primevue/drawer'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import ColorPicker from 'primevue/colorpicker'
import IconPicker from '@/components/common/IconPicker.vue'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

const store = useActionTypeStore()
const confirm = useConfirm()
const toast = useToast()

const types = computed(() => store.types)
const loading = computed(() => store.loading)

const editingType = ref<ActionType | null>(null)
const submitting = ref(false)
const submitted = ref(false)

const form = ref({
  name: '',
  description: '',
  color: '3b82f6', // Default blue without # for PrimeVue ColorPicker
  icon: 'tag',
})

const resetForm = () => {
  editingType.value = null
  form.value = {
    name: '',
    description: '',
    color: '3b82f6',
    icon: 'tag',
  }
  submitted.value = false
}

const editType = (type: ActionType) => {
  editingType.value = type
  form.value = {
    name: type.name,
    description: type.description || '',
    color: type.color ? type.color.replace('#', '') : '3b82f6',
    icon: type.icon || 'tag',
  }
}

const handleSubmit = async () => {
  submitted.value = true
  if (!form.value.name) return

  submitting.value = true
  try {
    const data = {
      ...form.value,
      color: `#${form.value.color}`,
    }

    if (editingType.value) {
      await store.updateType(editingType.value.id, data)
      toast.add({ severity: 'success', summary: 'Succès', detail: 'Type mis à jour', life: 3000 })
    } else {
      await store.createType(data)
      toast.add({ severity: 'success', summary: 'Succès', detail: 'Type créé', life: 3000 })
    }
    resetForm()
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Une erreur est survenue',
      life: 3000,
    })
  } finally {
    submitting.value = false
  }
}

const confirmDelete = (type: ActionType) => {
  confirm.require({
    message: `Voulez-vous vraiment supprimer le type "${type.name}" ?`,
    header: 'Confirmation',
    icon: 'exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await store.deleteType(type.id)
        toast.add({ severity: 'success', summary: 'Succès', detail: 'Type supprimé', life: 3000 })
        if (editingType.value?.id === type.id) {
          resetForm()
        }
      } catch {
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de supprimer ce type',
          life: 3000,
        })
      }
    },
  })
}

// Watch visibility to refresh types when opened
watch(
  () => props.visible,
  (newValue) => {
    if (newValue) {
      store.fetchTypes()
    }
  },
)
</script>

<style scoped>
/* Ensure ColorPicker looks good */
:deep(.p-colorpicker-preview) {
  width: 2rem;
  height: 2rem;
}
</style>
