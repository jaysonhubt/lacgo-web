<template>
  <v-container fluid class="trips-container pa-0">
    <!-- Trip Search Results View -->
    <TripSearch
      v-if="currentView === 'search'"
      :search-data="searchData"
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
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TripSearch from '@/components/TripSearch.vue'
import TripHistory from '@/components/TripHistory.vue'
import TripDetail from '@/components/TripDetail.vue'

const router = useRouter()
const route = useRoute()

// Current view state
const currentView = ref('search') // 'search', 'history', 'detail'
const searchData = ref({
  from: '',
  to: '',
  dateTime: '',
  service: '1'
})
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

// Watch route changes
watch(() => route.query, (newQuery) => {
  if (newQuery.id) {
    // Coming from external navigation (like Home search)
    selectedTripId.value = newQuery.id as string
    fromHistory.value = newQuery.from === 'history'
    currentView.value = 'detail'
  } else if (newQuery.view === 'history') {
    currentView.value = 'history'
  } else {
    // Default to search view
    currentView.value = 'search'
  }
}, { immediate: true })

// Load search data from route params
onMounted(() => {
  // Scroll to top
  window.scrollTo(0, 0)
  
  // Load search data from query parameters
  if (route.query.from) {
    searchData.value.from = route.query.from as string
  }
  if (route.query.to) {
    searchData.value.to = route.query.to as string
  }
  if (route.query.dateTime) {
    searchData.value.dateTime = route.query.dateTime as string
  }
  if (route.query.service) {
    searchData.value.service = route.query.service as string
  }
  
  // Determine initial view
  if (route.query.id) {
    selectedTripId.value = route.query.id as string
    fromHistory.value = route.query.from === 'history'
    currentView.value = 'detail'
  } else if (route.query.view === 'history') {
    currentView.value = 'history'
  } else {
    currentView.value = 'search'
  }
})
</script>

<style scoped>
.trips-container {
  min-height: 100vh;
  padding-bottom: 80px; /* Account for bottom navigation */
}
</style>
