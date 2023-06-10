<template>
  <!-- 顶部左侧静态 -->
  <el-icon style="margin-right: 10px" size="26px" @click="changeIcon">
    <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 左侧面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 面包动态展示路由名字与标题 -->
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <div class="center">
        <!-- 图标 -->
        <el-icon size="20px">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <!-- 面包屑展示匹配路由的标题 -->
        <span class="title">{{ t(item.meta.title) }}</span>
      </div>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
//@ts-ignore
import { useRoute } from 'vue-router'
//@ts-ignore
import { ref } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting'
//@ts-ignore
import { useI18n } from 'vue-i18n'
const { t } = useI18n() // 引入国际化组件动态翻译方法
//获取layout配置相关的仓库
let LayOutSettingStore = useLayOutSettingStore()
//获取路由对象
let $route = useRoute()
//点击图标的方法
const changeIcon = () => {
  //图标进行切换
  LayOutSettingStore.fold = !LayOutSettingStore.fold
}
</script>
<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<style scoped>
.title {
  margin: 0 5px;
}
.center {
  display: flex;
  align-items: center;
}
</style>
