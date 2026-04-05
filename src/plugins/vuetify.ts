/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import '../styles/mdi-override.css'
import 'vuetify/styles'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { en, vi } from 'vuetify/locale'
// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'lacGOTheme',
    themes: {
      lacGOTheme: {
        dark: false,
        colors: {
          primary: '#66BB6A',
          background: '#F8F9FA',
          surface: '#FFFFFF',
          'on-surface': '#424242',
          'on-background': '#1F1F1F',
        }
      },
      lacGODarkTheme: {
        dark: true,
        colors: {
          primary: '#66BB6A',
          background: '#121212',
          surface: '#1E1E1E',
          'on-surface': '#E8E8E8',
          'on-background': '#FFFFFF',
        }
      }
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  locale: {
    locale: 'vi',
    fallback: 'en',
    messages: { vi, en }
  }
})
