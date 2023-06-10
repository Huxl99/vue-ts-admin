<template>
  <el-pagination
    v-model:current-page="user.pageNo"
    v-model:page-size="user.pageSize"
    :page-sizes="[5, 7, 9, 11]"
    :background="true"
    layout="prev, pager, next, jumper,->,sizes,total"
    :total="user.total"
    @current-change="currentChange"
    @size-change="sizeChange"
  />
</template>

<script setup lang="ts">
//@ts-ignore
import { ref } from 'vue'
import aclUser from '@/store/modules/acl_user'

//分页器当前页码
const user = aclUser()
const sizeChange = () => {
  user.getHasUser()
}
const currentChange = () => {
  user.getHasUser()
  // console.log('当前页面改变', newPage)
}
</script>
<script lang="ts">
export default {
  name: 'Pag',
}
</script>

<style lang="scss" scoped></style>
