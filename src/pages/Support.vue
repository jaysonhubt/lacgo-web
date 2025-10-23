<template>
  <div class="support-container">
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
      
      <h1 class="title">Liên hệ hỗ trợ</h1>
      <div style="width: 40px"></div>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Contact Methods -->
      <div class="contact-methods">
        <h3 class="section-title">Chọn phương thức liên hệ</h3>
        
        <div
          v-for="method in contactMethods"
          :key="method.id"
          class="contact-card"
          @click="selectMethod(method)"
        >
          <div class="contact-icon" :class="method.type">
            <v-icon color="white" size="28">{{ method.icon }}</v-icon>
          </div>
          
          <div class="contact-info">
            <h4 class="contact-title">{{ method.title }}</h4>
            <p class="contact-desc">{{ method.description }}</p>
            <div v-if="method.hours" class="contact-hours">
              <v-icon size="14" color="grey-darken-1">mdi-clock-outline</v-icon>
              <span>{{ method.hours }}</span>
            </div>
          </div>

          <v-icon color="grey-lighten-1" size="20">mdi-chevron-right</v-icon>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="contact-form-section">
        <h3 class="section-title">Gửi yêu cầu hỗ trợ</h3>
        
        <v-card class="form-card" elevation="0" rounded="xl">
          <v-card-text class="pa-4">
            <v-select
              v-model="form.category"
              label="Danh mục"
              variant="outlined"
              color="green-lighten-1"
              :items="categories"
              prepend-inner-icon="mdi-format-list-bulleted"
            ></v-select>

            <v-text-field
              v-model="form.subject"
              label="Tiêu đề"
              variant="outlined"
              color="green-lighten-1"
              prepend-inner-icon="mdi-text"
              class="mt-4"
            ></v-text-field>

            <v-textarea
              v-model="form.message"
              label="Nội dung"
              variant="outlined"
              color="green-lighten-1"
              prepend-inner-icon="mdi-message-text"
              rows="5"
              class="mt-4"
            ></v-textarea>

            <v-file-input
              v-model="form.attachments"
              label="Đính kèm file (tùy chọn)"
              variant="outlined"
              color="green-lighten-1"
              prepend-icon=""
              prepend-inner-icon="mdi-paperclip"
              multiple
              chips
              class="mt-4"
            ></v-file-input>

            <v-btn
              color="green-lighten-1"
              size="large"
              block
              rounded="lg"
              class="mt-4"
              @click="submitForm"
              :disabled="!canSubmit"
            >
              <v-icon start>mdi-send</v-icon>
              Gửi yêu cầu
            </v-btn>
          </v-card-text>
        </v-card>
      </div>

      <!-- FAQ Quick Links -->
      <div class="faq-links">
        <h3 class="section-title">Hoặc tìm câu trả lời ngay</h3>
        <v-btn
          variant="outlined"
          color="green-lighten-1"
          size="large"
          block
          rounded="lg"
          @click="goToHelpCenter"
        >
          <v-icon start>mdi-help-circle</v-icon>
          Trung tâm trợ giúp
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Contact methods
const contactMethods = ref([
  {
    id: 1,
    type: 'chat',
    title: 'Chat trực tuyến',
    description: 'Trò chuyện với nhân viên hỗ trợ',
    icon: 'mdi-message-text',
    hours: 'Thứ 2 - Chủ nhật, 8:00 - 22:00',
  },
  {
    id: 2,
    type: 'phone',
    title: 'Gọi điện',
    description: 'Hotline: 1900 xxxx',
    icon: 'mdi-phone',
    hours: '24/7',
  },
  {
    id: 3,
    type: 'email',
    title: 'Email',
    description: 'support@lacgo.vn',
    icon: 'mdi-email',
    hours: 'Phản hồi trong 24h',
  },
])

// Form
const form = ref({
  category: '',
  subject: '',
  message: '',
  attachments: [],
})

const categories = ref([
  'Vấn đề đặt xe',
  'Vấn đề thanh toán',
  'Tài xế',
  'Ưu đãi & Voucher',
  'Tài khoản',
  'Khác',
])

// Computed
const canSubmit = computed(() => {
  return form.value.category && form.value.subject && form.value.message
})

// Methods
const goBack = () => {
  router.back()
}

const selectMethod = (method: any) => {
  switch (method.type) {
    case 'chat':
      // Open chat
      router.push('/messages')
      break
    case 'phone':
      // Open phone dialer
      window.location.href = 'tel:1900xxxx'
      break
    case 'email':
      // Open email client
      window.location.href = 'mailto:support@lacgo.vn'
      break
  }
}

const submitForm = () => {
  // Submit support request
  console.log('Form submitted:', form.value)
  router.back()
}

const goToHelpCenter = () => {
  router.push('/help-center')
}
</script>

<style scoped>
.support-container {
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

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #424242;
  margin: 0 0 16px 0;
}

/* Contact Methods */
.contact-methods {
  margin-bottom: 32px;
}

.contact-card {
  background: white;
  border-radius: 16px;
  padding: 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-2px) translateX(4px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.15);
}

.contact-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contact-icon.chat {
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
}

.contact-icon.phone {
  background: linear-gradient(135deg, #2196f3 0%, #42a5f5 100%);
}

.contact-icon.email {
  background: linear-gradient(135deg, #ff9800 0%, #ffa726 100%);
}

.contact-info {
  flex: 1;
  min-width: 0;
}

.contact-title {
  font-size: 1rem;
  font-weight: 600;
  color: #424242;
  margin: 0 0 4px 0;
}

.contact-desc {
  font-size: 0.85rem;
  color: #757575;
  margin: 0 0 6px 0;
}

.contact-hours {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: #9e9e9e;
}

/* Contact Form */
.contact-form-section {
  margin-bottom: 32px;
}

.form-card {
  background: white;
  border: 1px solid #e0e0e0;
}

/* FAQ Links */
.faq-links {
  margin-top: 24px;
}

/* Responsive */
@media (max-width: 480px) {
  .content {
    padding: 16px 12px;
  }

  .contact-card {
    padding: 16px;
  }

  .contact-icon {
    width: 48px;
    height: 48px;
  }
}
</style>

