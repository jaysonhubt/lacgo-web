export const landingPages: any = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('@/pages/landing/Index.vue'),
    meta: {
      title: 'LạcGO - Ứng dụng đặt xe',
      layout: 'guest',
      useAppTheme: false,
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/landing/About.vue'),
    meta: {
      title: 'Giới thiệu',
      layout: 'guest',
      useAppTheme: false,
    }
  },
  {
    path: '/help-center',
    name: 'HelpCenter',
    component: () => import('@/pages/landing/HelpCenter.vue'),
    meta: {
      title: 'Trung tâm hỗ trợ',
      layout: 'guest',
      useAppTheme: false,
    }
  },
  {
    path: '/terms-of-use',
    name: 'LandingTerms',
    component: () => import('@/pages/landing/Terms.vue'),
    meta: {
      title: 'Điều khoản sử dụng',
      layout: 'guest',
      useAppTheme: false,
    }
  },
  {
    path: '/privacy-policy',
    name: 'LandingPrivacy',
    component: () => import('@/pages/landing/Privacy.vue'),
    meta: {
      title: 'Chính sách bảo mật',
      layout: 'guest',
      useAppTheme: false,
    }
  },
  {
    path: '/am-lich',
    name: 'LunarCalendar',
    component: () => import('@/pages/landing/LunarCalendar.vue'),
    meta: {
      title: 'Âm Lịch',
      layout: 'guest',
      useAppTheme: false,
    }
  },
  {
    path: '/all-drop',
    name: 'LandingLocalSend',
    component: () => import('@/pages/landing/LocalSend.vue'),
    meta: {
      title: 'Local Send',
      layout: 'guest',
      useAppTheme: false,
    }
  }
]
