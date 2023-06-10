<template>
  <el-form
    ref="ruleFormRef"
    label-width="80px"
    class="login-from"
    status-icon
    :model="ruleForm"
    :rules="rules"
  >
    <h1 class="title">{{ t('login.title') }}</h1>
    <p class="title_bottom">Vue3.2+TS+Element-Plus</p>
    <el-form-item :label="t('login.userName')" prop="username">
      <el-input
        :placeholder="t('login.userPlaceholder')"
        autocomplete="off"
        v-model="ruleForm.username"
      />
    </el-form-item>
    <el-form-item :label="t('login.password')" prop="password">
      <el-input
        type="password"
        :placeholder="t('login.passPlaceholder')"
        show-password
        autocomplete="off"
        v-model="ruleForm.password"
      ></el-input>
    </el-form-item>
    <el-form-item :label="t('login.verification')">
      <el-input style="width: 35%" disabled />
      <Verification></Verification>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        class="submit-btn"
        @click="submitForm(ruleFormRef)"
        v-loading.fullscreen.lock="fullscreenLoading"
      >
        {{ t('login.btnTitle') }}
      </el-button>
      <el-button class="submit-btn" @click="resetForm">
        {{ t('login.Replace') }}
      </el-button>
    </el-form-item>

    <!-- 找回密码 -->
    <div class="tiparea">
      <p>
        {{ t('login.Forgot') }}？
        <a>{{ t('login.Find') }}</a>
      </p>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { LoginFromInt, Rules } from '@/type/login'
//@ts-ignore
import { ElMessage, ElNotification, FormInstance } from 'element-plus'
//@ts-ignore
import { reactive, ref } from 'vue'
//@ts-ignore
import { ElLoading } from 'element-plus'
//@ts-ignore
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/timeDate'
//@ts-ignore
import { useI18n } from 'vue-i18n'
import Verification from './verification .vue'
const { t } = useI18n() // 引入国际化组件动态翻译方法
const fullscreenLoading = ref(false)
const useStore = useUserStore()
let $route = useRoute()
//表单验证
const ruleForm = <LoginFromInt>reactive({
  username: 'admin',
  password: 'atguigu123',
})
const rules = <Rules>reactive({
  username: [
    { required: true, message: t('loginRules.userNameNull'), trigger: 'blur' },
    { min: 5, max: 10, message: t('loginRules.usernameMsg'), trigger: 'blur' },
  ],
  password: [
    { required: true, message: t('loginRules.passwordNull'), trigger: 'blur' },
    { min: 6, max: 16, message: t('loginRules.passwordMsg'), trigger: 'blur' },
  ],
})

//触发点击登录校验
const ruleFormRef = ref()
const router = useRouter()
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid: boolean) => {
    if (valid) {
      fullscreenLoading.value = true
      setTimeout(() => {
        useStore
          .userLogin(ruleForm)
          .then((res: any) => {
            let redirect: any = $route.query.redirect
            router.push({
              path: redirect || '/',
            })
            ElNotification({
              type: 'success',
              message: t('ElNotification.message'),
              title: `Hi,${getTime()}好,管理员`,
              duration: 3000,
            })
            return res
          })
          .catch((error: any) => {
            ElMessage.error('密码或用户名错误,请重新输入！')
            return Promise.reject(new Error(error))
          })

        fullscreenLoading.value = false
      }, 1000)
    } else {
      return false
    }
  })
}

//登录重置
const resetForm = () => {
  ;(ruleForm.username = ''), (ruleForm.password = '')
}
</script>

<style scoped>
.login-from {
  grid-column: 1;
  grid-row: 1;
  opacity: 1;
  transition: 1s ease-in-out;
  transition-delay: 1s;
  padding: 7% 15%;
  pointer-events: all;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
.login-from.sign-up-model {
  opacity: 0;
  transition: 1s ease-in-out;
  pointer-events: none;
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
  margin-bottom: 10px;
  color: #a9a9a9;
}
.login-from .tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.login-from .tiparea p a {
  color: #409eff;
}
</style>
