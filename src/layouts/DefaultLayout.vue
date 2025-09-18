<template>
  <v-navigation-drawer app v-model="drawer" width="220">
    <v-list>
      <v-list-item to="/dashboard" title="Dashboard" prepend-icon="mdi-view-dashboard" />
      <v-list-item to="/profile"   title="Profile"   prepend-icon="mdi-account" />
      <v-list-item @click="logout" title="Logout"    prepend-icon="mdi-logout" />
    </v-list>
  </v-navigation-drawer>

  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-toolbar-title>LacGo Admin</v-toolbar-title>
  </v-app-bar>

  <v-main>
    <v-container fluid>
      <slot />
    </v-container>
  </v-main>

  <v-footer app inset>
    <span class="mx-auto">&copy; 2025 LacGo</span>
  </v-footer>
</template>

<script setup>
import { ref } from 'vue'
const drawer = ref(true)
function logout() {
  // Gọi API logout hoặc pinia store
}
</script>
