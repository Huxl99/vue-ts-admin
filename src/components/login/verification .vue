<template>
  <!--验证码没有接口,封装验证码组件-->
  <div class="captcha" style="display: flex">
    <canvas ref="canvas" width="100" height="40"></canvas>
  </div>
  <div class="valicode-btn">
    <el-button type="text" @click="refresh">
      {{ t('login.exchange') }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
//@ts-ignore
import { ref, onMounted, defineEmits } from 'vue'
//@ts-ignore
import { useI18n } from 'vue-i18n'
const { t } = useI18n() // 引入国际化组件动态翻译方法
const emits = defineEmits(['getCode'])
const canvasRef = ref<HTMLCanvasElement | null>(null)
const ctx: any = ref<CanvasRenderingContext2D | null>(null)
const code = ref('')
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const charLength = chars.length

function getRandomChar() {
  return chars.charAt(Math.floor(Math.random() * charLength))
}

function draw() {
  if (!ctx.value) return

  ctx.value.clearRect(0, 0, canvasRef.value!.width, canvasRef.value!.height)

  let x = 10
  for (let i = 0; i < 4; i++) {
    const c = getRandomChar()
    code.value += c
    ctx.value.font = 'bold 20px Arial'
    ctx.value.fillStyle = '#333'
    ctx.value.fillText(c, x, 25)
    x += 20
  }

  for (let i = 0; i < 10; i++) {
    ctx.value.strokeStyle = '#ccc'
    ctx.value.beginPath()
    ctx.value.moveTo(Math.random() * 100, Math.random() * 40)
    ctx.value.lineTo(Math.random() * 100, Math.random() * 40)
    ctx.value.stroke()
  }
  emits('getCode', code.value)
}

function refresh() {
  code.value = ''
  draw()
  emits('getCode', code.value)
}

onMounted(() => {
  const code = ref('')
  canvasRef.value = document.querySelector('canvas')
  emits('getCode', code.value)
  ctx.value = canvasRef.value?.getContext('2d')
  draw()
})
</script>
<script lang="ts">
export default {
  name: 'Verification',
}
</script>
<style scoped>
.captcha {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.valicode-btn {
  height: 40px;
  line-height: 40px;
}
</style>
