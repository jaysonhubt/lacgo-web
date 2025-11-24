/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
//import { routes } from 'vue-router/auto-routes'
import { routes } from './routes'
import { authGuard, guestGuard } from './guards'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Use saved position for browser back/forward
    if (savedPosition) {
      return savedPosition
    }
    // Scroll to hash anchor if present
    if (to.hash) {
      return { el: to.hash }
    }
    // Default: scroll to top on navigation
    return { top: 0 }
  }
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

// Global navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Check if route is guest route (login, register, forgot password)
  const isGuestRoute = to.meta.layout === 'guest'
  
  // For guest routes, allow immediate access without auth check
  if (isGuestRoute) {
    next()
    return
  }
  
  // For protected routes, initialize and check auth
  if (!authStore.isInitialized) {
    await authStore.initializeAuth()
  }
  
  if (authStore.isAuthenticated) {
    // User is authenticated, allow access
    next()
  } else {
    // User is not authenticated, redirect to login
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
