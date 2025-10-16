<template>
  <v-container fluid class="trip-detail-container pa-0">
    <!-- Header Section -->
    <div class="header-section pa-4">
      <div class="header-content">
        <div class="header-top d-flex align-center mb-4">
          <v-btn
            icon="mdi-arrow-left"
            variant="text"
            color="grey-darken-2"
            class="mr-3"
            @click="$emit('go-back')"
          ></v-btn>
          <div>
            <h1 class="text-h5 font-weight-bold text-grey-darken-2">
              Chi tiết chuyến xe
            </h1>
            <p class="text-body-2 text-grey-darken-1 font-weight-medium">
              {{ tripData.route }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Trip Information -->
    <div class="trip-info-section pa-4">
      <v-card class="trip-info-card" elevation="2" rounded="xl">
        <v-card-text class="pa-4">
          <!-- Driver Info -->
          <div class="driver-section mb-6">
            <h3 class="text-h6 font-weight-bold mb-4">Thông tin tài xế</h3>
            <div class="d-flex align-center">
              <v-avatar size="60" color="green-lighten-1" class="mr-4">
                <v-icon color="white" size="30">mdi-account</v-icon>
              </v-avatar>
              <div class="flex-grow-1">
                <h4 class="text-h6 font-weight-bold">{{ tripData.driverName }}</h4>
                <p class="text-body-2 text-grey-darken-1 mb-2">{{ tripData.vehicleType }}</p>
                <div class="d-flex align-center">
                  <v-icon size="16" color="green-lighten-1" class="mr-1">mdi-star</v-icon>
                  <span class="text-body-2 font-weight-medium">{{ tripData.rating }}</span>
                  <span class="text-caption text-grey-darken-1 ml-1">({{ tripData.reviewCount }} đánh giá)</span>
                </div>
              </div>
              <v-btn
                color="green-lighten-1"
                variant="outlined"
                size="small"
                rounded="lg"
              >
                <v-icon start>mdi-phone</v-icon>
                Gọi
              </v-btn>
            </div>
          </div>

          <!-- Trip Details -->
          <div class="trip-details-section mb-6">
            <h3 class="text-h6 font-weight-bold mb-4">Thông tin chuyến đi</h3>
            <div class="trip-details-grid">
              <div class="detail-item">
                <v-icon color="green-lighten-1" class="mr-3">mdi-clock-outline</v-icon>
                <div>
                  <p class="text-body-2 font-weight-medium">Thời gian khởi hành</p>
                  <p class="text-caption text-grey-darken-1">{{ tripData.departureTime }}</p>
                </div>
              </div>
              <div class="detail-item">
                <v-icon color="green-lighten-1" class="mr-3">mdi-clock-end</v-icon>
                <div>
                  <p class="text-body-2 font-weight-medium">Thời gian dự kiến</p>
                  <p class="text-caption text-grey-darken-1">{{ tripData.estimatedTime }}</p>
                </div>
              </div>
              <div class="detail-item">
                <v-icon color="green-lighten-1" class="mr-3">mdi-account-multiple</v-icon>
                <div>
                  <p class="text-body-2 font-weight-medium">Số chỗ trống</p>
                  <p class="text-caption text-grey-darken-1">{{ tripData.availableSeats }} chỗ</p>
                </div>
              </div>
              <div class="detail-item">
                <v-icon color="green-lighten-1" class="mr-3">mdi-currency-usd</v-icon>
                <div>
                  <p class="text-body-2 font-weight-medium">Giá vé</p>
                  <p class="text-caption text-grey-darken-1">{{ formatPrice(tripData.price) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Route Information -->
          <div class="route-section mb-6">
            <h3 class="text-h6 font-weight-bold mb-4">Lộ trình</h3>
            <div class="route-timeline">
              <div class="route-point">
                <div class="route-dot start"></div>
                <div class="route-content">
                  <h4 class="text-subtitle-2 font-weight-bold">{{ tripData.fromLocation }}</h4>
                  <p class="text-caption text-grey-darken-1">{{ tripData.fromAddress }}</p>
                  <p class="text-caption text-green-lighten-1">{{ tripData.departureTime }}</p>
                </div>
              </div>
              <div class="route-line"></div>
              <div class="route-point">
                <div class="route-dot end"></div>
                <div class="route-content">
                  <h4 class="text-subtitle-2 font-weight-bold">{{ tripData.toLocation }}</h4>
                  <p class="text-caption text-grey-darken-1">{{ tripData.toAddress }}</p>
                  <p class="text-caption text-green-lighten-1">{{ tripData.arrivalTime }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Vehicle Information -->
          <div class="vehicle-section mb-6">
            <h3 class="text-h6 font-weight-bold mb-4">Thông tin xe</h3>
            <div class="vehicle-info">
              <div class="vehicle-image mb-3">
                <v-img
                  :src="tripData.vehicleImage"
                  alt="Vehicle"
                  height="120"
                  class="rounded-lg"
                  cover
                ></v-img>
              </div>
              <div class="vehicle-details">
                <h4 class="text-subtitle-1 font-weight-bold">{{ tripData.vehicleName }}</h4>
                <p class="text-body-2 text-grey-darken-1 mb-2">{{ tripData.vehicleType }}</p>
                <div class="vehicle-features">
                  <v-chip
                    v-for="feature in tripData.features"
                    :key="feature"
                    size="small"
                    color="green-lighten-1"
                    variant="outlined"
                    class="mr-2 mb-1"
                  >
                    {{ feature }}
                  </v-chip>
                </div>
              </div>
            </div>
          </div>

          <!-- Reviews Section -->
          <div class="reviews-section mb-6">
            <h3 class="text-h6 font-weight-bold mb-4">Đánh giá từ hành khách</h3>
            <div class="reviews-list">
              <v-card
                v-for="review in tripData.reviews"
                :key="review.id"
                class="review-item mb-3"
                elevation="1"
                rounded="lg"
              >
                <v-card-text class="pa-3">
                  <div class="d-flex align-center mb-2">
                    <v-avatar size="32" color="grey-lighten-2" class="mr-3">
                      <v-icon color="grey-darken-1">mdi-account</v-icon>
                    </v-avatar>
                    <div class="flex-grow-1">
                      <h5 class="text-subtitle-2 font-weight-bold">{{ review.passengerName }}</h5>
                      <div class="d-flex align-center">
                        <v-rating
                          :model-value="review.rating"
                          color="yellow-darken-2"
                          size="small"
                          readonly
                          density="compact"
                        ></v-rating>
                        <span class="text-caption text-grey-darken-1 ml-2">{{ review.date }}</span>
                      </div>
                    </div>
                  </div>
                  <p class="text-body-2">{{ review.comment }}</p>
                </v-card-text>
              </v-card>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>

    <!-- Action Buttons -->
    <div class="action-section pa-4">
      <div class="action-buttons">
        <v-btn
          v-if="tripData.status === 'available'"
          color="green-lighten-1"
          size="large"
          block
          rounded="xl"
          @click="bookTrip"
        >
          <v-icon start>mdi-check</v-icon>
          Đặt chỗ ngay
        </v-btn>
        <v-btn
          v-else-if="tripData.status === 'booked'"
          color="blue-lighten-1"
          size="large"
          block
          rounded="xl"
          disabled
        >
          <v-icon start>mdi-check-circle</v-icon>
          Đã đặt chỗ
        </v-btn>
        <v-btn
          v-else
          color="grey-lighten-1"
          size="large"
          block
          rounded="xl"
          disabled
        >
          <v-icon start>mdi-close</v-icon>
          Không khả dụng
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Props
const props = defineProps<{
  tripId: string
  fromHistory: boolean
}>()

// Emits
const emit = defineEmits<{
  'go-back': []
}>()

// Trip data
const tripData = ref({
  id: 1,
  driverName: 'Nguyễn Văn A',
  vehicleType: 'Xe 4 chỗ',
  vehicleName: 'Toyota Vios 2023',
  vehicleImage: '/dashboard_bg1_small.png', // Placeholder image
  rating: 4.8,
  reviewCount: 156,
  price: 250000,
  route: 'Hà Nội → Hồ Chí Minh',
  fromLocation: 'Hà Nội',
  fromAddress: 'Số 1 Đại Cồ Việt, Hai Bà Trưng',
  toLocation: 'Hồ Chí Minh',
  toAddress: 'Sân bay Tân Sơn Nhất, Tân Bình',
  departureTime: '14:30',
  arrivalTime: '06:30 (+1)',
  estimatedTime: '16 giờ',
  availableSeats: 2,
  status: 'available', // available, booked, unavailable
  features: ['WiFi', 'Điều hòa', 'Nước uống', 'Chăn gối'],
  reviews: [
    {
      id: 1,
      passengerName: 'Anh Minh',
      rating: 5,
      comment: 'Tài xế rất thân thiện, xe sạch sẽ và chạy an toàn. Sẽ book lại lần sau!',
      date: '2 ngày trước'
    },
    {
      id: 2,
      passengerName: 'Chị Lan',
      rating: 4,
      comment: 'Chuyến đi khá ổn, tài xế đúng giờ. Chỉ có điều xe hơi cũ một chút.',
      date: '1 tuần trước'
    },
    {
      id: 3,
      passengerName: 'Anh Tuấn',
      rating: 5,
      comment: 'Rất hài lòng với dịch vụ. Tài xế chuyên nghiệp, xe mới và tiện nghi.',
      date: '2 tuần trước'
    }
  ]
})

// Methods
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

const bookTrip = () => {
  // TODO: Implement booking logic
  console.log('Booking trip:', tripData.value.id)
  // This could show a booking confirmation dialog or navigate to payment
}

// Load trip data based on props
onMounted(() => {
  // Scroll to top
  window.scrollTo(0, 0)
  
  // In real app, fetch trip data from API based on tripId
  console.log('Loading trip detail for ID:', props.tripId, 'From history:', props.fromHistory)
})
</script>

<style scoped>
.trip-detail-container {
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

.trip-info-section {
  background: #f8f9fa;
}

.trip-info-card {
  transition: all 0.3s ease;
}

.trip-info-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.15);
}

.driver-section {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 16px;
}

.trip-details-section {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 16px;
}

.trip-details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.detail-item {
  display: flex;
  align-items: center;
}

.route-section {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 16px;
}

.route-timeline {
  position: relative;
  padding-left: 20px;
}

.route-point {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
}

.route-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: absolute;
  left: -6px;
  margin-top: 6px;
}

.route-dot.start {
  background: #4caf50;
  border: 3px solid white;
  box-shadow: 0 0 0 2px #4caf50;
}

.route-dot.end {
  background: #f44336;
  border: 3px solid white;
  box-shadow: 0 0 0 2px #f44336;
}

.route-line {
  position: absolute;
  left: -1px;
  top: 18px;
  bottom: 18px;
  width: 2px;
  background: linear-gradient(to bottom, #4caf50, #f44336);
}

.route-content {
  margin-left: 16px;
}

.vehicle-section {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 16px;
}

.vehicle-info {
  display: flex;
  flex-direction: column;
}

.vehicle-features {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.reviews-section {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 16px;
}

.review-item {
  transition: all 0.3s ease;
}

.review-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.1);
}

.action-section {
  background: #f8f9fa;
  position: sticky;
  bottom: 0;
  z-index: 10;
}

.action-buttons {
  max-width: 100%;
}

@media (max-width: 768px) {
  .trip-details-grid {
    grid-template-columns: 1fr;
  }
  
  .vehicle-info {
    flex-direction: column;
  }
}
</style>
