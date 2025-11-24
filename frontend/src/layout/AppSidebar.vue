<template>
  <div class="layout-sidebar">
    <app-menu></app-menu>
  </div>
</template>

<script setup lang="ts">
import AppMenu from './AppMenu.vue'
</script>

<style scoped>
.layout-sidebar {
  position: fixed;
  width: 300px;
  height: calc(100vh - 9rem);
  z-index: 999;
  overflow-y: auto;
  user-select: none;
  top: 6rem;
  left: 2rem;
  transition:
    transform 0.2s,
    left 0.2s;
  background-color: var(--surface-card);
  border-radius: var(--p-card-border-radius);
  padding: 1.5rem;
  box-shadow:
    0px 3px 5px rgba(0, 0, 0, 0.02),
    0px 0px 2px rgba(0, 0, 0, 0.05),
    0px 1px 4px rgba(0, 0, 0, 0.08);
}
</style>
