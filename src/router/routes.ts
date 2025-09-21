export const routes: any = [
  {
    path: '/',
    name: 'Intro',
    component: () => import('@/pages/Intro.vue'),
    meta: {
      title: 'Intro',
      layout: 'guest'
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
]
