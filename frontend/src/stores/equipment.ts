import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'
import type { Document } from './app'

export interface EquipmentCategory {
  id: number
  name: string
  type: 'equipment' | 'ppe' | 'vehicle'
  maintenance_frequency_months: number | null
  icon: string | null
  color: string | null
  equipment_count?: number
}

export interface Equipment {
  id: number
  category_id: number
  serial_number: string
  internal_ref: string | null
  name: string
  brand: string | null
  model: string | null
  purchase_date: string
  manufacture_date: string | null
  expiration_date: string | null
  maintenance_frequency_months: number | null
  status: 'available' | 'assigned' | 'maintenance' | 'broken' | 'retired'
  location: 'warehouse' | 'workshop' | 'office' | 'vehicle' | 'site'
  image_path: string | null
  category?: EquipmentCategory
  current_assignment?: EquipmentAssignment
  assignments?: EquipmentAssignment[]
  maintenance_logs?: MaintenanceLog[]
  documents?: Document[]
}

export interface EquipmentAssignment {
  id: number
  equipment_id: number
  user_id: number
  assigned_at: string
  returned_at: string | null
  notes: string | null
  return_notes: string | null
  user?: {
    id: number
    first_name: string
    last_name: string
  }
  equipment?: Equipment
}

export interface MaintenanceLog {
  id: number
  equipment_id: number
  type: 'periodic_check' | 'repair' | 'calibration'
  date: string
  description: string
  cost: number | null
  performer: string
  result: 'compliant' | 'non_compliant' | 'fixed'
  next_maintenance_date: string | null
  document_path: string | null
  equipment?: Equipment
}

interface EquipmentState {
  categories: EquipmentCategory[]
  equipmentList: Equipment[]
  currentEquipment: Equipment | null
  maintenanceLogs: MaintenanceLog[]
  loading: boolean
  error: string | null
}

