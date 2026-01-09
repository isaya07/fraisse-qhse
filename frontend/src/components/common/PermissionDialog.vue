<template>
  <Dialog
    v-bind:visible="visible"
    @update:visible="$emit('update:visible', $event)"
    modal
    header="Filtres d'accès et Permissions"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="flex flex-col gap-6">
      <!-- Add Permission -->
      <div
        class="flex flex-col gap-3 p-4 bg-surface-50 dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700"
      >
        <h4 class="font-semibold m-0 text-sm uppercas text-color-secondary">Ajouter un accès</h4>
        <div class="flex flex-col md:flex-row gap-3 items-end">
          <div class="flex-1 w-full relative">
            <span class="p-input-icon-left w-full">
              <div class="relative w-full">
                <div class="absolute top-1/2 -translate-y-1/2 left-3 text-surface-500 z-10">
                  <font-awesome-icon icon="magnifying-glass" />
                </div>
                <AutoComplete
                  v-model="selectedUser"
                  :suggestions="filteredUsers"
                  @complete="searchUser"
                  optionLabel="fullname"
                  placeholder="Rechercher un utilisateur..."
                  class="w-full"
                  :inputClass="'w-full pl-10!'"
                >
                  <template #option="slotProps">
                    <div class="flex items-center gap-2">
                      <Avatar
                        :label="getInitials(slotProps.option)"
                        shape="circle"
                        size="small"
                        class="bg-primary-100 text-primary-700"
                      />
                      <div class="flex flex-col">
                        <span class="font-medium"
                          >{{ slotProps.option.first_name }} {{ slotProps.option.last_name }}</span
                        >
                        <span class="text-xs text-color-secondary">{{
                          slotProps.option.email
                        }}</span>
                      </div>
                    </div>
                  </template>
                </AutoComplete>
              </div>
            </span>
          </div>
          <div class="w-full md:w-48">
            <Dropdown
              v-model="selectedLevel"
              :options="accessLevels"
              optionLabel="label"
              optionValue="value"
              placeholder="Niveau"
              class="w-full"
            />
          </div>
          <Button
            label="Ajouter"
            icon="pi pi-plus"
            @click="addPermission"
            :loading="loading"
            :disabled="!selectedUser || !selectedLevel"
          >
            <template #icon>
              <font-awesome-icon icon="plus" class="mr-2" />
            </template>
          </Button>
        </div>
      </div>

      <!-- Permission List -->
      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <h4 class="font-semibold m-0">Accès existants</h4>
          <span class="text-sm text-color-secondary" v-if="permissions.length === 0"
            >Aucun accès spécifique défini</span
          >
        </div>

        <div v-if="loadingList" class="flex justify-center py-4">
          <font-awesome-icon icon="spinner" spin />
        </div>

        <div
          v-else
          class="rounded-lg border border-surface-200 dark:border-surface-700 overflow-hidden"
        >
          <!-- Public/Global Info (Static for now) -->
          <div
            class="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center"
              >
                <font-awesome-icon icon="shield-halved" />
              </div>
              <div class="flex flex-col">
                <span class="font-medium">Administrateurs</span>
                <span class="text-xs text-color-secondary">Accès total (Global)</span>
              </div>
            </div>
            <Tag value="Admin" severity="danger" />
          </div>

          <div
            class="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"
              >
                <font-awesome-icon icon="user" />
              </div>
              <div class="flex flex-col">
                <span class="font-medium">Créateur</span>
                <span class="text-xs text-color-secondary">Propriétaire</span>
              </div>
            </div>
            <Tag value="Admin" severity="danger" />
          </div>

          <!-- Dynamic List -->
          <div
            v-for="perm in permissions"
            :key="perm.id"
            class="flex items-center justify-between p-3 border-b border-surface-200 dark:border-surface-700 last:border-0 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
          >
            <div class="flex items-center gap-3">
              <Avatar
                :label="getInitials(perm.user)"
                shape="circle"
                class="bg-surface-200 text-surface-600"
              />
              <div class="flex flex-col">
                <span class="font-medium"
                  >{{ perm.user.first_name }} {{ perm.user.last_name }}</span
                >
                <span class="text-xs text-color-secondary">{{ perm.user.email }}</span>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <Tag
                :severity="getLevelSeverity(perm.access_level)"
                :value="getLevelLabel(perm.access_level)"
              />
              <Button
                icon="pi pi-trash"
                text
                rounded
                severity="danger"
                @click="revokePermission(perm)"
                :loading="loading"
                v-tooltip.top="'Révoquer l\'accès'"
              >
                <template #icon>
                  <font-awesome-icon icon="trash" />
                </template>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import AutoComplete from 'primevue/autocomplete'
