<script setup lang="ts">
import { useHead } from '@unhead/vue'
import LandingHeader from '@/components/LandingHeader.vue'
import LandingFooter from '@/components/LandingFooter.vue'

const siteUrl = 'https://lacgo.vn'

useHead({
  title: 'Chính Sách Bảo Mật LạcGO - Bảo Vệ Dữ Liệu Cá Nhân',
  meta: [
    { name: 'description', content: 'Chính sách bảo mật thông tin cá nhân LạcGO. Cách thu thập, sờ dụng, bảo vệ và quyền của bạn. Tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân.' },
    { name: 'keywords', content: 'chính sách bảo mật LạcGO, bảo vệ dữ liệu, thông tin cá nhân, quyền riêng tư, GDPR' },
    { name: 'robots', content: 'index, follow' },

    // Open Graph
    { property: 'og:title', content: 'Chính Sách Bảo Mật LạcGO' },
    { property: 'og:description', content: 'Chính sách bảo mật thông tin cá nhân của LạcGO. Tuân thủ Nghị định 13/2023/NĐ-CP.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${siteUrl}/privacy-policy` },
    { property: 'og:locale', content: 'vi_VN' },

    // Twitter Card
    { name: 'twitter:card', content: 'summary' },
  ],
  link: [
    { rel: 'canonical', href: `${siteUrl}/privacy-policy` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Chính sách bảo mật LạcGO',
        description: 'Chính sách bảo vệ dữ liệu và quyền riêng tư cá nhân',
        datePublished: '2023-01-01',
        dateModified: '2025-11-27',
        publisher: {
          '@type': 'Organization',
          name: 'LạcGO',
          url: siteUrl
        }
      })
    }
  ]
})
</script>

