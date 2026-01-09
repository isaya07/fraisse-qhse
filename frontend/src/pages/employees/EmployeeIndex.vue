<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Personnel</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Gestion des fiches salariés (Formations, EPI, Documents)
        </p>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="w-full sm:w-1/3 relative">
        <font-awesome-icon
          :icon="['fas', 'search']"
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          v-model="filters.search"
          type="text"
          placeholder="Rechercher un salarié..."
          class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>
    </div>

    <!-- Content -->
    <div v-if="employeeStore.loading" class="flex justify-center py-12">
      <font-awesome-icon :icon="['fas', 'circle-notch']" spin class="text-4xl text-blue-500" />
    </div>

    <div
      v-else-if="employeeStore.error"
      class="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg"
    >
      {{ employeeStore.error }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="employee in employeeStore.employees"
        :key="employee.id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer group"
        @click="$router.push(`/employees/${employee.id}`)"
      >
        <div class="p-6">
          <div class="flex items-center gap-4">
            <div class="relative">
              <Avatar
                :label="getInitials(employee)"
                class="mr-2"
                size="large"
                shape="circle"
                :style="{ backgroundColor: stringToColor(employee.username), color: '#ffffff' }"
              />
            </div>
            <div>
              <h3
                class="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
              >
                {{ employee.first_name }} {{ employee.last_name }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ employee.username }}</p>
            </div>
          </div>

          <div
            class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-sm text-gray-500"
          >
            <span>{{ employee.role }}</span>
            <font-awesome-icon
              :icon="['fas', 'chevron-right']"
              class="text-gray-300 group-hover:text-blue-500 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div
      v-if="!employeeStore.loading && employeeStore.employees.length > 0"
      class="flex justify-center mt-6"
    >
      <!-- Simplified pagination usage -->
      <Paginator
        :rows="employeeStore.pagination.limit"
        :totalRecords="employeeStore.pagination.total"
        :first="(employeeStore.pagination.page - 1) * employeeStore.pagination.limit"
        @page="onPageChange"
      ></Paginator>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useEmployeeStore } from '@/stores/employees'
import { useDebounceFn } from '@vueuse/core'
import Avatar from 'primevue/avatar'
import Paginator from 'primevue/paginator'

const employeeStore = useEmployeeStore()

const filters = ref({
  search: '',
})

const getInitials = (user: any) => {
  if (user.first_name && user.last_name) {
    return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
  }
  return user.username.substring(0, 2).toUpperCase()
}

// Simple consistent color generation from string
const stringToColor = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const c = (hash & 0x00ffffff).toString(16).toUpperCase()
  return '#' + '00000'.substring(0, 6 - c.length) + c
}

const fetchEmployees = async () => {
  await employeeStore.fetchEmployees(1, 15, filters.value)
}

const debouncedSearch = useDebounceFn(() => {
  fetchEmployees()
}, 300)

watch(() => filters.value.search, debouncedSearch)

const onPageChange = (event: any) => {
  const page = event.page + 1
  employeeStore.fetchEmployees(page, 15, filters.value)
}

onMounted(() => {
  fetchEmployees()
})
</script>
