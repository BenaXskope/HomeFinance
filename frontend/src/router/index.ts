import { createRouter, createWebHistory } from 'vue-router'
import { checkUserAuth } from '@/api/auth/auth'

const routes = [
  { path: '/login', name: 'login', component: () => import('@views/AuthPage.vue'), meta: { noLayout: true } },
  { path: '/', name: 'new-record', component: () => import('@/views/NewRecordPage.vue') },
  { path: '/category', name: 'category', component: () => import('@views/CategoryPage.vue') },
  { path: '/history', name: 'history', component: () => import('@views/HistoryPage.vue') },
  { path: '/currencies', name: 'currencies', component: () => import('@views/CurrenciesPage.vue') },
  { path: '/planning', name: 'planning', component: () => import('@views/PlanningPage.vue') },
  { path: '/planning/:id', name: 'category-details', component: () => import('@views/CategoryHistoryPage.vue') },
  { path: '/report', name: 'report', component: () => import('@views/ReportPage.vue') },
  { path: '/help', name: 'help', component: () => import('@views/HelpPage.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async(to) => {
  if (to.name !== 'login') {
    const isAuthenticated = await checkUserAuth()
    if (isAuthenticated.isLeft()) {
      return {
        name: 'login',
      }
    }
  }
})

export default router
