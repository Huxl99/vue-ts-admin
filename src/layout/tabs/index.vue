<template>
  <el-tabs
    v-model="activeKey"
    editable
    type="card"
    @tab-click="clickHandle"
    @tab-remove="removeTab"
    @contextmenu.prevent.native="openContextMenu($event)"
    v-if="setting.tabs === true"
  >
    <el-tab-pane
      v-for="item in tabList"
      :key="item.path"
      :name="item.path"
      closable
    >
      <template #label>
        <el-icon style="font-size: 18px; margin-right: 2px">
          <component :is="item.icon"></component>
        </el-icon>
        <span :class="activeKey === item.path ? 'label' : ''">
          {{ item.title }}
        </span>
      </template>
    </el-tab-pane>
  </el-tabs>
  <ul
    v-show="contextMenuVisible"
    :style="{ left: left + 'px', top: top + 'px' }"
    class="contextmenu"
  >
    <li @click="closeAllTabs">关闭所有</li>
    <li @click="closeOtherTabs">关闭其他</li>
  </ul>
</template>
<script lang="ts" setup>
import tabStore from '@/store/modules/tabs'
//@ts-ignore
import { computed, onMounted, ref, watch } from 'vue'
//@ts-ignore
import { useRoute, useRouter } from 'vue-router'
import { Itab } from '@/store/modules/type/type'
import useLayOutSettingStore from '@/store/modules/setting'
//@ts-ignore
import { useI18n } from 'vue-i18n'
const { t } = useI18n() // 引入国际化组件动态翻译方法
const store = tabStore()
const route = useRoute()
const router = useRouter()
const setting = useLayOutSettingStore()
const tabList = computed(() => {
  return store.tabsList
})
//索引
const activeKey = ref('/home')
//添加tab
const addTab = () => {
  const { meta, path } = route
  const tab: Itab = {
    path: path,
    title: t(meta.title) as string,
    icon: meta.icon,
  }
  store.addTabs(tab)
  // console.log(tab)
}
//点击tab
const clickHandle = (event: any) => {
  //console.log(event.props.name);
  router.push({ path: event.props.name })
}
//移除
const removeTab = (targetName: string) => {
  //console.log(targetName);
  if (targetName === '/home') return //首页不能删除
  const tabs = tabList.value
  let activeName = activeKey.value
  //当前激活的选项卡路径===当前删除的选项卡路径
  if (activeName === targetName) {
    tabList.value.forEach((tab: Itab, index: number) => {
      if (tab.path === targetName) {
        const nextTab = tabList.value[index + 1] || tabList.value[index - 1]
        if (nextTab) {
          activeName = nextTab.path
        }
      }
    })
  }
  store.closeCurrentTab(targetName)
  //重新设置当前激活的选项卡
  activeKey.value = activeName
  //重新设置选项卡数据
  //@ts-ignore
  store.tabsList = tabs.filter((tab) => tab.path !== targetName)
  //跳转路由
  router.push({ path: activeName })
}
watch(
  () => route.path,
  () => {
    activeKey.value = route.path
    addTab()
  },
)

//刷新缓存数据
const refresh = () => {
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('TABS_ROUTES', JSON.stringify(tabList.value))
  })
  let session = sessionStorage.getItem('TABS_ROUTES')
  if (session) {
    let tabItem = JSON.parse(session)
    tabItem.forEach((tab: Itab) => {
      store.addTabs(tab)
    })
  }
}
onMounted(() => {
  addTab()
  refresh()
})

//右键显示菜单删除列表
//@ts-ignore
const contextMenuVisible: Ref<boolean> = ref(false)
const left: any = ref('')
const top: any = ref('')
const openContextMenu = (e: any) => {
  // console.log(e);
  if (e.srcElement.id) {
    let currentContextTabId = e.srcElement.id.split('-')[1]
    store.saveCurcontextTabId(currentContextTabId)
    contextMenuVisible.value = true
    left.value = e.clientX - 230
    top.value = e.clientY - 45
  }
}
//关闭所有
const closeAllTabs = () => {
  store.closeAllTabsbtn()
  contextMenuVisible.value = false
  router.push('/')
}

//关闭其他
const closeOtherTabs = () => {
  store.closeOtherTabsbtn()
  contextMenuVisible.value = false
}

//监控右键删除列表
watch(
  () => contextMenuVisible.value,
  () => {
    if (contextMenuVisible.value) {
      window.addEventListener('click', () => (contextMenuVisible.value = false))
    } else {
      window.removeEventListener(
        'click',
        () => (contextMenuVisible.value = false),
      )
    }
  },
)
</script>
<script lang="ts">
export default {
  name: 'Tabs',
}
</script>
<style lang="scss" scoped>
.contextmenu {
  width: 100px;
  margin: 0;
  border: 1px solid #ccc;
  background-color: #fff;
  z-index: 3000;
  position: absolute;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  box-shadow: 2px 2px 3px 0 reba(0, 0, 0, 0, 2);
  li {
    margin: 0;
    padding: 7px 16px;
    &:hover {
      background: #f2f2f2;
      cursor: pointer;
    }
  }
}
.label {
  color: var(--el-color-primary); //激活标签页高亮
}
:deep(.el-tabs__item) {
  &:hover {
    span {
      color: var(--el-color-primary); //鼠标移到标签页高亮
    }
  }
}
</style>
