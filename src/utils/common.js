import dayjs from 'dayjs'

/**
 * 下载
 * @param url
 */
export const download = async (url) => {
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  // a.download = 'download'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  // try {
  //   fetch(url)
  //     .then(async (res) => await res.blob())
  //     .then((blob) => {
  //       const a = document.createElement('a')
  //       a.style.display = 'none'
  //       a.href = URL.createObjectURL(blob)
  //       a.download = 'download'
  //       document.body.appendChild(a)
  //       a.click()
  //       document.body.removeChild(a)
  //     })
  // } catch (error) {
  //   ElMessage({
  //     message: '资源错误无法下载',
  //     type: 'warning'
  //   })
  // }
}

// 文件导出
export const downloadFile = async (blobString, fileName) => {
  try {
    const blob = new Blob([blobString], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
    })
    const downloadElement = document.createElement('a')
    const href = window.URL.createObjectURL(blob)
    downloadElement.href = href
    downloadElement.download = fileName + '.xlsx' // xxx.xls/xxx.xlsx
    document.body.appendChild(downloadElement)
    downloadElement.click()
    document.body.removeChild(downloadElement)
    window.URL.revokeObjectURL(href)

    ElMessage({
      message: '文件下载成功',
      type: 'success'
    })
  } catch (error) {
    console.log(error)
    ElMessage({
      message: '资源错误无法下载',
      type: 'warning'
    })
  }
}

/**
 * 获取oss相对路径
 * @param url
 * @returns
 */
export const getRelativePath = (url) => {
  const regex = /\/\/[^/]+(\/[^?]+)/
  const match = url.match(regex)
  if (match) {
    return decodeURIComponent(match[1].slice(1))
  }
  return ''
}

/**
 * 获取传入的路由的names数组
 * @param routes
 * @returns
 */
export const getRouteNames = (routes) => {
  if (!routes) return
  const names = []
  for (const route of routes) {
    names.push(route.name)
    if (route.children) {
      names.push(...getRouteNames(route.children))
    }
  }
  return names
}

/**
 * 获取传入的值是否是NaN
 * @param data
 * @returns
 */
export const judgeNaN = (data) => {
  if (isNaN(data) === true && typeof data === 'number') {
    return true
  } else {
    return false
  }
}

/**
 * 时间戳转时间
 * @param data
 * @returns
 */
export const formatTimestampToYYYYMMDD = (timestampInSeconds) => {
  if (!timestampInSeconds || timestampInSeconds === 0) {
    return ''
  }
  const date = dayjs(timestampInSeconds * 1000)
  // 格式化日期为 "YYYY-MM-DD" 格式
  return date.format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 数字转换 放大100 或者缩小100
 * @param source 数据源
 * @param propertys 属性集合 数组
 * @param type 类型1 是放大 2 缩小
 * @returns
 */
export const transform2price = (source, propertys, type = 1) => {
  if (!source || !propertys || propertys.length === 0) return

  propertys.forEach(property => {
    // 如果数据源中，此数据有值，才可进行放大或者缩小 没有值就不操作赋值
    if (source[property]) {
      source[property] = type === 1 ? parseInt(source[property] * 100) : source[property] / 100
    }
  })
}
/**
 * 获取文件后缀
 * @param {*} url
 * @returns
 */
export const getMediaExtension = url => {
  // 创建URL对象
  const link = new URL(url)

  // 获取路径部分（去除参数）
  const path = link.pathname

  // 获取路径的最后一个点之后的内容作为文件扩展名
  return path.split('.').pop().toLowerCase()
}

/**
 * 检测媒体类型
 * @param {*} url
 * @returns
 */
export const checkMediaType = (url) => {
  if (!url || url.indexOf('http') === -1) return ''
  const extension = getMediaExtension(url)

  // 声明支持的图片和视频文件扩展名
  const imageExtensions = ['jpg', 'jpeg', 'gif', 'png']
  const videoExtensions = ['mp4', 'wmv', 'avi', 'mov']

  // 判断文件扩展名是否在图片扩展名数组中
  if (imageExtensions.includes(extension)) {
    return 'image'
  }

  // 判断文件扩展名是否在视频扩展名数组中
  if (videoExtensions.includes(extension)) {
    return 'video'
  }

  // 扩展名不在图片或视频数组中，返回file表示文件类型
  return 'file'
}
