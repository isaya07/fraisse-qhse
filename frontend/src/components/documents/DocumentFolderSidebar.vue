<template>
  <Card class="h-full">
    <template #title>
      <div class="flex justify-between items-center px-4 py-2">
        <h4>Dossiers</h4>
        <div class="flex gap-1">
          <Button
            text
            rounded
            size="small"
            v-tooltip="'Tout afficher'"
            @click="resetSelection()"
            v-if="selectedFolderKey"
          >
            <template #icon>
              <font-awesome-icon icon="rotate-left" />
            </template>
          </Button>
          <Button
            text
            rounded
            size="small"
            v-tooltip="'Nouveau dossier'"
            @click="openFolderDialog()"
          >
            <template #icon>
              <font-awesome-icon icon="plus" />
            </template>
          </Button>
        </div>
      </div>
    </template>
    <template #content>
      <div class="overflow-y-auto h-[calc(100vh-16rem)]">
        <Tree
          :value="folderTree"
          selectionMode="single"
          v-model:selectionKeys="selectedFolderKey"
          @nodeSelect="onFolderSelect"
          @nodeUnselect="onFolderUnselect"
          class="w-full border-none p-0"
        >
          <template #default="slotProps">
            <div class="flex items-center justify-between w-full group">
              <span class="flex items-center gap-2">
                <font-awesome-icon icon="folder" class="text-yellow-500" />
                {{ slotProps.node.label }}
              </span>
              <div class="hidden group-hover:flex gap-1">
                <Button
                  text
                  rounded
                  severity="secondary"
                  size="small"
                  class="w-6 h-6"
                  @click.stop="openFolderDialog(slotProps.node.data)"
                >
                  <template #icon>
                    <font-awesome-icon icon="pen" class="text-xs" />
                  </template>
                </Button>
                <Button
                  text
                  rounded
                  severity="danger"
                  size="small"
                  class="w-6 h-6"
                  @click.stop="confirmDeleteFolder(slotProps.node.data)"
                >
                  <template #icon>
                    <font-awesome-icon icon="trash" class="text-xs" />
                  </template>
                </Button>
              </div>
            </div>
          </template>
        </Tree>
      </div>
    </template>
  </Card>

  <!-- Dialog Dossier -->
  <Dialog
    v-model:visible="folderDialogVisible"
    :header="editingFolder ? 'Modifier le dossier' : 'Nouveau dossier'"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="folderName">Nom</label>
      <InputText id="folderName" v-model="folderForm.name" required autofocus />
    </div>
    <div class="field mt-4">
      <label for="parentFolder">Dossier parent</label>
      <TreeSelect
        v-model="folderForm.parent_id"
        :options="folderTreeSelect"
        placeholder="Sélectionnez un parent (optionnel)"
      />
    </div>
    <template #footer>
      <Button label="Annuler" text severity="secondary" @click="closeFolderDialog">
        <template #icon>
          <font-awesome-icon icon="times" class="mr-2" />
        </template>
      </Button>
      <Button label="Enregistrer" @click="saveFolder">
        <template #icon>
          <font-awesome-icon icon="check" class="mr-2" />
        </template>
      </Button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDocumentFolderStore, type DocumentFolder } from '@/stores/documentFolders'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Tree from 'primevue/tree'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import TreeSelect from 'primevue/treeselect'

const emit = defineEmits(['select', 'unselect'])

const folderStore = useDocumentFolderStore()
const confirm = useConfirm()
const toast = useToast()

const selectedFolderKey = ref<any>(null)
const folderDialogVisible = ref(false)
const editingFolder = ref<DocumentFolder | null>(null)
const folderForm = ref({
  name: '',
  parent_id: null as any,
})

const folderTree = computed(() => {
  const mapFolderToNode = (folder: DocumentFolder): any => ({
    key: folder.id.toString(),
    label: folder.name,
    data: folder,
    children:
      folder.children && folder.children.length > 0
        ? folder.children.map(mapFolderToNode)
        : undefined,
    leaf: !folder.children || folder.children.length === 0,
  })
  return folderStore.folders.map((f) => mapFolderToNode(f))
})

const folderTreeSelect = computed(() => {
  const mapFolderToNode = (folder: DocumentFolder): any => {
    // Prevent selecting self or children as parent
    if (editingFolder.value && folder.id === editingFolder.value.id) {
      return null
    }

    const children = folder.children
      ? folder.children.map(mapFolderToNode).filter((n) => n !== null)
      : []

    return {
      key: folder.id.toString(),
      label: folder.name,
      data: folder.id,
      children: children,
      selectable: true,
    }
  }
  return folderStore.folders.map(mapFolderToNode).filter((n) => n !== null)
})

const onFolderSelect = (node: any) => {
  emit('select', node.data)
}

const onFolderUnselect = () => {
  emit('unselect')
}

const resetSelection = () => {
  selectedFolderKey.value = null
  emit('unselect')
}

const openFolderDialog = (folder?: DocumentFolder) => {
  if (folder) {
    editingFolder.value = folder
    folderForm.value = {
      name: folder.name,
      parent_id: folder.parent_id ? { [folder.parent_id.toString()]: true } : null,
    }
  } else {
    editingFolder.value = null
    folderForm.value = {
      name: '',
      parent_id:
        selectedFolderKey.value && Object.keys(selectedFolderKey.value).length > 0
          ? { [Object.keys(selectedFolderKey.value)[0] as string]: true }
          : null,
    }
  }
  folderDialogVisible.value = true
}

const closeFolderDialog = () => {
  folderDialogVisible.value = false
  editingFolder.value = null
}

const saveFolder = async () => {
  try {
    let parentId = null
    if (folderForm.value.parent_id) {
      const keys = Object.keys(folderForm.value.parent_id as Record<string, any>)
      if (keys.length > 0) {
        parentId = parseInt(keys[0] as string)
      }
    }

    if (editingFolder.value) {
      await folderStore.updateFolder(editingFolder.value.id, {
        name: folderForm.value.name,
        parent_id: parentId,
      })
      toast.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Dossier mis à jour',
        life: 3000,
      })
    } else {
      await folderStore.createFolder({
        name: folderForm.value.name,
        parent_id: parentId,
      })
      toast.add({ severity: 'success', summary: 'Succès', detail: 'Dossier créé', life: 3000 })
    }
    closeFolderDialog()
  } catch (error) {
    console.log(error)
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Une erreur est survenue',
      life: 3000,
    })
  }
}

const confirmDeleteFolder = (folder: DocumentFolder) => {
  confirm.require({
    message: `Voulez-vous vraiment supprimer le dossier "${folder.name}" ?`,
    header: 'Confirmation',
    icon: 'exclamation-triangle',
    accept: async () => {
      try {
        await folderStore.deleteFolder(folder.id)
        toast.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Dossier supprimé',
          life: 3000,
          icon: 'check',
        })
        if (selectedFolderKey.value && selectedFolderKey.value[folder.id.toString()]) {
          selectedFolderKey.value = null
          emit('unselect')
        }
      } catch (error) {
        console.log(error)
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de supprimer le dossier',
          life: 3000,
          icon: 'times',
        })
      }
    },
  })
}

onMounted(() => {
  folderStore.fetchFolders()
})
</script>

<style scoped>
:deep(.p-tree) {
  border: none;
  padding: 0;
}
</style>
