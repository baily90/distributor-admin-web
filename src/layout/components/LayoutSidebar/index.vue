<template>
  <el-scrollbar>
    <div class="logo"></div>
    <el-menu
      active-text-color="##1e1f24"
      class="menu"
      text-color="#fff"
      :default-active="activeMenu"
      :unique-opened="true"
      router >
      <LayoutSidebarItem
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePermissionStore } from '@/stores/permission'
import LayoutSidebarItem from './components/LayoutSidebarItem/index.vue'
import { storeToRefs } from 'pinia'

const permissionStore = usePermissionStore()
const route = useRoute()

const {
  routes
} = storeToRefs(permissionStore)

const activeMenu = computed(() => {
  return route.path
})

</script>

<style lang='less' scoped>
  .logo {
    width: 100%;
    height: 60px;
    background: #006aff url(./../../../assets/images/icon_logo.png) no-repeat center center;
    background-size: 75px auto;
    background-position-x: 20px;
  }
  .menu {
    height: calc(100vh - 60px);
  }
  :deep(.el-menu) {
    background-color: transparent;
    border: 0
  }

  :deep(.el-sub-menu__title) {
    &:hover {
      background-color: transparent;
    }
  }

  :deep(.el-menu-item) {
    &:hover {
      background-color: transparent;
    }
    &.is-active {
      background: rgba(255, 255, 255, .85);

      &::before {
        top: -20px;
      }

      &::after {
        bottom: -20px;
        transform: rotateX(180deg)
      }
    }

  }

  :deep(.el-scrollbar__bar) {
    display: none;
  }
</style>
