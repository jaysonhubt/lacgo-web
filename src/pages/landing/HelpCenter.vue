<script setup lang="ts">
import { useHead } from '@unhead/vue'
import LandingHeader from '@/components/LandingHeader.vue'
import LandingFooter from '@/components/LandingFooter.vue'

const siteUrl = 'https://lacgo.vn'

useHead({
  title: 'Trung Tâm Hỗ Trợ LạcGO - Câu Hỏi Thường Gặp & Liên Hệ',
  meta: [
    { name: 'description', content: 'Trung tâm hỗ trợ LạcGO 24/7. Tìm câu trả lời cho các thắc mắc về đặt xe, thanh toán, huỷ chuyến. Liên hệ qua hotline 1900-xxxx hoặc email support@lacgo.vn.' },
    { name: 'keywords', content: 'hỗ trợ LạcGO, trợ giúp, FAQ, câu hỏi thường gặp, liên hệ LạcGO, hotline, hướng dẫn đặt xe' },
    { name: 'robots', content: 'index, follow' },
    
    // Open Graph
    { property: 'og:title', content: 'Trung Tâm Hỗ Trợ LạcGO - Câu Hỏi Thường Gặp' },
    { property: 'og:description', content: 'Trung tâm hỗ trợ LạcGO 24/7. Tìm câu trả lời cho các thắc mắc về đặt xe, thanh toán, huỷ chuyến.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${siteUrl}/help-center` },
    { property: 'og:locale', content: 'vi_VN' },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: 'Trung Tâm Hỗ Trợ LạcGO' },
  ],
  link: [
    { rel: 'canonical', href: `${siteUrl}/help-center` },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Làm thế nào để đặt xe trên LạcGO?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Tải ứng dụng LạcGO, đăng ký tài khoản, chọn điểm đi - điểm đến, chọn thời gian và xác nhận đặt xe.'
            }
          },
          {
            '@type': 'Question',
            name: 'LạcGO hỗ trợ những hình thức thanh toán nào?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'LạcGO hỗ trợ thanh toán qua ví điện tử (Momo, ZaloPay), thẻ ngân hàng, chuyển khoản và tiền mặt.'
            }
          },
          {
            '@type': 'Question',
            name: 'Tôi có thể huỷ chuyến đã đặt không?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Có, bạn có thể huỷ chuyến trước 24h khởi hành để được hoàn tiền 100%. Từ 12-24h trước giờ khởi hành hoàn 50%.'
            }
          },
          {
            '@type': 'Question',
            name: 'LạcGO có hỗ trợ 24/7 không?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Có, đội ngũ chăm sóc khách hàng LạcGO hoạt động 24/7 qua hotline 1900-xxxx, email support@lacgo.vn và chat trong ứng dụng.'
            }
          }
        ]
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Liên hệ LạcGO',
        description: 'Trung tâm hỗ trợ khách hàng LạcGO',
        mainEntity: {
          '@type': 'Organization',
          name: 'LạcGO',
          telephone: '1900-xxxx',
          email: 'support@lacgo.vn'
        }
      })
    }
  ]
})
</script>

