<template>
  <v-layout>
    <v-main>
      <slot />
    </v-main>
    <v-bottom-navigation app>
      <v-btn to="/" :value="'home'">
        <v-icon icon="mdi-home"></v-icon>
      </v-btn>
      <v-btn to="/customers" :value="'customers'">
        <v-icon icon="mdi-account-group"></v-icon>
      </v-btn>
      <v-btn to="/settings" :value="'settings'">
        <v-icon icon="mdi-cog"></v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script lang="ts" setup>
  //
</script>
