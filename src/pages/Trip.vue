<template>
  <v-container fluid class="trip-container pa-0">
    <!-- Header Section -->
    <div class="header-section pa-4">
      <div class="header-content">
        <div class="header-top d-flex justify-space-between align-center mb-4">
          <div class="trip-info-section">
            <h1 class="text-h5 font-weight-bold text-grey-darken-2">
              Chuyến xe
            </h1>
            <p v-if="searchData.from && searchData.to" class="text-body-2 text-grey-darken-1 font-weight-medium">
              {{ searchData.from }} → {{ searchData.to }}
            </p>
            <p v-else class="text-body-2 text-grey-darken-1 font-weight-medium">
              Tìm kiếm chuyến xe phù hợp
            </p>
            <p v-if="searchData.dateTime" class="text-caption text-grey-darken-1">
              {{ searchData.dateTime }}
            </p>
          </div>

          <!-- History Button -->
          <div class="history-section">
            <v-btn
              color="green-lighten-1"
              variant="elevated"
              rounded="lg"
              @click="goToHistory"
            >
              <v-icon start>mdi-history</v-icon>
              Lịch sử
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Results Section -->
    <div class="results-section pa-4">
      <v-card class="results-card" elevation="2" rounded="xl">
        <v-card-text class="pa-4">
          <h3 class="text-h6 font-weight-bold mb-4">Kết quả tìm kiếm</h3>
          
          <!-- Filter Chips -->
          <div class="filter-chips mb-4">
            <v-chip
              v-for="filter in filters"
              :key="filter.value"
              class="filter-chip mr-2 mb-2"
              :color="selectedFilter === filter.value ? 'green-lighten-1' : 'grey-lighten-2'"
              :variant="selectedFilter === filter.value ? 'flat' : 'outlined'"
              @click="selectFilter(filter.value)"
            >
              {{ filter.label }}
            </v-chip>
          </div>

          <!-- Trip List -->
          <div class="trip-list">
            <v-card
              v-for="trip in filteredTrips"
              :key="trip.id"
              class="trip-item mb-3"
              elevation="1"
              rounded="lg"
              @click="goToTripDetail(trip)"
            >
              <v-card-text class="pa-4">
                <div class="d-flex align-center justify-space-between">
                  <div class="trip-info">
                    <div class="d-flex align-center mb-2">
                      <v-avatar size="40" color="green-lighten-1" class="mr-3">
                        <v-icon color="white">mdi-car</v-icon>
                      </v-avatar>
                      <div>
                        <h4 class="text-subtitle-1 font-weight-bold">{{ trip.driverName }}</h4>
                        <p class="text-caption text-grey-darken-1">{{ trip.vehicleType }}</p>
                      </div>
                    </div>
                    
                    <div class="trip-details">
                      <div class="d-flex align-center mb-1">
                        <v-icon size="16" color="green-lighten-1" class="mr-2">mdi-clock-outline</v-icon>
                        <span class="text-body-2">{{ trip.departureTime }}</span>
                      </div>
                      <div class="d-flex align-center mb-1">
                        <v-icon size="16" color="green-lighten-1" class="mr-2">mdi-account-multiple</v-icon>
                        <span class="text-body-2">{{ trip.availableSeats }} chỗ trống</span>
                      </div>
                      <div class="d-flex align-center">
                        <v-icon size="16" color="green-lighten-1" class="mr-2">mdi-star</v-icon>
                        <span class="text-body-2">{{ trip.rating }} ({{ trip.reviewCount }} đánh giá)</span>
                      </div>
                    </div>
                  </div>

                  <div class="trip-price text-right">
                    <div class="text-h6 font-weight-bold text-green-lighten-1">
                      {{ formatPrice(trip.price) }}
                    </div>
                    <v-btn
                      color="green-lighten-1"
                      variant="flat"
                      size="small"
                      rounded="lg"
                    >
                      Chọn
                    </v-btn>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </div>

          <!-- No Search Data -->
          <div v-if="!searchData.from || !searchData.to" class="text-center pa-8">
            <v-icon size="64" color="grey-lighten-2" class="mb-4">mdi-magnify</v-icon>
            <h3 class="text-h6 text-grey-darken-1 mb-2">Chưa có thông tin tìm kiếm</h3>
            <p class="text-body-2 text-grey-darken-1 mb-4">
              Hãy quay lại trang chủ để tìm kiếm chuyến xe
            </p>
            <v-btn
              color="green-lighten-1"
              variant="flat"
              rounded="lg"
              @click="goToHome"
            >
              <v-icon start>mdi-home</v-icon>
              Về trang chủ
            </v-btn>
          </div>

          <!-- No Results -->
          <div v-else-if="filteredTrips.length === 0" class="text-center pa-8">
            <v-icon size="64" color="grey-lighten-2" class="mb-4">mdi-car-off</v-icon>
            <h3 class="text-h6 text-grey-darken-1 mb-2">Không tìm thấy chuyến xe</h3>
            <p class="text-body-2 text-grey-darken-1">
              Hãy thử thay đổi bộ lọc hoặc thời gian tìm kiếm
            </p>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Search data from previous screen
