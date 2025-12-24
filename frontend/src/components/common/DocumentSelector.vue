<template>
  <div class="document-selector">
    <AutoComplete
      v-model="selectedDocument"
      :suggestions="filteredDocuments"
      @complete="searchDocuments"
      optionLabel="title"
      placeholder="Rechercher un document (titre, fichier...)"
      class="w-full"
      :delay="300"
      forceSelection
      @item-select="onSelect"
      dropdown
    >
      <template #option="slotProps">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 flex items-center justify-center bg-gray-100 rounded text-gray-500">
            <font-awesome-icon :icon="getFileIcon(slotProps.option.filename)" />
          </div>
          <div class="flex flex-col">
            <span class="font-medium">{{ slotProps.option.title }}</span>
            <span class="text-xs text-gray-500"
              >{{ slotProps.option.filename }} ({{ slotProps.option.version }})</span
            >
          </div>
        </div>
      </template>
    </AutoComplete>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AutoComplete from 'primevue/autocomplete'
import { useApi } from '@/composables/useApi'
import type { Document } from '@/stores/app' // Adjust import path if needed

const emit = defineEmits<{
  (e: 'select', document: Document): void
}>()

const { get } = useApi()
const selectedDocument = ref<Document | null>(null)
const filteredDocuments = ref<Document[]>([])

const searchDocuments = async (event: { query: string }) => {
  try {
    const response = await get<any>(`/documents?search=${event.query}&limit=10`)
    if (response.success && response.data) {
      const data = response.data.data ? response.data.data : response.data
      filteredDocuments.value = data
    }
  } catch (error) {
    console.error('Search failed', error)
    filteredDocuments.value = []
  }
}

const onSelect = (event: { value: Document }) => {
  emit('select', event.value)
  // Optional: clear selection if we want to allow multiple adds sequentially without clearing manually
  // selectedDocument.value = null
}

const getFileIcon = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'pdf':
      return ['fas', 'file-pdf']
    case 'doc':
    case 'docx':
      return ['fas', 'file-word']
    case 'xls':
    case 'xlsx':
      return ['fas', 'file-excel']
    case 'jpg':
    case 'jpeg':
    case 'png':
      return ['fas', 'file-image']
    default:
      return ['fas', 'file']
  }
}
</script>