<template>
  <section class="help-page">
    <LandingHeader />

    <!-- Hero -->
    <div class="page-hero">
      <div class="hero-container">
        <nav class="breadcrumb" aria-label="breadcrumb">
          <router-link to="/">Trang chủ</router-link>
          <v-icon size="16" aria-hidden="true">mdi-chevron-right</v-icon>
          <span aria-current="page">Trung tâm hỗ trợ</span>
        </nav>
        <h1 class="page-title">Trung tâm hỗ trợ</h1>
        <p class="page-subtitle">Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
      </div>
    </div>

    <!-- Content -->
    <div class="page-content">
      <div class="content-container">
        <!-- Contact Methods -->
        <section class="contact-section">
          <h2 class="section-heading center">Liên hệ với chúng tôi</h2>
          <div class="contact-grid">
            <div class="contact-card">
              <div class="contact-icon">
                <v-icon size="40" color="white">mdi-phone</v-icon>
              </div>
              <h3>Hotline</h3>
              <p class="contact-value">1900 xxxx</p>
              <p class="contact-desc">Hỗ trợ 24/7 qua điện thoại</p>
            </div>
            <div class="contact-card">
              <div class="contact-icon">
                <v-icon size="40" color="white">mdi-email</v-icon>
              </div>
              <h3>Email</h3>
              <p class="contact-value">support@lacgo.vn</p>
              <p class="contact-desc">Phản hồi trong vòng 24h</p>
            </div>
            <div class="contact-card">
              <div class="contact-icon">
                <v-icon size="40" color="white">mdi-chat</v-icon>
              </div>
              <h3>Chat trực tuyến</h3>
              <p class="contact-value">Trong ứng dụng</p>
              <p class="contact-desc">Trò chuyện ngay với tư vấn viên</p>
            </div>
            <div class="contact-card">
              <div class="contact-icon">
                <v-icon size="40" color="white">mdi-facebook</v-icon>
              </div>
              <h3>Facebook</h3>
              <p class="contact-value">fb.com/lacgo</p>
              <p class="contact-desc">Kết nối qua mạng xã hội</p>
            </div>
          </div>
        </section>

        <!-- FAQ Categories -->
        <section class="faq-categories">
          <h2 class="section-heading center">Câu hỏi thường gặp</h2>
          
          <div class="category-section">
            <h3 class="category-title">
              <v-icon color="#66BB6A">mdi-ticket-confirmation</v-icon>
              Đặt vé & Thanh toán
            </h3>
            <div class="faq-list">
              <div class="faq-item">
                <h4 class="faq-question">
                  <v-icon size="18" color="#66BB6A">mdi-chevron-right</v-icon>
                  Làm sao để đặt vé trên LạcGO?
                </h4>
                <p class="faq-answer">
                  Chọn điểm đi - điểm đến, thời gian khởi hành → Chọn chuyến xe → Điền thông tin 
                  hành khách → Chọn phương thức thanh toán → Hoàn tất đặt vé.
                </p>
              </div>
              <div class="faq-item">
                <h4 class="faq-question">
                  <v-icon size="18" color="#66BB6A">mdi-chevron-right</v-icon>
                  Có những phương thức thanh toán nào?
                </h4>
                <p class="faq-answer">
                  Thẻ ATM, thẻ tín dụng, ví điện tử (Momo, ZaloPay, VNPay), chuyển khoản ngân hàng, 
                  và thanh toán khi lên xe (tùy nhà xe).
                </p>
              </div>
              <div class="faq-item">
                <h4 class="faq-question">
                  <v-icon size="18" color="#66BB6A">mdi-chevron-right</v-icon>
                  Tôi có nhận được vé điện tử không?
                </h4>
                <p class="faq-answer">
                  Có, sau khi thanh toán thành công, vé điện tử sẽ được gửi qua email và hiển thị trong 
                  ứng dụng. Bạn chỉ cần xuất trình mã QR khi lên xe.
                </p>
              </div>
            </div>
          </div>

          <div class="category-section">
            <h3 class="category-title">
              <v-icon color="#42A5F5">mdi-cancel</v-icon>
              Hủy vé & Hoàn tiền
            </h3>
            <div class="faq-list">
              <div class="faq-item">
                <h4 class="faq-question">
                  <v-icon size="18" color="#42A5F5">mdi-chevron-right</v-icon>
                  Tôi có thể hủy vé không?
                </h4>
                <p class="faq-answer">
                  Có, chính sách hủy vé phụ thuộc vào từng đơn vị vận tải. Thông thường, hủy trước 24h 
                  sẽ được hoàn 100% tiền vé, hủy trước 12h hoàn 70%, hủy trước 6h hoàn 50%.
                </p>
              </div>
              <div class="faq-item">
                <h4 class="faq-question">
                  <v-icon size="18" color="#42A5F5">mdi-chevron-right</v-icon>
                  Bao lâu tôi nhận được tiền hoàn?
                </h4>
                <p class="faq-answer">
                  Tiền hoàn sẽ được xử lý trong vòng 5-7 ngày làm việc. Với ví điện tử thường nhanh hơn 
                  (1-3 ngày), thẻ ngân hàng 5-7 ngày.
                </p>
              </div>
            </div>
          </div>

          <div class="category-section">
            <h3 class="category-title">
              <v-icon color="#FFA726">mdi-account-circle</v-icon>
              Tài khoản & Bảo mật
            </h3>
            <div class="faq-list">
              <div class="faq-item">
                <h4 class="faq-question">
                  <v-icon size="18" color="#FFA726">mdi-chevron-right</v-icon>
                  Làm sao để tạo tài khoản?
                </h4>
                <p class="faq-answer">
                  Tải ứng dụng LạcGO → Chọn "Đăng ký" → Nhập số điện thoại → Xác thực OTP → 
                  Hoàn tất thông tin cá nhân.
                </p>
              </div>
              <div class="faq-item">
                <h4 class="faq-question">
                  <v-icon size="18" color="#FFA726">mdi-chevron-right</v-icon>
                  Thông tin cá nhân có an toàn không?
                </h4>
                <p class="faq-answer">
                  Tuyệt đối an toàn! Chúng tôi tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân, 
                  sử dụng mã hóa SSL/TLS và không chia sẻ thông tin cho bên thứ ba.
                </p>
              </div>
            </div>
          </div>

          <div class="category-section">
            <h3 class="category-title">
              <v-icon color="#AB47BC">mdi-bus</v-icon>
              Dịch vụ vận chuyển
            </h3>
            <div class="faq-list">
              <div class="faq-item">
                <h4 class="faq-question">
                  <v-icon size="18" color="#AB47BC">mdi-chevron-right</v-icon>
                  LạcGO có phải là công ty vận tải không?
                </h4>
                <p class="faq-answer">
                  Không. LạcGO là nền tảng công nghệ trung gian kết nối bạn với các đơn vị vận tải 
                  được cấp phép hợp pháp. Chúng tôi không trực tiếp vận hành xe.
                </p>
              </div>
              <div class="faq-item">
                <h4 class="faq-question">
                  <v-icon size="18" color="#AB47BC">mdi-chevron-right</v-icon>
                  Nếu có sự cố trong chuyến đi thì sao?
                </h4>
                <p class="faq-answer">
                  Liên hệ ngay hotline 1900 xxxx hoặc chat trong ứng dụng. Chúng tôi sẽ liên lạc với 
                  đơn vị vận tải và hỗ trợ giải quyết vấn đề ngay lập tức.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Support Form -->
        <section class="support-form-section">
          <div class="form-box">
            <h2 class="section-heading center">Không tìm thấy câu trả lời?</h2>
            <p class="form-intro">
              Gửi câu hỏi của bạn cho chúng tôi, đội ngũ hỗ trợ sẽ phản hồi trong vòng 24 giờ
            </p>
            <div class="support-buttons">
              <a href="mailto:support@lacgo.vn" class="btn-support primary">
                <v-icon left>mdi-email</v-icon>
                Gửi email hỗ trợ
              </a>
              <a href="tel:1900xxxx" class="btn-support secondary">
                <v-icon left>mdi-phone</v-icon>
                Gọi hotline
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>

    <LandingFooter />
  </section>
