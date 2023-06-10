<template>
  <el-pagination
    v-model:current-page="role.pageNo"
    v-model:page-size="role.limit"
    :page-sizes="[5, 7, 9, 11]"
    :background="true"
    layout="prev, pager, next, jumper,->,sizes,total"
    :total="role.total"
    @current-change="currentChange"
    @size-change="sizeChange"
  />
</template>

<script setup lang="ts">
//@ts-ignore
import { ref } from 'vue'
import roleUser from '@/store/modules/role_user'
const role = roleUser()

const sizeChange = () => {
  //当前每一页的数据量发生变化的时候，当前页码归1
  role.getHasRole()
  role.pageNo = 1
}
const currentChange = () => {
  role.getHasRole()
}
</script>
<script lang="ts">
export default {
  name: 'Pag',
}
</script>

<style lang="scss" scoped></style>
