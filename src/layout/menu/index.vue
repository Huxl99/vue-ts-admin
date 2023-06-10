<template>
  <template v-for="item in menuList" :key="item.path">
    <!--没有子路由-->
    <template v-if="!item.children">
      <el-menu-item
        :index="item.path"
        v-if="!item.meta.hidden"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ t(item.meta.title) }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由但是只有一个子路由 -->
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item
        :index="item.children[0].path"
        v-if="!item.children[0].meta.hidden"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ t(item.children[0].meta.title) }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由且个数大于一个1 -->
    <el-sub-menu
      :index="item.path"
      v-if="item.children && item.children.length > 1"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ t(item.meta.title) }}</span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
//@ts-ignore
import { defineProps } from 'vue'
//@ts-ignore
import { useRouter } from 'vue-router'
//@ts-ignore
import { useI18n } from 'vue-i18n'
const { t } = useI18n() // 引入国际化组件动态翻译方法
//获取父组件传递过来的全部路由数组
defineProps(['menuList'])

//获取路由器对象
let $router = useRouter()
//点击菜单的回调
const goRoute = (vc: any) => {
  //路由跳转
  //console.log(vc)
  $router.push(vc.index)
}
</script>
<script lang="ts">
export default {
  name: 'Menu',
}
</script>

<style scoped></style>
