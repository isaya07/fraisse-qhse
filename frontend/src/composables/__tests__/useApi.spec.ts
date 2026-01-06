/**
 * Tests pour le composable useApi
 * Ce composable est le cœur de toutes les communications API
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useApi } from '../useApi'
import { useAppStore } from '@/stores/app'
import { createMockResponse, mockToken } from '@/test-utils/setup'

describe('useApi', () => {
  let appStore: ReturnType<typeof useAppStore>

  beforeEach(() => {
    appStore = useAppStore()
    // Setup initial token
    appStore.token = mockToken
    appStore.apiUrl = 'http://localhost:8000/api'
  })

  describe('GET requests', () => {
    it('should make GET request with correct headers', async () => {
      const mockData = { id: 1, name: 'Test' }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockData))

      const { get } = useApi()
      const result = await get('/test')

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/test',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            Authorization: `Bearer ${mockToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }),
      )
      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockData)
    })

    it('should handle blob responses for file downloads', async () => {
      const mockBlob = new Blob(['file content'], { type: 'application/pdf' })
      const mockResponse = {
        ok: true,
        status: 200,
        headers: new Headers({ 'content-type': 'application/pdf' }),
        blob: vi.fn().mockResolvedValue(mockBlob),
      } as unknown as Response

      vi.mocked(fetch).mockResolvedValueOnce(mockResponse)

      const { get } = useApi()
      const result = await get('/documents/1/download', { responseType: 'blob' })

      expect(result.success).toBe(true)
      expect(result.data).toBeInstanceOf(Blob)
    })
  })

  describe('POST requests', () => {
    it('should make POST request with JSON body', async () => {
      const requestData = { title: 'New Document', description: 'Test' }
      const responseData = { id: 1, ...requestData }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(responseData))

      const { post } = useApi()
      const result = await post('/documents', requestData)

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/documents',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(requestData),
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        }),
      )
      expect(result.success).toBe(true)
      expect(result.data).toEqual(responseData)
    })

    it('should make POST request with FormData without Content-Type header', async () => {
      const formData = new FormData()
      formData.append('file', new Blob(['content']), 'test.pdf')
      formData.append('title', 'Test Document')

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse({ id: 1 }))

      const { post } = useApi()
      await post('/documents', formData)

      // Vérifie que la requête a été faite avec FormData
      const fetchCall = vi.mocked(fetch).mock.calls[0]
      const requestOptions = fetchCall[1] as RequestInit
      expect(requestOptions.body).toBeInstanceOf(FormData)

      // Content-Type ne doit PAS être défini pour FormData (le navigateur le gère)
      const headers = requestOptions.headers as Record<string, string>
      expect(headers['Content-Type']).toBeUndefined()
    })
  })

  describe('PUT requests', () => {
    it('should make PUT request with JSON body', async () => {
      const requestData = { title: 'Updated Document' }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse({ id: 1, ...requestData }))

      const { put } = useApi()
      const result = await put('/documents/1', requestData)

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/documents/1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(requestData),
        }),
      )
      expect(result.success).toBe(true)
    })
  })

  describe('PATCH requests', () => {
    it('should make PATCH request with JSON body', async () => {
      const requestData = { progress: 50 }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse({ id: 1, ...requestData }))

      const { patch } = useApi()
      const result = await patch('/actions/1', requestData)

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/actions/1',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify(requestData),
        }),
      )
      expect(result.success).toBe(true)
    })
  })

  describe('DELETE requests', () => {
    it('should make DELETE request', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse({ success: true }))

      const { del } = useApi()
      const result = await del('/documents/1')

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/documents/1',
        expect.objectContaining({
          method: 'DELETE',
        }),
      )
      expect(result.success).toBe(true)
    })
  })

  describe('Error handling', () => {
    it('should handle 401 unauthorized and clear token', async () => {
      const mockResponse = createMockResponse(
        { error: { message: 'Token expired' } },
        { ok: false, status: 401 },
      )
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse)

      // Spy on store.clearToken
      const clearTokenSpy = vi.spyOn(appStore, 'clearToken')

      const { get } = useApi()
      const result = await get('/protected-resource')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Token expired')
      expect(clearTokenSpy).toHaveBeenCalled()
      expect(window.dispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'api-error',
          detail: expect.objectContaining({
            severity: 'error',
            summary: "Erreur d'authentification",
          }),
        }),
      )
    })

    it('should handle 403 forbidden', async () => {
      const mockResponse = createMockResponse(
        { error: { message: 'Access denied' } },
        { ok: false, status: 403 },
      )
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse)

      const { get } = useApi()
      const result = await get('/admin-resource')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Access denied')
      expect(window.dispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'api-error',
          detail: expect.objectContaining({
            severity: 'error',
            summary: 'Accès refusé',
          }),
        }),
      )
    })

    it('should handle 500 server errors', async () => {
      const mockResponse = createMockResponse(
        { error: { message: 'Internal server error' } },
        { ok: false, status: 500 },
      )
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse)

      const { get } = useApi()
      const result = await get('/some-resource')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Internal server error')
      expect(window.dispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'api-error',
          detail: expect.objectContaining({
            severity: 'error',
            summary: 'Erreur Serveur',
          }),
        }),
      )
    })

    it('should handle 422 validation errors without dispatching global event', async () => {
      const mockResponse = createMockResponse(
        { error: { message: 'The email field is required' } },
        { ok: false, status: 422 },
      )
      vi.mocked(fetch).mockResolvedValueOnce(mockResponse)

      const { post } = useApi()
      const result = await post('/users', {})

      expect(result.success).toBe(false)
      expect(result.error).toBe('The email field is required')
      // 422 ne devrait pas déclencher l'événement global (gestion locale)
      expect(window.dispatchEvent).not.toHaveBeenCalled()
    })

    it('should handle network errors', async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

      const { get } = useApi()
      const result = await get('/some-resource')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Network error')
    })

    it('should handle empty JSON responses', async () => {
      const mockResponse = {
        ok: true,
        status: 204,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: vi.fn().mockRejectedValue(new SyntaxError('Unexpected end of JSON input')),
      } as unknown as Response

      vi.mocked(fetch).mockResolvedValueOnce(mockResponse)

      const { del } = useApi()
      const result = await del('/documents/1')

      expect(result.success).toBe(true)
      expect(result.data).toBeNull()
    })
  })

  describe('Authentication', () => {
    it('should include Bearer token in Authorization header', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse({}))

      const { get } = useApi()
      await get('/test')

      const fetchCall = vi.mocked(fetch).mock.calls[0]
      const headers = (fetchCall[1] as RequestInit).headers as Record<string, string>
      expect(headers.Authorization).toBe(`Bearer ${mockToken}`)
    })

    it('should work with empty token', async () => {
      appStore.token = ''
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse({}))

      const { get } = useApi()
      await get('/public-resource')

      const fetchCall = vi.mocked(fetch).mock.calls[0]
      const headers = (fetchCall[1] as RequestInit).headers as Record<string, string>
      expect(headers.Authorization).toBe('Bearer ')
    })
  })
})
