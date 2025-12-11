<template>
  <div class="p-4">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div class="flex items-center gap-4">
        <Button text rounded severity="secondary" @click="goBack">
          <template #icon>
            <font-awesome-icon icon="arrow-left" />
          </template>
        </Button>
        <div>
          <div class="flex items-center gap-3">
            <h2>{{ action?.title }}</h2>
            <Tag
              :value="getStatusLabel(action?.status)"
              :severity="getStatusSeverity(action?.status)"
            />
          </div>
        </div>
      </div>
      <div class="flex gap-2">
        <Button label="Modifier" @click="editAction" severity="warning" outlined>
          <template #icon>
            <font-awesome-icon icon="pencil" class="mr-2" />
          </template>
        </Button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-12">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-color-secondary" />
    </div>

    <!-- Content -->
    <div v-else-if="action" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Info -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Meta Info -->
        <Card>
          <template #title><h4>Informations</h4></template>
          <template #content>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <span class="block font-bold text-color-secondary mb-1">Type : </span>
                <div class="flex items-center gap-2">
                  <div
                    class="w-8 h-8 rounded flex items-center justify-center"
                    :style="{
                      backgroundColor: action.action_type?.color + '20',
                      color: action.action_type?.color,
                    }"
                  >
                    <font-awesome-icon :icon="['fas', action.action_type?.icon || 'tasks']" />
                  </div>
                  <span class="font-medium text-lg">{{ action.action_type?.name || '-' }}</span>
                </div>
              </div>

              <div>
                <span class="block font-bold text-color-secondary mb-1">Priorité : </span>
                <Tag
                  :value="getPriorityLabel(action.priority)"
                  :severity="getPrioritySeverity(action.priority)"
                  class="text-sm px-3 py-1"
                />
              </div>

              <div>
                <span class="block font-bold text-color-secondary mb-1">Responsable : </span>
                <div v-if="action.assignee" class="flex items-center gap-3">
                  <Avatar
                    :label="getInitials(action.assignee)"
                    shape="circle"
                    size="normal"
                    class="bg-primary-100 text-primary-700"
                  />
                  <div>
                    <div class="font-medium">
                      {{ action.assignee.first_name }} {{ action.assignee.last_name }}
                    </div>
                    <!-- Optional: add role or email if available -->
                  </div>
                </div>
                <span v-else class="text-color-secondary italic">Non assigné</span>
              </div>

              <div>
                <span class="block font-bold text-color-secondary mb-1">Créé par : </span>
                <div class="flex items-center gap-3">
                  <Avatar
                    :label="getInitials(action.creator)"
                    shape="circle"
                    size="normal"
                    class="bg-surface-200 text-surface-600"
                  />
                  <div>
                    <div class="font-medium">
                      {{
                        action.creator
                          ? `${action.creator.first_name} ${action.creator.last_name}`
                          : 'Système'
                      }}
                    </div>
                    <div class="text-xs text-color-secondary">
                      Le {{ formatDate(action.created_at) }}
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="action.due_date">
                <span class="block font-bold text-color-secondary mb-1">Échéance : </span>
                <div class="flex items-center gap-2">
                  <font-awesome-icon :icon="['fas', 'calendar']" class="text-color-secondary" />
                  <span
                    class="font-medium"
                    :class="getDueDateColorClass(action.due_date, action.status)"
                  >
                    {{ formatDate(action.due_date) }}
                  </span>
                </div>
              </div>

              <div v-if="action.completed_date">
                <span class="block font-bold text-color-secondary mb-1">Date de fin : </span>
                <div class="flex items-center gap-2">
                  <font-awesome-icon :icon="['fas', 'calendar-check']" class="text-green-600" />
                  <div class="font-medium text-green-600">
                    {{ formatDate(action.completed_date) }}
                  </div>
                </div>
              </div>

              <div class="md:col-span-2">
                <span class="block font-bold text-color-secondary mb-2">Description : </span>
                <div
                  class="p-3 bg-surface-50 dark:bg-surface-800 rounded-lg text-color border border-surface-200 dark:border-surface-700 leading-relaxed whitespace-pre-line"
                >
                  {{ action.description || 'Aucune description.' }}
                </div>
              </div>
            </div>
          </template>
        </Card>

        <!-- Documents -->
        <Card>
          <template #title>
            <div class="flex items-center justify-between">
              <h4>Documents liés</h4>
              <Button
                text
                rounded
                v-tooltip="'Ajouter un document'"
                @click="openLinkDocumentDialog"
              >
                <template #icon>
                  <font-awesome-icon icon="plus" />
                </template>
              </Button>
            </div>
          </template>
          <template #content>
            <div v-if="action.documents && action.documents.length > 0" class="flex flex-col gap-2">
              <div
                v-for="doc in action.documents"
                :key="doc.id"
                class="flex items-center justify-between p-3 border rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors group"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary"
                  >
                    <font-awesome-icon icon="file-lines" class="text-xl" />
                  </div>
                  <div>
                    <div class="font-medium text-color">{{ doc.title }}</div>
                    <div class="text-xs text-color-secondary">{{ doc.filename }}</div>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <Button
                    text
                    rounded
                    severity="secondary"
                    size="small"
                    @click="downloadDocument(doc.id, doc.filename)"
                    v-tooltip.top="'Télécharger'"
                  >
                    <template #icon>
                      <font-awesome-icon icon="download" />
                    </template>
                  </Button>
                  <Button
                    text
                    rounded
                    severity="danger"
                    size="small"
                    class="opacity-0 group-hover:opacity-100 transition-opacity"
                    @click="unlinkDocument(doc.id)"
                    v-tooltip.top="'Délier'"
                  >
                    <template #icon>
                      <font-awesome-icon icon="xmark" />
                    </template>
                  </Button>
                </div>
              </div>
            </div>
            <p v-else class="text-color-secondary italic">Aucun document lié.</p>
          </template>
        </Card>

        <!-- Indicators -->
        <Card>
          <template #title>
            <div class="flex items-center justify-between">
              <h4>Indicateurs liés</h4>
              <Button
                text
                rounded
                v-tooltip="'Lier un indicateur'"
                @click="openLinkIndicatorDialog"
              >
                <template #icon>
                  <font-awesome-icon icon="plus" />
                </template>
              </Button>
            </div>
          </template>
          <template #content>
            <div
              v-if="action.indicators && action.indicators.length > 0"
              class="grid grid-cols-1 sm:grid-cols-2 gap-2"
            >
              <div
                v-for="ind in action.indicators"
                :key="ind.id"
                class="flex items-center justify-between p-2 border rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors group"
              >
                <div class="flex items-center gap-2">
                  <div
                    class="w-10 h-10 rounded bg-orange-50 flex items-center justify-center text-orange-500 text-xs"
                  >
                    <font-awesome-icon icon="chart-line" class="text-xl" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <span class="font-bold text-color">{{ ind.name }}</span>
                  </div>
                </div>
                <Button
                  text
                  rounded
                  severity="danger"
                  size="small"
                  class="opacity-0 group-hover:opacity-100 transition-opacity"
                  @click="unlinkIndicator(ind.id)"
                  v-tooltip.top="'Délier'"
                >
                  <template #icon>
                    <font-awesome-icon icon="xmark" />
                  </template>
                </Button>
              </div>
            </div>
            <p v-else class="text-color-secondary italic">Aucun indicateur lié.</p>
          </template>
        </Card>
      </div>

      <!-- Sidebar Info -->
      <div class="space-y-6">
        <!-- Progress -->
        <Card>
          <template #title><h4>Progression</h4></template>
          <template #content>
            <div class="flex flex-col items-center gap-4">
              <Knob
                v-model="progressUpdateValue"
                :size="120"
                :step="5"
                :valueColor="getProgressColor(progressUpdateValue)"
                rangeColor="#e5e7eb"
                :strokeWidth="15"
                valueTemplate="{value}%"
                :readonly="false"
                @change="onProgressChange"
              />
              <div class="text-center">
                <p class="text-sm text-color-secondary">Modifier la progression</p>
                <div class="flex gap-2 justify-center">
                  <Button
                    size="small"
                    outlined
                    rounded
                    @click="adjustProgress(-10)"
                    severity="secondary"
                    :disabled="progressUpdateValue <= 0"
                  >
                    <template #icon>
                      <font-awesome-icon icon="minus" />
                    </template>
                  </Button>
                  <Button
                    size="small"
                    outlined
                    rounded
                    @click="inputProgressUpdate"
                    severity="success"
                    :disabled="progressUpdateValue === action?.progress"
                    v-if="progressUpdateValue !== action?.progress"
                  >
                    <template #icon>
                      <font-awesome-icon icon="check" />
                    </template>
                  </Button>
                  <Button
                    size="small"
                    outlined
                    rounded
                    @click="adjustProgress(10)"
                    severity="secondary"
                    :disabled="progressUpdateValue >= 100"
                  >
                    <template #icon>
                      <font-awesome-icon icon="plus" />
                    </template>
                  </Button>
                </div>
              </div>
            </div>
          </template>
        </Card>

        <!-- Comments (Moved here) -->
        <Card>
          <template #title><h4>Commentaires</h4></template>
          <template #content>
            <div class="space-y-6">
              <div v-if="action.comments && action.comments.length > 0" class="space-y-4">
                <div v-for="comment in action.comments" :key="comment.id" class="flex gap-4 group">
                  <Avatar
                    :label="getInitials(comment.user)"
                    shape="circle"
                    size="normal"
                    class="flex-shrink-0"
                    :style="{
                      backgroundColor: stringToColor(comment.user?.username || ''),
                      color: '#fff',
                    }"
                  />
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1 w-full justify-between">
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-sm"
                          >{{ comment.user?.first_name }} {{ comment.user?.last_name }}</span
                        >
                        <span class="text-xs text-color-secondary">{{
                          formatDateTime(comment.created_at)
                        }}</span>
                      </div>
                      <Button
                        v-if="canDeleteComment(comment)"
                        text
                        rounded
                        severity="danger"
                        size="small"
                        class="!w-6 !h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        @click="confirmDeleteComment(comment.id)"
                        v-tooltip.top="'Supprimer'"
                      >
                        <template #icon>
                          <font-awesome-icon icon="xmark" class="text-xs" />
                        </template>
                      </Button>
                    </div>
                    <div
                      class="text-color text-sm whitespace-pre-wrap bg-surface-50 dark:bg-surface-800 p-3 rounded-lg rounded-tl-none border border-surface-border"
                    >
                      {{ comment.content }}
                    </div>
                  </div>
                </div>
              </div>
              <p v-else class="text-color-secondary italic text-sm">Aucun commentaire.</p>

              <div class="border-t border-surface-border pt-4 mt-2">
                <div class="flex flex-col gap-2">
                  <Textarea
                    v-model="newComment"
                    rows="3"
                    placeholder="Écrire un commentaire..."
                    class="w-full"
                    autoResize
                  />
                  <div class="flex justify-end">
                    <Button
                      label="Envoyer"
                      size="small"
                      @click="submitComment"
                      :loading="submittingComment"
                      :disabled="!newComment.trim()"
                    >
                      <template #icon>
                        <font-awesome-icon icon="paper-plane" class="mr-2" />
                      </template>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="text-center py-12">
      <font-awesome-icon icon="exclamation-circle" class="text-red-500 text-5xl mb-4" />
      <h3 class="text-lg font-medium text-color">Action introuvable</h3>
      <Button label="Retour à la liste" @click="goBack" severity="secondary" class="mt-4" />
    </div>

    <!-- Link Document Dialog -->
    <Dialog
      v-model:visible="linkDocumentDialogVisible"
      header="Lier un document"
      :style="{ width: '40rem' }"
      modal
    >
      <div class="flex flex-col gap-4">
        <div class="relative w-full">
          <div class="absolute top-1/2 -translate-y-1/2 left-3 text-surface-500 z-10">
            <font-awesome-icon icon="magnifying-glass" />
          </div>
          <InputText
            v-model="documentSearchQuery"
            placeholder="Rechercher un document..."
            class="w-full !pl-12"
            autofocus
          />
        </div>
        <Listbox
          v-model="selectedDocument"
          :options="filteredDocuments"
          optionLabel="title"
          class="w-full h-96"
          :virtualScrollerOptions="{ itemSize: 50 }"
          listStyle="height: 100%"
        >
          <template #option="slotProps">
            <div class="flex align-items-center gap-2">
              <font-awesome-icon icon="file-lines" class="text-color-secondary" />
              <div>
                <div class="font-medium">{{ slotProps.option.title }}</div>
                <div class="text-xs text-color-secondary">{{ slotProps.option.filename }}</div>
              </div>
            </div>
          </template>
        </Listbox>
      </div>
      <template #footer>
        <Button label="Annuler" text @click="linkDocumentDialogVisible = false">
          <template #icon>
            <font-awesome-icon icon="xmark" class="mr-2" />
          </template>
        </Button>
        <Button
          label="Lier"
          @click="confirmLinkDocument"
          :disabled="!selectedDocument"
          :loading="linkingDocument"
        >
          <template #icon>
            <font-awesome-icon icon="check" class="mr-2" />
          </template>
        </Button>
      </template>
    </Dialog>

    <!-- Link Indicator Dialog -->
    <Dialog
      v-model:visible="linkIndicatorDialogVisible"
      header="Lier un indicateur"
      :style="{ width: '40rem' }"
      modal
    >
      <div class="flex flex-col gap-4">
        <div class="relative w-full">
          <div class="absolute top-1/2 -translate-y-1/2 left-3 text-surface-500 z-10">
            <font-awesome-icon icon="magnifying-glass" />
          </div>
          <InputText
            v-model="indicatorSearchQuery"
            placeholder="Rechercher un indicateur..."
            class="w-full !pl-12"
            autofocus
          />
        </div>
        <Listbox
          v-model="selectedIndicator"
          :options="filteredIndicators"
          optionLabel="name"
          class="w-full h-96"
          :virtualScrollerOptions="{ itemSize: 50 }"
          listStyle="height: 100%"
        >
          <template #option="slotProps">
            <div class="flex align-items-center gap-2">
              <font-awesome-icon icon="chart-line" class="text-orange-500" />
              <div class="font-medium">{{ slotProps.option.name }}</div>
            </div>
          </template>
        </Listbox>
      </div>
      <template #footer>
        <Button label="Annuler" text @click="linkIndicatorDialogVisible = false">
          <template #icon>
            <font-awesome-icon icon="xmark" class="mr-2" />
          </template>
        </Button>
        <Button
          label="Lier"
          @click="confirmLinkIndicator"
          :disabled="!selectedIndicator"
          :loading="linkingIndicator"
        >
          <template #icon>
            <font-awesome-icon icon="check" class="mr-2" />
          </template>
        </Button>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useActionStore } from '@/stores/actions'
