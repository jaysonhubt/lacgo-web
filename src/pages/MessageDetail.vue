<template>
  <div class="message-detail-container">
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
      
      <div class="header-info">
        <v-avatar size="40" :color="contact.avatar ? '' : 'white'">
          <v-img v-if="contact.avatar" :src="contact.avatar"></v-img>
          <v-icon v-else color="green-lighten-1">mdi-account</v-icon>
        </v-avatar>
        <div class="contact-info">
          <h3 class="contact-name">{{ contact.name }}</h3>
          <p class="contact-status">{{ contact.status }}</p>
        </div>
      </div>

      <v-btn
        icon
        variant="text"
        color="white"
        @click="openOptions"
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </div>

    <!-- Messages -->
    <div class="messages-wrapper" ref="messagesWrapper">
      <div class="messages-content">
        <!-- Date Divider -->
        <div class="date-divider">
          <span>Hôm nay</span>
        </div>

        <!-- Message Items -->
        <div
          v-for="message in chatMessages"
          :key="message.id"
          :class="['message-bubble', message.isMine ? 'mine' : 'theirs']"
        >
          <div class="bubble-content">
            <p class="message-text">{{ message.text }}</p>
            <span class="message-time">{{ message.time }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="input-area">
      <v-text-field
        v-model="newMessage"
        placeholder="Nhập tin nhắn..."
        variant="outlined"
        density="comfortable"
        hide-details
        class="message-input"
        @keypress.enter="sendMessage"
      >
        <template v-slot:prepend-inner>
          <v-btn
            icon
            variant="text"
            size="small"
            @click="attachFile"
          >
            <v-icon size="20">mdi-paperclip</v-icon>
          </v-btn>
        </template>
      </v-text-field>

      <v-btn
        icon
        color="green-lighten-1"
        :disabled="!newMessage.trim()"
        @click="sendMessage"
        class="send-btn"
      >
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Refs
const messagesWrapper = ref<HTMLElement | null>(null)
const newMessage = ref('')

// State
const contact = ref({
  id: 1,
  name: 'Tài xế Nguyễn Văn A',
  avatar: '',
  status: 'Đang hoạt động',
})

const chatMessages = ref([
  {
    id: 1,
    text: 'Xin chào! Tôi đang trên đường đến điểm đón',
    time: '10:30',
    isMine: false,
  },
  {
    id: 2,
    text: 'Chào anh! Khoảng bao lâu nữa ạ?',
    time: '10:31',
    isMine: true,
  },
  {
    id: 3,
    text: 'Khoảng 5 phút nữa. Anh vui lòng chuẩn bị nhé',
    time: '10:32',
    isMine: false,
  },
  {
    id: 4,
    text: 'Vâng, em đã sẵn sàng rồi ạ',
    time: '10:32',
    isMine: true,
  },
  {
    id: 5,
    text: 'Tôi đã đến điểm đón rồi ạ',
    time: '10:35',
    isMine: false,
  },
])

// Methods
const goBack = () => {
  router.back()
}

const openOptions = () => {
  // Open options menu
}

const attachFile = () => {
  // Attach file
}

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  chatMessages.value.push({
    id: chatMessages.value.length + 1,
    text: newMessage.value,
    time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    isMine: true,
  })

  newMessage.value = ''

  nextTick(() => {
    scrollToBottom()
  })
}

const scrollToBottom = () => {
  if (messagesWrapper.value) {
    messagesWrapper.value.scrollTop = messagesWrapper.value.scrollHeight
  }
}

onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped>
.message-detail-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
}

/* Header */
.header {
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
  padding: 60px 16px 16px;
  color: white;
  box-shadow: 0 2px 12px rgba(76, 175, 80, 0.2);
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.header-info {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.contact-info {
  flex: 1;
  min-width: 0;
}

.contact-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 2px 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.contact-status {
  font-size: 0.85rem;
  margin: 0;
  opacity: 0.9;
}

/* Messages Wrapper */
.messages-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 20px 16px;
  background: #f8f9fa;
}

.messages-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Date Divider */
.date-divider {
  text-align: center;
  margin: 16px 0;
}

.date-divider span {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  font-size: 0.8rem;
  color: #757575;
  font-weight: 500;
}

/* Message Bubbles */
.message-bubble {
  display: flex;
  margin-bottom: 4px;
}

.message-bubble.mine {
  justify-content: flex-end;
}

.message-bubble.theirs {
  justify-content: flex-start;
}

.bubble-content {
  max-width: 75%;
  padding: 12px 16px;
  border-radius: 18px;
  position: relative;
  animation: bubbleIn 0.3s ease-out;
}

@keyframes bubbleIn {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.message-bubble.mine .bubble-content {
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
  color: white;
  border-bottom-right-radius: 4px;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.25);
}

.message-bubble.theirs .bubble-content {
  background: white;
  color: #424242;
  border-bottom-left-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
}

.message-text {
  margin: 0 0 4px 0;
  font-size: 0.95rem;
  line-height: 1.5;
  word-wrap: break-word;
}

.message-time {
  font-size: 0.7rem;
  opacity: 0.7;
}

.message-bubble.mine .message-time {
  color: white;
}

.message-bubble.theirs .message-time {
  color: #757575;
}

/* Input Area */
.input-area {
  padding: 12px 16px;
  background: white;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;
}

.message-input {
  flex: 1;
}

.send-btn {
  flex-shrink: 0;
}

/* Responsive */
@media (max-width: 480px) {
  .messages-wrapper {
    padding: 16px 12px;
  }

  .bubble-content {
    max-width: 85%;
  }

  .input-area {
    padding: 10px 12px;
  }
}
</style>

