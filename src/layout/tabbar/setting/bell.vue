<template>
  <el-popover
    placement="bottom"
    :width="350"
    trigger="hover"
    popper-style="height:170px;"
  >
    <template #reference>
      <el-badge is-dot class="item">
        <el-button icon="Bell" circle></el-button>
      </el-badge>
    </template>
    <el-tabs
      v-model="activeName"
      class="demo-tabs"
      @tab-click="handleClick"
      stretch="true"
    >
      <el-tab-pane :label="t('menus.my')" name="first">
        <div class="center">{{ t('menus.news') }}</div>
        <hr />
        <div class="right">
          <el-link :underline="false">{{ t('menus.inspect') }}</el-link>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="t('menus.notify')" name="second">
        <div>
          这里只做了一个静态的页面,思路其实很简单,如果有消息通知就展示通知数据,如果没有就展示没有消息的样式
        </div>
        <hr />
        <div class="right">
          <el-link :underline="false">{{ t('menus.inspect') }}</el-link>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="t('menus.private')" name="third">
        <div class="center">{{ t('menus.news') }}</div>
        <hr />
        <div class="right">
          <el-link :underline="false">{{ t('menus.inspect') }}</el-link>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-popover>
</template>

<script setup lang="ts">
//@ts-ignore
import { ref } from 'vue'
//@ts-ignore
import type { TabsPaneContext } from 'element-plus'
//@ts-ignore
import { useI18n } from 'vue-i18n'
const { t } = useI18n() // 引入国际化组件动态翻译方法

const activeName = ref('second')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>
<script lang="ts">
export default {
  name: 'Bell',
}
</script>

<style lang="scss" scoped>
.item {
  margin-right: 10px;
}
.center {
  height: 45px;
  line-height: 45px;
  text-align: center;
}
.right {
  float: right;
}
</style>
