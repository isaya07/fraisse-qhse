import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'
import type { User } from '@/stores/app'

export interface AccessControl {
  id: number
  user_id: number
  user: User
  access_level: 'read' | 'write' | 'admin'
}

interface PermissionState {
  permissions: AccessControl[]
  loading: boolean
  error: string | null
}

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => ({
    permissions: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchPermissions(entityType: string, entityId: number) {
      this.loading = true
      this.error = null
      try {
        const { get } = useApi()
        const params = new URLSearchParams({
          entity_type: entityType,
          entity_id: String(entityId),
        })
        const response = await get<AccessControl[]>(`/permissions?${params.toString()}`)
        if (response.success && response.data) {
          const data = response.data as { data: AccessControl[] } | AccessControl[]
          this.permissions = Array.isArray(data) ? data : data.data
        } else {
          // It might return 403 if unauthorized, so handled in catch or here
          this.error = response.error || 'Failed to fetch permissions'
        }
      } catch (error) {
        console.error('Failed to fetch permissions:', error)
        this.error = 'Failed to load permissions'
        // Reset permissions on error (e.g. 403)
        this.permissions = []
      } finally {
        this.loading = false
      }
    },

    async grantPermission(entityType: string, entityId: number, userId: number, level: string) {
      this.loading = true
      this.error = null
      try {
        const { post } = useApi()
        const response = await post<AccessControl[]>('/permissions', {
          entity_type: entityType,
          entity_id: entityId,
          user_id: userId,
          access_level: level,
        })

        if (response.success && response.data) {
          const data = response.data as { data: AccessControl[] } | AccessControl[]
          this.permissions = Array.isArray(data) ? data : data.data
        } else {
          throw new Error(response.error || 'Failed to grant permission')
        }
      } catch (error) {
        console.error(error)
        this.error = 'Failed to grant permission'
        throw error
      } finally {
        this.loading = false
      }
    },

    async revokePermission(id: number, entityType: string, entityId: number) {
      this.loading = true
      this.error = null
      try {
        const { del } = useApi()
        // We delete by the ID of the permission record
        const response = await del(`/permissions/${id}`)

        if (response.success) {
          // Optimistic update or refresh
          // The API returns the updated list in `data` usually if we kept it consistent,
          // but `destroy` typically returns success msg.
          // Let's refresh or filter locally.
          this.permissions = this.permissions.filter((p) => p.id !== id)
        } else {
          throw new Error(response.error || 'Failed to revoke permission')
        }
      } catch (error) {
        console.error(error)
        this.error = 'Failed to revoke permission'
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