<template>
  <section class="legal-page">
    <LandingHeader />

    <!-- Hero -->
    <div class="page-hero">
      <div class="hero-container">
        <nav class="breadcrumb" aria-label="breadcrumb">
          <router-link to="/">Trang chủ</router-link>
          <v-icon size="16" aria-hidden="true">mdi-chevron-right</v-icon>
          <span aria-current="page">Chính sách bảo mật</span>
        </nav>
        <h1 class="page-title">Chính sách bảo mật</h1>
        <p class="page-subtitle">Tuân thủ Nghị định 13/2023/NĐ-CP | Cập nhật: 27/11/2025</p>
      </div>
    </div>

    <!-- Content -->
    <div class="page-content">
      <div class="content-container">
        <aside class="sidebar" role="complementary" aria-label="Mục lục">
          <div class="sidebar-sticky">
            <h2 class="sidebar-title">Mục lục</h2>
            <nav class="sidebar-nav" aria-label="Mục lục trang">
              <a href="#section-1" class="sidebar-link">Thu thập dữ liệu</a>
              <a href="#section-2" class="sidebar-link">Mục đích sử dụng</a>
              <a href="#section-3" class="sidebar-link">Chia sẻ dữ liệu</a>
              <a href="#section-4" class="sidebar-link">Bảo mật</a>
              <a href="#section-5" class="sidebar-link">Quyền của bạn</a>
              <a href="#section-6" class="sidebar-link">Liên hệ</a>
            </nav>
          </div>
        </aside>

        <main class="main-content">
          <div class="alert-banner privacy">
            <v-icon color="blue" size="28">mdi-shield-lock-outline</v-icon>
            <div>
              <strong>Cam kết bảo mật:</strong> LạcGO cam kết bảo vệ dữ liệu cá nhân của bạn theo
              Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân và các quy định pháp luật Việt Nam.
            </div>
          </div>

          <section id="section-1" class="content-section">
            <h2 class="section-heading">1. Thu thập dữ liệu</h2>
            <div class="data-grid">
              <div class="data-card">
                <v-icon color="purple" size="32">mdi-account-circle</v-icon>
                <h4>Thông tin cá nhân</h4>
                <p>Họ tên, SĐT, email, ngày sinh</p>
              </div>
              <div class="data-card">
                <v-icon color="blue" size="32">mdi-card-account-details</v-icon>
                <h4>Định danh</h4>
                <p>CMND/CCCD (nếu cần xác minh)</p>
              </div>
              <div class="data-card">
                <v-icon color="green" size="32">mdi-credit-card</v-icon>
                <h4>Thanh toán</h4>
                <p>Thông tin thẻ, tài khoản</p>
              </div>
              <div class="data-card">
                <v-icon color="orange" size="32">mdi-map-marker</v-icon>
                <h4>Vị trí</h4>
                <p>Điểm đón/trả, lộ trình</p>
              </div>
            </div>
          </section>

          <section id="section-2" class="content-section">
            <h2 class="section-heading">2. Mục đích sử dụng</h2>
            <ul class="styled-list">
              <li><v-icon size="18" color="blue">mdi-check-circle</v-icon> Cung cấp dịch vụ kết nối vận tải</li>
              <li><v-icon size="18" color="blue">mdi-check-circle</v-icon> Xử lý đặt vé và thanh toán</li>
              <li><v-icon size="18" color="blue">mdi-check-circle</v-icon> Hỗ trợ khách hàng</li>
              <li><v-icon size="18" color="blue">mdi-check-circle</v-icon> Đảm bảo an toàn, phòng gian lận</li>
              <li><v-icon size="18" color="blue">mdi-check-circle</v-icon> Tuân thủ pháp luật</li>
            </ul>
          </section>

          <section id="section-3" class="content-section">
            <h2 class="section-heading">3. Chia sẻ dữ liệu</h2>
            <div class="sharing-grid">
              <div class="sharing-card allowed">
                <h4><v-icon color="green">mdi-check-circle</v-icon> Được chia sẻ</h4>
                <ul>
                  <li>Đối tác vận tải (cần thiết cho chuyến đi)</li>
                  <li>Nhà cung cấp thanh toán</li>
                  <li>Cơ quan nhà nước (yêu cầu hợp pháp)</li>
                </ul>
              </div>
              <div class="sharing-card denied">
                <h4><v-icon color="red">mdi-close-circle</v-icon> KHÔNG chia sẻ</h4>
                <ul>
                  <li>Bán dữ liệu cho bên thứ ba</li>
                  <li>Quảng cáo chưa được đồng ý</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="section-4" class="content-section">
            <h2 class="section-heading">4. Biện pháp bảo mật</h2>
            <div class="security-grid">
              <div class="security-item">
                <v-icon color="blue" size="40">mdi-lock</v-icon>
                <h4>Mã hóa SSL/TLS</h4>
                <p>Bảo vệ dữ liệu khi truyền tải</p>
              </div>
              <div class="security-item">
                <v-icon color="blue" size="40">mdi-shield-lock</v-icon>
                <h4>Mã hóa lưu trữ</h4>
                <p>Dữ liệu nhạy cảm được mã hóa</p>
              </div>
              <div class="security-item">
                <v-icon color="blue" size="40">mdi-firewall</v-icon>
                <h4>Tường lửa</h4>
                <p>Hệ thống phát hiện xâm nhập</p>
              </div>
              <div class="security-item">
                <v-icon color="blue" size="40">mdi-account-lock</v-icon>
                <h4>Phân quyền</h4>
                <p>Kiểm soát truy cập nghiêm ngặt</p>
              </div>
            </div>
          </section>

          <section id="section-5" class="content-section">
            <h2 class="section-heading">5. Quyền của bạn</h2>
            <div class="rights-box">
              <p class="rights-intro">Theo Nghị định 13/2023/NĐ-CP, bạn có các quyền sau:</p>
              <div class="rights-grid">
                <div class="right-item">
                  <v-icon color="purple">mdi-eye</v-icon>
                  <strong>Quyền được biết</strong>
                  <p>Biết dữ liệu nào được thu thập</p>
                </div>
                <div class="right-item">
                  <v-icon color="blue">mdi-file-document</v-icon>
                  <strong>Quyền truy cập</strong>
                  <p>Yêu cầu bản sao dữ liệu</p>
                </div>
                <div class="right-item">
                  <v-icon color="green">mdi-pencil</v-icon>
                  <strong>Quyền chỉnh sửa</strong>
                  <p>Sửa thông tin không chính xác</p>
                </div>
                <div class="right-item">
                  <v-icon color="red">mdi-delete</v-icon>
                  <strong>Quyền xóa</strong>
                  <p>Yêu cầu xóa dữ liệu</p>
                </div>
              </div>
            </div>
          </section>

          <section id="section-6" class="content-section">
            <h2 class="section-heading">6. Liên hệ về bảo mật</h2>
            <div class="contact-grid">
              <div class="contact-card">
                <v-icon size="40" color="blue">mdi-email</v-icon>
                <h4>Email</h4>
                <p>privacy@lacgo.vn</p>
              </div>
              <div class="contact-card">
                <v-icon size="40" color="blue">mdi-phone</v-icon>
                <h4>Hotline</h4>
                <p>1900 xxxx (8h-22h)</p>
              </div>
            </div>
          </section>

          <div class="back-section">
            <router-link to="/" class="btn-back">
              <v-icon left>mdi-arrow-left</v-icon>
              Về trang chủ
            </router-link>
          </div>
        </main>
      </div>
    </div>

    <LandingFooter />
  </section>
