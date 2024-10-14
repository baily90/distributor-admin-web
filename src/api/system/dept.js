import request from '@/utils/request'

// 查询部门（精简)列表
export const getSimpleDeptList = async () => {
  return await request.get({ url: '/system/dept/simple-list' })
}

// 查询部门列表
export const getDeptPage = async (params) => {
  return await request.get({ url: '/system/dept/list', params })
}

// 查询部门详情
export const getDept = async (id) => {
  return await request.get({ url: '/system/dept/get?id=' + id })
}

// 新增部门
export const createDept = async (data) => {
  return await request.post({ url: '/system/dept/create', data })
}

// 修改部门
export const updateDept = async (params) => {
  return await request.put({ url: '/system/dept/update', data: params })
}

// 删除部门
export const deleteDept = async (id) => {
  return await request.delete({ url: '/system/dept/delete?id=' + id })
}
