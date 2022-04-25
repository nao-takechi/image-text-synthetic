import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TopView from '../views/TopView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'top',
    component: TopView,
  },
  {
    path: '/frame',
    name: 'frame',
    component: () => import('../views/FrameView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
