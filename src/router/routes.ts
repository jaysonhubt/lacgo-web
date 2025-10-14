export const routes: any = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
    meta: {
      title: 'Home',
      layout: 'default'
    }
  },
  {
    path: '/demo',
    name: 'Index',
    component: () => import('@/pages/Welcome.vue'),
    meta: {
      title: 'index',
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
    path: '/trip',
    name: 'Trip',
    component: () => import('@/pages/Trip.vue'),
    meta: {
      title: 'Chuyến xe',
      layout: 'default'
    }
  },
  {
    path: '/trip-history',
    name: 'TripHistory',
    component: () => import('@/pages/TripHistory.vue'),
    meta: {
      title: 'Lịch sử chuyến xe',
      layout: 'default'
    }
  },
  {
    path: '/trip-detail',
    name: 'TripDetail',
    component: () => import('@/pages/TripDetail.vue'),
    meta: {
      title: 'Chi tiết chuyến xe',
      layout: 'default'
    }
  },
]
