<script setup lang="ts">
//@ts-ignore
import zh from 'element-plus/lib/locale/lang/zh-cn'
//@ts-ignore
import en from 'element-plus/lib/locale/lang/en'
import Language from '@/store/modules/Language' //store存放语言配置
const lang = Language()
//console.log(lang.lang)
</script>

<template>
  <el-config-provider :locale="lang.lang === 'zh' ? zh : en">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped lang="scss">
div {
  font-size: 20px;
}
</style>
