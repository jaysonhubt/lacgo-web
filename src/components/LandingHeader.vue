<template>
  <div
    v-if="menuOpen"
    class="menu-overlay"
    aria-hidden="true"
    @click="closeMenu"
  ></div>

  <header class="landing-header">
    <div class="header-container">
      <router-link to="/" class="logo-link">
        <img src="/logo_no_border_small.png" alt="LạcGO" class="logo"/>
      </router-link>

      <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
        <v-icon>{{ menuOpen ? 'mdi-close' : 'mdi-menu' }}</v-icon>
      </button>

      <nav class="nav" :class="{ 'nav-open': menuOpen }">
        <router-link to="/" class="nav-link" @click="closeMenu">Trang Chủ</router-link>
        <router-link to="/about" class="nav-link" @click="closeMenu">Giới thiệu</router-link>
        <a href="/#features" class="nav-link" @click="closeMenu">Tính năng</a>
        <router-link to="/help-center" class="nav-link" @click="closeMenu">Hỗ trợ</router-link>
        <router-link to="/login" class="btn-login" @click="closeMenu">
          Đăng nhập
        </router-link>

        <div class="nav-utility">
          <p class="utility-title">Tiện Ích</p>
          <router-link to="/am-lich" class="nav-link nav-link-utility" @click="closeMenu">Âm Lịch</router-link>
          <router-link to="/all-drop" class="nav-link nav-link-utility" @click="closeMenu">AllDrop</router-link>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'

const menuOpen = ref(false)
let lockedScrollY = 0

function closeMenu() {
  menuOpen.value = false
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function lockScroll() {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return
  }

  lockedScrollY = window.scrollY || window.pageYOffset || 0

  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
  document.body.style.position = 'fixed'
  document.body.style.top = `-${lockedScrollY}px`
  document.body.style.left = '0'
  document.body.style.right = '0'
  document.body.style.width = '100%'
  document.body.style.touchAction = 'none'
}

function unlockScroll() {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return
  }

  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.left = ''
  document.body.style.right = ''
  document.body.style.width = ''
  document.body.style.touchAction = ''

  window.scrollTo(0, lockedScrollY)
}

watch(menuOpen, (isOpen) => {
  if (isOpen) {
    lockScroll()
    return
  }

  unlockScroll()
})

onUnmounted(() => {
  unlockScroll()
})
</script>

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

.menu-overlay {
  display: none;
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

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: #424242;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.2s;
}

.menu-toggle:hover {
  color: #66BB6A;
}

.nav-utility {
  display: none;
  align-items: center;
  gap: 0.5rem;
}

.utility-title {
  display: none;
  margin: 0;
}

@media (max-width: 968px) {
  .menu-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.38);
    z-index: 1998;
  }

  .landing-header {
    z-index: 2000;
  }

  .header-container {
    position: relative;
    z-index: 2000;
  }

  .menu-toggle {
    display: block;
    z-index: 2002;
  }

  .nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100dvh;
    background: white;
    flex-direction: column;
    justify-content: flex-start;
    padding: 5rem 2rem 2rem;
    overflow-y: auto;
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
    transition: right 0.3s ease;
    gap: 1.5rem;
    z-index: 2001;
  }

  .nav-open {
    right: 0;
  }

  .nav-link {
    font-size: 1.1rem;
    padding: 0.75rem 0;
    width: 100%;
    text-align: left;
  }

  .nav-link::after {
    display: none;
  }

  .btn-login {
    width: 100%;
    text-align: center;
    margin-top: 1rem;
  }

  .nav-utility {
    width: 100%;
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid #eef1f4;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
  }

  .utility-title {
    display: block;
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #6b7280;
  }

  .nav-link-utility {
    margin: 0;
    padding-top: 0.45rem;
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
