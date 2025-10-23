<template>
  <div class="privacy-container">
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
      
      <h1 class="title">Chính sách bảo mật</h1>
      <div style="width: 40px"></div>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Last Updated -->
      <div class="last-updated">
        <v-icon size="16" color="grey-darken-1">mdi-shield-check</v-icon>
        <span>Cập nhật lần cuối: 23/10/2025</span>
      </div>

      <!-- Privacy Content -->
      <div class="privacy-content">
        <!-- Introduction -->
        <div class="privacy-section">
          <h2 class="section-title">Giới thiệu</h2>
          <p class="section-text">
            LacGo cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn. Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn.
          </p>
        </div>

        <!-- Data Collection -->
        <div class="privacy-section">
          <h2 class="section-title">1. Thông tin chúng tôi thu thập</h2>
          
          <div class="subsection">
            <h3 class="subsection-title">1.1. Thông tin bạn cung cấp</h3>
            <ul class="section-list">
              <li>Họ tên, số điện thoại, email</li>
              <li>Thông tin thanh toán (thẻ ngân hàng, ví điện tử)</li>
              <li>Ảnh đại diện và thông tin hồ sơ</li>
              <li>Địa chỉ đón và trả khách</li>
            </ul>
          </div>

          <div class="subsection">
            <h3 class="subsection-title">1.2. Thông tin tự động thu thập</h3>
            <ul class="section-list">
              <li>Vị trí địa lý khi sử dụng ứng dụng</li>
              <li>Thông tin thiết bị (loại máy, hệ điều hành)</li>
              <li>Lịch sử sử dụng dịch vụ</li>
              <li>Dữ liệu về chuyến đi (thời gian, tuyến đường)</li>
            </ul>
          </div>
        </div>

        <!-- Data Usage -->
        <div class="privacy-section">
          <h2 class="section-title">2. Cách chúng tôi sử dụng thông tin</h2>
          <ul class="section-list">
            <li>Cung cấp và cải thiện dịch vụ</li>
            <li>Xử lý thanh toán và giao dịch</li>
            <li>Gửi thông báo về chuyến đi và khuyến mãi</li>
            <li>Hỗ trợ khách hàng</li>
            <li>Phân tích và nghiên cứu thị trường</li>
            <li>Đảm bảo an toàn và bảo mật</li>
          </ul>
        </div>

        <!-- Data Sharing -->
        <div class="privacy-section">
          <h2 class="section-title">3. Chia sẻ thông tin</h2>
          <p class="section-text mb-3">
            Chúng tôi có thể chia sẻ thông tin của bạn với:
          </p>
          <ul class="section-list">
            <li><strong>Tài xế:</strong> Thông tin cần thiết để hoàn thành chuyến đi</li>
            <li><strong>Đối tác thanh toán:</strong> Để xử lý giao dịch</li>
            <li><strong>Cơ quan pháp luật:</strong> Khi có yêu cầu hợp lệ</li>
            <li><strong>Nhà cung cấp dịch vụ:</strong> Hỗ trợ vận hành hệ thống</li>
          </ul>
          <p class="section-text mt-3">
            Chúng tôi <strong>KHÔNG</strong> bán thông tin cá nhân của bạn cho bên thứ ba.
          </p>
        </div>

        <!-- Data Security -->
        <div class="privacy-section">
          <h2 class="section-title">4. Bảo mật thông tin</h2>
          <p class="section-text mb-3">
            Chúng tôi áp dụng các biện pháp bảo mật:
          </p>
          <div class="security-grid">
            <div class="security-item">
              <v-icon color="green-lighten-1" size="24">mdi-lock</v-icon>
              <div class="security-info">
                <h4>Mã hóa dữ liệu</h4>
                <p>SSL/TLS encryption</p>
              </div>
            </div>
            <div class="security-item">
              <v-icon color="blue-lighten-1" size="24">mdi-server-security</v-icon>
              <div class="security-info">
                <h4>Máy chủ an toàn</h4>
                <p>Firewall và monitoring</p>
              </div>
            </div>
            <div class="security-item">
              <v-icon color="orange-lighten-1" size="24">mdi-shield-check</v-icon>
              <div class="security-info">
                <h4>Kiểm tra bảo mật</h4>
                <p>Định kỳ hàng tháng</p>
              </div>
            </div>
            <div class="security-item">
              <v-icon color="purple-lighten-1" size="24">mdi-account-lock</v-icon>
              <div class="security-info">
                <h4>Kiểm soát truy cập</h4>
                <p>Chỉ nhân viên được ủy quyền</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Your Rights -->
        <div class="privacy-section">
          <h2 class="section-title">5. Quyền của bạn</h2>
          <ul class="section-list">
            <li><strong>Truy cập:</strong> Xem thông tin cá nhân của bạn</li>
            <li><strong>Chỉnh sửa:</strong> Cập nhật thông tin không chính xác</li>
            <li><strong>Xóa:</strong> Yêu cầu xóa tài khoản và dữ liệu</li>
            <li><strong>Từ chối:</strong> Không đồng ý nhận thông tin quảng cáo</li>
            <li><strong>Di chuyển:</strong> Xuất dữ liệu của bạn</li>
          </ul>
        </div>

        <!-- Cookies -->
        <div class="privacy-section">
          <h2 class="section-title">6. Cookies và công nghệ theo dõi</h2>
          <p class="section-text">
            Chúng tôi sử dụng cookies và công nghệ tương tự để cải thiện trải nghiệm người dùng, phân tích lưu lượng và cá nhân hóa nội dung. Bạn có thể quản lý cookies trong cài đặt trình duyệt.
          </p>
        </div>

        <!-- Children -->
        <div class="privacy-section">
          <h2 class="section-title">7. Trẻ em</h2>
          <p class="section-text">
            Dịch vụ của chúng tôi dành cho người từ 18 tuổi trở lên. Chúng tôi không cố ý thu thập thông tin từ trẻ em dưới 18 tuổi.
          </p>
        </div>

        <!-- Changes -->
        <div class="privacy-section">
          <h2 class="section-title">8. Thay đổi chính sách</h2>
          <p class="section-text">
            Chúng tôi có thể cập nhật chính sách này định kỳ. Thay đổi quan trọng sẽ được thông báo qua email hoặc trong ứng dụng.
          </p>
        </div>

        <!-- Contact -->
        <div class="privacy-section">
          <h2 class="section-title">9. Liên hệ</h2>
          <p class="section-text mb-3">
            Nếu bạn có câu hỏi về chính sách bảo mật, vui lòng liên hệ:
          </p>
          <div class="contact-info">
            <div class="contact-item">
              <v-icon size="18" color="green-lighten-1">mdi-email</v-icon>
              <span>privacy@lacgo.vn</span>
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
          @click="acceptPrivacy"
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

