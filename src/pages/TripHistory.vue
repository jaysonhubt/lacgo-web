<template>
  <v-container fluid class="history-container pa-0">
    <!-- Header Section -->
    <div class="header-section pa-4">
      <div class="header-content">
        <div class="header-top d-flex align-center mb-4">
          <v-btn
            icon="mdi-arrow-left"
            variant="text"
            color="grey-darken-2"
            class="mr-3"
            @click="goBack"
          ></v-btn>
          <div>
            <h1 class="text-h5 font-weight-bold text-grey-darken-2">
              Lịch sử chuyến xe
            </h1>
            <p class="text-body-2 text-grey-darken-1 font-weight-medium">
              {{ tripHistory.length }} chuyến đã thực hiện
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Section -->
    <div class="filter-section pa-4">
      <v-card class="filter-card" elevation="2" rounded="xl">
        <v-card-text class="pa-4">
          <div class="d-flex align-center justify-space-between mb-3">
            <h3 class="text-h6 font-weight-bold">Bộ lọc</h3>
            <v-btn
              variant="text"
              color="green-lighten-1"
              size="small"
              @click="clearFilters"
            >
              Xóa bộ lọc
            </v-btn>
          </div>

          <!-- Status Filter -->
          <div class="mb-3">
            <p class="text-body-2 font-weight-medium mb-2">Trạng thái</p>
            <div class="filter-chips">
              <v-chip
                v-for="status in statusFilters"
                :key="status.value"
                class="filter-chip mr-2 mb-2"
                :color="selectedStatus === status.value ? 'green-lighten-1' : 'grey-lighten-2'"
                :variant="selectedStatus === status.value ? 'flat' : 'outlined'"
                @click="selectStatus(status.value)"
              >
                {{ status.label }}
              </v-chip>
            </div>
          </div>

          <!-- Date Filter -->
          <div>
            <p class="text-body-2 font-weight-medium mb-2">Thời gian</p>
            <div class="filter-chips">
              <v-chip
                v-for="period in periodFilters"
                :key="period.value"
                class="filter-chip mr-2 mb-2"
                :color="selectedPeriod === period.value ? 'green-lighten-1' : 'grey-lighten-2'"
                :variant="selectedPeriod === period.value ? 'flat' : 'outlined'"
                @click="selectPeriod(period.value)"
              >
                {{ period.label }}
              </v-chip>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>

    <!-- Trip History List -->
    <div class="history-section pa-4">
      <v-card class="history-card" elevation="2" rounded="xl">
        <v-card-text class="pa-4">
          <h3 class="text-h6 font-weight-bold mb-4">Danh sách chuyến xe</h3>
          
          <div class="trip-history-list">
            <v-card
              v-for="trip in filteredHistory"
              :key="trip.id"
              class="history-item mb-3"
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
                        <v-icon size="16" color="green-lighten-1" class="mr-2">mdi-map-marker</v-icon>
                        <span class="text-body-2">{{ trip.route }}</span>
                      </div>
                      <div class="d-flex align-center mb-1">
                        <v-icon size="16" color="green-lighten-1" class="mr-2">mdi-clock-outline</v-icon>
                        <span class="text-body-2">{{ trip.dateTime }}</span>
                      </div>
                      <div class="d-flex align-center">
                        <v-icon size="16" color="green-lighten-1" class="mr-2">mdi-star</v-icon>
                        <span class="text-body-2">{{ trip.rating }} ({{ trip.reviewCount }} đánh giá)</span>
                      </div>
                    </div>
                  </div>

                  <div class="trip-status text-right">
                    <v-chip
                      :color="getStatusColor(trip.status)"
                      :variant="trip.status === 'completed' ? 'flat' : 'outlined'"
                      size="small"
                      class="mb-2"
                    >
                      {{ getStatusText(trip.status) }}
                    </v-chip>
                    <div class="text-h6 font-weight-bold text-green-lighten-1">
                      {{ formatPrice(trip.price) }}
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </div>

          <!-- No Results -->
          <div v-if="filteredHistory.length === 0" class="text-center pa-8">
            <v-icon size="64" color="grey-lighten-2" class="mb-4">mdi-history</v-icon>
            <h3 class="text-h6 text-grey-darken-1 mb-2">Không có chuyến xe nào</h3>
            <p class="text-body-2 text-grey-darken-1">
              Bạn chưa có chuyến xe nào trong khoảng thời gian này
            </p>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Filter options
