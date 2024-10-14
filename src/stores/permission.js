import { constantRoutes, asyncRoutes } from '@/router'
import { defineStore } from 'pinia'
import API from '@/api/login'

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    permissions: [],
    accessedRoutes: []
  }),
  getters: {
    routes: state => [...constantRoutes, ...state.accessedRoutes]
  },
  actions: {
    async getPemissions () {
      try {
        const { code, data } = await API.getPemissions()
        if (code === 200) {
          this.permissions = data
          return { data }
        }
      } catch (error) {
        return []
      }
    },
    /**
     * 判断是否有权限
     * route没有meta属性的话，直接返回true，允许访问
     * @param {*} permissions
     * @param {*} route
     * @returns
     */
    hasPermission (permissions, route) {
      if (route.meta && route.meta.permission) {
        return permissions.includes(route.meta.permission)
      } else {
        return false
      }
    },
    filterAsyncRoutes (routes, permissions) {
      const res = []
      routes.forEach((route) => {
        const tmp = { ...route }
        if (this.hasPermission(permissions, tmp)) {
          if (tmp.children) {
            tmp.children = this.filterAsyncRoutes(tmp.children, permissions)
          }
          res.push(tmp)
        }
      })
      return res
    },
    // 根据角色过滤动态路由
    // 如果角色包含 admin，则拥有全部路由权限
    generateRoutes (roles) {
      if (roles.includes('admin')) {
        this.accessedRoutes = asyncRoutes || []
      } else {
        this.accessedRoutes = this.filterAsyncRoutes(asyncRoutes, roles)
      }
      return this.accessedRoutes
    }
  }
})
