<template>
  <!--分页-->
  <el-pagination
    @size-change="sizeChange"
    @current-change="currentChange"
    :pager-count="9"
    v-model:current-page="product.pageNo"
    v-model:page-size="product.limit"
    :page-sizes="[3, 5, 7, 9]"
    :background="true"
    layout="prev, pager, next, jumper,->,sizes,total"
    :total="product.total"
  />
</template>

<script setup lang="ts">
//@ts-ignore
import { ref } from 'vue'
import productStore from '@/store/modules/product'
const product = productStore()

const sizeChange = () => {
  //当前每一页的数据量发生变化的时候，当前页码归1
  product.getHasTrade()
  product.pageNo = 1
}
const currentChange = () => {
  product.getHasTrade()
}
</script>
<script lang="ts">
export default {
  name: 'Pag',
}
</script>

<style lang="scss" scoped></style>
