<template>
  <div class="help-center-container">
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
      
      <h1 class="title">Trung tâm trợ giúp</h1>
      <div style="width: 40px"></div>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Search Box -->
      <div class="search-box">
        <v-text-field
          v-model="searchQuery"
          placeholder="Tìm kiếm câu hỏi..."
          variant="outlined"
          density="comfortable"
          hide-details
          prepend-inner-icon="mdi-magnify"
          rounded="lg"
          color="green-lighten-1"
        ></v-text-field>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <h3 class="section-title">Hỗ trợ nhanh</h3>
        <div class="actions-grid">
          <div
            v-for="action in quickActions"
            :key="action.id"
            class="action-card"
            @click="handleAction(action)"
          >
            <v-icon :color="action.color" size="32">{{ action.icon }}</v-icon>
            <h4 class="action-title">{{ action.title }}</h4>
            <p class="action-desc">{{ action.description }}</p>
          </div>
        </div>
      </div>

      <!-- FAQ Categories -->
      <div class="faq-section">
        <h3 class="section-title">Câu hỏi thường gặp</h3>
        
        <v-expansion-panels variant="accordion">
          <v-expansion-panel
            v-for="category in faqCategories"
            :key="category.id"
            class="faq-category"
          >
            <v-expansion-panel-title class="category-title">
              <div class="category-header">
                <v-icon :color="category.color" size="24" class="mr-3">{{ category.icon }}</v-icon>
                <span>{{ category.title }}</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div class="questions-list">
                <div
                  v-for="question in category.questions"
                  :key="question.id"
                  class="question-item"
                  @click="openQuestion(question)"
                >
                  <v-icon size="18" color="green-lighten-1" class="mr-2">mdi-help-circle</v-icon>
                  <span>{{ question.title }}</span>
                  <v-icon size="18" color="grey-lighten-1" class="ml-auto">mdi-chevron-right</v-icon>
                </div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

      <!-- Contact Support -->
      <div class="contact-section">
        <v-card class="contact-card" elevation="0" rounded="xl">
          <v-card-text class="pa-6">
            <div class="d-flex align-center mb-4">
              <v-icon color="green-lighten-1" size="40">mdi-headset</v-icon>
              <div class="ml-4">
                <h3 class="contact-title">Không tìm thấy câu trả lời?</h3>
                <p class="contact-desc">Liên hệ với đội ngũ hỗ trợ của chúng tôi</p>
              </div>
            </div>
            <v-btn
              color="green-lighten-1"
              size="large"
              block
              rounded="lg"
              @click="contactSupport"
            >
              <v-icon start>mdi-message-text</v-icon>
              Liên hệ hỗ trợ
            </v-btn>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

// Quick Actions
const quickActions = ref([
  {
    id: 1,
    title: 'Đặt xe',
    description: 'Hướng dẫn đặt chuyến xe',
    icon: 'mdi-car',
    color: 'green-lighten-1',
  },
  {
    id: 2,
    title: 'Thanh toán',
    description: 'Phương thức thanh toán',
    icon: 'mdi-credit-card',
    color: 'blue-lighten-1',
  },
  {
    id: 3,
    title: 'Ưu đãi',
    description: 'Cách sử dụng voucher',
    icon: 'mdi-gift',
    color: 'orange-lighten-1',
  },
  {
    id: 4,
    title: 'Tài khoản',
    description: 'Quản lý tài khoản',
    icon: 'mdi-account-circle',
    color: 'purple-lighten-1',
  },
])

// FAQ Categories
const faqCategories = ref([
  {
    id: 1,
    title: 'Về dịch vụ',
    icon: 'mdi-information',
    color: 'blue-lighten-1',
    questions: [
      { id: 1, title: 'LacGo là gì?' },
      { id: 2, title: 'Dịch vụ hoạt động như thế nào?' },
      { id: 3, title: 'Các loại xe có sẵn?' },
    ]
  },
  {
    id: 2,
    title: 'Đặt xe',
    icon: 'mdi-car',
    color: 'green-lighten-1',
    questions: [
      { id: 4, title: 'Làm thế nào để đặt xe?' },
      { id: 5, title: 'Có thể đặt xe trước không?' },
      { id: 6, title: 'Hủy chuyến xe như thế nào?' },
    ]
  },
  {
    id: 3,
    title: 'Thanh toán',
    icon: 'mdi-wallet',
    color: 'orange-lighten-1',
    questions: [
      { id: 7, title: 'Các hình thức thanh toán?' },
      { id: 8, title: 'Có thể thanh toán sau không?' },
      { id: 9, title: 'Hoàn tiền như thế nào?' },
    ]
  },
  {
    id: 4,
    title: 'Bảo mật',
    icon: 'mdi-shield-check',
    color: 'red-lighten-1',
    questions: [
      { id: 10, title: 'Thông tin của tôi có an toàn?' },
      { id: 11, title: 'Chính sách bảo mật?' },
      { id: 12, title: 'Báo cáo sự cố?' },
    ]
  },
])

// Methods
const goBack = () => {
  router.back()
}

const handleAction = (action: any) => {
  console.log('Action:', action)
}

const openQuestion = (question: any) => {
  router.push(`/help-center/question/${question.id}`)
}

const contactSupport = () => {
  router.push('/support')
}
</script>

<style scoped>
.help-center-container {
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

/* Search Box */
.search-box {
  margin-bottom: 24px;
}

/* Section Title */
.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #424242;
  margin: 0 0 16px 0;
}

/* Quick Actions */
.quick-actions {
  margin-bottom: 32px;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.action-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.action-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.15);
}

.action-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #424242;
  margin: 12px 0 6px 0;
}

.action-desc {
  font-size: 0.8rem;
  color: #757575;
  margin: 0;
}

/* FAQ Section */
.faq-section {
  margin-bottom: 24px;
}

.faq-category {
  margin-bottom: 12px;
  border-radius: 12px !important;
  overflow: hidden;
}

.category-header {
  display: flex;
  align-items: center;
}

.questions-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;
}

.question-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
  color: #424242;
}

.question-item:hover {
  background: #e8f5e9;
  transform: translateX(4px);
}

/* Contact Section */
.contact-section {
  margin-top: 32px;
}

.contact-card {
  background: linear-gradient(135deg, #f8fdf8 0%, #e8f5e9 100%);
  border: 1px solid #c8e6c9;
}

.contact-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #424242;
  margin: 0 0 4px 0;
}

.contact-desc {
  font-size: 0.9rem;
  color: #616161;
  margin: 0;
}

/* Responsive */
@media (max-width: 480px) {
  .content {
    padding: 16px 12px;
  }

  .actions-grid {
    gap: 10px;
  }

  .action-card {
    padding: 16px;
  }
}
</style>

