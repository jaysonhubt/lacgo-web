<template>
  <v-container fluid class="forgot-password-container">
    <!-- Header -->
    <div class="auth-header text-center">
      <div class="w-100 mb-4">
        <v-img
          class="mx-auto"
          :width="150"
          cover
          alt="LạcGO"
          src="/logo_no_border_small.png"
          eager
        ></v-img>
      </div>
      <div class="w-100">
        <h1 class="text-h4 font-weight-bold mb-2">Quên Mật Khẩu</h1>
        <p class="text-body-1 text-grey-darken-1">Nhập email để nhận liên kết đặt lại mật khẩu</p>
      </div>
    </div>

    <v-card-text class="pa-6">
      <v-form @submit.prevent="handleForgotPassword" ref="forgotPasswordForm">
        <v-text-field
          v-model="form.account"
          label="Nhập số điện thoại hoặc email"
          type="string"
          variant="outlined"
          :rules="accountRules"
          required
          hide-details="auto"
          prepend-inner-icon="mdi-phone-outline"
          color="green-lighten-2"
          class="mb-6"
          rounded="lg"
        />

         <v-btn
           type="submit"
           color="green-lighten-1"
           size="large"
           block
           :loading="authStore.isLoading"
           class="mb-4"
           rounded="xl"
           prepend-icon="mdi-email-send"
         >
           Đặt lại mật khẩu
         </v-btn>
      </v-form>

      <!-- Success message -->
      <v-alert
        v-if="emailSent"
        type="success"
        variant="tonal"
        class="success-alert"
        rounded="lg"
        prepend-icon="mdi-check-circle"
      >
        <template v-slot:title>
          Email đã được gửi
        </template>
        <p class="alert-text text-body-2">
          Chúng tôi đã gửi liên kết đặt lại mật khẩu đến email của bạn.
          Vui lòng kiểm tra hộp thư và làm theo hướng dẫn.
        </p>
      </v-alert>
    </v-card-text>

    <!-- Footer -->
    <v-divider></v-divider>
    <v-card-actions class="pa-6">
      <div class="text-center w-100 text-body-2 text-grey-darken-1">

        <router-link
          variant="text"
          color="green-lighten-1"
          :to="{path: '/login'}"
          class="ml-2 text-body-1 text-decoration-none text-green-lighten-1 font-weight-bold"
        >
          Quay lại đăng nhập
        </router-link>
      </div>
    </v-card-actions>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// Form data
const form = reactive({
  account: ''
})

// UI state
const emailSent = ref(false)
const forgotPasswordForm = ref()

// Validation rules
const accountRules = [
  (v: string) => !!v || 'Hãy nhập số điện thoại hoặc email',
  (v: string) => {
    const pattern = /^(?:(?:\+?0)(?:3[2-9]|5[689]|7[06-9]|8[1-9]|9[0-9])\d{7}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return pattern.test(v) || 'Nhập số điện thoại hoặc email hợp lệ'
  }
]

// Methods
const handleForgotPassword = async () => {
  const { valid } = await forgotPasswordForm.value.validate()

  if (valid) {
    const result = await authStore.forgotPassword(form.account)

    if (result.success) {
      // Show success message
      emailSent.value = true
    } else {
      // Show error message (you can add a snackbar or alert here)
      console.error('Forgot password failed:', result.error)
    }
  }
}
</script>

<style scoped>
.forgot-password-container {
  min-height: 100vh;
  background: white;
}

/* Responsive */
@media (max-width: 600px) {
  .forgot-password-container {
    padding: 1rem;
  }
}
</style>
