<template>
  <!--搜索组件-->
  <el-card>
    <Search></Search>
  </el-card>
  <el-card style="margin: 10px 0">
    <el-button type="primary" icon="Plus" @click="addRole">
      {{ t('dialog.addDoor') }}
    </el-button>
    <el-table border style="margin: 10px 0" :data="role.roleArr">
      <el-table-column label="#" type="index" align="center"></el-table-column>
      <el-table-column
        label="id"
        type="ID"
        align="center"
        prop="id"
      ></el-table-column>
      <el-table-column
        :label="t('dialog.position')"
        align="center"
        show-overflow-tooltip
        prop="roleName"
      ></el-table-column>
      <el-table-column
        :label="t('table.setupTime')"
        align="center"
        show-overflow-tooltip
        prop="createTime"
      ></el-table-column>
      <el-table-column
        :label="t('table.updateTime')"
        align="center"
        show-overflow-tooltip
        prop="updateTime"
      ></el-table-column>
      <el-table-column :label="t('table.operate')" width="300px" align="center">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            icon="User"
            @click="setPermission(row)"
          >
            {{ t('menuUser.assign') }}
          </el-button>
          <el-button
            type="warning"
            size="small"
            icon="Edit"
            @click="updateRole(row)"
          >
            {{ t('menuUser.edit') }}
          </el-button>
          <el-button
            type="danger"
            size="small"
            icon="Delete"
            @click="removeRole(row.id)"
          >
            {{ t('menuUser.remove') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页器-->
    <Pag></Pag>
  </el-card>
  <!-- 添加职位与更新已有职位的结构:对话框 -->
  <el-dialog
    v-model="dialogVisite"
    :title="
      RoleParams.id
        ? t('dialog.dialogUpdatePosition')
        : t('dialog.dialogAddPosition')
    "
  >
    <el-form :model="RoleParams" :rules="rules" ref="roleFormRef">
      <el-form-item :label="t('dialog.positionName')" prop="roleName">
        <el-input
          :placeholder="t('dialog.positionNamePlaceholder')"
          v-model="RoleParams.roleName"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" size="default" @click="dialogVisite = false">
        {{ t('dialog.cancel') }}
      </el-button>
      <el-button type="primary" size="default" @click="save(roleFormRef)">
        {{ t('dialog.confirm') }}
      </el-button>
    </template>
  </el-dialog>
  <!-- 抽屉组件:分配职位的菜单权限与按钮的权限 -->
  <el-drawer v-model="drawer">
    <template #header>
      <h4>分配权限</h4>
    </template>
    <template #default>
      <!--树形控件-->
      <el-tree
        ref="tree"
        :data="menuArr"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="selectArr"
        :props="defaultProps"
      />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="handler">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
//@ts-ignore
import { ref, reactive, nextTick } from 'vue'
import Search from './components/search.vue'
import Pag from './components/pag.vue'
import roleUser from '@/store/modules/role_user'
import type { RoleData, MenuList, MenuResponseData } from '@/api/acl/role/type'
//@ts-ignore
import { FormInstance, ElMessage, ElMessageBox } from 'element-plus'
import {
  reqAddOrUpdateRole,
  reqRemoveRole,
  reqAllMenuList,
  reqSetPermisstion,
} from '@/api/acl/role/index'
//@ts-ignore
import { useI18n } from 'vue-i18n'
const { t } = useI18n() // 引入国际化组件动态翻译方法
//分页搜索仓库
const role = roleUser()
role.getHasRole()
//控制对话框的显示与隐藏
const dialogVisite = ref<boolean>(false)
//控制抽屉的显示和隐藏
const drawer = ref<boolean>(false)
//收集新增岗位数据
const RoleParams = reactive<RoleData>({
  roleName: '',
})
//准备一个数组:数组用于存储勾选的节点的ID(四级的)
let selectArr = ref<number[]>([])
//定义数组存储用户权限的数据
let menuArr = ref<MenuList>([])
//获取tree组件实例
let tree = ref<any>()
//自定义校验规则的回调
const validatorRoleName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('职位名称至少两位'))
  }
}
//职位校验规则
const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }],
}
//添加职位回调
const addRole = () => {
  dialogVisite.value = true
  //清空数据
  Object.assign(RoleParams, {
    roleName: '',
    id: 0,
  })
  //清空上一次表单校验错误结果
  nextTick(() => {
    roleFormRef.value.clearValidate('roleName')
  })
}
//更新职位回调
const updateRole = (row: number) => {
  dialogVisite.value = true
  Object.assign(RoleParams, row)
  //清空上一次表单校验错误结果
  nextTick(() => {
    roleFormRef.value.clearValidate('roleName')
  })
}
const roleFormRef = ref<FormInstance>()
//添加和更新确认按钮回调
const save = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid: any) => {
    if (valid) {
      //添加职位|更新职位的请求
      let result: any = await reqAddOrUpdateRole(RoleParams)
      if (result.code == 200) {
        //提示文字
        ElMessage({
          type: 'success',
          message: RoleParams.id ? '更新成功' : '添加成功',
        })
        //对话框显示
        dialogVisite.value = false
        //再次获取全部的已有的职位
        role.getHasRole()
      }
    } else {
      ElMessage.error('发生错误!')
    }
  })
}
//删除职位的回调函数
const removeRole = (id: number) => {
  ElMessageBox.confirm('您确定要删除这条数据吗?', '删除', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const res = await reqRemoveRole(id)
      if (res.code !== 200) {
        return ElMessage.error('服务器发送错误')
      }
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      //再次发请求获取已有全部的品牌数据
      role.getHasRole()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '您取消了删除',
      })
    })
}

const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })

  return initArr
}
//树形控件的测试数据
const defaultProps = {
  children: 'children',
  label: 'name',
}

//分配权限按钮回调
const setPermission = async (row: any) => {
  drawer.value = true
  //收集当前要分类权限的职位的数据
  Object.assign(RoleParams, row)
  //根据职位获取权限的数据
  const result: MenuResponseData = await reqAllMenuList(RoleParams.id as number)
  if (result.code == 200) {
    menuArr.value = result.data
    selectArr.value = filterSelectArr(menuArr.value, [])
  }
}
//抽屉确定按钮的回调
const handler = async () => {
  //职位的ID
  const roleId = RoleParams.id as number
  //选中节点的ID
  let arr = tree.value.getCheckedKeys()
  //半选的ID
  let arr1 = tree.value.getHalfCheckedKeys()
  let permissionId = arr.concat(arr1)
  //下发权限
  let result: any = await reqSetPermisstion(roleId, permissionId)
  if (result.code == 200) {
    //抽屉关闭
    drawer.value = false
    //提示信息
    ElMessage({ type: 'success', message: '分配权限成功' })
    //页面刷新
    role.getHasRole()
  }
}
</script>

<style lang="scss" scoped></style>
