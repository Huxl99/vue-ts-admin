<template>
  <Bell class="Bell"></Bell>
  <el-tooltip :content="t('menus.renovate')" placement="bottom" effect="light">
    <el-button icon="Refresh" circle @click="updateRefsh"></el-button>
  </el-tooltip>
  <el-tooltip :content="t('menus.full')" placement="bottom" effect="light">
    <el-button icon="FullScreen" circle @click="fullScreen"></el-button>
  </el-tooltip>
  <Language class="language"></Language>
  <el-popover
    placement="bottom"
    :title="t('setting.title')"
    :width="300"
    trigger="hover"
  >
    <!-- 表单元素 -->
    <el-form>
      <el-form-item :label="t('setting.titleColor')">
        <el-color-picker
          @change="setColor"
          v-model="color"
          size="small"
          show-alpha
          :predefine="predefineColors"
        />
      </el-form-item>
      <!--暗黑模式-->
      <el-form-item :label="t('setting.darkness')">
        <el-switch
          @change="changeDark"
          v-model="dark"
          class="mt-2"
          style="margin-left: 24px"
          inline-prompt
          active-icon="MoonNight"
          inactive-icon="Sunny"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button icon="Setting" circle></el-button>
    </template>
    <!--Tabs显示和隐藏-->
    <el-form-item label="Tabs按钮">
      <el-switch
        @change="changeTabs"
        v-model="tabs"
        class="mt-2"
        style="margin-left: 24px"
        inline-prompt
        :active-icon="Check"
        :inactive-icon="Close"
      />
    </el-form-item>
  </el-popover>
  <img
    src="@/assets/logo.png"
    style="width: 30px; height: 30px; margin: 0px 10px; border-radius: 50%"
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">
          {{ t('menus.logOut') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
//@ts-ignore
import { ref } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting'

import useUserStore from '@/store/modules/user'
//@ts-ignore
import { useRouter, useRoute } from 'vue-router'
import Language from './Language.vue'
import Bell from './bell.vue'
//@ts-ignore
import { Check, Close } from '@element-plus/icons-vue'
//@ts-ignore
import { useI18n } from 'vue-i18n'
const { t } = useI18n() // 引入国际化组件动态翻译方法
let layoutSettingStore = useLayOutSettingStore()
let userStore = useUserStore()

//获取路由器对象
let $router = useRouter()
//收集开关的数据
let dark = ref<boolean>(false)
//控制tabs按钮
let tabs = ref<boolean>(true)
//获取路由对向
let $route = useRoute()
//刷新按钮点击回调
const updateRefsh = () => {
  layoutSettingStore.refsh = !layoutSettingStore.refsh
}
//全屏按钮点击的回调
const fullScreen = () => {
  //DOM对象的一个属性:可以用来判断当前是不是全屏模式[全屏:true,不是全屏:false]
  let full = document.fullscreenElement
  //切换为全屏模式
  if (!full) {
    //文档根节点的方法requestFullscreen,实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    //变为不是全屏模式->退出全屏模式
    document.exitFullscreen()
  }
}

//退出登录点击回调
const logout = async () => {
  //第一件事情:需要向服务器发请求[退出登录接口]******
  //第二件事情:仓库当中关于用于相关的数据清空[token|username|avatar]
  //第三件事情:跳转到登录页面
  await userStore.userLogout()

  //跳转到登录页面
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
//颜色组件组件的数据
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
//主题颜色的设置
const setColor = () => {
  //通知js修改根节点的样式对象的属性与属性值
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
}
//暗黑切换
const changeDark = () => {
  //获取HTML根节点
  const html = document.documentElement
  //判断HTML标签是否有类名dark
  dark.value ? (html.className = 'dark') : (html.className = '')
}
//Tabs控制显示和隐藏
const changeTabs = () => {
  layoutSettingStore.tabs = tabs.value
  //console.log(layoutSettingStore.tabs)
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style lang="scss" scoped>
.language {
  margin: 0px 10px;
}
</style>
