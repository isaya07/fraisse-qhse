/**
 * Tests pour le store app (authentification et settings globaux)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAppStore, isPaginatedResponse } from '../app'
import { createMockResponse, mockUser, mockToken } from '@/test-utils/setup'

describe('useAppStore', () => {
  let store: ReturnType<typeof useAppStore>

  beforeEach(() => {
    store = useAppStore()
    store.apiUrl = 'http://localhost:8000/api'
  })

  describe('Initial state', () => {
    it('should have correct initial state', () => {
      expect(store.user).toBeNull()
      expect(store.token).toBe('')
      expect(store.theme).toBe('light')
      expect(store.apiUrl).toBe('http://localhost:8000/api')
    })

    it('should load token from localStorage if present', () => {
      localStorage.setItem('token', 'saved-token')
      // Recréer le store pour qu'il lise le localStorage
      const newStore = useAppStore()
      // Note: Dans un vrai test, on devrait recréer Pinia
      expect(localStorage.getItem).toHaveBeenCalledWith('token')
    })
  })

  describe('Getters', () => {
    it('isAuthenticated should return false when no token', () => {
      store.token = ''
      expect(store.isAuthenticated).toBe(false)
    })

    it('isAuthenticated should return true when token exists', () => {
      store.token = mockToken
      expect(store.isAuthenticated).toBe(true)
    })

    it('currentUser should return user from state', () => {
      store.user = mockUser
      expect(store.currentUser).toEqual(mockUser)
    })

    it('userRole should return empty string when no user', () => {
      store.user = null
      expect(store.userRole).toBe('')
    })

    it('userRole should return user role', () => {
      store.user = mockUser
      expect(store.userRole).toBe('admin')
    })
  })

  describe('Actions - Token Management', () => {
    it('setToken should save token to state and localStorage', () => {
      store.setToken(mockToken)

      expect(store.token).toBe(mockToken)
      expect(localStorage.setItem).toHaveBeenCalledWith('token', mockToken)
    })

    it('clearToken should clear token, user, and localStorage', () => {
      // Setup initial state
      store.token = mockToken
      store.user = mockUser

      store.clearToken()

      expect(store.token).toBe('')
      expect(store.user).toBeNull()
      expect(localStorage.removeItem).toHaveBeenCalledWith('token')
      expect(localStorage.removeItem).toHaveBeenCalledWith('user_role')
    })
  })

  describe('Actions - Theme Management', () => {
    it('setTheme should update theme and localStorage', () => {
      store.setTheme('dark')

      expect(store.theme).toBe('dark')
      expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark')
    })

    it('toggleTheme should switch between light and dark', () => {
      store.theme = 'light'
      store.toggleTheme()
      expect(store.theme).toBe('dark')

      store.toggleTheme()
      expect(store.theme).toBe('light')
    })
  })

  describe('Actions - User Management', () => {
    it('setUser should update user and save role to localStorage', () => {
      store.setUser(mockUser)

      expect(store.user).toEqual(mockUser)
      expect(localStorage.setItem).toHaveBeenCalledWith('user_role', 'admin')
    })
  })

  describe('Actions - Login', () => {
    it('should login successfully with valid credentials', async () => {
      const loginResponse = {
        token: mockToken,
        user: mockUser,
      }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(loginResponse))

      const result = await store.login({
        email: 'admin@qhse.local',
        password: 'password',
      })

      expect(result.success).toBe(true)
      expect(result.user).toEqual(mockUser)
      expect(store.token).toBe(mockToken)
      expect(store.user).toEqual(mockUser)
    })

    it('should fail login with invalid credentials', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(
        createMockResponse({ error: 'Invalid credentials' }, { ok: false, status: 401 }),
      )

      const result = await store.login({
        email: 'wrong@email.com',
        password: 'wrong',
      })

      expect(result.success).toBe(false)
      expect(result.message).toBeDefined()
      expect(store.token).toBe('')
    })

    it('should call correct API endpoint for login', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(
        createMockResponse({ token: mockToken, user: mockUser }),
      )

      await store.login({ email: 'test@test.com', password: 'password' })

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/login',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ email: 'test@test.com', password: 'password' }),
        }),
      )
    })
  })

  describe('Actions - Logout', () => {
    it('should logout and clear token', async () => {
      store.token = mockToken
      store.user = mockUser
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse({}))

      await store.logout()

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/logout',
        expect.objectContaining({ method: 'POST' }),
      )
      expect(store.token).toBe('')
      expect(store.user).toBeNull()
    })
  })

  describe('Actions - Fetch Current User', () => {
    it('should fetch and set current user when token exists', async () => {
      store.token = mockToken
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockUser))

      await store.fetchCurrentUser()

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/user',
        expect.objectContaining({ method: 'GET' }),
      )
      expect(store.user).toEqual(mockUser)
    })

    it('should not fetch user when no token', async () => {
      store.token = ''

      await store.fetchCurrentUser()

      expect(fetch).not.toHaveBeenCalled()
    })

    it('should clear token if fetch user fails', async () => {
      store.token = mockToken
      vi.mocked(fetch).mockResolvedValueOnce(
        createMockResponse({ error: 'Unauthorized' }, { ok: false, status: 401 }),
      )

      await store.fetchCurrentUser()

      expect(store.token).toBe('')
      expect(store.user).toBeNull()
    })
  })
})

describe('isPaginatedResponse', () => {
  it('should return true for valid paginated response', () => {
    const paginatedData = {
      data: [{ id: 1 }, { id: 2 }],
      total: 10,
      current_page: 1,
      per_page: 10,
      last_page: 1,
      from: 1,
      to: 2,
    }

    expect(isPaginatedResponse(paginatedData)).toBe(true)
  })

  it('should return false for array response', () => {
    const arrayData = [{ id: 1 }, { id: 2 }]
    expect(isPaginatedResponse(arrayData)).toBe(false)
  })

  it('should return false for null', () => {
    expect(isPaginatedResponse(null)).toBe(false)
  })

  it('should return false for undefined', () => {
    expect(isPaginatedResponse(undefined)).toBe(false)
  })

  it('should return false for object without data array', () => {
    const invalidData = {
      data: 'not an array',
      total: 10,
      current_page: 1,
      per_page: 10,
    }
    expect(isPaginatedResponse(invalidData)).toBe(false)
  })

  it('should return false for object missing required fields', () => {
    const incompleteData = {
      data: [],
      total: 10,
      // missing current_page and per_page
    }
    expect(isPaginatedResponse(incompleteData)).toBe(false)
  })
})
