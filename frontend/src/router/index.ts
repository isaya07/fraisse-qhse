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

export default router
