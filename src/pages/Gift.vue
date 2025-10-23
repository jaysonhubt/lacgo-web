<template>
  <div class="gift-container">
    <!-- Header -->
    <div class="header">
      <div class="header-content">
        <h1 class="title">Ưu đãi</h1>
        <v-btn
          icon
          variant="text"
          color="white"
          @click="goToNotifications"
        >
          <v-icon>mdi-bell-outline</v-icon>
        </v-btn>
      </div>
    </div>

    <!-- Points Card -->
    <div class="points-card">
      <div class="points-content">
        <v-icon color="white" size="48">mdi-leaf</v-icon>
        <div class="points-info">
          <h2 class="points-value">{{ userPoints }}</h2>
          <p class="points-label">Điểm tích lũy</p>
        </div>
      </div>
      <v-btn
        color="white"
        variant="flat"
        size="small"
        rounded="lg"
        @click="goToPointsHistory"
        style="position: relative; z-index: 1;"
      >
        <span style="color: #4caf50; font-weight: 600;">Lịch sử</span>
        <v-icon color="green-lighten-1" size="18" class="ml-1">mdi-chevron-right</v-icon>
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
        <v-tab value="vouchers">Voucher</v-tab>
        <v-tab value="rewards">Đổi quà</v-tab>
        <v-tab value="my-vouchers">Của tôi</v-tab>
      </v-tabs>

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Vouchers Tab -->
        <div v-if="activeTab === 'vouchers'" class="vouchers-grid">
          <div
            v-for="(voucher, index) in availableVouchers"
            :key="voucher.id"
            class="voucher-card"
            :style="{ animationDelay: `${index * 0.1}s` }"
            @click="goToVoucherDetail(voucher)"
          >
            <div class="voucher-badge" :class="voucher.type">
              <v-icon size="20">{{ getVoucherIcon(voucher.type) }}</v-icon>
            </div>
            
            <div class="voucher-content">
              <h3 class="voucher-title">{{ voucher.title }}</h3>
              <p class="voucher-desc">{{ voucher.description }}</p>
              
              <div class="voucher-footer">
                <div class="voucher-value">
                  <span class="discount">{{ voucher.discount }}</span>
                </div>
                <div class="voucher-expiry">
                  <v-icon size="14">mdi-clock-outline</v-icon>
                  <span>{{ voucher.expiry }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Rewards Tab -->
        <div v-if="activeTab === 'rewards'" class="rewards-grid">
          <div
            v-for="(reward, index) in rewards"
            :key="reward.id"
            class="reward-card"
            :style="{ animationDelay: `${index * 0.1}s` }"
            @click="redeemReward(reward)"
          >
            <div class="reward-image">
              <v-img
                v-if="reward.image"
                :src="reward.image"
                cover
              ></v-img>
              <v-icon v-else size="60" color="green-lighten-1">mdi-gift</v-icon>
            </div>
            
            <div class="reward-info">
              <h3 class="reward-title">{{ reward.title }}</h3>
              <p class="reward-desc">{{ reward.description }}</p>
              
              <div class="reward-points">
                <v-icon size="16" color="green-lighten-1">mdi-leaf</v-icon>
                <span class="points">{{ reward.points }} điểm</span>
              </div>
            </div>
          </div>
        </div>

        <!-- My Vouchers Tab -->
        <div v-if="activeTab === 'my-vouchers'" class="my-vouchers-list">
          <div
            v-for="voucher in myVouchers"
            :key="voucher.id"
            class="my-voucher-card"
            :class="{ 'used': voucher.used, 'expired': voucher.expired }"
            @click="!voucher.used && !voucher.expired && useVoucher(voucher)"
          >
            <div class="voucher-left">
              <div class="voucher-badge-sm" :class="voucher.type">
                <v-icon size="16">{{ getVoucherIcon(voucher.type) }}</v-icon>
              </div>
              <div class="voucher-info">
                <h4 class="voucher-name">{{ voucher.title }}</h4>
                <p class="voucher-code">{{ voucher.code }}</p>
              </div>
            </div>
            
            <div class="voucher-right">
              <span class="voucher-discount-sm">{{ voucher.discount }}</span>
              <v-chip
                v-if="voucher.used"
                size="x-small"
                color="grey"
              >
                Đã dùng
              </v-chip>
              <v-chip
                v-else-if="voucher.expired"
                size="x-small"
                color="red"
              >
                Hết hạn
              </v-chip>
              <span v-else class="voucher-expiry-sm">{{ voucher.expiry }}</span>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="myVouchers.length === 0" class="empty-state">
            <v-icon size="80" color="grey-lighten-2">mdi-ticket-outline</v-icon>
            <h3>Chưa có voucher</h3>
            <p>Voucher của bạn sẽ xuất hiện ở đây</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// State
const activeTab = ref('vouchers')
const userPoints = ref(2450)

// Sample data
const availableVouchers = ref([
  {
    id: 1,
    type: 'discount',
    title: 'Giảm 50K',
    description: 'Cho chuyến đi đầu tiên',
    discount: '50.000đ',
    expiry: 'HSD: 31/12/2025',
  },
  {
    id: 2,
    type: 'percent',
    title: 'Giảm 20%',
    description: 'Tối đa 100K cho mọi chuyến',
    discount: '20%',
    expiry: 'HSD: 15/01/2026',
  },
  {
    id: 3,
    type: 'cashback',
    title: 'Hoàn 30K',
    description: 'Hoàn tiền cho 3 chuyến tiếp theo',
    discount: '30.000đ',
    expiry: 'HSD: 20/01/2026',
  },
  {
    id: 4,
    type: 'discount',
    title: 'Giảm 100K',
    description: 'Đơn từ 300K',
    discount: '100.000đ',
    expiry: 'HSD: 31/01/2026',
  },
])

const rewards = ref([
  {
    id: 1,
    title: 'Voucher 50K',
    description: 'Giảm 50K cho chuyến đi',
    points: 500,
    image: '',
  },
  {
    id: 2,
    title: 'Voucher 100K',
    description: 'Giảm 100K cho chuyến đi',
    points: 1000,
    image: '',
  },
  {
    id: 3,
    title: 'Miễn phí 1 chuyến',
    description: 'Miễn phí hoàn toàn 1 chuyến',
    points: 2000,
    image: '',
  },
  {
    id: 4,
    title: 'Gói 5 chuyến VIP',
    description: 'Giảm 20% cho 5 chuyến',
    points: 3000,
    image: '',
  },
])

const myVouchers = ref([
  {
    id: 1,
    type: 'discount',
    title: 'Giảm 50K',
    code: 'LACGO50K',
    discount: '50.000đ',
    expiry: 'HSD: 31/12/2025',
    used: false,
    expired: false,
  },
  {
    id: 2,
    type: 'percent',
    title: 'Giảm 20%',
    code: 'SALE20',
    discount: '20%',
    expiry: 'HSD: 15/11/2025',
    used: true,
    expired: false,
  },
  {
    id: 3,
    type: 'cashback',
    title: 'Hoàn 30K',
    code: 'CASHBACK30',
    discount: '30.000đ',
    expiry: 'HSD: 01/11/2025',
    used: false,
    expired: true,
  },
])

// Methods
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

const goToVoucherDetail = (voucher: any) => {
  router.push(`/gift/${voucher.id}`)
}

const goToPointsHistory = () => {
  router.push('/account/points-history')
}

const goToNotifications = () => {
  router.push('/notifications')
}

const redeemReward = (reward: any) => {
  // Implement reward redemption
  console.log('Redeem reward:', reward)
}

const useVoucher = (voucher: any) => {
  // Implement voucher usage
  console.log('Use voucher:', voucher)
}
</script>

<style scoped>
.gift-container {
  min-height: 100vh;
  background: #f8f9fa;
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
  padding-top: 60px;
}

.title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

/* Points Card */
.points-card {
  margin: 20px 16px;
  padding: 24px;
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
  border-radius: 20px;
  box-shadow: 0 6px 24px rgba(76, 175, 80, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  position: relative;
  overflow: hidden;
}

.points-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.points-card::after {
  content: '';
  position: absolute;
  bottom: -30%;
  left: -10%;
  width: 150px;
  height: 150px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.points-content {
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 1;
}

.points-info {
  display: flex;
  flex-direction: column;
}

.points-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.points-label {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 6px 0 0 0;
  font-weight: 500;
}

/* Content */
.content {
  background: white;
}

/* Tabs */
.tabs {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* Tab Content */
.tab-content {
  padding: 20px 16px;
  background: #f8f9fa;
  min-height: 400px;
}

/* Vouchers Grid */
.vouchers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.voucher-card {
  background: white;
  border-radius: 16px;
  padding: 18px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  animation: fadeInUp 0.5s ease-out backwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.voucher-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.voucher-card:hover::before {
  left: 100%;
}

.voucher-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 8px 28px rgba(76, 175, 80, 0.2);
}

.voucher-card:active {
  transform: translateY(-2px) scale(0.98);
}

.voucher-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.voucher-badge.discount {
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%);
}

.voucher-badge.percent {
  background: linear-gradient(135deg, #4c6ef5 0%, #748ffc 100%);
}

.voucher-badge.cashback {
  background: linear-gradient(135deg, #fa5252 0%, #ff6b6b 100%);
}

.voucher-content {
  padding-right: 44px;
}

.voucher-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #424242;
  margin: 0 0 6px 0;
}

.voucher-desc {
  font-size: 0.875rem;
  color: #757575;
  margin: 0 0 14px 0;
  line-height: 1.4;
}

.voucher-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.voucher-value .discount {
  font-size: 1.25rem;
  font-weight: 700;
  color: #4caf50;
}

.voucher-expiry {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  color: #9e9e9e;
}

/* Rewards Grid */
.rewards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.reward-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.5s ease-out backwards;
}

.reward-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 8px 28px rgba(76, 175, 80, 0.2);
}

.reward-card:active {
  transform: translateY(-2px) scale(0.98);
}

.reward-image {
  height: 150px;
  background: linear-gradient(135deg, #e8f5e9 0%, #f1f8f4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.reward-info {
  padding: 16px;
}

.reward-title {
  font-size: 1rem;
  font-weight: 600;
  color: #424242;
  margin: 0 0 6px 0;
}

.reward-desc {
  font-size: 0.85rem;
  color: #757575;
  margin: 0 0 12px 0;
}

.reward-points {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: rgba(76, 175, 80, 0.08);
  border-radius: 8px;
  display: inline-flex;
}

.reward-points .points {
  font-size: 0.9rem;
  font-weight: 600;
  color: #4caf50;
}

/* My Vouchers List */
.my-vouchers-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.my-voucher-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s;
}

.my-voucher-card:hover {
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.12);
}

.my-voucher-card.used,
.my-voucher-card.expired {
  opacity: 0.5;
  cursor: not-allowed;
}

.voucher-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.voucher-badge-sm {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.voucher-badge-sm.discount {
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%);
}

.voucher-badge-sm.percent {
  background: linear-gradient(135deg, #4c6ef5 0%, #748ffc 100%);
}

.voucher-badge-sm.cashback {
  background: linear-gradient(135deg, #fa5252 0%, #ff6b6b 100%);
}

.voucher-info {
  flex: 1;
  min-width: 0;
}

.voucher-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #424242;
  margin: 0 0 4px 0;
}

.voucher-code {
  font-size: 0.8rem;
  color: #757575;
  margin: 0;
  font-family: monospace;
}

.voucher-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
}

.voucher-discount-sm {
  font-size: 1rem;
  font-weight: 700;
  color: #4caf50;
}

.voucher-expiry-sm {
  font-size: 0.75rem;
  color: #9e9e9e;
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
@media (max-width: 768px) {
  .vouchers-grid,
  .rewards-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 16px;
  }

  .title {
    font-size: 1.5rem;
  }

  .points-card {
    margin: 16px 12px;
    padding: 16px;
  }

  .points-value {
    font-size: 1.75rem;
  }

  .tab-content {
    padding: 16px 12px;
  }
}
</style>

