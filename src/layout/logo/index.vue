<template>
  <div class="logo" v-if="setting.logoHidden">
    <img src="@/assets/logo.png" alt="" />
    <p v-show="LayOutSettingStore.fold ? false : true">
      {{ t('logo.title') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
import useLayOutSettingStore from '@/store/modules/setting'
//@ts-ignore
import { useI18n } from 'vue-i18n'
const { t } = useI18n() // 引入国际化组件动态翻译方法
let LayOutSettingStore = useLayOutSettingStore()
</script>
<script lang="ts">
export default {
  name: 'Logo',
}
</script>
<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  display: flex;
  align-items: center;
  padding: 10px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 15px;
  }
}
</style>
