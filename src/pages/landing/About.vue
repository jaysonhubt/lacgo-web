<script setup lang="ts">
import { useHead } from '@unhead/vue'
import LandingHeader from '@/components/LandingHeader.vue'
import LandingFooter from '@/components/LandingFooter.vue'

const siteUrl = 'https://lacgo.vn'

useHead({
  title: 'Giới Thiệu Về LạcGO - Nền Tảng Kết Nối Vận Tải Liên Tỉnh',
  meta: [
    { name: 'description', content: 'Tìm hiểu về LạcGO - Nền tảng công nghệ trung gian kết nối hành khách với 500+ đơn vị vận tải uy tín. Sứ mệnh làm cho đi lại liên tỉnh dễ dàng, tiện lợi và an toàn.' },
    { name: 'keywords', content: 'giới thiệu LạcGO, về LạcGO, nền tảng vận tải, công nghệ di chuyển, vận tải liên tỉnh' },
    { name: 'robots', content: 'index, follow' },
    
    // Open Graph
    { property: 'og:title', content: 'Giới Thiệu Về LạcGO - Nền Tảng Kết Nối Vận Tải Liên Tỉnh' },
    { property: 'og:description', content: 'Tìm hiểu về LạcGO - Nền tảng công nghệ trung gian kết nối hành khách với 500+ đơn vị vận tải uy tín trên toàn quốc.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${siteUrl}/about` },
    { property: 'og:image', content: `${siteUrl}/dashboard_bg1_small.png` },
    { property: 'og:locale', content: 'vi_VN' },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Giới Thiệu Về LạcGO' },
    { name: 'twitter:description', content: 'Nền tảng kết nối vận tải liên tỉnh với 500+ đối tác uy tín trên toàn quốc.' },
  ],
  link: [
    { rel: 'canonical', href: `${siteUrl}/about` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'Giới thiệu về LạcGO',
        description: 'Nền tảng công nghệ trung gian kết nối hành khách với các đơn vị vận tải uy tín',
        mainEntity: {
          '@type': 'Organization',
          name: 'LạcGO',
          url: siteUrl,
          foundingDate: '2023',
          description: 'Nền tảng kết nối vận tải liên tỉnh số 1 Việt Nam',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'VN'
          }
        }
      })
    }
  ]
})
</script>

