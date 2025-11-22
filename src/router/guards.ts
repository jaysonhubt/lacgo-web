import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Auth guard for protected routes
export const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()

  // Check if user is authenticated
  const isAuthenticated = await authStore.checkAuth()

  if (isAuthenticated) {
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

// Guest guard for auth pages (login, register, forgot password)
export const guestGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()

  // Check if user is authenticated
  const isAuthenticated = await authStore.checkAuth()

  if (isAuthenticated) {
    // User is already authenticated, redirect to requested route or home
    const redirectTo = to.query.redirect as string || '/'
    next(redirectTo)
  } else {
    // User is not authenticated, allow access to auth pages
    next()
  }
}

// Admin guard for admin-only routes
export const adminGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()

  // Check if user is authenticated
  const isAuthenticated = await authStore.checkAuth()

  if (!isAuthenticated) {
    // User is not authenticated, redirect to login
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
    return
  }

  // Check if user is admin (you can add role checking here)
  const user = authStore.user
  if (user && user.type === '5') {
    // User is admin (type=5), allow access
    next()
  } else {
    // User is not admin, redirect to home or show error
    next({ path: '/' })
  }
}
