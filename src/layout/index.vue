<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div
      class="layout_slider"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Logo></Logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <el-menu
          :default-active="$route.path"
          active-text-color="#409EFF"
          router
          unique-opened
          :collapse="LayOutSettingStore.fold ? true : false"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabbar"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <!-- layout组件的顶部导航tabbar -->
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区域 -->
    <div
      class="layout_main"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <!--自定义动态增减标签页功能-->
      <Tabs></Tabs>
      <!--内容-->
      <div class="layout_main_style">
        <Main></Main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import Tabs from './tabs/index.vue'
//获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
//@ts-ignore
import { useRoute } from 'vue-router'
import useLayOutSettingStore from '@/store/modules/setting'

const userStore = useUserStore()
let LayOutSettingStore = useLayOutSettingStore()
//获取路由对象
const $route = useRoute()

const withMix = () => {
  let screenWidth = window.innerWidth
  //console.log(screenWidth)
  if (screenWidth <= 570) {
    LayOutSettingStore.fold = true
    //console.log(LayOutSettingStore.fold)
  }
}
withMix()
</script>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: 230px;
    height: 100vh;
    transition: all 0.8s;
    box-shadow: 0px 0px 1px #000;
    &.fold {
      width: 64px;
      left: 64px;
    }
    .scrollbar {
      height: 80%;
    }

    .el-menu {
      border-right: none;
    }
  }

  .layout_tabbar {
    position: absolute;
    width: calc(100% - 230px);
    height: 50px;
    top: 0px;
    left: 230px;
    transition: all 0.8s;
    border-bottom: 1px solid #e4e7ed;
    &.fold {
      width: calc(100vw - 64px);
      left: 64px;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100vw - 230px);
    height: calc(100vh - 50px);
    left: 230px;
    top: 50px;
    overflow: auto;
    transition: all 0.8s;
    &.fold {
      width: calc(100vw - 64px);
      left: 64px;
    }
    .layout_main_style {
      width: 100%;
      margin-left: 20px;
      margin-top: 10px;
    }
  }
}
</style>
