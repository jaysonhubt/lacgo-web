<template>
  <div class="trip-history-container">
    <!-- Header -->
    <div class="header">
      <v-btn
        icon
        variant="text"
        color="white"
        @click="goBack"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      
      <h1 class="title">Lịch sử chuyến đi</h1>
      <div style="width: 40px"></div>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Filter Chips -->
      <div class="filter-section">
        <v-chip
          v-for="filter in filters"
          :key="filter.value"
          :color="selectedFilter === filter.value ? 'green-lighten-1' : 'grey-lighten-2'"
          :variant="selectedFilter === filter.value ? 'flat' : 'outlined'"
          class="filter-chip"
          @click="selectedFilter = filter.value"
        >
          {{ filter.label }}
        </v-chip>
      </div>

      <!-- Trips List -->
      <div class="trips-list">
        <div
          v-for="trip in filteredTrips"
          :key="trip.id"
          class="trip-card"
          @click="goToTripDetail(trip)"
        >
          <div class="trip-header">
            <v-chip
              :color="getTripStatusColor(trip.status)"
              size="small"
              variant="flat"
            >
              {{ getTripStatusText(trip.status) }}
            </v-chip>
            <span class="trip-date">{{ trip.date }}</span>
          </div>

          <div class="trip-route">
            <div class="route-item">
              <v-icon color="green-lighten-1" size="14">mdi-circle</v-icon>
              <span>{{ trip.from }}</span>
            </div>
            <div class="route-divider"></div>
            <div class="route-item">
              <v-icon color="red-lighten-1" size="14">mdi-map-marker</v-icon>
              <span>{{ trip.to }}</span>
            </div>
          </div>

          <div class="trip-footer">
            <div class="trip-info">
              <v-icon size="14">mdi-car</v-icon>
              <span>{{ trip.vehicleType }}</span>
            </div>
            <div class="trip-price">{{ formatPrice(trip.price) }}</div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredTrips.length === 0" class="empty-state">
          <v-icon size="80" color="grey-lighten-2">mdi-car-off</v-icon>
          <h3>Chưa có chuyến đi</h3>
          <p>Lịch sử chuyến đi của bạn sẽ xuất hiện ở đây</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// State
const selectedFilter = ref('all')

const filters = ref([
  { label: 'Tất cả', value: 'all' },
  { label: 'Hoàn thành', value: 'completed' },
  { label: 'Đã hủy', value: 'cancelled' },
])

// Sample trips
const trips = ref([
  {
    id: 1,
    from: 'Cầu Giấy, Hà Nội',
    to: 'Phú Thọ, Việt Trì',
    date: '23/10/2025',
    vehicleType: '1 chỗ',
    price: 250000,
    status: 'completed',
  },
  {
    id: 2,
    from: 'Hoàn Kiếm, Hà Nội',
    to: 'Phú Thọ, Phù Ninh',
    date: '22/10/2025',
    vehicleType: '2 chỗ',
    price: 300000,
    status: 'completed',
  },
  {
    id: 3,
    from: 'Ba Đình, Hà Nội',
    to: 'Phú Thọ, Tam Nông',
    date: '21/10/2025',
    vehicleType: 'Hàng sau',
    price: 180000,
    status: 'cancelled',
  },
  {
    id: 4,
    from: 'Đống Đa, Hà Nội',
    to: 'Phú Thọ, Việt Trì',
    date: '20/10/2025',
    vehicleType: 'Cả xe',
    price: 500000,
    status: 'completed',
  },
])

// Computed
const filteredTrips = computed(() => {
  if (selectedFilter.value === 'all') {
    return trips.value
  }
  return trips.value.filter(t => t.status === selectedFilter.value)
})

// Methods
const goBack = () => {
  router.back()
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

const getTripStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'green-lighten-1'
    case 'cancelled':
      return 'red-lighten-1'
    default:
      return 'grey-lighten-1'
  }
}

const getTripStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Hoàn thành'
    case 'cancelled':
      return 'Đã hủy'
    default:
      return 'Không xác định'
  }
}

const goToTripDetail = (trip: any) => {
  // Navigate to trip detail
}
</script>

<style scoped>
.trip-history-container {
  min-height: 100vh;
  background: #f8f9fa;
  padding-bottom: 80px;
}

/* Header */
.header {
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
  padding: 20px 16px;
  color: white;
  box-shadow: 0 2px 12px rgba(76, 175, 80, 0.2);
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 60px;
}

.title {
  flex: 1;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Content */
.content {
  padding: 20px 16px;
}

/* Filter Section */
.filter-section {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.filter-chip {
  cursor: pointer;
}

/* Trips List */
.trips-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.trip-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s;
}

.trip-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.12);
}

.trip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.trip-date {
  font-size: 0.85rem;
  color: #757575;
}

.trip-route {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
}

.route-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #424242;
}

.route-divider {
  width: 1px;
  height: 10px;
  background: #e0e0e0;
  margin-left: 6px;
}

.trip-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.trip-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: #757575;
}

.trip-price {
  font-size: 1.1rem;
  font-weight: 700;
  color: #4caf50;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-state h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #424242;
  margin: 16px 0 8px 0;
}

.empty-state p {
  font-size: 0.95rem;
  color: #666;
  margin: 0;
}

/* Responsive */
@media (max-width: 480px) {
  .content {
    padding: 16px 12px;
  }

  .trip-card {
    padding: 14px;
  }
}
</style>

