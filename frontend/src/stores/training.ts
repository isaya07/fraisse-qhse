import { defineStore } from 'pinia'
import { useApi, type ApiResponse } from '@/composables/useApi'

export interface TrainingCategory {
    id: number
    name: string
    color: string | null
    icon: string | null
}

export interface TrainingOrganization {
    id: number
    name: string
    contact_info: string | null
    address: string | null
}

export interface Training {
    id: number
    training_category_id: number
    title: string
    description: string | null
    duration_hours: number | null
    validity_months: number | null
    required_frequency_months: number | null
    category?: TrainingCategory
}

export interface TrainingParticipation {
    id: number
    training_session_id: number
    user_id: number
    status: 'registered' | 'attended' | 'validated' | 'failed' | 'cancelled'
    certificate_path: string | null
    obtained_date: string | null
    expiration_date: string | null
    user?: {
        id: number
        first_name: string
        last_name: string
        email: string
    }
}

export interface TrainingSession {
    id: number
    training_id: number
    training_organization_id: number | null
    start_date: string
    end_date: string
    location: string
    instructor: string | null
    max_participants: number | null
    cost: number | null
    status: 'planned' | 'completed' | 'cancelled'
    training?: Training
    organization?: TrainingOrganization
    participations?: TrainingParticipation[]
    documents?: any[]
}

interface TrainingState {
    categories: TrainingCategory[]
    organizations: TrainingOrganization[]
    trainings: Training[]
    sessions: TrainingSession[]
    loading: boolean
    error: string | null
}

