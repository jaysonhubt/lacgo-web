import LandingPage from '@/pages/landing/Index.vue'

export const routes: any = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
    meta: {
      title: 'Trang chủ',
      layout: 'default'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue'),
    meta: {
      title: 'Login',
      layout: 'guest'
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/pages/ForgotPassword.vue'),
    meta: {
      title: 'ForgotPassword',
      layout: 'guest'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/Register.vue'),
    meta: {
      title: 'Register',
      layout: 'guest'
    }
  },
  {
    path: '/trips',
    name: 'Trips',
    component: () => import('@/pages/Trips.vue'),
    meta: {
      title: 'Chuyến xe',
      layout: 'default'
    }
  },
  // Messages
  {
    path: '/messages',
    name: 'Messages',
    component: () => import('@/pages/Messages.vue'),
    meta: {
      title: 'Tin nhắn',
      layout: 'default'
    }
  },
  {
    path: '/messages/:id',
    name: 'MessageDetail',
    component: () => import('@/pages/MessageDetail.vue'),
    meta: {
      title: 'Chi tiết tin nhắn',
      layout: 'default'
    }
  },
  // Gift
  {
    path: '/gift',
    name: 'Gift',
    component: () => import('@/pages/Gift.vue'),
    meta: {
      title: 'Ưu đãi',
      layout: 'default'
    }
  },
  {
    path: '/gift/:id',
    name: 'GiftDetail',
    component: () => import('@/pages/GiftDetail.vue'),
    meta: {
      title: 'Chi tiết ưu đãi',
      layout: 'default'
    }
  },
  // Account
  {
    path: '/account',
    name: 'Account',
    component: () => import('@/pages/Account.vue'),
    meta: {
      title: 'Tài khoản',
      layout: 'default'
    }
  },
  {
    path: '/account/edit-profile',
    name: 'EditProfile',
    component: () => import('@/pages/EditProfile.vue'),
    meta: {
      title: 'Chỉnh sửa hồ sơ',
      layout: 'default'
    }
  },
  {
    path: '/account/settings',
    name: 'Settings',
    component: () => import('@/pages/Settings.vue'),
    meta: {
      title: 'Cài đặt',
      layout: 'default'
    }
  },
  {
    path: '/account/payment-methods',
    name: 'PaymentMethods',
    component: () => import('@/pages/PaymentMethods.vue'),
    meta: {
      title: 'Phương thức thanh toán',
      layout: 'default'
    }
  },
  {
    path: '/account/trip-history',
    name: 'TripHistory',
    component: () => import('@/pages/TripHistory.vue'),
    meta: {
      title: 'Lịch sử chuyến đi',
      layout: 'default'
    }
  },
  {
    path: '/account/saved-addresses',
    name: 'SavedAddresses',
    component: () => import('@/pages/SavedAddresses.vue'),
    meta: {
      title: 'Địa chỉ đã lưu',
      layout: 'default'
    }
  },
  {
    path: '/account/points-history',
    name: 'PointsHistory',
    component: () => import('@/pages/PointsHistory.vue'),
    meta: {
      title: 'Lịch sử điểm',
      layout: 'default'
    }
  },
  {
    path: '/account/language',
    name: 'Language',
    component: () => import('@/pages/Language.vue'),
    meta: {
      title: 'Ngôn ngữ',
      layout: 'default'
    }
  },
  // Notifications
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('@/pages/Notifications.vue'),
    meta: {
      title: 'Thông báo',
      layout: 'default'
    }
  },
  // Support & Legal (Authenticated)
  {
    path: '/help-center',
    name: 'HelpCenter',
    component: () => import('@/pages/HelpCenter.vue'),
    meta: {
      title: 'Trung tâm trợ giúp',
      layout: 'default'
    }
  },
  {
    path: '/support',
    name: 'Support',
    component: () => import('@/pages/Support.vue'),
    meta: {
      title: 'Liên hệ hỗ trợ',
      layout: 'default'
    }
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('@/pages/Terms.vue'),
    meta: {
      title: 'Điều khoản sử dụng',
      layout: 'default'
    }
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/pages/Privacy.vue'),
    meta: {
      title: 'Chính sách bảo mật',
      layout: 'default'
    }
  },
]
