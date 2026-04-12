import axios from 'axios'

const resolveApiBaseUrl = (): string => {
  const configuredBaseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim()
  if (configuredBaseUrl) {
    return configuredBaseUrl
  }

  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}/api`
  }

  return 'http://localhost/api'
}

export const API_BASE_URL = resolveApiBaseUrl()

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || `HTTP error! status: ${error.response.status}`
      const enhancedError = new Error(message) as Error & {
        status?: number
        details?: unknown
        url?: string
      }
      enhancedError.status = error.response.status
      enhancedError.details = error.response.data
      enhancedError.url = error.config?.url
      return Promise.reject(enhancedError)
    } else if (error.request) {
      // Network error
      const networkError = new Error('Network Error: Không thể kết nối đến server. Vui lòng kiểm tra server có đang chạy không.') as Error & {
        status?: number
        details?: unknown
        url?: string
      }
      networkError.status = 0
      networkError.details = error.message
      networkError.url = error.config?.url
      return Promise.reject(networkError)
    } else {
      // Other error
      return Promise.reject(error)
    }
  }
)

export default api
