import { computed, reactive } from 'vue'
import { useAppStore } from '@/stores/app'

const layoutConfig = reactive({
  preset: 'Aura',
  surface: null,
  darkTheme: false,
  menuMode: 'static',
})

interface LayoutState {
  staticMenuDesktopInactive: boolean
  overlayMenuActive: boolean
  profileSidebarVisible: boolean
  configSidebarVisible: boolean
  staticMenuMobileActive: boolean
  menuHoverActive: boolean
  activeMenuItem: unknown
}

const layoutState = reactive<LayoutState>({
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  profileSidebarVisible: false,
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false,
  activeMenuItem: null,
})

export function useLayout() {
  const appStore = useAppStore()

  const setActiveMenuItem = (item: { value?: unknown } | unknown) => {
    layoutState.activeMenuItem = (item as { value?: unknown }).value ?? item
  }

  const toggleDarkMode = () => {
    if (!document.startViewTransition) {
      //executeDarkModeToggle()
      appStore.toggleTheme()
      return
    }

    document.startViewTransition(() => executeDarkModeToggle())
  }

  const executeDarkModeToggle = () => {
    layoutConfig.darkTheme = !layoutConfig.darkTheme
    document.documentElement.classList.toggle('app-dark')
  }

  const toggleMenu = () => {
    if (layoutConfig.menuMode === 'overlay') {
      layoutState.overlayMenuActive = !layoutState.overlayMenuActive
    }

    if (window.innerWidth > 991) {
      layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive
    } else {
      layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive
    }
  }

  const isSidebarActive = computed(
    () => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive,
  )

  const isDarkTheme = computed(() => layoutConfig.darkTheme)

  return {
    layoutConfig,
    layoutState,
    toggleMenu,
    isSidebarActive,
    isDarkTheme,
    setActiveMenuItem,
    toggleDarkMode,
  }
}
