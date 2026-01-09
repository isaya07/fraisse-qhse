import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ActionCard from '@/components/actions/ActionCard.vue'

describe('ActionCard.vue', () => {
  const mockAction: any = {
    id: 1,
    title: 'Test Action',
    status: 'open',
    priority: 'high',
    progress: 50,
    due_date: '2024-12-31',
    action_type: {
      name: 'Safety',
      icon: 'shield-alt',
      color: '#ff0000',
    },
    assignee: {
      first_name: 'John',
      last_name: 'Doe',
    },
  }

  it('renders correctly', () => {
    const wrapper = mount(ActionCard, {
      props: {
        action: mockAction,
      },
      global: {
        stubs: {
          'font-awesome-icon': true,
          Card: { template: '<div class="p-card"><slot name="content"></slot></div>' },
          Tag: true,
          Avatar: true,
        },
      },
    })

    expect(wrapper.text()).toContain('Test Action')
    expect(wrapper.text()).toContain('Safety')
    // Check Status Text (open -> Ouvert)
    // Note: Tag might stub content, so text content depends on how Tag is stubbed or rendered.
    // If stub is true, it renders <tag-stub>. Text might pass through if default slot?
    // ActionCard passes 'value' prop to Tag.
    // Stubbed component props are usually attributes on the stub element.
    // So expect wrapper.findComponent('Tag').attributes('value) to be 'Ouvert'

    // Check Assignee
    expect(wrapper.text()).toContain('John Doe')
  })

  it('emits view event when clicked', async () => {
    const wrapper = mount(ActionCard, {
      props: {
        action: mockAction,
      },
      global: {
        stubs: {
          'font-awesome-icon': true,
          Card: { template: '<div class="p-card"><slot name="content"></slot></div>' },
          Tag: true,
          Avatar: true,
        },
      },
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('view')).toBeTruthy()
    expect(wrapper.emitted('view')![0]).toEqual([1])
  })
})
