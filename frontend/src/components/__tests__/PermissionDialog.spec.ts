import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import PermissionDialog from '../common/PermissionDialog.vue'
import { usePermissionStore } from '../../stores/permissions'
import { useUserStore } from '../../stores/users'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

// Mock useApi to intercept store calls
const mockGet = vi.fn()
const mockPost = vi.fn()
const mockDel = vi.fn()

vi.mock('../../composables/useApi', () => ({
  useApi: () => ({
    get: mockGet,
    post: mockPost,
    del: mockDel,
  }),
}))

const globalStubs = {
  Dialog: { template: '<div><slot></slot></div>' },
  AutoComplete: {
    template: '<input @input="$emit(\'complete\', { query: $event.target.value })" />',
    props: ['suggestions'],
  },
  Dropdown: {
    template:
      '<select><option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option></select>',
    props: ['options', 'modelValue'],
  },
  Button: { template: '<button @click="$emit(\'click\')"><slot></slot></button>' },
  Avatar: true,
  Tag: true,
  'font-awesome-icon': true,
}

describe.todo('PermissionDialog.vue', () => {
  let wrapper: any

  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()

    // Default mocks
    mockGet.mockResolvedValue({ success: true, data: [] })
    mockPost.mockResolvedValue({ success: true, data: {} })
    mockDel.mockResolvedValue({ success: true })
  })

  it('fetches on visible', async () => {
    mockGet.mockResolvedValueOnce({ success: true, data: [] })

    wrapper = mount(PermissionDialog, {
      props: { visible: true, entityType: 'document', entityId: 1 },
      global: {
        plugins: [createPinia(), PrimeVue, ToastService],
        stubs: globalStubs,
      },
    })

    // The store calls API with query params
    expect(mockGet).toHaveBeenCalledWith(
      expect.stringContaining('/permissions?entity_type=document&entity_id=1'),
    )
  })

  it('calls grant permission', async () => {
    wrapper = mount(PermissionDialog, {
      props: { visible: true, entityType: 'document', entityId: 1 },
      global: {
        plugins: [createPinia(), PrimeVue, ToastService],
        stubs: globalStubs,
      },
    })

    const permissionStore = usePermissionStore()

    // Manually trigger component method via vm
    wrapper.vm.selectedUser = { id: 3, first_name: 'Bob', last_name: 'Smith' }
    wrapper.vm.selectedLevel = 'write'

    await wrapper.vm.addPermission()

    expect(mockPost).toHaveBeenCalledWith(
      '/permissions',
      expect.objectContaining({
        user_id: 3,
        entity_type: 'document',
      }),
    )
  })

  it('calls revoke permission', async () => {
    wrapper = mount(PermissionDialog, {
      props: { visible: true, entityType: 'document', entityId: 1 },
      global: {
        plugins: [createPinia(), PrimeVue, ToastService],
        stubs: globalStubs,
      },
    })

    const permissionStore = usePermissionStore()
    const perm = { id: 99, user_id: 3, user: { first_name: 'Bob' }, access_level: 'read' }

    await wrapper.vm.revokePermission(perm)

    expect(mockDel).toHaveBeenCalledWith('/permissions/99')
  })
})
