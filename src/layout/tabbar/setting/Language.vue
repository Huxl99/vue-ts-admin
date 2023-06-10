<template>
  <el-dropdown @command="handleCommand" trigger="hover">
    <el-button circle>
      <svg-icon name="china"></svg-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh" :disabled="currentLanguage === 'zh'">
          {{ t('menus.captionZh') }}
        </el-dropdown-item>
        <el-dropdown-item command="en" :disabled="currentLanguage === 'en'">
          {{ t('menus.captionEn') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
//@ts-ignore
import { computed } from 'vue'
//@ts-ignore
import { useI18n } from 'vue-i18n'

import Language from '@/store/modules/Language'
const { t } = useI18n() // 引入国际化组件动态翻译方法
const lang = Language()
const i18n = useI18n()
const currentLanguage = computed(() => {
  return i18n.locale.value
})

const handleCommand = (val: any) => {
  //console.log(val)
  i18n.locale.value = val
  lang.changLang(val)
  localStorage.setItem('lang', val)
}
</script>
<script lang="ts">
export default {
  name: 'Language',
}
</script>

<style lang="scss" scoped></style>
