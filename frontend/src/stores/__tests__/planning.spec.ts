/**
 * Tests Unitaires - Store Planning
 * Teste les fonctionnalités de gestion de la planification (visites, talks)
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePlanningStore } from '../planning'
import { createMockResponse } from '@/test-utils/setup'

describe('usePlanningStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  const mockEvent = {
    id: 'action-1',
    title: 'Action Test',
    start: '2024-01-15T10:00:00',
    end: '2024-01-15T12:00:00',
    type: 'action' as const,
    original_id: 1,
    color: '#3B82F6',
  }

  const mockVisit = {
    id: 1,
    date: '2024-01-20',
    location: 'Bureau Principal',
    auditor_id: 1,
    score: null,
    status: 'planned' as const,
    report_path: null,
  }

  const mockTalk = {
    id: 1,
    date: '2024-01-25',
    topic: 'Port des EPI',
    instructor_id: 1,
    location: 'Salle de formation',
    notes_path: null,
  }

  describe('Initial state', () => {
    it('should have correct initial state', () => {
      const store = usePlanningStore()

      expect(store.events).toEqual([])
      expect(store.visits).toEqual([])
      expect(store.talks).toEqual([])
      expect(store.loading).toBe(false)
      expect(store.error).toBeNull()
    })
  })

  describe('fetchEvents', () => {
    it('should fetch events successfully', async () => {
      const store = usePlanningStore()
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse([mockEvent]))

      await store.fetchEvents()

      expect(store.events).toEqual([mockEvent])
      expect(store.loading).toBe(false)
    })

    it('should fetch events with date range', async () => {
      const store = usePlanningStore()
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse([mockEvent]))

      await store.fetchEvents('2024-01-01', '2024-01-31')

      const fetchCall = vi.mocked(fetch).mock.calls[0]
      const url = fetchCall[0] as string
      expect(url).toContain('start=2024-01-01')
      expect(url).toContain('end=2024-01-31')
    })

    it('should handle nested data response', async () => {
      const store = usePlanningStore()
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse({ data: [mockEvent] }))

      await store.fetchEvents()

      expect(store.events).toEqual([mockEvent])
    })
  })

  describe('Safety Visits', () => {
    it('should fetch visits successfully', async () => {
      const store = usePlanningStore()
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse([mockVisit]))

      await store.fetchVisits()

      expect(store.visits).toEqual([mockVisit])
      expect(store.loading).toBe(false)
    })

    it('should create visit successfully', async () => {
      const store = usePlanningStore()
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockVisit))

      const result = await store.createVisit({
        date: '2024-01-20',
        location: 'Bureau Principal',
        auditor_id: 1,
      })

      expect(store.visits[0]).toEqual(mockVisit)
      expect(result).toEqual(mockVisit)
    })

    it('should update visit successfully', async () => {
      const store = usePlanningStore()
      store.visits = [mockVisit]

      const updatedVisit = { ...mockVisit, score: 85 }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(updatedVisit))

      await store.updateVisit(1, { score: 85 })

      expect(store.visits[0].score).toBe(85)
    })

    it('should delete visit successfully', async () => {
      const store = usePlanningStore()
      store.visits = [mockVisit, { ...mockVisit, id: 2 }]
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse({ success: true }))

      await store.deleteVisit(1)

      expect(store.visits.length).toBe(1)
      expect(store.visits[0].id).toBe(2)
    })
  })

  describe('Toolbox Talks', () => {
    it('should fetch talks successfully', async () => {
      const store = usePlanningStore()
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse([mockTalk]))

      await store.fetchTalks()

      expect(store.talks).toEqual([mockTalk])
      expect(store.loading).toBe(false)
    })

    it('should create talk successfully', async () => {
      const store = usePlanningStore()
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockTalk))

      const result = await store.createTalk({
        date: '2024-01-25',
        topic: 'Port des EPI',
        instructor_id: 1,
        location: 'Salle de formation',
      })

      expect(store.talks[0]).toEqual(mockTalk)
      expect(result).toEqual(mockTalk)
    })

    it('should create talk with attendees', async () => {
      const store = usePlanningStore()
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockTalk))

      await store.createTalk({
        topic: 'Port des EPI',
        attendees: [1, 2, 3],
      })

      const fetchCall = vi.mocked(fetch).mock.calls[0]
      const body = JSON.parse(fetchCall[1]?.body as string)
      expect(body.attendees).toEqual([1, 2, 3])
    })

    it('should update talk successfully', async () => {
      const store = usePlanningStore()
      store.talks = [mockTalk]

      const updatedTalk = { ...mockTalk, topic: 'Updated Topic' }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(updatedTalk))

      await store.updateTalk(1, { topic: 'Updated Topic' })

      expect(store.talks[0].topic).toBe('Updated Topic')
    })

    it('should delete talk successfully', async () => {
      const store = usePlanningStore()
      store.talks = [mockTalk, { ...mockTalk, id: 2 }]
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse({ success: true }))

      await store.deleteTalk(1)

      expect(store.talks.length).toBe(1)
      expect(store.talks[0].id).toBe(2)
    })
  })

  describe('Error handling', () => {
    it('should handle network errors on fetchEvents', async () => {
      const store = usePlanningStore()
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

      await store.fetchEvents()

      expect(store.error).toBeTruthy()
      expect(store.loading).toBe(false)
    })

    it('should throw error on createVisit failure', async () => {
      const store = usePlanningStore()
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Server error'))

      await expect(store.createVisit({ date: '2024-01-20' })).rejects.toThrow()

      expect(store.error).toBeTruthy()
    })

    it('should throw error on createTalk failure', async () => {
      const store = usePlanningStore()
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Server error'))

      await expect(store.createTalk({ topic: 'Test' })).rejects.toThrow()

      expect(store.error).toBeTruthy()
    })
  })
})
