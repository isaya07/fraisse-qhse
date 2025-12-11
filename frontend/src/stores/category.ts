import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '@/composables/useApi'

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  parent_id?: number
  color?: string
  icon?: string
}

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchCategories = async () => {
    loading.value = true
    error.value = null
    try {
      const { get } = useApi()
      const response = await get<Category[]>('/categories')
      if (response.success && response.data) {
        categories.value = response.data
      } else {
        error.value = response.error || 'Impossible de charger les catégories'
      }
    } catch (err) {
      console.error('Error fetching categories:', err)
      error.value = 'Impossible de charger les catégories'
    } finally {
      loading.value = false
    }
  }

  const createCategory = async (data: Omit<Category, 'id'>) => {
    loading.value = true
    error.value = null
    try {
      const { post } = useApi()
      const response = await post<Category>('/categories', data)
      if (response.success && response.data) {
        categories.value.push(response.data)
        return response.data
      } else {
        error.value = response.error || 'Impossible de créer la catégorie'
        throw new Error(error.value)
      }
    } catch (err) {
      console.error('Error creating category:', err)
      error.value = 'Impossible de créer la catégorie'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateCategory = async (id: number, data: Partial<Category>) => {
    loading.value = true
    error.value = null
    try {
      const { put } = useApi()
      const response = await put<Category>(`/categories/${id}`, data)
      if (response.success && response.data) {
        const index = categories.value.findIndex(c => c.id === id)
        if (index !== -1) {
          categories.value[index] = response.data
        }
        return response.data
      } else {
        error.value = response.error || 'Impossible de mettre à jour la catégorie'
        throw new Error(error.value)
      }
    } catch (err) {
      console.error('Error updating category:', err)
      error.value = 'Impossible de mettre à jour la catégorie'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteCategory = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const { del } = useApi()
      const response = await del(`/categories/${id}`)
      if (response.success) {
        categories.value = categories.value.filter(c => c.id !== id)
      } else {
        error.value = response.error || 'Impossible de supprimer la catégorie'
        throw new Error(error.value)
      }
    } catch (err) {
      console.error('Error deleting category:', err)
      error.value = 'Impossible de supprimer la catégorie'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  }
})
