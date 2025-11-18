<template>
  <div id="app" class="app-container">
    <LayoutDefault>
      <router-view />
    </LayoutDefault>
  </div>
</template>

<script setup lang="ts">
import LayoutDefault from './layout/LayoutDefault.vue'
</script>
