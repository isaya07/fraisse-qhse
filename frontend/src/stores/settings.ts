import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'

interface SettingsState {
  settings: Record<string, string>
  loading: boolean
  error: string | null
}

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({
    settings: {},
    loading: false,
    error: null,
  }),

  actions: {
    async fetchSettings() {
      this.loading = true
      this.error = null
      try {
        const { get } = useApi()
        const response = await get<Record<string, string>>('/settings')
        if (response.success && response.data) {
          this.settings = response.data
        }
      } catch (error) {
        this.error = 'Failed to fetch settings'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async updateSettings(newSettings: Record<string, string>) {
      this.loading = true
      try {
        const { post } = useApi()
        const response = await post('/settings', { settings: newSettings })
        if (response.success) {
          this.settings = { ...this.settings, ...newSettings }
        }
      } catch (error) {
        this.error = 'Failed to update settings'
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
