<template>
  <div class="language-container">
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
      
      <h1 class="title">Ngôn ngữ</h1>
      <div style="width: 40px"></div>
    </div>

    <!-- Content -->
    <div class="content">
      <p class="description">Chọn ngôn ngữ hiển thị của ứng dụng</p>

      <!-- Languages List -->
      <div class="languages-list">
        <div
          v-for="lang in languages"
          :key="lang.code"
          class="language-item"
          :class="{ 'selected': selectedLanguage === lang.code }"
          @click="selectLanguage(lang)"
        >
          <div class="language-icon">
            <span class="flag">{{ lang.flag }}</span>
          </div>

          <div class="language-info">
            <h3 class="language-name">{{ lang.name }}</h3>
            <p class="language-native">{{ lang.nativeName }}</p>
          </div>

          <v-icon
            v-if="selectedLanguage === lang.code"
            color="green-lighten-1"
            size="24"
          >
            mdi-check-circle
          </v-icon>
        </div>
      </div>

      <!-- Info -->
      <div class="info-box">
        <v-icon color="blue-lighten-1" size="20">mdi-information</v-icon>
        <p>Ứng dụng sẽ được khởi động lại để áp dụng ngôn ngữ mới</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// State
const selectedLanguage = ref('vi')

const languages = ref([
  {
    code: 'vi',
    name: 'Tiếng Việt',
    nativeName: 'Vietnamese',
    flag: '🇻🇳',
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
  },
  {
    code: 'ko',
    name: 'Tiếng Hàn',
    nativeName: '한국어',
    flag: '🇰🇷',
  },
  {
    code: 'ja',
    name: 'Tiếng Nhật',
    nativeName: '日本語',
    flag: '🇯🇵',
  },
  {
    code: 'zh',
    name: 'Tiếng Trung',
    nativeName: '中文',
    flag: '🇨🇳',
  },
])

// Methods
const goBack = () => {
  router.back()
}

const selectLanguage = (lang: any) => {
  selectedLanguage.value = lang.code
  // Apply language change
  setTimeout(() => {
    router.back()
  }, 500)
}
</script>

<style scoped>
.language-container {
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

.description {
  font-size: 0.95rem;
  color: #616161;
  margin: 0 0 20px 0;
  line-height: 1.5;
}

/* Languages List */
.languages-list {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.language-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid #f0f0f0;
}

.language-item:last-child {
  border-bottom: none;
}

.language-item:hover {
  background: #f8f9fa;
}

.language-item.selected {
  background: rgba(76, 175, 80, 0.04);
}

.language-icon {
  width: 48px;
  height: 48px;
  background: #f8f9fa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.flag {
  font-size: 28px;
}

.language-info {
  flex: 1;
  min-width: 0;
}

.language-name {
  font-size: 1rem;
  font-weight: 600;
  color: #424242;
  margin: 0 0 4px 0;
}

.language-native {
  font-size: 0.85rem;
  color: #757575;
  margin: 0;
}

/* Info Box */
.info-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 16px;
  background: #e3f2fd;
  border-radius: 12px;
  border: 1px solid #bbdefb;
}

.info-box p {
  font-size: 0.85rem;
  color: #616161;
  margin: 0;
  line-height: 1.5;
}

/* Responsive */
@media (max-width: 480px) {
  .content {
    padding: 16px 12px;
  }

  .language-item {
    padding: 14px;
  }

  .language-icon {
    width: 44px;
    height: 44px;
  }

  .flag {
    font-size: 24px;
  }
}
</style>

