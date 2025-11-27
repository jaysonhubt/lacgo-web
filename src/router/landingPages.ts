export const landingPages: any = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('@/pages/landing/Index.vue'),
    meta: {
      title: 'LạcGO - Ứng dụng đặt xe',
      layout: 'guest'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/landing/About.vue'),
    meta: {
      title: 'Giới thiệu',
      layout: 'guest'
    }
  },
  {
    path: '/help-center',
    name: 'HelpCenter',
    component: () => import('@/pages/landing/HelpCenter.vue'),
    meta: {
      title: 'Trung tâm hỗ trợ',
      layout: 'guest'
    }
  },
  {
    path: '/terms-of-use',
    name: 'LandingTerms',
    component: () => import('@/pages/landing/Terms.vue'),
    meta: {
      title: 'Điều khoản sử dụng',
      layout: 'guest'
    }
  },
  {
    path: '/privacy-policy',
    name: 'LandingPrivacy',
    component: () => import('@/pages/landing/Privacy.vue'),
    meta: {
      title: 'Chính sách bảo mật',
      layout: 'guest'
    }
  }
]
