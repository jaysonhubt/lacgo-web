<template>
  <v-container fluid class="forgot-password-container">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="8" md="6" lg="4" xl="3">
        <v-card class="forgot-password-card" elevation="2" rounded="lg">
          <!-- Header -->
          <v-card-title class="forgot-password-header text-center pa-6">
            <div class="w-100">
              <v-icon size="48" color="green-lighten-2" class="mb-4">mdi-lock-reset</v-icon>
              <h1 class="text-h4 font-weight-bold mb-2">Quên mật khẩu</h1>
              <p class="text-body-1 text-grey-darken-1">Nhập email để nhận liên kết đặt lại mật khẩu</p>
            </div>
          </v-card-title>

          <!-- Form -->
          <v-card-text class="pa-6">
            <v-form @submit.prevent="handleForgotPassword" ref="forgotPasswordForm">
              <v-text-field
                v-model="form.email"
                label="Email"
                type="email"
                variant="outlined"
                :rules="emailRules"
                required
                hide-details="auto"
                prepend-inner-icon="mdi-email-outline"
                color="green-lighten-2"
                class="mb-6"
              />

              <v-btn
                type="submit"
                color="green-lighten-2"
                size="large"
                block
                :loading="loading"
                prepend-icon="mdi-email-send"
                class="mb-4"
              >
                Gửi liên kết đặt lại
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
              <v-typography class="alert-text" variant="body-2">
                Chúng tôi đã gửi liên kết đặt lại mật khẩu đến email của bạn. 
                Vui lòng kiểm tra hộp thư và làm theo hướng dẫn.
              </v-typography>
            </v-alert>
          </v-card-text>

          <!-- Footer -->
          <v-divider></v-divider>
          <v-card-actions class="pa-6">
            <v-typography class="text-center w-100" variant="body-2" color="grey-darken-1">
              Nhớ mật khẩu rồi?
              <v-btn
                variant="text"
                color="green-lighten-2"
                to="/login"
                prepend-icon="mdi-login"
                class="ml-2"
              >
                Quay lại đăng nhập
              </v-btn>
            </v-typography>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

// Form data
const form = reactive({
  email: ''
})

// UI state
const loading = ref(false)
const emailSent = ref(false)
const forgotPasswordForm = ref()

// Validation rules
const emailRules = [
  (v: string) => !!v || 'Email là bắt buộc',
  (v: string) => /.+@.+\..+/.test(v) || 'Email không hợp lệ'
]

// Methods
const handleForgotPassword = async () => {
  const { valid } = await forgotPasswordForm.value.validate()
  
  if (valid) {
    loading.value = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Show success message
      emailSent.value = true
    } catch (error) {
      console.error('Forgot password error:', error)
    } finally {
      loading.value = false
    }
  }
}
</script>

<style scoped>
.forgot-password-container {
  min-height: 100vh;
  background: white;
}

.forgot-password-card {
  max-width: 400px;
  margin: 0 auto;
}

.forgot-password-header {
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

/* Responsive */
@media (max-width: 600px) {
  .forgot-password-container {
    padding: 1rem;
  }
}
</style>