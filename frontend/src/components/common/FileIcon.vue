<template>
  <div class="flex items-center justify-center shrink-0" :class="containerClass">
    <font-awesome-icon :icon="icon" :class="iconClass" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  filename?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}>()

const getFileExt = (filename: string) => {
  return filename?.split('.').pop()?.toLowerCase() || ''
}

const icon = computed(() => {
  const ext = getFileExt(props.filename || '')
  switch (ext) {
    case 'pdf':
      return 'file-pdf'
    case 'doc':
    case 'docx':
      return 'file-word'
    case 'xls':
    case 'xlsx':
      return 'file-excel'
    case 'ppt':
    case 'pptx':
      return 'file-powerpoint'
    case 'jpg':
    case 'png':
    case 'jpeg':
    case 'gif':
    case 'webp':
      return 'image'
    case 'zip':
    case 'rar':
      return 'file-zipper'
    case 'txt':
      return 'file-lines'
    default:
      return 'file'
  }
})

const iconClass = computed(() => {
  const ext = getFileExt(props.filename || '')
  const base = 'transition-colors '

  let color = 'text-gray-500'
  switch (ext) {
    case 'pdf':
      color = 'text-red-500'
      break
    case 'doc':
    case 'docx':
      color = 'text-blue-500'
      break
    case 'xls':
    case 'xlsx':
      color = 'text-green-500'
      break
    case 'ppt':
    case 'pptx':
      color = 'text-orange-500'
      break
    case 'jpg':
    case 'png':
    case 'jpeg':
    case 'gif':
      color = 'text-purple-500'
      break
    case 'zip':
    case 'rar':
      color = 'text-yellow-600'
      break
  }

  // Size classes for the FontAwesome icon
  let sizeClass = ''
  switch (props.size) {
    case 'sm':
      sizeClass = 'text-sm'
      break // 14px
    case 'md':
      sizeClass = 'text-xl'
      break // 20px
    case 'lg':
      sizeClass = 'text-4xl'
      break // 36px
    case 'xl':
      sizeClass = 'text-6xl'
      break // 60px
    default:
      sizeClass = 'text-xl'
  }

  return `${base} ${color} ${sizeClass}`
})

const containerClass = computed(() => {
  // Optional: Add background shapes or sizing for the container if needed
  // For now, it's just a flex wrapper
  return ''
})
</script>
