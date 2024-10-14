import request from '@/utils/request'

// 查询角色列表
export const getRolePage = async (params) => {
  return await request.get({ url: '/system/role/page', params })
}

// 查询角色（精简)列表
export const getSimpleRoleList = async () => {
  return await request.get({ url: '/system/role/simple-list' })
}

// 查询角色详情
export const getRole = async (id) => {
  return await request.get({ url: '/system/role/get?id=' + id })
}

// 新增角色
export const createRole = async (data) => {
  return await request.post({ url: '/system/role/create', data })
}

// 修改角色
export const updateRole = async (data) => {
  return await request.put({ url: '/system/role/update', data })
}

// 修改角色状态
export const updateRoleStatus = async (data) => {
  return await request.put({ url: '/system/role/update-status', data })
}

// 删除角色
export const deleteRole = async (id) => {
  return await request.delete({ url: '/system/role/delete?id=' + id })
}

// 导出角色
export const exportRole = (params) => {
  return request.download({
    url: '/system/role/export-excel',
    params
  })
}
