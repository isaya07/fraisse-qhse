<template>
  <HeaderLayout />
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside
      :class="[
        'bg-surface-0 dark:bg-surface-950 border-surface-200 dark:border-surface-800 border-r transition-[width] duration-300 ease-in-out',
        sidebarCollapsed ? 'w-16' : 'w-64',
      ]"
    >
      <SidebarMenu />
    </aside>
  </div>
  <main class="flex flex-1 flex-col container mx-auto">
    <section class="bg-surface-50 dark:bg-surface-950 flex-1 overflow-y-auto">
      <slot />
    </section>
  </main>
</template>

<script setup lang="ts">
import HeaderLayout from '../components/layout/HeaderLayout.vue'
import SidebarMenu from '../components/layout/SidebarMenu.vue'
</script>
