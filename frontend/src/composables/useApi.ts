import { useAppStore } from '@/stores/app'

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export const useApi = () => {
  const store = useAppStore()

  const request = async <T = unknown>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await fetch(`${store.apiUrl}${endpoint}`, {
        ...options,
        headers: {
          Authorization: `Bearer ${store.token}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      const data = await response.json()

      if (response.status === 401) {
        // Token expiré ou invalide
        store.clearToken()
        window.location.href = '/login'
        return { success: false, error: data.message || 'Unauthorized' }
      }

      if (response.ok) {
        return { success: true, data }
      } else {
        return { success: false, error: data.message || 'Request failed' }
      }
    } catch (error) {
      console.error('API request error:', error)
      return { success: false, error: 'Network error' }
    }
  }

  const get = async <T = unknown>(endpoint: string): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, { method: 'GET' })
  }

  const post = async <T = unknown>(endpoint: string, data: unknown): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  const put = async <T = unknown>(endpoint: string, data: unknown): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  const patch = async <T = unknown>(endpoint: string, data: unknown): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  const del = async <T = unknown>(endpoint: string): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, { method: 'DELETE' })
  }

  return {
    get,
    post,
    put,
    patch,
    del,
  }
}
