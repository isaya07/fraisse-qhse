<template>
    <div class="card h-full flex flex-col">
        <div class="flex justify-between items-center mb-4">
            <h2>Planning Global</h2>
            <div class="flex gap-2 items-center">
                <div class="flex gap-2 mr-4">
                    <Button label="Visite" size="small" @click="openVisitDialog">
                        <template #icon>
                            <font-awesome-icon icon="plus" />
                        </template>
                    </Button>
                    <Button label="1/4h Sécurité" size="small" severity="secondary" @click="openTalkDialog">
                        <template #icon>
                            <font-awesome-icon icon="plus" />
                        </template>
                    </Button>
                </div>
                <div class="flex gap-2">
                    <Button text @click="prevMonth">
                        <template #icon>
                            <font-awesome-icon icon="chevron-left" />
                        </template>
                    </Button>
                    <span class="text-xl font-semibold min-w-[150px] text-center flex items-center justify-center">
                        {{ format(currentDate, 'MMMM yyyy', { locale: fr }) }}
                    </span>
                    <Button text @click="nextMonth">
                        <template #icon>
                            <font-awesome-icon icon="chevron-right" />
                        </template>
                    </Button>
                    <Button label="Aujourd'hui" variant="outlined" size="small" @click="goToToday" />
                </div>
            </div>
        </div>

        <div class="grow flex flex-col border rounded-lg overflow-hidden">
            <!-- Week Days Header -->
            <div class="grid grid-cols-7 bg-gray-50 border-b">
                <div v-for="day in weekDays" :key="day"
                    class="p-3 text-center font-semibold text-gray-600 uppercase text-sm">
                    {{ day }}
                </div>
            </div>

            <!-- Days Grid -->
            <div class="grid grid-cols-7 auto-rows-fr bg-white">
                <div v-for="day in calendarDays" :key="day.date.toISOString()"
                    class="min-h-[120px] p-2 border-b border-r relative hover:bg-gray-50 transition-colors" :class="{
                        'bg-gray-50/50': !day.isCurrentMonth,
                        'bg-blue-50/30': day.isToday,
                    }" @click="handleDateClick(day.date)">
                    <div class="flex justify-between items-start mb-1">
                        <span class="text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full" :class="{
                            'bg-blue-600 text-white': day.isToday,
                            'text-gray-400': !day.isCurrentMonth,
                            'text-gray-700': day.isCurrentMonth && !day.isToday,
                        }">
                            {{ format(day.date, 'd') }}
                        </span>
                    </div>

                    <div class="flex flex-col gap-1 overflow-y-auto max-h-[90px] custom-scrollbar">
                        <div v-for="event in day.events" :key="event.id"
                            class="text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity text-white shadow-sm"
                            :style="{ backgroundColor: event.color }" @click.stop="handleEventClick(event)">
                            {{ event.title }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Dialog v-model:visible="visitDialogVisible" header="Nouvelle visite" modal class="p-fluid w-full max-w-lg">
            <VisitForm @save="onVisitSaved" @cancel="visitDialogVisible = false" />
        </Dialog>

        <Dialog v-model:visible="talkDialogVisible" header="Nouveau 1/4h Sécurité" modal
            class="p-fluid w-full max-w-lg">
            <ToolboxTalkForm @save="onTalkSaved" @cancel="talkDialogVisible = false" />
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { usePlanningStore, type PlanningEvent } from '@/stores/planning'
import VisitForm from '@/components/planning/VisitForm.vue'
import ToolboxTalkForm from '@/components/planning/ToolboxTalkForm.vue'
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
    isToday,
} from 'date-fns'
import { fr } from 'date-fns/locale'

const router = useRouter()
const store = usePlanningStore()

const currentDate = ref(new Date())
const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

const visitDialogVisible = ref(false)
const talkDialogVisible = ref(false)

const calendarDays = computed(() => {
    const start = startOfWeek(startOfMonth(currentDate.value), { weekStartsOn: 1 })
    const end = endOfWeek(endOfMonth(currentDate.value), { weekStartsOn: 1 })

    const days = eachDayOfInterval({ start, end })

    return days.map((date) => ({
        date,
        isCurrentMonth: isSameMonth(date, currentDate.value),
        isToday: isToday(date),
        events: getEventsForDate(date),
    }))
})

function getEventsForDate(date: Date) {
    return store.events.filter((event) => isSameDay(new Date(event.start), date))
}

async function fetchEvents() {
    const start = startOfWeek(startOfMonth(currentDate.value), { weekStartsOn: 1 })
    const end = endOfWeek(endOfMonth(currentDate.value), { weekStartsOn: 1 })
    await store.fetchEvents(start.toISOString(), end.toISOString())
}

function prevMonth() {
    currentDate.value = subMonths(currentDate.value, 1)
}

function nextMonth() {
    currentDate.value = addMonths(currentDate.value, 1)
}

function goToToday() {
    currentDate.value = new Date()
}

function handleDateClick(date: Date) {
    // Optional: Open create dialog for this date
    console.log('Date clicked:', date)
}

function handleEventClick(event: PlanningEvent) {
    switch (event.type) {
        case 'action':
            router.push(`/actions/${event.original_id}`)
            break
        case 'training':
            router.push(`/trainings/sessions/${event.original_id}`)
            break
        case 'visit':
            // Could open a dialog or navigate to detail
            router.push('/planning/visits')
            break
        case 'talk':
            router.push('/planning/talks')
            break
        case 'maintenance':
            router.push(`/equipment/${event.original_id}`)
            break
    }
}

function openVisitDialog() {
    visitDialogVisible.value = true
}

function openTalkDialog() {
    talkDialogVisible.value = true
}

function onVisitSaved() {
    visitDialogVisible.value = false
    fetchEvents()
}

function onTalkSaved() {
    talkDialogVisible.value = false
    fetchEvents()
}

watch(currentDate, () => {
    fetchEvents()
})

onMounted(() => {
    fetchEvents()
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
    border-radius: 20px;
}
</style>
