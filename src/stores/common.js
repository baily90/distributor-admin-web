import { defineStore } from 'pinia'
// import API from '@/api/common'
// import { ref } from 'vue'

export const useCommonStore = defineStore('common', () => {
  // 公共省份选项列表
  // const provinceOptions = ref([])
  // const getProvinceOptions = async () => {
  //   try {
  //     const { data } = await API.getProvinceOptions()
  //     provinceOptions.value = data.list.map((item) => ({ label: item.name, value: item.id }))
  //   } catch (error) {

  //   }
  // }

  /**
   * 初始化公共数据源
   */
  // const initCommonOptions = () => {
  //   getProvinceOptions()
  // }

  return {
    // provinceOptions,
    // initCommonOptions
  }
})
