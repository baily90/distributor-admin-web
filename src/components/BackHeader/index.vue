<template>
  <div class="container">
    <el-page-header @back="goBack">
      <template #content>
        <span> {{title}} </span>
      </template>
      <template #title>
        <span> 返回 </span>
      </template>
    </el-page-header>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { backRouter = '', content } = defineProps(['backRouter', 'content'])

const router = useRouter()
const route = useRoute()

const states = reactive({
  title: content || route.meta?.title
})

const { title } = toRefs(states)

const goBack = () => {
  if (backRouter) {
    router.push(backRouter)
  } else {
    router.back()
  }
}

</script>

<style scoped lang="less">
  .container {
    padding-bottom: 18px;
  }
</style>
