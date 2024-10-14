import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import { useTitle } from '@vueuse/core'
import { usePermissionStore } from '@/stores/permission'
import { storeToRefs } from 'pinia'
import indexRouter from './modules/index.router'
import { useUserStore } from '@/stores/user'
import Layout from '@/layout/index.vue'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '仪表盘',
          icon: 'Orange'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true,
      title: '登录'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/index.vue'),
    meta: {
      hidden: true,
      title: 'errors~'
    }
  }
]

// 动态路由
export const asyncRoutes = [
  ...indexRouter,
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/index.vue'),
    meta: {
      hidden: true,
      title: 'errors~'
    }
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

router.beforeEach(async (to, from, next) => {
  useTitle(to.meta?.title || '商城系统')
  NProgress.start()
  const { token, logout } = useUserStore()
  const permissionStore = usePermissionStore()
  const { permissions: piniaPermissions } = storeToRefs(permissionStore)
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
      // const { getPemissions, generateRoutes } = permissionStore
      // const hasPermissions = piniaPermissions.value && piniaPermissions.value.length > 0
      // if (!hasPermissions) {
      //   try {
      //     const { data: permissions } = await getPemissions()
      //     const accessedRoutes = generateRoutes(permissions)
      //     accessedRoutes.forEach((route) => {
      //       router.addRoute(route)
      //     })
      //     next({ ...to, replace: true })
      //   } catch (error) {
      //     logout()
      //   }
      // } else {
      //   next()
      // }
    }
  } else {
    if (to.path !== '/login') {
      next('/login')
    } else {
      next()
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
