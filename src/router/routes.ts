export const routes: any = [
  {
    path: '/demo',
    name: 'Index',
    component: () => import('@/pages/Welcome.vue'),
    meta: {
      title: 'index',
      layout: 'default'
    }
  }
]
