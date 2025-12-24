<template>
  <div class="icon-picker">
    <div
      class="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
      @click="visible = true"
      :class="{ 'border-primary-500 ring-2 ring-primary-200 dark:ring-primary-900/50': visible }"
    >
      <div
        class="w-8 h-8 flex items-center justify-center bg-surface-100 dark:bg-surface-700 rounded text-color-secondary"
      >
        <font-awesome-icon :icon="modelValue || 'circle-question'" />
      </div>
      <span class="flex-1 text-color-secondary">{{ modelValue || 'Sélectionner une icône' }}</span>
      <i class="pi pi-chevron-down text-color-secondary"></i>
    </div>

    <Dialog
      v-model:visible="visible"
      modal
      header="Choisir une icône"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div class="flex flex-col gap-4">
        <span class="p-input-icon-left w-full">
          <i class="pi pi-search" />
          <InputText
            v-model="searchQuery"
            placeholder="Rechercher une icône..."
            class="w-full"
            autofocus
          />
        </span>

        <div class="h-[30rem] overflow-y-auto custom-scrollbar p-1">
          <div v-if="filteredIcons.length === 0" class="text-center py-8 text-color-secondary">
            <p>Aucune icône trouvée pour "{{ searchQuery }}"</p>
          </div>

          <div v-else class="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
            <div
              v-for="icon in filteredIcons"
              :key="icon"
              class="aspect-square flex flex-col items-center justify-center rounded cursor-pointer hover:bg-surface-100 dark:hover:bg-surface-700 text-color transition-colors gap-1 p-1"
              :class="{
                'bg-primary-100 text-primary-700 dark:bg-primary-500/20 dark:text-primary-300 ring-2 ring-primary-200 dark:ring-primary-500/50':
                  modelValue === icon,
              }"
              @click="selectIcon(icon)"
              :title="icon"
            >
              <font-awesome-icon :icon="icon" class="text-xl" />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import InputText from 'primevue/inputtext'
import Dialog from 'primevue/dialog'

defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const visible = ref(false)
const searchQuery = ref('')

// Common icons list - can be expanded
const icons = [
  'folder',
  'folder-open',
  'file',
  'file-alt',
  'file-lines',
  'file-circle-check',
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
  'list-check',
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

const selectIcon = (icon: string) => {
  emit('update:modelValue', icon)
  visible.value = false
}
</script>
