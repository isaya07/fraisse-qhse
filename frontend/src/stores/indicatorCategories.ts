import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '@/composables/useApi'
import type { ApiResponse } from '@/composables/useApi'

export interface IndicatorCategory {
  id: number
  name: string
  description: string | null
  icon: string | null
  color: string | null
  created_at: string
  updated_at: string
}

export const useIndicatorCategoryStore = defineStore('indicatorCategories', () => {
  const categories = ref<IndicatorCategory[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const { get } = useApi()

  const fetchCategories = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await get<ApiResponse<IndicatorCategory[]>>('/indicator-categories')
      if (response.success && response.data && response.data.data) {
        categories.value = response.data.data
      } else {
        error.value = response.error || 'Erreur lors du chargement des catégories'
      }
    } catch (e) {
      error.value = 'Erreur inattendue'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return {
    categories,
    loading,
    error,
    fetchCategories,
  }
})
