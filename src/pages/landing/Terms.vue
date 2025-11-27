<script setup lang="ts">
import { useHead } from '@unhead/vue'
import LandingHeader from '@/components/LandingHeader.vue'
import LandingFooter from '@/components/LandingFooter.vue'

const siteUrl = 'https://lacgo.vn'

useHead({
  title: 'Điều Khoản Sử Dụng LạcGO - Quy Định & Chính Sách',
  meta: [
    { name: 'description', content: 'Điều khoản sử dụng dịch vụ LạcGO. Quy định về đặt vé, thanh toán, huỷ chuyến, trách nhiệm của các bên. Tuân thủ Nghị định 10/2020/NĐ-CP và pháp luật Việt Nam.' },
    { name: 'keywords', content: 'điều khoản sử dụng LạcGO, quy định LạcGO, chính sách LạcGO, điều kiện sờ dụng' },
    { name: 'robots', content: 'index, follow' },
    
    // Open Graph
    { property: 'og:title', content: 'Điều Khoản Sử Dụng LạcGO' },
    { property: 'og:description', content: 'Quy định về đặt vé, thanh toán, huỷ chuyến và trách nhiệm của các bên khi sử dụng dịch vụ LạcGO.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${siteUrl}/terms-of-use` },
    { property: 'og:locale', content: 'vi_VN' },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary' },
  ],
  link: [
    { rel: 'canonical', href: `${siteUrl}/terms-of-use` },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Điều khoản sử dụng LạcGO',
        description: 'Quy định về sờ dụng dịch vụ đặt xe ghép liên tỉnh LạcGO',
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

    <!-- Hero Section -->
    <div class="page-hero">
      <div class="hero-container">
        <nav class="breadcrumb" aria-label="breadcrumb">
          <router-link to="/">Trang chủ</router-link>
          <v-icon size="16" aria-hidden="true">mdi-chevron-right</v-icon>
          <span aria-current="page">Điều khoản sử dụng</span>
        </nav>
        <h1 class="page-title">Điều khoản sử dụng</h1>
        <p class="page-subtitle">Cập nhật lần cuối: 27/11/2025</p>
      </div>
    </div>

    <!-- Content -->
    <div class="page-content">
      <div class="content-container">
        <aside class="sidebar" role="complementary" aria-label="Mục lục">
          <div class="sidebar-sticky">
            <h2 class="sidebar-title">Mục lục</h2>
            <nav class="sidebar-nav" aria-label="Mục lục trang">
              <a href="#section-1" class="sidebar-link">1. Giới thiệu</a>
              <a href="#section-2" class="sidebar-link">2. Định nghĩa</a>
              <a href="#section-3" class="sidebar-link">3. Điều kiện sử dụng</a>
              <a href="#section-4" class="sidebar-link">4. Đặt vé & Thanh toán</a>
              <a href="#section-5" class="sidebar-link">5. Trách nhiệm</a>
              <a href="#section-6" class="sidebar-link">6. Luật áp dụng</a>
              <a href="#section-7" class="sidebar-link">7. Liên hệ</a>
            </nav>
          </div>
        </aside>

        <main class="main-content">
          <div class="alert-banner">
            <v-icon color="green" size="28">mdi-information-outline</v-icon>
            <div>
              <strong>Lưu ý quan trọng:</strong> LạcGO là nền tảng công nghệ trung gian kết nối hành khách 
              với các đơn vị vận tải hợp pháp. Chúng tôi KHÔNG trực tiếp cung cấp dịch vụ vận chuyển.
            </div>
          </div>

          <section id="section-1" class="content-section">
            <h2 class="section-heading">1. Giới thiệu</h2>
            <p class="section-text">
              Bằng việc sử dụng nền tảng LạcGO, bạn đồng ý tuân thủ các điều khoản sau. 
              Dịch vụ vận chuyển thực tế do các đơn vị vận tải độc lập cung cấp.
            </p>
          </section>

          <section id="section-2" class="content-section">
            <h2 class="section-heading">2. Định nghĩa</h2>
            <div class="definition-grid">
              <div class="definition-card">
                <div class="definition-icon">
                  <v-icon color="green">mdi-application</v-icon>
                </div>
                <div>
                  <strong>"Nền tảng"</strong>
                  <p>Ứng dụng và website LạcGO</p>
                </div>
              </div>
              <div class="definition-card">
                <div class="definition-icon">
                  <v-icon color="blue">mdi-account</v-icon>
                </div>
                <div>
                  <strong>"Người dùng"</strong>
                  <p>Cá nhân/tổ chức sử dụng nền tảng để đặt vé</p>
                </div>
              </div>
              <div class="definition-card">
                <div class="definition-icon">
                  <v-icon color="orange">mdi-car-multiple</v-icon>
                </div>
                <div>
                  <strong>"Đối tác vận tải"</strong>
                  <p>Đơn vị có giấy phép kinh doanh vận tải hợp pháp</p>
                </div>
              </div>
            </div>
          </section>

          <section id="section-3" class="content-section">
            <h2 class="section-heading">3. Điều kiện sử dụng</h2>
            <p class="section-text"><strong>Bạn phải:</strong></p>
            <ul class="styled-list">
              <li><v-icon size="18" color="green">mdi-check-circle</v-icon> Từ đủ 18 tuổi hoặc có sự đồng ý của người giám hộ</li>
              <li><v-icon size="18" color="green">mdi-check-circle</v-icon> Cung cấp thông tin chính xác khi đăng ký</li>
              <li><v-icon size="18" color="green">mdi-check-circle</v-icon> Bảo mật thông tin đăng nhập</li>
              <li><v-icon size="18" color="green">mdi-check-circle</v-icon> Tuân thủ pháp luật Việt Nam</li>
            </ul>
          </section>

          <section id="section-4" class="content-section">
            <h2 class="section-heading">4. Đặt vé & Thanh toán</h2>
            <p class="section-text">Khi đặt vé, bạn giao kết hợp đồng vận chuyển trực tiếp với đối tác vận tải.</p>
            <div class="info-box">
              <h4>Chính sách hủy vé:</h4>
              <div class="policy-grid">
                <div class="policy-item">
                  <div class="policy-badge green">24h+</div>
                  <div>Hoàn 80-90%</div>
                </div>
                <div class="policy-item">
                  <div class="policy-badge yellow">12-24h</div>
                  <div>Hoàn 50-70%</div>
                </div>
                <div class="policy-item">
                  <div class="policy-badge red">Dưới 12h</div>
                  <div>Hoàn 0-30%</div>
                </div>
              </div>
            </div>
          </section>

          <section id="section-5" class="content-section">
            <h2 class="section-heading">5. Trách nhiệm</h2>
            <div class="responsibility-grid">
              <div class="responsibility-card positive">
                <h4><v-icon color="green">mdi-check-decagram</v-icon> LạcGO chịu trách nhiệm</h4>
                <ul>
                  <li>Cung cấp nền tảng kết nối ổn định</li>
                  <li>Xác minh thông tin đối tác vận tải</li>
                  <li>Hỗ trợ giải quyết tranh chấp</li>
                  <li>Bảo mật dữ liệu cá nhân</li>
                </ul>
              </div>
              <div class="responsibility-card negative">
                <h4><v-icon color="red">mdi-close-circle</v-icon> LạcGO KHÔNG chịu trách nhiệm</h4>
                <ul>
                  <li>Chất lượng dịch vụ vận chuyển</li>
                  <li>Tai nạn, thất lạc hành lý</li>
                  <li>Tranh chấp với đối tác vận tải</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="section-6" class="content-section">
            <h2 class="section-heading">6. Luật áp dụng</h2>
            <p class="section-text">Điều khoản này tuân thủ:</p>
            <div class="law-list">
              <div class="law-item">
                <v-icon color="blue">mdi-scale-balance</v-icon>
                <span>Luật Giao thông đường bộ 2008</span>
              </div>
              <div class="law-item">
                <v-icon color="blue">mdi-scale-balance</v-icon>
                <span>Nghị định 10/2020/NĐ-CP</span>
              </div>
              <div class="law-item">
                <v-icon color="blue">mdi-scale-balance</v-icon>
                <span>Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu</span>
              </div>
              <div class="law-item">
                <v-icon color="blue">mdi-scale-balance</v-icon>
                <span>Luật Bảo vệ quyền lợi người tiêu dùng</span>
              </div>
            </div>
          </section>

          <section id="section-7" class="content-section">
            <h2 class="section-heading">7. Liên hệ</h2>
            <div class="contact-grid">
              <div class="contact-card">
                <v-icon size="40" color="green">mdi-email</v-icon>
                <h4>Email</h4>
                <p>legal@lacgo.vn</p>
              </div>
              <div class="contact-card">
                <v-icon size="40" color="green">mdi-phone</v-icon>
                <h4>Hotline</h4>
                <p>1900 xxxx (24/7)</p>
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

<script setup lang="ts">
import LandingHeader from '@/components/LandingHeader.vue'
import LandingFooter from '@/components/LandingFooter.vue'
</script>

<style scoped>
/* Import font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.legal-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #ffffff;
  color: #1a1a1a;
  overflow: visible;
}

/* Hero Section */
.page-hero {
  background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%);
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
  color: #66BB6A;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb a:hover {
  color: #4CAF50;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
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
  color: #1a1a1a;
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
  color: #66BB6A;
  border-left-color: #66BB6A;
}

.sidebar-link.active {
  background: #E8F5E9;
  color: #66BB6A;
  border-left-color: #66BB6A;
  font-weight: 600;
}

html {
  scroll-behavior: smooth;
}

/* Main Content */
.main-content {
  max-width: 800px;
  flex: 1;
  min-width: 0;
}

.alert-banner {
  background: linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%);
  border-left: 4px solid #66BB6A;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 3rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  box-shadow: 0 2px 12px rgba(102, 187, 106, 0.1);
}

.alert-banner strong {
  color: #2E7D32;
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
  border-bottom: 3px solid #66BB6A;
}

.section-text {
  font-size: 1rem;
  line-height: 1.8;
  color: #424242;
  margin-bottom: 1rem;
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
  color: #424242;
}

/* Definition Grid */
.definition-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.definition-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  gap: 1rem;
  border: 1px solid #e0e0e0;
  transition: all 0.3s;
}

.definition-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: #66BB6A;
}

