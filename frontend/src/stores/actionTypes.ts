import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'

export interface ActionType {
  id: number
  name: string
  description?: string
  color: string
  icon: string
}

export const useActionTypeStore = defineStore('actionTypes', {
  state: () => ({
    types: [] as ActionType[],
    loading: false,
  }),

  actions: {
    async fetchTypes() {
      this.loading = true
      const { get } = useApi()
      const result = await get<ActionType[]>('/action-types')

      if (result.success && result.data) {
        const responseData = result.data as any
        this.types = (responseData.data || responseData) as ActionType[]
      }
      this.loading = false
    },

    async createType(data: Partial<ActionType>) {
      const { post } = useApi()
      const result = await post('/action-types', data)
      if (result.success) {
        await this.fetchTypes()
        return result.data
      }
      throw new Error(result.message || 'Erreur lors de la création')
    },

    async updateType(id: number, data: Partial<ActionType>) {
      const { put } = useApi()
      const result = await put(`/action-types/${id}`, data)
      if (result.success) {
        await this.fetchTypes()
        return result.data
      }
      throw new Error(result.message || 'Erreur lors de la mise à jour')
    },

    async deleteType(id: number) {
      const { del } = useApi()
      const result = await del(`/action-types/${id}`)
      if (result.success) {
        await this.fetchTypes()
        return true
      }
      throw new Error(result.message || 'Erreur lors de la suppression')
    },
  },
})
