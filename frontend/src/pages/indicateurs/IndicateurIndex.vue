<template>
  <div class="p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <h2>Tableau de bord Indicateurs</h2>
      <div class="flex gap-2 items-center">
        <IconField iconPosition="left">
          <InputIcon>
            <font-awesome-icon icon="magnifying-glass" />
          </InputIcon>
          <InputText v-model="searchQuery" placeholder="Rechercher..." class="w-full md:w-64" />
        </IconField>
        <Button label="Configuration" @click="goToConfig" severity="secondary" variant="outlined">
          <template #icon>
            <font-awesome-icon icon="cog" class="mr-2" />
          </template>
        </Button>
        <Button label="Nouvel indicateur" @click="createNewIndicator" severity="primary">
          <template #icon>
            <font-awesome-icon icon="plus" class="mr-2" />
          </template>
        </Button>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-12">
      <font-awesome-icon :icon="['fas', 'spinner']" spin size="2x" class="text-gray-500" />
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <IndicatorCard
        v-for="indicator in indicators"
        :key="indicator.id"
        :indicator="indicator"
        @view="viewIndicator"
        @edit="editIndicator"
      />
    </div>

    <div v-if="!loading && indicators.length === 0" class="text-center p-8 text-gray-500">
      Aucun indicateur trouvé. Commencez par en créer un.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useIndicatorStore } from '@/stores/indicators'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import IndicatorCard from '@/components/indicators/IndicatorCard.vue'

const router = useRouter()
const indicatorStore = useIndicatorStore()

const searchQuery = ref('')

const indicators = computed(() => indicatorStore.indicators)
const loading = computed(() => indicatorStore.loading)

const loadIndicators = async () => {
  // Fetch all indicators with search filter
  await indicatorStore.fetchIndicators(1, 100, { search: searchQuery.value })
}

// Simple debounce implementation
const debounce = (fn: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

// Debounce search to avoid too many requests
const debouncedSearch = debounce(() => {
  loadIndicators()
}, 300)

watch(searchQuery, () => {
  debouncedSearch()
})

const goToConfig = () => {
  router.push('/indicators/config')
}

const createNewIndicator = () => {
  router.push('/indicators/create')
}

const viewIndicator = (id: number) => {
  router.push(`/indicators/${id}`)
}

const editIndicator = (id: number) => {
  router.push(`/indicators/${id}/edit`)
}

onMounted(() => {
  loadIndicators()
})
</script>
