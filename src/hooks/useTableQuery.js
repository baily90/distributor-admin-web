import { ref } from 'vue'
import { useAsyncState } from '@vueuse/core'
export default (fetchAPI, params) => {
  const searchParams = ref({
    pageNum: 1,
    pageSize: 10,
    ...params
  })

  const selection = ref([])

  const dataSource = ref({
    total: 0,
    pageSize: 10,
    list: []
  })

  const { isLoading, execute } = useAsyncState(
    (data) => fetchAPI(data),
    null,
    {
      immediate: false
    }
  )

  const getTableData = async () => {
    try {
      const { code, rows = [], total = 0 } = await execute(0, { ...searchParams.value })
      if (code === 200) {
        dataSource.value.total = total || 0
        dataSource.value.list = rows || []
        dataSource.value.pageNum = searchParams.value.pageNum
        dataSource.value.pageSize = searchParams.value.pageSize || 10
      }
    } catch (error) {

    }
  }

  const onRefresh = () => {
    searchParams.value.pageNum = 1
    getTableData()
  }

  const onPagination = (val) => {
    searchParams.value = { ...searchParams.value, ...val }
    getTableData()
  }

  const onSelection = (val) => {
    selection.value = val
  }

  return {
    isLoading,
    searchParams,
    dataSource,
    selection,
    getTableData,
    onRefresh,
    onPagination,
    onSelection
  }
}
