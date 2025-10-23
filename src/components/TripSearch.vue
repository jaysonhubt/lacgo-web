<template>
  <div class="trip-search-container">
    <!-- Header -->
    <div class="header">
      <div class="header-content">
        <div class="header-info">
          <h1 class="title">Chuyến xe của bạn</h1>
          <div class="route-info" v-if="searchData.from && searchData.to">
            <v-icon color="white" size="20">mdi-map-marker</v-icon>
            <span>{{ searchData.from }} → {{ searchData.to }}</span>
          </div>
          <div class="time-info" v-if="searchData.dateTime">
            <v-icon color="white" size="16">mdi-clock-outline</v-icon>
            <span>{{ searchData.dateTime }}</span>
          </div>
        </div>
        <v-btn
          color="white"
          variant="outlined"
          @click="$emit('go-to-history')"
          class="history-btn"
        >
          <v-icon start>mdi-history</v-icon>
          Lịch sử
        </v-btn>
      </div>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Status Overview -->
      <div class="status-overview">
        <div class="status-card">
          <div class="status-header">
            <h3>Trạng thái chuyến xe</h3>
            <v-chip 
              :color="getStatusColor()"
              variant="flat"
              size="large"
            >
              <v-icon start>{{ getStatusIcon() }}</v-icon>
              {{ getStatusText() }}
            </v-chip>
          </div>
          
          <div class="trip-summary">
            <div class="summary-item">
              <v-icon color="green-lighten-1" size="24">mdi-car-seat</v-icon>
              <div>
                <div class="label">Dịch vụ</div>
                <div class="value">{{ tripStore.getServiceLabel(searchData.service) }}</div>
              </div>
            </div>
            <div class="summary-item">
              <v-icon color="green-lighten-1" size="24">mdi-map-marker</v-icon>
              <div>
                <div class="label">Khoảng cách</div>
                <div class="value">~15 km</div>
              </div>
            </div>
            <div class="summary-item">
              <v-icon color="green-lighten-1" size="24">mdi-clock-outline</v-icon>
              <div>
                <div class="label">Thời gian dự kiến</div>
                <div class="value">~25 phút</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Status Content -->
      <div class="main-status">
        <!-- Searching State -->
        <div v-if="isSearching" class="searching-container">
          <div class="searching-header">
            <v-progress-circular
              :model-value="searchProgress"
              color="green-lighten-1"
              size="120"
              width="8"
            ></v-progress-circular>
            <div class="progress-text">
              <h2>Đang tìm xe phù hợp</h2>
              <p>Hệ thống đang tự động tìm kiếm chuyến xe tốt nhất cho bạn</p>
            </div>
          </div>
          
          <div class="search-steps">
            <div class="step" :class="{ completed: searchProgress >= 25 }">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>Tìm kiếm</h4>
                <p>Các chuyến xe khả dụng</p>
              </div>
            </div>
            <div class="step" :class="{ completed: searchProgress >= 50 }">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>Lọc</h4>
                <p>Theo yêu cầu của bạn</p>
              </div>
            </div>
            <div class="step" :class="{ completed: searchProgress >= 75 }">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>Đánh giá</h4>
                <p>Theo độ phù hợp</p>
              </div>
            </div>
            <div class="step" :class="{ completed: searchProgress >= 100 }">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>Kết nối</h4>
                <p>Chuyến xe phù hợp nhất</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Found State -->
        <div v-else-if="searchCompleted" class="found-container">
          <div class="success-header">
            <v-icon size="80" color="green-lighten-1">mdi-check-circle</v-icon>
            <h2>Đã tìm thấy chuyến xe!</h2>
            <p>Hệ thống đã kết nối bạn với chuyến xe tốt nhất</p>
          </div>
          
          <div class="driver-card">
            <div class="driver-header">
              <v-avatar size="60" color="green-lighten-1">
                <v-icon color="white" size="30">mdi-car</v-icon>
              </v-avatar>
              <div class="driver-info">
                <h3>{{ foundTrip?.driverName }}</h3>
                <p>{{ foundTrip?.vehicleType }}</p>
              </div>
              <div class="price-info">
                <div class="price">{{ formatPrice(foundTrip?.price || 0) }}</div>
              </div>
            </div>
            
            <div class="trip-details">
              <div class="detail-row">
                <v-icon color="green-lighten-1" size="20">mdi-clock-outline</v-icon>
                <span>Khởi hành: {{ foundTrip?.departureTime }}</span>
              </div>
              <div class="detail-row">
                <v-icon color="green-lighten-1" size="20">mdi-star</v-icon>
                <span>{{ foundTrip?.rating }} ({{ foundTrip?.reviewCount }} đánh giá)</span>
              </div>
              <div class="detail-row">
                <v-icon color="green-lighten-1" size="20">mdi-map-marker</v-icon>
                <span>{{ foundTrip?.pickupLocation }}</span>
              </div>
            </div>
            
            <v-btn
              color="green-lighten-1"
              variant="flat"
              size="large"
              block
              @click="$emit('go-to-trip-detail', foundTrip)"
              class="action-btn"
            >
              Xem chi tiết chuyến xe
            </v-btn>
          </div>
          
          <div class="note">
            <v-icon color="green-lighten-1" size="16">mdi-information</v-icon>
            <span>Chuyến xe đã được thêm vào lịch sử của bạn</span>
          </div>
        </div>

        <!-- Waiting State -->
        <div v-else class="waiting-container">
          <v-icon size="80" color="grey-lighten-2">mdi-clock-outline</v-icon>
          <h2>Chờ bắt đầu tìm kiếm</h2>
          <p>Hệ thống sẽ bắt đầu tìm kiếm chuyến xe phù hợp</p>
        </div>

        <!-- No Data State -->
        <div v-if="!tripStore.hasSearchData" class="no-data-container">
          <v-icon size="80" color="grey-lighten-2">mdi-magnify</v-icon>
          <h2>Chưa có thông tin tìm kiếm</h2>
          <p>Hãy quay lại trang chủ để tìm kiếm chuyến xe</p>
          <v-btn
            color="green-lighten-1"
            variant="flat"
            @click="goToHome"
            class="home-btn"
          >
            <v-icon start>mdi-home</v-icon>
            Về trang chủ
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
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
const searchData = computed(() => tripStore.searchData)
const isSearching = computed(() => tripStore.isSearching)
const searchProgress = computed(() => tripStore.searchProgress)
const searchCompleted = computed(() => tripStore.currentTrip !== null)
const foundTrip = computed(() => tripStore.currentTrip)

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

