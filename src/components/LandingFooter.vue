<template>
  <footer class="landing-footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-brand">
          <img src="/logo_no_border_small.png" alt="LạcGO" class="footer-logo"/>
          <p class="footer-tagline">Nền tảng kết nối hành khách và đơn vị vận tải uy tín</p>
          <div class="footer-social">
            <a href="#" class="social-link" aria-label="Facebook">
              <v-icon size="20">mdi-facebook</v-icon>
            </a>
            <a href="#" class="social-link" aria-label="Instagram">
              <v-icon size="20">mdi-instagram</v-icon>
            </a>
            <a href="#" class="social-link" aria-label="YouTube">
              <v-icon size="20">mdi-youtube</v-icon>
            </a>
            <a href="#" class="social-link" aria-label="Zalo">
              <v-icon size="20">mdi-message-text</v-icon>
            </a>
          </div>
        </div>
        <div class="footer-links">
          <div class="footer-col">
            <h4>Về LạcGO</h4>
            <router-link to="/about">Giới thiệu</router-link>
            <a href="/#features">Tính năng</a>
            <a href="/#how-it-works">Cách hoạt động</a>
            <a href="/#faq">Câu hỏi thường gặp</a>
          </div>
          <div class="footer-col">
            <h4>Chính sách</h4>
            <router-link to="/terms-of-use">Điều khoản sử dụng</router-link>
            <router-link to="/privacy-policy">Chính sách bảo mật</router-link>
            <router-link to="/help-center">Hỗ trợ khách hàng</router-link>
          </div>
          <div class="footer-col">
            <h4>Liên hệ</h4>
            <a href="mailto:support@lacgo.vn">
              <v-icon size="16">mdi-email</v-icon>
              support@lacgo.vn
            </a>
            <a href="tel:1900xxxx">
              <v-icon size="16">mdi-phone</v-icon>
              1900 xxxx (24/7)
            </a>
            <p class="footer-address">
              <v-icon size="16">mdi-map-marker</v-icon>
              Hà Nội, Việt Nam
            </p>
          </div>
          <div class="footer-col">
            <h4>Tải ứng dụng</h4>
            <a href="#" class="app-badge">
              <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" style="height: 45px;"/>
            </a>
            <a href="#" class="app-badge">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" style="height: 40px; margin-top: 8px;"/>
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-legal">
          <p>© 2025 LạcGO. Bản quyền thuộc về LạcGO</p>
          <p class="legal-notice">
            <v-icon size="14">mdi-information</v-icon>
            LạcGO là nền tảng công nghệ trung gian kết nối hành khách và đơn vị vận tải.
            Chúng tôi không trực tiếp cung cấp dịch vụ vận chuyển hành khách.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.landing-footer {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  padding: 4rem 0 2rem;
  margin-top: 4rem;
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
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 300px;
}

.footer-logo {
  height: 100px;
  width: auto;
  object-fit: contain;
  align-self: flex-start;
}

.footer-tagline {
  color: #bdbdbd;
  font-size: 0.95rem;
  line-height: 1.6;
}

.footer-social {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s;
}

.social-link:hover {
  background: linear-gradient(135deg, #66BB6A, #4CAF50);
  transform: translateY(-3px);
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.footer-col h4 {
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
}

.footer-col a,
.footer-col p {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #bdbdbd;
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  transition: color 0.2s;
}

.footer-col a:hover {
  color: #66BB6A;
}

.footer-address {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  color: #bdbdbd;
  font-size: 0.9rem;
}

.app-badge {
  display: block;
  opacity: 0.9;
  transition: opacity 0.3s;
}

.app-badge:hover {
  opacity: 1;
}

.footer-bottom {
  padding-top: 2rem;
}

.footer-legal {
  text-align: center;
  color: #9e9e9e;
  font-size: 0.85rem;
}

.footer-legal p {
  margin-bottom: 0.5rem;
}

.legal-notice {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #757575;
  font-size: 0.8rem;
  margin-top: 1rem;
}

@media (max-width: 968px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .footer-links {
    grid-template-columns: 1fr;
  }

  .footer-content {
    gap: 2.5rem;
  }
}
</style>
