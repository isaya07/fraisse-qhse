import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'

export interface IndicatorCategory {
  id: number
  name: string
  description?: string
  color?: string
  icon?: string
  created_at?: string
  updated_at?: string
}

interface IndicatorCategoryState {
  categories: IndicatorCategory[]
  loading: boolean
  error: string | null
}

export const useIndicatorCategoryStore = defineStore('indicatorCategory', {
  state: (): IndicatorCategoryState => ({
    categories: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchCategories() {
      this.loading = true
      this.error = null
      try {
        const { get } = useApi()
        const response = await get<IndicatorCategory[]>('/indicator-categories')

        if (response.success && response.data) {
          const responseData = response.data as any
          this.categories = (Array.isArray(responseData) ? responseData : responseData.data) || []
        }
      } catch (error) {
        this.error = 'Erreur lors du chargement des catégories'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async createCategory(data: Partial<IndicatorCategory>) {
      this.loading = true
      try {
        const { post } = useApi()
        const response = await post<IndicatorCategory>('/indicator-categories', data)
        if (response.success && response.data) {
          this.categories.push(response.data)
        }
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateCategory(id: number, data: Partial<IndicatorCategory>) {
      this.loading = true
      try {
        const { put } = useApi()
        const response = await put<IndicatorCategory>(`/indicator-categories/${id}`, data)
        if (response.success && response.data) {
          const index = this.categories.findIndex((c) => c.id === id)
          if (index !== -1) {
            this.categories[index] = response.data
          }
        }
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteCategory(id: number) {
      this.loading = true
      try {
        const { del } = useApi()
        const response = await del(`/indicator-categories/${id}`)
        if (response.success) {
          this.categories = this.categories.filter((c) => c.id !== id)
        }
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