import { useAppStore } from '@/stores/app'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Knob from 'primevue/knob'
import Avatar from 'primevue/avatar'
import Card from 'primevue/card'
import Textarea from 'primevue/textarea'
import { useDocumentStore } from '@/stores/documents'
import { useIndicatorStore } from '@/stores/indicators'
import Dialog from 'primevue/dialog'
import Listbox from 'primevue/listbox'
import InputText from 'primevue/inputtext'
import type { User, Document, Indicator, Comment } from '@/stores/app'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

const route = useRoute()
const router = useRouter()
const actionStore = useActionStore()
const appStore = useAppStore()
const documentStore = useDocumentStore()
const indicatorStore = useIndicatorStore()
const toast = useToast()

const actionId = Number(route.params.id)
const loading = ref(true)
const updatingProgress = ref(false)
const progressUpdateValue = ref(0)

const action = computed(() => actionStore.currentAction)

// Documents Linking
const linkDocumentDialogVisible = ref(false)
const selectedDocument = ref<Document | null>(null)
const documentSearchQuery = ref('')
const linkingDocument = ref(false)

const openLinkDocumentDialog = () => {
  selectedDocument.value = null
  documentSearchQuery.value = ''
  documentStore.fetchDocuments(1, 100) // Adjust limit as needed or implement server-side search
  linkDocumentDialogVisible.value = true
}

