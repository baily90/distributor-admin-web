import request from '@/utils/request'

/**
 * 获取oss临时token
 * @returns
 */
export function getOssToken (data) {
  return request.post({
    url: '/oss/sts_token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

/**
 * 获取私有化签名
 * @param {*} data
 * @returns
 */
export function getSignUrl (data) {
  return request.post({
    url: '/oss/sign',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}