</template>

<script setup lang="ts">
import LandingHeader from '@/components/LandingHeader.vue'
import LandingFooter from '@/components/LandingFooter.vue'
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.help-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #ffffff;
  color: #1a1a1a;
}

/* Hero */
.page-hero {
  background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
  padding: 4rem 0 3rem;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #757575;
}

.breadcrumb a {
  color: #42A5F5;
  text-decoration: none;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1.2rem;
  color: #616161;
}

/* Content */
.page-content {
  padding: 4rem 0;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-heading {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 3rem;
}

.section-heading.center {
  text-align: center;
}

/* Contact Section */
.contact-section {
  margin-bottom: 5rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.contact-card {
  background: linear-gradient(135deg, #f8fdf8 0%, #e8f5e9 100%);
  padding: 2.5rem 2rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s;
  border: 1px solid #e8f5e9;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.contact-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.contact-card h3 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #1a1a1a;
}

.contact-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #66BB6A;
  margin-bottom: 0.5rem;
}

.contact-desc {
  font-size: 0.9rem;
  color: #757575;
  line-height: 1.5;
}

/* FAQ Categories */
.faq-categories {
  margin-bottom: 4rem;
}

.category-section {
  margin-bottom: 3rem;
}

.category-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 3px solid #e0e0e0;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.faq-item {
  background: #f8f9fa;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  border-left: 4px solid #e0e0e0;
  transition: all 0.3s;
}

.faq-item:hover {
  border-left-color: #66BB6A;
  background: #f0f7f1;
}

.faq-question {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
}

.faq-answer {
  font-size: 1rem;
  line-height: 1.7;
  color: #616161;
  margin-left: 1.75rem;
}

/* Support Form */
.support-form-section {
  margin-bottom: 3rem;
}

.form-box {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  padding: 4rem 3rem;
  border-radius: 24px;
  text-align: center;
}

.form-intro {
  font-size: 1.1rem;
  color: #bdbdbd;
  max-width: 600px;
  margin: 0 auto 2.5rem;
}

.support-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-support {
  padding: 1rem 2.5rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
}

.btn-support.primary {
  background: linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%);
  color: white;
  box-shadow: 0 8px 25px rgba(102, 187, 106, 0.35);
}

.btn-support.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(102, 187, 106, 0.45);
}

.btn-support.secondary {
  background: white;
  color: #1a1a1a;
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);
}

.btn-support.secondary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(255, 255, 255, 0.3);
}

/* Responsive */
@media (max-width: 968px) {
  .contact-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .page-title {
    font-size: 2.25rem;
  }

  .section-heading {
    font-size: 2rem;
  }
}

@media (max-width: 640px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .support-buttons {
    flex-direction: column;
  }

  .page-title {
    font-size: 1.75rem;
  }

  .category-title {
    font-size: 1.4rem;
  }
}
</style>
