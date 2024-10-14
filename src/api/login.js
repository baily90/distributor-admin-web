import request from '@/utils/request'

// 登录
export const login = (data) => {
  return request.post({ url: '/system/auth/login', data })
}

// 注册
export const register = (data) => {
  return request.post({ url: '/system/auth/register', data })
}

// 刷新访问令牌
export const refreshToken = () => {
  return request.post({ url: '/system/auth/refresh-token?refreshToken=' + getRefreshToken() })
}

// 使用租户名，获得租户编号
export const getTenantIdByName = (name) => {
  return request.get({ url: '/system/tenant/get-id-by-name?name=' + name })
}

// 使用租户域名，获得租户信息
export const getTenantByWebsite = (website) => {
  return request.get({ url: '/system/tenant/get-by-website?website=' + website })
}

// 登出
export const loginOut = () => {
  return request.post({ url: '/system/auth/logout' })
}

// 获取用户权限信息
export const getInfo = () => {
  return request.get({ url: '/system/auth/get-permission-info' })
}

// 获取登录验证码
export const sendSmsCode = (data) => {
  return request.post({ url: '/system/auth/send-sms-code', data })
}

// 短信验证码登录
export const smsLogin = (data) => {
  return request.post({ url: '/system/auth/sms-login', data })
}

// 社交快捷登录，使用 code 授权码
export function socialLogin (type, code, state) {
  return request.post({
    url: '/system/auth/social-login',
    data: {
      type,
      code,
      state
    }
  })
}

// 社交授权的跳转
export const socialAuthRedirect = (type, redirectUri) => {
  return request.get({
    url: '/system/auth/social-auth-redirect?type=' + type + '&redirectUri=' + redirectUri
  })
}
// 获取验证图片以及 token
export const getCode = (data) => {
  return request.postOriginal({ url: 'system/captcha/get', data })
}

// 滑动或者点选验证
export const reqCheck = (data) => {
  return request.postOriginal({ url: 'system/captcha/check', data })
}
