<template>
  <div class="trip-search-container">
    <!-- Header -->
    <div class="header">
      <div class="header-content">
        <div class="header-info">
          <h1 class="title">Chuyến xe của bạn</h1>
        </div>
        <v-btn
          color="white"
          variant="text"
          @click="$emit('go-to-history')"
          class="history-btn"
          icon
        >
          <v-icon>mdi-history</v-icon>
        </v-btn>
      </div>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Trips List -->
      <div class="trips-list">
        <!-- Trips Grid -->
        <div v-if="trips.length > 0" class="trips-grid">
          <div
            v-for="trip in trips"
            :key="trip.id"
            class="trip-card"
            @click="$emit('go-to-trip-detail', trip)"
          >
            <!-- Status Badge -->
            <v-chip
              :color="getTripStatusColor(trip.status)"
              variant="flat"
              size="small"
              class="status-chip"
            >
              <v-icon start size="14">{{ getTripStatusIcon(trip.status) }}</v-icon>
              {{ getTripStatusText(trip.status) }}
            </v-chip>

            <!-- Route -->
            <div class="route-section">
              <div class="route-item">
                <v-icon color="green-lighten-1" size="16">mdi-circle</v-icon>
                <span class="location">{{ trip.from }}</span>
              </div>
              <div class="route-divider"></div>
              <div class="route-item">
                <v-icon color="red-lighten-1" size="16">mdi-map-marker</v-icon>
                <span class="location">{{ trip.to }}</span>
              </div>
            </div>

            <!-- Info Row -->
            <div class="info-section">
              <div class="info-item">
                <v-icon size="15">mdi-clock-outline</v-icon>
                <span>{{ trip.departureTime }}</span>
              </div>
              <div class="info-item">
                <v-icon size="15">mdi-seat-passenger</v-icon>
                <span>{{ getServiceLabel(trip.service) }}</span>
              </div>
            </div>

            <!-- Driver Info (if found) -->
            <div v-if="trip.status !== 'searching'" class="driver-section">
              <div class="driver-info">
                <v-icon size="16" color="green-lighten-1">mdi-account-circle</v-icon>
                <span class="driver-name">{{ trip.driverName }}</span>
                <span class="separator">•</span>
                <span class="vehicle-plate">{{ trip.vehiclePlate }}</span>
              </div>
              <v-btn
                color="green-lighten-1"
                variant="tonal"
                size="x-small"
                icon
              >
                <v-icon size="16">mdi-phone</v-icon>
              </v-btn>
            </div>

            <!-- Bottom -->
            <div class="bottom-section">
              <div class="price">{{ formatPrice(trip.price) }}</div>
              <v-btn
                v-if="trip.status === 'searching'"
                color="grey"
                variant="tonal"
                size="small"
                disabled
              >
                Đang tìm...
              </v-btn>
              <v-btn
                v-else
                :color="getActionButtonColor(trip.status)"
                variant="flat"
                size="small"
              >
                {{ getActionButtonText(trip.status) }}
              </v-btn>
            </div>
          </div>
        </div>

        <!-- No Trips Found -->
        <div v-else-if="!isSearching" class="no-trips">
          <v-icon size="80" color="grey-lighten-2">mdi-car-off</v-icon>
          <h3>Không có chuyến xe nào</h3>
          <p>Bạn chưa có chuyến xe đang hoạt động</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTripStore } from '@/stores/trip'

const router = useRouter()
const tripStore = useTripStore()

// Emits
const emit = defineEmits<{
  'go-to-history': []
  'go-to-trip-detail': [trip: any]
}>()

// Computed properties
const isSearching = computed(() => tripStore.isSearching)

// Sample trips data - only active trips (not completed)
const trips = ref([
  {
    id: 1,
    from: 'Cầu Giấy, Hà Nội',
    to: 'Phú Thọ, Việt Trì',
    departureTime: '14:30, 23/10/2025',
    service: '1',
    price: 250000,
    status: 'searching',
    driverName: '',
    vehiclePlate: '',
  },
  {
    id: 2,
    from: 'Hoàn Kiếm, Hà Nội',
    to: 'Phú Thọ, Phù Ninh',
    departureTime: '15:00, 23/10/2025',
    service: '2',
    price: 300000,
    status: 'picking_up',
    driverName: 'Trần Thị B',
    vehiclePlate: '29A-12345',
  },
  {
    id: 3,
    from: 'Ba Đình, Hà Nội',
    to: 'Phú Thọ, Tam Nông',
    departureTime: '16:15, 23/10/2025',
    service: 'back',
    price: 180000,
    status: 'in_transit',
    driverName: 'Lê Văn C',
    vehiclePlate: '29B-67890',
  },
  {
    id: 4,
    from: 'Đống Đa, Hà Nội',
    to: 'Phú Thọ, Việt Trì',
    departureTime: '17:30, 23/10/2025',
    service: 'whole',
    price: 280000,
    status: 'searching',
    driverName: '',
    vehiclePlate: '',
  }
])

// Methods
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

const getServiceLabel = (service: string) => {
  const serviceMap: { [key: string]: string } = {
    '1': '1 chỗ',
    '2': '2 chỗ',
    'back': 'Hàng sau',
    'whole': 'Cả xe',
    'small': 'Gửi đồ nhỏ',
    'large': 'Gửi đồ to'
  }
  return serviceMap[service] || 'Không xác định'
}

