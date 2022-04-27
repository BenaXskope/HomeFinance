import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/views/NewRecordPage.vue') },
  { path: '/test', component: () => import('@views/TestPage.vue') },
  { path: '/login', component: () => import('@views/AuthPage.vue'), noLayout: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
