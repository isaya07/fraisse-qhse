<template>
    <div class="card">
        <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-bold text-gray-800">1/4h Sécurité</h1>
            <Button label="Nouveau 1/4h Sécurité" @click="openCreateDialog">
                <template #icon>
                    <font-awesome-icon icon="plus" />
                </template>
            </Button>
        </div>

        <DataTable :value="store.talks" :loading="store.loading" paginator :rows="10" stripedRows>
            <Column field="date" header="Date" sortable>
                <template #body="{ data }">
                    {{ formatDate(data.date) }}
                </template>
            </Column>
            <Column field="topic" header="Sujet" sortable></Column>
            <Column field="location" header="Lieu" sortable></Column>
            <Column field="instructor.first_name" header="Animateur" sortable>
                <template #body="{ data }">
                    {{ data.instructor.first_name }} {{ data.instructor.last_name }}
                </template>
            </Column>
            <Column header="Participants">
                <template #body="{ data }">
                    {{ data.attendees?.length || 0 }} participants
                </template>
            </Column>
            <Column header="Actions" style="width: 120px">
                <template #body="{ data }">
                    <div class="flex gap-2">
                        <Button size="small" text rounded severity="info" @click="openEditDialog(data)">
                            <template #icon>
                                <font-awesome-icon icon="pencil" />
                            </template>
                        </Button>
                        <Button size="small" text rounded severity="danger" @click="confirmDelete(data)">
                            <template #icon>
                                <font-awesome-icon icon="trash" />
                            </template>
                        </Button>
                    </div>
                </template>
            </Column>
        </DataTable>

        <Dialog v-model:visible="dialogVisible"
            :header="editingTalk ? 'Modifier le 1/4h Sécurité' : 'Nouveau 1/4h Sécurité'" modal
            class="p-fluid w-full max-w-lg">
            <ToolboxTalkForm :talk="editingTalk" @save="closeDialog" @cancel="dialogVisible = false" />
        </Dialog>

        <ConfirmDialog></ConfirmDialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePlanningStore, type ToolboxTalk } from '@/stores/planning'
import { useConfirm } from 'primevue/useconfirm'
import { format } from 'date-fns'
import ToolboxTalkForm from '@/components/planning/ToolboxTalkForm.vue'

const store = usePlanningStore()
const confirm = useConfirm()

const dialogVisible = ref(false)
const editingTalk = ref<ToolboxTalk | undefined>(undefined)

onMounted(() => {
    store.fetchTalks()
})

const formatDate = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy')
}

const openCreateDialog = () => {
    editingTalk.value = undefined
    dialogVisible.value = true
}

const openEditDialog = (talk: ToolboxTalk) => {
    editingTalk.value = talk
    dialogVisible.value = true
}

const closeDialog = () => {
    dialogVisible.value = false
    store.fetchTalks()
}

const confirmDelete = (talk: ToolboxTalk) => {
    confirm.require({
        message: 'Êtes-vous sûr de vouloir supprimer ce 1/4h sécurité ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            store.deleteTalk(talk.id)
        }
    })
}
</script>
