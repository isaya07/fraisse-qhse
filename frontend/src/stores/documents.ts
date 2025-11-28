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
        const { put, post } = useApi()
        let response
        if (documentData instanceof FormData) {
          response = await post<Document>(`/documents/${id}`, documentData)
        } else {
          response = await put<Document>(`/documents/${id}`, documentData)
        }

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

    async requestApproval(id: number) {
      this.loading = true
      this.error = null

      try {
        const { post } = useApi()
        const response = await post<Document>(`/documents/${id}/request-approval`, {})

        if (response.success && response.data) {
          this.currentDocument = response.data
          const index = this.documents.findIndex((doc) => doc.id === id)
          if (index !== -1) {
            this.documents[index] = response.data
          }
        } else {
          this.error = response.error || 'Failed to request approval'
          throw new Error(this.error)
        }
      } catch (error) {
        this.error = 'An error occurred while requesting approval'
        console.error(error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async approveDocument(id: number) {
      this.loading = true
      this.error = null

      try {
        const { post } = useApi()
        const response = await post<Document>(`/documents/${id}/approve`, {})

        if (response.success && response.data) {
          this.currentDocument = response.data
          const index = this.documents.findIndex((doc) => doc.id === id)
          if (index !== -1) {
            this.documents[index] = response.data
          }
        } else {
          this.error = response.error || 'Failed to approve document'
          throw new Error(this.error)
        }
      } catch (error) {
        this.error = 'An error occurred while approving document'
        console.error(error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async rejectDocument(id: number) {
      this.loading = true
      this.error = null

      try {
        const { post } = useApi()
        const response = await post<Document>(`/documents/${id}/reject`, {})

        if (response.success && response.data) {
          this.currentDocument = response.data
          const index = this.documents.findIndex((doc) => doc.id === id)
          if (index !== -1) {
            this.documents[index] = response.data
          }
        } else {
          this.error = response.error || 'Failed to reject document'
          throw new Error(this.error)
        }
      } catch (error) {
        this.error = 'An error occurred while rejecting document'
        console.error(error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async downloadDocument(id: number, title: string) {
      try {
        const { get } = useApi()
        // Use 'blob' as response type to handle file download
        const response = await get<Blob>(`/documents/${id}/download`, { responseType: 'blob' })

        if (response.success && response.data) {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', title) // Use the document title or filename
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)
        } else {
          throw new Error(response.error || 'Failed to download document')
        }
      } catch (error) {
        console.error('Download error:', error)
        throw error
      }
    },

    async fetchVersions(id: number) {
      try {
        const { get } = useApi()
        const response = await get<any[]>(`/documents/${id}/versions`)
        if (response.success && response.data) {
          return response.data
        }
        return []
      } catch (error) {
        console.error('Error fetching versions:', error)
        return []
      }
    },

    async addVersion(id: number, formData: FormData) {
      this.loading = true
      this.error = null
      try {
        const { post } = useApi()
        const response = await post<Document>(`/documents/${id}/versions`, formData)

        if (response.success && response.data) {
          this.currentDocument = response.data
          const index = this.documents.findIndex((doc) => doc.id === id)
          if (index !== -1) {
            this.documents[index] = response.data
          }
          return response.data
        } else {
          throw new Error(response.error || 'Failed to add version')
        }
      } catch (error) {
        this.error = 'An error occurred while adding version'
        console.error(error)
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
