<template>
    <div class="card">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Notifications</h1>
            <div class="flex gap-2">
                <Button label="Tout marquer comme lu" icon="check" @click="markAllAsRead"
                    :disabled="store.unreadCount === 0">
                    <template #icon>
                        <font-awesome-icon icon="check-double" class="mr-2" />
                    </template>
                </Button>
                <Button label="Paramètres" severity="secondary" @click="router.push('/notifications/settings')">
                    <template #icon>
                        <font-awesome-icon icon="cog" class="mr-2" />
                    </template>
                </Button>
            </div>
        </div>

        <DataTable :value="store.notifications" :loading="store.loading" paginator :rows="10" stripedRows>
            <Column field="type" header="Type" sortable>
                <template #body="{ data }">
                    <Tag :value="data.type" :severity="getTypeSeverity(data.type)" />
                </template>
            </Column>
            <Column field="message" header="Message" sortable></Column>
            <Column field="created_at" header="Date" sortable>
                <template #body="{ data }">
                    {{ formatDate(data.created_at) }}
                </template>
            </Column>
            <Column header="Statut" sortable field="read_at">
                <template #body="{ data }">
                    <span v-if="data.read_at" class="text-green-600 text-sm flex items-center gap-1">
                        <font-awesome-icon icon="check" /> Lu
                    </span>
                    <span v-else class="text-blue-600 text-sm font-semibold flex items-center gap-1">
                        <font-awesome-icon icon="circle" class="text-[8px]" /> Non lu
                    </span>
                </template>
            </Column>
            <Column header="Actions" style="width: 100px">
                <template #body="{ data }">
                    <Button v-if="!data.read_at" icon="check" text rounded severity="success"
                        @click="markAsRead(data.id)" title="Marquer comme lu">
                        <template #icon>
                            <font-awesome-icon icon="check" />
                        </template>
                    </Button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNotificationStore } from '@/stores/notification'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const router = useRouter()
const store = useNotificationStore()

onMounted(() => {
    store.fetchNotifications(false) // Fetch all notifications
})

const markAsRead = (id: number) => {
    store.markAsRead(id)
}

const markAllAsRead = () => {
    store.markAllAsRead()
}

const formatDate = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: fr })
}

const getTypeSeverity = (type: string) => {
    switch (type) {
        case 'action': return 'warning'
        case 'equipment': return 'info'
        case 'visit': return 'success'
        case 'talk': return 'primary'
        default: return 'secondary'
    }
}
</script>
