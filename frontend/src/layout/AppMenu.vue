<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="i">
      <li v-if="item.separator" class="menu-separator"></li>

      <li v-else-if="item.header" class="menu-header">
        <span class="menu-header-text">{{ item.header }}</span>
      </li>

      <li v-else class="menu-item" :class="{ 'active-menuitem': isMenuItemActive(item) }">
        <router-link
          v-if="item.to"
          :to="item.to"
          class="menu-link"
          exact-active-class="active-route"
        >
          <font-awesome-icon :icon="item.icon" class="menu-icon" />
          <span class="menu-label">{{ item.label }}</span>
          <span v-if="item.badge" class="menu-badge">{{ item.badge }}</span>
        </router-link>

        <a v-else :href="item.url" class="menu-link" :target="item.target">
          <font-awesome-icon :icon="item.icon" class="menu-icon" />
          <span class="menu-label">{{ item.label }}</span>
        </a>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

interface MenuItem {
  label?: string
  icon?: string[]
  to?: string
  url?: string
  target?: string
  header?: string
  separator?: boolean
  badge?: string
}

const model = ref<MenuItem[]>([
  {
    header: 'PRINCIPAL',
  },
  {
    label: 'Tableau de bord',
    icon: ['fas', 'home'],
    to: '/',
  },
  {
    label: 'Planning',
    icon: ['fas', 'calendar-alt'],
    to: '/planning',
  },
  {
    header: 'GESTION',
  },
  {
    label: 'Indicateurs & KPI',
    icon: ['fas', 'chart-line'],
    to: '/indicators',
  },
  {
    label: 'Équipements & EPI',
    icon: ['fas', 'tools'],
    to: '/equipment',
  },
  {
    label: "Plans d'action",
    icon: ['fas', 'tasks'],
    to: '/actions',
  },
  {
    label: 'Documents',
    icon: ['fas', 'file-alt'],
    to: '/documents',
  },
  {
    label: 'Formations',
    icon: ['fas', 'graduation-cap'],
    to: '/trainings',
  },
  {
    header: 'ADMINISTRATION',
  },
  {
    label: 'Utilisateurs',
    icon: ['fas', 'users'],
    to: '/users',
  },
  {
    label: 'Paramètres',
    icon: ['fas', 'cog'],
    to: '/settings',
  },
])

const isMenuItemActive = (item: MenuItem) => {
  return item.to ? route.path === item.to : false
}
</script>

<style scoped>
.layout-menu {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.menu-separator {
  border-top: 1px solid var(--surface-border);
  margin: 0.5rem 0;
}

.menu-header {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  padding: 0 1rem;
  font-weight: 600;
  color: var(--text-color-secondary);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.menu-header:first-child {
  margin-top: 0;
}

.menu-item {
  margin: 0.25rem 0;
}

.menu-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: var(--text-color);
  border-radius: 8px;
  transition:
    background-color 0.2s,
    color 0.2s;
  text-decoration: none;
  font-weight: 500;
}

.menu-link:hover {
  background-color: var(--surface-hover);
  color: var(--text-color);
}

.active-route {
  background-color: var(--primary-50);
  color: var(--primary-600);
  font-weight: 600;
}

.dark .active-route {
  background-color: rgba(var(--primary-500-rgb), 0.15);
  color: var(--primary-400);
}

.menu-icon {
  margin-right: 0.75rem;
  width: 1.25rem;
  text-align: center;
}

.menu-label {
  flex: 1;
}

.menu-badge {
  background-color: var(--primary-500);
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  min-width: 1.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  border-radius: 50%;
  text-align: center;
  padding: 0 0.25rem;
}
</style>
