<template>
  <div class="category-management">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold">Gestion des Catégories</h3>
      <Button label="Nouvelle catégorie" @click="openCreateDialog">  
        <template #icon>
          <font-awesome-icon icon="plus" class="mr-2" />
        </template>
      </Button>
    </div>

    <DataTable :value="categories" :loading="loading" class="p-datatable-sm">
      <Column field="name" header="Nom" />
      <Column field="description" header="Description" />
      <Column header="Couleur" style="width: 100px">
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <div
              v-if="data.color"
              :style="{ backgroundColor: data.color }"
              class="w-6 h-6 rounded border border-gray-300"
            />
            <span>{{ data.color || '-' }}</span>
          </div>
        </template>
      </Column>
      <Column header="Icône" style="width: 100px">
        <template #body="{ data }">
          <font-awesome-icon v-if="data.icon" :icon="data.icon" class="text-xl" />
          <span v-else>-</span>
        </template>
      </Column>
      <Column header="Actions" style="width: 120px">
        <template #body="{ data }">
          <div class="flex gap-1">
            <Button
              text
              rounded
              severity="info"
              size="small"
              @click="openEditDialog(data)"
              v-tooltip.top="'Modifier'"
            >
              <template #icon>
                <font-awesome-icon icon="pen" />
              </template>
            </Button>
            <Button
              text
              rounded
              severity="danger"
              size="small"
              @click="confirmDelete(data)"
              v-tooltip.top="'Supprimer'"
            >
              <template #icon>
                <font-awesome-icon icon="trash" />
              </template>
            </Button>
          </div>
        </template>
      </Column>
    </DataTable>

    <!-- Dialog for Create/Edit -->
    <Dialog
      v-model:visible="dialogVisible"
      :header="editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'"
      :modal="true"
      :style="{ width: '500px' }"
    >
      <div class="flex flex-col gap-4 pt-4">
        <div class="field">
          <label for="name" class="block text-sm font-medium mb-2">Nom *</label>
          <InputText id="name" v-model="formData.name" class="w-full" />
        </div>

        <div class="field">
          <label for="slug" class="block text-sm font-medium mb-2">Slug *</label>
          <InputText id="slug" v-model="formData.slug" class="w-full" />
        </div>

        <div class="field">
          <label for="description" class="block text-sm font-medium mb-2">Description</label>
          <Textarea id="description" v-model="formData.description" rows="3" class="w-full" />
        </div>

        <div class="field">
          <label for="color" class="block text-sm font-medium mb-2">Couleur</label>
          <ColorPicker v-model="formData.color" format="hex" class="w-full" />
        </div>

        <div class="field">
          <label for="icon" class="block text-sm font-medium mb-2">Icône (FontAwesome)</label>
          <IconPicker v-model="formData.icon" />
        </div>
      </div>

      <template #footer>
        <Button label="Annuler" text @click="dialogVisible = false" />
        <Button
          :label="editingCategory ? 'Mettre à jour' : 'Créer'"
          @click="saveCategory"
          :loading="categoryStore.loading"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCategoryStore, type Category } from '@/stores/category'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import ColorPicker from 'primevue/colorpicker'
import IconPicker from '@/components/common/IconPicker.vue'

const categoryStore = useCategoryStore()
const confirm = useConfirm()
const toast = useToast()

const categories = computed(() => categoryStore.categories)
const loading = computed(() => categoryStore.loading)

const dialogVisible = ref(false)
const editingCategory = ref<Category | null>(null)
const formData = ref({
  name: '',
  slug: '',
  description: '',
  color: '',
  icon: '',
})

const openCreateDialog = () => {
  editingCategory.value = null
  formData.value = {
    name: '',
    slug: '',
    description: '',
    color: '#3B82F6',
    icon: 'file',
  }
  dialogVisible.value = true
}

const openEditDialog = (category: Category) => {
  editingCategory.value = category
  formData.value = {
    name: category.name,
    slug: category.slug,
    description: category.description || '',
    color: category.color || '#3B82F6',
    icon: category.icon || 'file',
  }
  dialogVisible.value = true
}


const saveCategory = async () => {
  try {
    // Ensure color is in correct format (ColorPicker might return without #)
    const dataToSave = {
      ...formData.value,
      color: formData.value.color?.startsWith('#') 
        ? formData.value.color 
        : `#${formData.value.color}`
    }
    
    console.log('Saving category with data:', dataToSave)
    
    if (editingCategory.value) {
      await categoryStore.updateCategory(editingCategory.value.id, dataToSave)
      toast.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Catégorie mise à jour',
        life: 3000,
      })
    } else {
      await categoryStore.createCategory(dataToSave)
      toast.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Catégorie créée',
        life: 3000,
      })
    }
    dialogVisible.value = false
  } catch (error) {
    console.error('Error saving category:', error)
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Impossible de sauvegarder la catégorie',
      life: 3000,
    })
  }
}

const confirmDelete = (category: Category) => {
  confirm.require({
    message: `Voulez-vous vraiment supprimer la catégorie "${category.name}" ?`,
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await categoryStore.deleteCategory(category.id)
        toast.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Catégorie supprimée',
          life: 3000,
        })
      } catch {
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de supprimer la catégorie (peut-être utilisée par des documents)',
          life: 3000,
        })
      }
    },
  })
}

onMounted(() => {
  categoryStore.fetchCategories()
})
</script>
