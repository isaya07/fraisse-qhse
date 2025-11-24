import { defineStore } from 'pinia'
import type { User, PaginatedResponse } from './app'
import { useApi } from '@/composables/useApi'
import { isPaginatedResponse } from './app'

interface UserState {
  users: User[]
  currentUser: User | null
  loading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    users: [],
    currentUser: null,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 15,
      total: 0,
      totalPages: 1,
    },
  }),

  getters: {
    userById: (state) => (id: number) => {
      return state.users.find((user) => user.id === id)
    },
  },

  actions: {
    async fetchUsers(page: number = 1, limit: number = 15, filters: Record<string, unknown> = {}) {
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

        const response = await get<User | PaginatedResponse<User>>(
          `/users?${queryParams.toString()}`,
        )

        if (response.success && response.data) {
          if (isPaginatedResponse<User>(response.data)) {
            this.users = response.data.data || []
            this.pagination = {
              ...this.pagination,
              page: response.data.current_page || page,
              limit: response.data.per_page || limit,
              total: response.data.total || this.users.length,
              totalPages: response.data.last_page || 1,
            }
          } else {
            this.users = Array.isArray(response.data) ? response.data : [response.data as User]
            this.pagination = {
              ...this.pagination,
              page,
              limit,
              total: this.users.length,
              totalPages: Math.ceil(this.users.length / limit),
            }
          }
        } else {
          this.error = response.error || 'Failed to fetch users'
        }
      } catch (error) {
        this.error = 'An error occurred while fetching users'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async fetchUserById(id: number) {
      this.loading = true
      this.error = null

      try {
        const { get } = useApi()
        const response = await get<User>(`/users/${id}`)

        if (response.success && response.data) {
          this.currentUser = response.data
        } else {
          this.error = response.error || 'Failed to fetch user'
        }
      } catch (error) {
        this.error = 'An error occurred while fetching user'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async createUser(userData: Partial<User> & { password?: string }) {
      this.loading = true
      this.error = null

      try {
        const { post } = useApi()
        const response = await post<User>('/users', userData) // Note: Backend might use /register or /users depending on implementation

        if (response.success && response.data) {
          this.users.unshift(response.data)
          this.currentUser = response.data
        } else {
          this.error = response.error || 'Failed to create user'
          throw new Error(this.error)
        }
      } catch (error) {
        this.error = 'An error occurred while creating user'
        console.error(error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateUser(id: number, userData: Partial<User>) {
      this.loading = true
      this.error = null

      try {
        const { put } = useApi()
        const response = await put<User>(`/users/${id}`, userData)

        if (response.success && response.data) {
          const index = this.users.findIndex((user) => user.id === id)
          if (index !== -1) {
            this.users[index] = response.data
          }
          this.currentUser = response.data
        } else {
          this.error = response.error || 'Failed to update user'
          throw new Error(this.error)
        }
      } catch (error) {
        this.error = 'An error occurred while updating user'
        console.error(error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteUser(id: number) {
      this.loading = true
      this.error = null

      try {
        const { del } = useApi()
        const response = await del(`/users/${id}`)

        if (response.success) {
          this.users = this.users.filter((user) => user.id !== id)
          if (this.currentUser?.id === id) {
            this.currentUser = null
          }
        } else {
          this.error = response.error || 'Failed to delete user'
          throw new Error(this.error)
        }
      } catch (error) {
        this.error = 'An error occurred while deleting user'
        console.error(error)
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
