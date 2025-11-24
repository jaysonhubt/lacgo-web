<template>
  <section class="intro-page">
    <!-- Header -->
    <header class="header">
      <div class="header-container">
        <img src="/logo_no_border_small.png" alt="LạcGO" class="logo"/>
        <nav class="nav">
          <a href="#features" class="nav-link">Tính năng</a>
          <a href="#how-it-works" class="nav-link">Cách hoạt động</a>
          <router-link to="/login" class="btn-login">
            Đăng nhập
          </router-link>
        </nav>
      </div>
    </header>

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
          <img src="/dashboard_bg1_small.png" alt="LạcGO App" class="hero-img"/>
        </div>
      </div>
    </main>

    <!-- Features Section -->
    <section id="features" class="features-section">
      <div class="section-container">
        <div class="section-header">
          <h2 class="section-title">Tại sao chọn LạcGO?</h2>
          <p class="section-subtitle">Trải nghiệm đặt xe ghép tốt nhất dành cho bạn</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon green">
              <v-icon size="32" color="white">mdi-car-multiple</v-icon>
            </div>
            <h3 class="feature-title">Xe ghép tiện lợi</h3>
            <p class="feature-desc">Chia sẻ chuyến đi, giảm chi phí và bảo vệ môi trường cùng nhau.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon blue">
              <v-icon size="32" color="white">mdi-clock-fast</v-icon>
            </div>
            <h3 class="feature-title">Linh hoạt lịch trình</h3>
            <p class="feature-desc">Chọn điểm đón gần bạn, thời gian phù hợp với lịch trình của bạn.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon orange">
              <v-icon size="32" color="white">mdi-shield-check</v-icon>
            </div>
            <h3 class="feature-title">An toàn & Tin cậy</h3>
            <p class="feature-desc">Lái xe được kiểm duyệt kỹ càng, hỗ trợ khách hàng 24/7.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon purple">
              <v-icon size="32" color="white">mdi-wallet</v-icon>
            </div>
            <h3 class="feature-title">Giá cả hợp lý</h3>
            <p class="feature-desc">Tiết kiệm tới 50% so với taxi truyền thống và xe công nghệ.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon teal">
              <v-icon size="32" color="white">mdi-map-marker-path</v-icon>
            </div>
            <h3 class="feature-title">Theo dõi hành trình</h3>
            <p class="feature-desc">Cập nhật vị trí xe real-time, chia sẻ chuyến đi với người thân.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon red">
              <v-icon size="32" color="white">mdi-gift</v-icon>
            </div>
            <h3 class="feature-title">Ưu đãi hấp dẫn</h3>
            <p class="feature-desc">Tích điểm, nhận quà và nhiều chương trình khuyến mãi đặc biệt.</p>
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

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-brand">
            <img src="/logo_no_border_small.png" alt="LạcGO" class="footer-logo"/>
            <p class="footer-tagline">Đặt xe ghép liên tỉnh tiện lợi</p>
          </div>
          <div class="footer-links">
            <div class="footer-col">
              <h4>Về LạcGO</h4>
              <a href="#">Giới thiệu</a>
              <a href="#">Tuyển dụng</a>
              <a href="#">Blog</a>
            </div>
            <div class="footer-col">
              <h4>Hỗ trợ</h4>
              <a href="#">Trung tâm trợ giúp</a>
              <router-link to="/terms">Điều khoản</router-link>
              <router-link to="/privacy">Bảo mật</router-link>
            </div>
            <div class="footer-col">
              <h4>Liên hệ</h4>
              <a href="mailto:support@lacgo.vn">support@lacgo.vn</a>
              <a href="tel:1900xxxx">1900 xxxx</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2025 LạcGO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </section>
</template>

<script setup>
//
</script>

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

/* Header */
.header {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #f0f0f0;
  z-index: 1000;
  padding: 1rem 0;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  height: 45px;
  cursor: pointer;
}

.nav {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.nav-link {
  color: #424242;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s;
  position: relative;
}

.nav-link:hover {
  color: #66BB6A;
}

.btn-login {
  background: linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%);
  color: white;
  padding: 0.65rem 1.8rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  transition: all 0.3s;
}

.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
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
  font-size: 3.5rem;
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
  display: inline-flex;
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

/* Footer */
.footer {
  background: #1a1a1a;
  color: white;
  padding: 4rem 0 2rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  gap: 4rem;
  margin-bottom: 3rem;
}

.footer-brand {
  max-width: 300px;
}

.footer-logo {
  height: 40px;
  margin-bottom: 1rem;
}

.footer-tagline {
  color: #9e9e9e;
  font-size: 0.95rem;
  line-height: 1.6;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.footer-col h4 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
}

.footer-col a {
  display: block;
  color: #9e9e9e;
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  transition: color 0.2s;
}

.footer-col a:hover {
  color: #66BB6A;
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid #333;
  text-align: center;
}

.footer-bottom p {
  color: #757575;
  font-size: 0.9rem;
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
}
</style>
