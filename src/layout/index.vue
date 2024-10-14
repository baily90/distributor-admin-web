<template>
  <el-container class="layout-container">
    <el-aside class="aside-container">
      <LayoutSidebar />
    </el-aside>
    <el-container>
      <el-header>
        <LayoutHeader />
      </el-header>
      <el-main>
        <LayoutMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import LayoutSidebar from './components/LayoutSidebar/index.vue'
import LayoutHeader from './components/LayoutHeader/index.vue'
import LayoutMain from './components/LayoutMain/index.vue'
// import { getOssToken } from '@/utils/oss'
// getOssToken()
</script>

<style lang='less' scoped>
  .layout-container {
    height: 100vh;
    .aside-container {
      width: 200px;
      background: rgb(0, 106, 255);
    }
    :deep(.el-main) {
      padding: 0;
    }
    :deep(.el-header) {
      background: #fff;
    }
  }
</style>
