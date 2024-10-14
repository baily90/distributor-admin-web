<template>
  <el-scrollbar class="main-scroll-container">
    <RouterView v-slot="{ Component }">
      <Suspense>
        <!-- 主要内容 -->
        <component :is="Component"></component>
        <!-- 加载中状态 -->
        <template #fallback>
          <el-skeleton animated />
        </template>
      </Suspense>
    </RouterView>
  </el-scrollbar>
</template>

<script setup>

</script>

<style lang='less' scoped>
  .main-scroll-container {
    padding: 20px;
  }
</style>
