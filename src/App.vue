<template>
  <v-app>
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useTheme } from 'vuetify'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'
import { useAppStore } from '@/stores/app'

const route = useRoute()
const theme = useTheme()
const appStore = useAppStore()
const { themeMode } = storeToRefs(appStore)

const resolveThemeName = () => {
  if (route.meta.useAppTheme === false) {
    return 'lacGOTheme'
  }

  return themeMode.value === 'dark' ? 'lacGODarkTheme' : 'lacGOTheme'
}

watch(
  [themeMode, () => route.fullPath],
  () => {
    theme.global.name.value = resolveThemeName()
  },
  { immediate: true }
)

const layout = computed(() =>
  route.meta.layout === 'default' ? DefaultLayout : GuestLayout
)
</script>
