<template>
  <v-container fluid class="trips-container pa-0">
    <!-- Trip Search Results View -->
    <TripSearch
      v-if="currentView === 'search'"
      @go-to-history="goToHistory"
      @go-to-trip-detail="goToTripDetail"
    />

    <!-- Trip History View -->
    <TripHistory
      v-else-if="currentView === 'history'"
      @go-back="goBack"
      @go-to-trip-detail="goToTripDetail"
    />

    <!-- Trip Detail View -->
    <TripDetail
      v-else-if="currentView === 'detail'"
      :trip-id="selectedTripId"
      :from-history="fromHistory"
      @go-back="goBack"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TripSearch from '@/components/TripSearch.vue'
import TripHistory from '@/components/TripHistory.vue'
import TripDetail from '@/components/TripDetail.vue'

// Current view state
const currentView = ref('search') // 'search', 'history', 'detail'
const selectedTripId = ref('')
const fromHistory = ref(false)

// Methods
const goToHistory = () => {
  currentView.value = 'history'
  fromHistory.value = false
}

const goBack = () => {
  if (currentView.value === 'detail') {
    if (fromHistory.value) {
      currentView.value = 'history'
    } else {
      currentView.value = 'search'
    }
  } else if (currentView.value === 'history') {
    currentView.value = 'search'
  }
}

const goToTripDetail = (trip: any) => {
  selectedTripId.value = trip.id
  currentView.value = 'detail'
}

// Initialize
onMounted(() => {
  // Scroll to top
  window.scrollTo(0, 0)
})
</script>

<style scoped>
.trips-container {
  min-height: 100vh;
  padding-bottom: 80px; /* Account for bottom navigation */
}
</style>
