<template>
  <div class="container-layout-header">
    <div class="left"></div>
    <div class="right">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <el-avatar
            :size="24"
            :src="AvartarDefault"
          />
          <span class="user">18601733660</span>
          <el-icon class="el-icon--right">
            <ArrowDown />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :icon="Lock">修改密码</el-dropdown-item>
            <el-dropdown-item :icon="SwitchButton">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import AvartarDefault from '@/assets/images/icon_avatar_default.png'
import { Lock, SwitchButton, ArrowDown } from '@element-plus/icons-vue'
</script>

<style lang='less' scoped>
  .container-layout-header {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    width: 100%;
    height: 100%;

    .right {
      display: flex;
      align-items: center;
      justify-content: center;

      .el-dropdown-link {
        cursor: pointer;
        color: var(--el-color-primary);
        display: flex;
        align-items: center;
      }
      .user {
        margin-left: 10px;
      }
    }
  }
</style>
