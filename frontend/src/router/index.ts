import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/login', component: () => import('@views/AuthPage.vue'), meta: { noLayout: true } },
  { path: '/', component: () => import('@/views/NewRecordPage.vue') },
  { path: '/category', component: () => import('@views/CategoryPage.vue') },
  { path: '/history', component: () => import('@views/HistoryPage.vue') },
  { path: '/currencies', component: () => import('@views/CurrenciesPage.vue') },
  { path: '/planning', component: () => import('@views/PlanningPage.vue') },
  { path: '/planning/:id', name: 'category-details', component: () => import('@views/CategoryHistoryPage.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
