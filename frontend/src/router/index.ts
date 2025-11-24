import { createRouter, createWebHistory } from 'vue-router'
// import HomePage from '../pages/HomePage.vue'
import AppLayout from '@/layout/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/pages/HomePage.vue'),
        },
        {
          path: '/documents',
          name: 'documents',
          component: () => import('../pages/documents/DocumentIndex.vue'),
        },
        {
          path: '/documents/create',
          name: 'document-create',
          component: () => import('../pages/documents/DocumentCreate.vue'),
        },
        {
          path: '/documents/:id/edit',
          name: 'document-edit',
          component: () => import('../pages/documents/DocumentEdit.vue'),
          props: true,
        },
        {
          path: '/actions',
          name: 'actions',
          component: () => import('../pages/actions/ActionIndex.vue'),
        },
        {
          path: '/actions/config',
          name: 'actions-config',
          component: () => import('@/pages/actions/ActionConfig.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/actions/:id',
          name: 'action-detail',
          component: () => import('@/pages/actions/ActionDetail.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/actions/create',
          name: 'action-create',
          component: () => import('../pages/actions/ActionCreate.vue'),
        },
        {
          path: '/actions/:id/edit',
          name: 'action-edit',
          component: () => import('../pages/actions/ActionEdit.vue'),
          props: true,
        },
        {
          path: '/indicators',
          name: 'indicators',
          component: () => import('../pages/indicateurs/IndicateurIndex.vue'),
        },
        {
          path: '/indicators/config',
          name: 'indicators-config',
          component: () => import('@/pages/indicateurs/IndicateurConfig.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/indicators/:id',
          name: 'indicator-detail',
          component: () => import('@/pages/indicateurs/IndicateurDetail.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/indicators/create',
          name: 'indicator-create',
          component: () => import('../pages/indicateurs/IndicateurCreate.vue'),
        },
        {
          path: '/indicators/:id/edit',
          name: 'indicator-edit',
          component: () => import('../pages/indicateurs/IndicateurEdit.vue'),
          props: true,
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('../pages/users/UserIndex.vue'),
          meta: { requiresAuth: true, roles: ['admin'] },
        },
        {
          path: '/users/create',
          name: 'user-create',
          component: () => import('../pages/users/UserEdit.vue'),
          meta: { requiresAuth: true, roles: ['admin'] },
        },
        {
          path: '/users/:id/edit',
          name: 'user-edit',
          component: () => import('../pages/users/UserEdit.vue'),
          props: true,
          meta: { requiresAuth: true, roles: ['admin'] },
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('../pages/profile/ProfilePage.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/settings',
          name: 'settings',
          component: () => import('../pages/settings/SettingsPage.vue'),
          meta: { requiresAuth: true, roles: ['admin'] },
        },
        {
          path: '/trainings',
          name: 'trainings',
          component: () => import('../pages/trainings/TrainingDashboard.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/trainings/catalog',
          name: 'trainings-catalog',
          component: () => import('../pages/trainings/TrainingCatalog.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/trainings/sessions',
          name: 'trainings-sessions',
          component: () => import('../pages/trainings/TrainingSessionList.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/trainings/sessions/:id',
          name: 'training-session-detail',
          component: () => import('../pages/trainings/TrainingSessionDetail.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      // Utilisation d'un import dynamique pour le code splitting
      component: () => import('../pages/LoginPage.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('token')

  // Récupérer l'utilisateur depuis le localStorage si disponible (pour une vérification rapide)
  // Note: Une vérification plus robuste se ferait via le store ou une requête API
  // Mais ici on suppose que le store est hydraté ou que l'info est stockée
  // Pour l'instant, on va essayer de récupérer le rôle depuis le store s'il est initialisé
  // ou décoder le token si c'était un JWT (mais c'est un opaque token)
  // On va donc se baser sur une info stockée ou laisser passer et gérer l'erreur 403 API

  // Amélioration: On pourrait stocker le rôle dans le localStorage au login
  const userRole = localStorage.getItem('user_role')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  if (loggedIn && to.meta.roles && Array.isArray(to.meta.roles)) {
    // Si on n'a pas le rôle dans le localStorage, on laisse passer (le backend bloquera)
    // Ou on redirige vers l'accueil par défaut
    if (userRole && !to.meta.roles.includes(userRole)) {
      return next('/')
    }
  }

  next()
})

export default router
