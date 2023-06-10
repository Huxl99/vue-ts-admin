import { createApp } from 'vue'
//@ts-ignore
import App from './App.vue'
//引入模板的全局的样式
import '@/styles/index.scss'
import 'element-plus/dist/index.css'
//svg插件需要配置代码
import 'virtual:svg-icons-register'
//引入自定义插件对象:注册整个项目全局组件
import gloalComponent from '@/components'
//引入路由
import router from './router'
//引入仓库
import pinia from './store'
//引入自定义指令文件
import { isHasButton } from '@/directive/has'
import './permisstion'
//暗黑模式需要的样式
import 'element-plus/theme-chalk/dark/css-vars.css'
//导入i8n
import i18n from '@/i18n/index'

const app = createApp(App)

isHasButton(app)
//安装仓库
app.use(pinia).use(gloalComponent).use(i18n).use(router).mount('#app')
