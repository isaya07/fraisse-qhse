/**
 * Tests Unitaires - Store Users
 * Teste les fonctionnalités de gestion des utilisateurs
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '../users'
import { createMockResponse, createPaginatedResponse } from '@/test-utils/setup'

describe('useUserStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  const mockUser = {
    id: 1,
    username: 'admin',
    email: 'admin@qhse.local',
    first_name: 'Admin',
    last_name: 'User',
    role: 'admin',
    is_active: true,
  }

  describe('Initial state', () => {
    it('should have correct initial state', () => {
      const store = useUserStore()

      expect(store.users).toEqual([])
      expect(store.currentUser).toBeNull()
      expect(store.loading).toBe(false)
      expect(store.error).toBeNull()
      expect(store.pagination).toEqual({
        page: 1,
        limit: 15,
        total: 0,
        totalPages: 1,
      })
    })
  })

  describe('Getters', () => {
    it('userById should return user by id', () => {
      const store = useUserStore()
      store.users = [mockUser]

      const user = store.userById(1)
      expect(user).toEqual(mockUser)
    })

    it('userById should return undefined for non-existent id', () => {
      const store = useUserStore()
      store.users = [mockUser]

      const user = store.userById(999)
      expect(user).toBeUndefined()
    })
  })

  describe('fetchUsers', () => {
    it('should fetch paginated users successfully', async () => {
      const store = useUserStore()
      const paginatedResponse = createPaginatedResponse([mockUser], 1, 1, 15)

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(paginatedResponse))

      await store.fetchUsers(1, 15)

      expect(store.users).toEqual([mockUser])
      expect(store.pagination.total).toBe(1)
      expect(store.loading).toBe(false)
      expect(store.error).toBeNull()
    })

    it('should handle filters in fetch users', async () => {
      const store = useUserStore()
      vi.mocked(fetch).mockResolvedValueOnce(
        createMockResponse(createPaginatedResponse([mockUser], 1, 1, 15)),
      )

      await store.fetchUsers(1, 15, { role: 'admin', is_active: true })

      const fetchCall = vi.mocked(fetch).mock.calls[0]
      const url = fetchCall[0] as string
      expect(url).toContain('role=admin')
      expect(url).toContain('is_active=true')
    })

    it('should handle non-paginated response', async () => {
      const store = useUserStore()
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse([mockUser]))

      await store.fetchUsers()

      expect(store.users).toEqual([mockUser])
      expect(store.loading).toBe(false)
    })
  })

  describe('fetchUserById', () => {
    it('should fetch user by id successfully', async () => {
      const store = useUserStore()
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockUser))

      await store.fetchUserById(1)

      expect(store.currentUser).toEqual(mockUser)
      expect(store.loading).toBe(false)
    })

    it('should handle fetch error', async () => {
      const store = useUserStore()
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse({}, { ok: false, status: 404 }))

      await store.fetchUserById(999)

      expect(store.error).toBeTruthy()
      expect(store.loading).toBe(false)
    })
  })

  describe('createUser', () => {
    it('should create user successfully', async () => {
      const store = useUserStore()
      const newUser = { ...mockUser, id: 2, email: 'new@qhse.local', password: 'password123' }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(newUser))

      await store.createUser(newUser)

      expect(store.users[0]).toEqual(newUser)
      expect(store.currentUser).toEqual(newUser)
      expect(store.loading).toBe(false)
    })

    it('should throw error on create failure', async () => {
      const store = useUserStore()
      vi.mocked(fetch).mockResolvedValueOnce(
        createMockResponse({ error: 'Email already exists' }, { ok: false, status: 422 }),
      )

      await store.createUser({ email: 'duplicate@qhse.local' }).catch(() => {
        // Expected to throw
      })

      expect(store.error).toBeTruthy()
    })
  })

  describe('updateUser', () => {
    it('should update user successfully', async () => {
      const store = useUserStore()
      store.users = [mockUser]

      const updatedUser = { ...mockUser, first_name: 'Updated' }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(updatedUser))

      await store.updateUser(1, { first_name: 'Updated' })

      expect(store.users[0].first_name).toBe('Updated')
      expect(store.currentUser).toEqual(updatedUser)
      expect(store.loading).toBe(false)
    })

    it('should throw error on update failure', async () => {
      const store = useUserStore()
      vi.mocked(fetch).mockResolvedValueOnce(
        createMockResponse({ error: 'Not found' }, { ok: false, status: 404 }),
      )

      await store.updateUser(999, { first_name: 'Test' }).catch(() => {
        // Expected to throw
      })

      expect(store.error).toBeTruthy()
    })
  })

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      const store = useUserStore()
      store.users = [mockUser, { ...mockUser, id: 2 }]
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse({ success: true }))

      await store.deleteUser(1)

      expect(store.users.length).toBe(1)
      expect(store.users[0].id).toBe(2)
      expect(store.loading).toBe(false)
    })

    it('should clear currentUser if deleted user is current', async () => {
      const store = useUserStore()
      store.users = [mockUser]
      store.currentUser = mockUser
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse({ success: true }))

      await store.deleteUser(1)

      expect(store.currentUser).toBeNull()
    })

    it('should throw error on delete failure', async () => {
      const store = useUserStore()
      vi.mocked(fetch).mockResolvedValueOnce(
        createMockResponse({ error: 'Cannot delete' }, { ok: false, status: 403 }),
      )

      await store.deleteUser(1).catch(() => {
        // Expected to throw
      })

      expect(store.error).toBeTruthy()
    })
  })

  describe('Error handling', () => {
    it('should handle network errors on fetch', async () => {
      const store = useUserStore()
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

      await store.fetchUsers()

      expect(store.error).toBeTruthy()
      expect(store.loading).toBe(false)
    })
  })
})
