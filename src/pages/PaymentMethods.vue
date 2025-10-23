<template>
  <div class="payment-methods-container">
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
      
      <h1 class="title">Phương thức thanh toán</h1>
      <div style="width: 40px"></div>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Payment Methods List -->
      <div class="payment-list">
        <div
          v-for="method in paymentMethods"
          :key="method.id"
          class="payment-card"
          :class="{ 'selected': method.isDefault }"
          @click="selectPaymentMethod(method)"
        >
          <div class="payment-icon">
            <v-icon :color="method.color" size="32">{{ method.icon }}</v-icon>
          </div>

          <div class="payment-info">
            <h3 class="payment-name">{{ method.name }}</h3>
            <p class="payment-desc">{{ method.description }}</p>
            <v-chip
              v-if="method.isDefault"
              size="x-small"
              color="green-lighten-1"
              class="mt-2"
            >
              Mặc định
            </v-chip>
          </div>

          <v-btn
            v-if="method.type !== 'cash'"
            icon
            variant="text"
            size="small"
            @click.stop="removePaymentMethod(method)"
          >
            <v-icon size="20">mdi-close</v-icon>
          </v-btn>
        </div>

        <!-- Empty State -->
        <div v-if="paymentMethods.length === 0" class="empty-state">
          <v-icon size="80" color="grey-lighten-2">mdi-credit-card-off</v-icon>
          <h3>Chưa có phương thức thanh toán</h3>
          <p>Thêm phương thức để thanh toán dễ dàng hơn</p>
        </div>
      </div>

      <!-- Add Payment Button -->
      <v-btn
        color="green-lighten-1"
        variant="outlined"
        size="large"
        block
        @click="addPaymentMethod"
        class="add-btn"
      >
        <v-icon start>mdi-plus</v-icon>
        Thêm phương thức thanh toán
      </v-btn>

      <!-- Info Section -->
      <div class="info-section">
        <v-icon color="grey-darken-1" size="20">mdi-information</v-icon>
        <p>Thông tin thanh toán của bạn được bảo mật và mã hóa</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Payment methods
const paymentMethods = ref([
  {
    id: 1,
    type: 'cash',
    name: 'Tiền mặt',
    description: 'Thanh toán trực tiếp cho tài xế',
    icon: 'mdi-cash',
    color: 'green-lighten-1',
    isDefault: true,
  },
  {
    id: 2,
    type: 'card',
    name: 'Thẻ tín dụng',
    description: 'Visa/Mastercard ****1234',
    icon: 'mdi-credit-card',
    color: 'blue-lighten-1',
    isDefault: false,
  },
  {
    id: 3,
    type: 'ewallet',
    name: 'Ví điện tử',
    description: 'MoMo - 0123456789',
    icon: 'mdi-wallet',
    color: 'purple-lighten-1',
    isDefault: false,
  },
])

// Methods
const goBack = () => {
  router.back()
}

const selectPaymentMethod = (method: any) => {
  paymentMethods.value.forEach(m => m.isDefault = false)
  method.isDefault = true
}

const removePaymentMethod = (method: any) => {
  // Remove payment method
  const index = paymentMethods.value.findIndex(m => m.id === method.id)
  if (index > -1) {
    paymentMethods.value.splice(index, 1)
  }
}

const addPaymentMethod = () => {
  // Add payment method
  router.push('/account/payment-methods/add')
}
</script>

<style scoped>
.payment-methods-container {
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

/* Payment List */
.payment-list {
  margin-bottom: 20px;
}

.payment-card {
  background: white;
  border-radius: 12px;
  padding: 18px;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.payment-card:hover {
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.12);
}

.payment-card.selected {
  border-color: #4caf50;
  background: rgba(76, 175, 80, 0.02);
}

.payment-icon {
  width: 56px;
  height: 56px;
  background: #f8f9fa;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.payment-info {
  flex: 1;
  min-width: 0;
}

.payment-name {
  font-size: 1rem;
  font-weight: 600;
  color: #424242;
  margin: 0 0 4px 0;
}

.payment-desc {
  font-size: 0.85rem;
  color: #757575;
  margin: 0;
}

/* Add Button */
.add-btn {
  margin-bottom: 20px;
}

/* Info Section */
.info-section {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 16px;
  background: #e3f2fd;
  border-radius: 12px;
  border: 1px solid #bbdefb;
}

.info-section p {
  font-size: 0.85rem;
  color: #616161;
  margin: 0;
  line-height: 1.5;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-state h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #424242;
  margin: 16px 0 8px 0;
}

.empty-state p {
  font-size: 0.95rem;
  color: #666;
  margin: 0;
}

/* Responsive */
@media (max-width: 480px) {
  .content {
    padding: 16px 12px;
  }

  .payment-card {
    padding: 16px;
  }

  .payment-icon {
    width: 48px;
    height: 48px;
  }
}
</style>

