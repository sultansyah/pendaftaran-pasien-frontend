import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import { useAuthStore } from '@/stores/auth'
import NotFound from '@/views/NotFound.vue'
import QueueView from '@/views/QueueView.vue'
import VerifikasiLamaAtauBaruView from '@/views/VerifikasiLamaAtauBaruView.vue'

let routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
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
    path: '/queue',
    name: 'queue',
    component: QueueView,
  },
  {
    path: '/verification-patient',
    name: 'verification-patient',
    component: VerifikasiLamaAtauBaruView,
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
  routes: routes,
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
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