const goToHome = () => {
  router.push('/')
}
const getTripStatusColor = (status: string) => {
  switch (status) {
    case 'searching': return 'orange-lighten-1'
    case 'picking_up': return 'blue-lighten-1'
    case 'in_transit': return 'green-lighten-1'
    case 'waiting': return 'purple-lighten-1'
    default: return 'grey-lighten-2'
  }
}

const getTripStatusText = (status: string) => {
  switch (status) {
    case 'searching': return 'Đang tìm xe'
    case 'picking_up': return 'Đang đón'
    case 'in_transit': return 'Trong hành trình'
    case 'waiting': return 'Chờ khởi hành'
    default: return 'Không xác định'
  }
}

const getTripStatusIcon = (status: string) => {
  switch (status) {
    case 'searching': return 'mdi-magnify'
    case 'picking_up': return 'mdi-car-side'
    case 'in_transit': return 'mdi-car'
    case 'waiting': return 'mdi-clock-outline'
    default: return 'mdi-help-circle'
  }
}

const getActionButtonColor = (status: string) => {
  switch (status) {
    case 'searching': return 'grey-lighten-1'
    case 'picking_up': return 'blue-lighten-1'
    case 'in_transit': return 'green-lighten-1'
    case 'waiting': return 'purple-lighten-1'
    default: return 'grey-lighten-1'
  }
}

const getActionButtonText = (status: string) => {
  switch (status) {
    case 'searching': return 'Đang tìm...'
    case 'picking_up': return 'Theo dõi'
    case 'in_transit': return 'Theo dõi'
    case 'waiting': return 'Chờ khởi hành'
    default: return 'Xem chi tiết'
  }
}

// Simulate backend search
const simulateSearch = () => {
  tripStore.startSearch()

  const interval = setInterval(() => {
    tripStore.updateSearchProgress(tripStore.searchProgress + 10)
    if (tripStore.searchProgress >= 100) {
      clearInterval(interval)
      setTimeout(() => {
        tripStore.isSearching = false
        tripStore.searchProgress = 0
      }, 500)
    }
  }, 200)
}

// Start searching if we have search data
onMounted(() => {
  if (tripStore.hasSearchData) {
    simulateSearch()
  }
})
</script>

<style scoped>
.trip-search-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e8f5e9 100%);
  padding-bottom: 80px;
}

/* Header */
.header {
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
  padding: 20px;
  color: white;
  box-shadow: 0 2px 12px rgba(76, 175, 80, 0.2);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 20px;
}

.header-info {
  flex: 1;
}

.title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 6px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.history-btn {
  flex-shrink: 0;
  min-width: 40px;
  width: 40px;
  height: 40px;
}

/* Content */
.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Trips List */
.trips-list {
  background: transparent;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
  border: none;
}

/* Trips Grid */
.trips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 16px;
}

.trip-card {
  background: white;
  border-radius: 16px;
  padding: 18px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.trip-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.15);
}

/* Status Chip */
.status-chip {
  align-self: flex-start;
  font-weight: 600;
  font-size: 0.8rem;
}

/* Route Section */
.route-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.route-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.route-item .location {
  font-size: 0.95rem;
  font-weight: 600;
  color: #424242;
  line-height: 1.4;
}

.route-divider {
  width: 1px;
  height: 12px;
  background: #e0e0e0;
  margin-left: 7px;
}

/* Info Section */
.info-section {
  display: flex;
  gap: 16px;
  padding-top: 6px;
  border-top: 1px solid #f0f0f0;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: #757575;
}

/* Driver Section */
.driver-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: rgba(76, 175, 80, 0.04);
  border-radius: 10px;
  gap: 8px;
}

.driver-info {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 0;
}

.driver-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #424242;
}

.separator {
  color: #bdbdbd;
  font-size: 0.75rem;
}

.vehicle-plate {
  font-size: 0.875rem;
  font-weight: 700;
  color: #4caf50;
  letter-spacing: 0.3px;
}

/* Bottom Section */
.bottom-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid #f0f0f0;
}

.price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #4caf50;
}

/* No Trips & No Data States */
.no-trips,
.no-data {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.no-trips h3,
.no-data h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #424242;
  margin: 16px 0 8px 0;
}

.no-trips p,
.no-data p {
  font-size: 1rem;
  color: #666;
  margin: 0 0 24px 0;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: row;
    align-items: flex-start;
  }

  .trips-grid {
    grid-template-columns: 1fr;
  }

  .content {
    padding: 16px;
  }

  .title {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 0.875rem;
  }

  .info-section {
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 16px 16px 5px;
  }

  .content {
    padding: 12px;
  }

  .trip-card {
    padding: 16px;
    gap: 12px;
  }

  .route-item .location {
    font-size: 0.9rem;
  }

  .price {
    font-size: 1.15rem;
  }

  .trips-grid {
    gap: 12px;
  }

  .driver-section {
    padding: 8px 10px;
  }

  .driver-name,
  .vehicle-plate {
    font-size: 0.8rem;
  }
}
</style>