export const useTrainingStore = defineStore('training', {
    state: (): TrainingState => ({
        categories: [],
        organizations: [],
        trainings: [],
        sessions: [],
        loading: false,
        error: null,
    }),

    actions: {
        // Categories
        async fetchCategories() {
            this.loading = true
            try {
                const { get } = useApi()
                const response = await get<TrainingCategory[]>('/training-categories')
                if (response.success && response.data) {
                    const responseData = response.data as any
                    this.categories = responseData.data || responseData
                }
            } catch (error) {
                this.error = 'Failed to fetch categories'
                console.error(error)
            } finally {
                this.loading = false
            }
        },

        async createCategory(data: Partial<TrainingCategory>) {
            this.loading = true
            try {
                const { post } = useApi()
                const response = await post<TrainingCategory>('/training-categories', data)
                if (response.success && response.data) {
                    const responseData = response.data as any
                    const newCategory = responseData.data || responseData
                    this.categories.push(newCategory)
                    return newCategory
                }
            } catch (error) {
                this.error = 'Failed to create category'
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateCategory(id: number, data: Partial<TrainingCategory>) {
            this.loading = true
            try {
                const { put } = useApi()
                const response = await put<TrainingCategory>(`/training-categories/${id}`, data)
                if (response.success && response.data) {
                    const responseData = response.data as any
                    const updatedCategory = responseData.data || responseData
                    const index = this.categories.findIndex((c) => c.id === id)
                    if (index !== -1) {
                        this.categories[index] = updatedCategory
                    }
                    return updatedCategory
                }
            } catch (error) {
                this.error = 'Failed to update category'
                throw error
            } finally {
                this.loading = false
            }
        },

        async deleteCategory(id: number) {
            this.loading = true
            try {
                const { del } = useApi()
                const response = await del(`/training-categories/${id}`)
                if (response.success) {
                    this.categories = this.categories.filter((c) => c.id !== id)
                }
            } catch (error) {
                this.error = 'Failed to delete category'
                throw error
            } finally {
                this.loading = false
            }
        },

        // Organizations
        async fetchOrganizations() {
            this.loading = true
            try {
                const { get } = useApi()
                const response = await get<TrainingOrganization[]>('/training-organizations')
                if (response.success && response.data) {
                    const responseData = response.data as any
                    this.organizations = responseData.data || responseData
                }
            } catch (error) {
                this.error = 'Failed to fetch organizations'
                console.error(error)
            } finally {
                this.loading = false
            }
        },

        async createOrganization(data: Partial<TrainingOrganization>) {
            this.loading = true
            try {
                const { post } = useApi()
                const response = await post<TrainingOrganization>('/training-organizations', data)
                if (response.success && response.data) {
                    const responseData = response.data as any
                    const newOrg = responseData.data || responseData
                    this.organizations.push(newOrg)
                    return newOrg
                }
            } catch (error) {
                this.error = 'Failed to create organization'
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateOrganization(id: number, data: Partial<TrainingOrganization>) {
            this.loading = true
            try {
                const { put } = useApi()
                const response = await put<TrainingOrganization>(`/training-organizations/${id}`, data)
                if (response.success && response.data) {
                    const responseData = response.data as any
                    const updatedOrg = responseData.data || responseData
                    const index = this.organizations.findIndex((o) => o.id === id)
                    if (index !== -1) {
                        this.organizations[index] = updatedOrg
                    }
                    return updatedOrg
                }
            } catch (error) {
                this.error = 'Failed to update organization'
                throw error
            } finally {
                this.loading = false
            }
        },

        async deleteOrganization(id: number) {
            this.loading = true
            try {
                const { del } = useApi()
                const response = await del(`/training-organizations/${id}`)
                if (response.success) {
                    this.organizations = this.organizations.filter((o) => o.id !== id)
                }
            } catch (error) {
                this.error = 'Failed to delete organization'
                throw error
            } finally {
                this.loading = false
            }
        },

        // Trainings
        async fetchTrainings() {
            this.loading = true
            try {
                const { get } = useApi()
                const response = await get<Training[]>('/trainings')
                if (response.success && response.data) {
                    const responseData = response.data as any
                    this.trainings = responseData.data || responseData
                }
            } catch (error) {
                this.error = 'Failed to fetch trainings'
                console.error(error)
            } finally {
                this.loading = false
            }
        },

        async createTraining(data: Partial<Training>) {
            this.loading = true
            try {
                const { post } = useApi()
                const response = await post<Training>('/trainings', data)
                if (response.success && response.data) {
                    const responseData = response.data as any
                    const newTraining = responseData.data || responseData
                    this.trainings.push(newTraining)
                    return newTraining
                }
            } catch (error) {
                this.error = 'Failed to create training'
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateTraining(id: number, data: Partial<Training>) {
            this.loading = true
            try {
                const { put } = useApi()
                const response = await put<Training>(`/trainings/${id}`, data)
                if (response.success && response.data) {
                    const responseData = response.data as any
                    const updatedTraining = responseData.data || responseData
                    const index = this.trainings.findIndex((t) => t.id === id)
                    if (index !== -1) {
                        this.trainings[index] = updatedTraining
                    }
                    return updatedTraining
                }
            } catch (error) {
                this.error = 'Failed to update training'
                throw error
            } finally {
                this.loading = false
            }
        },

        async deleteTraining(id: number) {
            this.loading = true
            try {
                const { del } = useApi()
                const response = await del(`/trainings/${id}`)
                if (response.success) {
                    this.trainings = this.trainings.filter((t) => t.id !== id)
                }
            } catch (error) {
                this.error = 'Failed to delete training'
                throw error
            } finally {
                this.loading = false
            }
        },

        // Sessions
        async fetchSessions() {
            this.loading = true
            try {
                const { get } = useApi()
                const response = await get<TrainingSession[]>('/training-sessions')
                if (response.success && response.data) {
                    const responseData = response.data as any
                    this.sessions = responseData.data || responseData
                }
            } catch (error) {
                this.error = 'Failed to fetch sessions'
                console.error(error)
            } finally {
                this.loading = false
            }
        },

        async createSession(data: Partial<TrainingSession>) {
            this.loading = true
            try {
                const { post } = useApi()
                const response = await post<TrainingSession>('/training-sessions', data)
                if (response.success && response.data) {
                    const responseData = response.data as any
                    const newSession = responseData.data || responseData
                    this.sessions.push(newSession)
                    return newSession
                }
            } catch (error) {
                this.error = 'Failed to create session'
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateSession(id: number, data: Partial<TrainingSession>) {
            this.loading = true
            try {
                const { put } = useApi()
                const response = await put<TrainingSession>(`/training-sessions/${id}`, data)
                if (response.success && response.data) {
                    const responseData = response.data as any
                    const updatedSession = responseData.data || responseData
                    const index = this.sessions.findIndex((s) => s.id === id)
                    if (index !== -1) {
                        this.sessions[index] = updatedSession
                    }
                    return updatedSession
                }
            } catch (error) {
                this.error = 'Failed to update session'
                throw error
            } finally {
                this.loading = false
            }
        },

        async deleteSession(id: number) {
            this.loading = true
            try {
                const { del } = useApi()
                const response = await del(`/training-sessions/${id}`)
                if (response.success) {
                    this.sessions = this.sessions.filter((s) => s.id !== id)
                }
            } catch (error) {
                this.error = 'Failed to delete session'
                throw error
            } finally {
                this.loading = false
            }
        },

        // Participations
        async addParticipant(data: Partial<TrainingParticipation>) {
            this.loading = true
            try {
                const { post } = useApi()
                const response = await post<TrainingParticipation>('/training-participations', data)
                if (response.success && response.data) {
                    const responseData = response.data as any
                    const newParticipation = responseData.data || responseData

                    // Update local session state if loaded
                    const sessionIndex = this.sessions.findIndex(s => s.id === data.training_session_id)
                    if (sessionIndex !== -1) {
                        if (!this.sessions[sessionIndex].participations) {
                            this.sessions[sessionIndex].participations = []
                        }
                        this.sessions[sessionIndex].participations?.push(newParticipation)
                    }
                    return newParticipation
                }
            } catch (error) {
                this.error = 'Failed to add participant'
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateParticipant(id: number, data: Partial<TrainingParticipation>) {
            this.loading = true
            try {
                const { put } = useApi()
                const response = await put<TrainingParticipation>(`/training-participations/${id}`, data)
                if (response.success && response.data) {
                    const responseData = response.data as any
                    const updatedParticipation = responseData.data || responseData

                    // Update local session state if loaded
                    const sessionIndex = this.sessions.findIndex(s => s.id === updatedParticipation.training_session_id)
                    if (sessionIndex !== -1) {
                        const participations = this.sessions[sessionIndex].participations
                        if (participations) {
                            const pIndex = participations.findIndex(p => p.id === id)
                            if (pIndex !== -1) {
                                participations[pIndex] = updatedParticipation
                            }
                        }
                    }
                    return updatedParticipation
                }
            } catch (error) {
                this.error = 'Failed to update participant'
                throw error
            } finally {
                this.loading = false
            }
        },

        async removeParticipant(id: number, sessionId: number) {
            this.loading = true
            try {
                const { del } = useApi()
                const response = await del(`/training-participations/${id}`)
                if (response.success) {
                    // Update local session state if loaded
                    const sessionIndex = this.sessions.findIndex(s => s.id === sessionId)
                    if (sessionIndex !== -1) {
                        const participations = this.sessions[sessionIndex].participations
                        if (participations) {
                            this.sessions[sessionIndex].participations = participations.filter(p => p.id !== id)
                        }
                    }
                }
            } catch (error) {
                this.error = 'Failed to remove participant'
                throw error
            } finally {
                this.loading = false
            }
        },
    },
})
