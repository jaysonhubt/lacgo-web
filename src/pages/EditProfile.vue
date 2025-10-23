<template>
  <div class="edit-profile-container">
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
      
      <h1 class="title">Chỉnh sửa hồ sơ</h1>

      <v-btn
        icon
        variant="text"
        color="white"
        @click="saveProfile"
      >
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Avatar Section -->
      <div class="avatar-section">
        <v-avatar size="120" color="green-lighten-1">
          <v-img v-if="formData.avatar" :src="formData.avatar"></v-img>
          <v-icon v-else color="white" size="60">mdi-account</v-icon>
        </v-avatar>
        <v-btn
          color="green-lighten-1"
          variant="flat"
          size="small"
          rounded="lg"
          @click="changeAvatar"
        >
          <v-icon start size="18">mdi-camera</v-icon>
          Đổi ảnh
        </v-btn>
      </div>

      <!-- Form -->
      <div class="form-section">
        <v-text-field
          v-model="formData.name"
          label="Họ và tên"
          variant="outlined"
          color="green-lighten-1"
          prepend-inner-icon="mdi-account"
        ></v-text-field>

        <v-text-field
          v-model="formData.phone"
          label="Số điện thoại"
          variant="outlined"
          color="green-lighten-1"
          prepend-inner-icon="mdi-phone"
          readonly
        >
          <template v-slot:append-inner>
            <v-chip size="x-small" color="green-lighten-1">Đã xác minh</v-chip>
          </template>
        </v-text-field>

        <v-text-field
          v-model="formData.email"
          label="Email"
          variant="outlined"
          color="green-lighten-1"
          prepend-inner-icon="mdi-email"
          type="email"
        ></v-text-field>

        <v-select
          v-model="formData.gender"
          label="Giới tính"
          variant="outlined"
          color="green-lighten-1"
          prepend-inner-icon="mdi-gender-male-female"
          :items="genderOptions"
        ></v-select>

        <v-text-field
          v-model="formData.birthdate"
          label="Ngày sinh"
          variant="outlined"
          color="green-lighten-1"
          prepend-inner-icon="mdi-calendar"
          type="date"
        ></v-text-field>

        <v-textarea
          v-model="formData.address"
          label="Địa chỉ"
          variant="outlined"
          color="green-lighten-1"
          prepend-inner-icon="mdi-home"
          rows="3"
        ></v-textarea>
      </div>

      <!-- Delete Account -->
      <div class="danger-zone">
        <h3 class="danger-title">Vùng nguy hiểm</h3>
        <v-btn
          color="red-lighten-1"
          variant="outlined"
          block
          @click="confirmDeleteAccount"
        >
          <v-icon start>mdi-delete</v-icon>
          Xóa tài khoản
        </v-btn>
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

// Form data
const formData = ref({
  name: authStore.user?.name || '',
  phone: authStore.user?.phone || '0123456789',
  email: 'user@example.com',
  gender: 'male',
  birthdate: '1990-01-01',
  address: '',
  avatar: '',
})

const genderOptions = ref([
  { title: 'Nam', value: 'male' },
  { title: 'Nữ', value: 'female' },
  { title: 'Khác', value: 'other' },
])

// Methods
const goBack = () => {
  router.back()
}

const changeAvatar = () => {
  // Implement avatar change
}

const saveProfile = () => {
  // Save profile
  router.back()
}

const confirmDeleteAccount = () => {
  // Show confirmation dialog
}
</script>

<style scoped>
.edit-profile-container {
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

/* Avatar Section */
.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 32px 0;
  background: white;
  border-radius: 16px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

/* Form Section */
.form-section {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  margin-bottom: 20px;
}

/* Danger Zone */
.danger-zone {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border: 2px solid #ffebee;
}

.danger-title {
  font-size: 1rem;
  font-weight: 600;
  color: #f44336;
  margin: 0 0 16px 0;
}

/* Responsive */
@media (max-width: 480px) {
  .content {
    padding: 16px 12px;
  }

  .avatar-section {
    padding: 24px 0;
  }

  .form-section {
    padding: 16px;
  }
}
</style>

