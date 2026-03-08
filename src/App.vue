<template>
  <v-app>
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'

const route = useRoute()
const layout = computed(() =>
  route.meta.layout === 'default' ? DefaultLayout : GuestLayout
)

const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true

if (isPWA) {
  console.log('Running as PWA')
}
</script>
