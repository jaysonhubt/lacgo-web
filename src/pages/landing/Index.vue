<script setup lang="ts">
import { useHead } from '@unhead/vue'
import LandingHeader from '@/components/LandingHeader.vue'
import LandingFooter from '@/components/LandingFooter.vue'

const siteUrl = 'https://lacgo.vn'

useHead({
  title: 'LạcGO - Đặt Xe Ghép Liên Tỉnh Giá Rẻ, Tiện Lợi & An Toàn',
  meta: [
    { name: 'description', content: 'Đặt xe ghép liên tỉnh LạcGO - Tiết kiệm chi phí, an toàn, tiện lợi. Phủ sóng 58 tỉnh thành, 500+ đối tác uy tín. Đánh giá 4.8/5 sao từ 50,000+ khách hàng.' },
    { name: 'keywords', content: 'đặt xe ghép, xe ghép liên tỉnh, đặt xe liên tỉnh, LạcGO, xe khách liên tỉnh, đi xe ghép, tiết kiệm chi phí, xe ghép giá rẻ' },
    { name: 'author', content: 'LạcGO' },
    { name: 'robots', content: 'index, follow' },

    // Open Graph
    { property: 'og:title', content: 'LạcGO - Đặt Xe Ghép Liên Tỉnh Giá Rẻ, Tiện Lợi & An Toàn' },
    { property: 'og:description', content: 'Đặt xe ghép liên tỉnh LạcGO - Tiết kiệm chi phí, an toàn, tiện lợi. Phủ sóng 58 tỉnh thành, 500+ đối tác uy tín.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: siteUrl },
    { property: 'og:image', content: `${siteUrl}/dashboard_bg1_small.png` },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:locale', content: 'vi_VN' },
    { property: 'og:site_name', content: 'LạcGO' },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'LạcGO - Đặt Xe Ghép Liên Tỉnh Giá Rẻ' },
    { name: 'twitter:description', content: 'Đặt xe ghép liên tỉnh tiết kiệm, an toàn. 58 tỉnh thành, 500+ đối tác uy tín.' },
    { name: 'twitter:image', content: `${siteUrl}/dashboard_bg1_small.png` },
  ],
  link: [
    { rel: 'canonical', href: siteUrl },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'LạcGO',
        url: siteUrl,
        description: 'Nền tảng đặt xe ghép liên tỉnh hàng đầu Việt Nam',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'LạcGO',
        url: siteUrl,
        logo: `${siteUrl}/logo_no_border_small.png`,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '1900-xxxx',
          contactType: 'customer service',
          areaServed: 'VN',
          availableLanguage: 'Vietnamese'
        },
        sameAs: [
          'https://www.facebook.com/lacgo.vn',
          'https://www.instagram.com/lacgo.vn',
          'https://twitter.com/lacgo_vn'
        ]
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'MobileApplication',
        name: 'LạcGO',
        operatingSystem: 'ANDROID, iOS',
        applicationCategory: 'TravelApplication',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '50000'
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'VND'
        }
      })
    }
  ]
})
</script>

