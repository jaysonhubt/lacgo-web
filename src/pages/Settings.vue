<template>
  <div class="settings-container">
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
      
      <h1 class="title">Cài đặt</h1>
      <div style="width: 40px"></div>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- General Settings -->
      <div class="settings-section">
        <h3 class="section-title">Chung</h3>
        <div class="settings-list">
          <div class="setting-item">
            <div class="setting-left">
              <v-icon color="green-lighten-1" size="22">mdi-bell</v-icon>
              <div class="setting-info">
                <span class="setting-label">Thông báo đẩy</span>
                <span class="setting-desc">Nhận thông báo về chuyến đi</span>
              </div>
            </div>
            <v-switch
              v-model="settings.pushNotifications"
              color="green-lighten-1"
              hide-details
              inset
            ></v-switch>
          </div>

          <div class="setting-item">
            <div class="setting-left">
              <v-icon color="blue-lighten-1" size="22">mdi-email</v-icon>
              <div class="setting-info">
                <span class="setting-label">Thông báo email</span>
                <span class="setting-desc">Nhận email về ưu đãi</span>
              </div>
            </div>
            <v-switch
              v-model="settings.emailNotifications"
              color="green-lighten-1"
              hide-details
              inset
            ></v-switch>
          </div>

          <div class="setting-item">
            <div class="setting-left">
              <v-icon color="purple-lighten-1" size="22">mdi-vibrate</v-icon>
              <div class="setting-info">
                <span class="setting-label">Rung</span>
                <span class="setting-desc">Rung khi có thông báo</span>
              </div>
            </div>
            <v-switch
              v-model="settings.vibration"
              color="green-lighten-1"
              hide-details
              inset
            ></v-switch>
          </div>

          <div class="setting-item">
            <div class="setting-left">
              <v-icon color="orange-lighten-1" size="22">mdi-volume-high</v-icon>
              <div class="setting-info">
                <span class="setting-label">Âm thanh</span>
                <span class="setting-desc">Phát âm thanh thông báo</span>
              </div>
            </div>
            <v-switch
              v-model="settings.sound"
              color="green-lighten-1"
              hide-details
              inset
            ></v-switch>
          </div>
        </div>
      </div>

      <!-- Privacy Settings -->
      <div class="settings-section">
        <h3 class="section-title">Bảo mật</h3>
        <div class="settings-list">
          <div class="setting-item">
            <div class="setting-left">
              <v-icon color="green-lighten-1" size="22">mdi-shield-lock</v-icon>
              <div class="setting-info">
                <span class="setting-label">Bảo vệ dữ liệu</span>
                <span class="setting-desc">Mã hóa thông tin cá nhân</span>
              </div>
            </div>
            <v-switch
              v-model="settings.dataProtection"
              color="green-lighten-1"
              hide-details
              inset
            ></v-switch>
          </div>

          <div class="setting-item">
            <div class="setting-left">
              <v-icon color="blue-lighten-1" size="22">mdi-map-marker</v-icon>
              <div class="setting-info">
                <span class="setting-label">Vị trí</span>
                <span class="setting-desc">Cho phép truy cập vị trí</span>
              </div>
            </div>
            <v-switch
              v-model="settings.location"
              color="green-lighten-1"
              hide-details
              inset
            ></v-switch>
          </div>
        </div>
      </div>

      <!-- App Settings -->
      <div class="settings-section">
        <h3 class="section-title">Ứng dụng</h3>
        <div class="settings-list">
          <div class="setting-item clickable" @click="clearCache">
            <div class="setting-left">
              <v-icon color="grey-darken-1" size="22">mdi-cached</v-icon>
              <span class="setting-label">Xóa bộ nhớ đệm</span>
            </div>
            <v-icon color="grey-lighten-1" size="20">mdi-chevron-right</v-icon>
          </div>

          <div class="setting-item">
            <div class="setting-left">
              <v-icon color="grey-darken-1" size="22">mdi-information</v-icon>
              <span class="setting-label">Phiên bản</span>
            </div>
            <span class="setting-value">1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Settings
const settings = ref({
  pushNotifications: true,
  emailNotifications: false,
  vibration: true,
  sound: true,
  dataProtection: true,
  location: true,
})

// Methods
const goBack = () => {
  router.back()
}

const clearCache = () => {
  // Clear cache
}
</script>

<style scoped>
.settings-container {
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

/* Settings Section */
.settings-section {
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

.settings-list {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-item.clickable {
  cursor: pointer;
  transition: background 0.2s;
}

.setting-item.clickable:hover {
  background: #f8f9fa;
}

.setting-left {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
  min-width: 0;
}

.setting-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.setting-label {
  font-size: 0.95rem;
  font-weight: 500;
  color: #424242;
}

.setting-desc {
  font-size: 0.8rem;
  color: #9e9e9e;
}

.setting-value {
  font-size: 0.9rem;
  color: #757575;
}

/* Responsive */
@media (max-width: 480px) {
  .content {
    padding: 16px 12px;
  }
}
</style>

