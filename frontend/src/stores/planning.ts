import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'

export interface PlanningEvent {
    id: string
    title: string
    start: string
    end?: string
    type: 'action' | 'training' | 'visit' | 'talk' | 'maintenance'
    original_id: number
    color: string
}

export interface SafetyVisit {
    id: number
    date: string
    location: string
    auditor_id: number
    score: number | null
    status: 'planned' | 'completed' | 'cancelled'
    report_path: string | null
    auditor?: {
        id: number
        first_name: string
        last_name: string
    }
}

export interface ToolboxTalk {
    id: number
    date: string
    topic: string
    instructor_id: number
    location: string
    notes_path: string | null
    instructor?: {
        id: number
        first_name: string
        last_name: string
    }
    attendees?: {
        id: number
        first_name: string
        last_name: string
    }[]
}

interface PlanningState {
    events: PlanningEvent[]
    visits: SafetyVisit[]
    talks: ToolboxTalk[]
    loading: boolean
    error: string | null
}

export const usePlanningStore = defineStore('planning', {
    state: (): PlanningState => ({
        events: [],
        visits: [],
        talks: [],
        loading: false,
        error: null,
    }),

    actions: {
        async fetchEvents(start?: string, end?: string) {
            this.loading = true
            try {
                const { get } = useApi()
                let url = '/planning/events'
                const params = new URLSearchParams()
                if (start) params.append('start', start)
                if (end) params.append('end', end)
                const queryString = params.toString()
                if (queryString) url += `?${queryString}`

                const response = await get<PlanningEvent[]>(url)
                if (response.success && response.data) {
                    const responseData = response.data as any
                    this.events = responseData.data || responseData
                }
            } catch (error) {
                this.error = 'Failed to fetch events'
                console.error(error)
            } finally {
                this.loading = false
            }
        },

        // Safety Visits
        async fetchVisits() {
            this.loading = true
            try {
                const { get } = useApi()
                const response = await get<SafetyVisit[]>('/safety-visits')
                if (response.success && response.data) {
                    const responseData = response.data as any
                    this.visits = responseData.data || responseData
                }
            } catch (error) {
                this.error = 'Failed to fetch visits'
                console.error(error)
            } finally {
                this.loading = false
            }
        },

        async createVisit(data: Partial<SafetyVisit>) {
            this.loading = true
            try {
                const { post } = useApi()
                const response = await post<SafetyVisit>('/safety-visits', data)
                if (response.success && response.data) {
                    const responseData = response.data as any
                    const newVisit = responseData.data || responseData
                    this.visits.unshift(newVisit)
                    return newVisit
                }
            } catch (error) {
                this.error = 'Failed to create visit'
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateVisit(id: number, data: Partial<SafetyVisit>) {
            this.loading = true
            try {
                const { put } = useApi()
                const response = await put<SafetyVisit>(`/safety-visits/${id}`, data)
                if (response.success && response.data) {
                    const responseData = response.data as any
                    const updatedVisit = responseData.data || responseData
                    const index = this.visits.findIndex((v) => v.id === id)
                    if (index !== -1) {
                        this.visits[index] = updatedVisit
                    }
                    return updatedVisit
                }
            } catch (error) {
                this.error = 'Failed to update visit'
                throw error
            } finally {
                this.loading = false
            }
        },

        async deleteVisit(id: number) {
            this.loading = true
            try {
                const { del } = useApi()
                const response = await del(`/safety-visits/${id}`)
                if (response.success) {
                    this.visits = this.visits.filter((v) => v.id !== id)
                }
            } catch (error) {
                this.error = 'Failed to delete visit'
                throw error
            } finally {
                this.loading = false
            }
        },

        // Toolbox Talks
        async fetchTalks() {
            this.loading = true
            try {
                const { get } = useApi()
                const response = await get<ToolboxTalk[]>('/toolbox-talks')
                if (response.success && response.data) {
                    const responseData = response.data as any
                    this.talks = responseData.data || responseData
                }
            } catch (error) {
                this.error = 'Failed to fetch talks'
                console.error(error)
            } finally {
                this.loading = false
            }
        },

        async createTalk(data: Partial<ToolboxTalk> & { attendees?: number[] }) {
            this.loading = true
            try {
                const { post } = useApi()
                const response = await post<ToolboxTalk>('/toolbox-talks', data)
                if (response.success && response.data) {
                    const responseData = response.data as any
                    const newTalk = responseData.data || responseData
                    this.talks.unshift(newTalk)
                    return newTalk
                }
            } catch (error) {
                this.error = 'Failed to create talk'
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateTalk(id: number, data: Partial<ToolboxTalk> & { attendees?: number[] }) {
            this.loading = true
            try {
                const { put } = useApi()
                const response = await put<ToolboxTalk>(`/toolbox-talks/${id}`, data)
                if (response.success && response.data) {
                    const responseData = response.data as any
                    const updatedTalk = responseData.data || responseData
                    const index = this.talks.findIndex((t) => t.id === id)
                    if (index !== -1) {
                        this.talks[index] = updatedTalk
                    }
                    return updatedTalk
                }
            } catch (error) {
                this.error = 'Failed to update talk'
                throw error
            } finally {
                this.loading = false
            }
        },

        async deleteTalk(id: number) {
            this.loading = true
            try {
                const { del } = useApi()
                const response = await del(`/toolbox-talks/${id}`)
                if (response.success) {
                    this.talks = this.talks.filter((t) => t.id !== id)
                }
            } catch (error) {
                this.error = 'Failed to delete talk'
                throw error
            } finally {
                this.loading = false
            }
        },
    },
})