const filteredDocuments = computed(() => {
  if (!documentStore.documents) return []
  // Exclude already linked documents
  const linkedIds = action.value?.documents?.map((d) => d.id) || []
  let docs = documentStore.documents.filter((d) => !linkedIds.includes(d.id))

  if (documentSearchQuery.value) {
    const query = documentSearchQuery.value.toLowerCase()
    docs = docs.filter(
      (d) => d.title.toLowerCase().includes(query) || d.filename.toLowerCase().includes(query),
    )
  }
  return docs
})

const confirmLinkDocument = async () => {
  if (!selectedDocument.value) return
  linkingDocument.value = true
  try {
    await actionStore.linkDocument(actionId, selectedDocument.value.id)
    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Document lié avec succès',
      life: 3000,
    })
    linkDocumentDialogVisible.value = false
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Erreur lors de la liaison du document',
      life: 3000,
    })
  } finally {
    linkingDocument.value = false
  }
}

const unlinkDocument = async (docId: number) => {
  try {
    await actionStore.unlinkDocument(actionId, docId)
    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Document délié avec succès',
      life: 3000,
    })
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Erreur lors du déliage du document',
      life: 3000,
    })
  }
}

const downloadDocument = async (id: number, filename: string) => {
  try {
    await documentStore.downloadDocument(id, filename)
    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Téléchargement démarré',
      life: 3000,
    })
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Erreur lors du téléchargement',
      life: 3000,
    })
  }
}

