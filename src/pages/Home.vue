<template>
  <v-container fluid class="booking-container pa-0">
    <!-- Header Section -->
    <div class="header-section pa-4">
      <!-- Background Image -->
      <div class="header-background">
        <v-img
          src="/dashboard_bg1_small.png"
          alt="Dashboard Background"
          class="header-bg-image"
          cover
        ></v-img>
        <!-- Overlay for better text readability -->
        <div class="header-overlay"></div>
      </div>

      <!-- Content -->
      <div class="header-content mt-4">
        <!-- Top Row -->
        <div class="header-top d-flex justify-space-between align-center mb-6">
          <!-- Left: Greeting -->
          <div class="greeting-section">
            <h1 class="text-h5 font-weight-bold text-white">
              Chào {{ user?.name || 'Bạn' }}!
            </h1>
            <p class="text-body-2 text-white font-weight-bold">
              Bạn muốn đi đâu hôm nay?
            </p>
          </div>

          <!-- Right: Points with coin icon -->
          <div class="points-section d-flex align-center">
            <span class="text-body-2 font-weight-bold text-white">
              {{ user?.points || 0 }}
              <v-icon color="green-lighten-2" size="16" class="mb-1">mdi-leaf</v-icon>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Input Section -->
    <div class="search-section pa-4">
      <v-card
        class="search-card"
        elevation="2"
        rounded="xl"
      >
        <!-- Location Selection -->
        <v-card-text class="pa-4" @click="openLocationSheet = true">
          <div class="d-flex align-center">
            <v-icon color="grey-darken-1" class="mr-3">mdi-map-marker</v-icon>
            <div class="flex-grow-1">
              <p class="text-body-2 text-grey-darken-1 mb-1">Bạn muốn đi đâu?</p>
              <p class="text-h6 font-weight-medium text-grey-darken-2">
                {{ selectedDestination || 'Chọn điểm đến' }}
              </p>
            </div>
            <v-icon color="grey-darken-1">mdi-chevron-right</v-icon>
          </div>
        </v-card-text>

        <!-- Divider -->
        <v-divider></v-divider>

        <!-- Time Selection -->
        <v-card-text class="pa-4" @click="openTimeSheet = true; initializeTimeSheet()">
          <div class="d-flex align-center">
            <v-icon color="grey-darken-1" class="mr-3">mdi-clock-outline</v-icon>
            <div class="flex-grow-1">
              <p class="text-body-2 text-grey-darken-1 mb-1">Thời gian khởi hành</p>
              <p class="text-h6 font-weight-medium text-grey-darken-2">
                {{ selectedDateTime || 'Chọn ngày giờ' }}
              </p>
            </div>
            <v-icon color="grey-darken-1">mdi-chevron-right</v-icon>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <!-- Location Selection Full Page Sheet -->
    <v-bottom-sheet
      v-model="openLocationSheet"
      scrollable
      :height="'100vh'"
      :persistent="false"
    >
      <v-sheet class="location-sheet">
        <!-- Header -->
        <div class="location-header pa-4">
          <div class="d-flex align-center justify-space-between">
            <h2 class="text-h5 font-weight-bold">Chọn điểm đi và đến</h2>
            <v-btn
              icon="mdi-close"
              variant="text"
              @click="openLocationSheet = false"
            ></v-btn>
          </div>
        </div>

        <!-- Content -->
        <div class="location-content pa-4">
          <!-- Location Inputs with Swap Button -->
          <div class="location-inputs mb-6">
            <div class="location-inputs-container">
              <!-- From Location -->
              <div class="location-input-wrapper">
                <v-text-field
                  v-model="fromLocation"
                  label="Điểm đi"
                  variant="outlined"
                  prepend-inner-icon="mdi-map-marker"
                  placeholder="Nhập điểm đi"
                  rounded="lg"
                  hide-details
                  color="green-lighten-1"
                  @click="openLocationPicker('from')"
                >
                  <template v-slot:append-inner>
                    <v-btn
                      v-if="fromLocation"
                      icon="mdi-close"
                      variant="text"
                      size="small"
                      color="grey-darken-1"
                      @click.stop="clearFromLocation"
                    ></v-btn>
                  </template>
                </v-text-field>
              </div>

              <!-- To Location -->
              <div class="location-input-wrapper">
                <v-text-field
                  v-model="toLocation"
                  label="Điểm đến"
                  variant="outlined"
                  prepend-inner-icon="mdi-flag"
                  placeholder="Nhập điểm đến"
                  rounded="lg"
                  hide-details
                  color="green-lighten-1"
                  @click="openLocationPicker('to')"
                >
                  <template v-slot:append-inner>
                    <v-btn
                      v-if="toLocation"
                      icon="mdi-close"
                      variant="text"
                      size="small"
                      color="grey-darken-1"
                      @click.stop="clearToLocation"
                    ></v-btn>
                  </template>
                </v-text-field>
              </div>

              <!-- Swap Button -->
              <div class="swap-button-wrapper">
                <v-btn
                  icon="mdi-swap-vertical"
                  variant="text"
                  color="green-lighten-1"
                  size="large"
                  @click="swapLocations"
                ></v-btn>
              </div>
            </div>
          </div>

          <!-- Location Picker -->
          <div v-if="showLocationPicker" class="location-picker">
            <!-- Current Location & Saved Locations Tags -->
            <div class="location-tags mb-4">
              <!-- Current Location Tag -->
              <v-chip
                v-if="showCurrentLocation"
                class="location-tag mb-2 mr-2"
                color="green-lighten-1"
                variant="tonal"
                @click="selectLocation(currentLocation)"
              >
                <v-icon start>mdi-crosshairs-gps</v-icon>
                {{ currentLocation.name }}
              </v-chip>

              <!-- Saved Locations Tags -->
              <v-chip
                v-for="location in savedLocations"
                :key="location.id"
                class="location-tag mb-2 mr-2"
                color="green-lighten-1"
                variant="outlined"
                @click="selectLocation(location)"
              >
                <v-icon start>{{ location.icon }}</v-icon>
                {{ location.name }}
              </v-chip>
            </div>

            <!-- Recent Locations -->
            <div v-if="recentLocations.length > 0" class="mb-6">
              <h3 class="text-h6 font-weight-bold mb-3">Địa điểm gần đây</h3>
              <div class="recent-locations">
                <v-card
                  v-for="location in recentLocations.slice(0, 5)"
                  :key="location.id"
                  class="location-item mb-2"
                  elevation="1"
                  rounded="lg"
                  @click="selectLocation(location)"
                >
                  <v-card-text class="pa-3">
                    <div class="d-flex align-center">
                      <v-icon color="green-lighten-1" class="mr-3">{{ location.icon }}</v-icon>
                      <div class="flex-grow-1">
                        <p class="text-body-2 font-weight-medium">{{ location.name }}</p>
                        <p class="text-caption text-grey-darken-1">{{ location.address }}</p>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="location-footer pa-4">
          <div class="d-flex justify-center gap-3">
            <v-btn
              variant="outlined"
              color="green-lighten-1"
              @click="openLocationSheet = false"
            >
              Hủy
            </v-btn>
            <v-btn
              color="green-lighten-1"
              @click="confirmLocations"
            >
              Xác nhận
            </v-btn>
          </div>
        </div>
      </v-sheet>
    </v-bottom-sheet>

    <!-- Time Selection Bottom Sheet -->
    <v-bottom-sheet v-model="openTimeSheet" scrollable>
      <v-sheet class="pa-6">
        <div class="d-flex align-center justify-space-between mb-4">
          <h2 class="text-h5 font-weight-bold">Chọn thời gian khởi hành</h2>
          <v-btn
            icon="mdi-close"
            variant="text"
            @click="openTimeSheet = false"
          ></v-btn>
        </div>

        <!-- Date Input -->
        <div class="mb-4">
          <v-text-field
            v-model="selectedDate"
            label="Chọn ngày"
            type="date"
            variant="outlined"
            color="green-lighten-1"
            :min="minDate"
            :max="maxDate"
            prepend-inner-icon="mdi-calendar"
            readonly
            @click="showDatePicker = true"
          ></v-text-field>
        </div>

        <!-- Date Picker Dialog -->
        <v-dialog v-model="showDatePicker" max-width="400">
          <v-card>
            <v-card-title class="d-flex align-center justify-space-between">
              <span>Chọn ngày</span>
              <v-btn icon="mdi-close" variant="text" @click="showDatePicker = false"></v-btn>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-date-picker
                v-model="selectedDate"
                color="green-lighten-1"
                :min="minDate"
                :max="maxDate"
                show-adjacent-months
                hide-header
                @update:model-value="onDateSelected"
              ></v-date-picker>
            </v-card-text>
          </v-card>
        </v-dialog>

        <!-- Time Picker Direct -->
        <div class="mb-4">
          <div class="time-picker-container">
            <div class="time-display mb-3">
              <div class="selected-time">
                {{ selectedHour.toString().padStart(2, '0') }}:{{ selectedMinute.toString().padStart(2, '0') }}
              </div>
            </div>

            <div class="time-scrolls">
              <!-- Hour Scroll -->
              <div class="time-scroll">
                <div class="scroll-label">Giờ</div>
                <div class="hour-scroll">
                  <div
                    v-for="hour in hours"
                    :key="hour"
                    :class="['time-item', { 'selected': selectedHour === hour }]"
                    @click="selectHour(hour)"
                  >
                    {{ hour.toString().padStart(2, '0') }}
                  </div>
                </div>
              </div>

              <!-- Minute Scroll -->
              <div class="time-scroll">
                <div class="scroll-label">Phút</div>
                <div class="minute-scroll">
                  <div
                    v-for="minute in minutes"
                    :key="minute"
                    :class="['time-item', { 'selected': selectedMinute === minute }]"
                    @click="selectMinute(minute)"
                  >
                    {{ minute.toString().padStart(2, '0') }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Time Options -->
        <div class="mb-4">
          <h3 class="text-h6 font-weight-bold mb-3">Thời gian nhanh</h3>

          <!-- Quick Time Chips -->
          <div class="quick-time-chips mb-4">
            <v-chip
              v-for="time in quickTimes"
              :key="time.value"
              class="time-chip"
              :color="selectedTime === time.value ? 'green-lighten-1' : 'grey-darken-1'"
              :variant="selectedTime === time.value ? 'flat' : 'outlined'"
              @click="selectQuickTime(time.value)"
            >
              {{ time.label }}
            </v-chip>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons">
            <v-btn
              color="green-lighten-1"
              variant="elevated"
              size="large"
              block
              class="action-btn mb-2"
              @click="departNow"
            >
              <v-icon start>mdi-rocket-launch</v-icon>
              Xuất phát ngay
            </v-btn>

            <v-btn
              color="green-lighten-1"
              variant="outlined"
              size="large"
              block
              class="action-btn"
              @click="setCurrentTime"
            >
              <v-icon start>mdi-clock-outline</v-icon>
              Bây giờ
            </v-btn>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="location-footer pa-4">
          <div class="d-flex justify-center gap-3">
            <v-btn
              variant="outlined"
              color="green-lighten-1"
              @click="openTimeSheet = false"
            >
              Hủy
            </v-btn>
            <v-btn
              color="green-lighten-1"
              @click="confirmTime"
            >
              Xác nhận
            </v-btn>
          </div>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </v-container>
</template>

<script setup lang="ts">
import {ref, computed, nextTick} from 'vue'
import {useAuthStore} from '@/stores/auth'
import { 
  getCurrentDate, 
  getDateRange, 
  getCurrentTimeRounded, 
  formatTime, 
  getTimeInMinutes, 
  formatDateTime
} from '@/utils/dateTime'
import { DATE_TIME_CONFIG } from '@/config/dateTime'

const authStore = useAuthStore()
const user = computed(() => authStore.user)

// Location states
const openLocationSheet = ref(false)
const fromLocation = ref('')
const toLocation = ref('')
const selectedDestination = ref('')
const showLocationPicker = ref(false)
const currentInputType = ref('from') // 'from' or 'to'

        // Time states
        const openTimeSheet = ref(false)
        const showDatePicker = ref(false)
        const selectedDate = ref(getCurrentDate())
        const selectedTime = ref('')
        const selectedDateTime = ref('')
        const selectedHour = ref(0)
        const selectedMinute = ref(0)

// Time options
const hours = ref(Array.from({length: 24}, (_, i) => i))
const minutes = ref(Array.from({length: 6}, (_, i) => i * 10))

// Current location
const currentLocation = ref({
  id: 'current',
  name: 'Vị trí hiện tại',
  address: 'Đang xác định vị trí...',
  icon: 'mdi-crosshairs-gps'
})

// Saved locations
const savedLocations = ref([
  {id: 1, name: 'Nhà', address: '123 Đường ABC, Quận 1', icon: 'mdi-home'},
  {id: 2, name: 'Công ty', address: '456 Đường XYZ, Quận 3', icon: 'mdi-office-building'}
])

// Recent locations
const recentLocations = ref([
  {id: 3, name: 'Trung tâm thương mại', address: '789 Đường DEF, Quận 5', icon: 'mdi-shopping'},
  {id: 4, name: 'Sân bay', address: '321 Đường GHI, Quận 7', icon: 'mdi-airplane'},
  {id: 5, name: 'Bệnh viện', address: '654 Đường JKL, Quận 2', icon: 'mdi-hospital'},
  {id: 6, name: 'Trường học', address: '987 Đường MNO, Quận 4', icon: 'mdi-school'},
  {id: 7, name: 'Công viên', address: '147 Đường PQR, Quận 6', icon: 'mdi-park'}
])

// Quick time options
const quickTimes = ref(
  DATE_TIME_CONFIG.QUICK_TIME_OPTIONS.map(option => ({
    ...option,
    value: option.isAction ? 'now' : getTimeInMinutes(option.minutes!)
  }))
)

// Computed properties
const showCurrentLocation = computed(() => {
  // Only show current location if the other input doesn't have it
  if (currentInputType.value === 'from') {
    return toLocation.value !== currentLocation.value.name
  } else {
    return fromLocation.value !== currentLocation.value.name
  }
})

const dateRange = computed(() => getDateRange(DATE_TIME_CONFIG.DEFAULT_DATE_RANGE_DAYS))
const minDate = computed(() => dateRange.value.min)
const maxDate = computed(() => dateRange.value.max)


// Methods
const openLocationPicker = (type: 'from' | 'to') => {
  currentInputType.value = type
  showLocationPicker.value = true
}

const selectLocation = (location: any) => {
  if (currentInputType.value === 'from') {
    fromLocation.value = location.name
  } else {
    toLocation.value = location.name
  }
  showLocationPicker.value = false
}

const swapLocations = () => {
  const temp = fromLocation.value
  fromLocation.value = toLocation.value
  toLocation.value = temp
}

const confirmLocations = () => {
  if (fromLocation.value && toLocation.value) {
    selectedDestination.value = `${fromLocation.value} → ${toLocation.value}`
  } else if (toLocation.value) {
    selectedDestination.value = toLocation.value
  }
  showLocationPicker.value = false
  openLocationSheet.value = false
}

const confirmTime = () => {
  selectedDateTime.value = formatDateTime(selectedDate.value, selectedTime.value)
  openTimeSheet.value = false
}

const selectQuickTime = (time: string) => {
  if (time === 'now') {
    departNow()
    return
  }
  selectedTime.value = time
  const [hour, minute] = time.split(':')
  selectedHour.value = parseInt(hour)
  selectedMinute.value = parseInt(minute)

  // Auto scroll to selected time
  nextTick(() => {
    scrollToCurrentTime()
  })
}

const selectHour = (hour: number) => {
  selectedHour.value = hour
  updateSelectedTime()
  nextTick(() => {
    scrollToCurrentTime()
  })
}

const selectMinute = (minute: number) => {
  selectedMinute.value = minute
  updateSelectedTime()
  nextTick(() => {
    scrollToCurrentTime()
  })
}

const updateSelectedTime = () => {
  selectedTime.value = formatTime(selectedHour.value, selectedMinute.value)
}

const clearFromLocation = () => {
  fromLocation.value = ''
}

const clearToLocation = () => {
  toLocation.value = ''
}

const departNow = () => {
  const timeData = getCurrentTimeRounded()
  selectedDate.value = timeData.date
  selectedHour.value = timeData.hour
  selectedMinute.value = timeData.minute
  updateSelectedTime()
  confirmTime()
}

const initializeTimeSheet = () => {
  const timeData = getCurrentTimeRounded() // Use current time without adding minutes
  selectedDate.value = timeData.date
  selectedHour.value = timeData.hour
  selectedMinute.value = timeData.minute
  updateSelectedTime()

  // Auto scroll to current values
  nextTick(() => {
    scrollToCurrentTime()
  })
}

const onDateSelected = (date: any) => {
  // Ensure date is in yyyy-MM-dd format
  if (date instanceof Date) {
    selectedDate.value = formatDateToLocal(date)
  } else if (typeof date === 'string') {
    selectedDate.value = date
  }
  showDatePicker.value = false
}

const scrollToCurrentTime = () => {
  // Scroll to selected hour
  const hourElement = document.querySelector(`.hour-scroll .time-item.selected`)
  if (hourElement) {
    hourElement.scrollIntoView({behavior: 'smooth', block: 'center'})
  }

  // Scroll to selected minute
  const minuteElement = document.querySelector(`.minute-scroll .time-item.selected`)
  if (minuteElement) {
    minuteElement.scrollIntoView({behavior: 'smooth', block: 'center'})
  }
}


const setCurrentTime = () => {
  const timeData = getCurrentTimeRounded()
  selectedDate.value = timeData.date
  selectedHour.value = timeData.hour
  selectedMinute.value = timeData.minute
  updateSelectedTime()
  confirmTime()
}
</script>

<style scoped>
.booking-container {
  min-height: 100vh;
}

.header-section {
  position: relative;
  padding-top: 60px; /* Account for app bar */
  overflow: hidden;
  min-height: 50vw;
}

.header-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.header-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.header-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.header-top {
  flex-shrink: 0;
}

.header-bottom {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.greeting-section h1 {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.points-section {
  background: rgba(0, 0, 0, 0.5);
  padding: 4px 10px 0;
  border-radius: 25px;
  backdrop-filter: blur(15px);
}

.welcome-card {
  max-width: 300px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.search-section {
  background: #f8f9fa;
}

.search-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.search-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.15);
}

.service-section {
  background: #f8f9fa;
  min-height: 120px;
}

.service-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.service-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.15);
}