const acceptPrivacy = () => {
  router.back()
}
</script>

<style scoped>
.privacy-container {
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
  background: #e8f5e9;
  border-radius: 12px;
  margin-bottom: 20px;
  font-size: 0.85rem;
  color: #616161;
  border: 1px solid #c8e6c9;
}

/* Privacy Content */
.privacy-content {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.privacy-section {
  margin-bottom: 28px;
}

.privacy-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #424242;
  margin: 0 0 12px 0;
}

.subsection {
  margin-bottom: 16px;
}

.subsection:last-child {
  margin-bottom: 0;
}

.subsection-title {
  font-size: 1rem;
  font-weight: 600;
  color: #424242;
  margin: 0 0 10px 0;
}

.section-text {
  font-size: 0.95rem;
  color: #616161;
  line-height: 1.7;
  margin: 0;
}

.section-list {
  margin: 8px 0;
  padding-left: 20px;
}

.section-list li {
  margin-bottom: 8px;
  line-height: 1.6;
  color: #616161;
  font-size: 0.95rem;
}

.section-list li strong {
  color: #424242;
  font-weight: 600;
}

/* Security Grid */
.security-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 12px;
}

.security-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e8f5e9;
}

.security-info {
  flex: 1;
  min-width: 0;
}

.security-info h4 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #424242;
  margin: 0 0 4px 0;
}

.security-info p {
  font-size: 0.8rem;
  color: #757575;
  margin: 0;
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
@media (max-width: 768px) {
  .security-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .content {
    padding: 16px 12px;
  }

  .privacy-content {
    padding: 20px;
  }
}
</style>

