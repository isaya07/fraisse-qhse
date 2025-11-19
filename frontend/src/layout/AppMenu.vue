<template>
  <PanelMenu :model="items" class="w-full border-0 bg-transparent" :pt="customPanelMenuPT" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import PanelMenu from 'primevue/panelmenu'

import { useRouter } from 'vue-router'

// 1. Définir l'objet de configuration PT
const customPanelMenuPT = {
  // Cible chaque panneau pour supprimer sa bordure et son ombre
  panel: {
    class: 'border-none shadow-none mb-0',
  },
  // Cible l'en-tête pour supprimer sa bordure inférieure
  header: {
    class: 'border-none',
  },
  // Cible le contenu de l'en-tête pour un espacement vertical réduit
  headerContent: {
    class: 'py-0', // Padding interne pour l'esthétique
  },
  // Cible le conteneur du sous-menu pour supprimer tout espacement
  toggleableContent: {
    class: 'p-0', // Supprime tout le padding
  },
  // Cible la liste <ul> pour appliquer un espacement entre les éléments
  root: {
    class: 'gap-0 p-0', // Utilise flexbox et gap pour l'espacement
  },
  // Cible le contenu de chaque élément de menu pour un espacement compact
  content: {
    class: 'py-0', // Padding interne pour l'esthétique
  },
}

const router = useRouter()

const items = ref([
  {
    label: 'Accueil',
    command: () => {
      router.push('/')
    },
  },
  {
    label: 'Indicateurs',
    command: () => {
      router.push('/indicators')
    },
  },
  {
    label: 'Actions',
    command: () => {
      router.push('/actions')
    },
  },
  {
    label: 'Documents',
    command: () => {
      router.push('/documents')
    },
  },
  {
    label: 'Profil',
    command: () => {
      router.push('/profile')
    },
  },
  {
    label: 'Utilisateurs',
    command: () => {
      router.push('/users')
    },
  },
  {
    label: 'Paramètres',
    command: () => {
      router.push('/settings')
    },
  },
])
</script>
