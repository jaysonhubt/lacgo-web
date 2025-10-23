<template>
  <div class="notifications-container">
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
      
      <h1 class="title">Thông báo</h1>

      <v-btn
        icon
        variant="text"
        color="white"
        @click="markAllAsRead"
      >
        <v-icon>mdi-check-all</v-icon>
      </v-btn>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Tabs -->
      <v-tabs
        v-model="activeTab"
        color="green-lighten-1"
        class="tabs"
      >
        <v-tab value="all">Tất cả</v-tab>
        <v-tab value="unread">Chưa đọc</v-tab>
      </v-tabs>

      <!-- Notifications List -->
      <div class="notifications-list">
        <div
          v-for="(notification, index) in filteredNotifications"
          :key="notification.id"
          class="notification-item"
          :class="{ 'unread': !notification.read }"
          :style="{ animationDelay: `${index * 0.05}s` }"
          @click="openNotification(notification)"
        >
          <div class="notification-icon" :class="notification.type">
            <v-icon color="white" size="24">{{ getNotificationIcon(notification.type) }}</v-icon>
          </div>

          <div class="notification-content">
            <h3 class="notification-title">{{ notification.title }}</h3>
            <p class="notification-message">{{ notification.message }}</p>
            <span class="notification-time">{{ notification.time }}</span>
          </div>

          <div v-if="!notification.read" class="unread-dot"></div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredNotifications.length === 0" class="empty-state">
          <v-icon size="80" color="grey-lighten-2">mdi-bell-outline</v-icon>
          <h3>Chưa có thông báo</h3>
          <p>Thông báo của bạn sẽ xuất hiện ở đây</p>
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
const activeTab = ref('all')

// Sample notifications
const notifications = ref([
  {
    id: 1,
    type: 'trip',
    title: 'Chuyến đi hoàn thành',
    message: 'Chuyến đi của bạn từ Cầu Giấy đến Phú Thọ đã hoàn thành',
    time: '5 phút trước',
    read: false,
  },
  {
    id: 2,
    type: 'promo',
    title: 'Ưu đãi mới',
    message: 'Giảm 50K cho chuyến đi tiếp theo. Áp dụng ngay!',
    time: '1 giờ trước',
    read: false,
  },
  {
    id: 3,
    type: 'message',
    title: 'Tin nhắn mới',
    message: 'Tài xế Nguyễn Văn A đã gửi tin nhắn cho bạn',
    time: '2 giờ trước',
    read: true,
  },
  {
    id: 4,
    type: 'payment',
    title: 'Thanh toán thành công',
    message: 'Bạn đã thanh toán 250.000đ cho chuyến đi',
    time: '1 ngày trước',
    read: true,
  },
  {
    id: 5,
    type: 'system',
    title: 'Cập nhật hệ thống',
    message: 'Ứng dụng có phiên bản mới. Cập nhật ngay!',
    time: '2 ngày trước',
    read: true,
  },
  {
    id: 6,
    type: 'points',
    title: 'Nhận điểm thưởng',
    message: 'Bạn đã nhận được 50 điểm từ chuyến đi',
    time: '3 ngày trước',
    read: true,
  },
])

// Computed
const filteredNotifications = computed(() => {
  if (activeTab.value === 'unread') {
    return notifications.value.filter(n => !n.read)
  }
  return notifications.value
})

// Methods
const goBack = () => {
  router.back()
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'trip':
      return 'mdi-car'
    case 'promo':
      return 'mdi-gift'
    case 'message':
      return 'mdi-message'
    case 'payment':
      return 'mdi-credit-card'
    case 'system':
      return 'mdi-cog'
    case 'points':
      return 'mdi-leaf'
    default:
      return 'mdi-bell'
  }
}

const openNotification = (notification: any) => {
  notification.read = true
  // Navigate based on notification type
  switch (notification.type) {
    case 'trip':
      router.push('/trips')
      break
    case 'promo':
      router.push('/gift')
      break
    case 'message':
      router.push('/messages')
      break
    default:
      break
  }
}

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true)
}
</script>

<style scoped>
.notifications-container {
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
  background: white;
}

/* Tabs */
.tabs {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* Notifications List */
.notifications-list {
  background: #f8f9fa;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 20px;
  background: white;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  animation: slideInRight 0.4s ease-out backwards;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.notification-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: linear-gradient(90deg, rgba(76, 175, 80, 0.05), transparent);
  transition: width 0.3s ease;
}

.notification-item:hover::before {
  width: 100%;
}

.notification-item:hover {
  background: #f8fdf8;
  transform: translateX(4px);
}

.notification-item:active {
  transform: translateX(2px) scale(0.98);
}

.notification-item.unread {
  background: #f8fdf8;
  border-left: 3px solid #4caf50;
}

.notification-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.notification-icon.trip {
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
}

.notification-icon.promo {
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%);
}

.notification-icon.message {
  background: linear-gradient(135deg, #4c6ef5 0%, #748ffc 100%);
}

.notification-icon.payment {
  background: linear-gradient(135deg, #fa5252 0%, #ff6b6b 100%);
}

.notification-icon.system {
  background: linear-gradient(135deg, #9e9e9e 0%, #bdbdbd 100%);
}

.notification-icon.points {
  background: linear-gradient(135deg, #66bb6a 0%, #81c784 100%);
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-size: 1rem;
  font-weight: 600;
  color: #424242;
  margin: 0 0 6px 0;
}

.notification-message {
  font-size: 0.9rem;
  color: #757575;
  margin: 0 0 6px 0;
  line-height: 1.4;
}

.notification-time {
  font-size: 0.8rem;
  color: #9e9e9e;
}

.unread-dot {
  width: 8px;
  height: 8px;
  background: #4caf50;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 6px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-state h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #424242;
  margin: 16px 0 8px 0;
}

.empty-state p {
  font-size: 1rem;
  color: #666;
  margin: 0;
}

/* Responsive */
@media (max-width: 480px) {
  .notification-item {
    padding: 14px 16px;
  }

  .notification-icon {
    width: 44px;
    height: 44px;
  }
}
</style>

