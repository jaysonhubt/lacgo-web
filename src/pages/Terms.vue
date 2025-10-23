<template>
  <div class="terms-container">
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
      
      <h1 class="title">Điều khoản sử dụng</h1>
      <div style="width: 40px"></div>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Last Updated -->
      <div class="last-updated">
        <v-icon size="16" color="grey-darken-1">mdi-clock-outline</v-icon>
        <span>Cập nhật lần cuối: 23/10/2025</span>
      </div>

      <!-- Terms Content -->
      <div class="terms-content">
        <!-- Introduction -->
        <div class="terms-section">
          <h2 class="section-title">1. Giới thiệu</h2>
          <p class="section-text">
            Chào mừng bạn đến với LacGo. Bằng việc sử dụng dịch vụ của chúng tôi, bạn đồng ý với các điều khoản và điều kiện sau đây. Vui lòng đọc kỹ trước khi sử dụng dịch vụ.
          </p>
        </div>

        <!-- Account -->
        <div class="terms-section">
          <h2 class="section-title">2. Tài khoản người dùng</h2>
          <div class="section-text">
            <p>Khi tạo tài khoản, bạn cam kết:</p>
            <ul>
              <li>Cung cấp thông tin chính xác, đầy đủ và cập nhật</li>
              <li>Bảo mật thông tin đăng nhập của bạn</li>
              <li>Không chia sẻ tài khoản với người khác</li>
              <li>Thông báo ngay cho chúng tôi nếu phát hiện sử dụng trái phép</li>
            </ul>
          </div>
        </div>

        <!-- Service Usage -->
        <div class="terms-section">
          <h2 class="section-title">3. Sử dụng dịch vụ</h2>
          <div class="section-text">
            <p><strong>3.1. Quy định chung</strong></p>
            <ul>
              <li>Bạn phải từ 18 tuổi trở lên để sử dụng dịch vụ</li>
              <li>Chỉ sử dụng dịch vụ cho mục đích hợp pháp</li>
              <li>Tuân thủ mọi luật lệ và quy định hiện hành</li>
            </ul>

            <p class="mt-4"><strong>3.2. Hành vi bị cấm</strong></p>
            <ul>
              <li>Gây rối, quấy rối hoặc đe dọa tài xế</li>
              <li>Sử dụng dịch vụ cho mục đích bất hợp pháp</li>
              <li>Làm giả hoặc can thiệp vào hệ thống</li>
              <li>Spam hoặc gửi nội dung không phù hợp</li>
            </ul>
          </div>
        </div>

        <!-- Payment -->
        <div class="terms-section">
          <h2 class="section-title">4. Thanh toán và phí</h2>
          <div class="section-text">
            <ul>
              <li>Giá cước được tính dựa trên khoảng cách và thời gian</li>
              <li>Bạn đồng ý thanh toán đầy đủ các khoản phí</li>
              <li>Chúng tôi có quyền thay đổi giá cước với thông báo trước</li>
              <li>Phí hủy chuyến áp dụng theo quy định</li>
            </ul>
          </div>
        </div>

        <!-- Cancellation -->
        <div class="terms-section">
          <h2 class="section-title">5. Hủy chuyến</h2>
          <div class="section-text">
            <ul>
              <li>Bạn có thể hủy chuyến miễn phí trong vòng 2 phút sau khi đặt</li>
              <li>Hủy chuyến sau thời gian này có thể phải chịu phí</li>
              <li>Phí hủy chuyến là 10.000đ - 20.000đ tùy loại xe</li>
            </ul>
          </div>
        </div>

        <!-- Liability -->
        <div class="terms-section">
          <h2 class="section-title">6. Trách nhiệm</h2>
          <div class="section-text">
            <p>Chúng tôi nỗ lực cung cấp dịch vụ tốt nhất, nhưng:</p>
            <ul>
              <li>Không chịu trách nhiệm về hành vi của tài xế ngoài tầm kiểm soát</li>
              <li>Không đảm bảo dịch vụ luôn khả dụng 100%</li>
              <li>Có quyền từ chối phục vụ trong trường hợp cần thiết</li>
            </ul>
          </div>
        </div>

        <!-- Changes -->
        <div class="terms-section">
          <h2 class="section-title">7. Thay đổi điều khoản</h2>
          <p class="section-text">
            Chúng tôi có quyền cập nhật các điều khoản này bất cứ lúc nào. Các thay đổi sẽ có hiệu lực ngay khi được đăng tải. Việc tiếp tục sử dụng dịch vụ sau khi thay đổi đồng nghĩa với việc bạn chấp nhận các điều khoản mới.
          </p>
        </div>

        <!-- Contact -->
        <div class="terms-section">
          <h2 class="section-title">8. Liên hệ</h2>
          <p class="section-text">
            Nếu có bất kỳ câu hỏi nào về các điều khoản này, vui lòng liên hệ:
          </p>
          <div class="contact-info">
            <div class="contact-item">
              <v-icon size="18" color="green-lighten-1">mdi-email</v-icon>
              <span>support@lacgo.vn</span>
            </div>
            <div class="contact-item">
              <v-icon size="18" color="green-lighten-1">mdi-phone</v-icon>
              <span>1900 xxxx</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Accept Button -->
      <div class="accept-section">
        <v-btn
          color="green-lighten-1"
          size="large"
          block
          rounded="lg"
          @click="acceptTerms"
        >
          <v-icon start>mdi-check</v-icon>
          Tôi đã hiểu
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}

const acceptTerms = () => {
  router.back()
}
</script>

<style scoped>
.terms-container {
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

.last-updated {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #e3f2fd;
  border-radius: 12px;
  margin-bottom: 20px;
  font-size: 0.85rem;
  color: #616161;
}

/* Terms Content */
.terms-content {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.terms-section {
  margin-bottom: 28px;
}

.terms-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #424242;
  margin: 0 0 12px 0;
}

.section-text {
  font-size: 0.95rem;
  color: #616161;
  line-height: 1.7;
  margin: 0;
}

.section-text ul {
  margin: 12px 0;
  padding-left: 20px;
}

.section-text li {
  margin-bottom: 8px;
  line-height: 1.6;
}

.section-text strong {
  color: #424242;
  font-weight: 600;
}

/* Contact Info */
.contact-info {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #424242;
}

/* Accept Section */
.accept-section {
  position: sticky;
  bottom: 16px;
}

/* Responsive */
@media (max-width: 480px) {
  .content {
    padding: 16px 12px;
  }

  .terms-content {
    padding: 20px;
  }
}
</style>

