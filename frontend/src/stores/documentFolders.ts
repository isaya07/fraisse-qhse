import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'
import type { ApiResponse } from '@/composables/useApi'

export interface DocumentFolder {
  id: number
  name: string
  parent_id: number | null
  children?: DocumentFolder[]
  documents_count?: number
}

interface DocumentFolderState {
  folders: DocumentFolder[]
  loading: boolean
  error: string | null
}

export const useDocumentFolderStore = defineStore('document-folder', {
  state: (): DocumentFolderState => ({
    folders: [],
    loading: false,
    error: null,
  }),

  getters: {
    flattenedFolders: (state) => {
      const flatten = (
        folders: DocumentFolder[],
        prefix = '',
      ): (DocumentFolder & { label: string })[] => {
        let result: (DocumentFolder & { label: string })[] = []
        folders.forEach((folder) => {
          result.push({ ...folder, label: prefix + folder.name })
          if (folder.children && folder.children.length > 0) {
            result = result.concat(flatten(folder.children, prefix + '-- '))
          }
        })
        return result
      }
      return flatten(state.folders)
    },
  },

  actions: {
    async fetchFolders() {
      this.loading = true
      this.error = null
      try {
        const { get } = useApi()
        const response = await get<ApiResponse<{ data: DocumentFolder[] }>>('/document-folders')
        if (response.success && response.data && response.data.data) {
          // Helper to map backend structure to frontend interface
          const mapFolder = (folder: any): DocumentFolder => ({
            id: folder.id,
            name: folder.name,
            parent_id: folder.parent_id,
            documents_count: folder.documents_count,
            children: folder.children_recursive
              ? folder.children_recursive.map(mapFolder)
              : folder.childrenRecursive
                ? folder.childrenRecursive.map(mapFolder)
                : folder.children
                  ? folder.children.map(mapFolder)
                  : [],
          })

          this.folders = Array.isArray(response.data.data) ? response.data.data.map(mapFolder) : []
        } else {
          this.folders = []
        }
      } catch (error) {
        this.error = 'Failed to fetch folders'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async createFolder(data: Partial<DocumentFolder>) {
      this.loading = true
      try {
        const { post } = useApi()
        const response = await post<DocumentFolder>('/document-folders', data)
        if (response.success && response.data) {
          await this.fetchFolders() // Refresh tree
          return response.data
        }
      } catch (error) {
        this.error = 'Failed to create folder'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateFolder(id: number, data: Partial<DocumentFolder>) {
      this.loading = true
      try {
        const { put } = useApi()
        const response = await put<DocumentFolder>(`/document-folders/${id}`, data)
        if (response.success && response.data) {
          await this.fetchFolders()
          return response.data
        }
      } catch (error) {
        this.error = 'Failed to update folder'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteFolder(id: number) {
      this.loading = true
      try {
        const { del } = useApi()
        const response = await del(`/document-folders/${id}`)
        if (response.success) {
          await this.fetchFolders()
        }
      } catch (error) {
        this.error = 'Failed to delete folder'
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
