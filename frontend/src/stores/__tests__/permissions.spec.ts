import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { usePermissionStore } from '../permissions'

// Mock the useApi hook
const mockGet = vi.fn()
const mockPost = vi.fn()
const mockDel = vi.fn()

vi.mock('@/composables/useApi', () => ({
  useApi: () => ({
    get: mockGet,
    post: mockPost,
    del: mockDel,
  }),
}))

describe('usePermissionStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('fetches permissions correctly', async () => {
    const store = usePermissionStore()
    const mockPermissions = [
      { id: 1, user_id: 1, user: { id: 1, first_name: 'John' }, access_level: 'read' },
    ]

    mockGet.mockResolvedValueOnce({
      success: true,
      data: mockPermissions,
    })

    await store.fetchPermissions('document', 123)

    expect(mockGet).toHaveBeenCalledWith(
      expect.stringContaining('/permissions?entity_type=document&entity_id=123'),
    )
    expect(store.permissions).toEqual(mockPermissions)
    expect(store.loading).toBe(false)
    expect(store.error).toBe(null)
  })

  it('handles fetch error correctly', async () => {
    const store = usePermissionStore()

    mockGet.mockResolvedValueOnce({
      success: false,
      error: 'Unauthorized',
    })

    await store.fetchPermissions('document', 123)

    expect(store.permissions).toEqual([])
    expect(store.error).toBe('Unauthorized')
    expect(store.loading).toBe(false)
  })

  it('grants permission correctly', async () => {
    const store = usePermissionStore()
    const mockResponse = { id: 2, user_id: 2, access_level: 'write' }

    mockPost.mockResolvedValueOnce({
      success: true,
      data: { data: [mockResponse] }, // Assuming backend returns updated list or item wrapped
    })

    // Simulate Grant
    await store.grantPermission('document', 123, 2, 'write')

    expect(mockPost).toHaveBeenCalledWith('/permissions', {
      entity_type: 'document',
      entity_id: 123,
      user_id: 2,
      access_level: 'write',
    })
    expect(store.loading).toBe(false)
  })

  it('revokes permission correctly', async () => {
    const store = usePermissionStore()
    // Setup initial state
    store.permissions = [
      { id: 1, user_id: 1, access_level: 'read' } as any,
      { id: 2, user_id: 2, access_level: 'write' } as any,
    ]

    mockDel.mockResolvedValueOnce({ success: true })

    await store.revokePermission(1, 'document', 123)

    expect(mockDel).toHaveBeenCalledWith('/permissions/1')
    expect(store.permissions).toHaveLength(1)
    expect(store.permissions[0].id).toBe(2)
  })
})