/* Location Sheet Styles */
.location-sheet {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.location-header {
  background: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
  flex-shrink: 0;
}

.location-content {
  flex: 1;
  overflow-y: auto;
}

.location-footer {
  background: #f8f9fa;
  border-top: 1px solid #e0e0e0;
  flex-shrink: 0;
}

.recent-locations {
  /*max-height: 300px;*/
  /*overflow-y: auto;*/
}

.location-item {
  transition: all 0.3s ease;
  cursor: pointer;
}

.location-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.1);
}

.gap-3 {
  gap: 12px;
}

/* Time Selection */
.time-chip {
  cursor: pointer;
  transition: all 0.3s ease;
}

.time-chip:hover {
  transform: translateY(-1px);
}

/* Time Picker Scrolls */
.time-picker-container {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8f5e8;
}


/* Quick Time Options */
.quick-time-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.action-btn {
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: none;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
}

.time-display {
  text-align: center;
}

.selected-time {
  font-size: 1.8rem;
  font-weight: 700;
  color: #4caf50;
  text-shadow: 0 1px 3px rgba(76, 175, 80, 0.2);
  letter-spacing: 1px;
}

.time-scrolls {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 12px;
}

.time-scroll {
  flex: 1;
  max-width: 80px;
}

.scroll-label {
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: #666;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.hour-scroll,
.minute-scroll {
  max-height: 140px;
  overflow-y: auto;
  padding: 6px;
  border-radius: 8px;
  background: #f8f9fa;
  border: 1px solid #e8f5e8;
  scrollbar-width: thin;
  scrollbar-color: #4caf50 #f8f9fa;
}

.hour-scroll::-webkit-scrollbar,
.minute-scroll::-webkit-scrollbar {
  width: 3px;
}

.hour-scroll::-webkit-scrollbar-track,
.minute-scroll::-webkit-scrollbar-track {
  background: #f8f9fa;
  border-radius: 2px;
}

.hour-scroll::-webkit-scrollbar-thumb,
.minute-scroll::-webkit-scrollbar-thumb {
  background: #4caf50;
  border-radius: 2px;
}

.time-item {
  padding: 8px 6px;
  margin: 2px 0;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  font-size: 0.9rem;
  color: #666;
  background: transparent;
}

.time-item:hover {
  background: rgba(76, 175, 80, 0.1);
  color: #4caf50;
  transform: scale(1.02);
}

.time-item.selected {
  background: #4caf50;
  color: white;
  font-weight: 700;
  box-shadow: 0 1px 4px rgba(76, 175, 80, 0.3);
  transform: scale(1.05);
}

/* Depart Now Button */
.depart-now-section {
  margin-top: 8px;
}

.depart-now-btn {
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: none;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
}

.depart-now-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
}

/* Location Inputs */
.location-inputs {
  padding: 0;
}

.location-inputs-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.location-input-wrapper {
  width: calc(100% - 40px);
  margin-right: 40px;
}

.swap-button-wrapper {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

/* Location Picker */
.location-picker {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
}

/* Location Tags */
.location-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.location-tag {
  cursor: pointer;
  transition: all 0.3s ease;
}

.location-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.recent-locations {
  /*max-height: 200px;*/
  /*overflow-y: auto;*/
}
</style>
