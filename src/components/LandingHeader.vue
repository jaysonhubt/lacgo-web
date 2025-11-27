<template>
  <header class="landing-header">
    <div class="header-container">
      <router-link to="/" class="logo-link">
        <img src="/logo_no_border_small.png" alt="LạcGO" class="logo"/>
      </router-link>
      <nav class="nav">
        <router-link to="/" class="nav-link">Trang Chủ</router-link>
        <router-link to="/about" class="nav-link">Giới thiệu</router-link>
        <a href="/#features" class="nav-link">Tính năng</a>
        <router-link to="/help-center" class="nav-link">Hỗ trợ</router-link>
        <router-link to="/login" class="btn-login">
          Đăng nhập
        </router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.landing-header {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  z-index: 1000;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
}

.logo {
  height: 65px;
  transition: transform 0.3s;
}

.logo:hover {
  transform: scale(1.05);
}

.nav {
  display: flex;
  align-items: center;
  gap: 2rem;
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

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #66BB6A, #4CAF50);
  transition: width 0.3s;
}

.nav-link:hover::after {
  width: 100%;
}

.btn-login {
  background: linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%);
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 20px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 4px 12px rgba(102, 187, 106, 0.3);
  transition: all 0.3s;
}

.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 187, 106, 0.4);
}

@media (max-width: 968px) {
  .nav-link:not(.btn-login) {
    display: none;
  }

  .nav {
    gap: 1rem;
  }
}

@media (max-width: 640px) {
  .header-container {
    padding: 0.75rem 1rem;
  }

  .logo {
    height: 45px;
  }
}
</style>