const searchData = ref({
  from: 'Hà Nội',
  to: 'Hồ Chí Minh',
  dateTime: 'Hôm nay, 14:30',
  service: '1'
})

// Filter options
const filters = ref([
  { value: 'all', label: 'Tất cả' },
  { value: 'price', label: 'Giá thấp' },
  { value: 'time', label: 'Thời gian' },
  { value: 'rating', label: 'Đánh giá cao' }
])

const selectedFilter = ref('all')

// Sample trip data
const trips = ref([
  {
    id: 1,
    driverName: 'Nguyễn Văn A',
    vehicleType: 'Xe 4 chỗ',
    departureTime: '14:30',
    availableSeats: 2,
    rating: 4.8,
    reviewCount: 156,
    price: 250000,
    service: '1'
  },
  {
    id: 2,
    driverName: 'Trần Thị B',
    vehicleType: 'Xe 7 chỗ',
    departureTime: '15:00',
    availableSeats: 4,
    rating: 4.6,
    reviewCount: 89,
    price: 300000,
    service: '2'
  },
  {
    id: 3,
    driverName: 'Lê Văn C',
    vehicleType: 'Xe 16 chỗ',
    departureTime: '16:15',
    availableSeats: 8,
    rating: 4.9,
    reviewCount: 203,
    price: 180000,
    service: 'back'
  },
  {
    id: 4,
    driverName: 'Phạm Thị D',
    vehicleType: 'Xe 4 chỗ',
    departureTime: '17:30',
    availableSeats: 1,
    rating: 4.7,
    reviewCount: 134,
    price: 280000,
    service: '1'
  }
])

// Computed properties
const filteredTrips = computed(() => {
  let filtered = trips.value

  // Filter by service type
  if (searchData.value.service !== 'all') {
    filtered = filtered.filter(trip => trip.service === searchData.value.service)
  }

  // Apply selected filter
  switch (selectedFilter.value) {
    case 'price':
      filtered = filtered.sort((a, b) => a.price - b.price)
      break
    case 'time':
      filtered = filtered.sort((a, b) => a.departureTime.localeCompare(b.departureTime))
      break
    case 'rating':
      filtered = filtered.sort((a, b) => b.rating - a.rating)
      break
  }

  return filtered
})

// Methods
const selectFilter = (filterValue: string) => {
  selectedFilter.value = filterValue
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

const goToHistory = () => {
  router.push('/trip-history')
}

const goToHome = () => {
  router.push('/')
}

const goToTripDetail = (trip: any) => {
  router.push({
    path: '/trip-detail',
    query: { id: trip.id }
  })
}

// Load search data from route params or localStorage
onMounted(() => {
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
  
  // If no search data, show default message
  if (!route.query.from && !route.query.to) {
    searchData.value.from = ''
    searchData.value.to = ''
    searchData.value.dateTime = ''
  }
})
</script>

<style scoped>
.trip-container {
  min-height: 100vh;
  padding-bottom: 80px; /* Account for bottom navigation */
}

.header-section {
  background: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
}

.header-content {
  padding-top: 60px; /* Account for app bar */
}

.header-top {
  flex-shrink: 0;
}

.trip-info-section h1 {
  color: #424242;
}

.history-section {
  /* Remove background styling */
}

.results-section {
  background: #f8f9fa;
}

.results-card {
  transition: all 0.3s ease;
}

.results-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.15);
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-chip {
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-chip:hover {
  transform: translateY(-1px);
}

.trip-item {
  cursor: pointer;
  transition: all 0.3s ease;
}

.trip-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.15);
}

.trip-info {
  flex: 1;
}

.trip-details {
  margin-left: 52px;
}

.trip-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}
</style>