const statusFilters = ref([
  { value: 'all', label: 'Tất cả' },
  { value: 'completed', label: 'Hoàn thành' },
  { value: 'cancelled', label: 'Đã hủy' },
  { value: 'upcoming', label: 'Sắp tới' }
])

const periodFilters = ref([
  { value: 'all', label: 'Tất cả' },
  { value: 'week', label: 'Tuần này' },
  { value: 'month', label: 'Tháng này' },
  { value: 'year', label: 'Năm nay' }
])

const selectedStatus = ref('all')
const selectedPeriod = ref('all')

// Sample trip history data
const tripHistory = ref([
  {
    id: 1,
    driverName: 'Nguyễn Văn A',
    vehicleType: 'Xe 4 chỗ',
    route: 'Hà Nội → Hồ Chí Minh',
    dateTime: '15/12/2024, 14:30',
    rating: 4.8,
    reviewCount: 156,
    price: 250000,
    status: 'completed'
  },
  {
    id: 2,
    driverName: 'Trần Thị B',
    vehicleType: 'Xe 7 chỗ',
    route: 'Hà Nội → Đà Nẵng',
    dateTime: '10/12/2024, 08:00',
    rating: 4.6,
    reviewCount: 89,
    price: 180000,
    status: 'completed'
  },
  {
    id: 3,
    driverName: 'Lê Văn C',
    vehicleType: 'Xe 16 chỗ',
    route: 'Hà Nội → Hải Phòng',
    dateTime: '05/12/2024, 16:15',
    rating: 4.9,
    reviewCount: 203,
    price: 120000,
    status: 'cancelled'
  },
  {
    id: 4,
    driverName: 'Phạm Thị D',
    vehicleType: 'Xe 4 chỗ',
    route: 'Hà Nội → Ninh Bình',
    dateTime: '20/12/2024, 17:30',
    rating: 4.7,
    reviewCount: 134,
    price: 150000,
    status: 'upcoming'
  },
  {
    id: 5,
    driverName: 'Hoàng Văn E',
    vehicleType: 'Xe 7 chỗ',
    route: 'Hà Nội → Quảng Ninh',
    dateTime: '01/12/2024, 09:00',
    rating: 4.5,
    reviewCount: 67,
    price: 200000,
    status: 'completed'
  }
])

// Computed properties
const filteredHistory = computed(() => {
  let filtered = tripHistory.value

  // Filter by status
  if (selectedStatus.value !== 'all') {
    filtered = filtered.filter(trip => trip.status === selectedStatus.value)
  }

  // Filter by period (simplified for demo)
  if (selectedPeriod.value !== 'all') {
    // In real app, this would filter by actual dates
    filtered = filtered.slice(0, 3) // Show only first 3 for demo
  }

  return filtered
})

// Methods
const selectStatus = (status: string) => {
  selectedStatus.value = status
}

const selectPeriod = (period: string) => {
  selectedPeriod.value = period
}

const clearFilters = () => {
  selectedStatus.value = 'all'
  selectedPeriod.value = 'all'
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'green-lighten-1'
    case 'cancelled':
      return 'red-lighten-1'
    case 'upcoming':
      return 'blue-lighten-1'
    default:
      return 'grey-lighten-1'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Hoàn thành'
    case 'cancelled':
      return 'Đã hủy'
    case 'upcoming':
      return 'Sắp tới'
    default:
      return 'Không xác định'
  }
}

const goBack = () => {
  router.back()
}

const goToTripDetail = (trip: any) => {
  router.push({
    path: '/trip-detail',
    query: { id: trip.id, from: 'history' }
  })
}
</script>

<style scoped>
.history-container {
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

.header-top h1 {
  color: #424242;
}

.filter-section {
  background: #f8f9fa;
}

.filter-card {
  transition: all 0.3s ease;
}

.filter-card:hover {
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

.history-section {
  background: #f8f9fa;
}

.history-card {
  transition: all 0.3s ease;
}

.history-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.15);
}

.history-item {
  cursor: pointer;
  transition: all 0.3s ease;
}

.history-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.15);
}

.trip-info {
  flex: 1;
}

.trip-details {
  margin-left: 52px;
}

.trip-status {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}
</style>