</template>

<style scoped>
/* Tái sử dụng styles từ Terms.vue */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.legal-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #ffffff;
  color: #1a1a1a;
  overflow: visible;
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
  font-size: 1.1rem;
  color: #757575;
}

/* Content */
.page-content {
  padding: 4rem 0;
  background: white;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  gap: 4rem;
  align-items: flex-start;
}

/* Sidebar */
.sidebar {
  position: -webkit-sticky;
  position: sticky;
  top: 80px;
  width: 280px;
  flex-shrink: 0;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  z-index: 10;
}

.sidebar::-webkit-scrollbar {
  width: 4px;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #e0e0e0;
  border-radius: 4px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: #bdbdbd;
}

.sidebar-sticky {
  padding-right: 0.5rem;
}

.sidebar-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar-link {
  padding: 0.75rem 1rem;
  color: #616161;
  text-decoration: none;
  font-size: 0.9rem;
  border-radius: 8px;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.sidebar-link:hover {
  background: #f5f5f5;
  color: #42A5F5;
  border-left-color: #42A5F5;
}

.sidebar-link.active {
  background: #E3F2FD;
  color: #42A5F5;
  border-left-color: #42A5F5;
  font-weight: 600;
}

html {
  scroll-behavior: smooth;
}

/* Main */
.main-content {
  max-width: 800px;
  flex: 1;
  min-width: 0;
}

.alert-banner.privacy {
  background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
  border-left: 4px solid #2196F3;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 3rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.content-section {
  margin-bottom: 3.5rem;
  scroll-margin-top: 100px;
}

.section-heading {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 3px solid #2196F3;
}

.section-text {
  font-size: 1rem;
  line-height: 1.8;
  color: #424242;
}

.styled-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.styled-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 0;
  font-size: 1rem;
  line-height: 1.7;
}

/* Data Grid */
.data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.data-card {
  background: #f8f9fa;
  padding: 2rem 1.5rem;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s;
  border: 1px solid #e0e0e0;
}

.data-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.data-card h4 {
  font-size: 1rem;
  font-weight: 700;
  margin: 1rem 0 0.5rem;
}

.data-card p {
  font-size: 0.9rem;
  color: #616161;
}

/* Sharing Grid */
.sharing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 1.5rem 0;
}

.sharing-card {
  padding: 2rem;
  border-radius: 12px;
  border: 2px solid;
}

.sharing-card.allowed {
  background: #E8F5E9;
  border-color: #66BB6A;
}

.sharing-card.denied {
  background: #FFEBEE;
  border-color: #EF5350;
}

.sharing-card h4 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.sharing-card ul {
  list-style: none;
  padding: 0;
}

.sharing-card li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.sharing-card li::before {
  content: '•';
  position: absolute;
  left: 0;
  font-weight: bold;
}

/* Security Grid */
.security-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 1.5rem 0;
}

.security-item {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s;
}

.security-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.security-item h4 {
  font-size: 1rem;
  margin: 1rem 0 0.5rem;
}

.security-item p {
  font-size: 0.9rem;
  color: #616161;
}

/* Rights Box */
.rights-box {
  background: #f5f5f5;
  padding: 2rem;
  border-radius: 12px;
  margin: 1.5rem 0;
}

.rights-intro {
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.rights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.right-item {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
}

.right-item strong {
  display: block;
  margin: 0.75rem 0 0.5rem;
  font-size: 0.95rem;
}

.right-item p {
  font-size: 0.85rem;
  color: #616161;
}

/* Contact Grid */
.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 1.5rem 0;
}

.contact-card {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s;
}

.contact-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.contact-card h4 {
  margin: 1rem 0 0.5rem;
  font-size: 1.1rem;
}

.contact-card p {
  color: #2196F3;
  font-weight: 600;
}

/* Back Section */
.back-section {
  margin-top: 4rem;
  text-align: center;
}

.btn-back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #42A5F5 0%, #2196F3 100%);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  box-shadow: 0 8px 25px rgba(33, 150, 243, 0.35);
  transition: all 0.3s;
}

.btn-back:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(33, 150, 243, 0.45);
}

/* Responsive */
@media (max-width: 968px) {
  .content-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .sidebar { display: none; }
  .page-title { font-size: 2rem; }
  .nav-link:not(.btn-login) { display: none; }
}

@media (max-width: 640px) {
  .data-grid,
  .sharing-grid,
  .security-grid,
  .rights-grid,
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
