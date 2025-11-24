<template>
  <div class="p-4">
    <div class="card">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 class="text-2xl font-bold text-gray-800">Gestion des Utilisateurs</h1>
        <div class="flex gap-2">
          <Button label="Nouvel utilisateur" @click="createNewUser" severity="primary">
            <template #icon>
              <font-awesome-icon icon="plus" class="mr-2" />
            </template>
          </Button>
        </div>
      </div>

      <DataTable
        ref="dt"
        :value="users"
        lazy
        :paginator="true"
        :rows="itemsPerPage"
        :totalRecords="totalRecords"
        :loading="loading"
        @page="onPage"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 15, 25, 50]"
        currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} utilisateurs"
        tableStyle="min-width: 50rem"
        class="p-datatable-sm"
      >
        <template #header>
          <div class="flex flex-wrap gap-2 items-center justify-between">
            <h4 class="m-0">Liste des utilisateurs</h4>
            <IconField iconPosition="left">
              <InputIcon>
                <font-awesome-icon icon="magnifying-glass" />
              </InputIcon>
              <InputText v-model="searchQuery" placeholder="Rechercher..." />
            </IconField>
          </div>
        </template>

        <template #empty> Aucun utilisateur trouvé. </template>

        <Column field="username" header="Nom d'utilisateur" sortable style="min-width: 10rem">
          <template #body="{ data }">
            <div class="font-medium">{{ data.username }}</div>
          </template>
        </Column>

        <Column field="email" header="Email" sortable style="min-width: 14rem">
          <template #body="{ data }">
            {{ data.email }}
          </template>
        </Column>

        <Column field="first_name" header="Prénom" sortable style="min-width: 10rem">
          <template #body="{ data }">
            {{ data.first_name }}
          </template>
        </Column>

        <Column field="last_name" header="Nom" sortable style="min-width: 10rem">
          <template #body="{ data }">
            {{ data.last_name }}
          </template>
        </Column>

        <Column field="role" header="Rôle" sortable style="min-width: 8rem">
          <template #body="{ data }">
            <Tag :value="getRoleLabel(data.role)" :severity="getRoleSeverity(data.role)" />
          </template>
        </Column>

        <Column field="is_active" header="Statut" sortable style="min-width: 8rem">
          <template #body="{ data }">
            <Tag
              :value="data.is_active ? 'Actif' : 'Inactif'"
              :severity="data.is_active ? 'success' : 'danger'"
            />
          </template>
        </Column>

        <Column header="Actions" :exportable="false" style="min-width: 8rem">
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button
                text
                rounded
                severity="success"
                @click="editUser(data.id)"
                v-tooltip.top="'Modifier'"
              >
                <font-awesome-icon icon="pencil" />
              </Button>
              <Button
                text
                rounded
                severity="danger"
                @click="confirmDelete(data)"
                v-tooltip.top="'Supprimer'"
                :disabled="data.id === currentUser?.id"
              >
                <font-awesome-icon icon="trash" />
              </Button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/users'
import { useAppStore } from '@/stores/app'
import type { User } from '@/stores/app'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Tag from 'primevue/tag'

const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()
const confirm = useConfirm()
const toast = useToast()

// États
const searchQuery = ref('')
const itemsPerPage = ref(15)
const currentPage = ref(0)

// Accès au store
const users = computed(() => userStore.users)
const loading = computed(() => userStore.loading)
const totalRecords = computed(() => userStore.pagination.total)
const currentUser = computed(() => appStore.currentUser)

// Chargement des données
const loadUsers = async () => {
  const filters = {
    search: searchQuery.value,
  }
  await userStore.fetchUsers(currentPage.value + 1, itemsPerPage.value, filters)
}

const onPage = (event: { page: number; rows: number }) => {
  currentPage.value = event.page
  itemsPerPage.value = event.rows
  loadUsers()
}

// Helpers pour l'affichage
const getRoleLabel = (role: string) => {
  const map: Record<string, string> = {
    admin: 'Administrateur',
    manager: 'Manager',
    user: 'Utilisateur',
    viewer: 'Observateur',
  }
  return map[role] || role
}

const getRoleSeverity = (role: string) => {
  const map: Record<string, string> = {
    admin: 'danger',
    manager: 'warn',
    user: 'info',
    viewer: 'secondary',
  }
  return map[role] || 'info'
}

// Actions
const createNewUser = () => {
  router.push('/users/create')
}

const editUser = (id: number) => {
  router.push(`/users/${id}/edit`)
}

const confirmDelete = (user: User) => {
  confirm.require({
    message: `Voulez-vous vraiment supprimer l'utilisateur "${user.username}" ?`,
    header: 'Confirmation de suppression',
    icon: 'exclamation-triangle',
    rejectLabel: 'Annuler',
    acceptLabel: 'Supprimer',
    rejectClass: 'p-button-secondary p-button-outlined',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await userStore.deleteUser(user.id)
        toast.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Utilisateur supprimé',
          life: 3000,
          icon: 'check',
        })
        loadUsers()
      } catch {
        toast.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Impossible de supprimer l'utilisateur",
          life: 3000,
          icon: 'times',
        })
      }
    },
  })
}

// Watchers
watch(searchQuery, () => {
  currentPage.value = 0
  loadUsers()
})

onMounted(() => {
  loadUsers()
})
</script>
