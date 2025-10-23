<template>
  <div class="account-container">
    <!-- Header -->
    <div class="header">
      <div class="profile-section">
        <v-avatar size="80" color="white">
          <v-img v-if="user?.avatar" :src="user.avatar"></v-img>
          <v-icon v-else color="green-lighten-1" size="40">mdi-account</v-icon>
        </v-avatar>
        
        <div class="profile-info">
          <h2 class="user-name">{{ user?.name || 'Người dùng' }}</h2>
          <p class="user-phone">{{ user?.phone || '0123456789' }}</p>
        </div>

        <v-btn
          icon
          variant="text"
          color="white"
          size="small"
          @click="goToEditProfile"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>

      <!-- Stats -->
      <div class="stats-grid">
        <div class="stat-item" @click="goToPointsHistory">
          <v-icon color="white" size="24">mdi-leaf</v-icon>
          <div class="stat-info">
            <span class="stat-value">{{ user?.points || 0 }}</span>
            <span class="stat-label">Điểm</span>
          </div>
        </div>
        <div class="stat-item" @click="goToVouchers">
          <v-icon color="white" size="24">mdi-ticket</v-icon>
          <div class="stat-info">
            <span class="stat-value">{{ voucherCount }}</span>
            <span class="stat-label">Voucher</span>
          </div>
        </div>
        <div class="stat-item" @click="goToTripHistory">
          <v-icon color="white" size="24">mdi-car</v-icon>
          <div class="stat-info">
            <span class="stat-value">{{ tripCount }}</span>
            <span class="stat-label">Chuyến đi</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Account Menu -->
      <div class="menu-section">
        <h3 class="section-title">Tài khoản</h3>
        <div class="menu-list">
          <div
            v-for="item in accountMenuItems"
            :key="item.id"
            class="menu-item"
            @click="item.action"
          >
            <div class="menu-left">
              <v-icon :color="item.color" size="22">{{ item.icon }}</v-icon>
              <span class="menu-label">{{ item.label }}</span>
            </div>
            <v-icon color="grey-lighten-1" size="20">mdi-chevron-right</v-icon>
          </div>
        </div>
      </div>

      <!-- Support Menu -->
      <div class="menu-section">
        <h3 class="section-title">Hỗ trợ</h3>
        <div class="menu-list">
          <div
            v-for="item in supportMenuItems"
            :key="item.id"
            class="menu-item"
            @click="item.action"
          >
            <div class="menu-left">
              <v-icon :color="item.color" size="22">{{ item.icon }}</v-icon>
              <span class="menu-label">{{ item.label }}</span>
            </div>
            <v-icon color="grey-lighten-1" size="20">mdi-chevron-right</v-icon>
          </div>
        </div>
      </div>

      <!-- Settings Menu -->
      <div class="menu-section">
        <h3 class="section-title">Cài đặt</h3>
        <div class="menu-list">
          <div
            v-for="item in settingsMenuItems"
            :key="item.id"
            class="menu-item"
            @click="item.action"
          >
            <div class="menu-left">
              <v-icon :color="item.color" size="22">{{ item.icon }}</v-icon>
              <span class="menu-label">{{ item.label }}</span>
            </div>
            <v-icon color="grey-lighten-1" size="20">mdi-chevron-right</v-icon>
          </div>
        </div>
      </div>

      <!-- Logout Button -->
      <div class="logout-section">
        <v-btn
          color="red-lighten-1"
          variant="outlined"
          size="large"
          block
          @click="logout"
        >
          <v-icon start>mdi-logout</v-icon>
          Đăng xuất
        </v-btn>
      </div>

      <!-- App Version -->
      <div class="app-version">
        <p>Phiên bản 1.0.0</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Computed
const user = computed(() => authStore.user)
const voucherCount = ref(3)
const tripCount = ref(12)

// Menu Items
const accountMenuItems = ref([
  {
    id: 1,
    label: 'Hồ sơ cá nhân',
    icon: 'mdi-account-circle',
    color: 'green-lighten-1',
    action: () => goToEditProfile(),
  },
  {
    id: 2,
    label: 'Lịch sử chuyến đi',
    icon: 'mdi-history',
    color: 'blue-lighten-1',
    action: () => goToTripHistory(),
  },
  {
    id: 3,
    label: 'Phương thức thanh toán',
    icon: 'mdi-credit-card',
    color: 'purple-lighten-1',
    action: () => goToPaymentMethods(),
  },
  {
    id: 4,
    label: 'Địa chỉ đã lưu',
    icon: 'mdi-map-marker',
    color: 'orange-lighten-1',
    action: () => goToSavedAddresses(),
  },
])

