<template>
  <HeaderLayout />
  <div class="columns is-gapless">
    <div class="column is-3">
      <SidebarMenu />
    </div>
    <div class="column is-9">
      <div class="container is-fluid">
        <section class="section">
          <slot />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderLayout from '../components/layout/HeaderLayout.vue'
import SidebarMenu from '../components/layout/SidebarMenu.vue'
</script>
