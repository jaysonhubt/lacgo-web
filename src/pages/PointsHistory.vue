<template>
  <div class="points-history-container">
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
      
      <h1 class="title">Lịch sử điểm</h1>
      <div style="width: 40px"></div>
    </div>

    <!-- Points Card -->
    <div class="points-card">
      <v-icon color="green-lighten-1" size="50">mdi-leaf</v-icon>
      <div class="points-info">
        <h2 class="points-value">{{ totalPoints }}</h2>
        <p class="points-label">Tổng điểm hiện có</p>
      </div>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Filter Tabs -->
      <v-tabs
        v-model="activeTab"
        color="green-lighten-1"
        class="tabs"
      >
        <v-tab value="all">Tất cả</v-tab>
        <v-tab value="earned">Đã nhận</v-tab>
        <v-tab value="spent">Đã dùng</v-tab>
      </v-tabs>

      <!-- History List -->
      <div class="history-list">
        <div
          v-for="item in filteredHistory"
          :key="item.id"
          class="history-item"
        >
          <div class="history-icon" :class="item.type">
            <v-icon color="white" size="24">{{ getHistoryIcon(item.type) }}</v-icon>
          </div>

          <div class="history-content">
            <h3 class="history-title">{{ item.title }}</h3>
            <p class="history-desc">{{ item.description }}</p>
            <span class="history-time">{{ item.date }}</span>
          </div>

          <div class="history-points" :class="item.type">
            <span class="points-change">
              {{ item.type === 'earned' ? '+' : '-' }}{{ item.points }}
            </span>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredHistory.length === 0" class="empty-state">
          <v-icon size="80" color="grey-lighten-2">mdi-leaf-off</v-icon>
          <h3>Chưa có lịch sử điểm</h3>
          <p>Lịch sử điểm của bạn sẽ xuất hiện ở đây</p>
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
const totalPoints = ref(2450)

// Sample history
const history = ref([
  {
    id: 1,
    type: 'earned',
    title: 'Hoàn thành chuyến đi',
    description: 'Nhận điểm từ chuyến đi Cầu Giấy - Phú Thọ',
    points: 50,
    date: '23/10/2025',
  },
  {
    id: 2,
    type: 'earned',
    title: 'Thưởng check-in',
    description: 'Check-in hàng ngày liên tục 7 ngày',
    points: 100,
    date: '22/10/2025',
  },
  {
    id: 3,
    type: 'spent',
    title: 'Đổi voucher 50K',
    description: 'Sử dụng 500 điểm đổi voucher giảm 50K',
    points: 500,
    date: '21/10/2025',
  },
  {
    id: 4,
    type: 'earned',
    title: 'Mời bạn bè',
    description: 'Nhận điểm khi bạn bè đăng ký thành công',
    points: 200,
    date: '20/10/2025',
  },
  {
    id: 5,
    type: 'earned',
    title: 'Hoàn thành chuyến đi',
    description: 'Nhận điểm từ chuyến đi Hoàn Kiếm - Phú Thọ',
    points: 50,
    date: '19/10/2025',
  },
  {
    id: 6,
    type: 'spent',
    title: 'Đổi voucher 20%',
    description: 'Sử dụng 800 điểm đổi voucher giảm 20%',
    points: 800,
    date: '18/10/2025',
  },
])

// Computed
const filteredHistory = computed(() => {
  if (activeTab.value === 'all') {
    return history.value
  }
  return history.value.filter(h => h.type === activeTab.value)
})

// Methods
const goBack = () => {
  router.back()
}

const getHistoryIcon = (type: string) => {
  return type === 'earned' ? 'mdi-plus' : 'mdi-minus'
}
</script>

<style scoped>
.points-history-container {
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

/* Points Card */
.points-card {
  margin: 20px 16px;
  padding: 30px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fdf8 100%);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.points-info {
  text-align: center;
}

.points-value {
  font-size: 3rem;
  font-weight: 700;
  color: #4caf50;
  margin: 0;
  line-height: 1;
}

.points-label {
  font-size: 1rem;
  color: #757575;
  margin: 8px 0 0 0;
}

/* Content */
.content {
  background: white;
}

/* Tabs */
.tabs {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* History List */
.history-list {
  background: #f8f9fa;
  padding: 16px;
}

.history-item {
  background: white;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.history-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.history-icon.earned {
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
}

.history-icon.spent {
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%);
}

.history-content {
  flex: 1;
  min-width: 0;
}

.history-title {
  font-size: 1rem;
  font-weight: 600;
  color: #424242;
  margin: 0 0 4px 0;
}

.history-desc {
  font-size: 0.85rem;
  color: #757575;
  margin: 0 0 4px 0;
  line-height: 1.4;
}

.history-time {
  font-size: 0.8rem;
  color: #9e9e9e;
}

.history-points {
  flex-shrink: 0;
}

.points-change {
  font-size: 1.25rem;
  font-weight: 700;
}

.history-points.earned .points-change {
  color: #4caf50;
}

.history-points.spent .points-change {
  color: #f44336;
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
  .points-card {
    margin: 16px 12px;
    padding: 24px;
  }

  .points-value {
    font-size: 2.5rem;
  }

  .history-list {
    padding: 12px;
  }

  .history-item {
    padding: 14px;
  }

  .history-icon {
    width: 44px;
    height: 44px;
  }

  .points-change {
    font-size: 1.1rem;
  }
}
</style>

