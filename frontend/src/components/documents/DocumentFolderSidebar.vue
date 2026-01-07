<template>
  <div
    class="h-full flex flex-col bg-surface-0 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl shadow-sm overflow-hidden"
  >
    <div
      class="flex justify-between items-center px-4 py-3 border-b border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900/50"
    >
      <h4
        class="m-0 font-semibold text-sm uppercase tracking-wide text-surface-500 dark:text-surface-400"
      >
        Dossiers
      </h4>
      <div class="flex gap-1">
        <Button
          text
          rounded
          size="small"
          v-tooltip="'Tout afficher'"
          @click="resetSelection()"
          v-if="selectedFolderKey"
          class="w-8 h-8"
        >
          <template #icon>
            <font-awesome-icon icon="rotate-left" class="text-xs" />
          </template>
        </Button>
        <Button
          text
          rounded
          size="small"
          v-tooltip="'Nouveau dossier'"
          @click="openFolderDialog()"
          class="w-8 h-8"
        >
          <template #icon>
            <font-awesome-icon icon="plus" class="text-xs" />
          </template>
        </Button>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto p-2">
      <Tree
        :value="folderTree"
        selectionMode="single"
        v-model:selectionKeys="selectedFolderKey"
        @nodeSelect="onFolderSelect"
        @nodeUnselect="onFolderUnselect"
        class="w-full border-none p-0"
      >
        <template #default="slotProps">
          <div class="flex items-center justify-between flex-1 group py-1 relative min-w-0">
            <div class="flex items-center gap-2 overflow-hidden pr-16 bg-transparent">
              <font-awesome-icon
                :icon="slotProps.node.expanded ? 'folder-open' : 'folder'"
                class="text-yellow-500 text-lg transition-colors"
              />
              <span class="text-color text-sm truncate block">{{ slotProps.node.label }}</span>
            </div>
            <div
              class="absolute right-0 top-0 h-full flex items-center gap-1 pr-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Button
                text
                rounded
                severity="secondary"
                size="small"
                class="w-6 h-6"
                @click.stop="openFolderDialog(slotProps.node.data)"
                v-tooltip.top="'Modifier'"
              >
                <template #icon>
                  <font-awesome-icon icon="pen" class="text-[10px]" />
                </template>
              </Button>
              <Button
                text
                rounded
                severity="danger"
                size="small"
                class="w-6 h-6"
                @click.stop="confirmDeleteFolder(slotProps.node.data)"
                v-tooltip.top="'Supprimer'"
              >
                <template #icon>
                  <font-awesome-icon icon="trash" class="text-[10px]" />
                </template>
              </Button>
            </div>
          </div>
        </template>
      </Tree>

      <div
        v-if="!folderTree || folderTree.length === 0"
        class="flex flex-col items-center justify-center h-40 text-color-secondary text-sm"
      >
        <font-awesome-icon icon="folder-open" class="mb-2 opacity-50 text-2xl" />
        <span>Aucun dossier</span>
      </div>
    </div>
  </div>

  <!-- Dialog Dossier -->
  <Dialog
    v-model:visible="folderDialogVisible"
    :header="editingFolder ? 'Modifier le dossier' : 'Nouveau dossier'"
    :modal="true"
    class="p-fluid w-full max-w-md"
  >
    <div class="field">
      <label for="folderName" class="block mb-2 text-sm font-medium">Nom</label>
      <InputText id="folderName" v-model="folderForm.name" required autofocus class="w-full" />
    </div>
    <div class="field mt-4">
      <label for="parentFolder" class="block mb-2 text-sm font-medium">Dossier parent</label>
      <TreeSelect
        v-model="folderForm.parent_id"
        :options="folderTreeSelect"
        showClear
        placeholder="Sélectionnez un parent (ou laisser vide pour la racine)"
        class="w-full"
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
    icon: 'api pi-exclamation-triangle',
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
  background: transparent;
  overflow-x: hidden !important;
  width: 100% !important;
}
:deep(.p-tree .p-tree-container .p-treenode) {
  padding: 0;
}
:deep(.p-treenode-content),
:deep(.p-tree-node-content) {
  padding: 0.2rem 0;
  border-radius: 6px;
  transition: background-color 0.2s;
  display: flex !important;
  width: 100% !important;
  overflow: hidden !important;
}
:deep(.p-treenode-label),
:deep(.p-tree-node-label) {
  flex: 1 !important;
  min-width: 0 !important;
  overflow: hidden !important;
  display: block !important;
}
:deep(.p-tree .p-tree-container .p-treenode .p-treenode-content:hover) {
  background-color: var(--surface-100);
}
:deep(.p-tree .p-tree-container .p-treenode.p-highlight .p-treenode-content) {
  background-color: var(--primary-50);
  color: var(--primary-700);
}
</style>
