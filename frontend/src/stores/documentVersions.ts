import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '@/composables/useApi'

export interface DocumentVersion {
  id: number
  document_id: number
  version: string
  filename: string
  filepath: string
  file_size: number
  mime_type: string
  changelog: string
  created_by: number
  creator?: {
    first_name: string
    last_name: string
  }
  created_at: string
  updated_at: string
}

export const useDocumentVersionStore = defineStore('documentVersions', () => {
  const versions = ref<DocumentVersion[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchVersions = async (documentId: number, withArchived: boolean = false) => {
    loading.value = true
    error.value = null
    try {
      const { get } = useApi()
      const queryParams = withArchived ? '?with_archived=true' : ''
      const response = await get<DocumentVersion[]>(`/documents/${documentId}/versions${queryParams}`)
      if (response.success && response.data) {
        versions.value = response.data
      } else {
        error.value = response.error || 'Impossible de charger les versions'
      }
    } catch (err) {
      console.error('Error fetching versions:', err)
      error.value = 'Impossible de charger les versions'
    } finally {
      loading.value = false
    }
  }

  const createVersion = async (documentId: number, formData: FormData) => {
    loading.value = true
    error.value = null
    try {
      const { post } = useApi()
      const response = await post<{ version: DocumentVersion; document: any }>(
        `/documents/${documentId}/versions`,
        formData
      )
      if (response.success && response.data) {
        // Ajouter la nouvelle version à la liste
        versions.value.unshift(response.data.version)
        return response.data
      } else {
        error.value = response.error || 'Impossible de créer la version'
        throw new Error(error.value)
      }
    } catch (err) {
      console.error('Error creating version:', err)
      error.value = 'Impossible de créer la version'
      throw err
    } finally {
      loading.value = false
    }
  }

  const downloadVersion = async (versionId: number) => {
    try {
      const { get } = useApi()
      const response = await get(`/versions/${versionId}/download`, { responseType: 'blob' })
      
      if (response.success && response.data) {
        // Créer un lien de téléchargement
        const url = window.URL.createObjectURL(response.data as Blob)
        const link = document.createElement('a')
        link.href = url
        
        // Trouver le nom du fichier
        const version = versions.value.find(v => v.id === versionId)
        link.download = version?.filename || 'document'
        
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      }
    } catch (err) {
      console.error('Error downloading version:', err)
      error.value = 'Impossible de télécharger la version'
      throw err
    }
  }

  const restoreVersion = async (versionId: number) => {
    loading.value = true
    error.value = null
    try {
      const { post } = useApi()
      const response = await post<{ version: DocumentVersion; document: any }>(
        `/versions/${versionId}/restore`, 
        {}
      )
      
      if (response.success && response.data) {
        // Ajouter la nouvelle version (restauration) en haut de la liste
        versions.value.unshift(response.data.version)
        return response.data
      } else {
        error.value = response.error || 'Impossible de restaurer la version'
        throw new Error(error.value)
      }
    } catch (err) {
      console.error('Error restoring version:', err)
      error.value = 'Impossible de restaurer la version'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    versions,
    loading,
    error,
    fetchVersions,
    createVersion,
    downloadVersion,
    restoreVersion,
  }
})
