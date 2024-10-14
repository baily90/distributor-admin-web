export default [
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/layout/index.vue'),
    meta: {
      permission: 'test'
    },
    children: [
      {
        path: 'index',
        name: 'TestIndex',
        component: () => import('@/views/test/index/index.vue'),
        meta: {
          title: '物料审核',
          icon: 'Guide',
          permission: 'testIndex'
        }
      }
    ]
  }
]
