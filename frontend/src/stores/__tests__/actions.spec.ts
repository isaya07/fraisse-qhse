/**
 * Tests pour le store actions
 * CRUD actions, progression, commentaires, liaisons documents/indicateurs
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useActionStore } from '../actions'
import { useAppStore } from '../app'
import {
  createMockResponse,
  createPaginatedResponse,
  mockToken,
  mockUser,
} from '@/test-utils/setup'

// Mock data
const mockAction = {
  id: 1,
  title: 'Action corrective #1',
  description: "Description de l'action",
  action_type_id: 1,
  action_type: { id: 1, name: 'Corrective', icon: 'fa-wrench', color: '#FF5733' },
  priority: 'high',
  status: 'in_progress',
  assigned_to: 1,
  created_by: 1,
  due_date: '2024-07-01',
  completed_date: null,
  progress: 50,
  related_to: null,
  related_id: null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  assignee: mockUser,
  creator: mockUser,
  documents: [],
  indicators: [],
  comments: [],
}

const mockActions = [
  mockAction,
  { ...mockAction, id: 2, title: 'Action préventive #1', priority: 'medium', progress: 25 },
  {
    ...mockAction,
    id: 3,
    title: 'Action amélioration',
    priority: 'low',
    status: 'completed',
    progress: 100,
  },
]

const mockComment = {
  id: 1,
  action_id: 1,
  user_id: 1,
  content: 'Commentaire de test',
  created_at: '2024-01-15T10:00:00Z',
  updated_at: '2024-01-15T10:00:00Z',
  user: mockUser,
}

describe('useActionStore', () => {
  let store: ReturnType<typeof useActionStore>
  let appStore: ReturnType<typeof useAppStore>

  beforeEach(() => {
    store = useActionStore()
    appStore = useAppStore()
    appStore.token = mockToken
    appStore.apiUrl = 'http://localhost:8000/api'
  })

  describe('Initial state', () => {
    it('should have correct initial state', () => {
      expect(store.actions).toEqual([])
      expect(store.currentAction).toBeNull()
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
    it('actionById should return action by id', () => {
      store.actions = mockActions

      const action = store.actionById(2)
      expect(action?.title).toBe('Action préventive #1')
    })

    it('actionById should return undefined for non-existent id', () => {
      store.actions = mockActions

      const action = store.actionById(999)
      expect(action).toBeUndefined()
    })
  })

  describe('Actions - fetchActions', () => {
    it('should fetch paginated actions successfully', async () => {
      const paginatedResponse = createPaginatedResponse(mockActions, {
        page: 1,
        perPage: 10,
        total: 30,
      })
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(paginatedResponse))

      await store.fetchActions(1, 10)

      expect(store.actions).toEqual(mockActions)
      expect(store.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 30,
        totalPages: 3,
      })
    })

    it('should handle non-paginated response', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockActions))

      await store.fetchActions()

      expect(store.actions).toEqual(mockActions)
      expect(store.pagination.total).toBe(mockActions.length)
    })

    it('should apply filters to query params', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(
        createMockResponse(createPaginatedResponse(mockActions)),
      )

      await store.fetchActions(1, 10, {
        status: 'in_progress',
        priority: 'high',
        assigned_to: 1,
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('status=in_progress'),
        expect.anything(),
      )
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('priority=high'),
        expect.anything(),
      )
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('assigned_to=1'),
        expect.anything(),
      )
    })

    it('should skip empty filter values', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(
        createMockResponse(createPaginatedResponse(mockActions)),
      )

      await store.fetchActions(1, 10, { status: '', priority: null, search: undefined })

      const url = vi.mocked(fetch).mock.calls[0][0] as string
      expect(url).not.toContain('status=')
      expect(url).not.toContain('priority=')
      expect(url).not.toContain('search=')
    })

    it('should set error on fetch failure', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(
        createMockResponse({ error: 'Server error' }, { ok: false, status: 500 }),
      )

      await store.fetchActions()

      expect(store.error).toBeTruthy()
      expect(store.loading).toBe(false)
    })
  })

  describe('Actions - fetchActionById', () => {
    it('should fetch single action', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockAction))

      await store.fetchActionById(1)

      expect(store.currentAction).toEqual(mockAction)
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/actions/1'), expect.anything())
    })

    it('should handle not found error', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(
        createMockResponse({ error: 'Not found' }, { ok: false, status: 404 }),
      )

      await store.fetchActionById(999)

      expect(store.error).toBeTruthy()
    })
  })

  describe('Actions - CRUD', () => {
    it('should create action', async () => {
      const newAction = { ...mockAction, id: 10, title: 'New Action' }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(newAction))

      await store.createAction({ title: 'New Action', priority: 'high' })

      expect(store.actions[0]).toEqual(newAction)
      expect(store.currentAction).toEqual(newAction)
    })

    it('should throw error on create failure', async () => {
      vi.mocked(fetch).mockResolvedValueOnce(
        createMockResponse({ error: 'Validation failed' }, { ok: false, status: 422 }),
      )

      await expect(store.createAction({ title: '' })).rejects.toThrow()
    })

    it('should update action', async () => {
      store.actions = [...mockActions]
      const updatedAction = { ...mockAction, title: 'Updated Title', progress: 75 }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(updatedAction))

      await store.updateAction(1, { title: 'Updated Title', progress: 75 })

      expect(store.actions.find((a) => a.id === 1)?.title).toBe('Updated Title')
      expect(store.currentAction?.progress).toBe(75)
    })

    it('should delete action', async () => {
      store.actions = [...mockActions]
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse({ success: true }))

      await store.deleteAction(1)

      expect(store.actions.find((a) => a.id === 1)).toBeUndefined()
      expect(store.actions).toHaveLength(2)
    })

    it('should clear currentAction if deleted', async () => {
      store.actions = [...mockActions]
      store.currentAction = mockAction
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse({ success: true }))

      await store.deleteAction(1)

      expect(store.currentAction).toBeNull()
    })
  })

  describe('Actions - Progress', () => {
    it('should update progress', async () => {
      store.actions = [...mockActions]
      const updatedAction = { ...mockAction, progress: 80 }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(updatedAction))

      await store.updateProgress(1, 80)

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/actions/1/update-progress'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ progress: 80 }),
        }),
      )
      expect(store.actions.find((a) => a.id === 1)?.progress).toBe(80)
    })

    it('should update currentAction progress if selected', async () => {
      store.actions = [...mockActions]
      store.currentAction = mockAction
      const updatedAction = { ...mockAction, progress: 100, status: 'completed' }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(updatedAction))

      await store.updateProgress(1, 100)

      expect(store.currentAction?.progress).toBe(100)
      expect(store.currentAction?.status).toBe('completed')
    })
  })

  describe('Actions - Comments', () => {
    it('should add comment to action', async () => {
      store.currentAction = { ...mockAction, comments: [] }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockComment))

      await store.addComment(1, 'Nouveau commentaire')

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/actions/1/comments'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ content: 'Nouveau commentaire' }),
        }),
      )
      expect(store.currentAction?.comments).toContainEqual(mockComment)
    })

    it('should initialize comments array if undefined', async () => {
      store.currentAction = { ...mockAction, comments: undefined }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockComment))

      await store.addComment(1, 'Test')

      expect(store.currentAction?.comments).toHaveLength(1)
    })

    it('should delete comment', async () => {
      store.currentAction = { ...mockAction, comments: [mockComment, { ...mockComment, id: 2 }] }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse({ success: true }))

      await store.deleteComment(1)

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/comments/1'),
        expect.objectContaining({ method: 'DELETE' }),
      )
      expect(store.currentAction?.comments?.find((c) => c.id === 1)).toBeUndefined()
      expect(store.currentAction?.comments).toHaveLength(1)
    })
  })

  describe('Actions - Document Links', () => {
    it('should link document to action', async () => {
      const actionWithDoc = {
        ...mockAction,
        documents: [{ id: 5, title: 'Linked Doc' }],
      }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(actionWithDoc))

      await store.linkDocument(1, 5)

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/actions/1/documents'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ document_id: 5 }),
        }),
      )
      expect(store.currentAction?.documents).toHaveLength(1)
    })

    it('should unlink document from action', async () => {
      const actionWithoutDoc = { ...mockAction, documents: [] }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(actionWithoutDoc))

      await store.unlinkDocument(1, 5)

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/actions/1/documents/5'),
        expect.objectContaining({ method: 'DELETE' }),
      )
    })
  })

  describe('Actions - Indicator Links', () => {
    it('should link indicator to action', async () => {
      const actionWithIndicator = {
        ...mockAction,
        indicators: [{ id: 3, name: 'Linked Indicator' }],
      }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(actionWithIndicator))

      await store.linkIndicator(1, 3)

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/actions/1/indicators'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ indicator_id: 3 }),
        }),
      )
      expect(store.currentAction?.indicators).toHaveLength(1)
    })

    it('should unlink indicator from action', async () => {
      const actionWithoutIndicator = { ...mockAction, indicators: [] }
      vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(actionWithoutIndicator))

      await store.unlinkIndicator(1, 3)

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/actions/1/indicators/3'),
        expect.objectContaining({ method: 'DELETE' }),
      )
    })
  })

  describe('Error handling', () => {
    it('should handle network errors on fetch', async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

      await store.fetchActions()

      // L'erreur est capturée et stockée
      expect(store.error).toBeTruthy()
      expect(store.loading).toBe(false)
    })

    it('should throw and set error on update failure', async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Server error'))

      try {
        await store.updateAction(1, { title: 'Test' })
      } catch {
        // Error is expected
      }
      expect(store.error).toBeTruthy()
    })

    it('should throw and set error on comment failure', async () => {
      store.currentAction = mockAction
      vi.mocked(fetch).mockResolvedValueOnce(
        createMockResponse({ error: 'Not allowed' }, { ok: false, status: 403 }),
      )

      try {
        await store.addComment(1, 'Test')
      } catch {
        // Error is expected
      }
      expect(store.error).toBeTruthy()
    })
  })
})