<template>
  <section class="about-page">
    <LandingHeader />

    <!-- Hero -->
    <div class="page-hero">
      <div class="hero-container">
        <nav class="breadcrumb" aria-label="breadcrumb">
          <router-link to="/">Trang chủ</router-link>
          <v-icon size="16" aria-hidden="true">mdi-chevron-right</v-icon>
          <span aria-current="page">Giới thiệu</span>
        </nav>
        <h1 class="page-title">Về LạcGO</h1>
        <p class="page-subtitle">Nền tảng kết nối vận tải hàng đầu Việt Nam</p>
      </div>
    </div>

    <!-- Content -->
    <div class="page-content">
      <div class="content-container">
        <!-- Vision & Mission -->
        <section class="intro-section" aria-labelledby="intro-heading">
          <div class="intro-grid">
            <div class="intro-image">
              <img src="/dashboard_bg1_small.png" alt="Giao diện ứng dụng LạcGO hiển thị danh sách chuyến đi liên tỉnh" loading="lazy" />
            </div>
            <div class="intro-text">
              <h2 id="intro-heading" class="section-heading">Chúng tôi là ai?</h2>
              <p>
                <strong>LạcGO</strong> là nền tảng công nghệ trung gian kết nối hành khách với các đơn vị vận tải 
                uy tín trên toàn quốc. Ra đời với sứ mệnh làm cho việc đi lại liên tỉnh trở nên dễ dàng, 
                tiện lợi và an toàn hơn bao giờ hết.
              </p>
              <p>
                Chúng tôi không trực tiếp cung cấp dịch vụ vận chuyển, mà đóng vai trò là cầu nối tin cậy 
                giữa bạn và hàng trăm đơn vị vận tải được kiểm duyệt kỹ càng.
              </p>
            </div>
          </div>
        </section>

        <!-- Vision & Mission Cards -->
        <section class="vm-section" aria-labelledby="vm-heading">
          <h2 id="vm-heading" class="visually-hidden">Tầm nhìn và sứ mệnh</h2>
          <div class="vm-grid">
            <article class="vm-card vision">
              <div class="vm-icon" aria-hidden="true">
                <v-icon size="48" color="white">mdi-eye-outline</v-icon>
              </div>
              <h3>Tầm nhìn</h3>
              <p>
                Trở thành nền tảng kết nối vận tải liên tỉnh số 1 Việt Nam, mang đến trải nghiệm 
                đặt vé hiện đại, an toàn và tiện lợi cho hàng triệu người dùng.
              </p>
            </article>
            <article class="vm-card mission">
              <div class="vm-icon" aria-hidden="true">
                <v-icon size="48" color="white">mdi-target</v-icon>
              </div>
              <h3>Sứ mệnh</h3>
              <p>
                Kết nối mọi người với các phương tiện vận tải chất lượng cao, 
                đơn giản hóa quy trình đặt vé và mang lại giá trị tốt nhất cho khách hàng.
              </p>
            </article>
          </div>
        </section>

        <!-- Core Values -->
        <section class="values-section" aria-labelledby="values-heading">
          <h2 id="values-heading" class="section-heading center">Giá trị cốt lõi</h2>
          <div class="values-grid" role="list">
            <article class="value-card" role="listitem">
              <v-icon size="40" color="#66BB6A" aria-hidden="true">mdi-shield-check</v-icon>
              <h3>Uy tín</h3>
              <p>Đối tác vận tải được kiểm duyệt kỹ càng, đảm bảo chất lượng dịch vụ</p>
            </article>
            <article class="value-card" role="listitem">
              <v-icon size="40" color="#42A5F5" aria-hidden="true">mdi-lightning-bolt</v-icon>
              <h3>Nhanh chóng</h3>
              <p>Đặt vé chỉ trong vài phút, xác nhận tức thì</p>
            </article>
            <article class="value-card" role="listitem">
              <v-icon size="40" color="#FFA726" aria-hidden="true">mdi-cash-multiple</v-icon>
              <h3>Minh bạch</h3>
              <p>Giá cả rõ ràng, không phát sinh chi phí ẩn</p>
            </article>
            <article class="value-card" role="listitem">
              <v-icon size="40" color="#AB47BC" aria-hidden="true">mdi-heart-outline</v-icon>
              <h3>Tận tâm</h3>
              <p>Hỗ trợ khách hàng 24/7, luôn lắng nghe và cải thiện</p>
            </article>
          </div>
        </section>

        <!-- Stats -->
        <section class="stats-highlight">
          <h2 class="section-heading center">LạcGO trong con số</h2>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">58</div>
              <div class="stat-label">Tỉnh thành</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">500+</div>
              <div class="stat-label">Đối tác vận tải</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">50K+</div>
              <div class="stat-label">Người dùng</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">4.8★</div>
              <div class="stat-label">Đánh giá TB</div>
            </div>
          </div>
        </section>

        <!-- Team -->
        <section class="team-section">
          <h2 class="section-heading center">Đội ngũ</h2>
          <p class="section-subtitle center">
            Đội ngũ chuyên gia công nghệ và vận tải giàu kinh nghiệm
          </p>
          <div class="team-grid">
            <div class="team-card">
              <div class="team-avatar">
                <v-icon size="48" color="white">mdi-account</v-icon>
              </div>
              <h4>Phát triển sản phẩm</h4>
              <p>Xây dựng nền tảng công nghệ hiện đại, thân thiện người dùng</p>
            </div>
            <div class="team-card">
              <div class="team-avatar">
                <v-icon size="48" color="white">mdi-headset</v-icon>
              </div>
              <h4>Chăm sóc khách hàng</h4>
              <p>Hỗ trợ 24/7, giải quyết mọi thắc mắc và vấn đề nhanh chóng</p>
            </div>
            <div class="team-card">
              <div class="team-avatar">
                <v-icon size="48" color="white">mdi-handshake</v-icon>
              </div>
              <h4>Đối tác & Kinh doanh</h4>
              <p>Mở rộng mạng lưới đối tác vận tải uy tín</p>
            </div>
          </div>
        </section>

        <!-- Contact CTA -->
        <section class="cta-section">
          <div class="cta-box">
            <h2>Bạn muốn hợp tác với LạcGO?</h2>
            <p>Liên hệ với chúng tôi để trở thành đối tác vận tải hoặc tìm hiểu thêm về dịch vụ</p>
            <div class="cta-buttons">
              <a href="mailto:partner@lacgo.vn" class="btn-cta primary">
                <v-icon left>mdi-email</v-icon>
                Liên hệ hợp tác
              </a>
              <router-link to="/help-center" class="btn-cta secondary">
                <v-icon left>mdi-help-circle</v-icon>
                Trung tâm hỗ trợ
              </router-link>
            </div>
          </div>
        </section>
      </div>
    </div>

    <LandingFooter />
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.about-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #ffffff;
  color: #1a1a1a;
}

