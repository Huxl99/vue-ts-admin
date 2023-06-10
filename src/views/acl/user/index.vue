<template>
  <el-card style="height: 80px">
    <!--搜索区域-->
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input
          :placeholder="t('login.userPlaceholder')"
          clearable
          @clear="user.getHasUser"
          v-model="user.keyword"
        >
          <template #append>
            <el-button
              :icon="Search"
              @click="search"
              :disabled="user.keyword ? false : true"
            />
          </template>
        </el-input>
      </el-col>
    </el-row>
  </el-card>
  <!--表格区-->
  <el-card style="margin: 10px 0">
    <el-button type="primary" size="default" @click="addUser">
      {{ t('dialog.addUser') }}
    </el-button>
    <el-button
      type="danger"
      size="default"
      :disabled="selectIdArr.length ? false : true"
      @click="deleteSelectUser"
    >
      {{ t('menuUser.out') }}
    </el-button>
    <el-table
      style="margin: 10px 0"
      border
      :data="user.userArr"
      @selection-change="selectChange"
    >
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column label="#" type="index" align="center"></el-table-column>
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column
        :label="t('table.userName')"
        align="center"
        prop="username"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        :label="t('table.name')"
        align="center"
        prop="name"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        :label="t('table.role')"
        align="center"
        prop="roleName"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        :label="t('table.setupTime')"
        align="center"
        prop="createTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        :label="t('table.updateTime')"
        align="center"
        prop="updateTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column :label="t('table.operate')" width="280px" align="center">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            icon="User"
            @click="setRole(row)"
          >
            {{ t('menuUser.assign') }}
          </el-button>
          <el-button
            type="warning"
            size="small"
            icon="Edit"
            @click="updateUser(row)"
          >
            {{ t('menuUser.edit') }}
          </el-button>
          <el-button
            type="danger"
            size="small"
            icon="Delete"
            @click="removeRoles(row.id)"
          >
            {{ t('menuUser.remove') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页器-->
    <Pag></Pag>
  </el-card>
  <!-- 抽屉结构:完成添加新的用户账号|更新已有的账号信息 -->
  <el-drawer v-model="drawer">
    <!-- 头部标题:将来文字内容应该动态的 -->
    <template #header>
      <h4>{{ userParams.id ? t('dialog.update') : t('dialog.addUser') }}</h4>
    </template>
    <!-- 身体部分 -->
    <template #default>
      <el-form :model="userParams" :rules="rules" ref="formRef">
        <el-form-item :label="t('table.userName')" prop="username">
          <el-input
            :placeholder="t('dialog.userNamePlaceholder')"
            v-model="userParams.username"
          ></el-input>
        </el-form-item>
        <el-form-item :label="t('table.name')" prop="name">
          <el-input
            :placeholder="t('dialog.namePlaceholder')"
            v-model="userParams.name"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="t('dialog.userPassword')"
          prop="password"
          v-if="!userParams.id"
        >
          <el-input
            :placeholder="t('dialog.passwordPlaceholder')"
            v-model="userParams.password"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancel">{{ t('dialog.cancel') }}</el-button>
        <el-button type="primary" @click="save">
          {{ t('dialog.confirm') }}
        </el-button>
      </div>
    </template>
  </el-drawer>
  <!--分配权限:抽屉-->
  <el-drawer v-model="drawer1">
    <!-- 头部标题:将来文字内容应该动态的 -->
    <template #header>
      <h4>{{ t('menuUser.assign') }}</h4>
    </template>
    <!-- 身体部分 -->
    <el-form>
      <el-form-item :label="t('table.userName')">
        <el-input v-model="userParams.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item :label="t('dialog.position')">
        <el-checkbox
          @change="handleCheckAllChange"
          v-model="checkAll"
          :indeterminate="isIndeterminate"
        >
          {{ t('dialog.selec') }}
        </el-checkbox>
        <!-- 显示职位的的复选框 -->
        <el-checkbox-group
          v-model="userRole"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox
            v-for="(role, index) in allRole"
            :key="index"
            :label="role"
          >
            {{ role.roleName }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer1 = false">取消</el-button>
        <el-button type="primary" @click="confirmClick">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
//@ts-ignore
import { ref, reactive, nextTick } from 'vue'
//@ts-ignore
import { Search } from '@element-plus/icons-vue'
import aclUser from '@/store/modules/acl_user'
import Pag from './components/pag.vue'
//@ts-ignore
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  reqAddOrUpdateUser,
  reqAllRole,
  reqSetUserRole,
  reqSelectUser,
  reqRemoveUser,
} from '@/api/acl/user/index'
import type {
  User,
  AllRoleResponseData,
  AllRole,
  SetRoleData,
} from '@/api/acl/user/type'
//@ts-ignore
import lodash from 'lodash'
//@ts-ignore
import { useI18n } from 'vue-i18n'
const { t } = useI18n() // 引入国际化组件动态翻译方法

//定义响应式数据控制抽屉的显示与隐藏
let drawer = ref<boolean>(false)
//控制分配角色抽屉显示与隐藏
let drawer1 = ref<boolean>(false)
//存储全部职位的数据
let allRole = ref<AllRole>([])
//当前用户已有的职位
let userRole = ref<AllRole>([])
//收集顶部复选框全选的数据
const checkAll = ref<boolean>(false)
//控制顶部全选复选框不确定的样式
const isIndeterminate = ref<boolean>(true)
//准备一个数组存储批量删除的用户的ID
let selectIdArr = ref<User[]>([])
//定义响应式数据:收集用户输入进来的关键字

const user = aclUser()
user.getHasUser()
//收集用户信息的响应式数据
let userParams = reactive<User>({
  username: '',
  name: '',
  password: '',
})
//获取form组件实例
let formRef = ref<any>()

//添加用户按钮的回调
const addUser = () => {
  //抽屉显示出来
  drawer.value = true
  //清空数据
  Object.assign(userParams, {
    id: 0,
    username: '',
    name: '',
    password: '',
  })
  //清除上一次的错误的提示信息
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
}
//更新已有的用户按钮的回调
//row:即为已有用户的账号信息
const updateUser = (row: User) => {
  //抽屉显示出来
  drawer.value = true
  //存储收集已有的账号信息
  Object.assign(userParams, row)
  //清除上一次的错误的提示信息
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
  })
}
//保存按钮的回调
const save = async () => {
  //点击保存按钮的时候,务必需要保证表单全部复合条件在去发请求
  await formRef.value.validate()
  //保存按钮:添加新的用户|更新已有的用户账号信息
  let result: any = await reqAddOrUpdateUser(userParams)
  //添加或者更新成功
  if (result.code == 200) {
    //关闭抽屉
    drawer.value = false
    //提示消息
    ElMessage({
      type: 'success',
      message: userParams.id ? '更新成功' : '添加成功',
    })
    //获取最新的全部账号的信息
    // user.getHasUser()
    //浏览器自动刷新一次
    window.location.reload()
  } else {
    //关闭抽屉
    drawer.value = false
    //提示消息
    ElMessage({
      type: 'error',
      message: userParams.id ? '更新失败' : '添加失败',
    })
  }
}
//取消按钮的回调
const cancel = () => {
  //关闭抽屉
  drawer.value = false
}
//校验用户名字回调函数
const validatorUsername = (rule: any, value: any, callBack: any) => {
  //用户名字|昵称,长度至少五位
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('用户名字至少二位'))
  }
}
//校验用户名字回调函数
const validatorname = (rule: any, value: any, callBack: any) => {
  //用户名字|昵称,长度至少五位
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('用户昵称至少二位'))
  }
}
const validatorPassword = (rule: any, value: any, callBack: any) => {
  //用户名字|昵称,长度至少五位
  if (value.trim().length >= 6) {
    callBack()
  } else {
    callBack(new Error('用户密码至少六位'))
  }
}
//表单校验的规则对象
const rules = {
  //用户名字
  username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
  //用户昵称
  name: [{ required: true, trigger: 'blur', validator: validatorname }],
  //用户的密码
  password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
}

