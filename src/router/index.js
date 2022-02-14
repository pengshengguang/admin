import { createRouter, createWebHistory } from 'vue-router'

/**
 * 公开路由表
 */
const publicRouters = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    component: () => import('@/layout/index')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: publicRouters
})

export default router
