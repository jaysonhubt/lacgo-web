import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/utils/api'

export interface User {
  id: number
  name: string
  phone: string
  dob?: string
  email: string
  facebook_id?: string
  google_id?: string
  apple_id?: string
  type?: string
  is_active: boolean
  points?: number
  created_at?: string
  updated_at?: string
}

export interface LoginCredentials {
  account: string
  password: string
}

export interface RegisterData {
  name: string
  phone: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
  dob?: string
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isInitialized = ref(false)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isGuest = computed(() => !isAuthenticated.value)

  // Actions
  const setUser = (userData: User) => {
    user.value = userData
  }

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const clearAuth = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    error.value = null
  }

  const setError = (errorMessage: string) => {
    error.value = errorMessage
  }

  const clearError = () => {
    error.value = null
  }

  // Login
  const login = async (credentials: LoginCredentials) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await api.post('/login', {
        account: credentials.account,
        password: credentials.password
      })
      console.log(response.data)

      if (response.data && response.data.user && response.data.token) {
        setUser(response.data.user)
        setToken(response.data.token)

        return { success: true, user: response.data.user }
      } else {
        alert(123)
        throw new Error('Đăng nhập thất bại')
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.'
      setError(errorMessage)
      alert(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      isLoading.value = false
    }
  }

  // Register
  const register = async (data: RegisterData) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await api.post('/register', {
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
        dob: data.dob
      })

      if (response.data.success && response.data.user && response.data.token) {
        setUser(response.data.user)
        setToken(response.data.token)

        return { success: true, user: response.data.user }
      } else {
        throw new Error('Đăng ký thất bại')
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Đăng ký thất bại. Vui lòng thử lại.'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      isLoading.value = false
    }
  }

  // Logout
  const logout = async () => {
    isLoading.value = true

    try {
      await api.post('/logout')
      console.log('Logout API succeeded')
    } catch (err: any) {
      console.warn('Logout API failed, but continuing with local logout:', err?.message || err)
    } finally {
      clearAuth()
      isLoading.value = false
      return { success: true }
    }
  }

  // Forgot Password
  const forgotPassword = async (account: string) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await api.post('/forgot-password', {
        account: account
      })

      if (response.data.success) {
        return { success: true, message: response.data.message || 'Email đã được gửi thành công' }
      } else {
        throw new Error(response.data.message || 'Gửi email thất bại')
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Gửi email thất bại. Vui lòng thử lại.'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      isLoading.value = false
    }
  }

  // Check if user is authenticated (for route guards)
  const checkAuth = async () => {
    if (!token.value) {
      return false
    }

    try {
      // Validate token with server
      const response = await api.get('/user')

      if (response.data && response.data.user) {
        // Update user data from server
        setUser(response.data.user)
        return true
      } else {
        // Token is invalid
        clearAuth()
        console.log(194)
        return false
      }
    } catch (err) {
      // Token is invalid or network error, clear auth
      clearAuth()
      console.log(199)
      return false
    }
  }

  // Initialize auth state on app start
  const initializeAuth = async () => {
    if (isInitialized.value) {
      return
    }

    isInitialized.value = true

    if (token.value) {
      await checkAuth()
    }
  }

  return {
    // State
    user,
    token,
    isLoading,
    error,
    isInitialized,

    // Getters
    isAuthenticated,
    isGuest,

    // Actions
    setUser,
    setToken,
    clearAuth,
    setError,
    clearError,
    login,
    register,
    logout,
    forgotPassword,
    checkAuth,
    initializeAuth
  }
})
