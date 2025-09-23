<template>
  <v-container fluid class="login-container">
    <!-- Header -->
    <div class="auth-header text-center">
      <div class="w-100 mb-4">
        <v-img
          class="mx-auto"
          :width="150"
          cover
          alt="LạcGO"
          src="/logo_no_border.png"
        ></v-img>
      </div>
      <div class="w-100">
        <h1 class="text-h4 font-weight-bold mb-2">Đăng Nhập</h1>
        <p class="text-body-1 text-grey-darken-1">Chào mừng bạn quay trở lại</p>
      </div>
    </div>

    <!-- Form -->
    <v-card-text class="pa-6">
      <v-form @submit.prevent="handleLogin" ref="loginForm" validate-on="submit">
        <v-text-field
          v-model="form.phoneNumber"
          label="Số Điện Thoại"
          type="string"
          variant="outlined"
          color="main"
          :rules="phoneNumberRules"
          required
          hide-details="auto"
          prepend-inner-icon="mdi-phone-outline"
          class="mb-4"
          autocomplete="off"
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
          color="green-lighten-1"
          class="mb-4"
        />

        <div class="d-flex justify-end align-center mb-6">
          <router-link
            variant="text"
            color="green-lighten-1"
            :to="{name: 'ForgotPassword'}"
            class="ml-2 text-body-1 text-decoration-none text-green-lighten-1 font-weight-bold"
          >
            Quên mật khẩu?
          </router-link>
        </div>

        <v-btn
          type="submit"
          color="green-lighten-1"
          size="large"
          block
          :loading="loading"
          class="mb-4"
          rounded="xl"
        >
          Đăng nhập
        </v-btn>
      </v-form>
    </v-card-text>

    <!-- Footer -->
    <v-divider></v-divider>
    <v-card-actions class="pa-6">
      <div class="text-center w-100 text-body-1">
        Chưa có tài khoản?
        <router-link
          variant="text"
          color="green-lighten-1"
          :to="{name: 'Register'}"
          class="ml-2 text-decoration-none text-green-lighten-1 font-weight-bold"
        >
          Tạo tài khoản
        </router-link>
      </div>
    </v-card-actions>
  </v-container>
</template>

<script lang="ts" setup>
import {ref, reactive} from 'vue'
import {useRouter} from 'vue-router'


const router = useRouter()
// Form data
const form = reactive({
  phoneNumber: '',
  password: '',
  rememberMe: false
})

// UI state
const loading = ref(false)
const showPassword = ref(false)
const loginForm = ref()

// Validation rules
const phoneNumberRules = [
  (v: string) => !!v || 'Hãy nhập số điện thoại',
  (v: string) => v.match(/^0\d{9}$/g) || 'Số điện thoại không đúng',
]

const passwordRules = [
  (v: string) => !!v || 'Mật khẩu là bắt buộc',
  (v: string) => (v && v.length >= 6) || 'Mật khẩu phải có ít nhất 6 ký tự'
]

// Methods
const handleLogin = async () => {
  const {valid} = await loginForm.value.validate()

  if (valid) {
    loading.value = true

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Redirect to home page
      router.push('/')
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      loading.value = false
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: white;
}
/* Responsive */
@media (max-width: 600px) {
  .login-container {
    padding: 1rem;
  }
}
</style>
