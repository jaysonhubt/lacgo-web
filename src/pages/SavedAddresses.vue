<template>
  <div class="saved-addresses-container">
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
      
      <h1 class="title">Địa chỉ đã lưu</h1>
      <div style="width: 40px"></div>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Addresses List -->
      <div class="addresses-list">
        <div
          v-for="address in addresses"
          :key="address.id"
          class="address-card"
        >
          <div class="address-icon">
            <v-icon :color="address.color" size="28">{{ address.icon }}</v-icon>
          </div>

          <div class="address-info">
            <div class="address-header">
              <h3 class="address-name">{{ address.name }}</h3>
              <v-chip
                v-if="address.isDefault"
                size="x-small"
                color="green-lighten-1"
              >
                Mặc định
              </v-chip>
            </div>
            <p class="address-text">{{ address.address }}</p>
          </div>

          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                icon
                variant="text"
                size="small"
                v-bind="props"
              >
                <v-icon size="20">mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="editAddress(address)">
                <template v-slot:prepend>
                  <v-icon>mdi-pencil</v-icon>
                </template>
                <v-list-item-title>Chỉnh sửa</v-list-item-title>
              </v-list-item>
              <v-list-item @click="setDefault(address)">
                <template v-slot:prepend>
                  <v-icon>mdi-star</v-icon>
                </template>
                <v-list-item-title>Đặt làm mặc định</v-list-item-title>
              </v-list-item>
              <v-list-item @click="deleteAddress(address)">
                <template v-slot:prepend>
                  <v-icon color="red">mdi-delete</v-icon>
                </template>
                <v-list-item-title class="text-red">Xóa</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <!-- Empty State -->
        <div v-if="addresses.length === 0" class="empty-state">
          <v-icon size="80" color="grey-lighten-2">mdi-map-marker-off</v-icon>
          <h3>Chưa có địa chỉ đã lưu</h3>
          <p>Lưu địa chỉ để đặt xe nhanh hơn</p>
        </div>
      </div>

      <!-- Add Address Button -->
      <v-btn
        color="green-lighten-1"
        size="large"
        block
        @click="addAddress"
        class="add-btn"
      >
        <v-icon start>mdi-plus</v-icon>
        Thêm địa chỉ mới
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Addresses
const addresses = ref([
  {
    id: 1,
    name: 'Nhà',
    address: '123 Đường ABC, Phường XYZ, Quận Cầu Giấy, Hà Nội',
    icon: 'mdi-home',
    color: 'green-lighten-1',
    isDefault: true,
  },
  {
    id: 2,
    name: 'Công ty',
    address: '456 Đường DEF, Phường KLM, Quận Ba Đình, Hà Nội',
    icon: 'mdi-office-building',
    color: 'blue-lighten-1',
    isDefault: false,
  },
  {
    id: 3,
    name: 'Nhà bạn',
    address: '789 Đường GHI, Phường NOP, Quận Hoàn Kiếm, Hà Nội',
    icon: 'mdi-account',
    color: 'purple-lighten-1',
    isDefault: false,
  },
])

// Methods
const goBack = () => {
  router.back()
}

const editAddress = (address: any) => {
  // Edit address
}

const setDefault = (address: any) => {
  addresses.value.forEach(a => a.isDefault = false)
  address.isDefault = true
}

const deleteAddress = (address: any) => {
  const index = addresses.value.findIndex(a => a.id === address.id)
  if (index > -1) {
    addresses.value.splice(index, 1)
  }
}

const addAddress = () => {
  // Add new address
}
</script>

<style scoped>
.saved-addresses-container {
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

/* Addresses List */
.addresses-list {
  margin-bottom: 20px;
}

.address-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.address-icon {
  width: 48px;
  height: 48px;
  background: #f8f9fa;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.address-info {
  flex: 1;
  min-width: 0;
}

.address-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.address-name {
  font-size: 1rem;
  font-weight: 600;
  color: #424242;
  margin: 0;
}

.address-text {
  font-size: 0.9rem;
  color: #757575;
  margin: 0;
  line-height: 1.5;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
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

  .address-card {
    padding: 14px;
  }

  .address-icon {
    width: 44px;
    height: 44px;
  }
}
</style>

