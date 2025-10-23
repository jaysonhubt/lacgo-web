<template>
  <div class="gift-detail-container">
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
      
      <h1 class="title">Chi tiết ưu đãi</h1>

      <v-btn
        icon
        variant="text"
        color="white"
        @click="shareVoucher"
      >
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Voucher Card -->
      <div class="voucher-card">
        <div class="voucher-header" :class="voucher.type">
          <v-icon size="60" color="white">{{ getVoucherIcon(voucher.type) }}</v-icon>
          <h2 class="voucher-discount">{{ voucher.discount }}</h2>
        </div>

        <div class="voucher-body">
          <h3 class="voucher-title">{{ voucher.title }}</h3>
          <p class="voucher-description">{{ voucher.description }}</p>

          <div class="voucher-details">
            <div class="detail-item">
              <v-icon size="18" color="green-lighten-1">mdi-clock-outline</v-icon>
              <span>Hạn sử dụng: {{ voucher.expiry }}</span>
            </div>
            <div class="detail-item">
              <v-icon size="18" color="green-lighten-1">mdi-ticket-outline</v-icon>
              <span>Số lượng: {{ voucher.quantity }} voucher</span>
            </div>
            <div class="detail-item">
              <v-icon size="18" color="green-lighten-1">mdi-cart-outline</v-icon>
              <span>Áp dụng: {{ voucher.applicable }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Terms & Conditions -->
      <div class="terms-section">
        <h3 class="section-title">Điều kiện sử dụng</h3>
        <div class="terms-content">
          <ul class="terms-list">
            <li v-for="(term, index) in voucher.terms" :key="index">
              {{ term }}
            </li>
          </ul>
        </div>
      </div>

      <!-- How to use -->
      <div class="howto-section">
        <h3 class="section-title">Cách sử dụng</h3>
        <div class="howto-content">
          <div v-for="(step, index) in howToUse" :key="index" class="howto-step">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-text">{{ step }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Action -->
    <div class="bottom-action">
      <v-btn
        color="green-lighten-1"
        size="large"
        block
        rounded="lg"
        @click="claimVoucher"
      >
        <v-icon start>mdi-ticket-confirmation</v-icon>
        Lưu voucher
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Sample voucher data
const voucher = ref({
  id: 1,
  type: 'discount',
  title: 'Giảm 50K cho chuyến đi đầu tiên',
  description: 'Áp dụng cho tất cả các tuyến đường trong nước',
  discount: '50.000đ',
  expiry: '31/12/2025',
  quantity: 50,
  applicable: 'Tất cả chuyến đi',
  terms: [
    'Chỉ áp dụng cho khách hàng mới',
    'Giá trị đơn hàng tối thiểu 100.000đ',
    'Không áp dụng đồng thời với các chương trình khác',
    'Voucher không có giá trị quy đổi thành tiền mặt',
    'Mỗi khách hàng chỉ được sử dụng 1 lần',
  ],
})

const howToUse = ref([
  'Lưu voucher vào tài khoản của bạn',
  'Đặt chuyến xe như bình thường',
  'Chọn voucher khi thanh toán',
  'Hoàn tất đặt xe với giá ưu đãi',
])

// Methods
const goBack = () => {
  router.back()
}

const getVoucherIcon = (type: string) => {
  switch (type) {
    case 'discount':
      return 'mdi-tag'
    case 'percent':
      return 'mdi-percent'
    case 'cashback':
      return 'mdi-cash-refund'
    default:
      return 'mdi-gift'
  }
}

const shareVoucher = () => {
  // Implement share functionality
}

const claimVoucher = () => {
  // Implement claim voucher functionality
  router.back()
}
</script>

<style scoped>
.gift-detail-container {
  min-height: 100vh;
  background: #f8f9fa;
  padding-bottom: 100px;
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

/* Voucher Card */
.voucher-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
}

.voucher-header {
  padding: 40px 20px;
  text-align: center;
  color: white;
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%);
}

.voucher-header.discount {
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%);
}

.voucher-header.percent {
  background: linear-gradient(135deg, #4c6ef5 0%, #748ffc 100%);
}

.voucher-header.cashback {
  background: linear-gradient(135deg, #fa5252 0%, #ff6b6b 100%);
}

.voucher-discount {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 16px 0 0 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.voucher-body {
  padding: 24px 20px;
}

.voucher-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #424242;
  margin: 0 0 8px 0;
}

.voucher-description {
  font-size: 0.95rem;
  color: #757575;
  margin: 0 0 20px 0;
  line-height: 1.5;
}

.voucher-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: #616161;
}

/* Terms Section */
.terms-section,
.howto-section {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  margin-bottom: 20px;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #424242;
  margin: 0 0 16px 0;
}

.terms-content {
  font-size: 0.9rem;
  color: #616161;
  line-height: 1.6;
}

.terms-list {
  margin: 0;
  padding-left: 20px;
}

.terms-list li {
  margin-bottom: 8px;
}

/* How to use */
.howto-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.howto-step {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.step-number {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.step-text {
  flex: 1;
  font-size: 0.9rem;
  color: #616161;
  line-height: 1.6;
  padding-top: 3px;
}

/* Bottom Action */
.bottom-action {
  position: fixed;
  bottom: 56px;
  left: 0;
  right: 0;
  padding: 16px;
  background: white;
  border-top: 1px solid #e0e0e0;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);
}

/* Responsive */
@media (max-width: 480px) {
  .content {
    padding: 16px 12px;
  }

  .voucher-discount {
    font-size: 2rem;
  }
}
</style>

