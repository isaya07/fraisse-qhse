import { defineStore } from 'pinia'
import type { Action, Comment, PaginatedResponse } from './app'
import { useApi } from '@/composables/useApi'
import { isPaginatedResponse } from './app'

interface ActionState {
  actions: Action[]
  currentAction: Action | null
  loading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export const useActionStore = defineStore('action', {
  state: (): ActionState => ({
    actions: [],
    currentAction: null,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 1,
    },
  }),

  getters: {
    actionById: (state) => (id: number) => {
      return state.actions.find((action) => action.id === id)
    },
  },

  actions: {
    async fetchActions(
      page: number = 1,
      limit: number = 10,
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

        Object.entries(filters).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== '') {
            queryParams.append(key, String(value))
          }
        })

        const response = await get<Action | PaginatedResponse<Action>>(
          `/actions?${queryParams.toString()}`,
        )

        if (response.success && response.data) {
          // Vérifier si response.data est un objet avec une propriété 'data' (pagination)
          if (isPaginatedResponse<Action>(response.data)) {
            this.actions = response.data.data || []
            this.pagination = {
              ...this.pagination,
              page: response.data.current_page || page,
              limit: response.data.per_page || limit,
              total: response.data.total || this.actions.length,
              totalPages: response.data.last_page || 1,
            }
          } else {
            // Si c'est une réponse simple (pas paginée), response.data est directement le tableau d'actions
            this.actions = Array.isArray(response.data) ? response.data : [response.data as Action]
            this.pagination = {
              ...this.pagination,
              page,
              limit,
              total: this.actions.length,
              totalPages: Math.ceil(this.actions.length / limit),
            }
          }
        } else {
          this.error = response.error || 'Failed to fetch actions'
        }
      } catch (error) {
        this.error = 'An error occurred while fetching actions'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async fetchActionById(id: number) {
      this.loading = true
      this.error = null

      try {
        const { get } = useApi()
        const response = await get<Action>(`/actions/${id}`)

        if (response.success && response.data) {
          this.currentAction = response.data
        } else {
          this.error = response.error || 'Failed to fetch action'
        }
      } catch (error) {
        this.error = 'An error occurred while fetching action'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async createAction(actionData: Partial<Action>) {
      this.loading = true
      this.error = null

      try {
        const { post } = useApi()
        const response = await post<Action>('/actions', actionData)

        if (response.success && response.data) {
          this.actions.unshift(response.data)
          this.currentAction = response.data
        } else {
          this.error = response.error || 'Failed to create action'
          throw new Error(this.error)
        }
      } catch (error) {
        this.error = 'An error occurred while creating action'
        console.error(error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateAction(id: number, actionData: Partial<Action>) {
      this.loading = true
      this.error = null

      try {
        const { put } = useApi()
        const response = await put<Action>(`/actions/${id}`, actionData)

        if (response.success && response.data) {
          const index = this.actions.findIndex((action) => action.id === id)
          if (index !== -1) {
            this.actions[index] = response.data
          }
          this.currentAction = response.data
        } else {
          this.error = response.error || 'Failed to update action'
          throw new Error(this.error)
        }
      } catch (error) {
        this.error = 'An error occurred while updating action'
        console.error(error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteAction(id: number) {
      this.loading = true
      this.error = null

      try {
        const { del } = useApi()
        const response = await del(`/actions/${id}`)

        if (response.success) {
          this.actions = this.actions.filter((action) => action.id !== id)
          if (this.currentAction?.id === id) {
            this.currentAction = null
          }
        } else {
          this.error = response.error || 'Failed to delete action'
          throw new Error(this.error)
        }
      } catch (error) {
        this.error = 'An error occurred while deleting action'
        console.error(error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateProgress(id: number, progress: number) {
      this.loading = true
      this.error = null

      try {
        const { post } = useApi()
        const response = await post<Action>(`/actions/${id}/update-progress`, { progress })

        if (response.success && response.data) {
          const index = this.actions.findIndex((action) => action.id === id)
          if (index !== -1) {
            this.actions[index] = response.data
          }
          if (this.currentAction?.id === id) {
            this.currentAction = response.data
          }
        } else {
          this.error = response.error || 'Failed to update progress'
          throw new Error(this.error)
        }
      } catch (error) {
        this.error = 'An error occurred while updating progress'
        console.error(error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async addComment(actionId: number, content: string) {
      this.loading = true
      this.error = null

      try {
        const { post } = useApi()
        const response = await post<Comment>(`/actions/${actionId}/comments`, { content })

        if (response.success && response.data) {
          if (this.currentAction && this.currentAction.id === actionId) {
            if (!this.currentAction.comments) {
              this.currentAction.comments = []
            }
            this.currentAction.comments.push(response.data)
          }
        } else {
          this.error = response.error || 'Failed to add comment'
          throw new Error(this.error)
        }
      } catch (error) {
        this.error = 'An error occurred while adding comment'
        console.error(error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async linkDocument(actionId: number, documentId: number) {
      this.loading = true
      this.error = null
      try {
        const { post } = useApi()
        const response = await post<Action>(`/actions/${actionId}/documents`, {
          document_id: documentId,
        })
        if (response.success && response.data) {
          this.currentAction = response.data
        } else {
          throw new Error(response.error || 'Failed to link document')
        }
      } catch (error) {
        this.error = 'Error linking document'
        throw error
      } finally {
        this.loading = false
      }
    },

    async unlinkDocument(actionId: number, documentId: number) {
      this.loading = true
      this.error = null
      try {
        const { del } = useApi()
        const response = await del<Action>(`/actions/${actionId}/documents/${documentId}`)
        if (response.success && response.data) {
          this.currentAction = response.data
        } else {
          throw new Error(response.error || 'Failed to unlink document')
        }
      } catch (error) {
        this.error = 'Error unlinking document'
        throw error
      } finally {
        this.loading = false
      }
    },

    async linkIndicator(actionId: number, indicatorId: number) {
      this.loading = true
      this.error = null
      try {
        const { post } = useApi()
        const response = await post<Action>(`/actions/${actionId}/indicators`, {
          indicator_id: indicatorId,
        })
        if (response.success && response.data) {
          this.currentAction = response.data
        } else {
          throw new Error(response.error || 'Failed to link indicator')
        }
      } catch (error) {
        this.error = 'Error linking indicator'
        throw error
      } finally {
        this.loading = false
      }
    },

    async unlinkIndicator(actionId: number, indicatorId: number) {
      this.loading = true
      this.error = null
      try {
        const { del } = useApi()
        const response = await del<Action>(`/actions/${actionId}/indicators/${indicatorId}`)
        if (response.success && response.data) {
          this.currentAction = response.data
        } else {
          throw new Error(response.error || 'Failed to unlink indicator')
        }
      } catch (error) {
        this.error = 'Error unlinking indicator'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteComment(commentId: number) {
      this.loading = true
      this.error = null
      try {
        const { del } = useApi()
        const response = await del(`/comments/${commentId}`)

        if (response.success) {
          if (this.currentAction && this.currentAction.comments) {
            this.currentAction.comments = this.currentAction.comments.filter(
              (c) => c.id !== commentId,
            )
          }
        } else {
          throw new Error(response.error || 'Failed to delete comment')
        }
      } catch (error) {
        this.error = 'Error deleting comment'
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
