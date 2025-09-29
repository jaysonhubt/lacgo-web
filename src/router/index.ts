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
  routes
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
  
  // Initialize auth state only once
  if (!authStore.isInitialized) {
    await authStore.initializeAuth()
  }
  
  // Check if route is guest route (login, register, forgot password)
  const isGuestRoute = to.meta.layout === 'guest'
  
  if (isGuestRoute) {
    // Route is for guests only (login, register, etc.)
    if (authStore.isAuthenticated) {
      // User is already authenticated, redirect to requested route or home
      const redirectTo = to.query.redirect as string || '/'
      // Avoid redirect loop by checking if redirectTo is different from current path
      if (redirectTo !== to.path) {
        next(redirectTo)
      } else {
        next('/')
      }
    } else {
      // User is not authenticated, allow access to auth pages
      next()
    }
  } else {
    // All other routes require authentication
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
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
