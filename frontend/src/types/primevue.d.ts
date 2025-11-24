import 'primevue/toast'
import 'primevue/usetoast'

declare module 'primevue/toast' {
  export interface ToastMessageOptions {
    icon?: string
  }
}

declare module 'primevue/usetoast' {
  export interface ToastMessageOptions {
    icon?: string
  }
}
