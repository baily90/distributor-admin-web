<template>
  <div class="el-upload-list el-upload-list--picture-card">
    <div class="el-upload-list__item" v-for="(file, index) in fileList" :key="index">
      <template v-if="checkMediaType(file) === 'image'">
        <img :src="file" alt="" class="el-upload-list__item-thumbnail" />
      </template>
      <template v-if="checkMediaType(file) === 'video'">
        <div style="position:relative; width: 100%; height: 100%;">
          <video ref="video" :src="`${file}`" style="width:100%; height:100%; object-fit: contain"></video>
          <div style="position: absolute; top: 50px;left: 50px;">
            <el-icon style="color: #fff; font-size: 50px"><VideoPlay /></el-icon>
          </div>
        </div>
      </template>
      <template v-if="checkMediaType(file) === 'file'">
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%;">
          <el-icon style="font-size: 50px;"><Document /></el-icon>
          <div style="color: #999; font-size: 28px;">{{getMediaExtension(file)}}</div>
        </div>
      </template>
      <div>
        <span class="el-upload-list__item-actions">
          <span v-if="checkMediaType(file) !== 'file'" class="el-upload-list__item-preview" @click="handlePreview(file)">
            <el-icon><zoom-in /></el-icon>
          </span>
          <span class="el-upload-list__item-delete" @click="handleDownload(file)">
            <el-icon><Download /></el-icon>
          </span>
          <span v-if="!props.preview" class="el-upload-list__item-delete" @click="handleRemove(index)">
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </div>
    <!-- <el-empty v-if="preview && fileList.length === 0" :image-size="100" description=" "/> -->
  </div>
  <!-- accept="video/*, image/*" -->
  <el-upload
    v-if="isUploadBtnVisible"
    ref="uploadRef"
    action
    :accept="accept"
    :http-request="handleUploadRequest"
    :show-file-list="false"
    :limit="limit"
    :multiple="multiple"
  >
    <div class="el-upload--picture-card">
      <el-icon><Plus /></el-icon>
    </div>
  </el-upload>
  <!-- 视频播放弹框 -->
  <el-dialog v-model="showVideo" width="1000px" append-to-body>
    <video v-if="showVideo" ref="video" :src="videoSrc" controls="controls" style="width:100%; height:100%; object-fit: contain"></video>
  </el-dialog>

  <!-- 图片预览器 -->
  <el-image-viewer v-if="showViewer" @close="handleCloseViewer" :url-list="viewList" teleported :z-index="3000" />
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import { getSTSToken, uploadFile, signUrl } from '@/utils/oss'
import { getMediaExtension, checkMediaType, download } from '@/utils/common'
import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {},
  bucket: {
    type: String,
    default: 'common-mzt-public'
  },
  limit: {
    type: Number,
    default: 1
  },
  multiple: {
    type: Boolean,
    default: false
  },
  preview: {
    type: Boolean,
    default: false
  },
  accept: {
    type: String,
    default: '*'
  }
})

const emit = defineEmits(['update:modelValue'])
const vModel = useVModel(props, 'modelValue', emit)

const fileList = ref([])
const uploadRef = ref(null)
const showViewer = ref(false)
const showVideo = ref(false)
const videoSrc = ref(null)
const viewList = ref(null)

const isUploadBtnVisible = computed(() => props.limit > fileList.value.length && !props.preview)

const isRenderd = ref(true)

watch(
  () => vModel.value,
  async (val) => {
    if (!isRenderd.value) return
    if (val) {
      if (props.limit === 1) {
        const url = await signUrl(val)
        fileList.value = [url]
      } else {
        const temp = []
        for (let index = 0; index < val.length; index++) {
          const url = await signUrl(val[index])
          temp.push(url)
        }
        fileList.value = temp
      }
    } else {
      fileList.value = []
    }
  },
  { immediate: true }
)

const handleUploadRequest = async ({ file }) => {
  isRenderd.value = false
  try {
    const ossToken = await getSTSToken('material')
    const url = await uploadFile(file, ossToken)
    const filexxx = await signUrl(url)
    fileList.value.push(filexxx)
    if (props.limit === 1) {
      vModel.value = url
    } else {
      vModel.value = vModel.value ? [...vModel.value, url] : [url]
    }
  } catch (err) {
    console.log(`%c上传ali-oss文件失败 ${err}`)
    uploadRef.value.abort()
  }
}
const handleRemove = async (index) => {
  if (props.limit === 1) {
    vModel.value = undefined
    fileList.value = []
  } else {
    vModel.value.splice(index, 1)
    fileList.value.splice(index, 1)
  }
}

const handleDownload = (file) => {
  download(file)
}

const handlePreview = (file) => {
  if (checkMediaType(file) === 'image') {
    showViewer.value = true
    viewList.value = [file]
  } else if (checkMediaType(file) === 'video') {
    console.log('video')
    showVideo.value = true
    videoSrc.value = file
  }
}

const handleCloseViewer = () => (showViewer.value = false)
</script>

<style lang="less" scoped>
  .el-upload--picture-card {
    --el-upload-picture-card-size: 100px
  }
  .el-upload-list--picture-card {
    --el-upload-list-picture-card-size: 100px
  }
</style>