/* Hero */
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
  margin-bottom: 2rem;
}

.section-heading.center {
  text-align: center;
}

.section-subtitle {
  text-align: center;
  color: #757575;
  font-size: 1.1rem;
  max-width: 600px;
  margin: -1rem auto 3rem;
}

/* Intro Section */
.intro-section {
  margin-bottom: 5rem;
}

.intro-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.intro-image img {
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.intro-text p {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #424242;
  margin-bottom: 1.5rem;
}

/* Vision & Mission */
.vm-section {
  margin-bottom: 5rem;
}

.vm-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
}

.vm-card {
  background: linear-gradient(135deg, #f8fdf8 0%, #e8f5e9 100%);
  padding: 3rem 2.5rem;
  border-radius: 20px;
  border-left: 5px solid;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.vm-card.vision {
  border-left-color: #66BB6A;
}

.vm-card.mission {
  border-left-color: #42A5F5;
}

.vm-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.vm-card.mission .vm-icon {
  background: linear-gradient(135deg, #42A5F5 0%, #2196F3 100%);
}

.vm-card h3 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.vm-card p {
  font-size: 1.05rem;
  line-height: 1.7;
  color: #616161;
}

/* Values */
.values-section {
  margin-bottom: 5rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.value-card {
  text-align: center;
  padding: 2rem 1.5rem;
  background: #f8f9fa;
  border-radius: 16px;
  transition: all 0.3s;
}

.value-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.value-card h4 {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 1rem 0 0.75rem;
  color: #1a1a1a;
}

.value-card p {
  font-size: 0.95rem;
  color: #757575;
  line-height: 1.6;
}

/* Stats Highlight */
.stats-highlight {
  background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%);
  padding: 4rem;
  border-radius: 24px;
  margin-bottom: 5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  margin-top: 3rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.1rem;
  color: #616161;
  font-weight: 500;
}

/* Team */
.team-section {
  margin-bottom: 5rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
}

.team-card {
  text-align: center;
  padding: 2.5rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid #f0f0f0;
  transition: all 0.3s;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.team-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.team-card h4 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #1a1a1a;
}

.team-card p {
  font-size: 0.95rem;
  color: #757575;
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
  margin-bottom: 3rem;
}

.cta-box {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  padding: 4rem 3rem;
  border-radius: 24px;
  text-align: center;
}

.cta-box h2 {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-box p {
  font-size: 1.1rem;
  color: #bdbdbd;
  margin-bottom: 2.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-cta {
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

.btn-cta.primary {
  background: linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%);
  color: white;
  box-shadow: 0 8px 25px rgba(102, 187, 106, 0.35);
}

.btn-cta.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(102, 187, 106, 0.45);
}

.btn-cta.secondary {
  background: white;
  color: #1a1a1a;
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);
}

.btn-cta.secondary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(255, 255, 255, 0.3);
}

/* Responsive */
@media (max-width: 968px) {
  .intro-grid {
    grid-template-columns: 1fr;
  }

  .vm-grid {
    grid-template-columns: 1fr;
  }

  .values-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .team-grid {
    grid-template-columns: 1fr;
  }

  .page-title {
    font-size: 2.25rem;
  }

  .section-heading {
    font-size: 2rem;
  }
}

@media (max-width: 640px) {
  .values-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .page-title {
    font-size: 1.75rem;
  }
}

/* Accessibility - Visually hidden but available to screen readers */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
