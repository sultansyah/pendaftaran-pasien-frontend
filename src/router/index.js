import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import { useAuthStore } from '@/stores/auth'
import NotFound from '@/views/NotFound.vue'
import { dashboards } from './dashboard'
import QueueTodayView from '@/views/QueueTodayView.vue'
import ViewQueueRegister from '@/views/ViewQueueRegister.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/queue-today',
    name: 'queue-today',
    component: QueueTodayView,
  },
  {
    path: '/view-queue-register/:registerId',
    name: 'view-queue-register',
    component: ViewQueueRegister,
    meta: { layout: false },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/notfound',
    name: 'notfound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes.concat(dashboards),
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (to.name == "view-queue-register") {
    next()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.matched.length === 0) {
    next('/notfound')
  } else if (!to.meta.requiresAuth && authStore.isAuthenticated && to.name !== 'notfound') {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