<template>
  <section class="intro-page">
    <LandingHeader />

    <!-- Hero Section -->
    <main class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-badge">
            <v-icon size="20" color="white">mdi-leaf</v-icon>
            <span>Xanh - Sạch - Tiết kiệm</span>
          </div>
          <h1 class="hero-title">
            Đặt Xe Ghép Liên Tỉnh
            <span class="hero-subtitle">Tiện Lợi - An Toàn - Tiết Kiệm</span>
          </h1>
          <p class="hero-description">
            Chia sẻ chuyến đi, tiết kiệm chi phí, đồng hành cùng bạn trên mọi hành trình liên tỉnh.
          </p>
          <div class="hero-actions">
            <router-link to="/login" class="btn-primary">
              <v-icon left>mdi-car</v-icon>
              Bắt đầu đặt xe
            </router-link>
            <a href="#how-it-works" class="btn-secondary">
              Tìm hiểu thêm
            </a>
          </div>
          <div class="hero-stats">
            <div class="stat-item">
              <div class="stat-number">10K+</div>
              <div class="stat-label">Chuyến đi</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">5K+</div>
              <div class="stat-label">Khách hàng</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">4.8★</div>
              <div class="stat-label">Đánh giá</div>
            </div>
          </div>
        </div>
        <div class="hero-image">
          <div class="image-decoration"></div>
          <img src="/dashboard_bg1_small.png" alt="Giao diện ứng dụng LạcGO đặt xe ghép liên tỉnh trên điện thoại" class="hero-img" loading="eager" fetchpriority="high"/>
        </div>
      </div>
    </main>

    <!-- Features Section -->
    <section id="features" class="features-section" aria-labelledby="features-title">
      <div class="section-container">
        <div class="section-header">
          <h2 id="features-title" class="section-title">Tại sao chọn LạcGO?</h2>
          <p class="section-subtitle">Trải nghiệm đặt xe ghép tốt nhất dành cho bạn</p>
        </div>

        <div class="features-grid" role="list">
          <article class="feature-card" role="listitem">
            <div class="feature-icon green" aria-hidden="true">
              <v-icon size="32" color="white">mdi-car-multiple</v-icon>
            </div>
            <h3 class="feature-title">Xe ghép tiện lợi</h3>
            <p class="feature-desc">Chia sẻ chuyến đi, giảm chi phí và bảo vệ môi trường cùng nhau.</p>
          </article>

          <article class="feature-card" role="listitem">
            <div class="feature-icon blue" aria-hidden="true">
              <v-icon size="32" color="white">mdi-clock-fast</v-icon>
            </div>
            <h3 class="feature-title">Linh hoạt lịch trình</h3>
            <p class="feature-desc">Chọn điểm đón gần bạn, thời gian phù hợp với lịch trình của bạn.</p>
          </article>

          <article class="feature-card" role="listitem">
            <div class="feature-icon orange" aria-hidden="true">
              <v-icon size="32" color="white">mdi-shield-check</v-icon>
            </div>
            <h3 class="feature-title">An toàn & Tin cậy</h3>
            <p class="feature-desc">Lái xe được kiểm duyệt kỹ càng, hỗ trợ khách hàng 24/7.</p>
          </article>

          <article class="feature-card" role="listitem">
            <div class="feature-icon purple" aria-hidden="true">
              <v-icon size="32" color="white">mdi-wallet</v-icon>
            </div>
            <h3 class="feature-title">Giá cả hợp lý</h3>
            <p class="feature-desc">Tiết kiệm tới 50% so với taxi truyền thống và xe công nghệ.</p>
          </article>

          <article class="feature-card" role="listitem">
            <div class="feature-icon teal" aria-hidden="true">
              <v-icon size="32" color="white">mdi-map-marker-path</v-icon>
            </div>
            <h3 class="feature-title">Theo dõi hành trình</h3>
            <p class="feature-desc">Cập nhật vị trí xe real-time, chia sẻ chuyến đi với người thân.</p>
          </article>

          <article class="feature-card" role="listitem">
            <div class="feature-icon red" aria-hidden="true">
              <v-icon size="32" color="white">mdi-gift</v-icon>
            </div>
            <h3 class="feature-title">Ưu đãi độc quyền</h3>
            <p class="feature-desc">Tích điểm, voucher và chương trình khuyến mãi hấp dẫn mỗi ngày.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section" aria-labelledby="stats-title">
      <div class="section-container">
        <h2 id="stats-title" class="visually-hidden">Thống kê hoạt động LạcGO</h2>
        <div class="stats-grid" role="list">
          <div class="stat-box" role="listitem">
            <div class="stat-icon" aria-hidden="true">
              <v-icon size="48" color="#66BB6A">mdi-map-marker-multiple</v-icon>
            </div>
            <div class="stat-info">
              <div class="stat-num" aria-label="58 tỉnh thành">58</div>
              <div class="stat-text">Tỉnh thành</div>
            </div>
          </div>
          <div class="stat-box" role="listitem">
            <div class="stat-icon" aria-hidden="true">
              <v-icon size="48" color="#42A5F5">mdi-bus-multiple</v-icon>
            </div>
            <div class="stat-info">
              <div class="stat-num" aria-label="Hơn 500 đối tác vận tải">500+</div>
              <div class="stat-text">Đối tác vận tải</div>
            </div>
          </div>
          <div class="stat-box" role="listitem">
            <div class="stat-icon" aria-hidden="true">
              <v-icon size="48" color="#FFA726">mdi-account-multiple</v-icon>
            </div>
            <div class="stat-info">
              <div class="stat-num" aria-label="Hơn 50 nghìn người dùng">50K+</div>
              <div class="stat-text">Người dùng tin tưởng</div>
            </div>
          </div>
          <div class="stat-box" role="listitem">
            <div class="stat-icon" aria-hidden="true">
              <v-icon size="48" color="#AB47BC">mdi-star</v-icon>
            </div>
            <div class="stat-info">
              <div class="stat-num" aria-label="Đánh giá 4.8 trên 5 sao">4.8/5</div>
              <div class="stat-text">Đánh giá trung bình</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section" aria-labelledby="testimonials-title">
      <div class="section-container">
        <div class="section-header">
          <h2 id="testimonials-title" class="section-title">Khách hàng nói gì về chúng tôi</h2>
          <p class="section-subtitle">Hàng nghìn đánh giá tích cực từ cộng đồng người dùng</p>
        </div>

        <div class="testimonials-grid" role="list">
          <article class="testimonial-card" role="listitem">
            <div class="testimonial-stars" aria-label="Đánh giá 5 sao">★★★★★</div>
            <p class="testimonial-text">"Đặt xe liên tỉnh chưa bao giờ dễ dàng đến thế! Giá cả minh bạch, nhiều lựa chọn, rất tiện lợi cho người đi công tác thường xuyên như tôi."</p>
            <div class="testimonial-author">
              <div class="author-avatar">MT</div>
              <div class="author-info">
                <div class="author-name">Minh Tuấn</div>
                <div class="author-role">Doanh nhân, Hà Nội</div>
              </div>
            </div>
          </article>

          <article class="testimonial-card" role="listitem">
            <div class="testimonial-stars" aria-label="Đánh giá 5 sao">★★★★★</div>
            <p class="testimonial-text">"Tôi thường xuyên về quê vào cuối tuần. LạcGO giúp tôi tìm được xe phù hợp với lịch trình và giá cả hợp lý. Hỗ trợ khách hàng rất nhiệt tình!"</p>
            <div class="testimonial-author">
              <div class="author-avatar">HL</div>
              <div class="author-info">
                <div class="author-name">Hương Lan</div>
                <div class="author-role">Giáo viên, TP.HCM</div>
              </div>
            </div>
          </article>

          <article class="testimonial-card" role="listitem">
            <div class="testimonial-stars" aria-label="Đánh giá 5 sao">★★★★★</div>
            <p class="testimonial-text">"Ứng dụng rất dễ sử dụng, thanh toán đa dạng, có cả ví điện tử. Mỗi lần đi xa là tôi lại mở LạcGO để so sánh giá và chọn nhà xe uy tín nhất."</p>
            <div class="testimonial-author">
              <div class="author-avatar">DK</div>
              <div class="author-info">
                <div class="author-name">Đức Khải</div>
                <div class="author-role">Sinh viên, Đà Nẵng</div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="faq-section">
      <div class="section-container">
        <div class="section-header">
          <h2 class="section-title">Câu hỏi thường gặp</h2>
          <p class="section-subtitle">Giải đáp thắc mắc của bạn về dịch vụ của chúng tôi</p>
        </div>

        <div class="faq-grid">
          <div class="faq-item">
            <h3 class="faq-question">
              <v-icon color="#66BB6A" size="20">mdi-help-circle</v-icon>
              LạcGO là gì?
            </h3>
            <p class="faq-answer">LạcGO là nền tảng trung gian kết nối hành khách với các đơn vị vận tải hợp pháp trên toàn quốc. Chúng tôi không trực tiếp cung cấp dịch vụ vận tải mà giúp bạn tìm kiếm, so sánh và đặt vé xe liên tỉnh một cách dễ dàng nhất.</p>
          </div>

          <div class="faq-item">
            <h3 class="faq-question">
              <v-icon color="#66BB6A" size="20">mdi-help-circle</v-icon>
              Làm sao để đặt vé?
            </h3>
            <p class="faq-answer">Rất đơn giản! Chọn điểm đi - điểm đến, thời gian khởi hành, hệ thống sẽ hiển thị các chuyến xe phù hợp. Bạn chọn chuyến ưng ý, điền thông tin và thanh toán là xong.</p>
          </div>

          <div class="faq-item">
            <h3 class="faq-question">
              <v-icon color="#66BB6A" size="20">mdi-help-circle</v-icon>
              Các hình thức thanh toán?
            </h3>
            <p class="faq-answer">Chúng tôi hỗ trợ thanh toán qua thẻ ATM, thẻ tín dụng, ví điện tử (Momo, ZaloPay, VNPay) và thanh toán khi lên xe (tùy nhà xe).</p>
          </div>

          <div class="faq-item">
            <h3 class="faq-question">
              <v-icon color="#66BB6A" size="20">mdi-help-circle</v-icon>
              Tôi có thể hủy vé không?
            </h3>
            <p class="faq-answer">Chính sách hủy vé phụ thuộc vào từng đơn vị vận tải. Thông tin chi tiết sẽ hiển thị khi bạn đặt vé. Thông thường, hủy trước 24h sẽ được hoàn tiền theo quy định.</p>
          </div>

          <div class="faq-item">
            <h3 class="faq-question">
              <v-icon color="#66BB6A" size="20">mdi-help-circle</v-icon>
              Dữ liệu cá nhân có an toàn?
            </h3>
            <p class="faq-answer">Chúng tôi cam kết bảo mật thông tin cá nhân theo Luật An toàn thông tin mạng và Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân.</p>
          </div>

          <div class="faq-item">
            <h3 class="faq-question">
              <v-icon color="#66BB6A" size="20">mdi-help-circle</v-icon>
              Liên hệ hỗ trợ như thế nào?
            </h3>
            <p class="faq-answer">Bạn có thể liên hệ qua hotline 1900 xxxx, email support@lacgo.vn hoặc chat trực tiếp trong ứng dụng. Đội ngũ hỗ trợ của chúng tôi sẵn sàng 24/7.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section id="how-it-works" class="how-section">
      <div class="section-container">
        <div class="section-header">
          <h2 class="section-title">Cách hoạt động</h2>
          <p class="section-subtitle">4 bước đơn giản để bắt đầu chuyến đi</p>
        </div>

        <div class="steps-container">
          <div class="step-card">
            <div class="step-number">1</div>
            <div class="step-icon">
              <v-icon size="40" color="#66BB6A">mdi-map-marker</v-icon>
            </div>
            <h3 class="step-title">Chọn điểm đi - đến</h3>
            <p class="step-desc">Nhập điểm xuất phát và điểm đến liên tỉnh của bạn</p>
          </div>

          <div class="step-arrow">→</div>

          <div class="step-card">
            <div class="step-number">2</div>
            <div class="step-icon">
              <v-icon size="40" color="#66BB6A">mdi-car-search</v-icon>
            </div>
            <h3 class="step-title">Chọn chuyến xe</h3>
            <p class="step-desc">Tìm chuyến xe ghép phù hợp với lịch trình</p>
          </div>

          <div class="step-arrow">→</div>

          <div class="step-card">
            <div class="step-number">3</div>
            <div class="step-icon">
              <v-icon size="40" color="#66BB6A">mdi-credit-card</v-icon>
            </div>
            <h3 class="step-title">Đặt vé & Thanh toán</h3>
            <p class="step-desc">Thanh toán nhanh chóng qua nhiều hình thức</p>
          </div>

          <div class="step-arrow">→</div>

          <div class="step-card">
            <div class="step-number">4</div>
            <div class="step-icon">
              <v-icon size="40" color="#66BB6A">mdi-check-circle</v-icon>
            </div>
            <h3 class="step-title">Lên đường</h3>
            <p class="step-desc">Điểm đón trả tiện lợi, an toàn, thoải mái</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-container">
        <div class="cta-content">
          <h2 class="cta-title">Sẵn sàng bắt đầu?</h2>
          <p class="cta-desc">Tải ứng dụng ngay để trải nghiệm dịch vụ đặt xe ghép tốt nhất</p>
          <div class="cta-buttons">
            <a href="#" class="store-button">
              <v-icon left size="28">mdi-apple</v-icon>
              <div class="store-text">
                <span class="store-label">Tải trên</span>
                <span class="store-name">App Store</span>
              </div>
            </a>
            <a href="#" class="store-button">
              <v-icon left size="28">mdi-google-play</v-icon>
              <div class="store-text">
                <span class="store-label">Tải trên</span>
                <span class="store-name">Google Play</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>

    <LandingFooter />
  </section>
