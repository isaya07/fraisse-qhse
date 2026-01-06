/**
 * Vitest Setup File
 * Configuration globale pour tous les tests unitaires
 */

import { vi, beforeEach, afterEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
    get length() {
      return Object.keys(store).length
    },
    key: vi.fn((index: number) => Object.keys(store)[index] ?? null),
  }
})()

// Mock global fetch
const createFetchMock = () => {
  return vi.fn()
}

// Mock CustomEvent pour les événements API
class CustomEventMock extends Event {
  detail: unknown
  constructor(type: string, eventInitDict?: CustomEventInit) {
    super(type, eventInitDict)
    this.detail = eventInitDict?.detail
  }
}

// Setup avant chaque test
beforeEach(() => {
  // Créer une nouvelle instance Pinia pour chaque test
  setActivePinia(createPinia())

  // Setup localStorage mock
  vi.stubGlobal('localStorage', localStorageMock)
  localStorageMock.clear()

  // Setup fetch mock
  vi.stubGlobal('fetch', createFetchMock())

  // Setup CustomEvent mock
  vi.stubGlobal('CustomEvent', CustomEventMock)

  // Setup window.dispatchEvent mock
  vi.spyOn(window, 'dispatchEvent').mockImplementation(() => true)

  // Setup document mock pour les thèmes
  vi.spyOn(document.documentElement, 'setAttribute').mockImplementation(() => {})
  vi.spyOn(document.documentElement.classList, 'toggle').mockImplementation(() => false)
})

// Cleanup après chaque test
afterEach(() => {
  vi.clearAllMocks()
  vi.unstubAllGlobals()
})

// Export des utilitaires pour les tests
export { localStorageMock, createFetchMock }

// Helper pour créer des réponses API mockées
export const createMockResponse = (data: unknown, options: Partial<Response> = {}) => {
  return {
    ok: options.ok ?? true,
    status: options.status ?? 200,
    headers: new Headers({
      'content-type': 'application/json',
      ...Object.fromEntries(
        options.headers instanceof Headers
          ? options.headers.entries()
          : Object.entries(options.headers ?? {}),
      ),
    }),
    json: vi.fn().mockResolvedValue(data),
    blob: vi.fn().mockResolvedValue(new Blob([JSON.stringify(data)])),
  } as unknown as Response
}

// Helper pour créer une réponse paginée
export const createPaginatedResponse = <T>(
  data: T[],
  options: { page?: number; perPage?: number; total?: number } = {},
) => {
  const page = options.page ?? 1
  const perPage = options.perPage ?? 10
  const total = options.total ?? data.length
  return {
    data,
    total,
    current_page: page,
    per_page: perPage,
    last_page: Math.ceil(total / perPage),
    from: (page - 1) * perPage + 1,
    to: Math.min(page * perPage, total),
  }
}

// Mock user pour les tests d'authentification
export const mockUser = {
  id: 1,
  username: 'admin',
  email: 'admin@qhse.local',
  first_name: 'Admin',
  last_name: 'QHSE',
  role: 'admin',
  is_active: true,
}

// Mock token
export const mockToken = 'test-bearer-token-12345'