//分配角色按钮回调
const setRole = async (row: User) => {
  drawer1.value = true
  Object.assign(userParams, row)
  //获取全部的职位的数据与当前用户已有的职位的数据
  let result: AllRoleResponseData = await reqAllRole(userParams.id as number)
  if (result.code == 200) {
    //存储全部的职位
    allRole.value = result.data.allRolesList
    //存储当前用户已有的职位
    userRole.value = result.data.assignRoles
    //抽屉显示出来
    drawer1.value = true
  }
}
//顶部的全部复选框的change事件
const handleCheckAllChange = (val: boolean) => {
  //val:true(全选)|false(没有全选)
  userRole.value = val ? allRole.value : []
  //不确定的样式(确定样式)
  isIndeterminate.value = false
}
//顶部全部的复选框的change事件
const handleCheckedCitiesChange = (value: string[]) => {
  //顶部复选框的勾选数据
  //代表:勾选上的项目个数与全部的职位个数相等，顶部的复选框勾选上
  checkAll.value = value.length === allRole.value.length
  //不确定的样式
  isIndeterminate.value = value.length !== allRole.value.length
}
//确定按钮的回调(分配职位)
const confirmClick = async () => {
  //收集参数
  let data: SetRoleData = {
    userId: userParams.id as number,
    roleIdList: userRole.value.map((item: any) => {
      return item.id as number
    }),
  }
  //分配用户的职位
  let result: any = await reqSetUserRole(data)
  if (result.code == 200) {
    //提示信息
    ElMessage({ type: 'success', message: '分配职务成功' })
    //关闭抽屉
    drawer1.value = false
    //获取更新完毕用户的信息,更新完毕留在当前页
    user.getHasUser()
  }
}
const removeRoles = (userId: number) => {
  ElMessageBox.confirm('您确定要删除这条数据吗?', '删除', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      const res = await reqRemoveUser(userId)
      if (res.code !== 200) {
        return ElMessage.error('服务器发送错误')
      }
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      //再次发请求获取已有全部的品牌数据
      user.getHasUser()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '您取消了删除',
      })
    })
}
//table复选框勾选的时候会触发的事件
const selectChange = (value: any) => {
  selectIdArr.value = value
}
//批量删除按钮的回调
const deleteSelectUser = async () => {
  //整理批量删除的参数
  let idsList: any = selectIdArr.value.map((item: any) => {
    return item.id
  })
  //批量删除的请求
  let result: any = await reqSelectUser(idsList)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    user.getHasUser()
  }
}
const search = lodash.debounce(() => {
  //根据关键字获取相应的用户数据
  user.getHasUser()
  //清空关键字
  user.keyword = ''
}, 500)
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