</template>

<style scoped>
/* Reset & Base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.intro-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #ffffff;
  color: #1a1a1a;
  overflow-x: hidden;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #f8fdf8 0%, #e8f5e9 100%);
  padding: 5rem 0 4rem;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(102, 187, 106, 0.1) 0%, transparent 70%);
  border-radius: 50%;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%);
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.15;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  display: block;
  font-size: 1.8rem;
  font-weight: 600;
  background: linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-top: 0.5rem;
}

.hero-description {
  font-size: 1.15rem;
  color: #616161;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 540px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.btn-primary {
  background: linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.05rem;
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.35);
  transition: all 0.3s;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(76, 175, 80, 0.45);
}

.btn-secondary {
  background: white;
  color: #66BB6A;
  padding: 1rem 2.5rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.05rem;
  border: 2px solid #66BB6A;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background: #66BB6A;
  color: white;
}

.hero-stats {
  display: flex;
  gap: 3rem;
}

.stat-item {
  text-align: left;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #66BB6A;
  line-height: 1;
  margin-bottom: 0.3rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #757575;
  font-weight: 500;
}

.hero-image {
  position: relative;
  z-index: 2;
}

.image-decoration {
  position: absolute;
  top: -10%;
  right: -10%;
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, rgba(102, 187, 106, 0.15) 0%, transparent 60%);
  border-radius: 50%;
  z-index: -1;
}

.hero-img {
  width: 100%;
  max-width: 500px;
  filter: drop-shadow(0 20px 60px rgba(0, 0, 0, 0.15));
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* Features Section */
.features-section {
  padding: 6rem 0;
  background: white;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.75rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: 1.15rem;
  color: #757575;
  max-width: 600px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s;
  border: 1px solid #f5f5f5;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

.feature-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.feature-icon.green { background: linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%); }
.feature-icon.blue { background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%); }
.feature-icon.orange { background: linear-gradient(135deg, #FFA726 0%, #FB8C00 100%); }
.feature-icon.purple { background: linear-gradient(135deg, #AB47BC 0%, #8E24AA 100%); }
.feature-icon.teal { background: linear-gradient(135deg, #26A69A 0%, #00897B 100%); }
.feature-icon.red { background: linear-gradient(135deg, #EF5350 0%, #E53935 100%); }

.feature-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
}

.feature-desc {
  font-size: 0.95rem;
  color: #757575;
  line-height: 1.6;
}

/* Stats Section */
.stats-section {
  background: white;
  padding: 5rem 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.stat-box {
  background: linear-gradient(135deg, #f8fdf8 0%, #e8f5e9 100%);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s;
  border: 1px solid #e8f5e9;
}

.stat-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  flex-shrink: 0;
}

.stat-info {
  flex: 1;
}

.stat-num {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a1a1a;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-text {
  font-size: 1rem;
  color: #616161;
  font-weight: 500;
}

/* Testimonials Section */
.testimonials-section {
  background: linear-gradient(135deg, #f8fdf8 0%, #e8f5e9 100%);
  padding: 5rem 0;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.testimonial-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.testimonial-stars {
  color: #FFA726;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  letter-spacing: 0.2rem;
}

.testimonial-text {
  font-size: 1rem;
  line-height: 1.7;
  color: #424242;
  font-style: italic;
  margin-bottom: 1.5rem;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
}

.author-name {
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.25rem;
}

.author-role {
  font-size: 0.9rem;
  color: #757575;
}

/* FAQ Section */
.faq-section {
  background: white;
  padding: 5rem 0;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.faq-item {
  background: #f8f9fa;
  border-radius: 16px;
  padding: 2rem;
  border-left: 4px solid #66BB6A;
  transition: all 0.3s;
}

.faq-item:hover {
  background: #f0f7f1;
  transform: translateX(5px);
}

.faq-question {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.faq-answer {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #616161;
  margin-left: 2rem;
}

/* How It Works */
.how-section {
  background: linear-gradient(135deg, #f8fdf8 0%, #e8f5e9 100%);
  padding: 6rem 0;
}

.steps-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
}

.step-card {
  background: white;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  text-align: center;
  flex: 1;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  position: relative;
  transition: all 0.3s;
}

.step-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.step-number {
  position: absolute;
  top: -15px;
  right: 20px;
  background: linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%);
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
}

.step-icon {
  margin-bottom: 1rem;
}

.step-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
}

.step-desc {
  font-size: 0.9rem;
  color: #757575;
  line-height: 1.5;
}

.step-arrow {
  font-size: 2rem;
  color: #66BB6A;
  font-weight: 300;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%);
  padding: 5rem 0;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  border-radius: 50%;
}

.cta-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.cta-content {
  text-align: center;
  position: relative;
  z-index: 2;
}

.cta-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.cta-desc {
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.store-button {
  background: white;
  color: #1a1a1a;
  padding: 1rem 2rem;
  border-radius: 16px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
}

.store-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
}

.store-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.store-label {
  font-size: 0.75rem;
  color: #757575;
}

.store-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
}

/* Responsive */
@media (max-width: 968px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.4rem;
  }

  .hero-description {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-stats {
    justify-content: center;
  }

  .steps-container {
    flex-direction: column;
  }

  .step-arrow {
    transform: rotate(90deg);
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
  }

  .faq-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .nav {
    gap: 1rem;
  }

  .nav-link:not(.btn-login) {
    display: none;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .section-title {
    font-size: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .cta-title {
    font-size: 2rem;
  }

  .footer-links {
    grid-template-columns: 1fr;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .stat-box {
    padding: 1.5rem;
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
