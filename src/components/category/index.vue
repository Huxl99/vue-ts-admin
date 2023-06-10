<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item :label="t('category.oneClassify')">
        <el-select
          :placeholder="t('category.Placeholder')"
          v-model="category.c1Id"
          @change="handler"
          :disabled="scene == 0 ? false : true"
        >
          <!-- label:即为展示数据 value:即为select下拉菜单收集的数据 -->
          <el-option
            v-for="c1 in category.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="t('category.towClassify')">
        <el-select
          :placeholder="t('category.Placeholder')"
          v-model="category.c2Id"
          @change="handler1"
          :disabled="scene == 0 ? false : true"
        >
          <el-option
            v-for="c2 in category.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="t('category.threeClassify')">
        <el-select
          :placeholder="t('category.Placeholder')"
          v-model="category.c3Id"
          :disabled="scene == 0 ? false : true"
        >
          <el-option
            v-for="c3 in category.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
//@ts-ignore
import { onMounted, defineProps } from 'vue'
import categoryStore from '@/store/modules/category'
//@ts-ignore
import { useI18n } from 'vue-i18n'
//接受父组件传递过来scene
defineProps(['scene'])
const { t } = useI18n() // 引入国际化组件动态翻译方法
const category = categoryStore()
//分类全局组件挂载完毕,通知仓库发请求获取一级分类的数据
onMounted(() => {
  getC1()
})
//通知仓库获取一级分类的方法
const getC1 = () => {
  //通知分类仓库发请求获取一级分类的数据
  category.getC1()
}
//此方法即为一级分类下拉菜单的change事件(选中值的时候会触发,保证一级分类ID有了)
const handler = () => {
  //需要将二级、三级分类的数据清空
  category.c2Id = ''
  category.c3Arr = []
  category.c3Id = ''
  //通知仓库获取二级分类的数据
  category.getC2()
}
//此方法即为二级分类下拉菜单的change事件(选中值的时候会触发,保证二级分类ID有了)
const handler1 = () => {
  //清理三级分类的数据
  category.c3Id = ''
  category.getC3()
}
</script>
<script lang="ts">
export default {
  name: 'Category',
}
</script>
<style lang="scss" scoped></style>
