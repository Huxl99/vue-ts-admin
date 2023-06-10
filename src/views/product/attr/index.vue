<template>
  <div>
    <!-- 三级分类全局组件 -->
    <Category :scene="scene" />
    <el-card style="margin: 10px 0px">
      <div v-show="scene == 0">
        <el-button
          @click="addAttr"
          type="primary"
          size="default"
          icon="Plus"
          :disabled="category.c3Id ? false : true"
        >
          {{ t('category.Attribute') }}
        </el-button>
        <el-table border style="margin: 10px 0px" :data="attrArr">
          <el-table-column
            label="#"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            :label="t('category.AttributeName')"
            width="120px"
            prop="attrName"
          ></el-table-column>
          <el-table-column :label="t('category.AttributeNames')">
            <template #="{ row, $index }">
              <el-tag
                style="margin: 5px"
                v-for="item in row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            :label="t('table.operate')"
            width="260px"
            align="center"
          >
            <!-- row：已有的属性对象 -->
            <template #="{ row, $index }">
              <!-- 修改已有属性的按钮 -->
              <el-button type="warning" icon="Edit" @click="updateAttr(row)">
                {{ t('menuUser.edit') }}
              </el-button>

              <el-button
                type="danger"
                icon="Delete"
                @click="removeAttr(row.id)"
              >
                {{ t('menuUser.remove') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene == 1">
        <!-- 展示添加属性与修改数据的结构 -->
        <el-form :inline="true">
          <el-form-item :label="t('category.AttributeName')">
            <el-input
              :placeholder="t('category.categoryPlaceholder')"
              v-model="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          @click="addAttrValue"
          :disabled="attrParams.attrName ? false : true"
          type="primary"
          size="default"
          icon="Plus"
        >
          {{ t('category.addValue') }}
        </el-button>
        <el-button type="primary" size="default" @click="cancel">
          {{ t('dialog.cancel') }}
        </el-button>
        <el-table
          border
          style="margin: 10px 0px"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            label="#"
            width="80px"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column :label="t('category.AttributeNames')">
            <!-- row:即为当前属性值对象 -->
            <template #="{ row, $index }">
              <el-input
                :ref="(vc: any) => inputArr[$index] = vc"
                v-if="row.flag"
                @blur="toLook(row, $index)"
                size="small"
                :placeholder="t('category.categoryPlaceholder')"
                v-model="row.valueName"
              ></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column :label="t('category.operation')">
            <template #="{ row, index }">
              <el-button
                type="primary"
                size="small"
                icon="Delete"
                @click="attrParams.attrValueList.splice(index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          size="default"
          @click="save"
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
        >
          {{ t('category.preserve') }}
        </el-button>
        <el-button type="primary" size="default" @click="cancel">
          {{ t('dialog.cancel') }}
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import Category from '@/components/category/index.vue'
//组合式API函数watch
//@ts-ignore
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
//引入获取已有属性与属性值接口
import {
  reqAttr,
  reqAddOrUpdateAttr,
  reqRemoveAttr,
} from '@/api/product/attr/index'
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type'
//获取分类的仓库
import categoryStore from '@/store/modules/category'
//@ts-ignore
import { ElMessage, ElMessageBox } from 'element-plus'
//@ts-ignore
import { useI18n } from 'vue-i18n'
const { t } = useI18n() // 引入国际化组件动态翻译方法
let category = categoryStore()
//存储已有的属性与属性值
let attrArr = ref<Attr[]>([])
//定义card组件内容切换变量
let scene = ref<number>(0) //scene=0,显示table,scene=1,展示添加与修改属性结构
//收集新增的属性的数据
let attrParams = reactive<Attr>({
  attrName: '', //新增的属性的名字
  attrValueList: [
    //新增的属性值数组
  ],
  categoryId: '', //三级分类的ID
  categoryLevel: 3, //代表的是三级分类
})
//准备一个数组:将来存储对应的组件实例el-input
let inputArr = ref<any>([])
//监听仓库三级分类ID变化
watch(
  () => category.c3Id,
  () => {
    //清空上一次查询的属性与属性值
    attrArr.value = []
    //保证三级分类得有才能发请求
    if (!category.c3Id) return
    //获取分类的ID
    getAttr()
  },
)
//获取已有的属性与属性值方法
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = category
  //获取分类下的已有的属性与属性值
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code == 200) {
    attrArr.value = result.data
  }
}
//添加属性按钮的回调
const addAttr = () => {
  //每一次点击的时候,先清空一下数据再收集数据
  Object.assign(attrParams, {
    attrName: '', //新增的属性的名字
    attrValueList: [
      //新增的属性值数组
    ],
    categoryId: category.c3Id, //三级分类的ID
    categoryLevel: 3, //代表的是三级分类
  })
  //切换为添加与修改属性的结构
  scene.value = 1
}
//table表格修改已有属性按钮的回调
const updateAttr = (row: Attr) => {
  //切换为添加与修改属性的结构
  scene.value = 1
  //将已有的属性对象赋值给attrParams对象即为
  //ES6->Object.assign进行对象的合并
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}
//取消按钮的回调
const cancel = () => {
  scene.value = 0
}
//添加属性值按钮的回调
const addAttrValue = () => {
  //点击添加属性值按钮的时候,向数组添加一个属性值对象
  attrParams.attrValueList.push({
    valueName: '',
    flag: true, //控制每一个属性值编辑模式与切换模式的切换
  })
  //获取最后el-input组件聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}
//保存按钮的回调
const save = async () => {
  //发请求
  let result: any = await reqAddOrUpdateAttr(attrParams)
  //添加属性|修改已有的属性已经成功
  if (result.code == 200) {
    //切换场景
    scene.value = 0
    //提示信息
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    //获取全部已有的属性与属性值
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}

//属性值表单元素失却焦点事件回调
const toLook = (row: AttrValue, $index: number) => {
  //非法情况判断1
  if (row.valueName.trim() == '') {
    //删除调用对应属性值为空的元素
    attrParams.attrValueList.splice($index, 1)
    //提示信息
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  //非法情况2
  //@ts-ignore
  let repeat = attrParams.attrValueList.find((item) => {
    //切记把当前失却焦点属性值对象从当前数组扣除判断
    if (item != row) {
      return item.valueName === row.valueName
    }
  })

  if (repeat) {
    //将重复的属性值从数组当中干掉
    attrParams.attrValueList.splice($index, 1)
    //提示信息
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }
  //相应的属性值对象flag:变为false,展示div
  row.flag = false
}

//属性值div点击事件
const toEdit = (row: AttrValue, $index: number) => {
  //相应的属性值对象flag:变为true,展示input
  row.flag = true
  //nextTick:响应式数据发生变化,获取更新的DOM(组件实例)
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}

//删除回调
const removeAttr = (attrId: number) => {
  ElMessageBox.confirm('您确定要删除这条数据吗?', '删除', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const res = await reqRemoveAttr(attrId)
      // console.log(res)
      if (res.code !== 200) {
        return ElMessage.error('服务器发送错误')
      }
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      //再次发请求获取已有全部的数据
      getAttr()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '您取消了删除',
      })
    })
}

//路由组件销毁的时候，把仓库分类相关的数据清空
onBeforeUnmount(() => {
  //清空仓库的数据
  category.$reset()
})
</script>

<style scoped></style>