const goToHome = () => {
  router.push('/')
}

// Helper functions for status
const getStatusColor = () => {
  if (isSearching.value) return 'orange-lighten-1'
  if (searchCompleted.value) return 'green-lighten-1'
  return 'grey-lighten-2'
}

const getStatusIcon = () => {
  if (isSearching.value) return 'mdi-clock-outline'
  if (searchCompleted.value) return 'mdi-check-circle'
  return 'mdi-help-circle'
}

const getStatusText = () => {
  if (isSearching.value) return 'Đang tìm xe'
  if (searchCompleted.value) return 'Đã tìm thấy'
  return 'Chờ tìm kiếm'
}

// Simulate backend search
const simulateSearch = () => {
  tripStore.startSearch()
  
  const interval = setInterval(() => {
    tripStore.updateSearchProgress(tripStore.searchProgress + 10)
    if (tripStore.searchProgress >= 100) {
      clearInterval(interval)
      setTimeout(() => {
        const trip = {
          id: 1,
          driverName: 'Nguyễn Văn A',
          vehicleType: 'Xe 4 chỗ',
          departureTime: '14:30',
          rating: 4.8,
          reviewCount: 156,
          price: 250000,
          pickupLocation: 'Điểm đón gần nhất',
          status: 'found' as const
        }
        tripStore.completeSearch(trip)
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
  background: #f5f7fa;
  padding-bottom: 80px;
}

/* Header */
.header {
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
  padding: 20px;
  color: white;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 60px;
}

.title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.route-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.time-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  opacity: 0.9;
}

.history-btn {
  flex-shrink: 0;
}

/* Content */
.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Status Overview */
.status-overview {
  margin-bottom: 24px;
}

.status-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8f5e8;
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
}

.status-header h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #424242;
  margin: 0;
}

.trip-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.summary-item .label {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 4px;
}

.summary-item .value {
  font-size: 1rem;
  font-weight: 600;
  color: #424242;
}

/* Main Status */
.main-status {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8f5e8;
}

/* Searching State */
.searching-container {
  text-align: center;
}

.searching-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.progress-text h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #424242;
  margin: 0 0 8px 0;
}

.progress-text p {
  font-size: 1rem;
  color: #666;
  margin: 0;
}

.search-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.step {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.step.completed {
  background: #e8f5e8;
  border-color: #4caf50;
  transform: translateY(-2px);
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #4caf50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.step:not(.completed) .step-number {
  background: #e0e0e0;
  color: #666;
}

.step-content h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #424242;
  margin: 0 0 4px 0;
}

.step-content p {
  font-size: 0.875rem;
  color: #666;
  margin: 0;
}

/* Found State */
.found-container {
  text-align: center;
}

.success-header {
  margin-bottom: 32px;
}

.success-header h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #424242;
  margin: 16px 0 8px 0;
}

.success-header p {
  font-size: 1rem;
  color: #666;
  margin: 0;
}

.driver-card {
  background: #f8f9fa;
  border-radius: 16px;
  padding: 24px;
  border: 2px solid #e8f5e8;
  margin-bottom: 24px;
}

.driver-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.driver-info h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #424242;
  margin: 0 0 4px 0;
}

.driver-info p {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.price-info {
  margin-left: auto;
}

.price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #4caf50;
}

.trip-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.95rem;
  color: #424242;
}

.action-btn {
  margin-top: 16px;
}

.note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #666;
}

/* Waiting & No Data States */
.waiting-container,
.no-data-container {
  text-align: center;
  padding: 40px 20px;
}

.waiting-container h2,
.no-data-container h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #424242;
  margin: 16px 0 8px 0;
}

.waiting-container p,
.no-data-container p {
  font-size: 1rem;
  color: #666;
  margin: 0 0 24px 0;
}

.home-btn {
  margin-top: 16px;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
  
  .status-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .trip-summary {
    grid-template-columns: 1fr;
  }
  
  .searching-header {
    flex-direction: column;
    gap: 20px;
  }
  
  .search-steps {
    grid-template-columns: 1fr;
  }
  
  .driver-header {
    flex-direction: column;
    text-align: center;
  }
  
  .price-info {
    margin-left: 0;
  }
  
  .content {
    padding: 16px;
  }
  
  .main-status {
    padding: 24px;
  }
  
  .title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 16px;
  }
  
  .content {
    padding: 12px;
  }
  
  .main-status {
    padding: 20px;
  }
  
  .status-card {
    padding: 20px;
  }
}
</style>
