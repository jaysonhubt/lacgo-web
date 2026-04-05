// Utilities
import { defineStore } from 'pinia'

type ThemeMode = 'light' | 'dark'

export const useAppStore = defineStore('app', {
  state: () => ({
    themeMode: 'light' as ThemeMode,
  }),
  actions: {
    setThemeMode(mode: ThemeMode) {
      this.themeMode = mode
    },
    toggleThemeMode() {
      this.themeMode = this.themeMode === 'dark' ? 'light' : 'dark'
    },
  },
  persist: {
    key: 'lacgo-app-settings',
    paths: ['themeMode'],
  },
})