import Dropdown from 'primevue/dropdown'
import Avatar from 'primevue/avatar'
import Tag from 'primevue/tag'
import { usePermissionStore, type AccessControl } from '@/stores/permissions'
import { useUserStore } from '@/stores/users'
import type { User } from '@/stores/app'
import { useToast } from 'primevue/usetoast'

const props = defineProps<{
  visible: boolean
  entityType: string
  entityId: number
}>()

const emit = defineEmits(['update:visible'])

const permissionStore = usePermissionStore()
const userStore = useUserStore()
const toast = useToast()

const loading = ref(false)
const loadingList = ref(false)

// Add Permission Form
const selectedUser = ref<(User & { fullname?: string }) | null>(null)
const selectedLevel = ref<string>('read')
const filteredUsers = ref<User[]>([])

const accessLevels = [
  { label: 'Lecture Seule', value: 'read' },
  { label: 'Écriture (Modifier)', value: 'write' },
  { label: 'Admin (Supprimer)', value: 'admin' },
]

const permissions = computed(() => permissionStore.permissions)

const getInitials = (user: User) => {
  return `${user.first_name?.charAt(0) || ''}${user.last_name?.charAt(0) || ''}`
}

const getLevelLabel = (level: string) => {
  const map: Record<string, string> = {
    read: 'Lecture',
    write: 'Écriture',
    admin: 'Admin',
  }
  return map[level] || level
}

const getLevelSeverity = (level: string) => {
  const map: Record<string, string> = {
    read: 'info',
    write: 'warn',
    admin: 'danger',
  }
  return map[level] || 'info'
}

const searchUser = async (event: { query: string }) => {
  // Use userStore to search
  // Assuming userStore has a way to fetch list, we filter locally for now if not searchable via API
  // Ideally, use an API search. For now, fetch all if empty and filter.
  if (userStore.users.length === 0) {
    await userStore.fetchUsers()
  }

  const query = event.query.toLowerCase()
  filteredUsers.value = userStore.users
    .filter((u) => {
      const full = `${u.first_name} ${u.last_name}`.toLowerCase()
      return full.includes(query) || u.email.toLowerCase().includes(query)
    })
    .map((u) => ({ ...u, fullname: `${u.first_name} ${u.last_name}` }))
}

const loadPermissions = async () => {
  loadingList.value = true
  try {
    await permissionStore.fetchPermissions(props.entityType, props.entityId)
  } finally {
    loadingList.value = false
  }
}

const addPermission = async () => {
  if (!selectedUser.value) return
  loading.value = true
  try {
    await permissionStore.grantPermission(
      props.entityType,
      props.entityId,
      selectedUser.value.id,
      selectedLevel.value,
    )
    toast.add({ severity: 'success', summary: 'Succès', detail: 'Permission accordée', life: 3000 })
    selectedUser.value = null
    selectedLevel.value = 'read'
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: "Impossible d'ajouter la permission",
      life: 3000,
    })
  } finally {
    loading.value = false
  }
}

const revokePermission = async (perm: AccessControl) => {
  loading.value = true
  try {
    await permissionStore.revokePermission(perm.id, props.entityType, props.entityId)
    toast.add({ severity: 'success', summary: 'Succès', detail: 'Accès révoqué', life: 3000 })
  } catch {
    toast.add({
      severity: 'error',
      summary: 'Erreur',
      detail: "Impossible de révoquer l'accès",
      life: 3000,
    })
  } finally {
    loading.value = false
  }
}

// Watch visibility to load data
watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      loadPermissions()
      // Prefetch users if needed
      if (userStore.users.length === 0) userStore.fetchUsers()
    }
  },
)
</script>
