<template>
  <!--注册-->
  <el-form
    label-width="80px"
    class="register-from"
    status-icon
    :model="regisRuleForm"
    :rules="registerRules"
    ref="regisFormRef"
  >
    <h1 class="title">{{ t('login.Register') }}</h1>
    <p class="title_bottom">Vue3.2+TS+Element-Plus</p>
    <el-form-item :label="t('login.userName')" prop="name">
      <el-input
        :placeholder="t('login.userPlaceholder')"
        autocomplete="off"
        v-model="regisRuleForm.name"
      />
    </el-form-item>
    <el-form-item :label="t('login.email')" prop="email">
      <el-input
        :placeholder="t('login.emailPlaceholder')"
        autocomplete="off"
        v-model="regisRuleForm.email"
      />
    </el-form-item>
    <el-form-item :label="t('login.password')" prop="password">
      <el-input
        :placeholder="t('login.passPlaceholder')"
        type="password"
        autocomplete="off"
        show-password
        v-model="regisRuleForm.password"
      />
    </el-form-item>
    <el-form-item :label="t('login.password')" prop="password2">
      <el-input
        :placeholder="t('login.passPlaceholder')"
        type="password"
        autocomplete="off"
        show-password
        v-model="regisRuleForm.password2"
      />
    </el-form-item>

    <el-form-item :label="t('login.status')">
      <el-select
        :placeholder="t('login.statusPlaceholder')"
        v-model="regisRuleForm.role"
      >
        <el-option :label="t('login.Attendant')" value="admin"></el-option>
        <el-option :label="t('login.user')" value="user"></el-option>
        <el-option :label="t('login.tourist')" value="visitor"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        class="submit-btn"
        @click="RegisterSum(regisFormRef)"
      >
        {{ t('login.Register') }}
      </el-button>
      <el-button class="submit-btn" @click="RegisterBtn">
        {{ t('login.Replace') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
//@ts-ignore
import { FormInstance } from 'element-plus'
import { Register, RegisterRules } from '@/type/login'
//@ts-ignore
import { reactive, ref } from 'vue'
//@ts-ignore
import { useI18n } from 'vue-i18n'
const { t } = useI18n() // 引入国际化组件动态翻译方法
//表单验证
const regisRuleForm = <Register>reactive({
  name: '',
  email: '',
  password: '',
  password2: '',
  role: '',
})
//注册二次密码验证
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请在此输入密码'))
  } else if (value !== regisRuleForm.password) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}

const registerRules = <RegisterRules>reactive({
  name: [
    { required: true, message: t('loginRules.userNameNull'), trigger: 'blur' },
    {
      min: 5,
      max: 10,
      message: t('loginRules.usernameMsg'),
      trigger: 'blur',
    },
  ],
  email: [
    { required: true, message: t('loginRules.email'), trigger: 'blur' },
    { type: 'email', message: t('loginRules.emailFormat'), trigger: 'blur' },
  ],
  password: [
    { required: true, message: t('loginRules.passwordNull'), trigger: 'blur' },
    { min: 6, max: 16, message: t('loginRules.passwordMsg'), trigger: 'blur' },
  ],
  password2: [
    { required: true, message: t('loginRules.passwordNull'), trigger: 'blur' },
    { min: 6, max: 16, message: t('loginRules.passwordMsg'), trigger: 'blur' },
    { validator: validatePass2, trigger: 'blur' },
  ],
})
//注册重置
const RegisterBtn = () => {
  ;(regisRuleForm.name = ''),
    (regisRuleForm.email = ''),
    (regisRuleForm.password = ''),
    (regisRuleForm.password2 = ''),
    (regisRuleForm.role = '')
}
//注册按钮
const regisFormRef = ref<FormInstance>()
const RegisterSum = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid: boolean) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<style scoped>
.register-from {
  grid-column: 1;
  grid-row: 1;
  opacity: 0;
  transition: 1s ease-in-out;
  padding: 7% 15%;
  pointer-events: none;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
.register-from.sign-up-model {
  opacity: 1;
  transition: 1s ease-in-out;
  transition-delay: 1s;
  pointer-events: all;
}
.title {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 15px;
}
.title_bottom {
  text-align: center;
  font-size: 14px;
  margin-bottom: 8px;
  color: #a9a9a9;
}
</style>
