<template>
  <v-container fluid class="register-container">
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
        <h1 class="text-h4 font-weight-bold mb-2">Tạo Tài Khoản</h1>
        <p class="text-body-1 text-grey-darken-1">Đăng ký để bắt đầu sử dụng dịch vụ</p>
      </div>
    </div>

    <!-- Form -->
    <v-card-text class="pa-6">
      <v-form @submit.prevent="handleRegister" ref="registerForm" validate-on="submit">
        <v-text-field
          v-model="form.name"
          label="Họ và tên"
          variant="outlined"
          :rules="nameRules"
          required
          hide-details="auto"
          prepend-inner-icon="mdi-account-outline"
          color="main"
          class="mb-4"
          autocomplete="off"
          rounded="lg"
        />

        <v-text-field
          v-model="form.phone"
          label="Số điện thoại"
          type="tel"
          variant="outlined"
          :rules="phoneRules"
          required
          hide-details="auto"
          prepend-inner-icon="mdi-phone-outline"
          color="main"
          class="mb-4"
          autocomplete="off"
          rounded="lg"
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
          color="main"
          class="mb-4"
          autocomplete="off"
          rounded="lg"
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
          rounded="lg"
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
          color="green-lighten-1"
          class="mb-4"
          rounded="lg"
        />

        <v-checkbox
          v-model="form.acceptTerms"
          color="green-lighten-1"
          required
          class="mb-6"
        >
          <template v-slot:label>
            <span class="text-body-2 text-grey-darken-1">
              Tôi đồng ý với
              <v-btn
                variant="text"
                color="green-lighten-1"
                size="small"
                @click="showTermsSheet = true"
                class="pa-0"
              >
                Điều khoản sử dụng
              </v-btn>
              và
              <v-btn
                variant="text"
                color="green-lighten-1"
                size="small"
                @click="showPrivacySheet = true"
                class="pa-0"
              >
                Chính sách bảo mật
              </v-btn>
            </span>
          </template>
        </v-checkbox>

         <v-btn
           type="submit"
           color="green-lighten-1"
           size="large"
           block
           :loading="authStore.isLoading"
           class="mb-4"
           rounded="xl"
         >
           Tạo tài khoản
         </v-btn>
      </v-form>
    </v-card-text>

    <!-- Footer -->
    <v-divider></v-divider>
    <v-card-actions class="pa-6">
      <div class="text-center w-100 text-body-1">
        Đã có tài khoản?
        <router-link
          variant="text"
          color="green-lighten-1"
          :to="{name: 'Login'}"
          class="ml-2 text-decoration-none text-green-lighten-1 font-weight-bold"
        >
          Đăng nhập ngay
        </router-link>
      </div>
    </v-card-actions>

    <!-- Terms of Service Bottom Sheet -->
    <v-bottom-sheet v-model="showTermsSheet" scrollable>
      <v-sheet class="pa-6">
        <div class="d-flex align-center justify-space-between mb-4">
          <h2 class="text-h5 font-weight-bold">Điều khoản sử dụng</h2>
          <v-btn
            icon="mdi-close"
            variant="text"
            @click="showTermsSheet = false"
          ></v-btn>
        </div>

        <div class="terms-content">
          <p class="text-body-2 mb-4">
            <strong>Cập nhật lần cuối:</strong> {{ new Date().toLocaleDateString('vi-VN') }}
          </p>

          <div class="mb-4">
            <h3 class="text-h6 font-weight-bold mb-2">1. Giới thiệu</h3>
            <p class="text-body-2">
              Chào mừng bạn đến với LạcGO - ứng dụng đặt xe trực tuyến. Bằng việc sử dụng dịch vụ của chúng tôi,
              bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu trong tài liệu này.
            </p>
          </div>

          <div class="mb-4">
            <h3 class="text-h6 font-weight-bold mb-2">2. Định nghĩa</h3>
            <ul class="text-body-2">
              <li><strong>Ứng dụng:</strong> LạcGO mobile app và website</li>
              <li><strong>Dịch vụ:</strong> Dịch vụ đặt xe, giao hàng và các dịch vụ liên quan</li>
              <li><strong>Người dùng:</strong> Khách hàng sử dụng ứng dụng</li>
              <li><strong>Tài xế:</strong> Người cung cấp dịch vụ vận chuyển</li>
            </ul>
          </div>

          <div class="mb-4">
            <h3 class="text-h6 font-weight-bold mb-2">3. Đăng ký tài khoản</h3>
            <p class="text-body-2">
              Để sử dụng dịch vụ, bạn cần tạo tài khoản với thông tin chính xác. Bạn có trách nhiệm bảo mật
              thông tin đăng nhập và chịu trách nhiệm cho mọi hoạt động diễn ra trên tài khoản của mình.
            </p>
          </div>

          <div class="mb-4">
            <h3 class="text-h6 font-weight-bold mb-2">4. Sử dụng dịch vụ</h3>
            <ul class="text-body-2">
              <li>Bạn phải từ 18 tuổi trở lên để sử dụng dịch vụ</li>
              <li>Không được sử dụng dịch vụ cho mục đích bất hợp pháp</li>
              <li>Tuân thủ các quy định giao thông và pháp luật Việt Nam</li>
              <li>Không được làm phiền tài xế hoặc người dùng khác</li>
            </ul>
          </div>

          <div class="mb-4">
            <h3 class="text-h6 font-weight-bold mb-2">5. Thanh toán</h3>
            <p class="text-body-2">
              Chúng tôi chấp nhận thanh toán qua thẻ tín dụng, ví điện tử và tiền mặt.
              Giá cước được tính theo khoảng cách và thời gian thực tế.
            </p>
          </div>

          <div class="mb-4">
            <h3 class="text-h6 font-weight-bold mb-2">6. Hủy và hoàn tiền</h3>
            <p class="text-body-2">
              Bạn có thể hủy chuyến đi trong vòng 5 phút sau khi đặt mà không bị tính phí.
              Phí hủy sẽ được áp dụng nếu hủy sau thời gian này.
            </p>
          </div>

          <div class="mb-4">
            <h3 class="text-h6 font-weight-bold mb-2">7. Trách nhiệm</h3>
            <p class="text-body-2">
              LạcGO không chịu trách nhiệm cho các tổn thất phát sinh từ việc sử dụng dịch vụ,
              trừ khi có quy định khác trong pháp luật.
            </p>
          </div>

          <div class="mb-4">
            <h3 class="text-h6 font-weight-bold mb-2">8. Thay đổi điều khoản</h3>
            <p class="text-body-2">
              Chúng tôi có quyền thay đổi điều khoản này bất kỳ lúc nào.
              Việc tiếp tục sử dụng dịch vụ sau khi thay đổi được coi là chấp nhận điều khoản mới.
            </p>
          </div>

          <div class="text-center mt-6">
            <v-btn
              color="green-lighten-1"
              @click="showTermsSheet = false"
              rounded="lg"
            >
              Đã đọc và hiểu
            </v-btn>
          </div>
        </div>
      </v-sheet>
    </v-bottom-sheet>

    <!-- Privacy Policy Bottom Sheet -->
    <v-bottom-sheet v-model="showPrivacySheet" scrollable>
      <v-sheet class="pa-6">
        <div class="d-flex align-center justify-space-between mb-4">
          <h2 class="text-h5 font-weight-bold">Chính sách bảo mật</h2>
          <v-btn
            icon="mdi-close"
            variant="text"
            @click="showPrivacySheet = false"
          ></v-btn>
        </div>

        <div class="privacy-content">
          <p class="text-body-2 mb-4">
            <strong>Cập nhật lần cuối:</strong> {{ new Date().toLocaleDateString('vi-VN') }}
          </p>

          <div class="mb-4">
            <h3 class="text-h6 font-weight-bold mb-2">1. Thông tin chúng tôi thu thập</h3>
            <ul class="text-body-2">
              <li><strong>Thông tin cá nhân:</strong> Họ tên, số điện thoại, email, địa chỉ</li>
              <li><strong>Thông tin vị trí:</strong> Vị trí hiện tại để tìm tài xế gần nhất</li>
              <li><strong>Thông tin thanh toán:</strong> Thông tin thẻ, ví điện tử (được mã hóa)</li>
              <li><strong>Thông tin sử dụng:</strong> Lịch sử chuyến đi, đánh giá, phản hồi</li>
            </ul>
          </div>

          <div class="mb-4">
            <h3 class="text-h6 font-weight-bold mb-2">2. Mục đích sử dụng</h3>
            <ul class="text-body-2">
              <li>Cung cấp và cải thiện dịch vụ đặt xe</li>
              <li>Xử lý thanh toán và giao dịch</li>
              <li>Gửi thông báo về chuyến đi và khuyến mãi</li>
              <li>Hỗ trợ khách hàng và giải quyết khiếu nại</li>
              <li>Tuân thủ các yêu cầu pháp lý</li>
            </ul>
          </div>

          <div class="mb-4">
            <h3 class="text-h6 font-weight-bold mb-2">3. Chia sẻ thông tin</h3>
            <p class="text-body-2">
              Chúng tôi có thể chia sẻ thông tin với:
            </p>
            <ul class="text-body-2">
              <li><strong>Tài xế:</strong> Thông tin cần thiết để thực hiện chuyến đi</li>
              <li><strong>Đối tác:</strong> Các nhà cung cấp dịch vụ thanh toán, bảo hiểm</li>
              <li><strong>Cơ quan pháp luật:</strong> Khi được yêu cầu theo quy định pháp luật</li>
            </ul>
          </div>

          <div class="mb-4">
            <h3 class="text-h6 font-weight-bold mb-2">4. Bảo mật thông tin</h3>
            <p class="text-body-2">
              Chúng tôi sử dụng các biện pháp bảo mật tiên tiến:
            </p>
            <ul class="text-body-2">
              <li>Mã hóa SSL/TLS cho tất cả dữ liệu truyền tải</li>
              <li>Mã hóa dữ liệu nhạy cảm trong cơ sở dữ liệu</li>
              <li>Kiểm soát truy cập nghiêm ngặt</li>
              <li>Giám sát bảo mật 24/7</li>
            </ul>
          </div>

          <div class="mb-4">
            <h3 class="text-h6 font-weight-bold mb-2">5. Quyền của bạn</h3>
            <ul class="text-body-2">
              <li>Truy cập và chỉnh sửa thông tin cá nhân</li>
              <li>Yêu cầu xóa tài khoản và dữ liệu</li>
              <li>Rút lại sự đồng ý bất kỳ lúc nào</li>
              <li>Nhận báo cáo về dữ liệu cá nhân</li>
            </ul>
          </div>

          <div class="mb-4">
            <h3 class="text-h6 font-weight-bold mb-2">6. Cookie và công nghệ theo dõi</h3>
            <p class="text-body-2">
              Chúng tôi sử dụng cookie để cải thiện trải nghiệm người dùng,
              phân tích lưu lượng truy cập và cá nhân hóa nội dung.
            </p>
          </div>

          <div class="mb-4">
            <h3 class="text-h6 font-weight-bold mb-2">7. Lưu trữ dữ liệu</h3>
            <p class="text-body-2">
              Dữ liệu được lưu trữ tại các trung tâm dữ liệu an toàn tại Việt Nam.
              Chúng tôi chỉ lưu trữ dữ liệu trong thời gian cần thiết để cung cấp dịch vụ.
            </p>
          </div>

          <div class="mb-4">
            <h3 class="text-h6 font-weight-bold mb-2">8. Liên hệ</h3>
            <p class="text-body-2">
              Nếu bạn có câu hỏi về chính sách bảo mật, vui lòng liên hệ:
            </p>
            <ul class="text-body-2">
              <li><strong>Email:</strong> privacy@lacgo.com</li>
              <li><strong>Hotline:</strong> 1900 1234</li>
              <li><strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP.HCM</li>
            </ul>
          </div>

          <div class="text-center mt-6">
            <v-btn
              color="green-lighten-1"
              @click="showPrivacySheet = false"
              rounded="lg"
            >
              Đã đọc và hiểu
            </v-btn>
          </div>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Form data
const form = reactive({
  name: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
})

// UI state
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const registerForm = ref()
const showTermsSheet = ref(false)
const showPrivacySheet = ref(false)

// Validation rules
const nameRules = [
  (v: string) => !!v || 'Họ và tên là bắt buộc',
  (v: string) => (v && v.length >= 2) || 'Họ và tên phải có ít nhất 2 ký tự'
]

const phoneRules = [
  (v: string) => !!v || 'Số điện thoại là bắt buộc',
  (v: string) => {
    const phonePattern = /^(?:\+?0)(?:3[2-9]|5[689]|7[06-9]|8[1-9]|9[0-9])\d{7}$/;
    return phonePattern.test(v) || 'Số điện thoại không hợp lệ'
  }
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
    const result = await authStore.register({
      name: form.name,
      phone: form.phone,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      acceptTerms: form.acceptTerms
    })

    if (result.success) {
      // Redirect to home page
      router.push('/')
    } else {
      // Show error message (you can add a snackbar or alert here)
      console.error('Register failed:', result.error)
    }
  }
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  background: white;
}

/* Responsive */
@media (max-width: 600px) {
  .register-container {
    padding: 1rem;
  }
}
</style>
