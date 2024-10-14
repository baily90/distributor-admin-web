<template>
  <div class="container-table">
    <el-table
      :data="dataSource.list"
      v-loading="loading"
      :max-height="tabelHeight"
      :ref="(el) => (tableRef = el)"
      @selection-change="handleSelectionChange"
    >
     <el-table-column type="selection" width="55" v-if="isSelection" />
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item">
          <template #default="scope" v-if="item.slotName">
            <slot :name="item.slotName" :row="scope.row"></slot>
          </template>
        </el-table-column>
      </template>

      <template #empty>
        <el-empty :image-size="100" />
      </template>
    </el-table>

    <div
      class="pagination-container"
      v-if="dataSource.list?.length && isShowPagination"
    >
      <el-pagination
        :current-page="dataSource.pageNum"
        :page-size="dataSource.pageSize"
        :page-sizes="[10, 20, 30, 50]"
        :small="false"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :total="dataSource.total"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useWindowSize, useElementBounding } from '@vueuse/core'

const tableRef = ref()
const tabelHeight = ref(0)
const windowSize = useWindowSize()
const tableBounding = useElementBounding(tableRef)

defineProps({
  dataSource: {
    type: Object,
    default: () => ({
      list: [],
      total: 0
    })
  },
  loading: {
    type: Boolean,
    default: true
  },
  propList: {
    type: Array,
    default: () => []
  },
  isShowPagination: {
    type: Boolean,
    default: true
  },
  isSelection: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['pagination', 'selection'])

const handleSelectionChange = (val) => {
  emit('selection', val)
}

onMounted(() => {
  tabelHeight.value =
    windowSize.height.value - (tableBounding.top.value + 44 + 20 + 20)
})

const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
  emit('pagination', { pageNum: val })
}

const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
  emit('pagination', { pageSize: val })
}
</script>

<style scoped lang="less">
.container-table {
  .pagination-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 12px;
    width: 100%;
  }
}
</style>