// Indicators Linking
const linkIndicatorDialogVisible = ref(false)
const selectedIndicator = ref<Indicator | null>(null)
const indicatorSearchQuery = ref('')
const linkingIndicator = ref(false)

const openLinkIndicatorDialog = () => {
  selectedIndicator.value = null
  indicatorSearchQuery.value = ''
  indicatorStore.fetchIndicators(1, 100)
  linkIndicatorDialogVisible.value = true
}

const filteredIndicators = computed(() => {
  if (!indicatorStore.indicators) return []
  const linkedIds = action.value?.indicators?.map((i) => i.id) || []
  let inds = indicatorStore.indicators.filter((i) => !linkedIds.includes(i.id))

  if (indicatorSearchQuery.value) {
    const query = indicatorSearchQuery.value.toLowerCase()
    inds = inds.filter(
      (i) => i.name.toLowerCase().includes(query) || i.code.toLowerCase().includes(query),
    )
  }
  return inds
})

const confirmLinkIndicator = async () => {
  if (!selectedIndicator.value) return
  linkingIndicator.value = true
  try {
    await actionStore.linkIndicator(actionId, selectedIndicator.value.id)
    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Indicateur lié avec succès',
      life: 3000,
    })
    linkIndicatorDialogVisible.value = false
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: "Erreur lors de la liaison de l'indicateur",
      life: 3000,
    })
  } finally {
    linkingIndicator.value = false
  }
}

