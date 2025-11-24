import { defineStore } from 'pinia'
import type { Document, PaginatedResponse } from './app'
import { useApi } from '@/composables/useApi'
import { isPaginatedResponse } from './app'

export interface DocumentFormData {
  title: string
  description: string
  document_folder_id: number | null
  category: string
  version: string
  status: string
}

interface DocumentState {
  documents: Document[]
  currentDocument: Document | null
  loading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export const useDocumentStore = defineStore('document', {
  state: (): DocumentState => ({
    documents: [],
    currentDocument: null,
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
    documentById: (state) => (id: number) => {
      return state.documents.find((doc) => doc.id === id)
    },
  },

  actions: {
    async fetchDocuments(
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

        const response = await get<Document | PaginatedResponse<Document>>(
          `/documents?${queryParams.toString()}`,
        )

        if (response.success && response.data) {
          // Vérifier si response.data est un objet avec une propriété 'data' (pagination)
          if (isPaginatedResponse<Document>(response.data)) {
            this.documents = response.data.data || []
            this.pagination = {
              ...this.pagination,
              page: response.data.current_page || page,
              limit: response.data.per_page || limit,
              total: response.data.total || this.documents.length,
              totalPages: response.data.last_page || 1,
            }
          } else {
            // Si c'est une réponse simple (pas paginée), response.data est directement le tableau de documents
            this.documents = Array.isArray(response.data)
              ? response.data
              : [response.data as Document]
            this.pagination = {
              ...this.pagination,
              page,
              limit,
              total: this.documents.length,
              totalPages: Math.ceil(this.documents.length / limit),
            }
          }
        } else {
          this.error = response.error || 'Failed to fetch documents'
        }
      } catch (error) {
        this.error = 'An error occurred while fetching documents'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async fetchDocumentById(id: number) {
      this.loading = true
      this.error = null

      try {
        const { get } = useApi()
        const response = await get<Document>(`/documents/${id}`)

        if (response.success && response.data) {
          this.currentDocument = response.data
        } else {
          this.error = response.error || 'Failed to fetch document'
        }
      } catch (error) {
        this.error = 'An error occurred while fetching document'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async createDocument(documentData: Partial<Document> | FormData) {
      this.loading = true
      this.error = null

      try {
        const { post } = useApi()
        const response = await post<Document>('/documents', documentData)

        if (response.success && response.data) {
          this.documents.unshift(response.data)
          this.currentDocument = response.data
        } else {
          this.error = response.error || 'Failed to create document'
          throw new Error(this.error)
        }
      } catch (error) {
        this.error = 'An error occurred while creating document'
        console.error(error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateDocument(id: number, documentData: Partial<Document> | FormData) {
      this.loading = true
      this.error = null

      try {
        const { put } = useApi()
        const response = await put<Document>(`/documents/${id}`, documentData)

        if (response.success && response.data) {
          const index = this.documents.findIndex((doc) => doc.id === id)
          if (index !== -1) {
            this.documents[index] = response.data
          }
          this.currentDocument = response.data
        } else {
          this.error = response.error || 'Failed to update document'
          throw new Error(this.error)
        }
      } catch (error) {
        this.error = 'An error occurred while updating document'
        console.error(error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteDocument(id: number) {
      this.loading = true
      this.error = null

      try {
        const { del } = useApi()
        const response = await del<boolean>(`/documents/${id}`)

        if (response.success) {
          this.documents = this.documents.filter((doc) => doc.id !== id)
          if (this.currentDocument?.id === id) {
            this.currentDocument = null
          }
        } else {
          this.error = response.error || 'Failed to delete document'
          throw new Error(this.error)
        }
      } catch (error) {
        this.error = 'An error occurred while deleting document'
        console.error(error)
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
