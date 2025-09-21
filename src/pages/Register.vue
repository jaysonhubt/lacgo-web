<template>
  <v-container fluid class="register-container">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="8" md="6" lg="4" xl="3">
        <v-card class="register-card" elevation="2" rounded="lg">
          <!-- Header -->
          <v-card-title class="register-header text-center pa-6">
            <div class="w-100">
              <v-icon size="48" color="green-lighten-2" class="mb-4">mdi-account-plus</v-icon>
              <h1 class="text-h4 font-weight-bold mb-2">Tạo tài khoản</h1>
              <p class="text-body-1 text-grey-darken-1">Đăng ký để bắt đầu sử dụng dịch vụ</p>
            </div>
          </v-card-title>

          <!-- Form -->
          <v-card-text class="pa-6">
            <v-form @submit.prevent="handleRegister" ref="registerForm">
              <v-text-field
                v-model="form.fullName"
                label="Họ và tên"
                variant="outlined"
                :rules="fullNameRules"
                required
                hide-details="auto"
                prepend-inner-icon="mdi-account-outline"
                color="green-lighten-2"
                class="mb-4"
              />

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
                class="mb-4"
              />

              <v-text-field
                v-model="form.password"
                label="Mật khẩu"
                :type="showPassword ? 'text' : 'password'"
                variant="outlined"
                :rules="passwordRules"
                required
                hide-details="auto"
                prepend-inner-icon="mdi-lock-outline"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showPassword = !showPassword"
                color="green-lighten-2"
                class="mb-4"
              />

              <v-text-field
                v-model="form.confirmPassword"
                label="Xác nhận mật khẩu"
                :type="showConfirmPassword ? 'text' : 'password'"
                variant="outlined"
                :rules="confirmPasswordRules"
                required
                hide-details="auto"
                prepend-inner-icon="mdi-lock-check-outline"
                :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showConfirmPassword = !showConfirmPassword"
                color="green-lighten-2"
                class="mb-4"
              />

              <v-checkbox
                v-model="form.acceptTerms"
                color="green-lighten-2"
                required
                class="mb-6"
              >
                <template v-slot:label>
                  <span class="text-body-2 text-grey-darken-1">
                    Tôi đồng ý với 
                    <v-btn
                      variant="text"
                      color="green-lighten-2"
                      size="small"
                      href="#"
                      class="pa-0"
                    >
                      Điều khoản sử dụng
                    </v-btn>
                    và 
                    <v-btn
                      variant="text"
                      color="green-lighten-2"
                      size="small"
                      href="#"
                      class="pa-0"
                    >
                      Chính sách bảo mật
                    </v-btn>
                  </span>
                </template>
              </v-checkbox>

              <v-btn
                type="submit"
                color="green-lighten-2"
                size="large"
                block
                :loading="loading"
                prepend-icon="mdi-account-plus"
                class="mb-4"
              >
                Tạo tài khoản
              </v-btn>
            </v-form>
          </v-card-text>

          <!-- Footer -->
          <v-divider></v-divider>
          <v-card-actions class="pa-6">
            <v-typography class="text-center w-100" variant="body-2" color="grey-darken-1">
              Đã có tài khoản?
              <v-btn
                variant="text"
                color="green-lighten-2"
                to="/login"
                prepend-icon="mdi-login"
                class="ml-2"
              >
                Đăng nhập ngay
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
import { useRouter } from 'vue-router'

const router = useRouter()

// Form data
const form = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
})

// UI state
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const registerForm = ref()

// Validation rules
const fullNameRules = [
  (v: string) => !!v || 'Họ và tên là bắt buộc',
  (v: string) => (v && v.length >= 2) || 'Họ và tên phải có ít nhất 2 ký tự'
]

const emailRules = [
  (v: string) => !!v || 'Email là bắt buộc',
  (v: string) => /.+@.+\..+/.test(v) || 'Email không hợp lệ'
]

const passwordRules = [
  (v: string) => !!v || 'Mật khẩu là bắt buộc',
  (v: string) => (v && v.length >= 6) || 'Mật khẩu phải có ít nhất 6 ký tự'
]

const confirmPasswordRules = [
  (v: string) => !!v || 'Xác nhận mật khẩu là bắt buộc',
  (v: string) => v === form.password || 'Mật khẩu xác nhận không khớp'
]

// Methods
const handleRegister = async () => {
  const { valid } = await registerForm.value.validate()
  
  if (valid) {
    loading.value = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to login page
      router.push('/login')
    } catch (error) {
      console.error('Register error:', error)
    } finally {
      loading.value = false
    }
  }
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  background: white;
}

.register-card {
  max-width: 400px;
  margin: 0 auto;
}

.register-header {
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

/* Responsive */
@media (max-width: 600px) {
  .register-container {
    padding: 1rem;
  }
}
</style>