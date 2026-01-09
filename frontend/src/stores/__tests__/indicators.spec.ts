/**
 * Tests Unitaires - Store Indicators
 * Teste les fonctionnalités de gestion des indicateurs
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useIndicatorStore } from '../indicators'
import { createMockResponse, createPaginatedResponse } from '@/test-utils/setup'

describe('useIndicatorStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  const mockIndicator = {
    id: 1,
    name: 'Taux de fréquence',
    description: "Nombre d'accidents par million d'heures travaillées",
    unit: 'accidents/million h',
    target_value: 5,
    min_value: 0,
    max_value: 100,
    frequency: 'monthly' as const,
    is_active: true,
    indicator_category_id: 1,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    code: 'TF',
    trend_direction: 'down',
    created_by: 1,
    created: '2024-01-01',
    modified: '2024-01-01',
  }

  const mockIndicatorValue = {
    id: 1,
    indicator_id: 1,
    value: 3.5,
    date: '2024-01-15',
    comment: 'Amélioration notable',
    created_at: '2024-01-15',
    frequency: 'monthly',
    target_value: 5,
    unit: 'accidents/million h',
    trend_direction: 'down',
    created_by: 1,
    updated_at: '2024-01-15',
  }

  describe('Initial state', () => {
    it('should have correct initial state', () => {
      const store = useIndicatorStore()

      expect(store.indicators).toEqual([])
      expect(store.currentIndicator).toBeNull()
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
    it('indicatorById should return indicator by id', () => {
      const store = useIndicatorStore()
      store.indicators = [mockIndicator]

      const indicator = store.indicatorById(1)
      expect(indicator).toEqual(mockIndicator)
    })

    it('indicatorById should return undefined for non-existent id', () => {
      const store = useIndicatorStore()
      store.indicators = [mockIndicator]

      const indicator = store.indicatorById(999)
      expect(indicator).toBeUndefined()
    })
  })

  describe('fetchIndicators', () => {
    it('should fetch paginated indicators successfully', async () => {
      const store = useIndicatorStore()
      const paginatedResponse = createPaginatedResponse([mockIndicator], 1, 1, 10)

      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(paginatedResponse))

      await store.fetchIndicators(1, 10)

      expect(store.indicators).toEqual([mockIndicator])
      expect(store.pagination.total).toBe(1)
      expect(store.loading).toBe(false)
      expect(store.error).toBeNull()
    })

    it('should handle filters in fetch indicators', async () => {
      const store = useIndicatorStore()
      vi.mocked(fetch).mockResolvedValueOnce(
        createMockResponse(createPaginatedResponse([mockIndicator], 1, 1, 10)),
      )

      await store.fetchIndicators(1, 10, { is_active: true, category_id: 1 })

      const fetchCall = vi.mocked(fetch).mock.calls[0]
      const url = fetchCall[0] as string
      expect(url).toContain('is_active=true')
      expect(url).toContain('category_id=1')
    })

    it('should handle non-paginated response', async () => {
      const store = useIndicatorStore()
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse([mockIndicator]))

      await store.fetchIndicators()

      expect(store.indicators).toEqual([mockIndicator])
    })
  })

  describe('fetchIndicatorById', () => {
    it('should fetch indicator by id successfully', async () => {
      const store = useIndicatorStore()
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockIndicator))

      await store.fetchIndicatorById(1)

      expect(store.currentIndicator).toEqual(mockIndicator)
      expect(store.loading).toBe(false)
    })
  })

  describe('createIndicator', () => {
    it('should create indicator successfully', async () => {
      const store = useIndicatorStore()
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockIndicator))

      await store.createIndicator({
        name: 'Taux de fréquence',
        unit: 'accidents/million h',
      })

      expect(store.indicators[0]).toEqual(mockIndicator)
      expect(store.currentIndicator).toEqual(mockIndicator)
      expect(store.loading).toBe(false)
    })
  })

  describe('updateIndicator', () => {
    it('should update indicator successfully', async () => {
      const store = useIndicatorStore()
      store.indicators = [mockIndicator]

      const updatedIndicator = { ...mockIndicator, name: 'Updated Name' }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(updatedIndicator))

      await store.updateIndicator(1, { name: 'Updated Name' })

      expect(store.indicators[0].name).toBe('Updated Name')
      expect(store.currentIndicator).toEqual(updatedIndicator)
    })
  })

  describe('deleteIndicator', () => {
    it('should delete indicator successfully', async () => {
      const store = useIndicatorStore()
      store.indicators = [mockIndicator, { ...mockIndicator, id: 2 }]
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse({ success: true }))

      await store.deleteIndicator(1)

      expect(store.indicators.length).toBe(1)
      expect(store.indicators[0].id).toBe(2)
    })

    it('should clear currentIndicator if deleted', async () => {
      const store = useIndicatorStore()
      store.indicators = [mockIndicator]
      store.currentIndicator = mockIndicator
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse({ success: true }))

      await store.deleteIndicator(1)

      expect(store.currentIndicator).toBeNull()
    })
  })

  describe('toggleActivation', () => {
    it('should toggle indicator activation successfully', async () => {
      const store = useIndicatorStore()
      store.indicators = [mockIndicator]

      const toggledIndicator = { ...mockIndicator, is_active: false }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(toggledIndicator))

      await store.toggleActivation(1)

      expect(store.indicators[0].is_active).toBe(false)
    })
  })

  describe('Indicator Values', () => {
    it('should add indicator value successfully', async () => {
      const store = useIndicatorStore()
      store.currentIndicator = { ...mockIndicator, values: [] }

      const responseData = {
        ...mockIndicator,
        values: [mockIndicatorValue],
      }
      vi.mocked(fetch)
        .mockResolvedValueOnce(createMockResponse(mockIndicatorValue)) // POST response
        .mockResolvedValueOnce(createMockResponse(responseData)) // GET response (fetchIndicatorById)

      await store.addIndicatorValue(1, {
        value: 3.5,
        date: '2024-01-15',
        comment: 'Test',
      })

      expect(store.currentIndicator?.values).toHaveLength(1)
    })

    it('should update indicator value successfully', async () => {
      const store = useIndicatorStore()
      store.currentIndicator = {
        ...mockIndicator,
        values: [mockIndicatorValue],
      }

      const updatedValue = { ...mockIndicatorValue, value: 4.0 }
      const responseData = {
        ...mockIndicator,
        values: [updatedValue],
      }
      vi.mocked(fetch)
        .mockResolvedValueOnce(createMockResponse(updatedValue)) // PUT response
        .mockResolvedValueOnce(createMockResponse(responseData)) // GET response

      await store.updateIndicatorValue(1, 1, { value: 4.0, date: '2024-01-15' })

      expect(store.currentIndicator?.values?.[0].value).toBe(4.0)
    })

    it('should delete indicator value successfully', async () => {
      const store = useIndicatorStore()
      store.currentIndicator = {
        ...mockIndicator,
        values: [mockIndicatorValue],
      }

      const responseData = {
        ...mockIndicator,
        values: [],
      }
      vi.mocked(fetch)
        .mockResolvedValueOnce(createMockResponse({ success: true })) // DELETE response
        .mockResolvedValueOnce(createMockResponse(responseData)) // GET response

      await store.deleteIndicatorValue(1, 1)

      expect(store.currentIndicator?.values).toHaveLength(0)
    })
  })

  describe('Error handling', () => {
    it('should handle network errors on fetch', async () => {
      const store = useIndicatorStore()
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

      await store.fetchIndicators()

      expect(store.error).toBeTruthy()
      expect(store.loading).toBe(false)
    })

    it('should throw error on create failure', async () => {
      const store = useIndicatorStore()
      vi.mocked(fetch).mockResolvedValueOnce(
        createMockResponse({ error: 'Validation failed' }, { ok: false, status: 422 }),
      )

      await store.createIndicator({ name: 'Test' }).catch(() => {
        // Expected to throw
      })

      expect(store.error).toBeTruthy()
    })
  })
})