const unlinkIndicator = async (indId: number) => {
  try {
    await actionStore.unlinkIndicator(actionId, indId)
    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Indicateur délié avec succès',
      life: 3000,
    })
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: "Erreur lors du déliage de l'indicateur",
      life: 3000,
    })
  }
}

// Comments logic
const newComment = ref('')
const submittingComment = ref(false)

const submitComment = async () => {
  if (!newComment.value.trim()) return

  submittingComment.value = true
  try {
    await actionStore.addComment(actionId, newComment.value)
    newComment.value = ''
    toast.add({ severity: 'success', summary: 'Succès', detail: 'Commentaire ajouté', life: 3000 })
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: "Impossible d'ajouter le commentaire",
      life: 3000,
    })
  } finally {
    submittingComment.value = false
  }
}

onMounted(async () => {
  if (actionId) {
    loading.value = true
    await actionStore.fetchActionById(actionId)
    loading.value = false
  }
})

// Helpers
const getPriorityLabel = (value: string | undefined) => {
  if (!value) return '-'
  const map: Record<string, string> = {
    low: 'Basse',
    medium: 'Moyenne',
    high: 'Haute',
    critical: 'Critique',
  }
  return map[value] || value
}

const getPrioritySeverity = (value: string | undefined): string => {
  if (!value) return 'secondary'
  const map: Record<string, string> = {
    low: 'info',
    medium: 'warn',
    high: 'danger',
    critical: 'danger',
  }
  return map[value] || 'info'
}