const supportMenuItems = ref([
  {
    id: 1,
    label: 'Trung tâm trợ giúp',
    icon: 'mdi-help-circle',
    color: 'green-lighten-1',
    action: () => goToHelpCenter(),
  },
  {
    id: 2,
    label: 'Liên hệ hỗ trợ',
    icon: 'mdi-message-text',
    color: 'blue-lighten-1',
    action: () => goToSupport(),
  },
  {
    id: 3,
    label: 'Điều khoản sử dụng',
    icon: 'mdi-file-document',
    color: 'grey-darken-1',
    action: () => goToTerms(),
  },
  {
    id: 4,
    label: 'Chính sách bảo mật',
    icon: 'mdi-shield-check',
    color: 'grey-darken-1',
    action: () => goToPrivacy(),
  },
])

const settingsMenuItems = ref([
  {
    id: 1,
    label: 'Thông báo',
    icon: 'mdi-bell',
    color: 'orange-lighten-1',
    action: () => goToNotifications(),
  },
  {
    id: 2,
    label: 'Ngôn ngữ',
    icon: 'mdi-translate',
    color: 'purple-lighten-1',
    action: () => goToLanguage(),
  },
  {
    id: 3,
    label: 'Cài đặt chung',
    icon: 'mdi-cog',
    color: 'grey-darken-1',
    action: () => goToSettings(),
  },
])

// Methods
const goToEditProfile = () => {
  router.push('/account/edit-profile')
}

const goToTripHistory = () => {
  router.push('/account/trip-history')
}

const goToPaymentMethods = () => {
  router.push('/account/payment-methods')
}

const goToSavedAddresses = () => {
  router.push('/account/saved-addresses')
}

const goToPointsHistory = () => {
  router.push('/account/points-history')
}

const goToVouchers = () => {
  router.push('/gift?tab=my-vouchers')
}

const goToHelpCenter = () => {
  router.push('/help-center')
}

const goToSupport = () => {
  router.push('/support')
}

const goToTerms = () => {
  router.push('/terms')
}

const goToPrivacy = () => {
  router.push('/privacy')
}

const goToNotifications = () => {
  router.push('/notifications')
}

const goToLanguage = () => {
  router.push('/account/language')
}

const goToSettings = () => {
  router.push('/account/settings')
}

const logout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.account-container {
  min-height: 100vh;
  background: #f8f9fa;
  padding-bottom: 80px;
}

/* Header */
.header {
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
  padding: 20px 16px 24px;
  color: white;
  box-shadow: 0 2px 12px rgba(76, 175, 80, 0.2);
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 60px;
  margin-bottom: 24px;
}

.profile-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 4px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.user-phone {
  font-size: 0.95rem;
  margin: 0;
  opacity: 0.9;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.stat-item {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.stat-item::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.stat-item:hover::before {
  width: 300px;
  height: 300px;
}

.stat-item:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.stat-item:active {
  transform: translateY(-2px) scale(0.98);
}

.stat-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 2px;
}

.stat-label {
  font-size: 0.8rem;
  opacity: 0.9;
}

/* Content */
.content {
  padding: 20px 16px;
}

/* Menu Section */
.menu-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #757575;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 12px 4px;
}

.menu-list {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid #f0f0f0;
  position: relative;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: linear-gradient(90deg, rgba(76, 175, 80, 0.1), transparent);
  transition: width 0.3s ease;
}

.menu-item:hover::before {
  width: 100%;
}

.menu-item:hover {
  background: #f8fdf8;
  transform: translateX(4px);
  padding-left: 20px;
}

.menu-item:active {
  transform: translateX(2px) scale(0.98);
}

.menu-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.menu-label {
  font-size: 0.95rem;
  font-weight: 500;
  color: #424242;
}

/* Logout Section */
.logout-section {
  margin-top: 32px;
  margin-bottom: 16px;
}

/* App Version */
.app-version {
  text-align: center;
  padding: 16px 0;
}

.app-version p {
  font-size: 0.85rem;
  color: #9e9e9e;
  margin: 0;
}

/* Responsive */
@media (max-width: 480px) {
  .user-name {
    font-size: 1.3rem;
  }

  .stats-grid {
    gap: 8px;
  }

  .stat-item {
    padding: 14px 10px;
  }

  .stat-value {
    font-size: 1.3rem;
  }

  .stat-label {
    font-size: 0.75rem;
  }
}
</style>

