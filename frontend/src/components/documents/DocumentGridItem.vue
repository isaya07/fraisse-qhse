<template>
  <div
    class="group relative flex flex-col bg-surface-0 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg p-3 hover:shadow-md transition-all cursor-pointer h-full"
    @click="$emit('click')"
  >
    <!-- Selection Checkbox (Optional future feature, placeholder) 
    <div class="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
       <Checkbox :binary="true" @click.stop /> 
    </div>
    -->

    <!-- Actions Menu Button -->
    <div class="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
      <Button
        icon="pi pi-ellipsis-v"
        text
        rounded
        size="small"
        class="bg-surface-0/50 dark:bg-surface-900/50 backdrop-blur-sm h-8 w-8 hover:bg-surface-200"
        @click.stop="toggleMenu"
      >
        <template #icon>
          <font-awesome-icon icon="ellipsis-vertical" />
        </template>
      </Button>
      <Menu ref="menu" :model="menuItems" :popup="true" />
    </div>

    <!-- Icon Area -->
    <div
      class="flex-1 flex items-center justify-center py-6 bg-surface-50 dark:bg-surface-900/50 rounded-md mb-3 group-hover:bg-surface-100 dark:group-hover:bg-surface-800 transition-colors"
    >
      <FileIcon :filename="document.filename" size="xl" />
    </div>

    <!-- Info Area -->
    <div class="flex flex-col gap-1">
      <div class="flex items-start justify-between gap-2">
        <h3
          class="text-sm font-semibold text-color m-0 line-clamp-2 leading-tight"
          :title="document.title"
        >
          {{ document.title }}
        </h3>
      </div>

      <div class="flex items-center justify-between mt-1">
        <span class="text-xs text-color-secondary">{{ document.version }}</span>
        <Tag
          :value="getStatusLabel(document.status)"
          :severity="getStatusSeverity(document.status)"
          class="text-[10px] px-1 py-0 h-5"
        />
      </div>

      <div class="flex items-center justify-between text-xs text-color-secondary mt-2">
        <span>{{ formatDate(document.updated_at) }}</span>
        <span>{{ formatFileSize(document.file_size) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Document } from '@/stores/app'
import FileIcon from '@/components/common/FileIcon.vue'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import Menu from 'primevue/menu'

const props = defineProps<{
  document: Document
}>()

const emit = defineEmits(['click', 'edit', 'download', 'delete', 'view'])

const menu = ref()

const menuItems = computed(() => [
  {
    label: 'Voir',
    icon: 'pi pi-eye',
    command: () => emit('view', props.document),
  },
  {
    label: 'Télécharger',
    icon: 'pi pi-download',
    command: () => emit('download', props.document),
  },
  {
    label: 'Modifier',
    icon: 'pi pi-pencil',
    command: () => emit('edit', props.document),
  },
  {
    separator: true,
  },
  {
    label: 'Supprimer',
    icon: 'pi pi-trash',
    class: 'text-red-500',
    command: () => emit('delete', props.document),
  },
])

const toggleMenu = (event: Event) => {
  menu.value.toggle(event)
}

// Helpers (duplicated for now, could be in a composable)
const getStatusLabel = (value: string) => {
  const map: Record<string, string> = {
    draft: 'Brouillon',
    pending_approval: 'En attente',
    approved: 'Approuvé',
    rejected: 'Rejeté',
    archived: 'Archivé',
  }
  return map[value] || value
}

const getStatusSeverity = (value: string): string => {
  const map: Record<string, string> = {
    draft: 'secondary',
    pending_approval: 'warn',
    approved: 'success',
    rejected: 'danger',
    archived: 'contrast',
  }
  return map[value] || 'secondary'
}

const formatDate = (dateString: string) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const formatFileSize = (bytes: number | undefined) => {
  if (bytes === undefined) return '-'
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(0)) + ' ' + sizes[i]
}
</script>
