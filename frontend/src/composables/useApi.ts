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
      const isFormData = options.body instanceof FormData
      const headers: HeadersInit = {
        Authorization: `Bearer ${store.token}`,
        Accept: 'application/json',
        ...options.headers,
      }

      if (!isFormData) {
        ;(headers as any)['Content-Type'] = 'application/json'
      }

      const response = await fetch(`${store.apiUrl}${endpoint}`, {
        ...options,
        headers,
      })

      const contentType = response.headers.get('content-type')
      let data

      if (
        (options as any).responseType === 'blob' ||
        (contentType &&
          !contentType.includes('application/json') &&
          !contentType.includes('text/plain'))
      ) {
        data = await response.blob()
      } else {
        try {
          data = await response.json()
        } catch (e) {
          // Fallback for empty responses or non-JSON text
          console.log(e)
          data = null
        }
      }

      if (response.status === 401) {
        // Token expiré ou invalide - Afficher une notification avec Toast
        // Utiliser le message spécifique du backend s'il est disponible
        const errorMessage =
          data?.error?.message || 'Votre session a expiré, veuillez vous reconnecter'

        // On émet un événement global pour que l'application affiche le toast
        window.dispatchEvent(
          new CustomEvent('api-error', {
            detail: {
              severity: 'error',
              summary: "Erreur d'authentification",
              detail: errorMessage,
              life: 5000,
            },
          }),
        )
        store.clearToken()
        return { success: false, error: data?.error?.message || 'Unauthorized' }
      }

      if (response.status === 403) {
        // Accès refusé - Afficher une notification avec Toast
        // Utiliser le message spécifique du backend s'il est disponible
        const errorMessage = data?.error?.message || 'Accès refusé'

        // On émet un événement global pour que l'application affiche le toast
        window.dispatchEvent(
          new CustomEvent('api-error', {
            detail: {
              severity: 'error',
              summary: 'Accès refusé',
              detail: errorMessage,
              life: 5000,
            },
          }),
        )
        return { success: false, error: data?.error?.message || 'Forbidden' }
      }

      if (response.ok) {
        return { success: true, data }
      } else {
        // Gérer les autres erreurs (422, etc.) en affichant le message spécifique du backend
        const errorMessage = data?.error?.message || 'Request failed'

        if (response.status >= 500) {
          window.dispatchEvent(
            new CustomEvent('api-error', {
              detail: {
                severity: 'error',
                summary: 'Erreur Serveur',
                detail: errorMessage,
                life: 5000,
              },
            }),
          )
        }

        return { success: false, error: errorMessage }
      }
    } catch (error) {
      console.error('API request error:', error)
      return { success: false, error: 'Network error' }
    }
  }

  const get = async <T = unknown>(
    endpoint: string,
    options: RequestInit & { responseType?: 'json' | 'blob' } = {},
  ): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, { method: 'GET', ...options })
  }

  const post = async <T = unknown>(endpoint: string, data: unknown): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, {
      method: 'POST',
      body: data instanceof FormData ? data : JSON.stringify(data),
    })
  }

  const put = async <T = unknown>(endpoint: string, data: unknown): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, {
      method: 'PUT',
      body: data instanceof FormData ? data : JSON.stringify(data),
    })
  }

  const patch = async <T = unknown>(endpoint: string, data: unknown): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, {
      method: 'PATCH',
      body: data instanceof FormData ? data : JSON.stringify(data),
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
