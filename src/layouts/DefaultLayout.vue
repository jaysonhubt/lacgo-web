<template>
  <v-layout>
    <v-main class="main">
      <slot />
    </v-main>
    <v-bottom-navigation app class="bottom-nav">
      <v-btn to="/" :value="'home'">
        <v-icon icon="mdi-home-outline"></v-icon>
      </v-btn>
      <v-btn to="/trips" :value="'trips'">
        <v-icon icon="mdi-car-outline"></v-icon>
      </v-btn>
      <v-btn to="/messages" :value="'messages'">
        <v-icon icon="mdi-message-text-outline"></v-icon>
      </v-btn>
      <v-btn to="/gift" :value="'gift'">
        <v-icon icon="mdi-gift-outline"></v-icon>
      </v-btn>
      <v-btn to="/account" :value="'account'">
        <v-icon icon="mdi-account-outline"></v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script lang="ts" setup>
  //
</script>
<style scoped>
.main {
  min-height: calc(100dvh - 56px);
  padding-bottom: 56px; /* Space for bottom nav */
}

.bottom-nav {
  position: fixed !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  z-index: 1000;
}
</style>
