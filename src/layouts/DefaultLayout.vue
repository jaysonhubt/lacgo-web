<template>
  <v-layout>
    <v-main class="main">
      <slot />
    </v-main>
    <v-bottom-navigation app>
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
  max-height: calc(100dvh - 56px);
  overflow: scroll;
  padding-bottom: 0;
}
</style>
