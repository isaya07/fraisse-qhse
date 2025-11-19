import { defineStore } from 'pinia'
import { config } from '@/config'

export interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  role: string
}

export interface Document {
  id: number
  title: string
  description?: string
  filename: string
  filepath: string
  file_size?: number
  mime_type?: string
  version: string
  category?: string
  status: string
  created_by: number
  approved_by?: number
  published_date?: string
  expires_date?: string
  created: string
  modified: string
  creator?: User
  approver?: User
}

export interface Action {
  id: number
  title: string
  description?: string
  type: string
  priority: string
  status: string
  assigned_to?: number
  created_by: number
  due_date?: string
  completed_date?: string
  progress: number
  related_to?: string
  related_id?: number
  created: string
  modified: string
  assignee?: User
  creator?: User
  documents?: Document[]
  indicators?: Indicator[]
}

export interface Indicator {
  id: number
  name: string
  description?: string
  code: string
  category?: string
  unit?: string
  target_value?: number
  threshold_min?: number
  threshold_max?: number
  calculation_method?: string
  data_source?: string
  frequency: string
  trend_direction: string
  created_by: number
  is_active: boolean
  created: string
  modified: string
  creator?: User
  actions?: Action[]
}

// Interface pour la réponse paginée
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Fonction de vérification de type pour déterminer si une réponse est paginée
export function isPaginatedResponse<T>(data: unknown): data is PaginatedResponse<T> {
  return (
    typeof data === 'object' &&
    data !== null &&
    'data' in data &&
    Array.isArray((data as PaginatedResponse<T>).data) &&
    'total' in data &&
    'page' in data &&
    'limit' in data &&
    'totalPages' in data
  )
}

export const useAppStore = defineStore('app', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token') || '',
    apiUrl: config.apiUrl,
    theme: localStorage.getItem('theme') || 'light',
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
    userRole: (state) => state.user?.role || '',
  },

  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },

    clearToken() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
    },

    setTheme(theme: string) {
      this.theme = theme
      localStorage.setItem('theme', theme)
      // Appliquer le thème au document en utilisant l'attribut data-theme (approche Bulma)
      document.documentElement.setAttribute('data-theme', theme)
      document.documentElement.classList.toggle('app-dark')
    },

    toggleTheme() {
      const newTheme = this.theme === 'light' ? 'dark' : 'light'
      this.setTheme(newTheme)
    },

    setUser(user: User) {
      this.user = user
    },

    async login(credentials: { username: string; password: string }) {
      try {
        const response = await fetch(`${this.apiUrl}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        })

        const data = await response.json()

        if (response.ok) {
          this.setToken(data.token)
          this.setUser(data.user)
          return { success: true, user: data.user }
        } else {
          return { success: false, message: data.message || 'Login failed' }
        }
      } catch (error) {
        console.error('Login error:', error)
        return { success: false, message: 'Network error' }
      }
    },

    async logout() {
      try {
        await fetch(`${this.apiUrl}/logout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
        })
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.clearToken()
      }
    },
  },
})