const getStatusLabel = (value: string | undefined) => {
  if (!value) return '-'
  const map: Record<string, string> = {
    open: 'Ouvert',
    in_progress: 'En cours',
    completed: 'Terminé',
    cancelled: 'Annulé',
  }
  return map[value] || value
}

const getStatusSeverity = (value: string | undefined): string => {
  if (!value) return 'secondary'
  const map: Record<string, string> = {
    open: 'info',
    in_progress: 'warn',
    completed: 'success',
    cancelled: 'secondary',
  }
  return map[value] || 'secondary'
}

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const formatDateTime = (dateString: string | undefined) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const getDueDateColorClass = (dateString: string | undefined, status: string | undefined) => {
  if (!dateString || !status || status === 'completed' || status === 'cancelled')
    return 'text-color'
  const today = new Date()
  const dueDate = new Date(dateString)
  const diffTime = dueDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return 'text-red-600 font-bold' // Overdue
  if (diffDays <= 3) return 'text-orange-500 font-bold' // Due soon
  if (diffDays <= 7) return 'text-yellow-600' // Due this week
  return 'text-color'
}

const canDeleteComment = (comment: Comment) => {
  const user = appStore.currentUser
  if (!user) return false
  return user.role === 'admin' || user.id === comment.user_id
}

const confirm = useConfirm()

const confirmDeleteComment = (commentId: number) => {
  confirm.require({
    message: 'Êtes-vous sûr de vouloir supprimer ce commentaire ?',
    header: 'Confirmation de suppression',
    icon: 'pi pi-exclamation-triangle',
    rejectLabel: 'Annuler',
    acceptLabel: 'Supprimer',
    rejectClass: 'p-button-secondary p-button-outlined',
    acceptClass: 'p-button-danger',
    accept: () => {
      deleteComment(commentId)
    },
  })
}

const deleteComment = async (commentId: number) => {
  try {
    await actionStore.deleteComment(commentId)
    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Commentaire supprimé',
      life: 3000,
    })
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Erreur lors de la suppression du commentaire',
      life: 3000,
    })
  }
}

const getInitials = (user: User | undefined) => {
  if (!user) return '?'
  return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase()
}

// Simple hash for avatar color
const stringToColor = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const c = (hash & 0x00ffffff).toString(16).toUpperCase()
  return '#' + '00000'.substring(0, 6 - c.length) + c
}

// Actions
const goBack = () => {
  router.back()
}

const editAction = () => {
  router.push(`/actions/${actionId}/edit`)
}

const inputProgressUpdate = () => {
  updateProgress()
}

const onProgressChange = () => {
  // Optionnel : on pourrait sauvegarder directement ici si on veut du "live save"
  updateProgress()
}

const debounceTimer = ref<NodeJS.Timeout | null>(null)

const adjustProgress = (delta: number) => {
  let newValue = progressUpdateValue.value + delta
  if (newValue < 0) newValue = 0
  if (newValue > 100) newValue = 100
  progressUpdateValue.value = newValue

  // Debounce saving
  if (debounceTimer.value) clearTimeout(debounceTimer.value)
  debounceTimer.value = setTimeout(() => {
    updateProgress()
  }, 1000)
}

const getProgressColor = (value: number) => {
  if (value < 30) return '#ef4444' // red-500
  if (value < 70) return '#f59e0b' // amber-500
  return '#22c55e' // green-500
}

const updateProgress = async () => {
  if (progressUpdateValue.value === action.value?.progress) return

  updatingProgress.value = true
  try {
    await actionStore.updateProgress(actionId, progressUpdateValue.value)
    toast.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Progression mise à jour',
      life: 3000,
    })
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Erreur lors de la mise à jour de la progression',
      life: 3000,
    })
  } finally {
    updatingProgress.value = false
  }
}

// Watcher pour initialiser la valeur du slider quand l'action est chargée
import { watch } from 'vue'
watch(
  action,
  (newAction) => {
    if (newAction) {
      progressUpdateValue.value = newAction.progress || 0
    }
  },
  { immediate: true },
)
</script>
