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
      const result = await get('/action-types')

      if (result.success && result.data) {
        const responseData = result.data as any
        this.types = (responseData.data || responseData) as ActionType[]
      }
      this.loading = false
    },
  },
})
