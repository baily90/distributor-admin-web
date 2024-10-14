import { getOssToken, getSignUrl } from '@/api/common'
import dayjs from 'dayjs'
import OSS from 'ali-oss'
import VueCookies from 'vue-cookies'
const Cookies = VueCookies

/**
 * 获取oss临时token
 * @param {*} configKey bucket 配置key
 * @returns
 */
export const getSTSToken = async (basePath) => {
  try {
    // const stsToken = Cookies.get(basePath)
    // if (stsToken) {
    //   return stsToken
    // }
    const { code, data } = await getOssToken({ basePath })
    if (code === 200) {
      Cookies.set(basePath, data, new Date(data.expiration))
      return data
    }
    return null
  } catch (e) {
    return null
  }
}

/**
 * 设置路径
 * @param path
 * @param name
 * @returns
 */
const getFilePath = (path, name) => {
  const curTime = dayjs().valueOf()
  return `${path ? `${path}/` : ''}${dayjs().format('YYYYMM')}/${curTime}_${name}`
}

/**
 * 上传图片
 * @param file
 * @returns
 */
export const uploadFile = async (file, stsToken) => {
  try {
    if (stsToken) {
      const client = await new OSS({
        accessKeyId: stsToken?.accessKeyId,
        accessKeySecret: stsToken?.accessKeySecret,
        stsToken: stsToken?.securityToken,
        bucket: stsToken?.sts_bucket,
        endpoint: stsToken?.sts_endpoint
      })
      const urlPath = getFilePath(stsToken.basePath, file.name)
      const { name } = await client.multipartUpload(urlPath, file)
      return name
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
export const signUrl = async (url) => {
  try {
    const { data } = await getSignUrl({ url })
    return data
  } catch (error) {
    return null
  }
}
