import request from '@/utils/request'

// 查询用户管理列表
export const getUserPage = (params) => {
  return request.get({ url: '/system/user/page', params })
}

// 查询所有用户列表
export const getAllUser = () => {
  return request.get({ url: '/system/user/all' })
}

// 查询用户详情
export const getUser = (id) => {
  return request.get({ url: '/system/user/get?id=' + id })
}

// 新增用户
export const createUser = (data) => {
  return request.post({ url: '/system/user/create', data })
}

// 修改用户
export const updateUser = (data) => {
  return request.put({ url: '/system/user/update', data })
}

// 删除用户
export const deleteUser = (id) => {
  return request.delete({ url: '/system/user/delete?id=' + id })
}

// 导出用户
export const exportUser = (params) => {
  return request.download({ url: '/system/user/export', params })
}

// 下载用户导入模板
export const importUserTemplate = () => {
  return request.download({ url: '/system/user/get-import-template' })
}

// 用户密码重置
export const resetUserPwd = (id, password) => {
  const data = {
    id,
    password
  }
  return request.put({ url: '/system/user/update-password', data })
}

// 用户状态修改
export const updateUserStatus = (id, status) => {
  const data = {
    id,
    status
  }
  return request.put({ url: '/system/user/update-status', data })
}

// 获取用户精简信息列表
export const getSimpleUserList = () => {
  return request.get({ url: '/system/user/simple-list' })
}