.definition-icon {
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.definition-card strong {
  display: block;
  color: #1a1a1a;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.definition-card p {
  color: #616161;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
}

/* Info Box */
.info-box {
  background: #f5f5f5;
  padding: 2rem;
  border-radius: 12px;
  margin: 1.5rem 0;
}

.info-box h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}

.policy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.policy-item {
  text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
}

.policy-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.policy-badge.green {
  background: #e8f5e9;
  color: #2E7D32;
}

.policy-badge.yellow {
  background: #fff9c4;
  color: #F57F17;
}

.policy-badge.red {
  background: #ffebee;
  color: #C62828;
}

/* Responsibility Grid */
.responsibility-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 1.5rem 0;
}

.responsibility-card {
  padding: 2rem;
  border-radius: 12px;
  border: 2px solid;
}

.responsibility-card.positive {
  background: #e8f5e9;
  border-color: #66BB6A;
}

.responsibility-card.negative {
  background: #ffebee;
  border-color: #EF5350;
}

.responsibility-card h4 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.responsibility-card ul {
  list-style: none;
  padding: 0;
}

.responsibility-card li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  color: #424242;
}

.responsibility-card li::before {
  content: '•';
  position: absolute;
  left: 0;
  font-weight: bold;
}

/* Law List */
.law-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
}

.law-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: #f5f5f5;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #424242;
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
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 1rem 0 0.5rem;
}

.contact-card p {
  color: #66BB6A;
  font-weight: 600;
  font-size: 1rem;
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
  background: linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.05rem;
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.35);
  transition: all 0.3s;
}

.btn-back:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(76, 175, 80, 0.45);
}

/* Responsive */
@media (max-width: 968px) {
  .content-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .sidebar {
    display: none;
  }

  .page-title {
    font-size: 2rem;
  }

  .nav-link:not(.btn-login) {
    display: none;
  }
}

@media (max-width: 640px) {
  .hero-container,
  .content-container {
    padding: 0 1rem;
  }

  .section-heading {
    font-size: 1.4rem;
  }

  .definition-grid,
  .responsibility-grid,
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
