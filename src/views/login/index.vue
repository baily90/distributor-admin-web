<template>
  <div class="login-container">
    <!-- 左边图片 -->
    <div class="login-left"></div>

    <!-- 右边登录表单 -->
    <div class="login-right">
      <div class="login-form">
        <!-- 登录logo -->
        <div class="login-logo">
          <div class="first-title">欢迎登录</div>
          <div class="second-title">商城系统</div>
        </div>
        <!-- 登录表单 -->
        <el-form
          ref="loginFormRef"
          :model="loginFormData"
          :rules="loginFormRules"
          size="large"
        >
          <el-form-item prop="username">
            <el-input
              prefix-icon="User"
              placeholder="请输入用户名"
              v-model="loginFormData.username"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="Lock"
              placeholder="请输入您的密码"
              v-model="loginFormData.password"
              show-password
            />
          </el-form-item>
          <div class="captcha-box">
            <el-form-item prop="captcha">
              <el-input
                prefix-icon="Key"
                placeholder="验证码"
                v-model="loginFormData.captcha"
              >
                <template #suffix>
                  <el-image
                    class="captcha"
                    :src="captchaImageUrl"
                    fit="fill"
                    v-loading="isGetCaptchaLoading"
                    @click="getCaptchaImage" />
                </template>
              </el-input>
            </el-form-item>
          </div>

          <div class="login-btn">
            <el-button
              round
              size="large"
              type="primary"
              icon="UserFilled"
              :loading="isLoginLoading"
              @click="onSubmitHandle"
              >登录</el-button
            >
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { useAsyncState, onKeyStroke } from '@vueuse/core'
import encryptPassword from '@/utils/crpy'
import API from '@/api/login'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const captchaImageUrl = ref(null)

const { token } = storeToRefs(userStore)

const loginFormRef = ref()

const loginFormData = ref({
  username: undefined,
  password: undefined,
  captcha: undefined
})

const loginFormRules = {
  username: { required: true, message: '请输入用户名', trigger: 'blur' },
  password: { required: true, message: '请输入您的密码', trigger: 'blur' },
  captcha: { required: true, message: '请输入验证码', trigger: 'blur' }
}

const { isLoading: isGetCaptchaLoading, execute: getCaptchaExecute } = useAsyncState(
  () => API.getCaptcha(),
  null,
  {
    immediate: false
  }
)

const { isLoading: isLoginLoading, execute: loginExecute } = useAsyncState(
  (data) => API.login(data),
  null,
  {
    immediate: false
  }
)

const getCaptchaImage = async () => {
  try {
    const data = await getCaptchaExecute()
    captchaImageUrl.value = URL.createObjectURL(new Blob([data]))
  } catch (error) {
    console.log(error)
  }
}

getCaptchaImage()

const onSubmitHandle = async () => {
  try {
    await loginFormRef.value.validate()
    token.value = 123
    const path = route.query.redirect || '/'
    router.replace({ path })
    // const requestData = {
    //   ...loginFormData.value,
    //   password: encryptPassword(loginFormData.value.password)
    // }
    // const { code, data } = await loginExecute(0, requestData)
    // if (code === 200) {
    //   token.value = data.token
    //   router.replace('/')
    //   ElMessage({
    //     showClose: true,
    //     message: ` hi，${loginFormData.value.username} 欢迎您登录`,
    //     type: 'success'
    //   })
    // }
  } catch (error) {
    console.log(error)
  }
}

onKeyStroke('Enter', () => {
  onSubmitHandle()
})
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
