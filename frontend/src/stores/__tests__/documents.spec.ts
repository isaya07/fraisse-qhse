/**
 * Tests pour le store documents
 * CRUD documents, workflow d'approbation, téléchargement, versions
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useDocumentStore } from '../documents'
import { useAppStore } from '../app'
import { createMockResponse, createPaginatedResponse, mockToken } from '@/test-utils/setup'

// Mock document pour les tests
const mockDocument = {
  id: 1,
  title: 'Document Test',
  description: 'Description du document',
  filename: 'test.pdf',
  filepath: '/documents/test.pdf',
  file_size: 1024,
  mime_type: 'application/pdf',
  version: '1.0',
  status: 'draft',
  created_by: 1,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
}

const mockDocuments = [
  { ...mockDocument, id: 1, title: 'Document 1' },
  { ...mockDocument, id: 2, title: 'Document 2' },
  { ...mockDocument, id: 3, title: 'Document 3' },
]

describe('useDocumentStore', () => {
  let store: ReturnType<typeof useDocumentStore>
  let appStore: ReturnType<typeof useAppStore>

  beforeEach(() => {
    store = useDocumentStore()
    appStore = useAppStore()
    appStore.token = mockToken
    appStore.apiUrl = 'http://localhost:8000/api'
  })

  describe('Initial state', () => {
    it('should have correct initial state', () => {
      expect(store.documents).toEqual([])
      expect(store.currentDocument).toBeNull()
      expect(store.loading).toBe(false)
      expect(store.error).toBeNull()
      expect(store.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
      })
    })
  })

  describe('Getters', () => {
    it('documentById should return document by id', () => {
      store.documents = mockDocuments

      const doc = store.documentById(2)
      expect(doc).toEqual(mockDocuments[1])
    })

    it('documentById should return undefined for non-existent id', () => {
      store.documents = mockDocuments

      const doc = store.documentById(999)
      expect(doc).toBeUndefined()
    })
  })

  describe('Actions - fetchDocuments', () => {
    it('should fetch paginated documents successfully', async () => {
      const paginatedResponse = createPaginatedResponse(mockDocuments, {
        page: 1,
        perPage: 10,
        total: 25,
      })
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(paginatedResponse))

      await store.fetchDocuments(1, 10)

      expect(store.documents).toEqual(mockDocuments)
      expect(store.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 25,
        totalPages: 3,
      })
      expect(store.loading).toBe(false)
      expect(store.error).toBeNull()
    })

    it('should handle filters in query params', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(
        createMockResponse(createPaginatedResponse(mockDocuments)),
      )

      await store.fetchDocuments(1, 10, { status: 'published', search: 'test' })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('status=published'),
        expect.anything(),
      )
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('search=test'), expect.anything())
    })

    it('should skip empty filters', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(
        createMockResponse(createPaginatedResponse(mockDocuments)),
      )

      await store.fetchDocuments(1, 10, { status: '', search: null, folder: undefined })

      const url = vi.mocked(fetch).mock.calls[0][0] as string
      expect(url).not.toContain('status=')
      expect(url).not.toContain('search=')
      expect(url).not.toContain('folder=')
    })

    it('should set loading state during fetch', async () => {
      let resolvePromise: (value: Response) => void
      const pendingPromise = new Promise<Response>((resolve) => {
        resolvePromise = resolve
      })
      vi.mocked(fetch).mockReturnValueOnce(pendingPromise)

      const fetchPromise = store.fetchDocuments()

      expect(store.loading).toBe(true)

      resolvePromise!(createMockResponse(createPaginatedResponse([])))
      await fetchPromise

      expect(store.loading).toBe(false)
    })

    it('should handle fetch error', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(
        createMockResponse({ error: 'Server error' }, { ok: false, status: 500 }),
      )

      await store.fetchDocuments()

      expect(store.error).toBeTruthy()
      expect(store.loading).toBe(false)
    })
  })

  describe('Actions - fetchDocumentById', () => {
    it('should fetch single document successfully', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockDocument))

      await store.fetchDocumentById(1)

      expect(store.currentDocument).toEqual(mockDocument)
      expect(store.loading).toBe(false)
    })

    it('should handle fetch by id error', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(
        createMockResponse({ error: 'Not found' }, { ok: false, status: 404 }),
      )

      await store.fetchDocumentById(999)

      expect(store.error).toBeTruthy()
      expect(store.currentDocument).toBeNull()
    })
  })

  describe('Actions - createDocument', () => {
    it('should create document successfully', async () => {
      const newDoc = { ...mockDocument, id: 10, title: 'New Document' }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(newDoc))

      await store.createDocument({ title: 'New Document' })

      expect(store.documents[0]).toEqual(newDoc)
      expect(store.currentDocument).toEqual(newDoc)
    })

    it('should create document with FormData', async () => {
      const newDoc = { ...mockDocument, id: 10 }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(newDoc))

      const formData = new FormData()
      formData.append('title', 'New Document')
      formData.append('file', new Blob(['content']), 'test.pdf')

      await store.createDocument(formData)

      const fetchCall = vi.mocked(fetch).mock.calls[0]
      expect((fetchCall[1] as RequestInit).body).toBeInstanceOf(FormData)
    })

    it('should throw error on create failure', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(
        createMockResponse({ error: 'Validation failed' }, { ok: false, status: 422 }),
      )

      await expect(store.createDocument({ title: '' })).rejects.toThrow()
      expect(store.error).toBeTruthy()
    })
  })

  describe('Actions - updateDocument', () => {
    it('should update document with JSON data', async () => {
      store.documents = [...mockDocuments]
      const updatedDoc = { ...mockDocument, title: 'Updated Title' }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(updatedDoc))

      await store.updateDocument(1, { title: 'Updated Title' })

      expect(store.documents.find((d) => d.id === 1)?.title).toBe('Updated Title')
      expect(store.currentDocument?.title).toBe('Updated Title')
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/documents/1'),
        expect.objectContaining({ method: 'PUT' }),
      )
    })

    it('should update document with FormData using POST', async () => {
      store.documents = [...mockDocuments]
      const updatedDoc = { ...mockDocument, title: 'Updated' }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(updatedDoc))

      const formData = new FormData()
      formData.append('title', 'Updated')

      await store.updateDocument(1, formData)

      // FormData utilise POST au lieu de PUT
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/documents/1'),
        expect.objectContaining({ method: 'POST' }),
      )
    })
  })

  describe('Actions - deleteDocument', () => {
    it('should delete document from list', async () => {
      store.documents = [...mockDocuments]
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse({ success: true }))

      await store.deleteDocument(1)

      expect(store.documents.find((d) => d.id === 1)).toBeUndefined()
      expect(store.documents).toHaveLength(2)
    })

    it('should clear currentDocument if deleted', async () => {
      store.documents = [...mockDocuments]
      store.currentDocument = mockDocuments[0]
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse({ success: true }))

      await store.deleteDocument(1)

      expect(store.currentDocument).toBeNull()
    })

    it('should throw error on delete failure', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(
        createMockResponse({ error: 'Access denied' }, { ok: false, status: 403 }),
      )

      await expect(store.deleteDocument(1)).rejects.toThrow()
    })
  })

  describe('Actions - Workflow', () => {
    beforeEach(() => {
      store.documents = [...mockDocuments]
    })

    it('should request approval', async () => {
      const pendingDoc = { ...mockDocument, status: 'pending_approval' }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(pendingDoc))

      await store.requestApproval(1)

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/documents/1/request-approval'),
        expect.objectContaining({ method: 'POST' }),
      )
      expect(store.currentDocument?.status).toBe('pending_approval')
      expect(store.documents.find((d) => d.id === 1)?.status).toBe('pending_approval')
    })

    it('should approve document', async () => {
      const approvedDoc = { ...mockDocument, status: 'published' }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(approvedDoc))

      await store.approveDocument(1)

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/documents/1/approve'),
        expect.objectContaining({ method: 'POST' }),
      )
      expect(store.currentDocument?.status).toBe('published')
    })

    it('should reject document', async () => {
      const rejectedDoc = { ...mockDocument, status: 'rejected' }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(rejectedDoc))

      await store.rejectDocument(1)

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/documents/1/reject'),
        expect.objectContaining({ method: 'POST' }),
      )
      expect(store.currentDocument?.status).toBe('rejected')
    })
  })

  describe('Actions - Download', () => {
    it('should download document as blob', async () => {
      const mockBlob = new Blob(['file content'], { type: 'application/pdf' })
      const mockBlobResponse = {
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/pdf' }),
        blob: vi.fn().mockResolvedValue(mockBlob),
      } as unknown as Response
      vi.mocked(fetch).mockResolvedValueOnce(mockBlobResponse)

      // Mock DOM APIs pour le téléchargement
      const mockCreateObjectURL = vi.fn().mockReturnValue('blob:test')
      const mockRevokeObjectURL = vi.fn()
      const mockAppendChild = vi.fn()
      const mockRemoveChild = vi.fn()
      const mockClick = vi.fn()

      vi.stubGlobal('URL', {
        createObjectURL: mockCreateObjectURL,
        revokeObjectURL: mockRevokeObjectURL,
      })

      const mockLink = {
        href: '',
        setAttribute: vi.fn(),
        click: mockClick,
      }
      vi.spyOn(document, 'createElement').mockReturnValue(mockLink as unknown as HTMLElement)
      vi.spyOn(document.body, 'appendChild').mockImplementation(mockAppendChild)
      vi.spyOn(document.body, 'removeChild').mockImplementation(mockRemoveChild)

      await store.downloadDocument(1, 'test.pdf')

      expect(mockLink.setAttribute).toHaveBeenCalledWith('download', 'test.pdf')
      expect(mockClick).toHaveBeenCalled()
    })
  })

  describe('Actions - Versions', () => {
    it('should fetch document versions', async () => {
      const mockVersions = [
        { id: 1, version: '1.0', filename: 'v1.pdf' },
        { id: 2, version: '2.0', filename: 'v2.pdf' },
      ]
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockVersions))

      const versions = await store.fetchVersions(1)

      expect(versions).toEqual(mockVersions)
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/documents/1/versions'),
        expect.anything(),
      )
    })

    it('should return empty array on fetch versions error', async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

      const versions = await store.fetchVersions(1)

      expect(versions).toEqual([])
    })

    it('should add new version', async () => {
      store.documents = [...mockDocuments]
      const updatedDoc = { ...mockDocument, version: '2.0' }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(updatedDoc))

      const formData = new FormData()
      formData.append('file', new Blob(['new version']))

      const result = await store.addVersion(1, formData)

      expect(result?.version).toBe('2.0')
      expect(store.currentDocument?.version).toBe('2.0')
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/documents/1/versions'),
        expect.objectContaining({ method: 'POST' }),
      )
    })
  })
})
