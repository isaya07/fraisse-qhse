<template>
  <Card>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold">Historique des versions</h3>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <ToggleSwitch v-model="showArchived" @change="handleArchivedChange" inputId="showArchived" />
          <label for="showArchived" class="text-sm cursor-pointer">Afficher archives</label>
        </div>
        <Tag :value="`${versions.length} version${versions.length > 1 ? 's' : ''}`" severity="info" />
      </div>
    </div>
    <template #title>
      <div class="flex justify-between items-center mb-2">
        <div class="flex items-center gap-2">
          <font-awesome-icon icon="clock-rotate-left"/>
          <span>Historique des versions</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-2">
            <ToggleSwitch v-model="showArchived" @change="handleArchivedChange" inputId="showArchived" />
            <label for="showArchived" class="text-sm cursor-pointer">Afficher archives</label>
          </div>
          <Tag :value="`${versions.length} version${versions.length > 1 ? 's' : ''}`" severity="info" />
        </div>
      </div>
    </template>
    <template #content>
      <div v-if="loading" class="flex justify-center py-8">
        <font-awesome-icon icon="spinner" spin size="2x" class="text-color-secondary" />
      </div>

      <div v-else-if="error" class="text-center py-8 text-red-500">
        <p>{{ error }}</p>
      </div>

      <div v-else-if="versions.length === 0" class="text-center py-8 text-color-secondary">
        <font-awesome-icon icon="inbox" size="3x" class="mb-3" />
        <p>Aucune version enregistrée</p>
      </div>

      <DataTable v-else :value="versions" class="p-datatable-sm" stripedRows>
        <Column header="Version" style="width: 100px">
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <Tag
                :value="data.version"
                :severity="isCurrentVersion(data) ? 'success' : 'secondary'"
              />
              <Tag v-if="isCurrentVersion(data)" value="Actuelle" severity="success" size="small" />
            </div>
          </template>
        </Column>

        <Column header="Date" style="width: 150px">
          <template #body="{ data }">
            <span class="text-color">{{ formatDate(data.created_at) }}</span>
          </template>
        </Column>

        <Column header="Créateur" style="width: 180px">
          <template #body="{ data }">
            <div v-if="data.creator" class="flex items-center gap-2">
              <font-awesome-icon icon="user" class="text-color-secondary" />
              <span class="text-color">{{ data.creator.first_name }} {{ data.creator.last_name }}</span>
            </div>
            <span v-else class="text-color-secondary">-</span>
          </template>
        </Column>

        <Column header="Changelog">
          <template #body="{ data }">
            <div class="max-w-md">
              <p class="text-sm text-color line-clamp-2">{{ data.changelog }}</p>
            </div>
          </template>
        </Column>

        <Column header="Taille" style="width: 100px">
          <template #body="{ data }">
            <span class="text-sm text-color-secondary">{{ formatFileSize(data.file_size) }}</span>
          </template>
        </Column>

        <Column header="Actions" style="width: 120px">
          <template #body="{ data }">
            <div class="flex gap-1">
              <Button
                text
                rounded
                severity="secondary"
                size="small"
                @click="viewChangelog(data)"
                v-tooltip.top="'Voir changelog'"
              >
                <template #icon>
                  <font-awesome-icon icon="info-circle" />
                </template>
              </Button>
              <Button
                text
                rounded
                severity="info"
                size="small"
                @click="downloadVersion(data)"
                v-tooltip.top="'Télécharger'"
              >
                <template #icon>
                  <font-awesome-icon icon="download" />
                </template>
              </Button>
              <Button
                v-if="!isCurrentVersion(data)"
                text
                rounded
                severity="warning"
                size="small"
                @click="confirmRestore(data)"
                v-tooltip.top="'Restaurer cette version'"
              >
                <template #icon>
                  <font-awesome-icon icon="clock-rotate-left" />
                </template>
              </Button>
            </div>
          </template>
        </Column>
      </DataTable>

      <!-- Dialog Changelog -->
      <Dialog
        v-model:visible="changelogDialogVisible"
        :header="`Changelog - Version ${selectedVersion?.version}`"
        :modal="true"
        :style="{ width: '600px' }"
      >
        <div v-if="selectedVersion" class="py-4">
          <div class="mb-4">
            <span class="text-sm text-color-secondary">Date :</span>
            <span class="ml-2 font-medium text-color">{{ formatDate(selectedVersion.created_at) }}</span>
          </div>
          <div class="mb-4">
            <span class="text-sm text-color-secondary">Créateur :</span>
            <span class="ml-2 font-medium text-color"
              >{{ selectedVersion.creator?.first_name }}
              {{ selectedVersion.creator?.last_name }}</span
            >
          </div>
          <div>
            <span class="text-sm text-color-secondary block mb-2">Description des changements :</span>
            <p class="text-color whitespace-pre-wrap">{{ selectedVersion.changelog }}</p>
          </div>
        </div>
        <template #footer>
          <Button label="Fermer" text @click="changelogDialogVisible = false" />
        </template>
      </Dialog>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDocumentVersionStore, type DocumentVersion } from '@/stores/documentVersions'
import { useToast } from 'primevue/usetoast'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Dialog from 'primevue/dialog'
import ToggleSwitch from 'primevue/toggleswitch'

interface Props {
  documentId: number
  currentVersion?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'restore', version: DocumentVersion): void
}>()

const versionStore = useDocumentVersionStore()
const toast = useToast()

const versions = computed(() => versionStore.versions)
const loading = computed(() => versionStore.loading)
const error = computed(() => versionStore.error)

const changelogDialogVisible = ref(false)
const selectedVersion = ref<DocumentVersion | null>(null)
const showArchived = ref(false)

const handleArchivedChange = () => {
  versionStore.fetchVersions(props.documentId, showArchived.value)
}

const isCurrentVersion = (version: DocumentVersion) => {
  return version.version === props.currentVersion
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

const viewChangelog = (version: DocumentVersion) => {
  selectedVersion.value = version
  changelogDialogVisible.value = true
}

const downloadVersion = async (version: DocumentVersion) => {
  try {
    await versionStore.downloadVersion(version.id)
    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: `Version ${version.version} téléchargée`,
      life: 3000,
    })
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Impossible de télécharger la version',
      life: 3000,
    })
  }
}

const confirmRestore = (version: DocumentVersion) => {
  // Logique de confirmation ou appel direct si on utilise un ConfirmDialog global
  // Ici on va émettre un événement pour que le parent gère ou gérer localement
  // Pour faire simple et propre, on va utiliser le composant ConfirmDialog de PrimeVue
  // Mais il n'est pas importé ici.
  // On va émettre un événement 'restore' vers le parent DocumentDetail qui a accès a confirm
  emit('restore', version)
}

onMounted(() => {
  versionStore.fetchVersions(props.documentId)
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