export const useEquipmentStore = defineStore('equipment', {
  state: (): EquipmentState => ({
    categories: [],
    equipmentList: [],
    currentEquipment: null,
    maintenanceLogs: [],
    loading: false,
    error: null,
  }),

  getters: {
    getEquipmentById: (state) => (id: number) => {
      return state.equipmentList.find((e) => e.id === id)
    },
    getEquipmentByCategory: (state) => (categoryId: number) => {
      return state.equipmentList.filter((e) => e.category_id === categoryId)
    },
    getEquipmentByStatus: (state) => (status: string) => {
      return state.equipmentList.filter((e) => e.status === status)
    },
  },

  actions: {
    // Categories
    async fetchCategories() {
      this.loading = true
      try {
        const { get } = useApi()
        const response = await get<EquipmentCategory[]>('/equipment-categories')
        if (response.success && response.data) {
          const responseData = response.data as any
          this.categories = responseData.data || responseData
        }
      } catch (error) {
        this.error = 'Failed to fetch categories'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async createCategory(data: Partial<EquipmentCategory>) {
      this.loading = true
      try {
        const { post } = useApi()
        const response = await post<EquipmentCategory>('/equipment-categories', data)
        if (response.success && response.data) {
          const responseData = response.data as any
          const newCategory = responseData.data || responseData
          this.categories.push(newCategory)
          return newCategory
        }
      } catch (error) {
        this.error = 'Failed to create category'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateCategory(id: number, data: Partial<EquipmentCategory>) {
      this.loading = true
      try {
        const { put } = useApi()
        const response = await put<EquipmentCategory>(`/equipment-categories/${id}`, data)
        if (response.success && response.data) {
          const responseData = response.data as any
          const updatedCategory = responseData.data || responseData
          const index = this.categories.findIndex((c) => c.id === id)
          if (index !== -1) {
            this.categories[index] = updatedCategory
          }
          return updatedCategory
        }
      } catch (error) {
        this.error = 'Failed to update category'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteCategory(id: number) {
      this.loading = true
      try {
        const { del } = useApi()
        const response = await del(`/equipment-categories/${id}`)
        if (response.success) {
          this.categories = this.categories.filter((c) => c.id !== id)
        }
      } catch (error) {
        this.error = 'Failed to delete category'
        throw error
      } finally {
        this.loading = false
      }
    },

    // Equipment
    async fetchEquipment(filters?: any) {
      this.loading = true
      try {
        const { get } = useApi()
        // Build query string from filters if needed
        let url = '/equipment'
        if (filters) {
          const params = new URLSearchParams()
          Object.keys(filters).forEach((key) => {
            if (filters[key]) params.append(key, filters[key])
          })
          const queryString = params.toString()
          if (queryString) url += `?${queryString}`
        }

        const response = await get<Equipment[]>(url)
        if (response.success && response.data) {
          const responseData = response.data as any
          this.equipmentList = responseData.data || responseData
        }
      } catch (error) {
        this.error = 'Failed to fetch equipment'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async fetchEquipmentDetail(id: number) {
      this.loading = true
      try {
        const { get } = useApi()
        const response = await get<Equipment>(`/equipment/${id}`)
        if (response.success && response.data) {
          const responseData = response.data as any
          this.currentEquipment = responseData.data || responseData
          return this.currentEquipment
        }
      } catch (error) {
        this.error = 'Failed to fetch equipment detail'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async createEquipment(data: Partial<Equipment>) {
      this.loading = true
      try {
        const { post } = useApi()
        const response = await post<Equipment>('/equipment', data)
        if (response.success && response.data) {
          const responseData = response.data as any
          const newEquipment = responseData.data || responseData
          this.equipmentList.push(newEquipment)
          return newEquipment
        }
      } catch (error) {
        this.error = 'Failed to create equipment'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateEquipment(id: number, data: Partial<Equipment>) {
      this.loading = true
      try {
        const { put } = useApi()
        const response = await put<Equipment>(`/equipment/${id}`, data)
        if (response.success && response.data) {
          const responseData = response.data as any
          const updatedEquipment = responseData.data || responseData

          // Update list
          const index = this.equipmentList.findIndex((e) => e.id === id)
          if (index !== -1) {
            this.equipmentList[index] = updatedEquipment
          }

          // Update current if selected
          if (this.currentEquipment && this.currentEquipment.id === id) {
            this.currentEquipment = updatedEquipment
          }

          return updatedEquipment
        }
      } catch (error) {
        this.error = 'Failed to update equipment'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteEquipment(id: number) {
      this.loading = true
      try {
        const { del } = useApi()
        const response = await del(`/equipment/${id}`)
        if (response.success) {
          this.equipmentList = this.equipmentList.filter((e) => e.id !== id)
        }
      } catch (error) {
        this.error = 'Failed to delete equipment'
        throw error
      } finally {
        this.loading = false
      }
    },

    // Assignments
    async assignEquipment(
      equipmentId: number,
      data: { user_id: number; assigned_at: string; notes?: string },
    ) {
      this.loading = true
      try {
        const { post } = useApi()
        const response = await post<Equipment>(`/equipment/${equipmentId}/assign`, data)
        if (response.success && response.data) {
          const responseData = response.data as any
          const updatedEquipment = responseData.data || responseData

          // Update list
          const index = this.equipmentList.findIndex((e) => e.id === equipmentId)
          if (index !== -1) {
            this.equipmentList[index] = updatedEquipment
          }

          // Update current if selected
          if (this.currentEquipment && this.currentEquipment.id === equipmentId) {
            this.currentEquipment = updatedEquipment
          }

          return updatedEquipment
        }
      } catch (error) {
        this.error = 'Failed to assign equipment'
        throw error
      } finally {
        this.loading = false
      }
    },

    async returnEquipment(
      equipmentId: number,
      data: { returned_at: string; notes?: string; location: string },
    ) {
      this.loading = true
      try {
        const { post } = useApi()
        const response = await post<Equipment>(`/equipment/${equipmentId}/return`, data)
        if (response.success && response.data) {
          const responseData = response.data as any
          const updatedEquipment = responseData.data || responseData

          // Update list
          const index = this.equipmentList.findIndex((e) => e.id === equipmentId)
          if (index !== -1) {
            this.equipmentList[index] = updatedEquipment
          }

          // Update current if selected
          if (this.currentEquipment && this.currentEquipment.id === equipmentId) {
            this.currentEquipment = updatedEquipment
          }

          return updatedEquipment
        }
      } catch (error) {
        this.error = 'Failed to return equipment'
        throw error
      } finally {
        this.loading = false
      }
    },

    // Maintenance Logs
    async fetchMaintenanceLogs(equipmentId?: number) {
      this.loading = true
      try {
        const { get } = useApi()
        let url = '/maintenance-logs'
        if (equipmentId) {
          url += `?equipment_id=${equipmentId}`
        }
        const response = await get<MaintenanceLog[]>(url)
        if (response.success && response.data) {
          const responseData = response.data as any
          this.maintenanceLogs = responseData.data || responseData
        }
      } catch (error) {
        this.error = 'Failed to fetch maintenance logs'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async createMaintenanceLog(data: Partial<MaintenanceLog>) {
      this.loading = true
      try {
        const { post } = useApi()
        const response = await post<MaintenanceLog>('/maintenance-logs', data)
        if (response.success && response.data) {
          const responseData = response.data as any
          const newLog = responseData.data || responseData
          this.maintenanceLogs.unshift(newLog)

          // If this log updated the equipment (e.g. status change or next maintenance date), we should refresh the equipment
          if (data.equipment_id) {
            await this.fetchEquipmentDetail(data.equipment_id)
          }

          return newLog
        }
      } catch (error) {
        this.error = 'Failed to create maintenance log'
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
