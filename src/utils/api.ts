import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api'

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
      return Promise.reject(new Error(message))
    } else if (error.request) {
      // Network error
      return Promise.reject(new Error('Network Error: Không thể kết nối đến server. Vui lòng kiểm tra server có đang chạy không.'))
    } else {
      // Other error
      return Promise.reject(error)
    }
  }
)

export default api
