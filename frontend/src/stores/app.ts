import { defineStore } from 'pinia'
import { config } from '@/config'
import { useApi } from '@/composables/useApi'

export interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  role: string
  is_active?: boolean
  password?: string
}

export interface DocumentVersion {
  id: number
  document_id: number
  version: string
  filename: string
  filepath: string
  file_size?: number | null
  mime_type?: string | null
  changelog?: string | null
  created_by?: number | null
  created_at: string
  updated_at: string
  creator?: User
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
  document_folder_id?: number | null
  category?: {
    id: number
    name: string
    color: string
    icon: string
  } | null
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

export interface Comment {
  id: number
  action_id: number
  user_id: number
  content: string
  created_at: string
  updated_at: string
  user?: User
}

export interface Action {
  id: number
  title: string
  description?: string
  action_type_id?: number | null
  action_type?: {
    id: number
    name: string
    icon: string
    color: string
  }
  priority: string
  status: string
  assigned_to?: number
  created_by: number
  due_date?: string
  completed_date?: string
  progress: number
  related_to?: string
  related_id?: number
  created_at: string
  updated_at: string
  assignee?: User
  creator?: User
  documents?: Document[]
  indicators?: Indicator[]
  comments?: Comment[]
}

export interface IndicatorValue {
  id: number
  indicator_id: number
  value: number
  date: string
  frequency: string
  target_value: number
  unit: string
  trend_direction: string
  threshold_min?: number | null
  threshold_max?: number | null
  data_source?: string | null
  calculation_method?: string | null
  indicator_category_id?: number | null
  indicator_category?: {
    id: number
    name: string
    icon: string
    color: string
  }
  comment?: string
  created_by: number
  created_at: string
  updated_at: string
  creator?: User
}

export interface Indicator {
  id: number
  name: string
  description?: string
  code: string
  indicator_category_id?: number | null
  manager_id?: number | null
  manager?: User
  indicator_category?: {
    id: number
    name: string
    icon: string
    color: string
  }
  unit?: string
  target_value?: number | null
  threshold_min?: number | null
  threshold_max?: number | null
  calculation_method?: string
  data_source?: string
  frequency: string
  trend_direction: string
  goal_type?: 'maximize' | 'minimize' | 'target'
  created_by: number
  is_active: boolean
  created: string
  modified: string
  creator?: User
  actions?: Action[]
  values?: IndicatorValue[]
}

// Interface pour la réponse paginée (Laravel Standard)
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  current_page: number
  per_page: number
  last_page: number
  from: number
  to: number
}

// Fonction de vérification de type pour déterminer si une réponse est paginée
export function isPaginatedResponse<T>(data: unknown): data is PaginatedResponse<T> {
  return (
    typeof data === 'object' &&
    data !== null &&
    'data' in data &&
    Array.isArray((data as PaginatedResponse<T>).data) &&
    'total' in data &&
    'current_page' in data &&
    'per_page' in data
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
      localStorage.removeItem('user_role')
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
      if (user.role) {
        localStorage.setItem('user_role', user.role)
      }
    },

    async login(credentials: { email: string; password: string }) {
      const { post } = useApi()
      const result = await post('/login', credentials)

      if (result.success && result.data) {
        const data = result.data as { token: string; user: User }
        this.setToken(data.token)
        this.setUser(data.user)
        return { success: true, user: data.user }
      } else {
        return { success: false, message: result.error || 'Login failed' }
      }
    },

    async logout() {
      const { post } = useApi()
      await post('/logout', {})
      this.clearToken()
    },

    async fetchCurrentUser() {
      if (!this.token) return

      const { get } = useApi()
      const result = await get('/user')

      if (result.success && result.data) {
        const user = result.data as User
        this.setUser(user)
      } else {
        // Token invalide ou expiré
        this.clearToken()
      }
    },
  },
})
