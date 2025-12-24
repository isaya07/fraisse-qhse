import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '@/composables/useApi'

export interface Notification {
  id: number
  user_id: number
  type: string
  related_id: number | null
  message: string
  read_at: string | null
  created_at: string
}

export interface NotificationSettings {
  email_enabled: boolean
  email_time: string
  alert_thresholds: Record<string, number>
}

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification[]>([])
  const unreadCount = ref(0)
  const settings = ref<NotificationSettings | null>(null)
  const loading = ref(false)
  const { get, put, post } = useApi()

  async function fetchNotifications(unreadOnly = false) {
    loading.value = true
    try {
      let url = '/notifications'
      if (unreadOnly) {
        url += '?unread=true'
      }

      const response = await get<{ data: Notification[] }>(url)
      if (response.success && response.data) {
        notifications.value = response.data.data || []
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      loading.value = false
    }
  }

  async function fetchUnreadCount() {
    try {
      const response = await get<{ count: number }>('/notifications/unread-count')
      if (response.success && response.data) {
        unreadCount.value = response.data.count
      }
    } catch (error) {
      console.error('Error fetching unread count:', error)
    }
  }

  async function markAsRead(id: number) {
    try {
      const response = await put(`/notifications/${id}/read`, {})
      if (response.success) {
        // Update local state
        const notification = notifications.value.find((n) => n.id === id)
        if (notification && !notification.read_at) {
          notification.read_at = new Date().toISOString()
          unreadCount.value = Math.max(0, unreadCount.value - 1)
        }
      }
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  async function markAllAsRead() {
    try {
      const response = await put('/notifications/read-all', {})
      if (response.success) {
        notifications.value.forEach((n) => (n.read_at = new Date().toISOString()))
        unreadCount.value = 0
      }
    } catch (error) {
      console.error('Error marking all as read:', error)
    }
  }

  async function fetchSettings() {
    try {
      const response = await get<NotificationSettings>('/notifications/settings')
      if (response.success && response.data) {
        settings.value = response.data
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
  }

  async function updateSettings(newSettings: Partial<NotificationSettings>) {
    try {
      const response = await put<NotificationSettings>('/notifications/settings', newSettings)
      if (response.success && response.data) {
        settings.value = response.data
      }
    } catch (error) {
      console.error('Error updating settings:', error)
    }
  }

  async function generateAlerts() {
    try {
      const response = await post<{ message: string }>('/notifications/generate-alerts', {})
      return response.success
    } catch (error) {
      console.error('Error generating alerts:', error)
      return false
    }
  }

  async function sendEmails() {
    try {
      const response = await post<{ message: string }>('/notifications/send-emails', {})
      return response.success
    } catch (error) {
      console.error('Error sending emails:', error)
      return false
    }
  }

  return {
    notifications,
    unreadCount,
    settings,
    loading,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead,
    fetchSettings,
    updateSettings,
    generateAlerts,
    sendEmails,
  }
})
