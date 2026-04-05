<template>
  <v-layout>
    <v-main class="main">
      <slot />
    </v-main>
    <v-bottom-navigation app class="bottom-nav">
      <v-btn :ripple="false" to="/home" :value="'home'">
        <v-icon icon="mdi-home-outline"></v-icon>
      </v-btn>
      <v-btn :ripple="false" to="/trips" :value="'trips'">
        <v-icon icon="mdi-car-outline"></v-icon>
      </v-btn>
      <v-btn :ripple="false" to="/messages" :value="'messages'">
        <v-icon icon="mdi-message-text-outline"></v-icon>
      </v-btn>
      <v-btn :ripple="false" to="/gift" :value="'gift'">
        <v-icon icon="mdi-gift-outline"></v-icon>
      </v-btn>
      <v-btn :ripple="false" to="/account" :value="'account'">
        <v-icon icon="mdi-account-outline"></v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script lang="ts" setup>
  //
</script>
<style lang="scss" scoped>
.main {
  min-height: calc(100dvh - 50px - env(safe-area-inset-bottom));
  padding-bottom: calc(50px + env(safe-area-inset-bottom));
}

.bottom-nav {
  position: fixed !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  z-index: 1000;
  height: calc(50px + env(safe-area-inset-bottom)) !important;
  padding-bottom: env(safe-area-inset-bottom);
}
.bottom-nav :deep(.v-btn > .v-btn__overlay) {
  background: transparent !important;
  opacity: 0 !important;
}

.bottom-nav :deep(.v-btn:active > .v-btn__overlay),
.bottom-nav :deep(.v-btn:hover > .v-btn__overlay),
.bottom-nav :deep(.v-btn:focus-visible > .v-btn__overlay),
.bottom-nav :deep(.v-btn--active > .v-btn__overlay) {
  background: transparent !important;
  opacity: 0 !important;
}

.bottom-nav :deep(.v-ripple__container) {
  display: none !important;
}

.bottom-nav :deep(.v-btn .v-icon) {
  font-size: 26px;
}

:deep(.v-btn--active > .v-btn__content .v-icon) {
  color: rgb(var(--v-theme-primary));
}

</style>
