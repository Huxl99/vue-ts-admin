<template>
  <div
    :class="{ container: true, 'sign-up-model': vari }"
    style="text-align: center"
  >
    <!--左边注册动画-->
    <div class="inner-left-container">
      <div class="login-content">
        <h3>{{ t('login.titleNew') }}</h3>
        <p>{{ t('login.titleNewSmall') }}</p>
        <button @click="onClick" class="btn transparent">
          {{ t('login.Register') }}
        </button>
      </div>
      <img src="@/assets/img/log.svg" alt="" class="image" />
    </div>
    <!--右边登录动画-->
    <div class="inner-right-container">
      <div class="register-content">
        <h3>{{ t('login.titleRegister') }}!</h3>
        <p>{{ t('login.titleRegisterSmall') }}</p>
        <button @click="onClick" class="btn transparent">
          {{ t('login.btnTitle') }}
        </button>
      </div>
      <img src="@/assets/img/register.svg" alt="" class="image" />
    </div>
    <div class="inner-sign-up-container">
      <login :class="{ 'sign-up-model': vari }" class="right"></login>
      <register :class="{ 'sign-up-model': vari }" class="left"></register>
    </div>
  </div>
</template>

<script setup lang="ts">
//@ts-ignore
import { ref } from 'vue'
//@ts-ignore
import login from '@/components/login/longinFrom.vue'
//@ts-ignore
import register from '@/components/login/registerFrom.vue'
//@ts-ignore
import { useI18n } from 'vue-i18n'
const { t } = useI18n() // 引入国际化组件动态翻译方法
const onClick = () => {
  vari.value = !vari.value
}
let vari = ref<boolean>(false)
</script>

<style scoped>
/*
背景圆形
*/
.container {
  width: 100vm;
  height: 100vh;
  background-color: white;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: row;
}
.container::before {
  content: '';
  position: absolute;
  height: 2000px;
  width: 2000px;
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
  border-radius: 50%;
  transition: 1.8s ease-in-out;
}

.inner-left-container {
  width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
  padding: 3rem 10% 2rem 10%;
  pointer-events: all;
}
.inner-right-container {
  width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  padding: 3rem 10% 2rem 10%;
  pointer-events: none;
}
.container .inner-right-container .register-content,
.container .inner-right-container .image {
  transform: translateX(1000px);
  transition: 1s ease-in-out;
  transition-delay: 0.5s;
}
.container .inner-left-container .login-content,
.container .inner-left-container .image {
  transform: translateX(0px);
  transition: 1s ease-in-out;
  transition-delay: 0.5s;
}
.image {
  width: 100%;
}
.inner-sign-up-container {
  width: 40%;
  height: 50%;
  position: absolute;
  right: 6%;
  top: 20%;
  transition: 1s ease-in-out;
  transition-delay: 0.5s;
  display: grid;
  grid-template-columns: 1fr;
}
.btn {
  width: 150px;
  background-color: #5995fd;
  border: none;
  outline: none;
  height: 49px;
  border-radius: 49px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px 0;
  cursor: pointer;
  transition: 0.5s;
}

.btn:hover {
  background-color: #4d84e2;
}
.transparent {
  margin: 0;
  background: none;
  border: 2px solid #fff;
  width: 130px;
  height: 41px;
  font-weight: 600;
  font-size: 0.8rem;
}
.login-content {
  color: #fff;
  align-items: center;
}
.login-content h3 {
  font-size: 1.2rem;
}
.login-content p {
  font-size: 0.7rem;
  padding: 0.5rem 0;
}
.register-content {
  color: #fff;
}
.register-content h3 {
  font-size: 1.2rem;
}
.register-content p {
  font-size: 0.7rem;
  padding: 0.5rem 0;
}
.btn.transparent {
  width: 110px;
  height: 35px;
  font-size: 0.7rem;
}
.inner-sign-up-container .left {
  position: absolute;
  width: 80%;
  left: 10%;
}
/*左右切换动画*/
.container.sign-up-model::before {
  transform: translate(100%, -50%);
  transition: 1.8s ease-in-out;
  right: 52%;
}
.container.sign-up-model .inner-right-container .register-content,
.container.sign-up-model .inner-right-container .image {
  transform: translateX(0px);
  transition: 1s ease-in-out;
  transition-delay: 0.5s;
}
.container.sign-up-model .inner-left-container .login-content,
.container.sign-up-model .inner-left-container .image {
  transform: translateX(-1000px);
  transition: 1s ease-in-out;
  transition-delay: 0.5s;
}

.container.sign-up-model .inner-sign-up-container {
  width: 50%;
  height: 50%;
  top: 20%;
  right: 50%;
  transition: 1s ease-in-out;
  transition-delay: 0.5s;
}

.container.sign-up-model .inner-right-container {
  pointer-events: all;
}
.container.sign-up-model .inner-left-container {
  pointer-events: none;
}

@media screen and (max-width: 992px) {
  .container {
    flex-direction: column;
  }
  .container::before {
    width: 1500px;
    height: 1500px;
    position: absolute;
    bottom: initial;
    left: initial;
    top: initial;
    right: initial;
    transform: translate(-30%, -80%);
  }
  .inner-left-container {
    height: 0;
    flex: 1;
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
  }
  .inner-right-container {
    height: 0;
    flex: 1;
    width: 100%;
    flex-direction: row;
    align-items: flex-end;
  }
  .image {
    width: 40%;
  }

  .container .inner-right-container .register-content,
  .container .inner-right-container .image {
    transform: translateY(1000px);
  }

  .container .inner-sign-up-container {
    width: 50%;
    height: 50%;
    left: 25%;
    right: 25%;
    top: 40%;
  }

  /*动画*/
  .container.sign-up-model .inner-left-container .login-content,
  .container.sign-up-model .inner-left-container .image {
    transform: translateY(-1000px);
    transition: 1s ease-in-out;
  }
  .container.sign-up-model::before {
    width: 1500px;
    height: 1500px;
    position: absolute;
    bottom: initial;
    left: initial;
    right: initial;
    top: initial;
    transform: translate(-30%, 30%);
  }

  .container.sign-up-model .inner-sign-up-container {
    height: 50%;
    width: 60%;
    left: 20%;
    right: 20%;
    top: 10%;
  }
}

@media screen and (max-width: 570px) {
  .container {
    background-color: rgb(160, 209, 35);
  }
  .container::before {
    display: none;
  }
  .container .inner-sign-up-container {
    width: 80%;
    height: 50%;
    left: 10%;
    right: 10%;
    top: 30%;
  }
  .inner-sign-up-container .right {
    padding: 7% 2%;
  }

  .inner-sign-up-container .left {
    width: 130%;
    left: -15%;
    right: 0%;
    padding: 7% 5%;
  }
}
</style>
