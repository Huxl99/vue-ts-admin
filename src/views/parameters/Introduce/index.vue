<template>
  <el-card>
    <el-descriptions title="项目介绍" :column="3" border>
      <el-descriptions-item
        v-for="(item, index) in introduceList"
        :key="index"
        width="80px"
      >
        <template #label>
          <div class="cell-item">
            <svg-icon name="vue"></svg-icon>
            {{ item.title }}
          </div>
        </template>
        {{ item.lable }}
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
  <el-card style="margin: 10px 0px">
    <div>
      <el-divider content-position="left">
        i18n结合ElementPlus国际化实现多语言切换
      </el-divider>
      <p>在项目README.md文件中</p>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { introduceList } from './index'
</script>

<style lang="scss" scoped></style>
