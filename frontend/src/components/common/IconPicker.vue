<template>
  <div class="icon-picker">
    <div
      ref="triggerRef"
      class="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50"
      @click="toggleOverlay"
      :class="{ 'border-blue-500 ring-2 ring-blue-200': isOpen }"
    >
      <div class="w-8 h-8 flex items-center justify-center bg-gray-100 rounded text-gray-600">
        <font-awesome-icon :icon="modelValue || 'circle-question'" />
      </div>
      <span class="flex-1 text-gray-700">{{ modelValue || 'Sélectionner une icône' }}</span>
      <i class="pi pi-chevron-down text-gray-400"></i>
    </div>

    <Teleport to="body">
      <div v-if="isOpen">
        <!-- Backdrop -->
        <div class="fixed inset-0 z-[9998]" @click="closeOverlay"></div>

        <!-- Dropdown -->
        <div
          class="fixed z-[9999] bg-white border rounded shadow-lg p-3 max-h-60 overflow-y-auto"
          :style="dropdownStyle"
        >
          <div class="mb-3">
            <span class="p-input-icon-left w-full">
              <i class="pi pi-search" />
              <InputText
                v-model="searchQuery"
                placeholder="Rechercher..."
                class="w-full p-inputtext-sm"
                autofocus
              />
            </span>
          </div>

          <div class="grid grid-cols-5 gap-2">
            <div
              v-for="icon in filteredIcons"
              :key="icon"
              class="aspect-square flex items-center justify-center rounded cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors"
              :class="{ 'bg-blue-100 text-blue-600 ring-2 ring-blue-300': modelValue === icon }"
              @click="selectIcon(icon)"
              :title="icon"
            >
              <font-awesome-icon :icon="icon" />
            </div>
          </div>

          <div v-if="filteredIcons.length === 0" class="text-center py-4 text-gray-500 text-sm">
            Aucune icône trouvée
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onUnmounted } from 'vue'
import InputText from 'primevue/inputtext'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const searchQuery = ref('')
const triggerRef = ref<HTMLElement | null>(null)
const dropdownStyle = ref({})

// Common icons list - can be expanded
const icons = [
  'folder',
  'folder-open',
  'file',
  'file-alt',
  'clipboard',
  'clipboard-list',
  'clipboard-check',
  'check',
  'check-circle',
  'check-double',
  'times',
  'times-circle',
  'exclamation',
  'exclamation-circle',
  'exclamation-triangle',
  'info',
  'info-circle',
  'question',
  'question-circle',
  'user',
  'user-circle',
  'users',
  'user-plus',
  'user-check',
  'user-tie',
  'user-graduate',
  'graduation-cap',
  'book',
  'book-open',
  'bookmark',
  'calendar',
  'calendar-alt',
  'calendar-check',
  'calendar-plus',
  'clock',
  'building',
  'home',
  'industry',
  'warehouse',
  'cog',
  'cogs',
  'tools',
  'wrench',
  'hammer',
  'chart-bar',
  'chart-line',
  'chart-pie',
  'chart-area',
  'eye',
  'eye-slash',
  'search',
  'filter',
  'sort',
  'lock',
  'lock-open',
  'key',
  'shield-alt',
  'envelope',
  'paper-plane',
  'inbox',
  'phone',
  'mobile-alt',
  'map-marker-alt',
  'globe',
  'flag',
  'star',
  'heart',
  'thumbs-up',
  'thumbs-down',
  'trash',
  'trash-alt',
  'edit',
  'pen',
  'pencil-alt',
  'save',
  'download',
  'upload',
  'cloud',
  'link',
  'unlink',
  'external-link-alt',
  'list',
  'list-ul',
  'list-ol',
  'th',
  'th-large',
  'th-list',
  'arrow-right',
  'arrow-left',
  'arrow-up',
  'arrow-down',
  'sync',
  'sync-alt',
  'redo',
  'undo',
  'plus',
  'plus-circle',
  'minus',
  'minus-circle',
  'medkit',
  'first-aid',
  'heartbeat',
  'stethoscope',
  'hard-hat',
  'fire-extinguisher',
  'biohazard',
]

const filteredIcons = computed(() => {
  if (!searchQuery.value) return icons
  const query = searchQuery.value.toLowerCase()
  return icons.filter((icon) => icon.toLowerCase().includes(query))
})

const updatePosition = () => {
  if (triggerRef.value && isOpen.value) {
    const rect = triggerRef.value.getBoundingClientRect()
    dropdownStyle.value = {
      top: `${rect.bottom + 5}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
    }
  }
}

const toggleOverlay = async () => {
  if (isOpen.value) {
    closeOverlay()
  } else {
    isOpen.value = true
    searchQuery.value = ''
    await nextTick()
    updatePosition()
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)
  }
}

const closeOverlay = () => {
  isOpen.value = false
  window.removeEventListener('scroll', updatePosition, true)
  window.removeEventListener('resize', updatePosition)
}

const selectIcon = (icon: string) => {
  emit('update:modelValue', icon)
  closeOverlay()
}

onUnmounted(() => {
  window.removeEventListener('scroll', updatePosition, true)
  window.removeEventListener('resize', updatePosition)
})
</script>
