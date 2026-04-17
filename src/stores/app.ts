// Utilities
import { defineStore } from 'pinia'

type ThemeMode = 'light' | 'dark'

export const useAppStore = defineStore('app', () => {

  const themeMode = ref<ThemeMode>('light')
  const setThemeMode = (mode: ThemeMode) => {
    themeMode.value = mode
  }
  const toggleThemeMode = () => {
    themeMode.value = themeMode.value === 'dark' ? 'light' : 'dark'
  }

  return {
    themeMode,
    setThemeMode,
    toggleThemeMode
  }
}, {
  persist: true,
})
