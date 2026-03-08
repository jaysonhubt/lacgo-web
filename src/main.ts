/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'
import './styles/mdi-override.css'

// -----------------------------
// Detect PWA
// -----------------------------
const isStandalone =
  window.matchMedia('(display-mode: standalone)').matches ||
  // iOS Safari
  (window.navigator as any).standalone === true

if (isStandalone) {
  // App đang chạy từ icon
  localStorage.setItem('lacgo-pwa', '1')
} else {
  // Nếu user đã từng mở PWA thì redirect
  const installed = localStorage.getItem('lacgo-pwa')

  if (installed) {
    window.location.href = window.location.pathname + window.location.search
  }
}

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
