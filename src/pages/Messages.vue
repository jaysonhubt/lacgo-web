<template>
  <div class="messages-container">
    <!-- Header -->
    <div class="header">
      <div class="header-content">
        <h1 class="title">Tin nhắn</h1>
        <v-btn
          icon
          variant="text"
          color="white"
          @click="openSearch"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </div>
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

      <!-- Messages List -->
      <div class="messages-list">
        <div
          v-for="(message, index) in filteredMessages"
          :key="message.id"
          class="message-item"
          :style="{ animationDelay: `${index * 0.05}s` }"
          @click="goToMessageDetail(message)"
        >
          <div class="message-avatar">
            <v-badge
              :model-value="message.unread > 0"
              :content="message.unread"
              color="red-lighten-1"
              offset-x="-4"
              offset-y="-4"
              class="avatar-badge"
            >
              <v-avatar size="56" :color="message.avatar ? '' : 'green-lighten-1'">
                <v-img v-if="message.avatar" :src="message.avatar"></v-img>
                <v-icon v-else color="white" size="28">mdi-account</v-icon>
              </v-avatar>
            </v-badge>
            <div v-if="message.isDriver" class="driver-badge">
              <v-icon size="12" color="white">mdi-steering</v-icon>
            </div>
          </div>

          <div class="message-content">
            <div class="message-header">
              <h3 class="contact-name">{{ message.name }}</h3>
              <span class="message-time">{{ message.time }}</span>
            </div>
            <div class="message-preview">
              <p class="last-message" :class="{ 'unread': message.unread > 0 }">
                <v-icon v-if="!message.unread" size="14" color="blue-lighten-1" class="read-icon">mdi-check-all</v-icon>
                {{ message.lastMessage }}
              </p>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredMessages.length === 0" class="empty-state">
          <v-icon size="80" color="grey-lighten-2">mdi-message-outline</v-icon>
          <h3>Chưa có tin nhắn</h3>
          <p>Tin nhắn của bạn sẽ xuất hiện ở đây</p>
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

// Sample messages data
const messages = ref([
  {
    id: 1,
    name: 'Tài xế Nguyễn Văn A',
    avatar: '',
    lastMessage: 'Tôi đã đến điểm đón rồi ạ',
    time: '5 phút',
    unread: 2,
    isDriver: true,
  },
  {
    id: 2,
    name: 'Hỗ trợ LacGo',
    avatar: '',
    lastMessage: 'Xin chào! Chúng tôi có thể giúp gì cho bạn?',
    time: '2 giờ',
    unread: 0,
    isSupport: true,
  },
  {
    id: 3,
    name: 'Tài xế Trần Thị B',
    avatar: '',
    lastMessage: 'Cảm ơn bạn đã sử dụng dịch vụ',
    time: '1 ngày',
    unread: 0,
    isDriver: true,
  },
  {
    id: 4,
    name: 'Thông báo hệ thống',
    avatar: '',
    lastMessage: 'Bạn có một ưu đãi mới từ LacGo',
    time: '3 ngày',
    unread: 1,
    isSystem: true,
  },
])

// Computed
const filteredMessages = computed(() => {
  if (activeTab.value === 'unread') {
    return messages.value.filter(m => m.unread > 0)
  }
  return messages.value
})

// Methods
const goToMessageDetail = (message: any) => {
  router.push(`/messages/${message.id}`)
}

const openSearch = () => {
  // Implement search functionality
}
</script>

<style scoped>
.messages-container {
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
  align-items: center;
}

.title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

/* Content */
.content {
  background: white;
}

/* Tabs */
.tabs {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* Messages List */
.messages-list {
  background: #f8f9fa;
}

.message-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  background: white;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: slideIn 0.4s ease-out backwards;
  position: relative;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.message-item:hover {
  background: #f8fdf8;
  transform: translateX(4px);
}

.message-item:active {
  transform: scale(0.98);
}

.message-avatar {
  position: relative;
  flex-shrink: 0;
}

.driver-badge {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
  border-radius: 50%;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.contact-name {
  font-size: 1rem;
  font-weight: 600;
  color: #424242;
  margin: 0;
}

.message-time {
  font-size: 0.8rem;
  color: #9e9e9e;
  flex-shrink: 0;
  margin-left: 8px;
}

.message-preview {
  display: flex;
  align-items: center;
  gap: 8px;
}

.last-message {
  font-size: 0.9rem;
  color: #757575;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.last-message.unread {
  font-weight: 600;
  color: #424242;
}

.read-icon {
  margin-right: 4px;
  vertical-align: middle;
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
  .header {
    padding: 16px;
  }

  .title {
    font-size: 1.5rem;
  }

  .message-item {
    padding: 14px 16px;
  }
}
</style>

