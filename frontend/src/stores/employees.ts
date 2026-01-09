import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'
import type { User, PaginatedResponse } from './app'

// Extended types for Employee Profile
export interface Employee extends User {
  participations?: any[] // Todo: Type properly
  equipment_assignments?: any[]
  current_equipment?: any[]
  documents?: any[]
  notification_settings?: any
}

interface EmployeeState {
  employees: Employee[]
  currentEmployee: Employee | null
  loading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export const useEmployeeStore = defineStore('employee', {
  state: (): EmployeeState => ({
    employees: [],
    currentEmployee: null,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 15,
      total: 0,
      totalPages: 1,
    },
  }),

  actions: {
    async fetchEmployees(
      page: number = 1,
      limit: number = 15,
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

        if (filters.search) {
          queryParams.append('search', String(filters.search))
        }

        const response = await get<PaginatedResponse<Employee>>(
          `/employees?${queryParams.toString()}`,
        )

        if (response.success && response.data) {
          this.employees = response.data.data || []
          this.pagination = {
            ...this.pagination,
            page: response.data.current_page || page,
            limit: response.data.per_page || limit,
            total: response.data.total || this.employees.length,
            totalPages: response.data.last_page || 1,
          }
        } else {
          this.error = response.error || 'Failed to fetch employees'
        }
      } catch (error) {
        this.error = 'An error occurred while fetching employees'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async fetchEmployeeById(id: number) {
      this.loading = true
      this.error = null

      try {
        const { get } = useApi()
        const response = await get<{ user: Employee }>(`/employees/${id}`)

        if (response.success && response.data) {
          // Controller returns { user: ... }
          this.currentEmployee = response.data.user
        } else {
          this.error = response.error || 'Failed to fetch employee'
        }
      } catch (error) {
        this.error = 'An error occurred while fetching employee'
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
})
