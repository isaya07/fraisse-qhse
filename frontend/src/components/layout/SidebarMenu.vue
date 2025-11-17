<template>
  <aside class="menu is-hidden-mobile is-primary" :class="{ 'is-active': isOpen }">
    <ul class="menu-list">
      <li>
        <router-link to="/" class="menu-item">
          <font-awesome-icon :icon="['fas', 'home']" class="menu-icon mr-2" />
          <span>Accueil</span>
        </router-link>
      </li>
      <li>
        <router-link to="/indicators" class="menu-item">
          <font-awesome-icon :icon="['fas', 'chart-line']" class="menu-icon mr-2" />
          <span>Indicateurs</span>
        </router-link>
      </li>
      <li>
        <router-link to="/actions" class="menu-item">
          <font-awesome-icon :icon="['fas', 'tasks']" class="menu-icon mr-2" />
          <span>Actions</span>
        </router-link>
      </li>
      <li>
        <router-link to="/documents" class="menu-item">
          <font-awesome-icon :icon="['fas', 'file-alt']" class="menu-icon mr-2" />
          <span>Documents</span>
        </router-link>
      </li>
      <li>
        <router-link to="/profile" class="menu-item">
          <font-awesome-icon :icon="['fas', 'user']" class="menu-icon mr-2" />
          <span>Profil</span>
        </router-link>
      </li>
    </ul>
  </aside>

  <div class="sidebar-overlay" :class="{ 'is-active': isOpen }" @click="toggleSidebar"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

// Fermer le menu quand la fenêtre est redimensionnée (pour les vues mobiles)
const handleResize = () => {
  if (window.innerWidth >= 1024) {
    // Taille de tablette et plus
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.menu.is-active {
  transform: translateX(0);
}
</style>
