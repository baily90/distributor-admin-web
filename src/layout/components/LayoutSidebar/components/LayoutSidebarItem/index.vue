<template>
  <div v-if="!item.meta?.hidden">
    <template v-if="hasOneShowingChild(item.children, item)">
      <el-menu-item :index="resolvePath(onlyOneChild.path)">
        <el-icon v-if="onlyOneChild.meta?.icon">
          <component :is="onlyOneChild.meta?.icon" />
        </el-icon>
        <span>{{onlyOneChild.meta?.title}}</span>
      </el-menu-item>
    </template>

    <el-sub-menu v-else :index="item.path">
      <template #title>
        <el-icon v-if="item.meta?.icon">
          <component :is="item.meta?.icon" />
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <LayoutSidebarItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)" />
    </el-sub-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LayoutSidebarItem from './index.vue'
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  basePath: {
    type: String,
    default: ''
  }
})
const onlyOneChild = ref()
// 判断是否只有一个子路由或者没有子路由
const hasOneShowingChild = (children = [], parent) => {
  const showingChildren = children.filter((item) => {
    if (item.meta?.hidden) {
      return false
    } else {
      onlyOneChild.value = item
      return true
    }
  })
  if (showingChildren.length === 1) {
    return true
  }
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '' }
    return true
  }
  return false
}
const resolvePath = (routePath) => {
  if (props.basePath.endsWith('/')) {
    return props.basePath + routePath
  } else if (routePath) {
    return `${props.basePath}/${routePath}`
  } else {
    return props.basePath
  }
}

</script>
