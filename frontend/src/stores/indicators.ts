import { defineStore } from 'pinia'
import type { Indicator, IndicatorValue, PaginatedResponse } from './app'
import { useApi } from '@/composables/useApi'
import { isPaginatedResponse } from './app'

interface IndicatorState {
  indicators: Indicator[]
  currentIndicator: Indicator | null
  loading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export const useIndicatorStore = defineStore('indicator', {
  state: (): IndicatorState => ({
    indicators: [],
    currentIndicator: null,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 1,
    },
  }),

  getters: {
    indicatorById: (state) => (id: number) => {
      return state.indicators.find((indicator) => indicator.id === id)
    },
  },

  actions: {
    async fetchIndicators(
      page: number = 1,
      limit: number = 10,
      filters: Record<string, unknown> = {},
    ) {
      this.loading = true
      this.error = null

      try {
        const { get } = useApi()
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        })

        Object.entries(filters).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== '') {
            queryParams.append(key, String(value))
          }
        })

        const response = await get<Indicator | PaginatedResponse<Indicator>>(
          `/indicators?${queryParams.toString()}`,
        )

        if (response.success && response.data) {
          // Vérifier si response.data est un objet avec une propriété 'data' (pagination)
          if (isPaginatedResponse<Indicator>(response.data)) {
            this.indicators = response.data.data || []
            this.pagination = {
              ...this.pagination,
              page: response.data.current_page || page,
              limit: response.data.per_page || limit,
              total: response.data.total || this.indicators.length,
              totalPages: response.data.last_page || 1,
            }
          } else {
            // Si c'est une réponse simple (pas paginée), response.data est directement le tableau d'indicateurs
            this.indicators = Array.isArray(response.data)
              ? response.data
              : [response.data as Indicator]
            this.pagination = {
              ...this.pagination,
              page,
              limit,
              total: this.indicators.length,
              totalPages: Math.ceil(this.indicators.length / limit),
            }
          }
        } else {
          this.error = response.error || 'Failed to fetch indicators'
        }
      } catch (error) {
        this.error = 'An error occurred while fetching indicators'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async fetchIndicatorById(id: number) {
      this.loading = true
      this.error = null

      try {
        const { get } = useApi()
        const response = await get<Indicator>(`/indicators/${id}`)

        if (response.success && response.data) {
          this.currentIndicator = response.data as Indicator
        } else {
          this.error = response.error || 'Failed to fetch indicator'
        }
      } catch (error) {
        this.error = 'An error occurred while fetching indicator'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async createIndicator(indicatorData: Partial<Indicator>) {
      this.loading = true
      this.error = null

      try {
        const { post } = useApi()
        const response = await post<Indicator>('/indicators', indicatorData)

        if (response.success && response.data) {
          this.indicators.unshift(response.data as Indicator)
          this.currentIndicator = response.data as Indicator
        } else {
          this.error = response.error || 'Failed to create indicator'
          throw new Error(this.error)
        }
      } catch (error) {
        this.error = 'An error occurred while creating indicator'
        console.error(error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateIndicator(id: number, indicatorData: Partial<Indicator>) {
      this.loading = true
      this.error = null

      try {
        const { put } = useApi()
        const response = await put<Indicator>(`/indicators/${id}`, indicatorData)

        if (response.success && response.data) {
          const index = this.indicators.findIndex((indicator) => indicator.id === id)
          if (index !== -1) {
            this.indicators[index] = response.data as Indicator
          }
          this.currentIndicator = response.data as Indicator
        } else {
          this.error = response.error || 'Failed to update indicator'
          throw new Error(this.error)
        }
      } catch (error) {
        this.error = 'An error occurred while updating indicator'
        console.error(error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteIndicator(id: number) {
      this.loading = true
      this.error = null

      try {
        const { del } = useApi()
        const response = await del(`/indicators/${id}`)

        if (response.success) {
          this.indicators = this.indicators.filter((indicator) => indicator.id !== id)
          if (this.currentIndicator?.id === id) {
            this.currentIndicator = null
          }
        } else {
          this.error = response.error || 'Failed to delete indicator'
          throw new Error(this.error)
        }
      } catch (error) {
        this.error = 'An error occurred while deleting indicator'
        console.error(error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async toggleActivation(id: number) {
      this.loading = true
      this.error = null

      try {
        const { post } = useApi()
        const response = await post<Indicator>(`/indicators/${id}/toggle-activation`, {})

        if (response.success && response.data) {
          const index = this.indicators.findIndex((indicator) => indicator.id === id)
          if (index !== -1) {
            this.indicators[index] = response.data as Indicator
          }
          if (this.currentIndicator?.id === id) {
            this.currentIndicator = response.data as Indicator
          }
        } else {
          this.error = response.error || 'Failed to toggle activation'
          throw new Error(this.error)
        }
      } catch (error) {
        this.error = 'An error occurred while toggling activation'
        console.error(error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async addIndicatorValue(id: number, data: { value: number; date: string; comment?: string }) {
      this.loading = true
      this.error = null

      try {
        const { post } = useApi()
        const response = await post<IndicatorValue>(`/indicators/${id}/values`, data)

        if (response.success && response.data) {
          // Refresh the indicator to get updated values
          await this.fetchIndicatorById(id)
        } else {
          this.error = response.error || 'Failed to add indicator value'
          throw new Error(this.error)
        }
      } catch (error) {
        this.error = 'An error occurred while adding indicator value'
        console.error(error)
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
