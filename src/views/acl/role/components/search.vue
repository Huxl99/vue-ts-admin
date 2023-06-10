<template>
  <!--搜索区域-->
  <el-row :gutter="20" class="header">
    <el-col :span="7">
      <el-input
        :placeholder="t('dialog.doorPlaceholder')"
        clearable
        @clear="role.getHasRole"
        v-model="role.keyword"
      >
        <template #append>
          <el-button
            :icon="Search"
            @click="search"
            :disabled="role.keyword ? false : true"
          />
        </template>
      </el-input>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
//@ts-ignore
import { Search } from '@element-plus/icons-vue'
import roleUser from '@/store/modules/role_user'
//@ts-ignore
import { useI18n } from 'vue-i18n'
const { t } = useI18n() // 引入国际化组件动态翻译方法
const role = roleUser()
const search = () => {
  //根据关键字获取相应的用户数据
  role.getHasRole()
  //清空关键字
  role.keyword = ''
}
</script>
<script lang="ts">
export default {
  name: 'Search',
}
</script>
<style lang="scss" scoped></style>
